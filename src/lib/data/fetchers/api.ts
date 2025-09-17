/**
 * API Data Fetcher
 * 
 * Handles communication with the backend API.
 * Automatically falls back to static data if API is unavailable.
 */

import { BaseFetcher } from './base'
import { StaticDataFetcher } from './static'
import { DATA_CONFIG, API_ENDPOINTS } from '../config'
import type {
  Service,
  ServiceCategory,
  HeroContent,
  StatsItem,
  TestimonialItem,
  FeatureItem,
  ContactInfo,
  BusinessSettings,
  SearchParams,
  ApiResponse
} from '../types'

import type {
  HomePageData,
  ServicesPageData,
  AboutPageData,
  ContactPageData
} from '../marketing/types'

export class ApiDataFetcher extends BaseFetcher {
  private staticFetcher = new StaticDataFetcher()

  private async apiCall<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${DATA_CONFIG.apiBaseUrl}${endpoint}`)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add auth headers if needed
        // 'Authorization': `Bearer ${getAuthToken()}`
      }
    })

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`)
    }

    const result: ApiResponse<T> = await response.json()
    
    if (!result.success) {
      throw new Error(result.message || 'API returned error')
    }

    return result.data
  }

  private async withFallback<T>(
    apiCall: () => Promise<T>,
    staticFallback: () => Promise<T>
  ): Promise<T> {
    try {
      return await this.withRetry(apiCall)
    } catch (error) {
      if (DATA_CONFIG.fallbackToStatic) {
        console.warn('API call failed, falling back to static data:', error)
        return await staticFallback()
      }
      throw error
    }
  }

  // Services
  async getServices(params?: SearchParams): Promise<Service[]> {
    const cacheKey = `services:${JSON.stringify(params || {})}`
    let cached = this.getFromCache<Service[]>(cacheKey)
    
    if (cached) return cached

    const result = await this.withFallback(
      () => this.apiCall<Service[]>(API_ENDPOINTS.services, params),
      () => this.staticFetcher.getServices(params)
    )

    this.setCache(cacheKey, result)
    return result
  }

  async getServiceById(id: string): Promise<Service | null> {
    const cacheKey = `service:${id}`
    let cached = this.getFromCache<Service | null>(cacheKey)
    
    if (cached !== null) return cached

    const result = await this.withFallback(
      () => this.apiCall<Service>(`${API_ENDPOINTS.services}/${id}`),
      () => this.staticFetcher.getServiceById(id)
    ).catch(() => null) // Return null if service not found

    this.setCache(cacheKey, result)
    return result
  }

  async getServiceCategories(): Promise<ServiceCategory[]> {
    const cacheKey = 'categories'
    let cached = this.getFromCache<ServiceCategory[]>(cacheKey)
    
    if (cached) return cached

    const result = await this.withFallback(
      () => this.apiCall<ServiceCategory[]>(API_ENDPOINTS.serviceCategories),
      () => this.staticFetcher.getServiceCategories()
    )

    this.setCache(cacheKey, result)
    return result
  }

  // Homepage Content
  async getHeroContent(): Promise<HeroContent> {
    const cacheKey = 'hero'
    let cached = this.getFromCache<HeroContent>(cacheKey)
    
    if (cached) return cached

    const result = await this.withFallback(
      () => this.apiCall<HeroContent>(`${API_ENDPOINTS.homepage}/hero`),
      () => this.staticFetcher.getHeroContent()
    )

    this.setCache(cacheKey, result)
    return result
  }

  async getStats(): Promise<StatsItem[]> {
    const cacheKey = 'stats'
    let cached = this.getFromCache<StatsItem[]>(cacheKey)
    
    if (cached) return cached

    const result = await this.withFallback(
      () => this.apiCall<StatsItem[]>(API_ENDPOINTS.stats),
      () => this.staticFetcher.getStats()
    )

    this.setCache(cacheKey, result)
    return result
  }

  async getTestimonials(): Promise<TestimonialItem[]> {
    const cacheKey = 'testimonials'
    let cached = this.getFromCache<TestimonialItem[]>(cacheKey)
    
    if (cached) return cached

    const result = await this.withFallback(
      () => this.apiCall<TestimonialItem[]>(API_ENDPOINTS.testimonials),
      () => this.staticFetcher.getTestimonials()
    )

    this.setCache(cacheKey, result)
    return result
  }

  async getFeatures(): Promise<FeatureItem[]> {
    const cacheKey = 'features'
    let cached = this.getFromCache<FeatureItem[]>(cacheKey)
    
    if (cached) return cached

    const result = await this.withFallback(
      () => this.apiCall<FeatureItem[]>(`${API_ENDPOINTS.homepage}/features`),
      () => this.staticFetcher.getFeatures()
    )

    this.setCache(cacheKey, result)
    return result
  }

  async getContactInfo(): Promise<ContactInfo> {
    const cacheKey = 'contact'
    let cached = this.getFromCache<ContactInfo>(cacheKey)
    
    if (cached) return cached

    const result = await this.withFallback(
      () => this.apiCall<ContactInfo>(API_ENDPOINTS.contact),
      () => this.staticFetcher.getContactInfo()
    )

    this.setCache(cacheKey, result)
    return result
  }

  async getBusinessSettings(): Promise<BusinessSettings> {
    const cacheKey = 'settings'
    let cached = this.getFromCache<BusinessSettings>(cacheKey)
    
    if (cached) return cached

    const result = await this.withFallback(
      () => this.apiCall<BusinessSettings>(API_ENDPOINTS.settings),
      () => this.staticFetcher.getBusinessSettings()
    )

    this.setCache(cacheKey, result)
    return result
  }

  // Additional API-specific methods
  async searchServices(query: string): Promise<Service[]> {
    return this.getServices({ query })
  }

  async getFeaturedServices(): Promise<Service[]> {
    return this.getServices({ featured: true })
  }

  async getPopularServices(): Promise<Service[]> {
    return this.getServices({ popular: true })
  }

  async getServicesByCategory(categorySlug: string): Promise<Service[]> {
    return this.getServices({ category: categorySlug })
  }

  // Cache management
  clearCache(): void {
    this.cache.clear()
  }

  clearCacheForKey(key: string): void {
    const cacheKey = this.getCacheKey(key)
    this.cache.delete(cacheKey)
  }

  // Full marketing page data methods
  async getHomepageData(): Promise<HomePageData> {
    const cacheKey = 'homepage-full'
    let cached = this.getFromCache<HomePageData>(cacheKey)
    
    if (cached) return cached

    const result = await this.withFallback(
      () => this.apiCall<HomePageData>('/marketing/homepage'),
      () => this.staticFetcher.getHomepageData()
    )

    this.setCache(cacheKey, result)
    return result
  }

  async getServicesPageData(): Promise<ServicesPageData> {
    const cacheKey = 'services-page-full'
    let cached = this.getFromCache<ServicesPageData>(cacheKey)
    
    if (cached) return cached

    const result = await this.withFallback(
      () => this.apiCall<ServicesPageData>('/marketing/services'),
      () => this.staticFetcher.getServicesPageData()
    )

    this.setCache(cacheKey, result)
    return result
  }

  async getAboutPageData(): Promise<AboutPageData> {
    const cacheKey = 'about-page-full'
    let cached = this.getFromCache<AboutPageData>(cacheKey)
    
    if (cached) return cached

    const result = await this.withFallback(
      () => this.apiCall<AboutPageData>('/marketing/about'),
      () => this.staticFetcher.getAboutPageData()
    )

    this.setCache(cacheKey, result)
    return result
  }

  async getContactPageData(): Promise<ContactPageData> {
    const cacheKey = 'contact-page-full'
    let cached = this.getFromCache<ContactPageData>(cacheKey)
    
    if (cached) return cached

    const result = await this.withFallback(
      () => this.apiCall<ContactPageData>('/marketing/contact'),
      () => this.staticFetcher.getContactPageData()
    )

    this.setCache(cacheKey, result)
    return result
  }
}