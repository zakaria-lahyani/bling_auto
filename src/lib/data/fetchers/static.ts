/**
 * Static Data Fetcher
 * 
 * Uses static data files to simulate API responses.
 * This allows frontend development without backend dependencies.
 */

import { BaseFetcher } from './base'
import type {
  Service,
  ServiceCategory,
  HeroContent,
  StatsItem,
  TestimonialItem,
  FeatureItem,
  ContactInfo,
  BusinessSettings,
  SearchParams
} from '../types'

import type {
  HomePageData,
  ServicesPageData,
  AboutPageData,
  ContactPageData
} from '../marketing/types'

// Import static data from marketing package
import { services as allServices, serviceCategories } from '../marketing/static/services'
import { homepageData } from '../marketing/static/homepage'
import { aboutPageData } from '../marketing/static/about'
import { contactPageData } from '../marketing/static/contact'

export class StaticDataFetcher extends BaseFetcher {
  // Services
  async getServices(params?: SearchParams): Promise<Service[]> {
    const cacheKey = `services:${JSON.stringify(params || {})}`
    let cached = this.getFromCache<Service[]>(cacheKey)
    
    if (cached) return cached

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    let services = [...allServices]

    // Apply filters
    if (params) {
      if (params.category && params.category !== 'all') {
        services = services.filter(s => s.category.slug === params.category)
      }

      if (params.query) {
        const query = params.query.toLowerCase()
        services = services.filter(s =>
          s.name.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }

      if (params.featured !== undefined) {
        services = services.filter(s => s.featured === params.featured)
      }

      if (params.popular !== undefined) {
        services = services.filter(s => s.popular === params.popular)
      }

      if (params.availability?.length) {
        services = services.filter(s =>
          params.availability!.some(avail =>
            avail === 'mobile' ? s.availability.mobile : s.availability.inShop
          )
        )
      }

      if (params.priceMin !== undefined) {
        services = services.filter(s => s.price >= params.priceMin!)
      }

      if (params.priceMax !== undefined) {
        services = services.filter(s => s.price <= params.priceMax!)
      }

      if (params.tags?.length) {
        services = services.filter(s =>
          params.tags!.some(tag => s.tags.includes(tag))
        )
      }

      // Sorting
      if (params.sortBy) {
        services.sort((a, b) => {
          let aValue: any, bValue: any

          switch (params.sortBy) {
            case 'price':
              aValue = a.price
              bValue = b.price
              break
            case 'rating':
              aValue = a.rating
              bValue = b.rating
              break
            case 'duration':
              aValue = a.estimatedTime.min
              bValue = b.estimatedTime.min
              break
            case 'popular':
              aValue = a.popular ? 1 : 0
              bValue = b.popular ? 1 : 0
              break
            case 'featured':
              aValue = a.featured ? 1 : 0
              bValue = b.featured ? 1 : 0
              break
            default:
              return 0
          }

          if (params.sortOrder === 'desc') {
            return bValue - aValue
          }
          return aValue - bValue
        })
      }

      // Pagination
      if (params.page && params.limit) {
        const start = (params.page - 1) * params.limit
        const end = start + params.limit
        services = services.slice(start, end)
      }
    }

    this.setCache(cacheKey, services)
    return services
  }

  async getServiceById(id: string): Promise<Service | null> {
    const cacheKey = `service:${id}`
    let cached = this.getFromCache<Service | null>(cacheKey)
    
    if (cached !== null) return cached

    await new Promise(resolve => setTimeout(resolve, 50))

    const service = allServices.find(s => s.id === id) || null
    this.setCache(cacheKey, service)
    return service
  }

  async getServiceCategories(): Promise<ServiceCategory[]> {
    const cacheKey = 'categories'
    let cached = this.getFromCache<ServiceCategory[]>(cacheKey)
    
    if (cached) return cached

    await new Promise(resolve => setTimeout(resolve, 50))

    this.setCache(cacheKey, serviceCategories)
    return serviceCategories
  }

  // Homepage Content
  async getHeroContent(): Promise<HeroContent> {
    const cacheKey = 'hero'
    let cached = this.getFromCache<HeroContent>(cacheKey)
    
    if (cached) return cached

    await new Promise(resolve => setTimeout(resolve, 50))

    const heroContent: HeroContent = {
      title: homepageData.hero.title,
      subtitle: homepageData.hero.subtitle || "",
      description: homepageData.hero.description,
      primaryCTA: {
        text: homepageData.hero.primaryCta.text,
        href: homepageData.hero.primaryCta.href
      },
      secondaryCTA: homepageData.hero.secondaryCta ? {
        text: homepageData.hero.secondaryCta.text,
        href: homepageData.hero.secondaryCta.href
      } : undefined,
      features: homepageData.hero.highlights
    }

    this.setCache(cacheKey, heroContent)
    return heroContent
  }

  async getStats(): Promise<StatsItem[]> {
    const cacheKey = 'stats'
    let cached = this.getFromCache<StatsItem[]>(cacheKey)
    
    if (cached) return cached

    await new Promise(resolve => setTimeout(resolve, 50))

    const stats: StatsItem[] = homepageData.stats.items.map(item => ({
      id: item.id,
      label: item.label,
      value: `${item.value}${item.suffix || ''}`,
      description: item.description || '',
      icon: item.icon
    }))

    this.setCache(cacheKey, stats)
    return stats
  }

  async getTestimonials(): Promise<TestimonialItem[]> {
    const cacheKey = 'testimonials'
    let cached = this.getFromCache<TestimonialItem[]>(cacheKey)
    
    if (cached) return cached

    await new Promise(resolve => setTimeout(resolve, 50))

    const testimonials: TestimonialItem[] = homepageData.testimonials.items.map(item => ({
      id: item.id,
      name: item.name,
      role: item.role,
      content: item.content,
      rating: item.rating,
      image: item.image
    }))

    this.setCache(cacheKey, testimonials)
    return testimonials
  }

  async getFeatures(): Promise<FeatureItem[]> {
    const cacheKey = 'features'
    let cached = this.getFromCache<FeatureItem[]>(cacheKey)
    
    if (cached) return cached

    await new Promise(resolve => setTimeout(resolve, 50))

    const features: FeatureItem[] = homepageData.features.items.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      icon: item.icon,
      benefits: item.benefits || []
    }))

    this.setCache(cacheKey, features)
    return features
  }

  async getContactInfo(): Promise<ContactInfo> {
    const cacheKey = 'contact'
    let cached = this.getFromCache<ContactInfo>(cacheKey)
    
    if (cached) return cached

    await new Promise(resolve => setTimeout(resolve, 50))

    const contactInfo: ContactInfo = {
      phone: contactPageData.info.phone,
      email: contactPageData.info.email,
      address: {
        street: contactPageData.info.address.street,
        city: contactPageData.info.address.city,
        state: contactPageData.info.address.state,
        zip: contactPageData.info.address.zip,
        country: contactPageData.info.address.country
      },
      hours: contactPageData.info.hours,
      socialMedia: {
        facebook: contactPageData.info.socialMedia.facebook,
        instagram: contactPageData.info.socialMedia.instagram,
        google: contactPageData.info.socialMedia.google
      }
    }

    this.setCache(cacheKey, contactInfo)
    return contactInfo
  }

  async getBusinessSettings(): Promise<BusinessSettings> {
    const cacheKey = 'settings'
    let cached = this.getFromCache<BusinessSettings>(cacheKey)
    
    if (cached) return cached

    await new Promise(resolve => setTimeout(resolve, 50))

    const settings: BusinessSettings = {
      name: 'Bling Auto',
      tagline: 'Premium Car Care & Detailing',
      logo: '/images/logo.png',
      favicon: '/favicon.ico',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      theme: 'light'
    }

    this.setCache(cacheKey, settings)
    return settings
  }

  // Full marketing page data methods
  async getHomepageData(): Promise<HomePageData> {
    const cacheKey = 'homepage-full'
    let cached = this.getFromCache<HomePageData>(cacheKey)
    
    if (cached) return cached

    await new Promise(resolve => setTimeout(resolve, 50))

    // Get featured services and populate them
    const featuredServices = allServices.filter(service => service.featured).slice(0, 6)
    
    const fullData = {
      ...homepageData,
      services: {
        ...homepageData.services,
        featuredServices
      }
    }

    this.setCache(cacheKey, fullData)
    return fullData
  }

  async getServicesPageData(): Promise<ServicesPageData> {
    const cacheKey = 'services-page-full'
    let cached = this.getFromCache<ServicesPageData>(cacheKey)
    
    if (cached) return cached

    await new Promise(resolve => setTimeout(resolve, 50))

    // Import the services page data directly
    const { servicesPageData } = await import('../marketing/static/services')
    this.setCache(cacheKey, servicesPageData)
    return servicesPageData
  }

  async getAboutPageData(): Promise<AboutPageData> {
    const cacheKey = 'about-page-full'
    let cached = this.getFromCache<AboutPageData>(cacheKey)
    
    if (cached) return cached

    await new Promise(resolve => setTimeout(resolve, 50))

    this.setCache(cacheKey, aboutPageData)
    return aboutPageData
  }

  async getContactPageData(): Promise<ContactPageData> {
    const cacheKey = 'contact-page-full'
    let cached = this.getFromCache<ContactPageData>(cacheKey)
    
    if (cached) return cached

    await new Promise(resolve => setTimeout(resolve, 50))

    this.setCache(cacheKey, contactPageData)
    return contactPageData
  }
}