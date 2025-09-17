/**
 * Service Repository Interface
 */

import { BaseRepository } from './base.repository'
import type { Service, ServiceFilters } from '@/core/entities/service/types'

export type { ServiceFilters }

export interface ServiceCreateDTO {
  name: string
  description: string
  price: number
  duration: number
  category: string
  featured?: boolean
  popular?: boolean
  availability?: string[]
  images?: string[]
  tags?: string[]
}

export interface ServiceUpdateDTO extends Partial<ServiceCreateDTO> {}

export interface IServiceRepository extends BaseRepository<Service, ServiceCreateDTO, ServiceUpdateDTO> {
  // Service-specific methods
  findByCategory(categorySlug: string): Promise<Service[]>
  findFeatured(): Promise<Service[]>
  findPopular(): Promise<Service[]>
  findByAvailability(availability: string): Promise<Service[]>
  search(query: string): Promise<Service[]>
  
  // Advanced queries
  findWithFilters(filters: ServiceFilters): Promise<Service[]>
  findRelated(serviceId: string, limit?: number): Promise<Service[]>
  
  // Statistics
  getAverageRating(serviceId: string): Promise<number>
  getBookingCount(serviceId: string): Promise<number>
}