/**
 * Hook: useClientProfile
 * 
 * Application layer hook for client profile management.
 * Handles profile data fetching and updating.
 */

import { useState, useEffect } from 'react'
import { 
  GetClientProfileUseCase, 
  GetClientProfileResponse,
  UpdateClientProfileUseCase,
  UpdateClientProfileRequest,
  UpdateClientProfileResponse
} from '../../../core/use-cases/client'

interface UseClientProfileProps {
  clientId: string
  getProfileUseCase: GetClientProfileUseCase
  updateProfileUseCase: UpdateClientProfileUseCase
}

interface UseClientProfileResult {
  profile: GetClientProfileResponse | null
  loading: boolean
  error: string | null
  updating: boolean
  updateError: string | null
  refresh: () => Promise<void>
  updateProfile: (request: Omit<UpdateClientProfileRequest, 'clientId'>) => Promise<UpdateClientProfileResponse>
}

export const useClientProfile = ({ 
  clientId, 
  getProfileUseCase,
  updateProfileUseCase
}: UseClientProfileProps): UseClientProfileResult => {
  const [profile, setProfile] = useState<GetClientProfileResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await getProfileUseCase.execute({ clientId })
      setProfile(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile')
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (
    request: Omit<UpdateClientProfileRequest, 'clientId'>
  ): Promise<UpdateClientProfileResponse> => {
    try {
      setUpdating(true)
      setUpdateError(null)
      
      const response = await updateProfileUseCase.execute({
        ...request,
        clientId
      })
      
      if (response.success && profile) {
        // Update local state with new client data
        setProfile({
          ...profile,
          client: response.client
        })
      }
      
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile'
      setUpdateError(errorMessage)
      throw err
    } finally {
      setUpdating(false)
    }
  }

  useEffect(() => {
    if (clientId) {
      fetchProfile()
    }
  }, [clientId])

  const refresh = async () => {
    await fetchProfile()
  }

  return {
    profile,
    loading,
    error,
    updating,
    updateError,
    refresh,
    updateProfile
  }
}