/**
 * Service Entity Module
 * 
 * Re-exports all service-related types from the single source of truth.
 * Import from this module throughout the application.
 */

export * from './types'

// Convenient grouped exports
export type {
  // Core types
  Service,
  ServiceBase,
  ServiceCategory,
  ServiceAvailability,
  ServiceMedia,
  ServiceAddOn,
  ServiceRating,
  ServiceReview,
  ServiceMarketing,
  
  // Composite types
  ServiceSummary,
  ServiceBooking,
  ServicePackage,
  
  // Search and filter types
  ServiceFilters,
  ServiceSearchParams,
  ServiceSearchResponse,
  
  // Scheduling types
  TimeSlot,
  ServiceScheduleAvailability,
  
  // Utility types
  ServiceCreateInput,
  ServiceUpdateInput,
  ServiceCategoryType,
  
  // SEO types
  SeoData,
  
  // Legacy aliases
  ServiceType,
  ServiceListItem,
  BookingService
} from './types'

// Export type guards
export {
  isService,
  isServicePackage
} from './types'