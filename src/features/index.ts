/**
 * Feature Modules Barrel Export
 * 
 * Provides organized access to all feature modules.
 * Each feature exposes only its public interface.
 */

// Service management feature
export * from './services'

// Booking flow feature - explicit exports to avoid VehicleInfo conflict
// Note: booking components and hooks not yet implemented
export type { VehicleInfo as BookingVehicleInfo } from './booking'
export type { BookingRequest, BookingSlot, BookingLocation } from './booking'

// Client management feature - explicit exports to avoid LoyaltyTier conflict
export * from './client/hooks'
export type { LoyaltyTier as ClientLoyaltyTier } from './client'
export type { 
  Client,
  Vehicle, 
  ClientAddress,
  PaymentMethod,
  ClientPreferences,
  ClientStats,
  ServiceRecommendation,
  ActivityItem,
  MembershipStatus,
  PaymentMethodType
} from './client'

// Dashboard analytics feature
export * from './dashboard'

// Appointment scheduling feature - exclude VehicleInfo to avoid conflict
export type { 
  Appointment,
  AppointmentFilters,
  AppointmentViewModel,
  AppointmentListViewModel,
  AppointmentFormData
} from './appointments'
// Note: appointments components, hooks, and mappers not yet implemented

// Contact management feature
export * from './contact'

// Homepage content feature
export * from './home'

// Business features
export * from './jobs'
// Loyalty feature - exclude LoyaltyTier to avoid conflict with client
export type {
  LoyaltyProgram,
  LoyaltyAccount,
  PointsTransaction,
  Reward,
  RewardRedemption
} from './loyalty'
// Note: loyalty components and hooks not yet fully implemented
export * from './inventory'
export * from './operators'