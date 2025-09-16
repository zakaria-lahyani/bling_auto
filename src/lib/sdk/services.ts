import { fetcher } from './fetcher'

// Import types from fake-db structure
import type {
  Service,
  ServiceFilters,
} from '@/types/apps/serviceTypes'

export const servicesApi = {
  /**
   * Get all services with optional filters
   */
  async list(filters?: ServiceFilters): Promise<{ services: Service[] }> {
    const searchParams = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }

    const endpoint = `/api/services${searchParams.toString() ? `?${searchParams}` : ''}`
    return await fetcher.get<{ services: Service[] }>(endpoint)
  },

  /**
   * Get a service by ID (not implemented in fake-db pattern yet)
   */
  async getById(id: string): Promise<Service | null> {
    // For now, get all services and find by ID
    const data = await this.list()
    return data.services.find(s => s.id === id) || null
  },

  /**
   * Get popular services
   */
  async getPopular(): Promise<{ services: Service[] }> {
    return await fetcher.get<{ services: Service[] }>('/api/services/popular')
  },

  /**
   * Get active services
   */
  async getActive(): Promise<{ services: Service[] }> {
    return await fetcher.get<{ services: Service[] }>('/api/services/active')
  },

  /**
   * Search services by name or description (client-side filtering for now)
   */
  async search(query: string): Promise<{ services: Service[] }> {
    const data = await this.list()
    const filteredServices = data.services.filter(service =>
      service.name.toLowerCase().includes(query.toLowerCase()) ||
      service.description.toLowerCase().includes(query.toLowerCase())
    )
    return { services: filteredServices }
  },
}