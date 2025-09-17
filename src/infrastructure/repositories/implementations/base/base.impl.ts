/**
 * Base Repository Implementation
 * Provides common functionality for all repository implementations
 */

import { 
  BaseRepository, 
  QueryParams, 
  PaginatedResponse, 
  FilterParams,
  RepositoryError,
  NotFoundError,
  NetworkError 
} from '../../interfaces/base.repository'

export abstract class BaseRepositoryImpl<T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> 
  implements BaseRepository<T, CreateDTO, UpdateDTO> {
  
  protected cache = new Map<string, { data: any; timestamp: number }>()
  protected cacheEnabled: boolean
  protected cacheTTL: number

  constructor(options: { cacheEnabled?: boolean; cacheTTL?: number } = {}) {
    this.cacheEnabled = options.cacheEnabled ?? true
    this.cacheTTL = options.cacheTTL ?? 5 * 60 * 1000 // 5 minutes
  }

  // Cache management
  protected getCacheKey(operation: string, params?: any): string {
    const paramsStr = params ? JSON.stringify(params) : ''
    return `${this.getEntityName()}:${operation}:${paramsStr}`
  }

  protected getFromCache<U>(key: string): U | null {
    if (!this.cacheEnabled) return null

    const cached = this.cache.get(key)
    if (!cached) return null

    const isExpired = Date.now() - cached.timestamp > this.cacheTTL
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  protected setCache<U>(key: string, data: U): void {
    if (!this.cacheEnabled) return

    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  protected invalidateCache(pattern?: string): void {
    if (pattern) {
      const keys = Array.from(this.cache.keys()).filter(key => key.includes(pattern))
      keys.forEach(key => this.cache.delete(key))
    } else {
      this.cache.clear()
    }
  }

  public clearCache(): void {
    this.cache.clear()
  }

  public async refreshCache(): Promise<void> {
    this.clearCache()
    // Subclasses can override to implement preloading
  }

  // Error handling
  protected handleError(error: any, context?: string): never {
    if (error instanceof RepositoryError) {
      throw error
    }

    // Network/API errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new NetworkError(`Network error in ${context || 'repository operation'}`, error)
    }

    // HTTP errors
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || error.message

      if (status === 404) {
        throw new NotFoundError(this.getEntityName(), 'unknown')
      }

      throw new RepositoryError(
        message,
        'HTTP_ERROR',
        status,
        error.response.data
      )
    }

    // Generic errors
    throw new RepositoryError(
      error.message || 'Unknown repository error',
      'UNKNOWN_ERROR',
      500,
      error
    )
  }

  // Utility methods
  protected applyFilters(data: T[], filters: FilterParams): T[] {
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        const itemValue = (item as any)[key]
        
        if (Array.isArray(value)) {
          return value.includes(itemValue)
        }
        
        if (typeof value === 'string' && typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(value.toLowerCase())
        }
        
        return itemValue === value
      })
    })
  }

  protected applySorting(data: T[], sort?: QueryParams['sort']): T[] {
    if (!sort) return data

    return [...data].sort((a, b) => {
      const aValue = (a as any)[sort.field]
      const bValue = (b as any)[sort.field]
      
      const result = aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      return sort.order === 'desc' ? -result : result
    })
  }

  protected applyPagination<U>(data: U[], pagination?: QueryParams['pagination']): {
    data: U[]
    pagination: Omit<PaginatedResponse<U>, 'data'>
  } {
    if (!pagination) {
      return {
        data,
        pagination: {
          total: data.length,
          page: 1,
          limit: data.length,
          hasNext: false,
          hasPrev: false
        }
      }
    }

    const { page = 1, limit = 10 } = pagination
    const offset = (page - 1) * limit
    const paginatedData = data.slice(offset, offset + limit)

    return {
      data: paginatedData,
      pagination: {
        total: data.length,
        page,
        limit,
        hasNext: offset + limit < data.length,
        hasPrev: page > 1
      }
    }
  }

  // Abstract methods that must be implemented by subclasses
  protected abstract getEntityName(): string
  
  // Base repository interface implementation
  abstract findAll(params?: QueryParams): Promise<T[]>
  abstract findById(id: string): Promise<T | null>
  abstract findOne(filters: FilterParams): Promise<T | null>
  abstract findMany(filters: FilterParams): Promise<T[]>
  abstract findPaginated(params?: QueryParams): Promise<PaginatedResponse<T>>
  abstract create(data: CreateDTO): Promise<T>
  abstract update(id: string, data: UpdateDTO): Promise<T>
  abstract delete(id: string): Promise<boolean>
  abstract count(filters?: FilterParams): Promise<number>
  abstract exists(id: string): Promise<boolean>
}