import { z } from 'zod'
import { IdSchema, TimestampSchema } from './common'
import { ServiceSchema } from './services'

// Appointment schemas
export const AppointmentStatusSchema = z.enum([
  'scheduled',
  'confirmed', 
  'in_progress',
  'completed',
  'cancelled',
  'no_show'
])

export const LocationTypeSchema = z.enum(['onsite', 'mobile'])

export const VehicleSchema = z.object({
  id: IdSchema.optional(),
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  color: z.string().min(1),
  licensePlate: z.string().min(1),
  notes: z.string().optional(),
  isDefault: z.boolean(),
})

export const CustomerInfoSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(10),
  email: z.string().email().optional(),
})

export const AppointmentLocationSchema = z.object({
  type: LocationTypeSchema,
  address: z.string().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  instructions: z.string().optional(),
})

export const AppointmentSchema = z.object({
  id: IdSchema,
  customerId: IdSchema,
  serviceId: IdSchema,
  service: ServiceSchema.optional(), // Populated in responses
  status: AppointmentStatusSchema,
  date: z.string().date(),
  time: z.string().time(),
  duration: z.number(), // minutes
  location: AppointmentLocationSchema,
  vehicle: VehicleSchema,
  customerInfo: CustomerInfoSchema,
  notes: z.string().optional(),
  totalPrice: z.number().min(0),
  operatorId: IdSchema.optional(),
}).merge(TimestampSchema)

export const AppointmentCreateSchema = AppointmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  service: true,
})

export const AppointmentUpdateSchema = z.object({
  status: AppointmentStatusSchema.optional(),
  date: z.string().date().optional(),
  time: z.string().time().optional(),
  location: AppointmentLocationSchema.optional(),
  notes: z.string().optional(),
  operatorId: IdSchema.optional(),
})

export const AppointmentFiltersSchema = z.object({
  status: AppointmentStatusSchema.optional(),
  dateFrom: z.string().date().optional(),
  dateTo: z.string().date().optional(),
  customerId: IdSchema.optional(),
  operatorId: IdSchema.optional(),
  serviceId: IdSchema.optional(),
})

// Types
export type Appointment = z.infer<typeof AppointmentSchema>
export type AppointmentCreate = z.infer<typeof AppointmentCreateSchema>
export type AppointmentUpdate = z.infer<typeof AppointmentUpdateSchema>
export type AppointmentFilters = z.infer<typeof AppointmentFiltersSchema>
export type AppointmentStatus = z.infer<typeof AppointmentStatusSchema>
export type LocationType = z.infer<typeof LocationTypeSchema>
export type Vehicle = z.infer<typeof VehicleSchema>
export type CustomerInfo = z.infer<typeof CustomerInfoSchema>
export type AppointmentLocation = z.infer<typeof AppointmentLocationSchema>