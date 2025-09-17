/**
 * Booking Data Transfer Objects
 * Standardized DTOs for booking API communication
 */

import { z } from 'zod'
import type { Booking, Location, VehicleInfo, BookingStatus } from '@/core/entities/booking/types'

// Validation schemas
export const LocationSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional()
})

export const BookingStatusSchema = z.enum([
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
  'rescheduled'
])

export const BookingResponseSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  serviceId: z.string(),
  scheduledDate: z.string(),
  location: LocationSchema,
  status: BookingStatusSchema,
  price: z.number(),
  notes: z.string().optional(),
  vehicleInfo: z.object({
    make: z.string(),
    model: z.string(),
    year: z.number(),
    color: z.string(),
    licensePlate: z.string().optional(),
    vehicleType: z.enum(['sedan', 'suv', 'truck', 'van', 'motorcycle'])
  }),
  paymentInfo: z.object({
    method: z.string(),
    status: z.enum(['pending', 'paid', 'refunded']),
    transactionId: z.string().optional()
  }).optional(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const BookingCreateSchema = z.object({
  customerId: z.string(),
  serviceId: z.string(),
  scheduledDate: z.string(),
  location: LocationSchema,
  notes: z.string().optional(),
  vehicleInfo: z.object({
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.number().min(1900).max(new Date().getFullYear() + 1),
    color: z.string(),
    licensePlate: z.string().optional(),
    vehicleType: z.enum(['sedan', 'suv', 'truck', 'van', 'motorcycle'])
  })
})

export const BookingUpdateSchema = BookingCreateSchema.partial().extend({
  status: BookingStatusSchema.optional()
})

// Type exports
export type BookingResponseDTO = z.infer<typeof BookingResponseSchema>
export type BookingCreateDTO = z.infer<typeof BookingCreateSchema>
export type BookingUpdateDTO = z.infer<typeof BookingUpdateSchema>
export type LocationDTO = z.infer<typeof LocationSchema>

// Mapper class
export class BookingMapper {
  /**
   * Map API response to domain entity
   */
  static toDomain(dto: BookingResponseDTO): Booking {
    return {
      id: dto.id,
      customerId: dto.customerId,
      serviceId: dto.serviceId,
      scheduledDate: new Date(dto.scheduledDate),
      location: dto.location,
      status: dto.status as BookingStatus,
      price: dto.price,
      notes: dto.notes,
      vehicleInfo: dto.vehicleInfo!,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt)
    }
  }

  /**
   * Map domain entity to API response
   */
  static toDTO(booking: Booking): BookingResponseDTO {
    return {
      id: booking.id,
      customerId: booking.customerId,
      serviceId: booking.serviceId,
      scheduledDate: booking.scheduledDate.toISOString(),
      location: booking.location,
      status: booking.status,
      price: booking.price,
      notes: booking.notes,
      vehicleInfo: booking.vehicleInfo,
      createdAt: booking.createdAt.toISOString(),
      updatedAt: booking.updatedAt.toISOString()
    }
  }

  /**
   * Map create request to API format
   */
  static toCreateDTO(data: Partial<Booking>): BookingCreateDTO {
    return BookingCreateSchema.parse({
      customerId: data.customerId,
      serviceId: data.serviceId,
      scheduledDate: data.scheduledDate instanceof Date 
        ? data.scheduledDate.toISOString() 
        : data.scheduledDate,
      location: data.location,
      notes: data.notes,
      vehicleInfo: data.vehicleInfo
    })
  }

  /**
   * Validate and map API response array
   */
  static toDomainArray(dtos: unknown[]): Booking[] {
    const validated = z.array(BookingResponseSchema).parse(dtos)
    return validated.map(dto => BookingMapper.toDomain(dto))
  }
}