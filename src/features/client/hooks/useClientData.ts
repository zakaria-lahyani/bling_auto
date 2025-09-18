/**
 * Client Data Hooks
 * 
 * React hooks that provide data fetching for client features.
 * Now uses repository pattern for consistent data access.
 */

import { useState, useEffect } from 'react'
import { repositoryFactory } from '../../../infrastructure/repositories/factory/repository.factory'
import type { Client, Vehicle, PaymentMethod, ClientAddress, ClientStats } from '../../../core/entities/client/types'
import type { ClientBooking } from '../../../core/entities/client-booking/types'
import type { 
  ClientDashboardData as RepositoryDashboardData,
  Vehicle as RepositoryVehicle,
  PaymentMethod as RepositoryPaymentMethod,
  ClientAddress as RepositoryAddress,
  ClientBooking as RepositoryBooking
} from '../../../infrastructure/repositories/interfaces/client.repository'

// Types for hook return values
interface ClientDashboardData {
  client: Client
  stats: ClientStats
  upcomingBookings: ClientBooking[]
  recentActivity: any[]
}

interface ClientProfileData {
  client: Client
  vehicles: Vehicle[]
  paymentMethods: PaymentMethod[]
  addresses: ClientAddress[]
}

// Type mapping functions to convert repository types to domain types
const mapRepositoryVehicleToDomain = (repoVehicle: RepositoryVehicle): Vehicle => ({
  id: repoVehicle.id,
  clientId: repoVehicle.clientId,
  make: repoVehicle.make,
  model: repoVehicle.model,
  year: repoVehicle.year.toString(),
  color: repoVehicle.color,
  plateNumber: repoVehicle.licensePlate || '', // Map licensePlate to plateNumber
  vin: '', // Default value since not in repository type
  notes: '',
  isPrimary: repoVehicle.isPrimary,
  createdAt: new Date(repoVehicle.createdAt),
  updatedAt: new Date(repoVehicle.updatedAt)
})

const mapRepositoryPaymentMethodToDomain = (repoMethod: RepositoryPaymentMethod): PaymentMethod => ({
  id: repoMethod.id,
  clientId: repoMethod.clientId,
  type: repoMethod.type as any, // Type mapping needed
  provider: repoMethod.brand || '',
  last4: repoMethod.last4 || '',
  expiryMonth: 0, // Default values since not in repository type
  expiryYear: 0,
  holderName: '', // Required by domain type
  isPrimary: false, // Required by domain type
  isActive: repoMethod.isActive,
  createdAt: new Date(repoMethod.createdAt),
  updatedAt: new Date(repoMethod.updatedAt)
})

const mapRepositoryAddressToDomain = (repoAddress: RepositoryAddress): ClientAddress => ({
  id: repoAddress.id,
  clientId: repoAddress.clientId,
  label: repoAddress.type.charAt(0).toUpperCase() + repoAddress.type.slice(1), // Convert type to label
  street: repoAddress.street,
  city: repoAddress.city,
  state: repoAddress.state,
  zipCode: repoAddress.zipCode,
  country: repoAddress.country || 'US',
  isDefault: repoAddress.isDefault,
  instructions: '', // Default value since not in repository type
  createdAt: new Date(repoAddress.createdAt),
  updatedAt: new Date(repoAddress.updatedAt)
})

const mapRepositoryBookingToDomain = (repoBooking: RepositoryBooking): ClientBooking => ({
  id: repoBooking.id,
  clientId: repoBooking.clientId,
  serviceId: repoBooking.serviceId,
  vehicleId: repoBooking.vehicleId,
  addressId: '', // Required by domain type
  scheduledDate: new Date(repoBooking.scheduledDate),
  scheduledTime: repoBooking.scheduledTime,
  estimatedDuration: 60, // Required by domain type - default value
  status: repoBooking.status as any,
  price: {
    basePrice: repoBooking.price.subtotal,
    discount: 0,
    addOns: [],
    serviceFee: 0,
    tax: repoBooking.price.tax,
    total: repoBooking.price.total,
    currency: 'USD'
  },
  notes: repoBooking.notes,
  createdAt: new Date(repoBooking.createdAt),
  updatedAt: new Date(repoBooking.updatedAt)
})

// Hook for client profile data
export const useClientProfile = (clientId: string) => {
  const [data, setData] = useState<ClientProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clientRepository = repositoryFactory.getClientRepository()

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [client, vehiclesRes, paymentMethodsRes, addressesRes] = await Promise.all([
        clientRepository.findById(clientId),
        clientRepository.getVehicles(clientId),
        clientRepository.getPaymentMethods(clientId),
        clientRepository.getAddresses(clientId)
      ])

      if (!client) {
        throw new Error('Client not found')
      }

      setData({
        client,
        vehicles: (vehiclesRes.data || []).map(mapRepositoryVehicleToDomain),
        paymentMethods: (paymentMethodsRes.data || []).map(mapRepositoryPaymentMethodToDomain),
        addresses: (addressesRes.data || []).map(mapRepositoryAddressToDomain)
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (clientId) {
      fetchProfile()
    }
  }, [clientId])

  const updateProfile = async (updates: any) => {
    try {
      const result = await clientRepository.update(clientId, updates)
      if (result.success) {
        await fetchProfile() // Refresh data
      }
      return result
    } catch (err) {
      throw err
    }
  }

  return {
    data,
    loading,
    error,
    refresh: fetchProfile,
    updateProfile
  }
}

