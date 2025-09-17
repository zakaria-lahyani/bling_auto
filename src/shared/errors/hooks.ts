/**
 * Error Handling Hooks and Utilities
 * 
 * Custom React hooks for error handling, recovery, and user feedback.
 */

import { useState, useCallback, useEffect, useRef } from 'react'
import { AppError, ErrorCode, ErrorFactory, ErrorSeverityHelpers } from './types'
import { errorLogger } from './logger'

interface UseErrorHandlerOptions {
  onError?: (error: AppError) => void
  enableRetry?: boolean
  maxRetries?: number
  retryDelay?: number
  logErrors?: boolean
  showToast?: boolean
}

interface ErrorState {
  error: AppError | null
  hasError: boolean
  retryCount: number
  isRetrying: boolean
}

interface UseErrorHandlerReturn {
  error: AppError | null
  hasError: boolean
  retryCount: number
  isRetrying: boolean
  handleError: (error: unknown, context?: any) => void
  clearError: () => void
  retry: () => Promise<void>
  canRetry: boolean
}

/**
 * Main error handling hook
 */
export function useErrorHandler(
  operation?: () => Promise<any>,
  options: UseErrorHandlerOptions = {}
): UseErrorHandlerReturn {
  const {
    onError,
    enableRetry = true,
    maxRetries = 3,
    retryDelay = 1000,
    logErrors = true,
    showToast = true
  } = options

  const [state, setState] = useState<ErrorState>({
    error: null,
    hasError: false,
    retryCount: 0,
    isRetrying: false
  })

  const retryTimeoutRef = useRef<NodeJS.Timeout>()
  const operationRef = useRef(operation)
  operationRef.current = operation

  const handleError = useCallback((error: unknown, context?: any) => {
    const appError = ErrorFactory.fromUnknownError(error, {
      component: context?.component,
      action: context?.action,
      ...context
    })

    setState(prev => ({
      ...prev,
      error: appError,
      hasError: true,
      isRetrying: false
    }))

    // Log error if enabled
    if (logErrors) {
      errorLogger.log(appError, {
        component: 'useErrorHandler',
        action: 'handleError'
      })
    }

    // Show toast notification if enabled
    if (showToast && typeof window !== 'undefined') {
      showErrorToast(appError)
    }

    // Call custom error handler
    onError?.(appError)
  }, [onError, logErrors, showToast])

  const clearError = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
    }
    
    setState({
      error: null,
      hasError: false,
      retryCount: 0,
      isRetrying: false
    })
  }, [])

  const retry = useCallback(async () => {
    if (!operationRef.current || !state.error || state.isRetrying) {
      return
    }

    if (state.retryCount >= maxRetries) {
      return
    }

    setState(prev => ({
      ...prev,
      isRetrying: true
    }))

    try {
      // Apply delay with exponential backoff
      const delay = retryDelay * Math.pow(2, state.retryCount)
      await new Promise(resolve => {
        retryTimeoutRef.current = setTimeout(resolve, delay)
      })

      await operationRef.current()
      clearError()
    } catch (error) {
      setState(prev => ({
        ...prev,
        retryCount: prev.retryCount + 1,
        isRetrying: false
      }))
      
      // If we've exceeded max retries, don't try again
      if (state.retryCount + 1 >= maxRetries) {
        handleError(error, { isRetryFailed: true })
      }
    }
  }, [state.error, state.isRetrying, state.retryCount, maxRetries, retryDelay, clearError, handleError])

  const canRetry = Boolean(enableRetry && 
    state.error?.retryable && 
    state.retryCount < maxRetries && 
    !state.isRetrying)

  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [])

  return {
    error: state.error,
    hasError: state.hasError,
    retryCount: state.retryCount,
    isRetrying: state.isRetrying,
    handleError,
    clearError,
    retry,
    canRetry
  }
}

/**
 * Hook for handling async operations with automatic error handling
 */
