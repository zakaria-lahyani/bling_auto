/**
 * Hook: useVehicleManagement
 * 
 * Application layer hook for vehicle management operations.
 * Handles vehicle CRUD operations and state management.
 */

import { useState, useCallback } from 'react'
import { Vehicle } from '../../../core/entities/client/types'
import {
  AddVehicleUseCase,
  AddVehicleRequest,
  UpdateVehicleUseCase,
  UpdateVehicleRequest,
  SetPrimaryVehicleUseCase,
  SetPrimaryVehicleRequest,
  RemoveVehicleUseCase,
  RemoveVehicleRequest
} from '../../../core/use-cases/client'

// Define response types locally since they don't exist in use cases
interface AddVehicleResponse {
  success: boolean
  data?: Vehicle
  errors?: string[]
}

interface UpdateVehicleResponse {
  success: boolean
  data?: Vehicle
  errors?: string[]
}

interface UseVehicleManagementProps {
  clientId: string
  addVehicleUseCase: AddVehicleUseCase
  updateVehicleUseCase: UpdateVehicleUseCase
  setPrimaryVehicleUseCase: SetPrimaryVehicleUseCase
  removeVehicleUseCase: RemoveVehicleUseCase
  onVehicleChange?: () => void // Callback to refresh vehicle list
}

interface UseVehicleManagementResult {
  loading: boolean
  error: string | null
  addVehicle: (request: Omit<AddVehicleRequest, 'clientId'>) => Promise<AddVehicleResponse>
  updateVehicle: (request: Omit<UpdateVehicleRequest, 'clientId'>) => Promise<UpdateVehicleResponse>
  setPrimaryVehicle: (vehicleId: string) => Promise<void>
  removeVehicle: (vehicleId: string) => Promise<void>
}

export const useVehicleManagement = ({
  clientId,
  addVehicleUseCase,
  updateVehicleUseCase,
  setPrimaryVehicleUseCase,
  removeVehicleUseCase,
  onVehicleChange
}: UseVehicleManagementProps): UseVehicleManagementResult => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addVehicle = useCallback(async (
    request: Omit<AddVehicleRequest, 'clientId'>
  ): Promise<AddVehicleResponse> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await addVehicleUseCase.execute({
        ...request,
        clientId
      })
      
      if (response.success && onVehicleChange) {
        onVehicleChange()
      }
      
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add vehicle'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [clientId, addVehicleUseCase, onVehicleChange])

  const updateVehicle = useCallback(async (
    request: Omit<UpdateVehicleRequest, 'clientId'>
  ): Promise<UpdateVehicleResponse> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await updateVehicleUseCase.execute({
        ...request,
        clientId
      })
      
      if (response.success && onVehicleChange) {
        onVehicleChange()
      }
      
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update vehicle'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [clientId, updateVehicleUseCase, onVehicleChange])

  const setPrimaryVehicle = useCallback(async (vehicleId: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await setPrimaryVehicleUseCase.execute({
        vehicleId,
        clientId
      })
      
      if (!response.success && response.errors) {
        throw new Error(response.errors.join(', '))
      }
      
      if (onVehicleChange) {
        onVehicleChange()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to set primary vehicle'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [clientId, setPrimaryVehicleUseCase, onVehicleChange])

  const removeVehicle = useCallback(async (vehicleId: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await removeVehicleUseCase.execute({
        vehicleId,
        clientId
      })
      
      if (!response.success && response.errors) {
        throw new Error(response.errors.join(', '))
      }
      
      if (onVehicleChange) {
        onVehicleChange()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove vehicle'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [clientId, removeVehicleUseCase, onVehicleChange])

  return {
    loading,
    error,
    addVehicle,
    updateVehicle,
    setPrimaryVehicle,
    removeVehicle
  }
}