/**
 * Data Types for the Data Package
 * 
 * This file contains all the types that will be used across the application.
 * These types are designed to be compatible with both static data and API responses.
 */

import type { ServiceCategory } from '@/core/entities/service'

// Base types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface DataFetcher<T> {
  get(): Promise<T>
  getById?(id: string): Promise<T | null>
  search?(query: string): Promise<T[]>
}

// Service related types - imported from single source of truth
export type { 
  Service,
  ServiceCategory,
  ServiceAddOn,
  ServiceAvailability,
  ServiceFilters,
  ServiceSearchParams
} from '@/core/entities/service'

// ServiceCategory is now imported from core entities above

// Homepage content types
export interface HeroContent {
  title: string
  subtitle: string
  description: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  backgroundImage?: string
  features: string[]
}

export interface StatsItem {
  id: string
  label: string
  value: string | number
  description?: string
  icon?: string
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  company?: string
  content: string
  rating: number
  image?: string
}

export interface FeatureItem {
  id: string
  title: string
  description: string
  icon: string
  benefits?: string[]
}

// Business information types
export interface ContactInfo {
  phone: string
  email: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  hours: {
    [key: string]: string | undefined // e.g., "monday": "8:00 AM - 6:00 PM"
  }
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
    google?: string
  }
}

export interface BusinessSettings {
  name: string
  tagline: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  theme: 'light' | 'dark' | 'auto'
}

// Filter and search types
export interface FilterOptions {
  categories: ServiceCategory[]
  priceRange: {
    min: number
    max: number
  }
  availability: ('mobile' | 'inShop')[]
  tags: string[]
}

export interface SearchParams {
  query?: string
  category?: string
  priceMin?: number
  priceMax?: number
  availability?: ('mobile' | 'inShop')[]
  featured?: boolean
  popular?: boolean
  tags?: string[]
  sortBy?: 'price' | 'rating' | 'duration' | 'popular' | 'featured'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}