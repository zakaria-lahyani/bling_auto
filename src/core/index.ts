// Core domain exports
// Booking types (excluding BookingStatus to avoid conflict with client-booking)
export type { Booking, VehicleInfo, Location } from './entities/booking/types'
export type { BookingStatus as BasicBookingStatus } from './entities/booking/types'

// Service types (excluding TimeSlot to avoid conflict with availability service)
export * from './entities/service/types'
export type { TimeSlot as ServiceTimeSlot } from './entities/service/types'

export * from './entities/user/types'
export * from './entities/client/types'
export * from './entities/client-booking/types'

// Use cases
export * from './use-cases/booking'
export * from './use-cases/client'

// Domain services (with explicit exports to avoid conflicts)
export { 
  AvailabilityService
} from './services/availability.service'
export type { 
  IAvailabilityService
} from './services/availability.service'
export type { 
  AvailabilityWindow
} from './services/availability.service'
export type { 
  AvailabilityConstraints
} from './services/availability.service'
export type { TimeSlot as AvailabilityTimeSlot } from './services/availability.service'
export * from './services/pricing.service'