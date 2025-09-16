import { useState, useEffect, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { sdk } from '@/infrastructure/api'
import type { DashboardData } from '@/types/apps/dashboardTypes'
// Mappers no longer needed with simplified fake-db pattern

interface UseDashboardResult {
  data: DashboardData | null
  loading: boolean
  error: string | null
  refresh: () => void
  clearError: () => void
}

export const useDashboard = (): UseDashboardResult => {
  const [error, setError] = useState<string | null>(null)

  // Use TanStack Query for dashboard data fetching through SDK
  const {
    data: dashboardData,
    isLoading,
    error: queryError,
    refetch
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      try {
        // For now, we'll use mock data through the SDK
        // TODO: Replace with real API calls once backend is ready
        // Get dashboard data using the new fake-db structure
        const dashboardData = await sdk.dashboard.getData()
        
        return dashboardData
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard data'
        throw new Error(errorMessage)
      }
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  // Handle errors
  const errorMessage = error || (queryError?.message)

  // Clear error function
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Refresh function
  const refresh = useCallback(() => {
    refetch()
  }, [refetch])

  return {
    data: dashboardData || null,
    loading: isLoading,
    error: errorMessage || null,
    refresh,
    clearError
  }
}