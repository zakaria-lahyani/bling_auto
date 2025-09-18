/**
 * Mock Data Loader
 * 
 * Centralized loader for all mock data files.
 * Provides type-safe access to mock data with caching.
 */

import type { Service } from '@/core/entities/service/types'
import type { HomePageData } from '@/infrastructure/repositories/interfaces/homepage.repository'
import type { Booking } from '@/core/entities/booking/types'
import type { Client } from '@/core/entities/client/types'

// Import JSON data
import servicesData from './services.json'
import homepageData from './homepage.json'
import bookingsData from './bookings.json'
import clientsData from './clients.json'
import vehiclesData from './vehicles.json'
import paymentMethodsData from './payment-methods.json'
import clientBookingsData from './client-bookings.json'
import clientAddressesData from './client-addresses.json'

// Type definitions for JSON structure
interface ServicesJSON {
  services: any[]
  categories: any[]
}

interface BookingsJSON {
  bookings: any[]
  bookingStats: any
}

interface ClientsJSON {
  clients: any[]
}

interface VehiclesJSON {
  vehicles: any[]
}

interface PaymentMethodsJSON {
  paymentMethods: any[]
}

interface ClientBookingsJSON {
  bookings: any[]
}

interface ClientAddressesJSON {
  addresses: any[]
}

// Cache for loaded data
class MockDataCache {
  private cache = new Map<string, any>()
  private lastModified = new Map<string, number>()

  get<T>(key: string, loader: () => T): T {
    const now = Date.now()
    const lastMod = this.lastModified.get(key) || 0
    const cacheAge = now - lastMod
    const cacheExpiry = 5 * 60 * 1000 // 5 minutes

    if (this.cache.has(key) && cacheAge < cacheExpiry) {
      return this.cache.get(key)
    }

    const data = loader()
    this.cache.set(key, data)
    this.lastModified.set(key, now)
    return data
  }

  clear(): void {
    this.cache.clear()
    this.lastModified.clear()
  }

  invalidate(key: string): void {
    this.cache.delete(key)
    this.lastModified.delete(key)
  }
}

const cache = new MockDataCache()

/**
 * Mock Data Loader Class
 */
export class MockDataLoader {
  /**
   * Load all services
   */
  static getServices(): Service[] {
    return cache.get('services', () => {
      const data = servicesData as ServicesJSON
      return data.services.map(service => ({
        ...service,
        // Ensure consistent data structure
        features: service.features || [],
        tags: service.tags || [],
        rating: service.rating || 0,
        reviewCount: service.reviewCount || 0,
        estimatedTime: service.estimatedTime || { min: 30, max: 60 }
      }))
    })
  }

  /**
   * Load service categories
   */
  static getCategories(): any[] {
    return cache.get('categories', () => {
      const data = servicesData as ServicesJSON
      return data.categories || []
    })
  }

  /**
   * Load homepage data
   */
  static getHomepageData(): any {
    return cache.get('homepage', () => {
      return homepageData
    })
  }

  /**
   * Load all bookings
   */
  static getBookings(): any[] {
    return cache.get('bookings', () => {
      const data = bookingsData as BookingsJSON
      return data.bookings || []
    })
  }

  /**
   * Load booking statistics
   */
  static getBookingStats(): any {
    return cache.get('bookingStats', () => {
      const data = bookingsData as BookingsJSON
      return data.bookingStats || {}
    })
  }

  /**
   * Get service by ID
   */
  static getServiceById(id: string): Service | null {
    const services = this.getServices()
    return services.find(service => service.id === id) || null
  }

  /**
   * Get services by category
   */
  static getServicesByCategory(categorySlug: string): Service[] {
    const services = this.getServices()
    return services.filter(service => service.category.slug === categorySlug)
  }

  /**
   * Get featured services
   */
  static getFeaturedServices(): Service[] {
    const services = this.getServices()
    return services.filter(service => service.featured)
  }

  /**
   * Get popular services
   */
  static getPopularServices(): Service[] {
    const services = this.getServices()
    return services.filter(service => service.popular)
  }

