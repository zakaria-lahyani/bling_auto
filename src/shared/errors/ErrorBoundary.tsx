/**
 * React Error Boundaries
 * 
 * Comprehensive error boundary components with different fallback UIs
 * and automatic error recovery.
 */

import React, { Component, ReactNode, ErrorInfo } from 'react'
import { AppError, ErrorCode, ErrorSeverity, ErrorFactory } from './types'
import { errorLogger } from './logger'

interface ErrorBoundaryState {
  hasError: boolean
  error?: AppError
  errorId?: string
  retryCount: number
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ComponentType<ErrorFallbackProps>
  onError?: (error: AppError, errorId: string) => void
  maxRetries?: number
  resetOnPropsChange?: boolean
  resetKeys?: Array<string | number>
  isolate?: boolean
  level?: 'page' | 'component' | 'feature'
}

interface ErrorFallbackProps {
  error: AppError
  errorId: string
  retry: () => void
  canRetry: boolean
  retryCount: number
  resetErrorBoundary: () => void
}

type ComponentType<P = {}> = React.ComponentType<P>

/**
 * Base Error Boundary
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null
  private readonly maxRetries: number

  constructor(props: ErrorBoundaryProps) {
    super(props)
    
    this.state = {
      hasError: false,
      retryCount: 0
    }
    
    this.maxRetries = props.maxRetries ?? 3
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `boundary-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const appError = ErrorFactory.fromUnknownError(error, {
      component: 'ErrorBoundary',
      action: 'render'
    })

    return {
      hasError: true,
      error: appError,
      errorId
    }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props
    const { error: appError, errorId } = this.state

    if (appError && errorId) {
      // Add React-specific context
      const enhancedError = new AppError({
        ...appError,
        context: {
          ...appError.context,
          metadata: {
            ...appError.context?.metadata,
            reactStack: errorInfo.componentStack,
            errorBoundaryLevel: this.props.level || 'component'
          }
        }
      })

      // Log the error
      errorLogger.log(enhancedError, {
        component: 'ErrorBoundary',
        action: 'componentDidCatch'
      })

      // Call custom error handler
      onError?.(enhancedError, errorId)
    }
  }

  override componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetOnPropsChange, resetKeys } = this.props
    const { hasError } = this.state

    if (hasError && resetOnPropsChange) {
      if (resetKeys) {
        const hasResetKeyChanged = resetKeys.some(
          (key, index) => key !== prevProps.resetKeys?.[index]
        )
        if (hasResetKeyChanged) {
          this.resetErrorBoundary()
        }
      }
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      window.clearTimeout(this.resetTimeoutId)
    }

    this.setState({
      hasError: false,
      error: undefined,
      errorId: undefined,
      retryCount: 0
    })
  }

  retry = () => {
    const { retryCount } = this.state
    
    if (retryCount < this.maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: undefined,
        errorId: undefined,
        retryCount: prevState.retryCount + 1
      }))
    }
  }

  override render() {
    const { hasError, error, errorId, retryCount } = this.state
    const { children, fallback: FallbackComponent } = this.props

    if (hasError && error && errorId) {
      const canRetry = retryCount < this.maxRetries
      
      if (FallbackComponent) {
        return (
          <FallbackComponent
            error={error}
            errorId={errorId}
            retry={this.retry}
            canRetry={canRetry}
            retryCount={retryCount}
            resetErrorBoundary={this.resetErrorBoundary}
          />
        )
      }

      return (
        <DefaultErrorFallback
          error={error}
          errorId={errorId}
          retry={this.retry}
          canRetry={canRetry}
          retryCount={retryCount}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      )
    }

    return children
  }
}

/**
 * Default Error Fallback Component
 */
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorId,
  retry,
  canRetry,
  retryCount,
  resetErrorBoundary
}) => {
  return (
    <div className="error-boundary-fallback">
      <div className="error-boundary-content">
        <div className="error-icon">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-red-500">
            <path
              fill="currentColor"
              d="M12,2L13.09,8.26L22,9L17,14L18.18,21L12,17.77L5.82,21L7,14L2,9L8.91,8.26L12,2Z"
            />
          </svg>
        </div>
        
        <h2 className="error-title">Something went wrong</h2>
        
        <p className="error-message">
          {error.userMessage}
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="error-details">
            <summary>Technical Details (Development Only)</summary>
            <pre className="error-stack">
              <strong>Error Code:</strong> {error.code}{'\n'}
              <strong>Error ID:</strong> {errorId}{'\n'}
              <strong>Message:</strong> {error.message}{'\n'}
              <strong>Retry Count:</strong> {retryCount}{'\n'}
              {error.stack && (
                <>
                  <strong>Stack Trace:</strong>{'\n'}
                  {error.stack}
                </>
              )}
            </pre>
          </details>
        )}

        <div className="error-actions">
          {canRetry && (
            <button
              onClick={retry}
              className="btn btn-primary"
            >
              Try Again
            </button>
          )}
          
          <button
            onClick={resetErrorBoundary}
            className="btn btn-secondary"
          >
            Reset
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="btn btn-secondary"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Page-Level Error Boundary
 */
