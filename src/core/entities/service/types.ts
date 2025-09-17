/**
 * Service Domain Types
 * 
 * Single source of truth for all Service-related type definitions.
 * This is the core entity definition that should be used throughout the application.
 */

// ============================================================================
// CORE SERVICE TYPES
// ============================================================================

/**
 * Base Service interface - contains all essential service properties
 */
export interface ServiceBase {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  duration: string // e.g., "30 min", "2 hours"
  estimatedTime: {
    min: number // in minutes
    max: number // in minutes
  }
  isActive: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Service category information
 */
export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
  serviceCount?: number
  popular?: boolean
  image?: string
  seo?: SeoData
}

/**
 * Service availability information
 */
export interface ServiceAvailability {
  mobile: boolean
  inShop: boolean
  onsite?: boolean // legacy support
  both?: boolean   // legacy support
}

/**
 * Service media assets
 */
export interface ServiceMedia {
  image: string
  imageUrl?: string // legacy support
  gallery?: string[]
  thumbnail?: string
  video?: string
}

/**
 * Service add-on/extra option
 */
export interface ServiceAddOn {
  id: string
  name: string
  price: number
  description: string
  duration?: string
  popular?: boolean
}

/**
 * Service rating and review information
 */
export interface ServiceRating {
  rating: number
  reviewCount: number
  reviews?: ServiceReview[]
}

/**
 * Service review
 */
export interface ServiceReview {
  id: string
  userId: string
  userName?: string
  rating: number
  comment: string
  date: string
  verified?: boolean
}

/**
 * SEO metadata for services
 */
export interface SeoData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonicalUrl?: string
  jsonLd?: Record<string, any>
}

/**
 * Service marketing flags
 */
export interface ServiceMarketing {
  popular: boolean
  featured: boolean
  new?: boolean
  trending?: boolean
  seasonal?: boolean
  recommended?: boolean
}

// ============================================================================
// COMPOSITE SERVICE TYPES
// ============================================================================

/**
 * Complete Service type - combines all aspects of a service
 * This is the main type that should be used in most cases
 */
export interface Service extends ServiceBase, ServiceMedia, ServiceMarketing, ServiceRating {
  category: ServiceCategory | { id: string; name: string; slug: string } // flexible category type
  availability: ServiceAvailability
  features: string[]
  benefits?: string[]
  tags: string[]
  addOns?: ServiceAddOn[]
  seo?: SeoData
  // Convenience properties for easier access
  mobile?: boolean  // derived from availability.mobile
  
  // Legacy support fields (will be deprecated)
  categories?: string[]
  isPopular?: boolean // use marketing.popular
}

/**
 * Simplified service for list displays
 */
export interface ServiceSummary extends Pick<
  Service,
  'id' | 'name' | 'slug' | 'shortDescription' | 'price' | 'duration' | 'image'
> {
  category: { name: string; slug: string }
  availability: ServiceAvailability
  popular: boolean
  featured: boolean
  rating?: number
}

/**
 * Service for booking/cart context
 */
export interface ServiceBooking extends Pick<
  Service,
  'id' | 'name' | 'price' | 'duration' | 'estimatedTime'
> {
  selectedAddOns?: ServiceAddOn[]
  quantity?: number
  totalPrice: number
  scheduledDate?: string
  scheduledTime?: string
  location?: 'mobile' | 'inShop'
}

// ============================================================================
// SERVICE PACKAGE TYPES
// ============================================================================

/**
 * Service package/bundle
 */
export interface ServicePackage {
  id: string
  name: string
  slug: string
  description: string
  services: Service[] | string[] // Can be full services or just IDs
  totalPrice: number
  originalPrice?: number
  discountPercentage: number
  savings?: number
  isPopular?: boolean
  validUntil?: string
}

// ============================================================================
// SERVICE FILTERING AND SEARCH
// ============================================================================

/**
 * Service filter options
 */
export interface ServiceFilters {
  category?: string | string[]
  availability?: ('mobile' | 'inShop' | 'onsite' | 'both')[]
  priceMin?: number
  priceMax?: number
  duration?: string[]
  rating?: number
  featured?: boolean
  popular?: boolean
  new?: boolean
  tags?: string[]
  isActive?: boolean
  query?: string
}

/**
 * Service search parameters
 */
export interface ServiceSearchParams extends ServiceFilters {
  sortBy?: 'price' | 'rating' | 'duration' | 'popular' | 'featured' | 'name'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

/**
 * Service search response
 */
export interface ServiceSearchResponse {
  services: Service[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  filters: {
    categories: ServiceCategory[]
    priceRange: { min: number; max: number }
    availableLocations: string[]
    tags: string[]
  }
}

// ============================================================================
// SERVICE AVAILABILITY AND SCHEDULING
// ============================================================================

/**
 * Time slot for service scheduling
 */
export interface TimeSlot {
  startTime: string
  endTime: string
  isAvailable: boolean
  capacity?: number
  bookedCount?: number
}

/**
 * Service availability for scheduling
 */
export interface ServiceScheduleAvailability {
  serviceId: string
  date: string
  availableSlots: TimeSlot[]
  unavailableDates?: string[]
  minAdvanceBooking?: number // hours
  maxAdvanceBooking?: number // days
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if an object is a Service
 */
export function isService(obj: any): obj is Service {
  return (
    obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'name' in obj &&
    'price' in obj &&
    'category' in obj
  )
}

/**
 * Type guard to check if an object is a ServicePackage
 */
export function isServicePackage(obj: any): obj is ServicePackage {
  return (
    obj &&
    typeof obj === 'object' &&
    'services' in obj &&
    'totalPrice' in obj &&
    'discountPercentage' in obj
  )
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Service creation input (without generated fields)
 */
export type ServiceCreateInput = Omit<Service, 'id' | 'slug' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount'>

/**
 * Service update input (partial update)
 */
export type ServiceUpdateInput = Partial<ServiceCreateInput>

/**
 * Service category types (for backward compatibility)
 */
export type ServiceCategoryType = 
  | 'all'
  | 'wash'
  | 'detailing'
  | 'protection'
  | 'restoration'
  | 'specialty'
  | 'mobile'
  | 'basic'
  | 'premium'
  | 'maintenance'

// ============================================================================
// EXPORT LEGACY TYPE ALIASES (for backward compatibility)
// ============================================================================

// These will be gradually deprecated
export type ServiceType = Service
export type ServiceListItem = ServiceSummary
export type BookingService = ServiceBooking