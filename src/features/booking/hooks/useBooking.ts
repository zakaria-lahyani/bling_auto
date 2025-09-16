import { useState, useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { sdk } from '@/infrastructure/api'
import type { BookingRequest, BookingSlot, BookingLocation, VehicleInfo } from '../types'

interface BookingState {
  selectedService: string | null
  selectedSlot: BookingSlot | null
  selectedLocation: BookingLocation | null
  vehicleInfo: VehicleInfo | null
  notes: string
  currentStep: number
}

export const useBooking = () => {
  const queryClient = useQueryClient()
  
  const [state, setState] = useState<BookingState>({
    selectedService: null,
    selectedSlot: null,
    selectedLocation: null,
    vehicleInfo: null,
    notes: '',
    currentStep: 1,
  })

  // Available slots query
  const {
    data: availableSlots,
    isLoading: slotsLoading,
    error: slotsError
  } = useQuery({
    queryKey: ['booking-slots', state.selectedService],
    queryFn: () => state.selectedService ? sdk.booking.getAvailableSlots(state.selectedService) : Promise.resolve([]),
    enabled: !!state.selectedService,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Available locations query
  const {
    data: availableLocations,
    isLoading: locationsLoading,
    error: locationsError
  } = useQuery({
    queryKey: ['booking-locations'],
    queryFn: () => sdk.booking.getAvailableLocations(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: (booking: BookingRequest) => sdk.booking.create(booking),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      queryClient.invalidateQueries({ queryKey: ['booking-slots'] })
    },
  })

  // State setters
  const setSelectedService = useCallback((serviceId: string) => {
    setState(prev => ({ ...prev, selectedService: serviceId }))
  }, [])

  const setSelectedSlot = useCallback((slot: BookingSlot) => {
    setState(prev => ({ ...prev, selectedSlot: slot }))
  }, [])

  const setSelectedLocation = useCallback((location: BookingLocation) => {
    setState(prev => ({ ...prev, selectedLocation: location }))
  }, [])

  const setVehicleInfo = useCallback((vehicleInfo: VehicleInfo) => {
    setState(prev => ({ ...prev, vehicleInfo }))
  }, [])

  const updateVehicleInfo = useCallback((updates: Partial<VehicleInfo>) => {
    setState(prev => ({ 
      ...prev, 
      vehicleInfo: {
        make: '',
        model: '',
        year: new Date().getFullYear(),
        color: '',
        licensePlate: '',
        ...prev.vehicleInfo,
        ...updates
      }
    }))
  }, [])

  const setNotes = useCallback((notes: string) => {
    setState(prev => ({ ...prev, notes }))
  }, [])

  const setCurrentStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, currentStep: step }))
  }, [])

  // Navigation helpers
  const nextStep = useCallback(() => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))
  }, [])

  const previousStep = useCallback(() => {
    setState(prev => ({ ...prev, currentStep: Math.max(1, prev.currentStep - 1) }))
  }, [])

  // Validation
  const canProceedToNext = useCallback(() => {
    switch (state.currentStep) {
      case 1: // Service selection
        return !!state.selectedService
      case 2: // Date/time selection
        return !!state.selectedSlot
      case 3: // Location selection (if needed)
        return !state.selectedLocation || !!state.selectedLocation
      case 4: // Vehicle info
        return !!state.vehicleInfo
      default:
        return true
    }
  }, [state])

  // Create booking
  const createBooking = useCallback(async () => {
    if (!state.selectedService || !state.selectedSlot || !state.vehicleInfo) {
      throw new Error('Missing required booking information')
    }

    const bookingRequest: BookingRequest = {
      serviceId: state.selectedService,
      customerId: 'current-user', // TODO: Get from auth context
      slotId: state.selectedSlot.id,
      locationId: state.selectedLocation?.id,
      vehicleInfo: state.vehicleInfo,
      notes: state.notes || undefined,
    }

    return await createBookingMutation.mutateAsync(bookingRequest)
  }, [state, createBookingMutation])

  // Reset booking state
  const resetBooking = useCallback(() => {
    setState({
      selectedService: null,
      selectedSlot: null,
      selectedLocation: null,
      vehicleInfo: null,
      notes: '',
      currentStep: 1,
    })
  }, [])

  return {
    // State
    ...state,
    
    // Data
    availableSlots: availableSlots || [],
    availableLocations: availableLocations || [],
    
    // Loading states
    isLoading: slotsLoading || locationsLoading || createBookingMutation.isPending,
    slotsLoading,
    locationsLoading,
    isCreating: createBookingMutation.isPending,
    
    // Errors
    error: slotsError || locationsError || createBookingMutation.error,
    
    // Actions
    setSelectedService,
    setSelectedSlot,
    setSelectedLocation,
    setVehicleInfo,
    updateVehicleInfo,
    setNotes,
    setCurrentStep,
    nextStep,
    previousStep,
    canProceedToNext: canProceedToNext(),
    createBooking,
    resetBooking,
    
    // Status
    isSuccess: createBookingMutation.isSuccess,
    bookingResult: createBookingMutation.data,
  }
}