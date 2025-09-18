/**
 * Client DTOs and Mappers
 * 
 * Data Transfer Objects for client-related operations.
 * Handles validation, transformation, and data mapping between API and domain layers.
 */

import { z } from 'zod'
import type { 
  Client, 
  ClientPreferences,
  Vehicle,
  ClientAddress,
  PaymentMethod,
  PaymentMethodType,
  ClientDashboard,
  ClientStats,
  ServiceRecommendation
} from '@/core/entities/client/types'
import { MembershipStatus } from '@/core/entities/client/types'

// Local common schemas to avoid circular import
const CommonSchemas = {
  id: z.string().min(1),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/),
  url: z.string().url(),
  date: z.string().datetime(),
  price: z.number().positive(),
  rating: z.number().min(0).max(5),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180)
  })
}

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const MembershipStatusSchema = z.enum(['basic', 'premium', 'elite'])
const PaymentMethodTypeSchema = z.enum(['card', 'wallet', 'bank_account', 'loyalty_points'])

const NotificationPreferencesSchema = z.object({
  email: z.boolean(),
  sms: z.boolean(),
  push: z.boolean()
})

const ServicePreferencesSchema = z.object({
  ecoFriendly: z.boolean(),
  premiumProducts: z.boolean(),
  expressService: z.boolean(),
  preferredTimeSlots: z.array(z.string()).optional()
})

const CommunicationPreferencesSchema = z.object({
  marketingEmails: z.boolean(),
  serviceTips: z.boolean(),
  promotions: z.boolean()
})

const DisplayPreferencesSchema = z.object({
  darkMode: z.boolean(),
  language: z.string().min(2).max(5),
  currency: z.string().length(3)
})

const ClientPreferencesSchema = z.object({
  notifications: NotificationPreferencesSchema,
  services: ServicePreferencesSchema,
  communication: CommunicationPreferencesSchema,
  display: DisplayPreferencesSchema
})

