/**
 * Repository Layer Main Export
 * 
 * This is the single entry point for all repository operations.
 * Components and services should only import from this file.
 * 
 * Usage:
 * ```ts
 * import { repositories } from '@/infrastructure/repositories'
 * 
 * const serviceRepo = repositories.service
 * const services = await serviceRepo.findAll()
 * ```
 */

// Export interfaces
export type { 
  BaseRepository,
  QueryParams,
  PaginatedResponse,
  FilterParams,
  PaginationParams,
  SortParams
} from './interfaces/base.repository'

export type { 
  IServiceRepository,
  ServiceFilters,
  ServiceCreateDTO,
  ServiceUpdateDTO 
} from './interfaces/service.repository'

export type { 
  ICategoryRepository,
  CategoryCreateDTO,
  CategoryUpdateDTO 
} from './interfaces/category.repository'

// Export error classes
export {
  RepositoryError,
  NotFoundError,
  ValidationError,
  NetworkError
} from './interfaces/base.repository'

// Export factory
export { repositoryFactory, RepositoryFactory } from './factory/repository.factory'

// Import the factory instance
import { repositoryFactory } from './factory/repository.factory'

// Create convenient repository instances
export const repositories = {
  get service() {
    return repositoryFactory.getServiceRepository()
  },
  
  get category() {
    return repositoryFactory.getCategoryRepository()
  }
}

// Utility functions for switching data sources
export const switchToMockData = () => {
  repositoryFactory.updateConfig({ dataSource: 'mock' })
}

export const switchToApiData = () => {
  repositoryFactory.updateConfig({ dataSource: 'api' })
}

export const switchToHybridData = () => {
  repositoryFactory.updateConfig({ dataSource: 'hybrid' })
}

export const enableFallback = () => {
  repositoryFactory.updateConfig({ fallbackToMock: true })
}

export const disableFallback = () => {
  repositoryFactory.updateConfig({ fallbackToMock: false })
}

// Get current data source
export const getCurrentDataSource = () => {
  return repositoryFactory.getConfig().dataSource
}

// Clear all repository caches
export const clearAllCaches = () => {
  repositories.service.clearCache?.()
  repositories.category.clearCache?.()
}

// Refresh all repository caches
export const refreshAllCaches = async () => {
  await repositories.service.refreshCache?.()
  await repositories.category.refreshCache?.()
}