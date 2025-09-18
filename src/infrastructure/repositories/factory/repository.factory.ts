/**
 * Repository Factory
 * Creates repository instances based on configuration
 */

import { IServiceRepository } from '../interfaces/service.repository'
import { ICategoryRepository } from '../interfaces/category.repository'
import { IHomePageRepository } from '../interfaces/homepage.repository'
import { IServicesPageRepository } from '../interfaces/servicespage.repository'
import { IContactRepository } from '../interfaces/contact.repository'
import { IClientRepository } from '../interfaces/client.repository'

// Mock implementations
import { MockServiceRepository } from '../implementations/mock/service.mock.repository'
import { MockHomePageRepository } from '../implementations/mock/homepage.mock.repository'
import { MockServicesPageRepository } from '../implementations/mock/servicespage.mock.repository'
import { MockContactRepository } from '../implementations/mock/contact.mock.repository'
import { MockClientRepository } from '../implementations/mock/client.mock.repository'
// import { MockCategoryRepository } from '../implementations/mock/category.mock.repository'

// API implementations
import { ApiServiceRepository } from '../implementations/api/service.api.repository'
import { ApiClientRepository } from '../implementations/api/client.api.repository'
// import { ApiCategoryRepository } from '../implementations/api/category.api.repository'
// import { ApiHomePageRepository } from '../implementations/api/homepage.api.repository'
// import { ApiServicesPageRepository } from '../implementations/api/servicespage.api.repository'

export type DataSource = 'mock' | 'api' | 'hybrid'

interface RepositoryConfig {
  dataSource: DataSource
  cacheEnabled?: boolean
  cacheTTL?: number
  fallbackToMock?: boolean
}

class RepositoryFactory {
  private config: RepositoryConfig
  private instances = new Map<string, any>()

  constructor(config?: Partial<RepositoryConfig>) {
    this.config = {
      dataSource: (process.env.NEXT_PUBLIC_DATA_SOURCE as DataSource) || 'mock',
      cacheEnabled: process.env.NEXT_PUBLIC_USE_CACHE === 'true',
      cacheTTL: parseInt(process.env.NEXT_PUBLIC_CACHE_TTL || '300000'), // 5 minutes
      fallbackToMock: process.env.NEXT_PUBLIC_FALLBACK_TO_MOCK === 'true',
      ...config
    }
  }

  getServiceRepository(): IServiceRepository {
    const key = 'service'
    
    if (this.instances.has(key)) {
      return this.instances.get(key)
    }

    const repository = this.createServiceRepository()
    this.instances.set(key, repository)
    return repository
  }

  getCategoryRepository(): ICategoryRepository {
    const key = 'category'
    
    if (this.instances.has(key)) {
      return this.instances.get(key)
    }

    const repository = this.createCategoryRepository()
    this.instances.set(key, repository)
    return repository
  }

  getHomePageRepository(): IHomePageRepository {
    const key = 'homePage'
    
    if (this.instances.has(key)) {
      return this.instances.get(key)
    }

    const repository = this.createHomePageRepository()
    this.instances.set(key, repository)
    return repository
  }

  getServicesPageRepository(): IServicesPageRepository {
    const key = 'servicesPage'
    
    if (this.instances.has(key)) {
      return this.instances.get(key)
    }

    const repository = this.createServicesPageRepository()
    this.instances.set(key, repository)
    return repository
  }

  getContactRepository(): IContactRepository {
    const key = 'contact'
    
    if (this.instances.has(key)) {
      return this.instances.get(key)
    }

    const repository = this.createContactRepository()
    this.instances.set(key, repository)
    return repository
  }

  getClientRepository(): IClientRepository {
    const key = 'client'
    
    if (this.instances.has(key)) {
      return this.instances.get(key)
    }

    const repository = this.createClientRepository()
    this.instances.set(key, repository)
    return repository
  }

