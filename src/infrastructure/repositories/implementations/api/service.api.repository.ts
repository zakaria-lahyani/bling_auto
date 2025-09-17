/**
 * API Service Repository Implementation
 * Connects to real backend API
 */

import { BaseRepositoryImpl } from '../base/base.impl'
import { 
  IServiceRepository, 
  ServiceFilters, 
  ServiceCreateDTO, 
  ServiceUpdateDTO 
} from '../../interfaces/service.repository'
import { 
  QueryParams, 
  PaginatedResponse, 
  FilterParams, 
  NotFoundError,
  NetworkError 
} from '../../interfaces/base.repository'
import type { Service } from '@/core/entities/service/types'
import { apiClient } from '@/infrastructure/api/client'

export class ApiServiceRepository extends BaseRepositoryImpl<Service, ServiceCreateDTO, ServiceUpdateDTO> 
  implements IServiceRepository {

  protected getEntityName(): string {
    return 'Service'
  }

  async findAll(params?: QueryParams): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findAll', params)
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    try {
      const queryString = this.buildQueryString(params)
      const response = await apiClient.get<{ services: Service[] }>(`/services${queryString}`)
      
      const services = response.services || []
      this.setCache(cacheKey, services)
      return services
    } catch (error) {
      this.handleError(error, 'findAll services')
    }
  }

  async findById(id: string): Promise<Service | null> {
    const cacheKey = this.getCacheKey('findById', { id })
    const cached = this.getFromCache<Service | null>(cacheKey)
    if (cached !== undefined) return cached

    try {
      const response = await apiClient.get<Service>(`/services/${id}`)
      this.setCache(cacheKey, response)
      return response
    } catch (error: any) {
      if (error.response?.status === 404) {
        this.setCache(cacheKey, null)
        return null
      }
      this.handleError(error, `findById service ${id}`)
    }
  }

  async findOne(filters: FilterParams): Promise<Service | null> {
    try {
      const queryString = this.buildQueryString({ filters, pagination: { limit: 1 } })
      const response = await apiClient.get<{ services: Service[] }>(`/services${queryString}`)
      return response.services?.[0] || null
    } catch (error) {
      this.handleError(error, 'findOne service')
    }
  }

  async findMany(filters: FilterParams): Promise<Service[]> {
    try {
      const queryString = this.buildQueryString({ filters })
      const response = await apiClient.get<{ services: Service[] }>(`/services${queryString}`)
      return response.services || []
    } catch (error) {
      this.handleError(error, 'findMany services')
    }
  }

  async findPaginated(params?: QueryParams): Promise<PaginatedResponse<Service>> {
    const cacheKey = this.getCacheKey('findPaginated', params)
    const cached = this.getFromCache<PaginatedResponse<Service>>(cacheKey)
    if (cached) return cached

    try {
      const queryString = this.buildQueryString(params)
      const response = await apiClient.get<{
        services: Service[]
        pagination: {
          total: number
          page: number
          limit: number
          hasNext: boolean
          hasPrev: boolean
        }
      }>(`/services${queryString}`)

      const result: PaginatedResponse<Service> = {
        data: response.services,
        total: response.pagination.total,
        page: response.pagination.page,
        limit: response.pagination.limit,
        hasNext: response.pagination.hasNext,
        hasPrev: response.pagination.hasPrev
      }

      this.setCache(cacheKey, result)
      return result
    } catch (error) {
      this.handleError(error, 'findPaginated services')
    }
  }

  async create(data: ServiceCreateDTO): Promise<Service> {
    try {
      const response = await apiClient.post<Service>('/services', data)
      this.invalidateCache('services')
      return response
    } catch (error) {
      this.handleError(error, 'create service')
    }
  }

  async update(id: string, data: ServiceUpdateDTO): Promise<Service> {
    try {
      const response = await apiClient.put<Service>(`/services/${id}`, data)
      this.invalidateCache('services')
      this.invalidateCache(`findById:${id}`)
      return response
    } catch (error) {
      this.handleError(error, `update service ${id}`)
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`/services/${id}`)
      this.invalidateCache('services')
      this.invalidateCache(`findById:${id}`)
      return true
    } catch (error: any) {
      if (error.response?.status === 404) {
        return false
      }
      this.handleError(error, `delete service ${id}`)
    }
  }

  async count(filters?: FilterParams): Promise<number> {
    try {
      const queryString = this.buildQueryString({ filters })
      const response = await apiClient.get<{ count: number }>(`/services/count${queryString}`)
      return response.count
    } catch (error) {
      this.handleError(error, 'count services')
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      await apiClient.get(`/services/${id}/exists`)
      return true
    } catch (error: any) {
      if (error.response?.status === 404) {
        return false
      }
      this.handleError(error, `check service exists ${id}`)
    }
  }

  // Service-specific methods
  async findByCategory(categorySlug: string): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findByCategory', { categorySlug })
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await apiClient.get<{ services: Service[] }>(`/services/category/${categorySlug}`)
      const services = response.services || []
      this.setCache(cacheKey, services)
      return services
    } catch (error) {
      this.handleError(error, `findByCategory ${categorySlug}`)
    }
  }

  async findFeatured(): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findFeatured')
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await apiClient.get<{ services: Service[] }>('/services/featured')
      const services = response.services || []
      this.setCache(cacheKey, services)
      return services
    } catch (error) {
      this.handleError(error, 'findFeatured services')
    }
  }

  async findPopular(): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findPopular')
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await apiClient.get<{ services: Service[] }>('/services/popular')
      const services = response.services || []
      this.setCache(cacheKey, services)
      return services
    } catch (error) {
      this.handleError(error, 'findPopular services')
    }
  }

  async findByAvailability(availability: string): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findByAvailability', { availability })
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await apiClient.get<{ services: Service[] }>(`/services/availability/${availability}`)
      const services = response.services || []
      this.setCache(cacheKey, services)
      return services
    } catch (error) {
      this.handleError(error, `findByAvailability ${availability}`)
    }
  }

  async search(query: string): Promise<Service[]> {
    const cacheKey = this.getCacheKey('search', { query })
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await apiClient.get<{ services: Service[] }>(`/services/search?q=${encodeURIComponent(query)}`)
      const services = response.services || []
      this.setCache(cacheKey, services)
      return services
    } catch (error) {
      this.handleError(error, `search services "${query}"`)
    }
  }

  async findWithFilters(filters: ServiceFilters): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findWithFilters', filters)
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await apiClient.post<{ services: Service[] }>('/services/filter', filters)
      const services = response.services || []
      this.setCache(cacheKey, services)
      return services
    } catch (error) {
      this.handleError(error, 'findWithFilters services')
    }
  }

  async findRelated(serviceId: string, limit = 3): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findRelated', { serviceId, limit })
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await apiClient.get<{ services: Service[] }>(`/services/${serviceId}/related?limit=${limit}`)
      const services = response.services || []
      this.setCache(cacheKey, services)
      return services
    } catch (error) {
      this.handleError(error, `findRelated services for ${serviceId}`)
    }
  }

  async getAverageRating(serviceId: string): Promise<number> {
    try {
      const response = await apiClient.get<{ rating: number }>(`/services/${serviceId}/rating`)
      return response.rating
    } catch (error) {
      this.handleError(error, `getAverageRating for service ${serviceId}`)
    }
  }

  async getBookingCount(serviceId: string): Promise<number> {
    try {
      const response = await apiClient.get<{ count: number }>(`/services/${serviceId}/bookings/count`)
      return response.count
    } catch (error) {
      this.handleError(error, `getBookingCount for service ${serviceId}`)
    }
  }

  // Utility methods
  private buildQueryString(params?: QueryParams): string {
    if (!params) return ''

    const searchParams = new URLSearchParams()

    // Add filters
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v.toString()))
        } else if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString())
        }
      })
    }

    // Add pagination
    if (params.pagination) {
      if (params.pagination.page) {
        searchParams.append('page', params.pagination.page.toString())
      }
      if (params.pagination.limit) {
        searchParams.append('limit', params.pagination.limit.toString())
      }
      if (params.pagination.offset) {
        searchParams.append('offset', params.pagination.offset.toString())
      }
    }

    // Add sorting
    if (params.sort) {
      searchParams.append('sortBy', params.sort.field)
      searchParams.append('sortOrder', params.sort.order)
    }

    // Add includes
    if (params.include) {
      params.include.forEach(inc => searchParams.append('include', inc))
    }

    const queryString = searchParams.toString()
    return queryString ? `?${queryString}` : ''
  }
}