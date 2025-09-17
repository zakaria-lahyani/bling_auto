/**
 * Category Repository Interface
 */

import { BaseRepository } from './base.repository'
import type { ServiceCategory } from '@/core/entities/service/types'

export interface CategoryCreateDTO {
  name: string
  slug: string
  description?: string
  icon?: string
  featured?: boolean
  order?: number
}

export interface CategoryUpdateDTO extends Partial<CategoryCreateDTO> {}

export interface ICategoryRepository extends BaseRepository<ServiceCategory, CategoryCreateDTO, CategoryUpdateDTO> {
  // Category-specific methods
  findBySlug(slug: string): Promise<ServiceCategory | null>
  findFeatured(): Promise<ServiceCategory[]>
  findWithServiceCounts(): Promise<ServiceCategory[]>
  
  // Hierarchy methods (for future use)
  findChildren?(parentId: string): Promise<ServiceCategory[]>
  findParent?(categoryId: string): Promise<ServiceCategory | null>
}