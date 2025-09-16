import { z } from 'zod'
import { IdSchema, TimestampSchema } from './common'

// Service schemas
export const ServiceCategorySchema = z.enum(['exterior', 'interior', 'premium', 'eco'])
export const ServiceAvailabilitySchema = z.enum(['onsite', 'mobile', 'both'])

export const ServiceSchema = z.object({
  id: IdSchema,
  name: z.string().min(1).max(100),
  description: z.string().max(500),
  price: z.number().min(0),
  duration: z.string(), // e.g., "30 min", "2 hours"
  availability: ServiceAvailabilitySchema,
  categories: z.array(ServiceCategorySchema),
  image: z.string().url().optional(),
  isActive: z.boolean(),
  isPopular: z.boolean(),
}).merge(TimestampSchema)

export const ServiceCreateSchema = ServiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const ServiceUpdateSchema = ServiceCreateSchema.partial()

export const ServiceFiltersSchema = z.object({
  category: ServiceCategorySchema.optional(),
  availability: ServiceAvailabilitySchema.optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  search: z.string().optional(),
})

// Types
export type Service = z.infer<typeof ServiceSchema>
export type ServiceCreate = z.infer<typeof ServiceCreateSchema>
export type ServiceUpdate = z.infer<typeof ServiceUpdateSchema>
export type ServiceFilters = z.infer<typeof ServiceFiltersSchema>
export type ServiceCategory = z.infer<typeof ServiceCategorySchema>
export type ServiceAvailability = z.infer<typeof ServiceAvailabilitySchema>