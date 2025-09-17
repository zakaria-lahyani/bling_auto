/**
 * Improved API Service Repository Implementation
 * With response validation and proper error handling
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
  ValidationError,
  NetworkError 
} from '../../interfaces/base.repository'
import type { Service } from '@/core/entities/service/types'
import { apiClient } from '@/infrastructure/api/client'
import { 
  ServiceMapper, 
  ServiceResponseSchema,
  type ServiceResponseDTO 
} from '@/infrastructure/dto/service.dto'
import { z } from 'zod'
import { logger } from '@/shared/utils/logger'

// Response schemas for API endpoints
const ServiceListResponseSchema = z.object({
  services: z.array(ServiceResponseSchema),
  total: z.number().optional(),
  page: z.number().optional(),
  limit: z.number().optional()
})

const PaginatedServiceResponseSchema = z.object({
  services: z.array(ServiceResponseSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean()
  })
})

export class ImprovedApiServiceRepository extends BaseRepositoryImpl<Service, ServiceCreateDTO, ServiceUpdateDTO> 
  implements IServiceRepository {

  private readonly maxRetries = 3
  private readonly retryDelay = 1000 // Base delay for exponential backoff

  protected getEntityName(): string {
    return 'Service'
  }

  /**
   * Execute API call with retry logic
   */
  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    context: string,
    retries = this.maxRetries
  ): Promise<T> {
    try {
      return await operation()
    } catch (error: any) {
      // Don't retry on client errors (4xx)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw error
      }

      if (retries > 0) {
        const delay = this.retryDelay * Math.pow(2, this.maxRetries - retries)
        logger.warn(`Retrying ${context} after ${delay}ms`, {
          component: 'ApiServiceRepository',
          action: context,
          metadata: { retriesLeft: retries - 1, delay }
        })
        
        await new Promise(resolve => setTimeout(resolve, delay))
        return this.executeWithRetry(operation, context, retries - 1)
      }

      throw error
    }
  }

  /**
   * Validate and transform API response
   */
  private validateResponse<T>(data: unknown, schema: z.ZodSchema<T>, context: string): T {
    try {
      return schema.parse(data)
    } catch (error) {
      logger.error(`Response validation failed for ${context}`, {
        component: 'ApiServiceRepository',
        action: 'validateResponse',
        metadata: { error, data }
      })
      throw new ValidationError(
        `Invalid response format from API in ${context}`,
        { originalError: error, invalidData: data }
      )
    }
  }

  async findAll(params?: QueryParams): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findAll', params)
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    const operation = async () => {
      const queryString = this.buildQueryString(params)
      const response = await apiClient.get(`/services${queryString}`)
      
      const validated = this.validateResponse(
        response,
        ServiceListResponseSchema,
        'findAll services'
      )
      
      return ServiceMapper.toDomainArray(validated.services)
    }

    try {
      const services = await this.executeWithRetry(operation, 'findAll services')
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

    const operation = async () => {
      const response = await apiClient.get(`/services/${id}`)
      const validated = this.validateResponse(
        response,
        ServiceResponseSchema,
        `findById service ${id}`
      )
      return ServiceMapper.toDomain(validated)
    }

    try {
      const service = await this.executeWithRetry(operation, `findById service ${id}`)
      this.setCache(cacheKey, service)
      return service
    } catch (error: any) {
      if (error.response?.status === 404) {
        this.setCache(cacheKey, null)
        return null
      }
      this.handleError(error, `findById service ${id}`)
    }
  }

  async findPaginated(params?: QueryParams): Promise<PaginatedResponse<Service>> {
    const cacheKey = this.getCacheKey('findPaginated', params)
    const cached = this.getFromCache<PaginatedResponse<Service>>(cacheKey)
    if (cached) return cached

    const operation = async () => {
      const queryString = this.buildQueryString(params)
      const response = await apiClient.get(`/services${queryString}`)
      
      const validated = this.validateResponse(
        response,
        PaginatedServiceResponseSchema,
        'findPaginated services'
      )

      return {
        data: ServiceMapper.toDomainArray(validated.services),
        total: validated.pagination.total,
        page: validated.pagination.page,
        limit: validated.pagination.limit,
        hasNext: validated.pagination.hasNext,
        hasPrev: validated.pagination.hasPrev
      }
    }

    try {
      const result = await this.executeWithRetry(operation, 'findPaginated services')
      this.setCache(cacheKey, result)
      return result
    } catch (error) {
      this.handleError(error, 'findPaginated services')
    }
  }

  async create(data: ServiceCreateDTO): Promise<Service> {
    const operation = async () => {
      // Validate input data
      const validatedInput = ServiceMapper.toCreateDTO(data as any)
      
      const response = await apiClient.post('/services', validatedInput)
      const validated = this.validateResponse(
        response,
        ServiceResponseSchema,
        'create service'
      )
      
      return ServiceMapper.toDomain(validated)
    }

    try {
      const service = await this.executeWithRetry(operation, 'create service')
      this.invalidateCache('services')
      
      logger.info('Service created successfully', {
        component: 'ApiServiceRepository',
        action: 'create',
        metadata: { serviceId: service.id, serviceName: service.name }
      })
      
      return service
    } catch (error) {
      this.handleError(error, 'create service')
    }
  }

  async update(id: string, data: ServiceUpdateDTO): Promise<Service> {
    const operation = async () => {
      // Validate input data
      const validatedInput = ServiceMapper.toUpdateDTO(data as any)
      
      const response = await apiClient.put(`/services/${id}`, validatedInput)
      const validated = this.validateResponse(
        response,
        ServiceResponseSchema,
        `update service ${id}`
      )
      
      return ServiceMapper.toDomain(validated)
    }

    try {
      const service = await this.executeWithRetry(operation, `update service ${id}`)
      this.invalidateCache('services')
      this.invalidateCache(`findById:${id}`)
      
      logger.info('Service updated successfully', {
        component: 'ApiServiceRepository',
        action: 'update',
        metadata: { serviceId: id }
      })
      
      return service
    } catch (error) {
      this.handleError(error, `update service ${id}`)
    }
  }

  async delete(id: string): Promise<boolean> {
    const operation = async () => {
      await apiClient.delete(`/services/${id}`)
      return true
    }

    try {
      const success = await this.executeWithRetry(operation, `delete service ${id}`)
      this.invalidateCache('services')
      this.invalidateCache(`findById:${id}`)
      
      logger.info('Service deleted successfully', {
        component: 'ApiServiceRepository',
        action: 'delete',
        metadata: { serviceId: id }
      })
      
      return success
    } catch (error: any) {
      if (error.response?.status === 404) {
        return false
      }
      this.handleError(error, `delete service ${id}`)
    }
  }

  // Service-specific methods with validation
  async findByCategory(categorySlug: string): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findByCategory', { categorySlug })
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    const operation = async () => {
      const response = await apiClient.get(`/services/category/${categorySlug}`)
      const validated = this.validateResponse(
        response,
        ServiceListResponseSchema,
        `findByCategory ${categorySlug}`
      )
      return ServiceMapper.toDomainArray(validated.services)
    }

    try {
      const services = await this.executeWithRetry(operation, `findByCategory ${categorySlug}`)
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

    const operation = async () => {
      const response = await apiClient.get('/services/featured')
      const validated = this.validateResponse(
        response,
        ServiceListResponseSchema,
        'findFeatured services'
      )
      return ServiceMapper.toDomainArray(validated.services)
    }

    try {
      const services = await this.executeWithRetry(operation, 'findFeatured services')
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

    const operation = async () => {
      const response = await apiClient.get('/services/popular')
      const validated = this.validateResponse(
        response,
        ServiceListResponseSchema,
        'findPopular services'
      )
      return ServiceMapper.toDomainArray(validated.services)
    }

    try {
      const services = await this.executeWithRetry(operation, 'findPopular services')
      this.setCache(cacheKey, services)
      return services
    } catch (error) {
      this.handleError(error, 'findPopular services')
    }
  }

  // Implement remaining methods...
  async findOne(filters: FilterParams): Promise<Service | null> {
    const services = await this.findMany(filters)
    return services[0] || null
  }

  async findMany(filters: FilterParams): Promise<Service[]> {
    return this.findAll({ filters })
  }

  async count(filters?: FilterParams): Promise<number> {
    const operation = async () => {
      const queryString = this.buildQueryString({ filters })
      const response = await apiClient.get(`/services/count${queryString}`)
      const validated = z.object({ count: z.number() }).parse(response)
      return validated.count
    }

    try {
      return await this.executeWithRetry(operation, 'count services')
    } catch (error) {
      this.handleError(error, 'count services')
    }
  }

  async exists(id: string): Promise<boolean> {
    const service = await this.findById(id)
    return service !== null
  }

  async findByAvailability(availability: string): Promise<Service[]> {
    return this.findWithFilters({ availability: [availability] } as ServiceFilters)
  }

  async search(query: string): Promise<Service[]> {
    return this.findWithFilters({ query } as ServiceFilters)
  }

  async findWithFilters(filters: ServiceFilters): Promise<Service[]> {
    return this.findAll({ filters: filters as FilterParams })
  }

  async findRelated(serviceId: string, limit = 3): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findRelated', { serviceId, limit })
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    const operation = async () => {
      const response = await apiClient.get(`/services/${serviceId}/related?limit=${limit}`)
      const validated = this.validateResponse(
        response,
        ServiceListResponseSchema,
        `findRelated services for ${serviceId}`
      )
      return ServiceMapper.toDomainArray(validated.services)
    }

    try {
      const services = await this.executeWithRetry(operation, `findRelated for ${serviceId}`)
      this.setCache(cacheKey, services)
      return services
    } catch (error) {
      this.handleError(error, `findRelated services for ${serviceId}`)
    }
  }

  async getAverageRating(serviceId: string): Promise<number> {
    const operation = async () => {
      const response = await apiClient.get(`/services/${serviceId}/rating`)
      const validated = z.object({ rating: z.number() }).parse(response)
      return validated.rating
    }

    try {
      return await this.executeWithRetry(operation, `getAverageRating for ${serviceId}`)
    } catch (error) {
      this.handleError(error, `getAverageRating for service ${serviceId}`)
    }
  }

  async getBookingCount(serviceId: string): Promise<number> {
    const operation = async () => {
      const response = await apiClient.get(`/services/${serviceId}/bookings/count`)
      const validated = z.object({ count: z.number() }).parse(response)
      return validated.count
    }

    try {
      return await this.executeWithRetry(operation, `getBookingCount for ${serviceId}`)
    } catch (error) {
      this.handleError(error, `getBookingCount for service ${serviceId}`)
    }
  }

  // Enhanced error handling
  protected override handleError(error: any, context?: string): never {
    // Log the error with context
    logger.error(`Repository error in ${context}`, {
      component: 'ApiServiceRepository',
      action: context,
      metadata: {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data
      }
    })

    // Call parent error handler
    super.handleError(error, context)
  }

  // Utility methods
  private buildQueryString(params?: QueryParams): string {
    if (!params) return ''

    const searchParams = new URLSearchParams()

    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v.toString()))
        } else if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString())
        }
      })
    }

    if (params.pagination) {
      const { page, limit, offset } = params.pagination
      if (page) searchParams.append('page', page.toString())
      if (limit) searchParams.append('limit', limit.toString())
      if (offset) searchParams.append('offset', offset.toString())
    }

    if (params.sort) {
      searchParams.append('sortBy', params.sort.field)
      searchParams.append('sortOrder', params.sort.order)
    }

    if (params.include) {
      params.include.forEach(inc => searchParams.append('include', inc))
    }

    const queryString = searchParams.toString()
    return queryString ? `?${queryString}` : ''
  }
}