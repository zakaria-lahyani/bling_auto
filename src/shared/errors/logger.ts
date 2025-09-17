/**
 * Error Logging Service
 * 
 * Centralized error logging with multiple providers,
 * filtering, and structured logging.
 */

import { AppError, ErrorSeverity, ErrorContext, ErrorSeverityHelpers } from './types'

export interface LogProvider {
  name: string
  log(error: AppError, context?: LogContext): Promise<void> | void
  isEnabled(): boolean
}

export interface LogContext {
  userId?: string
  sessionId?: string
  component?: string
  action?: string
  metadata?: Record<string, any>
}

export interface LoggerConfig {
  enabled: boolean
  providers: LogProvider[]
  minSeverity: ErrorSeverity
  includeStackTrace: boolean
  maxStackDepth: number
  sanitizeData: boolean
  rateLimit?: {
    maxErrors: number
    windowMs: number
  }
}

/**
 * Console Log Provider (Development)
 */
export class ConsoleLogProvider implements LogProvider {
  name = 'console'

  log(error: AppError, context?: LogContext): void {
    const logData = {
      timestamp: error.timestamp,
      code: error.code,
      message: error.message,
      userMessage: error.userMessage,
      severity: error.severity,
      context: { ...error.context, ...context },
      statusCode: error.statusCode,
      retryable: error.retryable,
      stack: error.stack
    }

    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
      case ErrorSeverity.HIGH:
        console.error('🚨 Error:', logData)
        break
      case ErrorSeverity.MEDIUM:
        console.warn('⚠️ Warning:', logData)
        break
      case ErrorSeverity.LOW:
        console.info('ℹ️ Info:', logData)
        break
    }
  }

  isEnabled(): boolean {
    return process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ENABLE_CONSOLE_LOGGING === 'true'
  }
}

/**
 * Sentry Log Provider (Production)
 * Note: Currently disabled to avoid TypeScript compilation issues
 * Can be re-enabled when @sentry/nextjs is installed
 */
export class SentryLogProvider implements LogProvider {
  name = 'sentry'

  log(error: AppError, context?: LogContext): void {
    // Placeholder - Sentry logging disabled
    console.info('Sentry logging disabled - install @sentry/nextjs to enable')
  }

  isEnabled(): boolean {
    // Disabled until @sentry/nextjs is properly installed
    return false
  }
}

/**
 * Analytics Log Provider
 */
export class AnalyticsLogProvider implements LogProvider {
  name = 'analytics'

  log(error: AppError, context?: LogContext): void {
    if (typeof window === 'undefined') return

    // Google Analytics 4
    if ((window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.code,
        fatal: error.severity === ErrorSeverity.CRITICAL,
        custom_parameters: {
          error_code: error.code,
          error_severity: error.severity,
          user_message: error.userMessage,
          component: context?.component || error.context?.component
        }
      })
    }

    // Custom analytics
    if ((window as any).analytics?.track) {
      (window as any).analytics.track('Error Occurred', {
        errorCode: error.code,
        errorMessage: error.message,
        errorSeverity: error.severity,
        component: context?.component || error.context?.component,
        userId: context?.userId || error.context?.userId,
        timestamp: error.timestamp
      })
    }
  }

  isEnabled(): boolean {
    return process.env.NEXT_PUBLIC_ENABLE_ERROR_ANALYTICS === 'true'
  }
}

/**
 * Local Storage Log Provider (Fallback)
 */
export class LocalStorageLogProvider implements LogProvider {
  name = 'localStorage'
  private readonly maxEntries = 100
  private readonly storageKey = 'error_logs'

  log(error: AppError, context?: LogContext): void {
    if (typeof window === 'undefined') return

    try {
      const logs = this.getLogs()
      const logEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: error.timestamp,
        code: error.code,
        message: error.message,
        userMessage: error.userMessage,
        severity: error.severity,
        context: { ...error.context, ...context },
        statusCode: error.statusCode,
        retryable: error.retryable
      }

      logs.push(logEntry)

      // Keep only the most recent entries
      if (logs.length > this.maxEntries) {
        logs.splice(0, logs.length - this.maxEntries)
      }

      localStorage.setItem(this.storageKey, JSON.stringify(logs))
    } catch (storageError) {
      console.warn('Failed to save error to localStorage:', storageError)
    }
  }

  getLogs(): any[] {
    try {
      const logs = localStorage.getItem(this.storageKey)
      return logs ? JSON.parse(logs) : []
    } catch {
      return []
    }
  }

  clearLogs(): void {
    try {
      localStorage.removeItem(this.storageKey)
    } catch (error) {
      console.warn('Failed to clear error logs:', error)
    }
  }

  isEnabled(): boolean {
    return typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ENABLE_LOCAL_ERROR_STORAGE === 'true'
  }
}

/**
 * Error Logger Service
 */
export class ErrorLogger {
  private config: LoggerConfig
  private providers: LogProvider[]
  private rateLimitCache = new Map<string, number[]>()

  constructor(config?: Partial<LoggerConfig>) {
    this.config = {
      enabled: true,
      providers: [
        new ConsoleLogProvider(),
        new AnalyticsLogProvider(),
        new LocalStorageLogProvider()
      ],
      minSeverity: ErrorSeverity.LOW,
      includeStackTrace: true,
      maxStackDepth: 10,
      sanitizeData: true,
      rateLimit: {
        maxErrors: 50,
        windowMs: 60000 // 1 minute
      },
      ...config
    }

    this.providers = this.config.providers.filter(provider => provider.isEnabled())
  }

