/**
 * Mock Service Repository Implementation
 * Uses static data for development and testing
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
  NotFoundError 
} from '../../interfaces/base.repository'
import type { Service } from '@/core/entities/service/types'
import { ServiceMapper, ValidationUtils } from '@/infrastructure/dto'
import { logger } from '@/shared/utils/logger'
import { MockDataLoader } from '@/infrastructure/data/mock'

// Mock data loaded from external JSON files
let MOCK_SERVICES: Service[] = []

// Initialize mock data
const initializeMockData = () => {
  if (MOCK_SERVICES.length === 0) {
    MOCK_SERVICES = [...MockDataLoader.getServices()]
  }
}

export class MockServiceRepository extends BaseRepositoryImpl<Service, ServiceCreateDTO, ServiceUpdateDTO> 
  implements IServiceRepository {

  protected getEntityName(): string {
    return 'Service'
  }

  async findAll(params?: QueryParams): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findAll', params)
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    // Simulate API delay
    await this.simulateDelay()

    // Initialize data if needed
    initializeMockData()
    
    let result = [...MOCK_SERVICES]

    if (params?.filters) {
      result = this.applyFilters(result, params.filters)
    }

    if (params?.sort) {
      result = this.applySorting(result, params.sort)
    }

    this.setCache(cacheKey, result)
    return result
  }

  async findById(id: string): Promise<Service | null> {
    const cacheKey = this.getCacheKey('findById', { id })
    const cached = this.getFromCache<Service | null>(cacheKey)
    if (cached !== undefined) return cached

    await this.simulateDelay()

    initializeMockData()
    const service = MockDataLoader.getServiceById(id)
    this.setCache(cacheKey, service)
    return service
  }

  async findOne(filters: FilterParams): Promise<Service | null> {
    await this.simulateDelay()
    const filtered = this.applyFilters(MOCK_SERVICES, filters)
    return filtered[0] || null
  }

  async findMany(filters: FilterParams): Promise<Service[]> {
    await this.simulateDelay()
    return this.applyFilters(MOCK_SERVICES, filters)
  }

  async findPaginated(params?: QueryParams): Promise<PaginatedResponse<Service>> {
    const cacheKey = this.getCacheKey('findPaginated', params)
    const cached = this.getFromCache<PaginatedResponse<Service>>(cacheKey)
    if (cached) return cached

    await this.simulateDelay()

    let data = [...MOCK_SERVICES]

    if (params?.filters) {
      data = this.applyFilters(data, params.filters)
    }

    if (params?.sort) {
      data = this.applySorting(data, params.sort)
    }

    const { data: paginatedData, pagination } = this.applyPagination(data, params?.pagination)

    const result: PaginatedResponse<Service> = {
      data: paginatedData,
      total: pagination.total,
      page: pagination.page,
      limit: pagination.limit,
      hasNext: pagination.hasNext,
      hasPrev: pagination.hasPrev
    }

    this.setCache(cacheKey, result)
    return result
  }

  async create(data: ServiceCreateDTO): Promise<Service> {
    await this.simulateDelay()

    try {
      // Validate input using DTO
      const validatedInput = ServiceMapper.toCreateDTO(data as any)
      
      const newServiceData = {
        id: `mock-${Date.now()}`,
        name: validatedInput.name,
        slug: validatedInput.name.toLowerCase().replace(/\s+/g, '-'),
        description: validatedInput.description,
        shortDescription: validatedInput.shortDescription || validatedInput.description.substring(0, 100),
        price: validatedInput.price,
        duration: ServiceMapper.normalizeDuration(validatedInput.duration),
        image: validatedInput.images?.[0] || '/images/default-service.jpg',
        images: validatedInput.images,
        isActive: true,
        category: {
          id: validatedInput.category,
          name: validatedInput.category,
          slug: validatedInput.category.toLowerCase().replace(/\s+/g, '-'),
          description: '',
          serviceCount: 0
        },
        featured: validatedInput.featured || false,
        popular: validatedInput.popular || false,
        availability: validatedInput.availability || {
          mobile: false,
          inShop: true
        },
        features: validatedInput.features || [],
        tags: validatedInput.tags || [],
        rating: 0,
        reviewCount: 0,
        estimatedTime: { 
          min: ServiceMapper.extractDurationMinutes(ServiceMapper.normalizeDuration(validatedInput.duration)) - 5, 
          max: ServiceMapper.extractDurationMinutes(ServiceMapper.normalizeDuration(validatedInput.duration)) + 5 
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Use mapper to ensure consistent structure
      const mappedService = ServiceMapper.toDomain(newServiceData as any)
      
      // Add to in-memory store and external data loader
      initializeMockData()
      MOCK_SERVICES.push(mappedService)
      MockDataLoader.addService(mappedService)
      this.invalidateCache()
      
      logger.info('Service created in mock repository', {
        component: 'MockServiceRepository',
        action: 'create',
        metadata: { serviceId: mappedService.id, serviceName: mappedService.name }
      })
      
      return mappedService
    } catch (error) {
      logger.error('Failed to create service in mock repository', {
        component: 'MockServiceRepository',
        action: 'create',
        metadata: { error: error instanceof Error ? error.message : String(error), data }
      })
      throw error
    }
  }

  async update(id: string, data: ServiceUpdateDTO): Promise<Service> {
    await this.simulateDelay()

    const index = MOCK_SERVICES.findIndex(s => s.id === id)
    if (index === -1) {
      throw new NotFoundError('Service', id)
    }

    const existing = MOCK_SERVICES[index]
    if (!existing) {
      throw new NotFoundError('Service', id)
    }

    try {
      // Validate input using DTO
      const validatedInput = ServiceMapper.toUpdateDTO(data as any)
      
      // Merge with existing data
      const updatedData = ValidationUtils.deepMerge(existing, {
        ...validatedInput,
        duration: validatedInput.duration ? ServiceMapper.normalizeDuration(validatedInput.duration) : existing.duration,
        category: typeof validatedInput.category === 'string' ? {
          id: validatedInput.category,
          name: validatedInput.category,
          slug: validatedInput.category.toLowerCase().replace(/\s+/g, '-'),
          description: 'description' in existing.category ? existing.category.description : '',
          serviceCount: 'serviceCount' in existing.category ? existing.category.serviceCount : 0
        } : validatedInput.category || existing.category,
        updatedAt: new Date().toISOString()
      })
      
      // Use mapper to ensure consistent structure
      const mappedService = ServiceMapper.toDomain(updatedData as any)
      
      // Update in-memory store and external data loader
      initializeMockData()
      MOCK_SERVICES[index] = mappedService
      MockDataLoader.updateService(id, mappedService)
      this.invalidateCache()
      
      logger.info('Service updated in mock repository', {
        component: 'MockServiceRepository',
        action: 'update',
        metadata: { serviceId: id }
      })
      
      return mappedService
    } catch (error) {
      logger.error('Failed to update service in mock repository', {
        component: 'MockServiceRepository',
        action: 'update',
        metadata: { error: error instanceof Error ? error.message : String(error), serviceId: id, data }
      })
      throw error
    }
  }

  async delete(id: string): Promise<boolean> {
    await this.simulateDelay()

    initializeMockData()
    const index = MOCK_SERVICES.findIndex(s => s.id === id)
    if (index === -1) {
      return false
    }

    MOCK_SERVICES.splice(index, 1)
    MockDataLoader.removeService(id)
    this.invalidateCache()
    return true
  }

  async count(filters?: FilterParams): Promise<number> {
    await this.simulateDelay()
    
    initializeMockData()
    if (!filters) return MOCK_SERVICES.length
    return this.applyFilters(MOCK_SERVICES, filters).length
  }

  async exists(id: string): Promise<boolean> {
    await this.simulateDelay()
    return MockDataLoader.getServiceById(id) !== null
  }

  // Service-specific methods
  async findByCategory(categorySlug: string): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findByCategory', { categorySlug })
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    await this.simulateDelay()

    const result = MockDataLoader.getServicesByCategory(categorySlug)
    this.setCache(cacheKey, result)
    return result
  }

  async findFeatured(): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findFeatured')
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    await this.simulateDelay()

    const result = MockDataLoader.getFeaturedServices()
    this.setCache(cacheKey, result)
    return result
  }

  async findPopular(): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findPopular')
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    await this.simulateDelay()

    const result = MockDataLoader.getPopularServices()
    this.setCache(cacheKey, result)
    return result
  }

  async findByAvailability(availability: string): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findByAvailability', { availability })
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    await this.simulateDelay()

    const result = MOCK_SERVICES.filter(s => {
      if (availability === 'mobile') return s.availability.mobile
      if (availability === 'onsite') return s.availability.onsite
      return false
    })

    this.setCache(cacheKey, result)
    return result
  }

  async search(query: string): Promise<Service[]> {
    const cacheKey = this.getCacheKey('search', { query })
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    await this.simulateDelay()

    const result = MockDataLoader.searchServices(query)
    this.setCache(cacheKey, result)
    return result
  }

  async findWithFilters(filters: ServiceFilters): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findWithFilters', filters)
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    await this.simulateDelay()

    const result = MockDataLoader.filterServices({
      category: Array.isArray(filters.category) ? filters.category[0] : filters.category,
      featured: filters.featured,
      popular: filters.popular,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      availability: filters.availability,
      query: filters.query
    })

    this.setCache(cacheKey, result)
    return result
  }

  async findRelated(serviceId: string, limit = 3): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findRelated', { serviceId, limit })
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    await this.simulateDelay()

    const result = MockDataLoader.getRelatedServices(serviceId, limit)
    this.setCache(cacheKey, result)
    return result
  }

  async getAverageRating(serviceId: string): Promise<number> {
    await this.simulateDelay()
    const service = await this.findById(serviceId)
    return service?.rating || 0
  }

  async getBookingCount(serviceId: string): Promise<number> {
    await this.simulateDelay()
    // Return mock booking count
    return Math.floor(Math.random() * 100) + 10
  }

  // Utility methods
  private async simulateDelay(ms = 100): Promise<void> {
    if (process.env.NODE_ENV === 'test') return
    await new Promise(resolve => setTimeout(resolve, ms))
  }
}