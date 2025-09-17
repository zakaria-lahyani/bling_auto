/**
 * Mock Data Loader
 * 
 * Centralized loader for all mock data files.
 * Provides type-safe access to mock data with caching.
 */

import type { Service } from '@/core/entities/service/types'
import type { HomePageData } from '@/infrastructure/repositories/interfaces/homepage.repository'
import type { Booking } from '@/core/entities/booking/types'

// Import JSON data
import servicesData from './services.json'
import homepageData from './homepage.json'
import bookingsData from './bookings.json'

// Type definitions for JSON structure
interface ServicesJSON {
  services: any[]
  categories: any[]
}

interface BookingsJSON {
  bookings: any[]
  bookingStats: any
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
  static refresh(dataType: 'services' | 'categories' | 'homepage' | 'bookings' | 'all'): void {
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

// Export for backward compatibility
export { servicesData, homepageData, bookingsData }