  private createServiceRepository(): IServiceRepository {
    const options = {
      cacheEnabled: this.config.cacheEnabled,
      cacheTTL: this.config.cacheTTL
    }

    switch (this.config.dataSource) {
      case 'api':
        return this.config.fallbackToMock 
          ? new FallbackServiceRepository(options)
          : new ApiServiceRepository(options)
      
      case 'hybrid':
        return new HybridServiceRepository(options)
      
      case 'mock':
      default:
        return new MockServiceRepository(options)
    }
  }

  private createCategoryRepository(): ICategoryRepository {
    // TODO: Implement category repositories
    throw new Error('Category repository not implemented yet')
  }

  private createHomePageRepository(): IHomePageRepository {
    switch (this.config.dataSource) {
      case 'api':
        // TODO: Implement API repository when backend is ready
        // return new ApiHomePageRepository()
        return new MockHomePageRepository()
      
      case 'hybrid':
      case 'mock':
      default:
        return new MockHomePageRepository()
    }
  }

  private createServicesPageRepository(): IServicesPageRepository {
    switch (this.config.dataSource) {
      case 'api':
        // TODO: Implement API repository when backend is ready
        // return new ApiServicesPageRepository()
        return new MockServicesPageRepository()
      
      case 'hybrid':
      case 'mock':
      default:
        return new MockServicesPageRepository()
    }
  }

  private createContactRepository(): IContactRepository {
    switch (this.config.dataSource) {
      case 'api':
        // TODO: Implement API repository when backend is ready
        // return new ApiContactRepository()
        return new MockContactRepository()
      
      case 'hybrid':
      case 'mock':
      default:
        return new MockContactRepository()
    }
  }

  private createClientRepository(): IClientRepository {
    switch (this.config.dataSource) {
      case 'api':
        return this.config.fallbackToMock 
          ? new FallbackClientRepository()
          : new ApiClientRepository()
      
      case 'hybrid':
        return new HybridClientRepository()
      
      case 'mock':
      default:
        return new MockClientRepository()
    }
  }

  // Update configuration at runtime (useful for testing)
  updateConfig(config: Partial<RepositoryConfig>): void {
    this.config = { ...this.config, ...config }
    this.clearInstances()
  }

  // Clear all instances (forces recreation on next access)
  clearInstances(): void {
    this.instances.clear()
  }

  // Get current configuration
  getConfig(): RepositoryConfig {
    return { ...this.config }
  }
}

/**
 * Fallback Service Repository
 * Uses API but falls back to mock data on failure
 */
class FallbackServiceRepository extends ApiServiceRepository {
  private mockRepository: MockServiceRepository

  constructor(options: { cacheEnabled?: boolean; cacheTTL?: number }) {
    super(options)
    this.mockRepository = new MockServiceRepository(options)
  }

  protected override handleError(error: any, context?: string): never {
    console.warn(`API error in ${context}, falling back to mock data:`, error)
    throw error
  }

  // Override methods to add fallback logic
  override async findAll(params?: any): Promise<any> {
    try {
      return await super.findAll(params)
    } catch (error) {
      console.warn('API findAll failed, using mock data')
      return this.mockRepository.findAll(params)
    }
  }

  override async findById(id: string): Promise<any> {
    try {
      return await super.findById(id)
    } catch (error) {
      console.warn(`API findById(${id}) failed, using mock data`)
      return this.mockRepository.findById(id)
    }
  }

  override async findByCategory(categorySlug: string): Promise<any> {
    try {
      return await super.findByCategory(categorySlug)
    } catch (error) {
      console.warn(`API findByCategory(${categorySlug}) failed, using mock data`)
      return this.mockRepository.findByCategory(categorySlug)
    }
  }

  override async findFeatured(): Promise<any> {
    try {
      return await super.findFeatured()
    } catch (error) {
      console.warn('API findFeatured failed, using mock data')
      return this.mockRepository.findFeatured()
    }
  }

  override async findPopular(): Promise<any> {
    try {
      return await super.findPopular()
    } catch (error) {
      console.warn('API findPopular failed, using mock data')
      return this.mockRepository.findPopular()
    }
  }

