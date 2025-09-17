/**
 * Mock Services Page Repository Implementation
 * 
 * Provides static data for services page content.
 * Uses existing services data but abstracts the access through repository pattern.
 */

import type { 
  IServicesPageRepository, 
  ServicesPageData, 
  ServicesPageHero, 
  ServiceFilter,
  ServicesPageSEO
} from '../../interfaces/servicespage.repository'
import type { Service, ServiceCategory } from '@/core/entities/service/types'

export class MockServicesPageRepository implements IServicesPageRepository {
  private simulateDelay(ms: number = 100): Promise<void> {
    if (process.env.NODE_ENV === 'test') return Promise.resolve()
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getPageData(): Promise<ServicesPageData> {
    await this.simulateDelay()

    const [hero, services, categories, filters, seo] = await Promise.all([
      this.getHeroData(),
      this.getServices(),
      this.getCategories(),
      this.getFilters(),
      this.getSEOData()
    ])

    return {
      hero,
      services,
      categories,
      filters,
      seo,
      lastUpdated: new Date().toISOString()
    }
  }

  async getHeroData(): Promise<ServicesPageHero> {
    await this.simulateDelay()
    
    return {
      title: "Professional Car Care Services",
      description: "From basic washes to premium detailing, we offer comprehensive car care solutions with mobile and in-shop availability. Book online for same-day service.",
      stats: {
        totalServices: 10,
        averageRating: 4.7,
        happyCustomers: 2500
      }
    }
  }

  async getServices(): Promise<Service[]> {
    await this.simulateDelay()
    
    // Use the mock service repository for consistency
    const serviceRepository = new (await import('./service.mock.repository')).MockServiceRepository()
    return await serviceRepository.findAll()
  }

  async getCategories(): Promise<ServiceCategory[]> {
    await this.simulateDelay()
    
    // Import static data here (not in components)
    const { serviceCategories } = await import('@/lib/data/marketing/static/services')
    return serviceCategories
  }

  async getFilters(): Promise<ServiceFilter> {
    await this.simulateDelay()
    
    const [services, categories] = await Promise.all([
      this.getServices(),
      this.getCategories()
    ])

    return {
      categories,
      priceRange: {
        min: Math.min(...services.map(s => s.price)),
        max: Math.max(...services.map(s => s.price))
      },
      availability: ['mobile', 'inShop'],
      tags: Array.from(new Set(services.flatMap(s => s.tags))),
      sortOptions: [
        { value: 'popular', label: 'Most Popular' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'rating', label: 'Highest Rated' },
        { value: 'duration', label: 'Duration' },
        { value: 'name', label: 'Alphabetical' }
      ]
    }
  }

  async getSEOData(): Promise<ServicesPageSEO> {
    await this.simulateDelay()
    
    return {
      title: 'Professional Car Care Services - Auto Detailing | Bling Auto',
      description: 'Browse our complete range of professional car care services. From basic washes to premium detailing and ceramic coatings. Mobile and in-shop options available.',
      keywords: [
        'car services',
        'auto detailing',
        'car wash',
        'mobile car wash',
        'ceramic coating',
        'paint correction',
        'interior detailing',
        'professional car care',
        'vehicle maintenance',
        'automotive services'
      ],
      ogImage: '/images/og/services-page.jpg',
      canonicalUrl: '/services',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Professional Car Care Services',
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Bling Auto'
        },
        'areaServed': 'California, USA',
        'serviceType': 'Automotive Care'
      }
    }
  }
}