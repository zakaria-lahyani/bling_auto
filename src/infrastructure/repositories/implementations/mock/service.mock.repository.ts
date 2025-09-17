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

// Mock data - in real app, this would come from a JSON file or mock API
const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Basic Wash',
    slug: 'basic-wash',
    description: 'Essential exterior wash with soap and rinse',
    shortDescription: 'Essential exterior wash',
    price: 25,
    duration: '30 min',
    image: '/images/basic-wash.jpg',
    isActive: true,
    category: {
      id: 'wash',
      name: 'Wash Services',
      slug: 'wash',
      description: 'Basic to premium exterior and interior cleaning services',
      serviceCount: 3
    },
    featured: false,
    popular: true,
    availability: {
      mobile: true,
      inShop: true
    },
    features: ['Exterior wash', 'Soap and rinse', 'Basic dry'],
    tags: ['exterior', 'quick', 'affordable'],
    rating: 4.2,
    reviewCount: 156,
    estimatedTime: { min: 25, max: 35 },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Premium Detail',
    slug: 'premium-detail',
    description: 'Complete interior and exterior detailing service',
    shortDescription: 'Complete detailing service',
    price: 85,
    duration: '2 hours',
    image: '/images/premium-detail.jpg',
    isActive: true,
    category: {
      id: 'wash',
      name: 'Wash Services', 
      slug: 'wash',
      description: 'Basic to premium exterior and interior cleaning services',
      serviceCount: 5
    },
    featured: true,
    popular: true,
    availability: {
      mobile: true,
      inShop: true
    },
    features: ['Interior cleaning', 'Exterior detail', 'Premium products'],
    tags: ['interior', 'exterior', 'premium', 'detailed'],
    rating: 4.8,
    reviewCount: 89,
    estimatedTime: { min: 110, max: 130 },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Mobile Quick Wash',
    slug: 'mobile-quick-wash',
    description: 'Fast mobile wash service at your location',
    shortDescription: 'Fast mobile wash service',
    price: 35,
    duration: '45 min',
    image: '/images/mobile-wash.jpg',
    isActive: true,
    category: {
      id: 'wash',
      name: 'Wash Services',
      slug: 'wash', 
      description: 'Basic to premium exterior and interior cleaning services',
      serviceCount: 4
    },
    featured: false,
    popular: false,
    availability: {
      mobile: true,
      inShop: false
    },
    features: ['Mobile service', 'Quick wash', 'At your location'],
    estimatedTime: { min: 40, max: 50 },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    tags: ['mobile', 'convenient', 'quick'],
    rating: 4.0,
    reviewCount: 234
  },
  {
    id: '4',
    name: 'Interior Detailing',
    slug: 'interior-detailing',
    description: 'Deep interior cleaning with vacuum, shampoo, and conditioning',
    shortDescription: 'Deep interior cleaning service',
    price: 65,
    duration: '90 min',
    image: '/images/interior-detailing.jpg',
    isActive: true,
    category: {
      id: 'detailing',
      name: 'Detailing Services',
      slug: 'detailing',
      description: 'Professional detailing services',
      serviceCount: 3
    },
    featured: true,
    popular: false,
    availability: {
      mobile: false,
      inShop: true
    },
    features: ['Deep vacuum', 'Upholstery cleaning', 'Dashboard conditioning'],
    estimatedTime: { min: 80, max: 100 },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    tags: ['interior', 'deep-clean', 'detailing'],
    rating: 4.6,
    reviewCount: 87
  },
  {
    id: '5',
    name: 'Ceramic Coating',
    slug: 'ceramic-coating',
    description: 'Premium paint protection with ceramic coating application',
    shortDescription: 'Premium ceramic coating protection',
    price: 299,
    duration: '4 hours',
    image: '/images/ceramic-coating.jpg',
    isActive: true,
    category: {
      id: 'protection',
      name: 'Protection Services',
      slug: 'protection',
      description: 'Vehicle protection services',
      serviceCount: 2
    },
    featured: true,
    popular: true,
    availability: {
      mobile: false,
      inShop: true
    },
    features: ['9H hardness coating', 'Hydrophobic finish', '2-year warranty'],
    estimatedTime: { min: 220, max: 260 },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    tags: ['ceramic', 'protection', 'premium'],
    rating: 4.9,
    reviewCount: 45
  },
  {
    id: '6',
    name: 'Paint Correction',
    slug: 'paint-correction',
    description: 'Professional paint correction to remove swirls, scratches, and imperfections',
    shortDescription: 'Professional paint correction service',
    price: 199,
    duration: '3 hours',
    image: '/images/paint-correction.jpg',
    isActive: true,
    category: {
      id: 'restoration',
      name: 'Restoration',
      slug: 'restoration',
      description: 'Paint correction and headlight restoration services',
      serviceCount: 2
    },
    featured: false,
    popular: false,
    availability: {
      mobile: false,
      inShop: true
    },
    features: ['Swirl removal', 'Scratch correction', 'Paint polishing'],
    estimatedTime: { min: 160, max: 200 },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    tags: ['restoration', 'paint-correction', 'polishing'],
    rating: 4.7,
    reviewCount: 32
  },
  {
    id: '7',
    name: 'Engine Bay Cleaning',
    slug: 'engine-bay-cleaning',
    description: 'Specialized engine bay cleaning and detailing service',
    shortDescription: 'Professional engine bay cleaning',
    price: 89,
    duration: '2 hours',
    image: '/images/engine-bay.jpg',
    isActive: true,
    category: {
      id: 'specialty',
      name: 'Specialty',
      slug: 'specialty',
      description: 'Specialized services for unique vehicle needs',
      serviceCount: 1
    },
    featured: false,
    popular: false,
    availability: {
      mobile: true,
      inShop: true
    },
    features: ['Engine degreasing', 'Component cleaning', 'Protective dressing'],
    estimatedTime: { min: 100, max: 130 },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    tags: ['specialty', 'engine', 'cleaning'],
    rating: 4.4,
    reviewCount: 18
  }
]

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

    const service = MOCK_SERVICES.find(s => s.id === id) || null
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

    const newService: Service = {
      id: `mock-${Date.now()}`,
      name: data.name,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      description: data.description,
      shortDescription: data.description?.substring(0, 100) || '',
      price: data.price,
      duration: typeof data.duration === 'number' ? `${data.duration} min` : data.duration,
      image: data.images?.[0] || '/images/default-service.jpg',
      isActive: true,
      category: {
        id: data.category,
        name: data.category,
        slug: data.category,
        description: '',
        serviceCount: 0
      },
      featured: data.featured || false,
      popular: data.popular || false,
      availability: {
        mobile: data.availability?.includes('mobile') || false,
        inShop: data.availability?.includes('inShop') || data.availability?.includes('onsite') || false
      },
      features: [], // Default empty features since DTO doesn't include this
      tags: data.tags || [],
      rating: 0,
      reviewCount: 0,
      estimatedTime: { min: 30, max: 60 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    MOCK_SERVICES.push(newService)
    this.invalidateCache()
    return newService
  }

  async update(id: string, data: ServiceUpdateDTO): Promise<Service> {
    await this.simulateDelay()

    const index = MOCK_SERVICES.findIndex(s => s.id === id)
    if (index === -1) {
      throw new NotFoundError('Service', id)
    }

    const existing = MOCK_SERVICES[index]
    const updated: Service = {
      ...existing,
      ...data,
      category: typeof data.category === 'string' ? {
        id: data.category,
        name: data.category,
        slug: data.category.toLowerCase().replace(/\s+/g, '-')
      } : data.category || existing.category,
      duration: data.duration ? (typeof data.duration === 'number' ? `${data.duration} min` : data.duration) : existing.duration,
      availability: data.availability ? {
        mobile: data.availability.includes('mobile'),
        inShop: data.availability.includes('inShop') || data.availability.includes('onsite')
      } : existing.availability,
      updatedAt: new Date().toISOString()
    }
    MOCK_SERVICES[index] = updated
    this.invalidateCache()
    return updated
  }

  async delete(id: string): Promise<boolean> {
    await this.simulateDelay()

    const index = MOCK_SERVICES.findIndex(s => s.id === id)
    if (index === -1) {
      return false
    }

    MOCK_SERVICES.splice(index, 1)
    this.invalidateCache()
    return true
  }

  async count(filters?: FilterParams): Promise<number> {
    await this.simulateDelay()
    
    if (!filters) return MOCK_SERVICES.length
    return this.applyFilters(MOCK_SERVICES, filters).length
  }

  async exists(id: string): Promise<boolean> {
    await this.simulateDelay()
    return MOCK_SERVICES.some(s => s.id === id)
  }

  // Service-specific methods
  async findByCategory(categorySlug: string): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findByCategory', { categorySlug })
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    await this.simulateDelay()

    const result = MOCK_SERVICES.filter(s => s.category.slug === categorySlug)
    this.setCache(cacheKey, result)
    return result
  }

  async findFeatured(): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findFeatured')
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    await this.simulateDelay()

    const result = MOCK_SERVICES.filter(s => s.featured)
    this.setCache(cacheKey, result)
    return result
  }

  async findPopular(): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findPopular')
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    await this.simulateDelay()

    const result = MOCK_SERVICES.filter(s => s.popular)
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

    const lowercaseQuery = query.toLowerCase()
    const result = MOCK_SERVICES.filter(s => 
      s.name.toLowerCase().includes(lowercaseQuery) ||
      s.description.toLowerCase().includes(lowercaseQuery) ||
      s.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )

    this.setCache(cacheKey, result)
    return result
  }

  async findWithFilters(filters: ServiceFilters): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findWithFilters', filters)
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    await this.simulateDelay()

    let result = [...MOCK_SERVICES]

    if (filters.category) {
      result = result.filter(s => s.category.slug === filters.category)
    }

    if (filters.featured !== undefined) {
      result = result.filter(s => s.featured === filters.featured)
    }

    if (filters.popular !== undefined) {
      result = result.filter(s => s.popular === filters.popular)
    }

    if (filters.availability) {
      result = result.filter(s => {
        return filters.availability!.some(avail => {
          if (avail === 'mobile') return s.availability.mobile
          if (avail === 'onsite') return s.availability.onsite
          return false
        })
      })
    }

    if (filters.priceRange) {
      const { min, max } = filters.priceRange
      result = result.filter(s => {
        if (min !== undefined && s.price < min) return false
        if (max !== undefined && s.price > max) return false
        return true
      })
    }

    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    this.setCache(cacheKey, result)
    return result
  }

  async findRelated(serviceId: string, limit = 3): Promise<Service[]> {
    const cacheKey = this.getCacheKey('findRelated', { serviceId, limit })
    const cached = this.getFromCache<Service[]>(cacheKey)
    if (cached) return cached

    await this.simulateDelay()

    const service = await this.findById(serviceId)
    if (!service) return []

    // Find services in the same category, excluding the current service
    const result = MOCK_SERVICES
      .filter(s => s.id !== serviceId && s.category.slug === service.category.slug)
      .slice(0, limit)

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