/**
 * API Client Repository
 * 
 * Real API implementation for client data operations.
 * Uses the apiClient for HTTP requests to real backend endpoints.
 */

import { Client } from '../../../../core/entities/client/types'
import { 
  IClientRepository, 
  Vehicle, 
  PaymentMethod, 
  ClientAddress, 
  ClientBooking, 
  ClientDashboardData, 
  BookingFilters, 
  ApiResponse 
} from '../../interfaces/client.repository'
import { apiClient } from '../../../api/client'

export class ApiClientRepository implements IClientRepository {
  // ============================================================================
  // BASIC CLIENT CRUD OPERATIONS
  // ============================================================================

  async findById(id: string): Promise<Client | null> {
    try {
      const client = await apiClient.get<Client>(`/clients/${id}`)
      return client
    } catch (error: any) {
      if (error.statusCode === 404) {
        return null
      }
      throw error
    }
  }

  async findByEmail(email: string): Promise<Client | null> {
    try {
      const response = await apiClient.get<{ client: Client }>(`/clients/by-email/${encodeURIComponent(email)}`)
      return response.client
    } catch (error: any) {
      if (error.statusCode === 404) {
        return null
      }
      throw error
    }
  }

  async findByPhone(phone: string): Promise<Client | null> {
    try {
      const response = await apiClient.get<{ client: Client }>(`/clients/by-phone/${encodeURIComponent(phone)}`)
      return response.client
    } catch (error: any) {
      if (error.statusCode === 404) {
        return null
      }
      throw error
    }
  }

  async create(clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    const response = await apiClient.post<{ client: Client }>('/clients', clientData)
    return response.client
  }