// Hook for client dashboard data
export const useClientDashboard = (clientId: string) => {
  const [data, setData] = useState<ClientDashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clientRepository = repositoryFactory.getClientRepository()

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await clientRepository.getDashboardData(clientId)
      if (result.success) {
        // Map repository data to domain data and add missing recentActivity
        const dashboardData: ClientDashboardData = {
          client: result.data.client,
          stats: {
            totalBookings: result.data.stats.totalBookings,
            bookingsThisMonth: result.data.stats.bookingsThisMonth,
            totalSpent: result.data.stats.totalSpent,
            averageRating: result.data.stats.averageRating,
            loyaltyPoints: result.data.stats.loyaltyPoints,
            spentThisMonth: result.data.stats.spentThisMonth,
            walletBalance: result.data.stats.walletBalance,
            activePromoCodes: result.data.stats.activePromoCodes
          },
          upcomingBookings: (result.data.upcomingBookings || []).map(mapRepositoryBookingToDomain),
          recentActivity: [] // Default empty array for now
        }
        setData(dashboardData)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (clientId) {
      fetchDashboard()
    }
  }, [clientId])

  return {
    data,
    loading,
    error,
    refresh: fetchDashboard
  }
}

// Hook for client bookings
export const useClientBookings = (clientId: string, filters?: any) => {
  const [data, setData] = useState<ClientBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clientRepository = repositoryFactory.getClientRepository()

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await clientRepository.getBookings(clientId, filters)
      if (result.success) {
        setData((result.data || []).map(mapRepositoryBookingToDomain))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (clientId) {
      fetchBookings()
    }
  }, [clientId, JSON.stringify(filters)])

  const createBooking = async (bookingData: any) => {
    try {
      const result = await clientRepository.createBooking(clientId, bookingData)
      if (result.success) {
        await fetchBookings() // Refresh bookings
      }
      return result
    } catch (err) {
      throw err
    }
  }

  return {
    data,
    loading,
    error,
    refresh: fetchBookings,
    createBooking
  }
}

// Hook for vehicle management
export const useVehicles = (clientId: string) => {
  const [data, setData] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clientRepository = repositoryFactory.getClientRepository()

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await clientRepository.getVehicles(clientId)
      if (result.success) {
        setData((result.data || []).map(mapRepositoryVehicleToDomain))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load vehicles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (clientId) {
      fetchVehicles()
    }
  }, [clientId])

  const addVehicle = async (vehicleData: any) => {
    try {
      setLoading(true)
      const result = await clientRepository.addVehicle(clientId, vehicleData)
      if (result.success) {
        await fetchVehicles() // Refresh vehicles
      }
      return result
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateVehicle = async (vehicleId: string, updates: any) => {
    try {
      setLoading(true)
      const result = await clientRepository.updateVehicle(vehicleId, updates)
      if (result.success) {
        await fetchVehicles() // Refresh vehicles
      }
      return result
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteVehicle = async (vehicleId: string) => {
    try {
      setLoading(true)
      const result = await clientRepository.deleteVehicle(vehicleId)
      if (result.success) {
        await fetchVehicles() // Refresh vehicles
      }
      return result
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    refresh: fetchVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle
  }
}

// Hook for payment methods
export const usePaymentMethods = (clientId: string) => {
  const [data, setData] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clientRepository = repositoryFactory.getClientRepository()

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await clientRepository.getPaymentMethods(clientId)
      if (result.success) {
        setData((result.data || []).map(mapRepositoryPaymentMethodToDomain))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load payment methods')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (clientId) {
      fetchPaymentMethods()
    }
  }, [clientId])

  const addPaymentMethod = async (methodData: any) => {
    try {
      setLoading(true)
      const result = await clientRepository.addPaymentMethod(clientId, methodData)
      if (result.success) {
        await fetchPaymentMethods() // Refresh methods
      }
      return result
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updatePaymentMethod = async (methodId: string, updates: any) => {
    try {
      setLoading(true)
      const result = await clientRepository.updatePaymentMethod(methodId, updates)
      if (result.success) {
        await fetchPaymentMethods() // Refresh methods
      }
      return result
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deletePaymentMethod = async (methodId: string) => {
    try {
      setLoading(true)
      const result = await clientRepository.deletePaymentMethod(methodId)
      if (result.success) {
        await fetchPaymentMethods() // Refresh methods
      }
      return result
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    refresh: fetchPaymentMethods,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
  }
}