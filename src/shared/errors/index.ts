/**
 * Error Handling System - Main Export
 * 
 * Comprehensive error handling system with custom error classes,
 * logging, React error boundaries, and user-friendly messages.
 */

// Import all error classes and types first
import {
  AppError,
  NetworkError,
  ApiError,
  ValidationError,
  BusinessError,
  TimeoutError,
  ConfigurationError,
  ErrorFactory,
  ErrorSeverityHelpers,
  ErrorCode,
  ErrorSeverity,
  type ErrorContext,
  type ErrorDetails,
  type ErrorAction
} from './types'

// Export error types and classes
export {
  AppError,
  NetworkError,
  ApiError,
  ValidationError,
  BusinessError,
  TimeoutError,
  ConfigurationError,
  ErrorFactory,
  ErrorSeverityHelpers,
  ErrorCode,
  ErrorSeverity,
  type ErrorContext,
  type ErrorDetails,
  type ErrorAction
}

// Export logging system
export {
  errorLogger,
  ErrorLogger,
  ConsoleLogProvider,
  SentryLogProvider,
  AnalyticsLogProvider,
  LocalStorageLogProvider,
  type LogProvider,
  type LogContext,
  type LoggerConfig
} from './logger'

// Export React error boundaries
export {
  ErrorBoundary,
  PageErrorBoundary,
  FeatureErrorBoundary,
  ComponentErrorBoundary,
  withErrorBoundary,
  useErrorBoundaryReset
} from './ErrorBoundary'

// Export user-friendly error components
export {
  UserErrorMessage,
  NetworkErrorMessage,
  UnauthorizedErrorMessage,
  NotFoundErrorMessage,
  ValidationErrorMessage
} from './UserErrorMessages'

// Export error handling hooks
export {
  useErrorHandler,
  useAsyncOperation,
  useFormErrors,
  useErrorNotifications,
  useGlobalErrorHandler,
  useRetryWithBackoff,
  useErrorBoundary,
  useDebouncedErrorHandler
} from './hooks'

// Convenience functions for common error scenarios
export const createNetworkError = (message: string, originalError?: Error) => 
  new NetworkError(message, originalError)

export const createApiError = (message: string, statusCode: number) => 
  new ApiError(message, statusCode)

export const createValidationError = (message: string, fields: Record<string, string[]> = {}) => 
  new ValidationError(message, fields)

export const createBusinessError = (code: ErrorCode, message: string, userMessage: string) => 
  new BusinessError(code, message, userMessage)

// Global error handling setup
export const setupGlobalErrorHandling = () => {
  if (typeof window === 'undefined') return

  // Enhanced global error handlers are automatically set up in logger.ts
  console.log('✅ Global error handling initialized')
}

// Error recovery utilities
export const createRetryAction = (onRetry: () => void, label = 'Try Again') => ({
  label,
  action: onRetry,
  type: 'primary' as const
})

export const createRefreshAction = (label = 'Refresh Page') => ({
  label,
  action: () => window.location.reload(),
  type: 'secondary' as const
})

export const createHomeAction = (label = 'Go Home') => ({
  label,
  action: () => window.location.href = '/',
  type: 'secondary' as const
})

export const createBackAction = (label = 'Go Back') => ({
  label,
  action: () => window.history.back(),
  type: 'secondary' as const
})

// Error context helpers
export const createErrorContext = (component: string, action?: string, metadata?: Record<string, any>) => ({
  component,
  action,
  url: typeof window !== 'undefined' ? window.location.href : undefined,
  userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
  timestamp: new Date().toISOString(),
  metadata
})

// Error severity checking utilities
export const isCriticalError = (error: AppError) => 
  ErrorSeverityHelpers.isCritical(error)

export const shouldReportError = (error: AppError) => 
  ErrorSeverityHelpers.shouldReport(error)

export const shouldRetryError = (error: AppError) => 
  ErrorSeverityHelpers.shouldRetry(error)

// Development helpers
export const logErrorForDevelopment = (error: AppError) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🚨 ${error.code}`)
    console.error('Message:', error.message)
    console.error('User Message:', error.userMessage)
    console.error('Severity:', error.severity)
    console.error('Context:', error.context)
    if (error.originalError) {
      console.error('Original Error:', error.originalError)
    }
    console.groupEnd()
  }
}