  async update(id: string, updates: Partial<Client>): Promise<ApiResponse<Client>> {
    try {
      const response = await apiClient.put<{ client: Client }>(`/clients/${id}`, updates)
      return { 
        data: response.client, 
        success: true 
      }
    } catch (error: any) {
      if (error.statusCode >= 400 && error.statusCode < 500) {
        return {
          data: {} as Client,
          success: false,
          errors: error.data?.errors || [error.message || 'Client update failed']
        }
      }
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/clients/${id}`)
  }

  async findAll(limit?: number, offset?: number): Promise<Client[]> {
    const params = new URLSearchParams()
    if (limit) params.append('limit', limit.toString())
    if (offset) params.append('offset', offset.toString())
    
    const response = await apiClient.get<{ clients: Client[] }>(`/clients?${params.toString()}`)
    return response.clients
  }

  async findByMembershipStatus(status: string): Promise<Client[]> {
    const response = await apiClient.get<{ clients: Client[] }>(`/clients/by-membership/${status}`)
    return response.clients
  }

  async searchByNameOrEmail(query: string, limit?: number): Promise<Client[]> {
    const params = new URLSearchParams()
    params.append('query', query)
    if (limit) params.append('limit', limit.toString())
    
    const response = await apiClient.get<{ clients: Client[] }>(`/clients/search?${params.toString()}`)
    return response.clients
  }

  async count(): Promise<number> {
    const response = await apiClient.get<{ count: number }>('/clients/count')
    return response.count
  }

  async countByMembershipStatus(status: string): Promise<number> {
    const response = await apiClient.get<{ count: number }>(`/clients/count/by-membership/${status}`)
    return response.count
  }

  // ============================================================================
  // VEHICLE MANAGEMENT
  // ============================================================================

  async getVehicles(clientId: string): Promise<ApiResponse<Vehicle[]>> {
    try {
      const response = await apiClient.get<{ vehicles: Vehicle[] }>(`/clients/${clientId}/vehicles`)
      return { 
        data: response.vehicles, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: [],
        success: false,
        errors: [error.message || 'Failed to fetch vehicles']
      }
    }
  }

  async addVehicle(clientId: string, vehicleData: Omit<Vehicle, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Vehicle>> {
    try {
      const response = await apiClient.post<{ vehicle: Vehicle }>(`/clients/${clientId}/vehicles`, vehicleData)
      return { 
        data: response.vehicle, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: {} as Vehicle,
        success: false,
        errors: error.data?.errors || [error.message || 'Failed to add vehicle']
      }
    }
  }

  async updateVehicle(vehicleId: string, updates: Partial<Vehicle>): Promise<ApiResponse<Vehicle>> {
    try {
      const response = await apiClient.put<{ vehicle: Vehicle }>(`/vehicles/${vehicleId}`, updates)
      return { 
        data: response.vehicle, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: {} as Vehicle,
        success: false,
        errors: error.data?.errors || [error.message || 'Failed to update vehicle']
      }
    }
  }

  async deleteVehicle(vehicleId: string): Promise<ApiResponse<boolean>> {
    try {
      await apiClient.delete(`/vehicles/${vehicleId}`)
      return { 
        data: true, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: false,
        success: false,
        errors: [error.message || 'Failed to delete vehicle']
      }
    }
  }

  // ============================================================================
  // PAYMENT METHOD MANAGEMENT
  // ============================================================================

  async getPaymentMethods(clientId: string): Promise<ApiResponse<PaymentMethod[]>> {
    try {
      const response = await apiClient.get<{ paymentMethods: PaymentMethod[] }>(`/clients/${clientId}/payment-methods`)
      return { 
        data: response.paymentMethods, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: [],
        success: false,
        errors: [error.message || 'Failed to fetch payment methods']
      }
    }
  }

  async addPaymentMethod(clientId: string, methodData: Omit<PaymentMethod, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<PaymentMethod>> {
    try {
      const response = await apiClient.post<{ paymentMethod: PaymentMethod }>(`/clients/${clientId}/payment-methods`, methodData)
      return { 
        data: response.paymentMethod, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: {} as PaymentMethod,
        success: false,
        errors: error.data?.errors || [error.message || 'Failed to add payment method']
      }
    }
  }

  async updatePaymentMethod(methodId: string, updates: Partial<PaymentMethod>): Promise<ApiResponse<PaymentMethod>> {
    try {
      const response = await apiClient.put<{ paymentMethod: PaymentMethod }>(`/payment-methods/${methodId}`, updates)
      return { 
        data: response.paymentMethod, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: {} as PaymentMethod,
        success: false,
        errors: error.data?.errors || [error.message || 'Failed to update payment method']
      }
    }
  }

  async deletePaymentMethod(methodId: string): Promise<ApiResponse<boolean>> {
    try {
      await apiClient.delete(`/payment-methods/${methodId}`)
      return { 
        data: true, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: false,
        success: false,
        errors: [error.message || 'Failed to delete payment method']
      }
    }
  }

  // ============================================================================
  // ADDRESS MANAGEMENT
  // ============================================================================

  async getAddresses(clientId: string): Promise<ApiResponse<ClientAddress[]>> {
    try {
      const response = await apiClient.get<{ addresses: ClientAddress[] }>(`/clients/${clientId}/addresses`)
      return { 
        data: response.addresses, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: [],
        success: false,
        errors: [error.message || 'Failed to fetch addresses']
      }
    }
  }

  async addAddress(clientId: string, addressData: Omit<ClientAddress, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ClientAddress>> {
    try {
      const response = await apiClient.post<{ address: ClientAddress }>(`/clients/${clientId}/addresses`, addressData)
      return { 
        data: response.address, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: {} as ClientAddress,
        success: false,
        errors: error.data?.errors || [error.message || 'Failed to add address']
      }
    }
  }

  async updateAddress(addressId: string, updates: Partial<ClientAddress>): Promise<ApiResponse<ClientAddress>> {
    try {
      const response = await apiClient.put<{ address: ClientAddress }>(`/addresses/${addressId}`, updates)
      return { 
        data: response.address, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: {} as ClientAddress,
        success: false,
        errors: error.data?.errors || [error.message || 'Failed to update address']
      }
    }
  }

  async deleteAddress(addressId: string): Promise<ApiResponse<boolean>> {
    try {
      await apiClient.delete(`/addresses/${addressId}`)
      return { 
        data: true, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: false,
        success: false,
        errors: [error.message || 'Failed to delete address']
      }
    }
  }

  // ============================================================================
  // BOOKING OPERATIONS
  // ============================================================================

  async getBookings(clientId: string, filters?: BookingFilters): Promise<ApiResponse<ClientBooking[]>> {
    try {
      const params = new URLSearchParams()
      if (filters?.status) params.append('status', filters.status)
      if (filters?.upcoming) params.append('upcoming', filters.upcoming.toString())
      if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
      if (filters?.dateTo) params.append('dateTo', filters.dateTo)
      
      const queryString = params.toString()
      const endpoint = `/clients/${clientId}/bookings${queryString ? `?${queryString}` : ''}`
      
      const response = await apiClient.get<{ bookings: ClientBooking[] }>(endpoint)
      return { 
        data: response.bookings, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: [],
        success: false,
        errors: [error.message || 'Failed to fetch bookings']
      }
    }
  }

  async getUpcomingBookings(clientId: string): Promise<ApiResponse<ClientBooking[]>> {
    try {
      const response = await apiClient.get<{ bookings: ClientBooking[] }>(`/clients/${clientId}/bookings/upcoming`)
      return { 
        data: response.bookings, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: [],
        success: false,
        errors: [error.message || 'Failed to fetch upcoming bookings']
      }
    }
  }

  async createBooking(clientId: string, bookingData: Omit<ClientBooking, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ClientBooking>> {
    try {
      const response = await apiClient.post<{ booking: ClientBooking }>(`/clients/${clientId}/bookings`, bookingData)
      return { 
        data: response.booking, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: {} as ClientBooking,
        success: false,
        errors: error.data?.errors || [error.message || 'Failed to create booking']
      }
    }
  }

  // ============================================================================
  // DASHBOARD AND AGGREGATED DATA
  // ============================================================================

  async getDashboardData(clientId: string): Promise<ApiResponse<ClientDashboardData>> {
    try {
      const response = await apiClient.get<{ dashboard: ClientDashboardData }>(`/clients/${clientId}/dashboard`)
      return { 
        data: response.dashboard, 
        success: true 
      }
    } catch (error: any) {
      return {
        data: {} as ClientDashboardData,
        success: false,
        errors: [error.message || 'Failed to fetch dashboard data']
      }
    }
  }
}