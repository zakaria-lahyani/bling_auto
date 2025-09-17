/**
 * Services Page Repository Interface
 * 
 * Defines the contract for services page data access.
 * Supports both mock and API implementations.
 */

import type { Service, ServiceCategory } from '@/core/entities/service/types'

export interface ServicesPageHero {
  title: string
  description: string
  stats: {
    totalServices: number
    averageRating: number
    happyCustomers: number
  }
}

export interface ServiceFilter {
  categories: ServiceCategory[]
  priceRange: {
    min: number
    max: number
  }
  availability: string[]
  tags: string[]
  sortOptions: Array<{
    value: string
    label: string
  }>
}

export interface ServicesPageSEO {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonicalUrl?: string
  jsonLd?: Record<string, any>
}

export interface ServicesPageData {
  hero: ServicesPageHero
  services: Service[]
  categories: ServiceCategory[]
  filters: ServiceFilter
  seo: ServicesPageSEO
  lastUpdated: string
}

export interface IServicesPageRepository {
  /**
   * Get complete services page data
   */
  getPageData(): Promise<ServicesPageData>

  /**
   * Get services page hero data
   */
  getHeroData(): Promise<ServicesPageHero>

  /**
   * Get all services for the page
   */
  getServices(): Promise<Service[]>

  /**
   * Get service categories for filtering
   */
  getCategories(): Promise<ServiceCategory[]>

  /**
   * Get filter configuration
   */
  getFilters(): Promise<ServiceFilter>

  /**
   * Get SEO data for the page
   */
  getSEOData(): Promise<ServicesPageSEO>
}