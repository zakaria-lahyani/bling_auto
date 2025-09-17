/**
 * Enhanced Data Fetching Hook with Comprehensive State Management
 * 
 * Provides consistent loading, error, and empty states across the application
 * with built-in retry logic and error recovery mechanisms.
 */

import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query'
import { useState, useCallback } from 'react'
import { logger } from '@/shared/utils/logger'

export interface DataState<T> {
  data: T | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  isEmpty: boolean
  isStale: boolean
  isFetching: boolean
  retry: () => void
  refetch: () => Promise<any>
  lastUpdated: Date | null
}

export interface DataWithStatesOptions<T> extends Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'> {
  emptyChecker?: (data: T | undefined) => boolean
  retryAttempts?: number
  retryDelay?: number
  logContext?: {
    component?: string
    action?: string
  }
  onError?: (error: Error) => void
  onSuccess?: (data: T) => void
  onRetry?: (attempt: number) => void
}

/**
 * Enhanced data fetching hook with comprehensive state management
 */
export function useDataWithStates<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options: DataWithStatesOptions<T> = {}
): DataState<T> {
  const {
    emptyChecker = (data) => !data || (Array.isArray(data) && data.length === 0),
    retryAttempts = 3,
    retryDelay = 1000,
    logContext = {},
    onError,
    onSuccess,
    onRetry,
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus = false,
    ...queryOptions
  } = options

  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        logger.debug('Data fetch started', {
          component: logContext.component,
          action: logContext.action,
          metadata: { queryKey }
        })

        const result = await queryFn()
        setLastUpdated(new Date())
        
        onSuccess?.(result)
        
        logger.info('Data fetch successful', {
          component: logContext.component,
          action: logContext.action,
          metadata: { 
            queryKey,
            resultType: typeof result,
            isEmpty: emptyChecker(result)
          }
        })

        return result
      } catch (error) {
        logger.error('Data fetch failed', {
          component: logContext.component,
          action: logContext.action,
          metadata: { 
            queryKey,
            error: error instanceof Error ? error.message : 'Unknown error'
          }
        })

        onError?.(error instanceof Error ? error : new Error('Unknown error'))
        throw error
      }
    },
    enabled,
    staleTime,
    refetchOnWindowFocus,
    retry: (failureCount, error) => {
      // Don't retry on certain error types
      if (error instanceof Error) {
        // Don't retry on 4xx errors (client errors)
        if ('status' in error && typeof error.status === 'number') {
          if (error.status >= 400 && error.status < 500) {
            return false
          }
        }
        
        // Don't retry on validation errors
        if (error.message.includes('validation') || error.message.includes('invalid')) {
          return false
        }
      }

      const shouldRetry = failureCount < retryAttempts
      
      if (shouldRetry) {
        onRetry?.(failureCount + 1)
        logger.warn('Retrying data fetch', {
          component: logContext.component,
          action: logContext.action,
          metadata: { 
            queryKey,
            attempt: failureCount + 1,
            maxAttempts: retryAttempts
          }
        })
      }

      return shouldRetry
    },
    retryDelay: (attemptIndex) => {
      return Math.min(retryDelay * Math.pow(2, attemptIndex), 30000) // Max 30 seconds
    },
    ...queryOptions
  })

  const retry = useCallback(() => {
    logger.info('Manual retry triggered', {
      component: logContext.component,
      action: logContext.action,
      metadata: { queryKey }
    })
    query.refetch()
  }, [query.refetch, logContext, queryKey])

  const isEmpty = !query.isLoading && !query.isError && emptyChecker(query.data)
  const isStale = query.isStale || (lastUpdated && Date.now() - lastUpdated.getTime() > (typeof staleTime === 'number' ? staleTime : 5 * 60 * 1000))

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    isEmpty,
    isStale: Boolean(isStale),
    isFetching: query.isFetching,
    retry,
    refetch: query.refetch,
    lastUpdated
  }
}

/**
 * Hook for paginated data with enhanced state management
 */
