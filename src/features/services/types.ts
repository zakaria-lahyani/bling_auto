// Re-export types from core entities
export type {
  Service,
  ServiceFilters,
} from '@/core/entities/service/types'

// Feature-specific view models
export interface ServiceViewModel {
  id: string
  name: string
  description: string
  priceDisplay: string
  duration: string
  availability: 'onsite' | 'instore' | 'both'
  categories: string[]
  image?: string
  isActive: boolean
  isPopular: boolean
  availabilityDisplay: string
  categoryDisplay: string
}

export interface ServiceListViewModel {
  services: ServiceViewModel[]
  totalCount: number
  hasMore: boolean
  isLoading: boolean
  error?: string
}

export interface ServiceCardProps {
  service: ServiceViewModel
  onSelect?: (serviceId: string) => void
  onBook?: (serviceId: string) => void
  showBookButton?: boolean
  isSelected?: boolean
}