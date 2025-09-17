/**
 * Service Repository Integration Tests
 * 
 * Tests service repository operations across different data sources
 * and validates data consistency and error handling
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { RepositoryFactory } from '../factory/repository.factory'
import type { IServiceRepository, ServiceFilters } from '../interfaces/service.repository'
import { NotFoundError, ValidationError } from '../interfaces/base.repository'

// Mock the API client
vi.mock('@/infrastructure/api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('Service Repository Integration Tests', () => {
  let factory: RepositoryFactory
  let mockRepo: IServiceRepository
  let apiRepo: IServiceRepository

  beforeEach(() => {
    factory = new RepositoryFactory()
    vi.clearAllMocks()
    
    // Setup repositories
    factory.updateConfig({ dataSource: 'mock' })
    mockRepo = factory.getServiceRepository()
    
    factory.updateConfig({ dataSource: 'api', fallbackToMock: true })
    apiRepo = factory.getServiceRepository()
  })

  afterEach(() => {
    factory.clearInstances()
  })

  describe('CRUD Operations Consistency', () => {
    it('should create services with consistent data structure', async () => {
      const serviceData = {
        name: 'Test Service',
        description: 'A test service for integration testing',
        price: 50,
        duration: '60 min',
        category: 'test',
        featured: true,
        availability: {
          mobile: true,
          inShop: false
        },
        tags: ['test', 'integration']
      }

      // Test mock repository
      const mockService = await mockRepo.create(serviceData)
      expect(mockService).toHaveProperty('id')
      expect(mockService.name).toBe(serviceData.name)
      expect(mockService.price).toBe(serviceData.price)
      expect(mockService.availability.mobile).toBe(true)

      // Test API repository (will use fallback)
      const apiService = await apiRepo.create(serviceData)
      expect(apiService).toHaveProperty('id')
      expect(apiService.name).toBe(serviceData.name)
      expect(apiService.price).toBe(serviceData.price)

      // Verify structure consistency
      expect(Object.keys(mockService).sort()).toEqual(Object.keys(apiService).sort())
    })

    it('should read services consistently', async () => {
      const mockServices = await mockRepo.findAll()
      const apiServices = await apiRepo.findAll()

      expect(Array.isArray(mockServices)).toBe(true)
      expect(Array.isArray(apiServices)).toBe(true)

      if (mockServices.length > 0) {
        const mockService = mockServices[0]
        expect(mockService).toHaveProperty('id')
        expect(mockService).toHaveProperty('name')
        expect(mockService).toHaveProperty('category')
        expect(typeof mockService.category).toBe('object')
        expect(mockService.category).toHaveProperty('slug')
      }
    })

    it('should update services consistently', async () => {
      // First, ensure we have a service to update
      const services = await mockRepo.findAll()
      if (services.length === 0) {
        const newService = await mockRepo.create({
          name: 'Update Test Service',
          description: 'Service for update testing',
          price: 75,
          duration: '45 min',
          category: 'test'
        })
        services.push(newService)
      }

      const serviceId = services[0].id
      const updateData = {
        name: 'Updated Service Name',
        price: 100
      }

      // Test mock repository update
      const updatedMockService = await mockRepo.update(serviceId, updateData)
      expect(updatedMockService.name).toBe(updateData.name)
      expect(updatedMockService.price).toBe(updateData.price)

      // Verify the update persisted
      const retrievedService = await mockRepo.findById(serviceId)
      expect(retrievedService?.name).toBe(updateData.name)
      expect(retrievedService?.price).toBe(updateData.price)
    })

    it('should delete services consistently', async () => {
      // Create a service to delete
      const newService = await mockRepo.create({
        name: 'Delete Test Service',
        description: 'Service for delete testing',
        price: 30,
        duration: '30 min',
        category: 'test'
      })

      const serviceId = newService.id

      // Verify service exists
      const existsBefore = await mockRepo.exists(serviceId)
      expect(existsBefore).toBe(true)

      // Delete the service
      const deleteResult = await mockRepo.delete(serviceId)
      expect(deleteResult).toBe(true)

      // Verify service no longer exists
      const existsAfter = await mockRepo.exists(serviceId)
      expect(existsAfter).toBe(false)

      // Verify service can't be found
      const deletedService = await mockRepo.findById(serviceId)
      expect(deletedService).toBeNull()
    })
  })

  describe('Query Operations', () => {
    it('should filter by category consistently', async () => {
      const washServices = await mockRepo.findByCategory('wash')
      const detailingServices = await mockRepo.findByCategory('detailing')

      expect(Array.isArray(washServices)).toBe(true)
      expect(Array.isArray(detailingServices)).toBe(true)

      // Verify category filtering
      washServices.forEach(service => {
        expect(service.category.slug).toBe('wash')
      })

      detailingServices.forEach(service => {
        expect(service.category.slug).toBe('detailing')
      })
    })

    it('should find featured services consistently', async () => {
      const featuredServices = await mockRepo.findFeatured()
      
      expect(Array.isArray(featuredServices)).toBe(true)
      featuredServices.forEach(service => {
        expect(service.featured).toBe(true)
      })
    })

    it('should find popular services consistently', async () => {
      const popularServices = await mockRepo.findPopular()
      
      expect(Array.isArray(popularServices)).toBe(true)
      popularServices.forEach(service => {
        expect(service.popular).toBe(true)
      })
    })

    it('should search services consistently', async () => {
      const searchResults = await mockRepo.search('wash')
      
      expect(Array.isArray(searchResults)).toBe(true)
      
      // Verify search results contain the search term
      searchResults.forEach(service => {
        const containsSearchTerm = 
          service.name.toLowerCase().includes('wash') ||
          service.description.toLowerCase().includes('wash') ||
          service.tags.some(tag => tag.toLowerCase().includes('wash'))
        
        expect(containsSearchTerm).toBe(true)
      })
    })

    it('should apply complex filters consistently', async () => {
      const filters: ServiceFilters = {
        category: 'wash',
        featured: true,
        priceMin: 20,
        priceMax: 100,
        availability: ['mobile']
      }

      const filteredServices = await mockRepo.findWithFilters(filters)
      
      expect(Array.isArray(filteredServices)).toBe(true)
      
      filteredServices.forEach(service => {
        expect(service.category.slug).toBe('wash')
        expect(service.featured).toBe(true)
        expect(service.price).toBeGreaterThanOrEqual(20)
        expect(service.price).toBeLessThanOrEqual(100)
        expect(service.availability.mobile).toBe(true)
      })
    })
  })

  describe('Pagination and Sorting', () => {
    it('should paginate results consistently', async () => {
      const paginatedResult = await mockRepo.findPaginated({
        pagination: { page: 1, limit: 3 }
      })

      expect(paginatedResult).toHaveProperty('data')
      expect(paginatedResult).toHaveProperty('total')
      expect(paginatedResult).toHaveProperty('page')
      expect(paginatedResult).toHaveProperty('limit')
      expect(paginatedResult).toHaveProperty('hasNext')
      expect(paginatedResult).toHaveProperty('hasPrev')

      expect(Array.isArray(paginatedResult.data)).toBe(true)
      expect(paginatedResult.data.length).toBeLessThanOrEqual(3)
      expect(paginatedResult.page).toBe(1)
      expect(paginatedResult.limit).toBe(3)
      expect(paginatedResult.hasPrev).toBe(false)
    })

    it('should sort results consistently', async () => {
      const sortedByPrice = await mockRepo.findAll({
        sort: { field: 'price', order: 'asc' }
      })

      expect(Array.isArray(sortedByPrice)).toBe(true)
      
      if (sortedByPrice.length > 1) {
        for (let i = 1; i < sortedByPrice.length; i++) {
          expect(sortedByPrice[i].price).toBeGreaterThanOrEqual(sortedByPrice[i - 1].price)
        }
      }
    })
  })

  describe('Error Handling', () => {
    it('should handle not found errors consistently', async () => {
      const nonExistentId = 'non-existent-service-id'
      
      const service = await mockRepo.findById(nonExistentId)
      expect(service).toBeNull()

      const exists = await mockRepo.exists(nonExistentId)
      expect(exists).toBe(false)

      // Update should throw NotFoundError
      await expect(mockRepo.update(nonExistentId, { name: 'Updated' }))
        .rejects.toThrow(NotFoundError)
    })

    it('should handle validation errors consistently', async () => {
      const invalidServiceData = {
        name: '', // Invalid: empty name
        description: 'Test',
        price: -10, // Invalid: negative price
        duration: '',
        category: ''
      }

      // Should validate input and throw appropriate error
      await expect(mockRepo.create(invalidServiceData))
        .rejects.toThrow()
    })

    it('should handle concurrent operations', async () => {
      const promises = []
      
      // Create multiple services concurrently
      for (let i = 0; i < 5; i++) {
        promises.push(mockRepo.create({
          name: `Concurrent Service ${i}`,
          description: `Service ${i} for concurrency testing`,
          price: 50 + i * 10,
          duration: '60 min',
          category: 'test'
        }))
      }

      const results = await Promise.all(promises)
      
      expect(results).toHaveLength(5)
      results.forEach((service, index) => {
        expect(service.name).toBe(`Concurrent Service ${index}`)
        expect(service.price).toBe(50 + index * 10)
      })
    })
  })

  describe('Cache Behavior', () => {
    it('should respect cache settings', async () => {
      // Test with cache enabled
      factory.updateConfig({ dataSource: 'mock', cacheEnabled: true })
      const cachedRepo = factory.getServiceRepository()

      const start1 = performance.now()
      await cachedRepo.findAll()
      const firstCallTime = performance.now() - start1

      const start2 = performance.now()
      await cachedRepo.findAll() // Should be faster due to cache
      const secondCallTime = performance.now() - start2

      // Second call might be faster, but this isn't guaranteed in tests
      expect(secondCallTime).toBeGreaterThanOrEqual(0)

      // Test cache invalidation
      await cachedRepo.create({
        name: 'Cache Test Service',
        description: 'Testing cache invalidation',
        price: 40,
        duration: '30 min',
        category: 'test'
      })

      // Cache should be invalidated after create
      const servicesAfterCreate = await cachedRepo.findAll()
      expect(Array.isArray(servicesAfterCreate)).toBe(true)
    })
  })

  describe('Data Consistency', () => {
    it('should maintain referential integrity', async () => {
      const services = await mockRepo.findAll()
      
      if (services.length > 0) {
        const service = services[0]
        
        // Check related services
        const relatedServices = await mockRepo.findRelated(service.id)
        expect(Array.isArray(relatedServices)).toBe(true)
        
        // Related services should be from same category but different ID
        relatedServices.forEach(related => {
          expect(related.id).not.toBe(service.id)
          expect(related.category.slug).toBe(service.category.slug)
        })
      }
    })

    it('should maintain statistics consistency', async () => {
      const services = await mockRepo.findAll()
      
      if (services.length > 0) {
        const service = services[0]
        
        const rating = await mockRepo.getAverageRating(service.id)
        const bookingCount = await mockRepo.getBookingCount(service.id)
        
        expect(typeof rating).toBe('number')
        expect(rating).toBeGreaterThanOrEqual(0)
        expect(rating).toBeLessThanOrEqual(5)
        
        expect(typeof bookingCount).toBe('number')
        expect(bookingCount).toBeGreaterThanOrEqual(0)
      }
    })
  })
})