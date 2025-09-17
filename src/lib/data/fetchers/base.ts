/**
 * Base Data Fetcher
 * 
 * Provides common functionality for both static and API data fetchers.
 */

import { DATA_CONFIG } from '../config'

export class BaseFetcher {
  protected cache = new Map<string, { data: any; timestamp: number }>()

  protected getCacheKey(key: string): string {
    return `${DATA_CONFIG.source}:${key}`
  }

  protected getFromCache<T>(key: string): T | null {
    if (!DATA_CONFIG.cache.enabled) return null

    const cacheKey = this.getCacheKey(key)
    const cached = this.cache.get(cacheKey)
    
    if (!cached) return null
    
    const isExpired = Date.now() - cached.timestamp > DATA_CONFIG.cache.ttl
    if (isExpired) {
      this.cache.delete(cacheKey)
      return null
    }
    
    return cached.data
  }

  protected setCache<T>(key: string, data: T): void {
    if (!DATA_CONFIG.cache.enabled) return

    const cacheKey = this.getCacheKey(key)
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    })
  }

  protected async withRetry<T>(
    operation: () => Promise<T>,
    attempts: number = DATA_CONFIG.retry.attempts
  ): Promise<T> {
    try {
      return await operation()
    } catch (error) {
      if (attempts <= 1) {
        throw error
      }
      
      await new Promise(resolve => 
        setTimeout(resolve, DATA_CONFIG.retry.delay)
      )
      
      return this.withRetry(operation, attempts - 1)
    }
  }

  protected handleError(error: any, fallbackValue?: any): any {
    console.error('Data fetch error:', error)
    
    if (fallbackValue !== undefined) {
      return fallbackValue
    }
    
    throw error
  }
}