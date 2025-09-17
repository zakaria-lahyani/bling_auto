/**
 * @deprecated Use types from @/core/entities/service instead
 * 
 * This file is kept for backward compatibility.
 * Migrate to the centralized service types when possible.
 */

// Import for internal usage
import type { Service } from '@/core/entities/service'

// Re-export from the single source of truth
export type {
  Service,
  ServiceCategory,
  ServiceFilters,
  ServiceSearchParams,
  ServiceSummary,
  ServiceBooking,
  ServiceAvailability
} from '@/core/entities/service'

// Legacy compatibility
export type ServiceType = {
  services: Service[]
}

// For gradual migration, you can still use the old interface names
import type { Service as CoreService } from '@/core/entities/service'
export type LegacyService = CoreService