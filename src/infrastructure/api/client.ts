import { 
  AppError, 
  ApiError, 
  NetworkError, 
  TimeoutError, 
  ErrorFactory, 
  ErrorCode 
} from '@/shared/errors/types'
import { errorLogger } from '@/shared/errors/logger'

interface RequestConfig extends RequestInit {
  timeout?: number
  retries?: number
  retryDelay?: number
}

interface RetryConfig {
  attempts: number
  delay: number
  backoff: number
}

// API Client Configuration
export class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>
  private defaultTimeout: number
  private defaultRetries: RetryConfig

  constructor(
    baseURL: string = '/api',
    options: {
      timeout?: number
      retries?: RetryConfig
    } = {}
  ) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
    this.defaultTimeout = options.timeout ?? 30000 // 30 seconds
    this.defaultRetries = options.retries ?? {
      attempts: 3,
      delay: 1000,
      backoff: 2
    }
  }

  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  removeAuthToken() {
    delete this.defaultHeaders['Authorization']
  }

  async request<T>(
    endpoint: string,
    options: RequestConfig = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const timeout = options.timeout ?? this.defaultTimeout
    const retries = options.retries ?? this.defaultRetries.attempts
    
    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    }

    return this.executeWithRetry(url, config, timeout, retries)
  }

  private async executeWithRetry<T>(
    url: string,
    config: RequestInit,
    timeout: number,
    retries: number,
    attempt: number = 1
  ): Promise<T> {
    try {
      return await this.executeRequest<T>(url, config, timeout)
    } catch (error) {
      const appError = this.handleError(error, url, config.method)
      
      // Log the error
      await errorLogger.log(appError, {
        component: 'ApiClient',
        action: 'request',
        metadata: {
          url,
          method: config.method,
          attempt,
          retries
        }
      })

      // Retry logic
      if (this.shouldRetry(appError, attempt, retries)) {
        const delay = this.calculateRetryDelay(attempt)
        await this.wait(delay)
        return this.executeWithRetry(url, config, timeout, retries, attempt + 1)
      }

      throw appError
    }
  }

  private async executeRequest<T>(
    url: string,
    config: RequestInit,
    timeout: number
  ): Promise<T> {
    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response)
        throw ErrorFactory.fromHttpResponse({
          status: response.status,
          statusText: response.statusText,
          data: errorData
        }, {
          url,
          component: 'ApiClient',
          action: config.method || 'GET'
        })
      }

      // Parse successful response
      const contentType = response.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        return await response.json()
      } else {
        return await response.text() as unknown as T
      }

    } catch (error) {
      clearTimeout(timeoutId)
      
      // Handle specific error types
      if (error instanceof AppError) {
        throw error
      }

      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new TimeoutError('API request', timeout, {
          url,
          component: 'ApiClient'
        })
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw ErrorFactory.fromNetworkError(error, {
          url,
          component: 'ApiClient'
        })
      }

      throw ErrorFactory.fromUnknownError(error, {
        url,
        component: 'ApiClient'
      })
    }
  }

  private async parseErrorResponse(response: Response): Promise<any> {
    try {
      const contentType = response.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        return await response.json()
      }
      return { message: await response.text() }
    } catch {
      return { message: response.statusText || 'Unknown error' }
    }
  }

  private handleError(error: unknown, url: string, method?: string): AppError {
    if (error instanceof AppError) {
      return error
    }

    const context = {
      url,
      component: 'ApiClient',
      action: method || 'request'
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return new TimeoutError('API request', this.defaultTimeout, context)
      }
      
      if (error.message.includes('fetch') || error.message.includes('network')) {
        return ErrorFactory.fromNetworkError(error, context)
      }
    }

    return ErrorFactory.fromUnknownError(error, context)
  }

  private shouldRetry(error: AppError, attempt: number, maxRetries: number): boolean {
    if (attempt >= maxRetries) return false
    if (!error.retryable) return false

    // Don't retry client errors (4xx) except specific cases
    if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
      return error.statusCode === 408 || error.statusCode === 429
    }

    // Retry server errors and network errors
    return error.code === ErrorCode.SERVER_ERROR || 
           error.code === ErrorCode.NETWORK_ERROR ||
           error.code === ErrorCode.TIMEOUT_ERROR
  }

  private calculateRetryDelay(attempt: number): number {
    const baseDelay = this.defaultRetries.delay
    const backoff = this.defaultRetries.backoff
    const jitter = Math.random() * 0.1 * baseDelay
    
    return Math.min(baseDelay * Math.pow(backoff, attempt - 1), 30000) + jitter
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

// Singleton instance
export const apiClient = new ApiClient()