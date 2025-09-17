/**
 * Error Recovery Components
 * 
 * Reusable components for handling different types of errors
 * with appropriate recovery actions and user feedback.
 */

import React, { useState, useCallback } from 'react'
import { AlertTriangle, RefreshCw, Wifi, WifiOff, ChevronDown, ChevronUp } from 'lucide-react'
import Button from './Button'

// Error types
export type ErrorType = 'network' | 'validation' | 'notFound' | 'permission' | 'server' | 'unknown'

export interface ErrorInfo {
  type: ErrorType
  message: string
  details?: string
  code?: string
  timestamp?: Date
  retry?: () => void
  fallback?: () => void
}

interface ErrorRecoveryProps {
  error: ErrorInfo
  className?: string
  compact?: boolean
  showDetails?: boolean
  onRetry?: () => void
  onDismiss?: () => void
}

/**
 * Main error recovery component
 */
export const ErrorRecovery: React.FC<ErrorRecoveryProps> = ({
  error,
  className = '',
  compact = false,
  showDetails = false,
  onRetry,
  onDismiss
}) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(showDetails)
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = useCallback(async () => {
    if (!onRetry && !error.retry) return

    setIsRetrying(true)
    try {
      await (onRetry || error.retry)?.()
    } finally {
      setIsRetrying(false)
    }
  }, [onRetry, error.retry])

  const getErrorIcon = () => {
    switch (error.type) {
      case 'network':
        return <WifiOff className="w-5 h-5 text-red-500" />
      case 'permission':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'notFound':
        return <AlertTriangle className="w-5 h-5 text-blue-500" />
      default:
        return <AlertTriangle className="w-5 h-5 text-red-500" />
    }
  }

  const getErrorTitle = () => {
    switch (error.type) {
      case 'network':
        return 'Connection Problem'
      case 'validation':
        return 'Invalid Data'
      case 'notFound':
        return 'Not Found'
      case 'permission':
        return 'Access Denied'
      case 'server':
        return 'Server Error'
      default:
        return 'Something went wrong'
    }
  }

  const getErrorDescription = () => {
    switch (error.type) {
      case 'network':
        return 'Please check your internet connection and try again.'
      case 'validation':
        return 'Please check your input and try again.'
      case 'notFound':
        return 'The requested resource could not be found.'
      case 'permission':
        return 'You don\'t have permission to access this resource.'
      case 'server':
        return 'Our servers are experiencing issues. Please try again later.'
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

  const canRetry = error.type !== 'notFound' && error.type !== 'permission'

  if (compact) {
    return (
      <div className={`flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md ${className}`}>
        {getErrorIcon()}
        <span className="text-sm text-red-700 flex-1">{error.message}</span>
        {canRetry && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRetry}
            disabled={isRetrying}
            className="text-red-600 hover:text-red-700"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className={`border rounded-lg p-6 bg-white shadow-sm ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {getErrorIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900">
            {getErrorTitle()}
          </h3>
          
          <p className="mt-1 text-sm text-gray-600">
            {error.message || getErrorDescription()}
          </p>

          {error.details && (
            <div className="mt-3">
              <button
                onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
              >
                {isDetailsExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Hide details
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Show details
                  </>
                )}
              </button>
              
              {isDetailsExpanded && (
                <div className="mt-2 p-3 bg-gray-50 rounded-md">
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                    {error.details}
                  </pre>
                  {error.code && (
                    <p className="mt-2 text-xs text-gray-500">
                      Error code: {error.code}
                    </p>
                  )}
                  {error.timestamp && (
                    <p className="text-xs text-gray-500">
                      Time: {error.timestamp.toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            {canRetry && (
              <Button
                onClick={handleRetry}
                disabled={isRetrying}
                variant="primary"
                size="sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRetrying ? 'animate-spin' : ''}`} />
                {isRetrying ? 'Retrying...' : 'Try Again'}
              </Button>
            )}
            
            {error.fallback && (
              <Button
                onClick={error.fallback}
                variant="secondary"
                size="sm"
              >
                Use Offline Mode
              </Button>
            )}
            
            {onDismiss && (
              <Button
                onClick={onDismiss}
                variant="ghost"
                size="sm"
              >
                Dismiss
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Network error component
 */
export const NetworkError: React.FC<{
  onRetry?: () => void
  className?: string
}> = ({ onRetry, className }) => (
  <ErrorRecovery
    error={{
      type: 'network',
      message: 'Unable to connect to our servers',
      retry: onRetry
    }}
    className={className}
  />
)

/**
 * Loading error fallback
 */
export const LoadingError: React.FC<{
  message?: string
  onRetry?: () => void
  className?: string
}> = ({ message = 'Failed to load data', onRetry, className }) => (
  <ErrorRecovery
    error={{
      type: 'unknown',
      message,
      retry: onRetry
    }}
    compact
    className={className}
  />
)

/**
 * Empty state component
 */
export const EmptyState: React.FC<{
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: React.ReactNode
  className?: string
}> = ({
  title = 'No data available',
  description = 'There is no data to display at the moment.',
  action,
  icon,
  className = ''
}) => (
  <div className={`text-center py-12 ${className}`}>
    <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      {icon || <AlertTriangle className="w-6 h-6 text-gray-400" />}
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
    {action && (
      <Button onClick={action.onClick} variant="primary">
        {action.label}
      </Button>
    )}
  </div>
)

/**
 * Connection status indicator
 */
export const ConnectionStatus: React.FC<{
  isOnline: boolean
  className?: string
}> = ({ isOnline, className = '' }) => (
  <div className={`flex items-center gap-2 text-sm ${className}`}>
    {isOnline ? (
      <>
        <Wifi className="w-4 h-4 text-green-500" />
        <span className="text-green-700">Online</span>
      </>
    ) : (
      <>
        <WifiOff className="w-4 h-4 text-red-500" />
        <span className="text-red-700">Offline</span>
      </>
    )}
  </div>
)

/**
 * Retry boundary component
 */
export const RetryBoundary: React.FC<{
  children: React.ReactNode
  fallback?: (error: Error, retry: () => void) => React.ReactNode
  maxRetries?: number
  onError?: (error: Error, info: { componentStack: string }) => void
}> = ({
  children,
  fallback,
  maxRetries = 3,
  onError
}) => {
  const [error, setError] = useState<Error | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const retry = useCallback(() => {
    if (retryCount < maxRetries) {
      setError(null)
      setRetryCount(prev => prev + 1)
    }
  }, [retryCount, maxRetries])

  const resetError = useCallback(() => {
    setError(null)
    setRetryCount(0)
  }, [])

  if (error) {
    if (fallback) {
      return <>{fallback(error, retry)}</>
    }

    return (
      <ErrorRecovery
        error={{
          type: 'unknown',
          message: error.message,
          details: error.stack,
          retry: retryCount < maxRetries ? retry : undefined
        }}
      />
    )
  }

  return (
    <div>
      {children}
    </div>
  )
}