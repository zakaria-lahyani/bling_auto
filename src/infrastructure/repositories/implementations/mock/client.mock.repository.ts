/**
 * Mock Client Repository
 * 
 * Infrastructure layer mock implementation for client data operations.
 * Migrated from ClientAPI to use repository pattern.
 */

import { Client, MembershipStatus } from '../../../../core/entities/client/types'
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

// Use centralized MockDataLoader instead of direct JSON imports
import { MockDataLoader } from '../../../data/mock'

// Simulate network delay
const simulateDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms))

export class MockClientRepository implements IClientRepository {
  // ============================================================================
  // BASIC CLIENT CRUD OPERATIONS
  // ============================================================================

  async findById(id: string): Promise<Client | null> {
    await simulateDelay()
    return MockDataLoader.getClientById(id)
  }

  async findByEmail(email: string): Promise<Client | null> {
    await simulateDelay()
    return MockDataLoader.getClientByEmail(email)
  }

  async findByPhone(phone: string): Promise<Client | null> {
    await simulateDelay()
    return MockDataLoader.getClientByPhone(phone)
  }

  async create(clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    await simulateDelay(800)
    
    const newClient: Client = {
      id: `client-${Date.now()}`,
      ...clientData,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return newClient
  }

  async update(id: string, updates: Partial<Client>): Promise<ApiResponse<Client>> {
    await simulateDelay()
    
    const client = MockDataLoader.getClientById(id)
    if (!client) {
      throw new Error('Client not found')
    }
    
    // Simulate validation
    if (updates.email && (updates.email as string).includes('invalid')) {
      return { 
        success: false, 
        data: client,
        errors: ['Invalid email address'] 
      }
    }

    const updatedClient: Client = { 
      ...client, 
      ...updates, 
      updatedAt: new Date() 
    }
    
    return { data: updatedClient, success: true }
  }

  async delete(id: string): Promise<void> {
    await simulateDelay()
    // In real implementation, this would delete the client
  }

  async findAll(limit?: number, offset?: number): Promise<Client[]> {
    await simulateDelay()
    let clients = MockDataLoader.getClients()
    
    if (offset) {
      clients = clients.slice(offset)
    }
    
    if (limit) {
      clients = clients.slice(0, limit)
    }
    
    return clients
  }

  async findByMembershipStatus(status: string): Promise<Client[]> {
    await simulateDelay()
    const clients = MockDataLoader.getClients()
    return clients.filter((c: any) => c.membershipStatus === status)
  }

  async searchByNameOrEmail(query: string, limit?: number): Promise<Client[]> {
    await simulateDelay()
    let results = MockDataLoader.searchClients(query)
    
    if (limit) {
      results = results.slice(0, limit)
    }
    
    return results
  }

  async count(): Promise<number> {
    await simulateDelay()
    return MockDataLoader.getClients().length
  }

  async countByMembershipStatus(status: string): Promise<number> {
    await simulateDelay()
    const clients = MockDataLoader.getClients()
    return clients.filter((c: any) => c.membershipStatus === status).length
  }

  // ============================================================================
  // VEHICLE MANAGEMENT
  // ============================================================================

  async getVehicles(clientId: string): Promise<ApiResponse<Vehicle[]>> {
    await simulateDelay()
    const vehicles = MockDataLoader.getVehiclesByClientId(clientId)
    return { data: vehicles, success: true }
  }

  async addVehicle(clientId: string, vehicleData: Omit<Vehicle, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Vehicle>> {
    await simulateDelay(800)
    
    // Simulate validation
    if (!vehicleData.make || !vehicleData.model) {
      return { 
        success: false, 
        data: {} as Vehicle,
        errors: ['Make and model are required'] 
      }
    }

    const newVehicle: Vehicle = {
      id: `vehicle-${Date.now()}`,
      clientId,
      ...vehicleData,
      isPrimary: false,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return { data: newVehicle, success: true }
  }

  async updateVehicle(vehicleId: string, updates: Partial<Vehicle>): Promise<ApiResponse<Vehicle>> {
    await simulateDelay()
    const vehicle = MockDataLoader.getVehicleById(vehicleId)
    if (!vehicle) {
      throw new Error('Vehicle not found')
    }

    const updatedVehicle = { 
      ...vehicle, 
      ...updates, 
      updatedAt: new Date().toISOString() 
    }
    
    return { data: updatedVehicle, success: true }
  }

  async deleteVehicle(vehicleId: string): Promise<ApiResponse<boolean>> {
    await simulateDelay()
    return { data: true, success: true }
  }

  // ============================================================================
  // PAYMENT METHOD MANAGEMENT
  // ============================================================================

  async getPaymentMethods(clientId: string): Promise<ApiResponse<PaymentMethod[]>> {
    await simulateDelay()
    const methods = MockDataLoader.getPaymentMethodsByClientId(clientId)
    return { data: methods, success: true }
  }

  async addPaymentMethod(clientId: string, methodData: Omit<PaymentMethod, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<PaymentMethod>> {
    await simulateDelay(1000)
    
    // Simulate validation
    if (methodData.type === 'card' && !methodData.last4) {
      return { 
        success: false, 
        data: {} as PaymentMethod,
        errors: ['Card number is required'] 
      }
    }

    const newMethod: PaymentMethod = {
      id: `payment-${Date.now()}`,
      clientId,
      ...methodData,
      isDefault: false,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return { data: newMethod, success: true }
  }

  async updatePaymentMethod(methodId: string, updates: Partial<PaymentMethod>): Promise<ApiResponse<PaymentMethod>> {
    await simulateDelay()
    const method = MockDataLoader.getPaymentMethodById(methodId)
    if (!method) {
      throw new Error('Payment method not found')
    }

    const updatedMethod = { 
      ...method, 
      ...updates, 
      updatedAt: new Date().toISOString() 
    }
    
    return { data: updatedMethod, success: true }
  }

  async deletePaymentMethod(methodId: string): Promise<ApiResponse<boolean>> {
    await simulateDelay()
    return { data: true, success: true }
  }

  // ============================================================================
  // ADDRESS MANAGEMENT
  // ============================================================================

  async getAddresses(clientId: string): Promise<ApiResponse<ClientAddress[]>> {
    await simulateDelay()
    const addresses = MockDataLoader.getClientAddressesByClientId(clientId)
    return { data: addresses, success: true }
  }

  async addAddress(clientId: string, addressData: Omit<ClientAddress, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ClientAddress>> {
    await simulateDelay()
    
    const newAddress: ClientAddress = {
      id: `address-${Date.now()}`,
      clientId,
      ...addressData,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return { data: newAddress, success: true }
  }

  async updateAddress(addressId: string, updates: Partial<ClientAddress>): Promise<ApiResponse<ClientAddress>> {
    await simulateDelay()
    const address = MockDataLoader.getClientAddressById(addressId)
    if (!address) {
      throw new Error('Address not found')
    }

    const updatedAddress = { 
      ...address, 
      ...updates, 
      updatedAt: new Date().toISOString() 
    }
    
    return { data: updatedAddress, success: true }
  }

  async deleteAddress(addressId: string): Promise<ApiResponse<boolean>> {
    await simulateDelay()
    return { data: true, success: true }
  }

  // ============================================================================
  // BOOKING OPERATIONS
  // ============================================================================

  async getBookings(clientId: string, filters?: BookingFilters): Promise<ApiResponse<ClientBooking[]>> {
    await simulateDelay()
    const bookings = MockDataLoader.filterClientBookings(clientId, filters || {})
    return { data: bookings, success: true }
  }

  async getUpcomingBookings(clientId: string): Promise<ApiResponse<ClientBooking[]>> {
    await simulateDelay()
    const upcoming = MockDataLoader.getUpcomingBookingsByClientId(clientId)
    return { data: upcoming, success: true }
  }

  async createBooking(clientId: string, bookingData: Omit<ClientBooking, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ClientBooking>> {
    await simulateDelay(1200)
    
    const newBooking: ClientBooking = {
      id: `booking-${Date.now()}`,
      clientId,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return { data: newBooking, success: true }
  }

  // ============================================================================
  // DASHBOARD AND AGGREGATED DATA
  // ============================================================================

  async getDashboardData(clientId: string): Promise<ApiResponse<ClientDashboardData>> {
    await simulateDelay(600)
    
    // Get all related data
    const [clientRes, vehiclesRes, bookingsRes, addressesRes] = await Promise.all([
      this.findById(clientId),
      this.getVehicles(clientId),
      this.getUpcomingBookings(clientId),
      this.getAddresses(clientId)
    ])

    if (!clientRes) {
      throw new Error('Client not found')
    }

    // Calculate stats
    const allBookings = MockDataLoader.getClientBookingsByClientId(clientId)
    const completedBookings = allBookings.filter((b: any) => b.status === 'completed')
    const totalSpent = completedBookings.reduce((sum: number, b: any) => sum + b.price.total, 0)
    
    const stats = {
      totalBookings: allBookings.length,
      bookingsThisMonth: allBookings.filter((b: any) => {
        const bookingDate = new Date(b.createdAt)
        const now = new Date()
        return bookingDate.getMonth() === now.getMonth() && 
               bookingDate.getFullYear() === now.getFullYear()
      }).length,
      totalSpent,
      spentThisMonth: completedBookings
        .filter((b: any) => {
          const bookingDate = new Date(b.createdAt)
          const now = new Date()
          return bookingDate.getMonth() === now.getMonth() && 
                 bookingDate.getFullYear() === now.getFullYear()
        })
        .reduce((sum: number, b: any) => sum + b.price.total, 0),
      averageRating: 4.8,
      loyaltyPoints: clientRes.loyaltyPoints,
      walletBalance: clientRes.walletBalance,
      activePromoCodes: 2
    }

    const dashboardData: ClientDashboardData = {
      client: clientRes,
      vehicles: vehiclesRes.data,
      upcomingBookings: bookingsRes.data,
      addresses: addressesRes.data,
      stats,
      recommendations: [
        {
          serviceId: 'service-1',
          reason: 'Your favorite service',
          priority: 1,
          discount: 10
        },
        {
          serviceId: 'service-2',
          reason: 'Popular this month',
          priority: 2,
          discount: 5
        }
      ]
    }

    return { data: dashboardData, success: true }
  }
}