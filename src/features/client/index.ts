/**
 * Client Feature Module
 * 
 * Main export file for client feature module.
 * Provides clean architecture components for client functionality.
 */

// Hooks (Application Layer)
export * from './hooks'

// Types (re-export from domain)
export type {
  Client,
  Vehicle,
  ClientAddress,
  PaymentMethod,
  ClientPreferences,
  ClientStats,
  ServiceRecommendation,
  ActivityItem
} from '../../core/entities/client/types'

// Enums (need value exports, not type exports)
export {
  MembershipStatus,
  LoyaltyTier,
  PaymentMethodType
} from '../../core/entities/client/types'

// Use Cases (re-export from core)
export * from '../../core/use-cases/client'

// Services (re-export from core)
export { ClientService } from '../../core/services/client.service'