/**
 * Hook: usePaymentMethods
 * 
 * Application layer hook for payment method management.
 * Handles payment method CRUD operations and state management.
 */

import { useState, useCallback } from 'react'
import { PaymentMethod } from '../../../core/entities/client/types'
import {
  AddPaymentMethodUseCase,
  AddPaymentMethodRequest,
  UpdatePaymentMethodUseCase,
  UpdatePaymentMethodRequest,
  SetPrimaryPaymentMethodUseCase,
  SetPrimaryPaymentMethodRequest,
  RemovePaymentMethodUseCase,
  RemovePaymentMethodRequest
} from '../../../core/use-cases/client'

// Define response types locally since they don't exist in use cases
interface AddPaymentMethodResponse {
  success: boolean
  data?: PaymentMethod
  errors?: string[]
}

interface UpdatePaymentMethodResponse {
  success: boolean
  data?: PaymentMethod
  errors?: string[]
}

interface UsePaymentMethodsProps {
  clientId: string
  addPaymentMethodUseCase: AddPaymentMethodUseCase
  updatePaymentMethodUseCase: UpdatePaymentMethodUseCase
  setPrimaryPaymentMethodUseCase: SetPrimaryPaymentMethodUseCase
  removePaymentMethodUseCase: RemovePaymentMethodUseCase
  onPaymentMethodChange?: () => void // Callback to refresh payment method list
}

interface UsePaymentMethodsResult {
  loading: boolean
  error: string | null
  addPaymentMethod: (request: Omit<AddPaymentMethodRequest, 'clientId'>) => Promise<AddPaymentMethodResponse>
  updatePaymentMethod: (request: Omit<UpdatePaymentMethodRequest, 'clientId'>) => Promise<UpdatePaymentMethodResponse>
  setPrimaryPaymentMethod: (paymentMethodId: string) => Promise<void>
  removePaymentMethod: (paymentMethodId: string) => Promise<void>
}

export const usePaymentMethods = ({
  clientId,
  addPaymentMethodUseCase,
  updatePaymentMethodUseCase,
  setPrimaryPaymentMethodUseCase,
  removePaymentMethodUseCase,
  onPaymentMethodChange
}: UsePaymentMethodsProps): UsePaymentMethodsResult => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addPaymentMethod = useCallback(async (
    request: Omit<AddPaymentMethodRequest, 'clientId'>
  ): Promise<AddPaymentMethodResponse> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await addPaymentMethodUseCase.execute({
        ...request,
        clientId
      })
      
      if (response.success && onPaymentMethodChange) {
        onPaymentMethodChange()
      }
      
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add payment method'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [clientId, addPaymentMethodUseCase, onPaymentMethodChange])

  const updatePaymentMethod = useCallback(async (
    request: Omit<UpdatePaymentMethodRequest, 'clientId'>
  ): Promise<UpdatePaymentMethodResponse> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await updatePaymentMethodUseCase.execute({
        ...request,
        clientId
      })
      
      if (response.success && onPaymentMethodChange) {
        onPaymentMethodChange()
      }
      
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update payment method'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [clientId, updatePaymentMethodUseCase, onPaymentMethodChange])

  const setPrimaryPaymentMethod = useCallback(async (paymentMethodId: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await setPrimaryPaymentMethodUseCase.execute({
        paymentMethodId,
        clientId
      })
      
      if (!response.success && response.errors) {
        throw new Error(response.errors.join(', '))
      }
      
      if (onPaymentMethodChange) {
        onPaymentMethodChange()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to set primary payment method'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [clientId, setPrimaryPaymentMethodUseCase, onPaymentMethodChange])

  const removePaymentMethod = useCallback(async (paymentMethodId: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await removePaymentMethodUseCase.execute({
        paymentMethodId,
        clientId
      })
      
      if (!response.success && response.errors) {
        throw new Error(response.errors.join(', '))
      }
      
      if (onPaymentMethodChange) {
        onPaymentMethodChange()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove payment method'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [clientId, removePaymentMethodUseCase, onPaymentMethodChange])

  return {
    loading,
    error,
    addPaymentMethod,
    updatePaymentMethod,
    setPrimaryPaymentMethod,
    removePaymentMethod
  }
}