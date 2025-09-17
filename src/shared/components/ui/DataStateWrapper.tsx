/**
 * Data State Wrapper Component
 * 
 * A reusable wrapper that handles loading, error, and empty states
 * for data-driven components with consistent UX patterns.
 */

import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import { ErrorRecovery, EmptyState, type ErrorInfo } from './ErrorRecovery'
import type { DataState } from '@/shared/hooks/useDataWithStates'

interface DataStateWrapperProps<T> {
  dataState: DataState<T>
  children: (data: T) => React.ReactNode
  
  // Loading state customization
  loadingComponent?: React.ReactNode
  loadingMessage?: string
  
  // Error state customization
  errorComponent?: React.ReactNode
  onRetry?: () => void
  
  // Empty state customization
  emptyComponent?: React.ReactNode
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: {
    label: string
    onClick: () => void
  }
  
  // Layout customization
  className?: string
  minHeight?: string
  showLastUpdated?: boolean
  
  // Advanced options
  renderWhileLoading?: boolean
  hideErrorDetails?: boolean
}

/**
 * Wrapper component that handles all data states
 */
export const DataStateWrapper = <T,>({
  dataState,
  children,
  loadingComponent,
  loadingMessage = 'Loading...',
  errorComponent,
  onRetry,
  emptyComponent,
  emptyTitle,
  emptyDescription,
  emptyAction,
  className = '',
  minHeight = '200px',
  showLastUpdated = false,
  renderWhileLoading = false,
  hideErrorDetails = false
}: DataStateWrapperProps<T>) => {
  const { data, isLoading, isError, error, isEmpty, lastUpdated, retry } = dataState

  // Error state
  if (isError && error) {
    if (errorComponent) {
      return <div className={className}>{errorComponent}</div>
    }

    const errorInfo: ErrorInfo = {
      type: getErrorType(error),
      message: error.message,
      details: hideErrorDetails ? undefined : error.stack,
      timestamp: new Date(),
      retry: onRetry || retry
    }

    return (
      <div className={className} style={{ minHeight }}>
        <ErrorRecovery error={errorInfo} />
      </div>
    )
  }

  // Loading state
  if (isLoading && !renderWhileLoading) {
    if (loadingComponent) {
      return <div className={className}>{loadingComponent}</div>
    }

    return (
      <div className={`flex items-center justify-center ${className}`} style={{ minHeight }}>
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">{loadingMessage}</p>
        </div>
      </div>
    )
  }

  // Empty state
  if (isEmpty) {
    if (emptyComponent) {
      return <div className={className}>{emptyComponent}</div>
    }

    return (
      <div className={className} style={{ minHeight }}>
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
        />
      </div>
    )
  }

  // Success state with data
  if (data) {
    return (
      <div className={className}>
        {showLastUpdated && lastUpdated && (
          <div className="text-xs text-gray-500 mb-2">
            Last updated: {lastUpdated.toLocaleString()}
          </div>
        )}
        {children(data)}
      </div>
    )
  }

  // Fallback state
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ minHeight }}>
      <p className="text-gray-500">No data available</p>
    </div>
  )
}

/**
 * Specialized wrapper for list data
 */
export const ListStateWrapper = <T,>({
  dataState,
  children,
  emptyTitle = 'No items found',
  emptyDescription = 'There are no items to display at the moment.',
  ...props
}: Omit<DataStateWrapperProps<T[]>, 'emptyTitle' | 'emptyDescription'> & {
  emptyTitle?: string
  emptyDescription?: string
}) => (
  <DataStateWrapper
    dataState={dataState}
    emptyTitle={emptyTitle}
    emptyDescription={emptyDescription}
    {...props}
  >
    {children}
  </DataStateWrapper>
)

/**
 * Inline data state component for smaller UI elements
 */
export const InlineDataState = <T,>({
  dataState,
  children,
  loadingText = 'Loading...',
  errorText = 'Error',
  emptyText = 'No data',
  className = ''
}: {
  dataState: DataState<T>
  children: (data: T) => React.ReactNode
  loadingText?: string
  errorText?: string
  emptyText?: string
  className?: string
}) => {
  const { data, isLoading, isError, isEmpty } = dataState

  if (isLoading) {
    return (
      <span className={`text-gray-500 text-sm ${className}`}>
        {loadingText}
      </span>
    )
  }

  if (isError) {
    return (
      <span className={`text-red-500 text-sm ${className}`}>
        {errorText}
      </span>
    )
  }

  if (isEmpty) {
    return (
      <span className={`text-gray-400 text-sm ${className}`}>
        {emptyText}
      </span>
    )
  }

  if (data) {
    return <>{children(data)}</>
  }

  return null
}

/**
 * Conditional data renderer
 */
export const ConditionalDataRender = <T,>({
  dataState,
  children,
  fallback = null
}: {
  dataState: DataState<T>
  children: (data: T) => React.ReactNode
  fallback?: React.ReactNode
}) => {
  const { data, isLoading, isError, isEmpty } = dataState

  if (isLoading || isError || isEmpty || !data) {
    return <>{fallback}</>
  }

  return <>{children(data)}</>
}

/**
 * Data state indicator (for debugging or status display)
 */
export const DataStateIndicator = <T,>({
  dataState,
  showDetails = false,
  className = ''
}: {
  dataState: DataState<T>
  showDetails?: boolean
  className?: string
}) => {
  const { isLoading, isError, isEmpty, isFetching, isStale, lastUpdated } = dataState

  const getStateColor = () => {
    if (isError) return 'bg-red-100 text-red-800'
    if (isLoading) return 'bg-blue-100 text-blue-800'
    if (isEmpty) return 'bg-gray-100 text-gray-800'
    if (isStale) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const getStateText = () => {
    if (isError) return 'Error'
    if (isLoading) return 'Loading'
    if (isEmpty) return 'Empty'
    if (isFetching) return 'Updating'
    if (isStale) return 'Stale'
    return 'Ready'
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStateColor()}`}>
        {getStateText()}
      </span>
      
      {showDetails && lastUpdated && (
        <span className="text-xs text-gray-500">
          {lastUpdated.toLocaleTimeString()}
        </span>
      )}
    </div>
  )
}

// Helper function to determine error type
function getErrorType(error: Error): ErrorInfo['type'] {
  const message = error.message.toLowerCase()
  
  if (message.includes('network') || message.includes('fetch')) {
    return 'network'
  }
  
  if (message.includes('not found') || message.includes('404')) {
    return 'notFound'
  }
  
  if (message.includes('unauthorized') || message.includes('forbidden')) {
    return 'permission'
  }
  
  if (message.includes('validation') || message.includes('invalid')) {
    return 'validation'
  }
  
  if (message.includes('server') || message.includes('500')) {
    return 'server'
  }
  
  return 'unknown'
}