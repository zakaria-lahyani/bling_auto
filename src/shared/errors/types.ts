/**
 * Error Types and Classes
 * 
 * Comprehensive error handling system with custom error classes,
 * user-friendly messages, and proper error categorization.
 */

export enum ErrorCode {
  // Network Errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  
  // API Errors  
  API_ERROR = 'API_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RATE_LIMITED = 'RATE_LIMITED',
  SERVER_ERROR = 'SERVER_ERROR',
  
  // Client Errors
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',
  
  // Business Logic Errors
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  BOOKING_CONFLICT = 'BOOKING_CONFLICT',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  
  // System Errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR',
  DEPENDENCY_ERROR = 'DEPENDENCY_ERROR'
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium', 
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface ErrorContext {
  userId?: string
  sessionId?: string
  userAgent?: string
  url?: string
  component?: string
  action?: string
  timestamp?: string
  metadata?: Record<string, any>
}

export interface ErrorDetails {
  code: ErrorCode
  message: string
  userMessage: string
  severity: ErrorSeverity
  context?: ErrorContext
  originalError?: Error
  statusCode?: number
  retryable?: boolean
  actions?: ErrorAction[]
}

export interface ErrorAction {
  label: string
  action: () => void | Promise<void>
  type: 'primary' | 'secondary' | 'danger'
}

/**
 * Base Application Error
 */
export class AppError extends Error {
  public readonly code: ErrorCode
  public readonly userMessage: string
  public readonly severity: ErrorSeverity
  public readonly context?: ErrorContext
  public readonly originalError?: Error
  public readonly statusCode?: number
  public readonly retryable: boolean
  public readonly timestamp: string

  constructor(details: ErrorDetails) {
    super(details.message)
    
    this.name = 'AppError'
    this.code = details.code
    this.userMessage = details.userMessage
    this.severity = details.severity
    this.context = details.context
    this.originalError = details.originalError
    this.statusCode = details.statusCode
    this.retryable = details.retryable ?? false
    this.timestamp = new Date().toISOString()

    // Maintain proper stack trace for debugging
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      userMessage: this.userMessage,
      severity: this.severity,
      context: this.context,
      statusCode: this.statusCode,
      retryable: this.retryable,
      timestamp: this.timestamp,
      stack: this.stack
    }
  }
}

/**
 * Network-related errors
 */
export class NetworkError extends AppError {
  constructor(message: string, originalError?: Error, context?: ErrorContext) {
    super({
      code: ErrorCode.NETWORK_ERROR,
      message,
      userMessage: 'Unable to connect to our servers. Please check your internet connection and try again.',
      severity: ErrorSeverity.MEDIUM,
      context,
      originalError,
      retryable: true
    })
    this.name = 'NetworkError'
  }
}

/**
 * API-related errors
 */
export class ApiError extends AppError {
  constructor(
    message: string, 
    statusCode: number, 
    code: ErrorCode = ErrorCode.API_ERROR,
    context?: ErrorContext
  ) {
    const userMessages: Record<number, string> = {
      400: 'The request was invalid. Please check your input and try again.',
      401: 'You need to log in to access this feature.',
      403: 'You don\'t have permission to perform this action.',
      404: 'The requested item could not be found.',
      409: 'This action conflicts with existing data.',
      422: 'The provided data is invalid.',
      429: 'Too many requests. Please wait a moment and try again.',
      500: 'Something went wrong on our end. Please try again later.',
      502: 'Service temporarily unavailable. Please try again later.',
      503: 'Service is currently under maintenance. Please try again later.'
    }

    super({
      code,
      message,
      userMessage: userMessages[statusCode] || 'An unexpected error occurred. Please try again.',
      severity: statusCode >= 500 ? ErrorSeverity.HIGH : ErrorSeverity.MEDIUM,
      context,
      statusCode,
      retryable: statusCode >= 500 || statusCode === 429
    })
    this.name = 'ApiError'
  }
}

/**
 * Validation-related errors
 */
export class ValidationError extends AppError {
  public readonly fields: Record<string, string[]>

  constructor(message: string, fields: Record<string, string[]> = {}, context?: ErrorContext) {
    super({
      code: ErrorCode.VALIDATION_ERROR,
      message,
      userMessage: 'Please correct the highlighted fields and try again.',
      severity: ErrorSeverity.LOW,
      context,
      retryable: false
    })
    this.name = 'ValidationError'
    this.fields = fields
  }
}

/**
 * Business logic errors
 */
