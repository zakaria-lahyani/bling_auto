/**
 * Hook: useClientDashboard
 * 
 * Application layer hook for client dashboard data.
 * Integrates with use cases and provides React state management.
 */

import { useState, useEffect } from 'react'
import { GetClientDashboardUseCase, GetClientDashboardResponse } from '../../../core/use-cases/client'

interface UseClientDashboardProps {
  clientId: string
  getDashboardUseCase: GetClientDashboardUseCase
}

interface UseClientDashboardResult {
  dashboard: GetClientDashboardResponse | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export const useClientDashboard = ({ 
  clientId, 
  getDashboardUseCase 
}: UseClientDashboardProps): UseClientDashboardResult => {
  const [dashboard, setDashboard] = useState<GetClientDashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await getDashboardUseCase.execute({ clientId })
      setDashboard(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard')
      setDashboard(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (clientId) {
      fetchDashboard()
    }
  }, [clientId])

  const refresh = async () => {
    await fetchDashboard()
  }

  return {
    dashboard,
    loading,
    error,
    refresh
  }
}