  async log(error: AppError, context?: LogContext): Promise<void> {
    if (!this.config.enabled) return
    if (!this.shouldLog(error)) return
    if (this.isRateLimited(error)) return

    const sanitizedError = this.sanitizeError(error)
    const sanitizedContext = this.sanitizeContext(context)

    // Log to all enabled providers
    const logPromises = this.providers.map(provider => {
      try {
        return Promise.resolve(provider.log(sanitizedError, sanitizedContext))
      } catch (providerError) {
        console.warn(`Error logging to ${provider.name}:`, providerError)
        return Promise.resolve()
      }
    })

    await Promise.allSettled(logPromises)
    this.updateRateLimit(error)
  }

  private shouldLog(error: AppError): boolean {
    const severityOrder = {
      [ErrorSeverity.LOW]: 0,
      [ErrorSeverity.MEDIUM]: 1,
      [ErrorSeverity.HIGH]: 2,
      [ErrorSeverity.CRITICAL]: 3
    }

    return severityOrder[error.severity] >= severityOrder[this.config.minSeverity]
  }

  private isRateLimited(error: AppError): boolean {
    if (!this.config.rateLimit) return false

    const key = `${error.code}-${error.context?.component || 'unknown'}`
    const now = Date.now()
    const windowStart = now - this.config.rateLimit.windowMs
    
    const timestamps = this.rateLimitCache.get(key) || []
    const recentTimestamps = timestamps.filter(ts => ts > windowStart)
    
    return recentTimestamps.length >= this.config.rateLimit.maxErrors
  }

  private updateRateLimit(error: AppError): void {
    if (!this.config.rateLimit) return

    const key = `${error.code}-${error.context?.component || 'unknown'}`
    const now = Date.now()
    const timestamps = this.rateLimitCache.get(key) || []
    
    timestamps.push(now)
    this.rateLimitCache.set(key, timestamps)
  }

  private sanitizeError(error: AppError): AppError {
    if (!this.config.sanitizeData) return error

    // Create a copy without sensitive data with toJSON method
    const sanitized = { 
      ...error,
      context: error.context ? this.sanitizeContext(error.context) : undefined,
      toJSON: () => ({
        code: error.code,
        userMessage: error.userMessage,
        severity: error.severity,
        context: error.context ? this.sanitizeContext(error.context) : undefined,
        originalError: error.originalError,
        statusCode: error.statusCode,
        retryable: error.retryable,
        timestamp: error.timestamp,
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    } as AppError

    // Limit stack trace depth
    if (this.config.includeStackTrace && sanitized.stack) {
      const stackLines = sanitized.stack.split('\n')
      sanitized.stack = stackLines.slice(0, this.config.maxStackDepth).join('\n')
    } else if (!this.config.includeStackTrace) {
      delete sanitized.stack
    }

    return sanitized
  }

  private sanitizeContext(context?: LogContext | ErrorContext): any {
    if (!context) return context

    const sanitized = { ...context }
    
    // Remove sensitive data
    const sensitiveKeys = ['password', 'token', 'apiKey', 'secret', 'authorization']
    
    for (const key of sensitiveKeys) {
      if (key in sanitized) {
        delete (sanitized as any)[key]
      }
    }

    // Sanitize metadata
    if (sanitized.metadata) {
      sanitized.metadata = { ...sanitized.metadata }
      for (const key of sensitiveKeys) {
        if (key in sanitized.metadata) {
          delete sanitized.metadata[key]
        }
      }
    }

    return sanitized
  }

  // Utility methods
  addProvider(provider: LogProvider): void {
    if (provider.isEnabled()) {
      this.providers.push(provider)
    }
  }

  removeProvider(name: string): void {
    this.providers = this.providers.filter(p => p.name !== name)
  }

  updateConfig(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config }
    this.providers = this.config.providers.filter(provider => provider.isEnabled())
  }

  clearRateLimit(): void {
    this.rateLimitCache.clear()
  }

  getStats(): { totalProviders: number; enabledProviders: string[]; rateLimitedErrors: number } {
    return {
      totalProviders: this.config.providers.length,
      enabledProviders: this.providers.map(p => p.name),
      rateLimitedErrors: this.rateLimitCache.size
    }
  }
}

// Singleton instance
export const errorLogger = new ErrorLogger()

// Global error handlers
if (typeof window !== 'undefined') {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason))
    const appError = new AppError({
      code: 'UNHANDLED_PROMISE_REJECTION' as any,
      message: error.message,
      userMessage: 'An unexpected error occurred. Please try again.',
      severity: ErrorSeverity.HIGH,
      originalError: error,
      context: {
        url: window.location.href,
        userAgent: navigator.userAgent,
        component: 'unhandled-promise'
      }
    })
    
    errorLogger.log(appError)
  })

  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    const appError = new AppError({
      code: 'UNCAUGHT_ERROR' as any,
      message: event.error?.message || event.message,
      userMessage: 'An unexpected error occurred. Please refresh the page.',
      severity: ErrorSeverity.HIGH,
      originalError: event.error,
      context: {
        url: window.location.href,
        userAgent: navigator.userAgent,
        component: 'global-error-handler',
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      }
    })
    
    errorLogger.log(appError)
  })
}