export function usePaginatedDataWithStates<T>(
  queryKey: QueryKey,
  queryFn: (page: number) => Promise<{ data: T[]; total: number; hasNext: boolean }>,
  options: DataWithStatesOptions<{ data: T[]; total: number; hasNext: boolean }> & {
    initialPage?: number
  } = {}
) {
  const { initialPage = 1, ...restOptions } = options
  const [currentPage, setCurrentPage] = useState(initialPage)

  const dataState = useDataWithStates(
    [...(Array.isArray(queryKey) ? queryKey : [queryKey]), 'page', currentPage],
    () => queryFn(currentPage),
    {
      ...restOptions,
      emptyChecker: (data) => !data?.data || data.data.length === 0
    }
  )

  const nextPage = useCallback(() => {
    if (dataState.data?.hasNext) {
      setCurrentPage(prev => prev + 1)
    }
  }, [dataState.data?.hasNext])

  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }, [currentPage])

  const goToPage = useCallback((page: number) => {
    if (page >= 1) {
      setCurrentPage(page)
    }
  }, [])

  return {
    ...dataState,
    items: dataState.data?.data || [],
    total: dataState.data?.total || 0,
    currentPage,
    hasNext: dataState.data?.hasNext || false,
    hasPrevious: currentPage > 1,
    nextPage,
    previousPage,
    goToPage
  }
}

/**
 * Hook for multiple data sources with combined state
 */
export function useMultipleDataSources<T extends Record<string, any>>(
  sources: {
    [K in keyof T]: {
      queryKey: QueryKey
      queryFn: () => Promise<T[K]>
      options?: DataWithStatesOptions<T[K]>
    }
  }
) {
  const results = {} as {
    [K in keyof T]: DataState<T[K]>
  }

  // Create individual hooks for each source
  Object.entries(sources).forEach(([key, source]) => {
    const { queryKey, queryFn, options = {} } = source as any
    // eslint-disable-next-line react-hooks/rules-of-hooks
    results[key as keyof T] = useDataWithStates(queryKey, queryFn, options)
  })

  // Calculate combined states
  const allStates = Object.values(results) as DataState<any>[]
  const isLoading = allStates.some(state => state.isLoading)
  const isError = allStates.some(state => state.isError)
  const isEmpty = allStates.every(state => state.isEmpty)
  const errors = allStates.filter(state => state.error).map(state => state.error!)

  const retryAll = useCallback(() => {
    allStates.forEach(state => state.retry())
  }, [allStates])

  const refetchAll = useCallback(async () => {
    await Promise.all(allStates.map(state => state.refetch()))
  }, [allStates])

  return {
    ...results,
    combined: {
      isLoading,
      isError,
      isEmpty,
      errors,
      retryAll,
      refetchAll,
      isReady: !isLoading && !isError
    }
  }
}

/**
 * Hook for optimistic updates with error recovery
 */
export function useOptimisticData<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options: DataWithStatesOptions<T> = {}
) {
  const [optimisticData, setOptimisticData] = useState<T | undefined>()
  const [isOptimistic, setIsOptimistic] = useState(false)

  const dataState = useDataWithStates(queryKey, queryFn, options)

  const updateOptimistically = useCallback((newData: T, revert?: () => void) => {
    setOptimisticData(newData)
    setIsOptimistic(true)

    // Auto-revert after a timeout if no server confirmation
    const revertTimeout = setTimeout(() => {
      if (isOptimistic) {
        setOptimisticData(undefined)
        setIsOptimistic(false)
        revert?.()
      }
    }, 10000) // 10 seconds

    return () => clearTimeout(revertTimeout)
  }, [isOptimistic])

  const confirmOptimisticUpdate = useCallback(() => {
    setIsOptimistic(false)
    setOptimisticData(undefined)
    dataState.refetch()
  }, [dataState])

  const revertOptimisticUpdate = useCallback(() => {
    setOptimisticData(undefined)
    setIsOptimistic(false)
  }, [])

  return {
    ...dataState,
    data: isOptimistic ? optimisticData : dataState.data,
    isOptimistic,
    updateOptimistically,
    confirmOptimisticUpdate,
    revertOptimisticUpdate
  }
}