export const PageErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary
      level="page"
      maxRetries={1}
      fallback={PageErrorFallback}
    >
      {children}
    </ErrorBoundary>
  )
}

const PageErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  retry,
  canRetry
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
          <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <div className="mt-4 text-center">
          <h1 className="text-lg font-medium text-gray-900">
            Page Error
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {error.userMessage}
          </p>
        </div>

        <div className="mt-6 flex flex-col space-y-3">
          {canRetry && (
            <button
              onClick={retry}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Try Again
            </button>
          )}
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Feature-Level Error Boundary
 */
export const FeatureErrorBoundary: React.FC<{
  children: ReactNode
  featureName: string
}> = ({ children, featureName }) => {
  return (
    <ErrorBoundary
      level="feature"
      maxRetries={2}
      fallback={(props) => <FeatureErrorFallback {...props} featureName={featureName} />}
    >
      {children}
    </ErrorBoundary>
  )
}

const FeatureErrorFallback: React.FC<ErrorFallbackProps & { featureName: string }> = ({
  error,
  retry,
  canRetry,
  featureName
}) => {
  return (
    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {featureName} Unavailable
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error.userMessage}</p>
          </div>
          {canRetry && (
            <div className="mt-4">
              <button
                onClick={retry}
                className="bg-red-100 text-red-800 px-3 py-1 text-sm rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Component-Level Error Boundary (Minimal UI impact)
 */
export const ComponentErrorBoundary: React.FC<{
  children: ReactNode
  componentName?: string
}> = ({ children, componentName = 'Component' }) => {
  return (
    <ErrorBoundary
      level="component"
      maxRetries={3}
      fallback={(props) => <ComponentErrorFallback {...props} componentName={componentName} />}
    >
      {children}
    </ErrorBoundary>
  )
}

const ComponentErrorFallback: React.FC<ErrorFallbackProps & { componentName: string }> = ({
  error,
  retry,
  canRetry,
  componentName
}) => {
  return (
    <div className="p-2 text-center text-gray-500 border border-gray-200 rounded">
      <p className="text-sm">
        {componentName} failed to load
      </p>
      {canRetry && (
        <button
          onClick={retry}
          className="mt-1 text-xs text-blue-600 hover:text-blue-800 underline"
        >
          Retry
        </button>
      )}
    </div>
  )
}

/**
 * Higher-Order Component for Error Boundaries
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

/**
 * Hook for Error Boundary Reset
 */
export function useErrorBoundaryReset() {
  const [resetKey, setResetKey] = React.useState(0)
  
  const reset = React.useCallback(() => {
    setResetKey(prev => prev + 1)
  }, [])

  return { resetKey, reset }
}