  /**
   * Search services
   */
  static searchServices(query: string): Service[] {
    const services = this.getServices()
    const lowercaseQuery = query.toLowerCase()
    
    return services.filter(service =>
      service.name.toLowerCase().includes(lowercaseQuery) ||
      service.description.toLowerCase().includes(lowercaseQuery) ||
      service.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  /**
   * Filter services
   */
  static filterServices(filters: {
    category?: string
    featured?: boolean
    popular?: boolean
    priceMin?: number
    priceMax?: number
    availability?: string[]
    query?: string
  }): Service[] {
    let services = this.getServices()

    if (filters.category) {
      services = services.filter(s => s.category.slug === filters.category)
    }

    if (filters.featured !== undefined) {
      services = services.filter(s => s.featured === filters.featured)
    }

    if (filters.popular !== undefined) {
      services = services.filter(s => s.popular === filters.popular)
    }

    if (filters.priceMin !== undefined) {
      services = services.filter(s => s.price >= filters.priceMin!)
    }

    if (filters.priceMax !== undefined) {
      services = services.filter(s => s.price <= filters.priceMax!)
    }

    if (filters.availability && filters.availability.length > 0) {
      services = services.filter(s => {
        return filters.availability!.some(avail => {
          if (avail === 'mobile') return s.availability.mobile
          if (avail === 'onsite' || avail === 'inShop') return s.availability.inShop
          return false
        })
      })
    }

    if (filters.query) {
      const query = filters.query.toLowerCase()
      services = services.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return services
  }

  /**
   * Get related services (same category, different ID)
   */
  static getRelatedServices(serviceId: string, limit = 3): Service[] {
    const service = this.getServiceById(serviceId)
    if (!service) return []

    const services = this.getServices()
    return services
      .filter(s => s.id !== serviceId && s.category.slug === service.category.slug)
      .slice(0, limit)
  }

  /**
   * Get booking by ID
   */
  static getBookingById(id: string): any | null {
    const bookings = this.getBookings()
    return bookings.find(booking => booking.id === id) || null
  }

  /**
   * Get bookings by user ID
   */
  static getBookingsByUserId(userId: string): any[] {
    const bookings = this.getBookings()
    return bookings.filter(booking => booking.userId === userId)
  }

  /**
   * Get bookings by status
   */
  static getBookingsByStatus(status: string): any[] {
    const bookings = this.getBookings()
    return bookings.filter(booking => booking.status === status)
  }

  /**
   * Add new service (for testing)
   */
  static addService(service: Service): void {
    const services = this.getServices()
    services.push(service)
    cache.invalidate('services')
  }

  /**
   * Update service (for testing)
   */
  static updateService(id: string, updates: Partial<Service>): Service | null {
    const services = this.getServices()
    const index = services.findIndex(s => s.id === id)
    
    if (index === -1) return null
    
    services[index] = { ...services[index], ...updates } as Service
    cache.invalidate('services')
    return services[index] || null
  }

  /**
   * Remove service (for testing)
   */
  static removeService(id: string): boolean {
    const services = this.getServices()
    const index = services.findIndex(s => s.id === id)
    
    if (index === -1) return false
    
    services.splice(index, 1)
    cache.invalidate('services')
    return true
  }

  // ============================================================================
  // CLIENT-RELATED DATA METHODS
  // ============================================================================

  /**
   * Load all clients
   */
  static getClients(): Client[] {
    return cache.get('clients', () => {
      const data = clientsData as ClientsJSON
      return data.clients || []
    })
  }

  /**
   * Get client by ID
   */
  static getClientById(id: string): Client | null {
    const clients = this.getClients()
    return clients.find(client => client.id === id) || null
  }

  /**
   * Get client by email
   */
  static getClientByEmail(email: string): Client | null {
    const clients = this.getClients()
    return clients.find(client => client.email === email) || null
  }

  /**
   * Get client by phone
   */
  static getClientByPhone(phone: string): Client | null {
    const clients = this.getClients()
    return clients.find(client => client.phone === phone) || null
  }

  /**
   * Load all vehicles
   */
  static getVehicles(): any[] {
    return cache.get('vehicles', () => {
      const data = vehiclesData as VehiclesJSON
      return data.vehicles || []
    })
  }

  /**
   * Get vehicles by client ID
   */
  static getVehiclesByClientId(clientId: string): any[] {
    const vehicles = this.getVehicles()
    return vehicles.filter(vehicle => vehicle.clientId === clientId)
  }

  /**
   * Get vehicle by ID
   */
  static getVehicleById(id: string): any | null {
    const vehicles = this.getVehicles()
    return vehicles.find(vehicle => vehicle.id === id) || null
  }

  /**
   * Load all payment methods
   */
  static getPaymentMethods(): any[] {
    return cache.get('paymentMethods', () => {
      const data = paymentMethodsData as PaymentMethodsJSON
      return data.paymentMethods || []
    })
  }

  /**
   * Get payment methods by client ID
   */
  static getPaymentMethodsByClientId(clientId: string): any[] {
    const methods = this.getPaymentMethods()
    return methods.filter(method => method.clientId === clientId)
  }

  /**
   * Get payment method by ID
   */
  static getPaymentMethodById(id: string): any | null {
    const methods = this.getPaymentMethods()
    return methods.find(method => method.id === id) || null
  }

  /**
   * Load all client bookings
   */
  static getClientBookings(): any[] {
    return cache.get('clientBookings', () => {
      const data = clientBookingsData as ClientBookingsJSON
      return data.bookings || []
    })
  }

  /**
   * Get client bookings by client ID
   */
  static getClientBookingsByClientId(clientId: string): any[] {
    const bookings = this.getClientBookings()
    return bookings.filter(booking => booking.clientId === clientId)
  }

  /**
   * Get upcoming bookings by client ID
   */
  static getUpcomingBookingsByClientId(clientId: string): any[] {
    const bookings = this.getClientBookingsByClientId(clientId)
    const now = new Date()
    return bookings
      .filter(booking => new Date(booking.scheduledDate) > now)
      .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
  }

  /**
   * Get client booking by ID
   */
  static getClientBookingById(id: string): any | null {
    const bookings = this.getClientBookings()
    return bookings.find(booking => booking.id === id) || null
  }

  /**
   * Load all client addresses
   */
  static getClientAddresses(): any[] {
    return cache.get('clientAddresses', () => {
      const data = clientAddressesData as ClientAddressesJSON
      return data.addresses || []
    })
  }

  /**
   * Get client addresses by client ID
   */
  static getClientAddressesByClientId(clientId: string): any[] {
    const addresses = this.getClientAddresses()
    return addresses.filter(address => address.clientId === clientId)
  }

  /**
   * Get client address by ID
   */
  static getClientAddressById(id: string): any | null {
    const addresses = this.getClientAddresses()
    return addresses.find(address => address.id === id) || null
  }

  /**
   * Search clients by name or email
   */
  static searchClients(query: string): Client[] {
    const clients = this.getClients()
    const lowercaseQuery = query.toLowerCase()
    
    return clients.filter(client =>
      client.name.toLowerCase().includes(lowercaseQuery) ||
      client.email.toLowerCase().includes(lowercaseQuery)
    )
  }

  /**
   * Filter client bookings
   */
  static filterClientBookings(clientId: string, filters: {
    status?: string
    upcoming?: boolean
    dateFrom?: string
    dateTo?: string
  }): any[] {
    let bookings = this.getClientBookingsByClientId(clientId)
    
    if (filters.status) {
      bookings = bookings.filter(booking => booking.status === filters.status)
    }
    
    if (filters.upcoming) {
      const now = new Date()
      bookings = bookings.filter(booking => new Date(booking.scheduledDate) > now)
    }
    
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom)
      bookings = bookings.filter(booking => new Date(booking.scheduledDate) >= fromDate)
    }
    
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo)
      bookings = bookings.filter(booking => new Date(booking.scheduledDate) <= toDate)
    }
    