export function useAsyncOperation<T extends any[], R>(
  operation: (...args: T) => Promise<R>,
  options: UseErrorHandlerOptions = {}
) {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<R | null>(null)
  
  const { handleError, clearError, retry, ...errorState } = useErrorHandler(undefined, options)

  const execute = useCallback(async (...args: T): Promise<R | null> => {
    setIsLoading(true)
    clearError()

    try {
      const result = await operation(...args)
      setData(result)
      return result
    } catch (error) {
      handleError(error, { 
        component: 'useAsyncOperation',
        action: 'execute',
        args: args.length > 0 ? args[0] : undefined
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }, [operation, handleError, clearError])

  const retryOperation = useCallback(async () => {
    if (errorState.canRetry) {
      setIsLoading(true)
      try {
        await retry()
      } finally {
        setIsLoading(false)
      }
    }
  }, [retry, errorState.canRetry])

  return {
    execute,
    isLoading,
    data,
    retry: retryOperation,
    reset: () => {
      setData(null)
      clearError()
    },
    ...errorState
  }
}

/**
 * Hook for form validation and error handling
 */
export function useFormErrors<T extends Record<string, any>>() {
  const [fieldErrors, setFieldErrors] = useState<Record<keyof T, string[]>>({} as Record<keyof T, string[]>)
  const [formError, setFormError] = useState<AppError | null>(null)

  const setFieldError = useCallback((field: keyof T, errors: string | string[]) => {
    setFieldErrors(prev => ({
      ...prev,
      [field]: Array.isArray(errors) ? errors : [errors]
    }))
  }, [])

  const clearFieldError = useCallback((field: keyof T) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  const clearAllErrors = useCallback(() => {
    setFieldErrors({} as Record<keyof T, string[]>)
    setFormError(null)
  }, [])

  const hasFieldError = useCallback((field: keyof T) => {
    return Boolean(fieldErrors[field]?.length)
  }, [fieldErrors])

  const getFieldError = useCallback((field: keyof T) => {
    return fieldErrors[field]?.[0] || ''
  }, [fieldErrors])

  const hasAnyErrors = Object.keys(fieldErrors).length > 0 || formError !== null

  return {
    fieldErrors,
    formError,
    setFieldError,
    clearFieldError,
    setFormError,
    clearAllErrors,
    hasFieldError,
    getFieldError,
    hasAnyErrors
  }
}

/**
 * Hook for error notifications/toasts
 */
export function useErrorNotifications() {
  const [notifications, setNotifications] = useState<Array<{
    id: string
    error: AppError
    timestamp: number
  }>>([])

  const addNotification = useCallback((error: AppError) => {
    const id = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    setNotifications(prev => [...prev, {
      id,
      error,
      timestamp: Date.now()
    }])

    // Auto-remove after 5 seconds for low severity errors
    if (error.severity === 'low') {
      setTimeout(() => {
        removeNotification(id)
      }, 5000)
    }
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  }
}

/**
 * Hook for global error listening
 */
export function useGlobalErrorHandler(
  onError?: (error: AppError) => void
) {
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = ErrorFactory.fromUnknownError(event.reason, {
        component: 'globalErrorHandler',
        action: 'unhandledRejection'
      })
      
      onError?.(error)
      errorLogger.log(error)
    }

    const handleError = (event: ErrorEvent) => {
      const error = ErrorFactory.fromUnknownError(event.error || event.message, {
        component: 'globalErrorHandler',
        action: 'uncaughtError',
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      })
      
      onError?.(error)
      errorLogger.log(error)
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleError)
    }
  }, [onError])
}

/**
 * Hook for retry with exponential backoff
 */
export function useRetryWithBackoff(
  operation: () => Promise<any>,
  options: {
    maxRetries?: number
    initialDelay?: number
    maxDelay?: number
    backoffFactor?: number
  } = {}
) {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    backoffFactor = 2
  } = options

  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const executeWithRetry = useCallback(async () => {
    let lastError: unknown

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          setIsRetrying(true)
          const delay = Math.min(
            initialDelay * Math.pow(backoffFactor, attempt - 1),
            maxDelay
          )
          await new Promise(resolve => setTimeout(resolve, delay))
        }

        setRetryCount(attempt)
        const result = await operation()
        setIsRetrying(false)
        setRetryCount(0)
        return result

      } catch (error) {
        lastError = error
        
        if (attempt === maxRetries) {
          setIsRetrying(false)
          throw error
        }
      }
    }

    throw lastError
  }, [operation, maxRetries, initialDelay, maxDelay, backoffFactor])

  return {
    executeWithRetry,
    isRetrying,
    retryCount
  }
}

/**
 * Utility functions
 */
function showErrorToast(error: AppError) {
  if (typeof window === 'undefined') return

  // Integration with toast library (e.g., react-hot-toast, sonner)
  if ((window as any).toast) {
    const toastFunction = ErrorSeverityHelpers.isCritical(error) || ErrorSeverityHelpers.isHigh(error)
      ? (window as any).toast.error
      : (window as any).toast

    toastFunction?.(error.userMessage, {
      id: `error-${error.code}`,
      duration: ErrorSeverityHelpers.isLow(error) ? 3000 : 5000
    })
  } else {
    // Fallback to console
    console.error('Error:', error.userMessage)
  }
}

/**
 * Error boundary hook for functional components
 */
export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null)

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  const captureError = useCallback((error: Error) => {
    setError(error)
  }, [])

  if (error) {
    throw error
  }

  return {
    captureError,
    resetError
  }
}

/**
 * Hook for debounced error handling
 */
export function useDebouncedErrorHandler(
  onError: (error: AppError) => void,
  delay: number = 300
) {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const errorCountRef = useRef<Map<string, number>>(new Map())

  const debouncedHandler = useCallback((error: AppError) => {
    const errorKey = `${error.code}-${error.context?.component || 'unknown'}`
    const currentCount = errorCountRef.current.get(errorKey) || 0
    errorCountRef.current.set(errorKey, currentCount + 1)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      const count = errorCountRef.current.get(errorKey) || 1
      
      // Enhance error with frequency information
      const enhancedError = new AppError({
        ...error,
        context: {
          ...error.context,
          metadata: {
            ...error.context?.metadata,
            frequency: count,
            timeWindow: delay
          }
        }
      })

      onError(enhancedError)
      errorCountRef.current.delete(errorKey)
    }, delay)
  }, [onError, delay])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedHandler
}