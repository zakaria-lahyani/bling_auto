// Re-export types from core entities
export type {
  Service,
  ServiceFilters,
  ServiceSummary,
  ServiceSearchParams,
  ServiceSearchResponse,
  ServiceCategory,
  ServiceAvailability
} from '../../core/entities/service/types'

// Import for local use
import type { Service, ServiceFilters } from '../../core/entities/service/types'

// Feature-specific view models
export interface ServiceViewModel {
  id: string
  name: string
  description: string
  priceDisplay: string
  duration: string
  availability: 'onsite' | 'instore' | 'both'
  categories: string[]
  image: string
  isActive: boolean
  isPopular: boolean
  availabilityDisplay: string
  categoryDisplay: string
}

// Feature-specific hooks return types
export interface ServiceListState {
  services: Service[]
  totalCount: number
  hasMore: boolean
  isLoading: boolean
  error?: string
  filters: ServiceFilters
}

export interface ServiceSearchState {
  query: string
  results: Service[]
  isSearching: boolean
  searchError?: string
}