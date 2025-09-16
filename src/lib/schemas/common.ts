import { z } from 'zod'

// Common schemas used across the app
export const IdSchema = z.string().min(1)

export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  total: z.number().optional(),
})

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    pagination: PaginationSchema,
  })

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    message: z.string().optional(),
  })

export const TimestampSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

// Types
export type Id = z.infer<typeof IdSchema>
export type Pagination = z.infer<typeof PaginationSchema>
export type PaginatedResponse<T> = {
  items: T[]
  pagination: Pagination
}
export type ApiResponse<T> = z.infer<ReturnType<typeof ApiResponseSchema<z.ZodType<T>>>>
export type Timestamp = z.infer<typeof TimestampSchema>