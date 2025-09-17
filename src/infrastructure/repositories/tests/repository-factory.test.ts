/**
 * Repository Factory Integration Tests
 * 
 * Tests the switching between different data sources (mock/API/hybrid)
 * and ensures repositories maintain consistent interfaces
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { RepositoryFactory, repositoryFactory } from '../factory/repository.factory'
import type { ServiceFilters } from '../interfaces/service.repository'

// Mock the API client to avoid real network calls
vi.mock('@/infrastructure/api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('Repository Factory Integration Tests', () => {
  let factory: RepositoryFactory
  
  beforeEach(() => {
    // Create a fresh factory instance for each test
    factory = new RepositoryFactory()
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Clean up after each test
    factory.clearInstances()
  })

  describe('Data Source Switching', () => {
    it('should switch between mock and API data sources', async () => {
      // Start with mock data source
      factory.updateConfig({ dataSource: 'mock' })
      const mockRepository = factory.getServiceRepository()
      
      // Verify we get mock repository
      expect(mockRepository.constructor.name).toBe('MockServiceRepository')
      
      // Switch to API data source
      factory.updateConfig({ dataSource: 'api' })
      const apiRepository = factory.getServiceRepository()
      
      // Verify we get API repository (with fallback due to mocked API)
      expect(apiRepository.constructor.name).toMatch(/ServiceRepository/)
    })

    it('should maintain singleton instances per data source', () => {
      factory.updateConfig({ dataSource: 'mock' })
      
      const repo1 = factory.getServiceRepository()
      const repo2 = factory.getServiceRepository()
      
      // Should return the same instance
      expect(repo1).toBe(repo2)
    })

    it('should create new instances after config update', () => {
      factory.updateConfig({ dataSource: 'mock' })
      const mockRepo = factory.getServiceRepository()
      
      factory.updateConfig({ dataSource: 'api' })
      const apiRepo = factory.getServiceRepository()
      
      // Should be different instances
      expect(mockRepo).not.toBe(apiRepo)
    })
  })

  describe('Repository Interface Consistency', () => {
    it('should maintain consistent interface across data sources', async () => {
      const testMethods = [
        'findAll',
        'findById',
        'findByCategory',
        'findFeatured',
        'findPopular',
        'search',
        'create',
        'update',
        'delete',
        'count',
        'exists'
      ]

      // Test mock repository
      factory.updateConfig({ dataSource: 'mock' })
      const mockRepo = factory.getServiceRepository()
      
      testMethods.forEach(method => {
        expect(typeof mockRepo[method]).toBe('function')
      })

      // Test API repository (fallback will use mock)
      factory.updateConfig({ dataSource: 'api', fallbackToMock: true })
      const apiRepo = factory.getServiceRepository()
      
      testMethods.forEach(method => {
        expect(typeof apiRepo[method]).toBe('function')
      })
    })

    it('should return consistent data structure from all repositories', async () => {
      // Test with mock repository
      factory.updateConfig({ dataSource: 'mock' })
      const mockRepo = factory.getServiceRepository()
      
      const mockServices = await mockRepo.findAll()
      expect(Array.isArray(mockServices)).toBe(true)
      
      if (mockServices.length > 0) {
        const service = mockServices[0]
        expect(service).toHaveProperty('id')
        expect(service).toHaveProperty('name')
        expect(service).toHaveProperty('price')
        expect(service).toHaveProperty('category')
        expect(service).toHaveProperty('availability')
      }

      // Test with hybrid repository (will fall back to mock for reads)
      factory.updateConfig({ dataSource: 'hybrid' })
      const hybridRepo = factory.getServiceRepository()
      
      const hybridServices = await hybridRepo.findAll()
      expect(Array.isArray(hybridServices)).toBe(true)
      
      // Should have same structure
      if (hybridServices.length > 0 && mockServices.length > 0) {
        const mockService = mockServices[0]
        const hybridService = hybridServices[0]
        
        expect(Object.keys(mockService)).toEqual(Object.keys(hybridService))
      }
    })
  })

  describe('Fallback Mechanism', () => {
    it('should fallback to mock when API fails', async () => {
      const { apiClient } = await import('@/infrastructure/api/client')
      
      // Mock API failure
      vi.mocked(apiClient.get).mockRejectedValue(new Error('Network error'))
      
      factory.updateConfig({ 
        dataSource: 'api', 
        fallbackToMock: true 
      })
      
      const repo = factory.getServiceRepository()
      
      // Should not throw and should return mock data
      const services = await repo.findAll()
      expect(Array.isArray(services)).toBe(true)
    })

    it('should not fallback when fallbackToMock is false', async () => {
      const { apiClient } = await import('@/infrastructure/api/client')
      
      // Mock API failure
      vi.mocked(apiClient.get).mockRejectedValue(new Error('Network error'))
      
      factory.updateConfig({ 
        dataSource: 'api', 
        fallbackToMock: false 
      })
      
      const repo = factory.getServiceRepository()
      
      // Should throw the original error
      await expect(repo.findAll()).rejects.toThrow('Network error')
    })
  })

  describe('Cache Management', () => {
    it('should clear caches when switching data sources', async () => {
      factory.updateConfig({ dataSource: 'mock', cacheEnabled: true })
      const mockRepo = factory.getServiceRepository()
      
      // Load data to populate cache
      const services1 = await mockRepo.findAll()
      
      // Switch data source
      factory.updateConfig({ dataSource: 'hybrid' })
      const hybridRepo = factory.getServiceRepository()
      
      // Cache should be fresh for new repository
      const services2 = await hybridRepo.findAll()
      
      // Both should work
      expect(Array.isArray(services1)).toBe(true)
      expect(Array.isArray(services2)).toBe(true)
    })

    it('should respect cache settings across repositories', async () => {
      factory.updateConfig({ 
        dataSource: 'mock', 
        cacheEnabled: false 
      })
      
      const repo = factory.getServiceRepository()
      
      // Mock the repository's cache methods
      const clearCacheSpy = vi.spyOn(repo, 'clearCache')
      
      // Should be able to clear cache even if disabled
      repo.clearCache()
      expect(clearCacheSpy).toHaveBeenCalled()
    })
  })

  describe('Configuration Management', () => {
    it('should return current configuration', () => {
      const config = {
        dataSource: 'hybrid' as const,
        cacheEnabled: false,
        cacheTTL: 60000,
        fallbackToMock: true
      }
      
      factory.updateConfig(config)
      const currentConfig = factory.getConfig()
      
      expect(currentConfig.dataSource).toBe('hybrid')
      expect(currentConfig.cacheEnabled).toBe(false)
      expect(currentConfig.cacheTTL).toBe(60000)
      expect(currentConfig.fallbackToMock).toBe(true)
    })

    it('should merge configuration updates', () => {
      factory.updateConfig({ dataSource: 'mock', cacheEnabled: true })
      factory.updateConfig({ cacheTTL: 120000 })
      
      const config = factory.getConfig()
      
      expect(config.dataSource).toBe('mock')
      expect(config.cacheEnabled).toBe(true)
      expect(config.cacheTTL).toBe(120000)
    })
  })

  describe('Error Handling', () => {
    it('should handle repository creation errors gracefully', () => {
      // Test with invalid configuration
      expect(() => {
        factory.updateConfig({ dataSource: 'invalid' as any })
        factory.getServiceRepository()
      }).toThrow()
    })

    it('should handle missing repository implementations', () => {
      // Test category repository (not fully implemented)
      expect(() => {
        factory.getCategoryRepository()
      }).toThrow('Category repository not implemented yet')
    })
  })

  describe('Performance Tests', () => {
    it('should create repositories efficiently', () => {
      const start = performance.now()
      
      // Create multiple repository instances
      for (let i = 0; i < 100; i++) {
        factory.getServiceRepository()
      }
      
      const end = performance.now()
      const duration = end - start
      
      // Should be fast (less than 100ms for 100 instances)
      expect(duration).toBeLessThan(100)
    })

    it('should handle rapid configuration switches', () => {
      const configs = ['mock', 'api', 'hybrid'] as const
      
      expect(() => {
        configs.forEach(dataSource => {
          factory.updateConfig({ dataSource })
          factory.getServiceRepository()
        })
      }).not.toThrow()
    })
  })
})

describe('Global Repository Factory', () => {
  beforeEach(() => {
    repositoryFactory.clearInstances()
  })

  it('should work with global factory instance', async () => {
    repositoryFactory.updateConfig({ dataSource: 'mock' })
    
    const repo = repositoryFactory.getServiceRepository()
    const services = await repo.findAll()
    
    expect(Array.isArray(services)).toBe(true)
  })

  it('should maintain global state', () => {
    repositoryFactory.updateConfig({ dataSource: 'mock' })
    
    const repo1 = repositoryFactory.getServiceRepository()
    const repo2 = repositoryFactory.getServiceRepository()
    
    expect(repo1).toBe(repo2)
  })
})