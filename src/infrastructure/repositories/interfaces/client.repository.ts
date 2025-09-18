/**
 * Repository Interface: Client Repository
 * 
 * Infrastructure layer interface for client data operations.
 * Defines the contract for client data persistence and related operations.
 */

import { Client } from '../../../core/entities/client/types'

// Supporting types for client operations
export interface Vehicle {
  id: string
  clientId: string
  make: string
  model: string
  year: number
  color: string
  licensePlate: string
  isPrimary: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PaymentMethod {
  id: string
  clientId: string
  type: 'card' | 'paypal' | 'wallet'
  last4?: string
  brand?: string
  expiryDate?: string
  isDefault: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ClientAddress {
  id: string
  clientId: string
  type: 'home' | 'work' | 'other'
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface ClientBooking {
  id: string
  clientId: string
  serviceId: string
  serviceName: string
  vehicleId: string
  scheduledDate: string
  scheduledTime: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  price: {
    subtotal: number
    tax: number
    total: number
  }
  location: {
    type: 'mobile' | 'in_shop'
    address?: string
  }
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface ClientDashboardData {
  client: Client
  vehicles: Vehicle[]
  upcomingBookings: ClientBooking[]
  addresses: ClientAddress[]
  stats: {
    totalBookings: number
    bookingsThisMonth: number
    totalSpent: number
    spentThisMonth: number
    averageRating: number
    loyaltyPoints: number
    walletBalance: number
    activePromoCodes: number
  }
  recommendations: Array<{
    serviceId: string
    reason: string
    priority: number
    discount: number
  }>
}

export interface BookingFilters {
  status?: string
  upcoming?: boolean
  dateFrom?: string
  dateTo?: string
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  errors?: string[]
  message?: string
}

export interface IClientRepository {
  // Basic client CRUD operations
  findById(id: string): Promise<Client | null>
  findByEmail(email: string): Promise<Client | null>
  findByPhone(phone: string): Promise<Client | null>
  create(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client>
  update(id: string, updates: Partial<Client>): Promise<ApiResponse<Client>>
  delete(id: string): Promise<void>

  // Client query operations
  findAll(limit?: number, offset?: number): Promise<Client[]>
  findByMembershipStatus(status: string): Promise<Client[]>
  searchByNameOrEmail(query: string, limit?: number): Promise<Client[]>
  
  // Vehicle management
  getVehicles(clientId: string): Promise<ApiResponse<Vehicle[]>>
  addVehicle(clientId: string, vehicleData: Omit<Vehicle, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Vehicle>>
  updateVehicle(vehicleId: string, updates: Partial<Vehicle>): Promise<ApiResponse<Vehicle>>
  deleteVehicle(vehicleId: string): Promise<ApiResponse<boolean>>

  // Payment method management
  getPaymentMethods(clientId: string): Promise<ApiResponse<PaymentMethod[]>>
  addPaymentMethod(clientId: string, methodData: Omit<PaymentMethod, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<PaymentMethod>>
  updatePaymentMethod(methodId: string, updates: Partial<PaymentMethod>): Promise<ApiResponse<PaymentMethod>>
  deletePaymentMethod(methodId: string): Promise<ApiResponse<boolean>>

  // Address management
  getAddresses(clientId: string): Promise<ApiResponse<ClientAddress[]>>
  addAddress(clientId: string, addressData: Omit<ClientAddress, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ClientAddress>>
  updateAddress(addressId: string, updates: Partial<ClientAddress>): Promise<ApiResponse<ClientAddress>>
  deleteAddress(addressId: string): Promise<ApiResponse<boolean>>

  // Booking operations
  getBookings(clientId: string, filters?: BookingFilters): Promise<ApiResponse<ClientBooking[]>>
  getUpcomingBookings(clientId: string): Promise<ApiResponse<ClientBooking[]>>
  createBooking(clientId: string, bookingData: Omit<ClientBooking, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ClientBooking>>

  // Dashboard and aggregated data
  getDashboardData(clientId: string): Promise<ApiResponse<ClientDashboardData>>
  
  // Aggregation operations
  count(): Promise<number>
  countByMembershipStatus(status: string): Promise<number>
}