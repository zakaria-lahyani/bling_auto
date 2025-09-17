/**
 * Data Package Main Entry Point
 * 
 * This is the single interface for all data operations.
 * Frontend components should only import from this file.
 * 
 * Usage:
 * ```ts
 * import { dataManager } from '@/lib/data'
 * 
 * const services = await dataManager.getServices()
 * const heroContent = await dataManager.getHeroContent()
 * ```
 */

import { DATA_CONFIG } from './config'
import { StaticDataFetcher } from './fetchers/static'
import { ApiDataFetcher } from './fetchers/api'
import type {
  HomePageData,
  ServicesPageData,
  AboutPageData,
  ContactPageData
} from './marketing/types'

// Export types for components to use
export type {
  Service,
  ServiceCategory,
  HeroContent,
  StatsItem,
  TestimonialItem,
  FeatureItem,
  ContactInfo,
  BusinessSettings,
  SearchParams,
  ApiResponse,
  DataFetcher
} from './types'

// Export marketing types
export type {
  HomePageData,
  ServicesPageData,
  AboutPageData,
  ContactPageData,
  SeoData,
  CtaButton
} from './marketing/types'

// Export configuration for reference
export { DATA_CONFIG, API_ENDPOINTS } from './config'

// Create the appropriate data fetcher based on configuration
function createDataFetcher() {
  switch (DATA_CONFIG.source) {
    case 'api':
      return new ApiDataFetcher()
    case 'static':
    default:
      return new StaticDataFetcher()
  }
}

// Single data manager instance
export const dataManager = createDataFetcher()

// Convenience functions that match the old API for easy migration
export const getServices = (params?: any) => dataManager.getServices(params)
export const getServiceById = (id: string) => dataManager.getServiceById(id)
export const getServiceCategories = () => dataManager.getServiceCategories()
export const searchServices = (query: string) => dataManager.getServices({ query })
export const getFeaturedServices = () => dataManager.getServices({ featured: true })
export const getPopularServices = () => dataManager.getServices({ popular: true })
export const getServicesByCategory = (categorySlug: string) => 
  dataManager.getServices({ category: categorySlug })

// Homepage data functions
export const getHeroContent = () => dataManager.getHeroContent()
export const getStats = () => dataManager.getStats()
export const getTestimonials = () => dataManager.getTestimonials()
export const getFeatures = () => dataManager.getFeatures()

// Business data functions
export const getContactInfo = () => dataManager.getContactInfo()
export const getBusinessSettings = () => dataManager.getBusinessSettings()

// Full marketing page data functions
export const getHomepageData = (): Promise<HomePageData> => dataManager.getHomepageData()
export const getServicesPageData = (): Promise<ServicesPageData> => dataManager.getServicesPageData()
export const getAboutPageData = (): Promise<AboutPageData> => dataManager.getAboutPageData()
export const getContactPageData = (): Promise<ContactPageData> => dataManager.getContactPageData()

// Cache management (only available for API fetcher)
export const clearDataCache = () => {
  if ('clearCache' in dataManager) {
    (dataManager as ApiDataFetcher).clearCache()
  }
}

export const clearDataCacheForKey = (key: string) => {
  if ('clearCacheForKey' in dataManager) {
    (dataManager as ApiDataFetcher).clearCacheForKey(key)
  }
}

// Helper to check current data source
export const getDataSource = () => DATA_CONFIG.source
export const isUsingApi = () => DATA_CONFIG.source === 'api'
export const isUsingStatic = () => DATA_CONFIG.source === 'static'

// Helper to switch data source at runtime (for testing)
export const switchDataSource = (source: 'static' | 'api') => {
  // Note: This would require recreating the data manager
  // In practice, you'd restart the app with a different env var
  console.warn('switchDataSource is for development only. Use NEXT_PUBLIC_DATA_SOURCE env var in production.')
}

// Revalidation helpers for ISR
export const getRevalidationConfig = (pageType: string): { revalidate: number; tags?: string[] } => {
  const configs = {
    homepage: { revalidate: 3600, tags: ['homepage', 'services'] }, // 1 hour
    services: { revalidate: 1800, tags: ['services'] }, // 30 minutes
    about: { revalidate: 86400, tags: ['about'] }, // 24 hours
    contact: { revalidate: 7200, tags: ['contact'] } // 2 hours
  }

  return configs[pageType as keyof typeof configs] || { revalidate: 3600 }
}