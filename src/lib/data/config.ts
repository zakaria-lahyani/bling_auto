/**
 * Data Configuration
 * 
 * This file controls whether to use static data or API endpoints.
 * Switch between modes easily by changing the DATA_SOURCE environment variable.
 */

export type DataSource = 'static' | 'api'

export const DATA_CONFIG = {
  source: (process.env.NEXT_PUBLIC_DATA_SOURCE as DataSource) || 'static',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  
  // Cache settings
  cache: {
    enabled: process.env.NODE_ENV === 'production',
    ttl: 5 * 60 * 1000, // 5 minutes
  },
  
  // Retry settings for API calls
  retry: {
    attempts: 3,
    delay: 1000,
  },
  
  // Fallback to static data if API fails
  fallbackToStatic: true,
} as const

export const API_ENDPOINTS = {
  services: '/services',
  serviceCategories: '/categories',
  homepage: '/content/homepage',
  testimonials: '/testimonials',
  stats: '/stats',
  contact: '/contact',
  settings: '/settings',
} as const