const VehicleSchema = z.object({
  id: CommonSchemas.id,
  clientId: CommonSchemas.id,
  make: z.string().min(1).max(50),
  model: z.string().min(1).max(50),
  year: z.string().length(4),
  color: z.string().min(1).max(30),
  plateNumber: z.string().min(1).max(20),
  vin: z.string().optional(),
  isPrimary: z.boolean(),
  notes: z.string().max(500).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

const ClientAddressSchema = z.object({
  id: CommonSchemas.id,
  clientId: CommonSchemas.id,
  label: z.string().min(1).max(50),
  street: z.string().min(1).max(200),
  city: z.string().min(1).max(100),
  state: z.string().min(2).max(50),
  zipCode: z.string().min(3).max(20),
  country: z.string().min(2).max(100),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  }).optional(),
  isDefault: z.boolean(),
  instructions: z.string().max(500).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

const PaymentMethodSchema = z.object({
  id: CommonSchemas.id,
  clientId: CommonSchemas.id,
  type: PaymentMethodTypeSchema,
  provider: z.string().optional(),
  last4: z.string().length(4).optional(),
  expiryMonth: z.number().min(1).max(12).optional(),
  expiryYear: z.number().min(2024).max(2050).optional(),
  holderName: z.string().min(1).max(100),
  isPrimary: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

// ============================================================================
// CLIENT DTO SCHEMAS
// ============================================================================

export const ClientResponseSchema = z.object({
  id: CommonSchemas.id,
  name: z.string().min(1).max(100),
  email: CommonSchemas.email,
  phone: CommonSchemas.phone,
  avatar: CommonSchemas.url.optional(),
  membershipStatus: MembershipStatusSchema,
  memberSince: z.string().datetime(),
  loyaltyPoints: z.number().min(0),
  walletBalance: z.number().min(0),
  preferredPaymentMethodId: CommonSchemas.id.optional(),
  defaultAddressId: CommonSchemas.id.optional(),
  preferences: ClientPreferencesSchema,
  vehicles: z.array(VehicleSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export const ClientCreateSchema = z.object({
  name: z.string().min(1).max(100),
  email: CommonSchemas.email,
  phone: CommonSchemas.phone,
  avatar: CommonSchemas.url.optional(),
  preferences: ClientPreferencesSchema.optional(),
  password: z.string().min(8).max(128),
  confirmPassword: z.string().min(8).max(128)
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export const ClientUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  phone: CommonSchemas.phone.optional(),
  avatar: CommonSchemas.url.optional(),
  preferences: ClientPreferencesSchema.partial().optional(),
  preferredPaymentMethodId: CommonSchemas.id.optional(),
  defaultAddressId: CommonSchemas.id.optional()
})

export const ClientProfileSchema = z.object({
  id: CommonSchemas.id,
  name: z.string(),
  avatar: CommonSchemas.url.optional(),
  membershipStatus: MembershipStatusSchema,
  memberSince: z.string().datetime(),
  loyaltyPoints: z.number(),
  totalBookings: z.number(),
  averageRating: z.number().min(0).max(5)
})

export const ClientStatsSchema = z.object({
  totalBookings: z.number().min(0),
  bookingsThisMonth: z.number().min(0),
  totalSpent: z.number().min(0),
  spentThisMonth: z.number().min(0),
  averageRating: z.number().min(0).max(5),
  loyaltyPoints: z.number().min(0),
  walletBalance: z.number().min(0),
  activePromoCodes: z.number().min(0)
})

export const ServiceRecommendationSchema = z.object({
  serviceId: CommonSchemas.id,
  reason: z.string().min(1).max(200),
  priority: z.number().min(1).max(10),
  discount: z.number().min(0).max(100).optional()
})

export const ClientDashboardSchema = z.object({
  client: ClientResponseSchema,
  vehicles: z.array(VehicleSchema),
  upcomingBookings: z.array(z.any()), // Will be properly typed when booking DTO is available
  addresses: z.array(ClientAddressSchema),
  stats: ClientStatsSchema,
  recommendations: z.array(ServiceRecommendationSchema)
})

export const VehicleCreateSchema = z.object({
  make: z.string().min(1).max(50),
  model: z.string().min(1).max(50),
  year: z.string().length(4),
  color: z.string().min(1).max(30),
  plateNumber: z.string().min(1).max(20),
  vin: z.string().optional(),
  isPrimary: z.boolean().optional(),
  notes: z.string().max(500).optional()
})

export const VehicleUpdateSchema = z.object({
  make: z.string().min(1).max(50).optional(),
  model: z.string().min(1).max(50).optional(),
  year: z.string().length(4).optional(),
  color: z.string().min(1).max(30).optional(),
  plateNumber: z.string().min(1).max(20).optional(),
  vin: z.string().optional(),
  isPrimary: z.boolean().optional(),
  notes: z.string().max(500).optional()
})

export const AddressCreateSchema = z.object({
  label: z.string().min(1).max(50),
  street: z.string().min(1).max(200),
  city: z.string().min(1).max(100),
  state: z.string().min(2).max(50),
  zipCode: z.string().min(3).max(20),
  country: z.string().min(2).max(100),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  }).optional(),
  isDefault: z.boolean().optional(),
  instructions: z.string().max(500).optional()
})

export const AddressUpdateSchema = AddressCreateSchema.partial()

export const PaymentMethodCreateSchema = z.object({
  type: PaymentMethodTypeSchema,
  provider: z.string().optional(),
  last4: z.string().length(4).optional(),
  expiryMonth: z.number().min(1).max(12).optional(),
  expiryYear: z.number().min(2024).max(2050).optional(),
  holderName: z.string().min(1).max(100),
  isPrimary: z.boolean().optional()
})

export const PaymentMethodUpdateSchema = PaymentMethodCreateSchema.partial()

// ============================================================================
// DTO TYPE DEFINITIONS
// ============================================================================

export type ClientResponseDTO = z.infer<typeof ClientResponseSchema>
export type ClientCreateDTO = z.infer<typeof ClientCreateSchema>
export type ClientUpdateDTO = z.infer<typeof ClientUpdateSchema>
export type ClientProfileDTO = z.infer<typeof ClientProfileSchema>
export type ClientDashboardDTO = z.infer<typeof ClientDashboardSchema>
export type ClientStatsDTO = z.infer<typeof ClientStatsSchema>

export type VehicleDTO = z.infer<typeof VehicleSchema>
export type VehicleCreateDTO = z.infer<typeof VehicleCreateSchema>
export type VehicleUpdateDTO = z.infer<typeof VehicleUpdateSchema>

export type ClientAddressDTO = z.infer<typeof ClientAddressSchema>
export type AddressCreateDTO = z.infer<typeof AddressCreateSchema>
export type AddressUpdateDTO = z.infer<typeof AddressUpdateSchema>

export type PaymentMethodDTO = z.infer<typeof PaymentMethodSchema>
export type PaymentMethodCreateDTO = z.infer<typeof PaymentMethodCreateSchema>
export type PaymentMethodUpdateDTO = z.infer<typeof PaymentMethodUpdateSchema>

export type ServiceRecommendationDTO = z.infer<typeof ServiceRecommendationSchema>

// ============================================================================
// CLIENT MAPPER CLASS
// ============================================================================

export class ClientMapper {
  /**
   * Convert Client entity to ClientResponseDTO
   */
  static toResponseDTO(client: Client): ClientResponseDTO {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      avatar: client.avatar,
      membershipStatus: client.membershipStatus,
      memberSince: client.memberSince.toISOString(),
      loyaltyPoints: client.loyaltyPoints,
      walletBalance: client.walletBalance,
      preferredPaymentMethodId: client.preferredPaymentMethodId,
      defaultAddressId: client.defaultAddressId,
      preferences: client.preferences,
      vehicles: client.vehicles.map(vehicle => ({
        ...vehicle,
        createdAt: vehicle.createdAt.toISOString(),
        updatedAt: vehicle.updatedAt.toISOString()
      })),
      createdAt: client.createdAt.toISOString(),
      updatedAt: client.updatedAt.toISOString()
    }
  }

  /**
   * Convert ClientResponseDTO to Client entity
   */
  static fromResponseDTO(dto: ClientResponseDTO): Client {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      avatar: dto.avatar,
      membershipStatus: dto.membershipStatus as MembershipStatus,
      memberSince: new Date(dto.memberSince),
      loyaltyPoints: dto.loyaltyPoints,
      walletBalance: dto.walletBalance,
      preferredPaymentMethodId: dto.preferredPaymentMethodId,
      defaultAddressId: dto.defaultAddressId,
      preferences: dto.preferences,
      vehicles: dto.vehicles.map(vehicle => ({
        ...vehicle,
        createdAt: new Date(vehicle.createdAt),
        updatedAt: new Date(vehicle.updatedAt)
      })),
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt)
    }
  }

  /**
   * Convert Client entity to public profile DTO (filtered data)
   */
  static toProfileDTO(client: Client): ClientProfileDTO {
    return {
      id: client.id,
      name: client.name,
      avatar: client.avatar,
      membershipStatus: client.membershipStatus,
      memberSince: client.memberSince.toISOString(),
      loyaltyPoints: client.loyaltyPoints,
      totalBookings: client.vehicles.length, // Placeholder - should come from booking count
      averageRating: 4.8 // Placeholder - should come from review aggregation
    }
  }

  /**
   * Convert ClientCreateDTO to partial Client entity (for creation)
   */
  static fromCreateDTO(dto: ClientCreateDTO): Omit<Client, 'id' | 'memberSince' | 'loyaltyPoints' | 'walletBalance' | 'vehicles' | 'createdAt' | 'updatedAt'> {
    return {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      avatar: dto.avatar,
      membershipStatus: MembershipStatus.BASIC,
      preferences: dto.preferences || {
        notifications: { email: true, sms: false, push: true },
        services: { ecoFriendly: false, premiumProducts: false, expressService: false },
        communication: { marketingEmails: true, serviceTips: true, promotions: true },
        display: { darkMode: false, language: 'en', currency: 'USD' }
      }
    }
  }

  /**
   * Merge ClientUpdateDTO with existing Client entity
   */
  static applyUpdateDTO(client: Client, dto: ClientUpdateDTO): Client {
    return {
      ...client,
      name: dto.name ?? client.name,
      phone: dto.phone ?? client.phone,
      avatar: dto.avatar ?? client.avatar,
      preferredPaymentMethodId: dto.preferredPaymentMethodId ?? client.preferredPaymentMethodId,
      defaultAddressId: dto.defaultAddressId ?? client.defaultAddressId,
      preferences: dto.preferences ? {
        ...client.preferences,
        ...dto.preferences
      } : client.preferences,
      updatedAt: new Date()
    }
  }

  /**
   * Convert Vehicle entity to DTO
   */
  static vehicleToDTO(vehicle: Vehicle): VehicleDTO {
    return {
      ...vehicle,
      createdAt: vehicle.createdAt.toISOString(),
      updatedAt: vehicle.updatedAt.toISOString()
    }
  }

  /**
   * Convert VehicleDTO to entity
   */
  static vehicleFromDTO(dto: VehicleDTO): Vehicle {
    return {
      ...dto,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt)
    }
  }

  /**
   * Convert ClientAddress entity to DTO
   */
  static addressToDTO(address: ClientAddress): ClientAddressDTO {
    return {
      ...address,
      createdAt: address.createdAt.toISOString(),
      updatedAt: address.updatedAt.toISOString()
    }
  }

  /**
   * Convert ClientAddressDTO to entity
   */
  static addressFromDTO(dto: ClientAddressDTO): ClientAddress {
    return {
      ...dto,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt)
    }
  }

  /**
   * Convert PaymentMethod entity to DTO
   */
  static paymentMethodToDTO(method: PaymentMethod): PaymentMethodDTO {
    return {
      ...method,
      type: method.type as PaymentMethodType,
      createdAt: method.createdAt.toISOString(),
      updatedAt: method.updatedAt.toISOString()
    }
  }

  /**
   * Convert PaymentMethodDTO to entity
   */
  static paymentMethodFromDTO(dto: PaymentMethodDTO): PaymentMethod {
    return {
      ...dto,
      type: dto.type as PaymentMethodType,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt)
    }
  }

  /**
   * Create dashboard DTO from multiple data sources
   */
  static toDashboardDTO(data: {
    client: Client
    vehicles: Vehicle[]
    upcomingBookings: any[]
    addresses: ClientAddress[]
    stats: ClientStats
    recommendations: ServiceRecommendation[]
  }): ClientDashboardDTO {
    return {
      client: this.toResponseDTO(data.client),
      vehicles: data.vehicles.map(v => this.vehicleToDTO(v)),
      upcomingBookings: data.upcomingBookings,
      addresses: data.addresses.map(a => this.addressToDTO(a)),
      stats: data.stats,
      recommendations: data.recommendations
    }
  }

  /**
   * Validate and sanitize client data for API responses
   */
  static validateAndSanitize<T>(schema: z.ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data)
    if (!result.success) {
      throw new Error(`Validation failed: ${result.error.message}`)
    }
    return result.data
  }

  /**
   * Remove sensitive data from client response
   */
  static sanitizeForPublicAPI(client: ClientResponseDTO): Partial<ClientResponseDTO> {
    const { 
      email, 
      phone, 
      walletBalance, 
      preferredPaymentMethodId, 
      defaultAddressId,
      preferences,
      ...publicData 
    } = client
    
    return publicData
  }
}