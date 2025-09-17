/**
 * Service Data Transfer Objects
 * Standardized DTOs for API communication
 */

import { z } from 'zod'
import type { Service } from '@/core/entities/service/types'

// Validation schemas
export const ServiceAvailabilitySchema = z.object({
  mobile: z.boolean(),
  inShop: z.boolean(),
  onsite: z.boolean().optional()
})

export const ServiceCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  serviceCount: z.number().optional()
})

export const ServiceResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  price: z.number(),
  duration: z.string(),
  image: z.string(),
  images: z.array(z.string()).optional(),
  isActive: z.boolean(),
  category: ServiceCategorySchema,
  featured: z.boolean(),
  popular: z.boolean(),
  availability: ServiceAvailabilitySchema,
  features: z.array(z.string()),
  tags: z.array(z.string()),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
  estimatedTime: z.object({
    min: z.number(),
    max: z.number()
  }).optional(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const ServiceCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  shortDescription: z.string().optional(),
  price: z.number().positive(),
  duration: z.union([z.string(), z.number()]),
  category: z.string(),
  featured: z.boolean().optional(),
  popular: z.boolean().optional(),
  availability: ServiceAvailabilitySchema.optional(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  features: z.array(z.string()).optional()
})

export const ServiceUpdateSchema = ServiceCreateSchema.partial().extend({
  isActive: z.boolean().optional()
})

// Type exports
export type ServiceResponseDTO = z.infer<typeof ServiceResponseSchema>
export type ServiceCreateDTO = z.infer<typeof ServiceCreateSchema>
export type ServiceUpdateDTO = z.infer<typeof ServiceUpdateSchema>
export type ServiceAvailabilityDTO = z.infer<typeof ServiceAvailabilitySchema>

// Mapper functions
export class ServiceMapper {
  /**
   * Map API response to domain entity
   */
  static toDomain(dto: ServiceResponseDTO): Service {
    return {
      id: dto.id,
      name: dto.name,
      slug: dto.slug,
      description: dto.description,
      shortDescription: dto.shortDescription,
      price: dto.price,
      duration: dto.duration,
      image: dto.image,
      isActive: dto.isActive,
      category: dto.category,
      featured: dto.featured,
      popular: dto.popular,
      availability: {
        mobile: dto.availability.mobile,
        inShop: dto.availability.inShop,
        onsite: dto.availability.onsite
      },
      features: dto.features || [],
      tags: dto.tags || [],
      rating: dto.rating || 0,
      reviewCount: dto.reviewCount || 0,
      estimatedTime: dto.estimatedTime || { min: 30, max: 60 },
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt
    }
  }

  /**
   * Map domain entity to API request
   */
  static toDTO(service: Service): ServiceResponseDTO {
    return {
      id: service.id,
      name: service.name,
      slug: service.slug,
      description: service.description,
      shortDescription: service.shortDescription,
      price: service.price,
      duration: service.duration,
      image: service.image,
      images: [service.image],
      isActive: service.isActive,
      category: service.category,
      featured: service.featured,
      popular: service.popular,
      availability: {
        mobile: service.availability.mobile,
        inShop: service.availability.inShop,
        onsite: service.availability.onsite
      },
      features: service.features || [],
      tags: service.tags || [],
      rating: service.rating,
      reviewCount: service.reviewCount,
      estimatedTime: service.estimatedTime,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt
    }
  }

  /**
   * Map create request to API format
   */
  static toCreateDTO(data: Partial<Service>): ServiceCreateDTO {
    return ServiceCreateSchema.parse({
      name: data.name,
      description: data.description,
      shortDescription: data.shortDescription,
      price: data.price,
      duration: data.duration,
      category: typeof data.category === 'string' ? data.category : data.category?.slug,
      featured: data.featured,
      popular: data.popular,
      availability: data.availability,
      images: [data.image].filter(Boolean),
      tags: data.tags,
      features: data.features
    })
  }

  /**
   * Map update request to API format
   */
  static toUpdateDTO(data: Partial<Service>): ServiceUpdateDTO {
    return ServiceUpdateSchema.parse({
      name: data.name,
      description: data.description,
      shortDescription: data.shortDescription,
      price: data.price,
      duration: data.duration,
      category: typeof data.category === 'string' ? data.category : data.category?.slug,
      featured: data.featured,
      popular: data.popular,
      availability: data.availability,
      images: [data.image].filter(Boolean),
      tags: data.tags,
      features: data.features,
      isActive: data.isActive
    })
  }

  /**
   * Validate and map API response array
   */
  static toDomainArray(dtos: unknown[]): Service[] {
    const validated = z.array(ServiceResponseSchema).parse(dtos)
    return validated.map(dto => ServiceMapper.toDomain(dto))
  }

  /**
   * Normalize duration format
   */
  static normalizeDuration(duration: string | number): string {
    if (typeof duration === 'number') {
      return `${duration} min`
    }
    return duration
  }

  /**
   * Extract numeric duration in minutes
   */
  static extractDurationMinutes(duration: string): number {
    const match = duration.match(/(\d+)/)
    return match && match[1] ? parseInt(match[1], 10) : 60
  }
}