export class BusinessError extends AppError {
  constructor(
    code: ErrorCode,
    message: string,
    userMessage: string,
    context?: ErrorContext
  ) {
    super({
      code,
      message,
      userMessage,
      severity: ErrorSeverity.MEDIUM,
      context,
      retryable: false
    })
    this.name = 'BusinessError'
  }
}

/**
 * Timeout errors
 */
export class TimeoutError extends AppError {
  constructor(operation: string, timeout: number, context?: ErrorContext) {
    super({
      code: ErrorCode.TIMEOUT_ERROR,
      message: `Operation "${operation}" timed out after ${timeout}ms`,
      userMessage: 'The request is taking longer than expected. Please try again.',
      severity: ErrorSeverity.MEDIUM,
      context,
      retryable: true
    })
    this.name = 'TimeoutError'
  }
}

/**
 * Configuration errors
 */
export class ConfigurationError extends AppError {
  constructor(message: string, context?: ErrorContext) {
    super({
      code: ErrorCode.CONFIGURATION_ERROR,
      message,
      userMessage: 'A configuration error occurred. Please contact support.',
      severity: ErrorSeverity.HIGH,
      context,
      retryable: false
    })
    this.name = 'ConfigurationError'
  }
}

/**
 * Error factory for creating appropriate error instances
 */
export class ErrorFactory {
  static fromHttpResponse(
    response: { status: number; statusText: string; data?: any },
    context?: ErrorContext
  ): AppError {
    const { status, statusText, data } = response
    const message = data?.message || statusText || `HTTP ${status} error`

    switch (status) {
      case 400:
        if (data?.errors) {
          return new ValidationError(message, data.errors, context)
        }
        return new ApiError(message, status, ErrorCode.VALIDATION_ERROR, context)
      
      case 401:
        return new ApiError(message, status, ErrorCode.UNAUTHORIZED, context)
      
      case 403:
        return new ApiError(message, status, ErrorCode.FORBIDDEN, context)
      
      case 404:
        return new ApiError(message, status, ErrorCode.NOT_FOUND, context)
      
      case 409:
        return new BusinessError(
          ErrorCode.BOOKING_CONFLICT,
          message,
          'This time slot is no longer available. Please select a different time.',
          context
        )
      
      case 422:
        return new ValidationError(message, data?.errors || {}, context)
      
      case 429:
        return new ApiError(message, status, ErrorCode.RATE_LIMITED, context)
      
      case 500:
      case 502:
      case 503:
      default:
        return new ApiError(message, status, ErrorCode.SERVER_ERROR, context)
    }
  }

  static fromNetworkError(error: Error, context?: ErrorContext): NetworkError {
    return new NetworkError(
      error.message || 'Network request failed',
      error,
      context
    )
  }

  static fromUnknownError(error: unknown, context?: ErrorContext): AppError {
    if (error instanceof AppError) {
      return error
    }

    if (error instanceof Error) {
      return new AppError({
        code: ErrorCode.UNKNOWN_ERROR,
        message: error.message,
        userMessage: 'An unexpected error occurred. Please try again.',
        severity: ErrorSeverity.MEDIUM,
        context,
        originalError: error,
        retryable: true
      })
    }

    return new AppError({
      code: ErrorCode.UNKNOWN_ERROR,
      message: String(error),
      userMessage: 'An unexpected error occurred. Please try again.',
      severity: ErrorSeverity.MEDIUM,
      context,
      retryable: true
    })
  }
}

/**
 * Error severity helpers
 */
export const ErrorSeverityHelpers = {
  isCritical: (error: AppError): boolean => error.severity === ErrorSeverity.CRITICAL,
  isHigh: (error: AppError): boolean => error.severity === ErrorSeverity.HIGH,
  isMedium: (error: AppError): boolean => error.severity === ErrorSeverity.MEDIUM,
  isLow: (error: AppError): boolean => error.severity === ErrorSeverity.LOW,
  
  shouldReport: (error: AppError): boolean => {
    return error.severity === ErrorSeverity.HIGH || error.severity === ErrorSeverity.CRITICAL
  },
  
  shouldRetry: (error: AppError): boolean => error.retryable,
  
  getRetryDelay: (error: AppError, attempt: number): number => {
    if (!error.retryable) return 0
    
    // Exponential backoff with jitter
    const baseDelay = 1000 // 1 second
    const maxDelay = 30000 // 30 seconds
    const exponentialDelay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay)
    const jitter = Math.random() * 0.1 * exponentialDelay
    
    return exponentialDelay + jitter
  }
}