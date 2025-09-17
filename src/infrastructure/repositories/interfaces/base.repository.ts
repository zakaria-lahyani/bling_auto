/**
 * Base Repository Interface
 * Defines common operations for all repositories
 */

export interface PaginationParams {
  page?: number
  limit?: number
  offset?: number
}

export interface SortParams {
  field: string
  order: 'asc' | 'desc'
}

export interface FilterParams {
  [key: string]: any
}

export interface QueryParams {
  filters?: FilterParams
  pagination?: PaginationParams
  sort?: SortParams
  include?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

export interface BaseRepository<T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> {
  // Read operations
  findAll(params?: QueryParams): Promise<T[]>
  findById(id: string): Promise<T | null>
  findOne(filters: FilterParams): Promise<T | null>
  findMany(filters: FilterParams): Promise<T[]>
  
  // Paginated read
  findPaginated(params?: QueryParams): Promise<PaginatedResponse<T>>
  
  // Write operations
  create(data: CreateDTO): Promise<T>
  update(id: string, data: UpdateDTO): Promise<T>
  delete(id: string): Promise<boolean>
  
  // Bulk operations
  createMany?(data: CreateDTO[]): Promise<T[]>
  updateMany?(filters: FilterParams, data: UpdateDTO): Promise<number>
  deleteMany?(filters: FilterParams): Promise<number>
  
  // Utility operations
  count(filters?: FilterParams): Promise<number>
  exists(id: string): Promise<boolean>
  
  // Cache management
  clearCache?(): void
  refreshCache?(): Promise<void>
}

/**
 * Repository Error Classes
 */
export class RepositoryError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number,
    public details?: any
  ) {
    super(message)
    this.name = 'RepositoryError'
  }
}

export class NotFoundError extends RepositoryError {
  constructor(entity: string, id: string) {
    super(
      `${entity} with id ${id} not found`,
      'NOT_FOUND',
      404
    )
  }
}

export class ValidationError extends RepositoryError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details)
  }
}

export class NetworkError extends RepositoryError {
  constructor(message: string, details?: any) {
    super(message, 'NETWORK_ERROR', 0, details)
  }
}