    return bookings
  }

  /**
   * Clear all caches
   */
  static clearCache(): void {
    cache.clear()
  }

  /**
   * Get cache statistics
   */
  static getCacheStats(): { keys: string[]; size: number } {
    const keys = Array.from(cache['cache'].keys())
    return {
      keys,
      size: keys.length
    }
  }

  /**
   * Refresh specific data type
   */
  static refresh(dataType: 'services' | 'categories' | 'homepage' | 'bookings' | 'clients' | 'vehicles' | 'paymentMethods' | 'clientBookings' | 'clientAddresses' | 'all'): void {
    if (dataType === 'all') {
      cache.clear()
    } else {
      cache.invalidate(dataType)
    }
  }
}

// Export individual data loaders for convenience
export const loadServices = () => MockDataLoader.getServices()
export const loadCategories = () => MockDataLoader.getCategories()
export const loadHomepageData = () => MockDataLoader.getHomepageData()
export const loadBookings = () => MockDataLoader.getBookings()

// Client-related data loaders
export const loadClients = () => MockDataLoader.getClients()
export const loadVehicles = () => MockDataLoader.getVehicles()
export const loadPaymentMethods = () => MockDataLoader.getPaymentMethods()
export const loadClientBookings = () => MockDataLoader.getClientBookings()
export const loadClientAddresses = () => MockDataLoader.getClientAddresses()

// Export for backward compatibility
export { servicesData, homepageData, bookingsData, clientsData, vehiclesData, paymentMethodsData, clientBookingsData, clientAddressesData }