  override async search(query: string): Promise<any> {
    try {
      return await super.search(query)
    } catch (error) {
      console.warn(`API search("${query}") failed, using mock data`)
      return this.mockRepository.search(query)
    }
  }
}

/**
 * Hybrid Service Repository
 * Uses different strategies for different operations
 */
class HybridServiceRepository extends MockServiceRepository {
  private apiRepository: ApiServiceRepository

  constructor(options: { cacheEnabled?: boolean; cacheTTL?: number }) {
    super(options)
    this.apiRepository = new ApiServiceRepository(options)
  }

  // Use API for write operations
  override async create(data: any): Promise<any> {
    try {
      return await this.apiRepository.create(data)
    } catch (error) {
      console.warn('API create failed, using mock repository')
      return super.create(data)
    }
  }

  override async update(id: string, data: any): Promise<any> {
    try {
      return await this.apiRepository.update(id, data)
    } catch (error) {
      console.warn(`API update(${id}) failed, using mock repository`)
      return super.update(id, data)
    }
  }

  override async delete(id: string): Promise<boolean> {
    try {
      return await this.apiRepository.delete(id)
    } catch (error) {
      console.warn(`API delete(${id}) failed, using mock repository`)
      return super.delete(id)
    }
  }

  // Use mock for read operations (faster during development)
  // This keeps the UI responsive while backend is being developed
}

/**
 * Fallback Client Repository
 * Uses API but falls back to mock data on failure
 */
class FallbackClientRepository extends ApiClientRepository {
  private mockRepository: MockClientRepository

  constructor() {
    super()
    this.mockRepository = new MockClientRepository()
  }

  // Override critical methods with fallback logic
  override async findById(id: string) {
    try {
      return await super.findById(id)
    } catch (error) {
      console.warn(`API findById(${id}) failed, using mock data`)
      return this.mockRepository.findById(id)
    }
  }

  override async getDashboardData(clientId: string) {
    try {
      return await super.getDashboardData(clientId)
    } catch (error) {
      console.warn(`API getDashboardData(${clientId}) failed, using mock data`)
      return this.mockRepository.getDashboardData(clientId)
    }
  }

  override async getVehicles(clientId: string) {
    try {
      return await super.getVehicles(clientId)
    } catch (error) {
      console.warn(`API getVehicles(${clientId}) failed, using mock data`)
      return this.mockRepository.getVehicles(clientId)
    }
  }

  override async getBookings(clientId: string, filters?: any) {
    try {
      return await super.getBookings(clientId, filters)
    } catch (error) {
      console.warn(`API getBookings(${clientId}) failed, using mock data`)
      return this.mockRepository.getBookings(clientId, filters)
    }
  }
}

/**
 * Hybrid Client Repository
 * Uses different strategies for different operations
 */
class HybridClientRepository extends MockClientRepository {
  private apiRepository: ApiClientRepository

  constructor() {
    super()
    this.apiRepository = new ApiClientRepository()
  }

  // Use API for write operations
  override async update(id: string, data: any) {
    try {
      return await this.apiRepository.update(id, data)
    } catch (error) {
      console.warn(`API update(${id}) failed, using mock repository`)
      return super.update(id, data)
    }
  }

  override async addVehicle(clientId: string, vehicleData: any) {
    try {
      return await this.apiRepository.addVehicle(clientId, vehicleData)
    } catch (error) {
      console.warn(`API addVehicle(${clientId}) failed, using mock repository`)
      return super.addVehicle(clientId, vehicleData)
    }
  }

  override async createBooking(clientId: string, bookingData: any) {
    try {
      return await this.apiRepository.createBooking(clientId, bookingData)
    } catch (error) {
      console.warn(`API createBooking(${clientId}) failed, using mock repository`)
      return super.createBooking(clientId, bookingData)
    }
  }

  // Use mock for read operations (faster during development)
}

// Export singleton instance
export const repositoryFactory = new RepositoryFactory()

// Export factory class for testing
export { RepositoryFactory }