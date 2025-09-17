/**
 * DTO Layer Main Export
 * 
 * Centralized export for all Data Transfer Objects and mappers
 */

// Service DTOs
export {
  ServiceMapper,
  ServiceResponseSchema,
  ServiceCreateSchema,
  ServiceUpdateSchema,
  ServiceAvailabilitySchema,
  type ServiceResponseDTO,
  type ServiceCreateDTO,
  type ServiceUpdateDTO,
  type ServiceAvailabilityDTO
} from './service.dto'

// Booking DTOs
export {
  BookingMapper,
  BookingResponseSchema,
  BookingCreateSchema,
  BookingUpdateSchema,
  LocationSchema,
  BookingStatusSchema,
  type BookingResponseDTO,
  type BookingCreateDTO,
  type BookingUpdateDTO,
  type LocationDTO
} from './booking.dto'

// Homepage DTOs
export {
  HomePageMapper,
  HomePageDataSchema,
  HeroSectionSchema,
  HomeServicePreviewSchema,
  TestimonialSchema,
  CtaSectionSchema,
  type HomePageDataDTO,
  type HeroSectionDTO,
  type HomeServicePreviewDTO,
  type TestimonialDTO,
  type CtaSectionDTO
} from './homepage.dto'

// Common validation utilities
import { z } from 'zod'

export const CommonSchemas = {
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

// Base response wrapper for API responses
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({
  data: dataSchema,
  message: z.string().optional(),
  status: z.enum(['success', 'error']),
  timestamp: z.string().datetime().optional(),
  errors: z.array(z.object({
    field: z.string(),
    message: z.string(),
    code: z.string().optional()
  })).optional()
})

// Paginated response wrapper
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) => z.object({
  data: z.array(itemSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean()
  }),
  message: z.string().optional(),
  status: z.enum(['success', 'error']).optional()
})

// Error response schema
export const ErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.any().optional()
  }),
  status: z.literal('error'),
  timestamp: z.string().datetime(),
  path: z.string().optional()
})

// Validation utility functions
export class ValidationUtils {
  /**
   * Safely parse and validate data with detailed error reporting
   */
  static safeParseWithContext<T>(
    schema: z.ZodSchema<T>,
    data: unknown,
    context: string
  ): { success: true; data: T } | { success: false; error: string; details: any } {
    try {
      const result = schema.safeParse(data)
      if (result.success) {
        return { success: true, data: result.data }
      } else {
        return {
          success: false,
          error: `Validation failed in ${context}`,
          details: result.error.issues
        }
      }
    } catch (error) {
      return {
        success: false,
        error: `Validation error in ${context}: ${error}`,
        details: error
      }
    }
  }

  /**
   * Transform validation errors into user-friendly messages
   */
  static formatValidationErrors(errors: z.ZodIssue[]): Record<string, string> {
    const formatted: Record<string, string> = {}
    
    errors.forEach(error => {
      const path = error.path.join('.')
      const message = this.getValidationMessage(error)
      formatted[path] = message
    })
    
    return formatted
  }

  private static getValidationMessage(error: z.ZodIssue): string {
    switch (error.code) {
      case 'invalid_type':
        return `Expected ${error.expected}, but received ${error.received}`
      case 'invalid_string':
        return `Invalid string format: ${error.validation}`
      case 'too_small':
        return error.type === 'string' 
          ? `Must be at least ${error.minimum} characters long`
          : `Must be at least ${error.minimum}`
      case 'too_big':
        return error.type === 'string'
          ? `Must be no more than ${error.maximum} characters long`
          : `Must be no more than ${error.maximum}`
      case 'invalid_enum_value':
        return `Must be one of: ${error.options.join(', ')}`
      case 'invalid_date':
        return 'Invalid date format'
      case 'custom':
        return error.message || 'Invalid value'
      default:
        return error.message || 'Invalid value'
    }
  }

  /**
   * Clean object by removing undefined values
   */
  static cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
    const cleaned: Partial<T> = {}
    
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        cleaned[key as keyof T] = value
      }
    })
    
    return cleaned
  }

  /**
   * Deep merge objects with type safety
   */
  static deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
    const result = { ...target }
    
    Object.entries(source).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
          result[key as keyof T] = this.deepMerge(
            result[key as keyof T] as Record<string, any>, 
            value
          ) as T[keyof T]
        } else {
          result[key as keyof T] = value
        }
      }
    })
    
    return result
  }
}