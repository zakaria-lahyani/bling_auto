/**
 * Client Repository Integration Tests
 * 
 * Tests to verify the repository pattern refactoring works correctly
 */

import { repositoryFactory } from '../factory/repository.factory'
import { IClientRepository } from '../interfaces/client.repository'

describe('Client Repository Integration', () => {
  let clientRepository: IClientRepository

  beforeEach(() => {
    // Reset repository factory to use mock data
    repositoryFactory.updateConfig({ dataSource: 'mock' })
    clientRepository = repositoryFactory.getClientRepository()
  })

  describe('Basic Client Operations', () => {
    test('should find client by ID', async () => {
      const clientId = 'client-1'
      const client = await clientRepository.findById(clientId)
      
      expect(client).toBeTruthy()
      expect(client?.id).toBe(clientId)
      expect(client?.name).toBeDefined()
      expect(client?.email).toBeDefined()
    })

    test('should return null for non-existent client', async () => {
      const client = await clientRepository.findById('non-existent-id')
      expect(client).toBeNull()
    })

    test('should update client successfully', async () => {
      const clientId = 'client-1'
      const updates = { name: 'Updated Name' }
      
      const result = await clientRepository.update(clientId, updates)
      
      expect(result.success).toBe(true)
      expect(result.data.name).toBe('Updated Name')
    })

    test('should handle validation errors', async () => {
      const clientId = 'client-1'
      const updates = { email: 'invalid@email.com' }
      
      const result = await clientRepository.update(clientId, updates)
      
      expect(result.success).toBe(false)
      expect(result.errors).toContain('Invalid email address')
    })
  })

  describe('Vehicle Operations', () => {
    test('should get vehicles for client', async () => {
      const clientId = 'client-1'
      const result = await clientRepository.getVehicles(clientId)
      
      expect(result.success).toBe(true)
      expect(Array.isArray(result.data)).toBe(true)
    })

    test('should add vehicle successfully', async () => {
      const clientId = 'client-1'
      const vehicleData = {
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        color: 'Blue',
        licensePlate: 'ABC-123'
      }
      
      const result = await clientRepository.addVehicle(clientId, vehicleData)
      
      expect(result.success).toBe(true)
      expect(result.data.make).toBe('Toyota')
      expect(result.data.model).toBe('Camry')
    })

    test('should validate required fields', async () => {
      const clientId = 'client-1'
      const vehicleData = {
        color: 'Blue'
        // Missing make and model
      }
      
      const result = await clientRepository.addVehicle(clientId, vehicleData)
      
      expect(result.success).toBe(false)
      expect(result.errors).toContain('Make and model are required')
    })
  })

  describe('Dashboard Data', () => {
    test('should get complete dashboard data', async () => {
      const clientId = 'client-1'
      const result = await clientRepository.getDashboardData(clientId)
      
      expect(result.success).toBe(true)
      expect(result.data.client).toBeDefined()
      expect(result.data.vehicles).toBeDefined()
      expect(result.data.stats).toBeDefined()
      expect(result.data.recommendations).toBeDefined()
    })

    test('should calculate stats correctly', async () => {
      const clientId = 'client-1'
      const result = await clientRepository.getDashboardData(clientId)
      
      expect(result.success).toBe(true)
      expect(typeof result.data.stats.totalBookings).toBe('number')
      expect(typeof result.data.stats.totalSpent).toBe('number')
      expect(typeof result.data.stats.loyaltyPoints).toBe('number')
    })
  })

  describe('Repository Factory', () => {
    test('should return same instance on multiple calls', () => {
      const repo1 = repositoryFactory.getClientRepository()
      const repo2 = repositoryFactory.getClientRepository()
      
      expect(repo1).toBe(repo2)
    })

    test('should create new instance after clearing cache', () => {
      const repo1 = repositoryFactory.getClientRepository()
      repositoryFactory.clearInstances()
      const repo2 = repositoryFactory.getClientRepository()
      
      expect(repo1).not.toBe(repo2)
    })

    test('should support configuration changes', () => {
      repositoryFactory.updateConfig({ dataSource: 'api' })
      const config = repositoryFactory.getConfig()
      
      expect(config.dataSource).toBe('api')
    })
  })

  describe('Backward Compatibility', () => {
    test('should maintain ClientAPI compatibility', async () => {
      // Import the deprecated ClientAPI
      const { ClientAPI } = await import('../../api/client-api')
      
      // Test that it still works
      const clientId = 'client-1'
      const result = await ClientAPI.getClient(clientId)
      
      expect(result.success).toBe(true)
      expect(result.data.id).toBe(clientId)
    })

    test('should work with existing hook pattern', async () => {
      // Simulate how the hooks will work
      const clientId = 'client-1'
      const client = await clientRepository.findById(clientId)
      const vehiclesRes = await clientRepository.getVehicles(clientId)
      
      const profileData = {
        client,
        vehicles: vehiclesRes.data
      }
      
      expect(profileData.client).toBeTruthy()
      expect(profileData.vehicles).toBeDefined()
    })
  })
})

/**
 * Performance Tests
 */
describe('Client Repository Performance', () => {
  let clientRepository: IClientRepository

  beforeEach(() => {
    repositoryFactory.updateConfig({ dataSource: 'mock' })
    clientRepository = repositoryFactory.getClientRepository()
  })

  test('should handle concurrent requests efficiently', async () => {
    const clientId = 'client-1'
    const startTime = Date.now()
    
    // Simulate multiple concurrent requests
    const promises = Array.from({ length: 10 }, () => 
      clientRepository.findById(clientId)
    )
    
    const results = await Promise.all(promises)
    const endTime = Date.now()
    
    // All requests should succeed
    results.forEach(result => {
      expect(result?.id).toBe(clientId)
    })
    
    // Should complete reasonably quickly (accounting for mock delays)
    expect(endTime - startTime).toBeLessThan(2000)
  })

  test('should handle large dashboard data requests', async () => {
    const clientId = 'client-1'
    const startTime = Date.now()
    
    const result = await clientRepository.getDashboardData(clientId)
    const endTime = Date.now()
    
    expect(result.success).toBe(true)
    expect(endTime - startTime).toBeLessThan(1000) // Should be fast with mock data
  })
})