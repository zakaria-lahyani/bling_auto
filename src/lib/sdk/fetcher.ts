import { z } from 'zod'

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string,
    public response?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

type FetcherConfig = {
  baseURL?: string
  headers?: Record<string, string>
  timeout?: number
}

type FetcherOptions = RequestInit & {
  timeout?: number
}

class Fetcher {
  private config: FetcherConfig
  private authToken?: string

  constructor(config: FetcherConfig = {}) {
    this.config = {
      baseURL: typeof window !== 'undefined' 
        ? '/api'
        : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    }
  }

  private async request<T>(
    endpoint: string,
    options: FetcherOptions = {},
    schema?: z.ZodSchema<T>
  ): Promise<T> {
    const url = `${this.config.baseURL}${endpoint}`
    const timeout = options.timeout || this.config.timeout!

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    // Properly handle headers from different sources
    const configHeaders = this.config.headers || {}
    const optionHeaders = options.headers
    
    const headers: Record<string, string> = {
      ...configHeaders,
    }
    
    // Handle different header formats from RequestInit
    if (optionHeaders) {
      if (optionHeaders instanceof Headers) {
        optionHeaders.forEach((value, key) => {
          headers[key] = value
        })
      } else if (Array.isArray(optionHeaders)) {
        optionHeaders.forEach(([key, value]) => {
          headers[key] = value
        })
      } else {
        Object.assign(headers, optionHeaders)
      }
    }

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`
    }

    try {
      const config: RequestInit = {
        ...options,
        headers,
        signal: controller.signal,
      }

      if (options.body && typeof options.body === 'object') {
        config.body = JSON.stringify(options.body)
      }

      console.log(`[SDK] ${options.method || 'GET'} ${url}`)

      const response = await fetch(url, config)
      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText)
        console.error(`[SDK] Error ${response.status}:`, errorText)
        throw new ApiError(response.status, response.statusText, errorText, response)
      }

      const contentType = response.headers.get('content-type')
      
      if (contentType?.includes('application/json')) {
        const data = await response.json()
        
        // Handle API response format with success/error structure
        if (data.success === false) {
          throw new Error(data.error || 'API request failed')
        }
        
        const result = data.data || data
        
        if (schema) {
          return schema.parse(result)
        }
        
        return result
      }

      return response as unknown as T

    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        const timeoutError = new Error(`Request timeout after ${timeout}ms`)
        console.error('[SDK] Timeout:', timeoutError)
        throw timeoutError
      }
      
      console.error('[SDK] Request failed:', error)
      throw error
    }
  }

  async get<T>(endpoint: string, schema?: z.ZodSchema<T>): Promise<T> {
    return this.request(endpoint, { method: 'GET' }, schema)
  }

  async post<T>(
    endpoint: string,
    body?: any,
    schema?: z.ZodSchema<T>
  ): Promise<T> {
    return this.request(endpoint, { method: 'POST', body }, schema)
  }

  async put<T>(
    endpoint: string,
    body?: any,
    schema?: z.ZodSchema<T>
  ): Promise<T> {
    return this.request(endpoint, { method: 'PUT', body }, schema)
  }

  async patch<T>(
    endpoint: string,
    body?: any,
    schema?: z.ZodSchema<T>
  ): Promise<T> {
    return this.request(endpoint, { method: 'PATCH', body }, schema)
  }

  async delete<T>(endpoint: string, schema?: z.ZodSchema<T>): Promise<T> {
    return this.request(endpoint, { method: 'DELETE' }, schema)
  }

  setAuthToken(token: string): void {
    this.authToken = token
  }

  removeAuthToken(): void {
    this.authToken = undefined
  }

  setConfig(config: Partial<FetcherConfig>): void {
    this.config = { ...this.config, ...config }
  }
}

// Singleton fetcher instance
export const fetcher = new Fetcher()

export type { FetcherConfig, FetcherOptions }