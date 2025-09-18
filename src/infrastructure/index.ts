// Infrastructure exports

// Repository pattern - explicit exports to avoid DTO conflicts
export { 
  repositories,
  repositoryFactory,
  RepositoryFactory,
  switchToMockData,
  switchToApiData,
  switchToHybridData,
  enableFallback,
  disableFallback,
  getCurrentDataSource,
  clearAllCaches,
  refreshAllCaches,
  RepositoryError,
  NotFoundError,
  ValidationError,
  NetworkError
} from './repositories'

export type {
  BaseRepository,
  QueryParams,
  PaginatedResponse,
  FilterParams,
  PaginationParams,
  SortParams,
  IServiceRepository,
  ServiceFilters,
  ICategoryRepository
} from './repositories'

export type {
  ServiceCreateDTO as RepositoryServiceCreateDTO,
  ServiceUpdateDTO as RepositoryServiceUpdateDTO,
  CategoryCreateDTO,
  CategoryUpdateDTO
} from './repositories'

// Mock data and DTOs
export * from './data/mock'
export * from './dto'

// API clients and storage
export * from './api/client'
export * from './storage/stores'

// Authentication and configuration
export * from './auth/auth'
export * from './config'