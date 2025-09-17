/**
 * Mock Home Page Repository Implementation
 * 
 * Provides static data for home page content.
 * Easy to swap with API implementation later.
 */

import type { 
  IHomePageRepository, 
  HomePageData, 
  HeroSection, 
  HomeServicePreview, 
  Testimonial, 
  CtaSection 
} from '../../interfaces/homepage.repository'
import { HomePageMapper, ValidationUtils } from '@/infrastructure/dto'
import { MockDataLoader } from '@/infrastructure/data/mock'

export class MockHomePageRepository implements IHomePageRepository {
  private simulateDelay(ms: number = 100): Promise<void> {
    if (process.env.NODE_ENV === 'test') return Promise.resolve()
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getPageData(): Promise<HomePageData> {
    await this.simulateDelay()

    const [hero, featuredServices, testimonials, cta] = await Promise.all([
      this.getHeroData(),
      this.getFeaturedServices(),
      this.getTestimonials(),
      this.getCtaData()
    ])

    const rawData = {
      hero,
      featuredServices,
      testimonials,
      cta,
      metadata: {
        title: "Premium Car Care Services - Bling Auto",
        description: "Professional mobile and in-shop car detailing services. Transform your vehicle with eco-friendly products and expert care.",
        keywords: ["car wash", "detailing", "mobile service", "ceramic coating"]
      }
    }

    // Validate and transform using DTO mapper
    return HomePageMapper.validateAndMapHomePage(rawData)
  }

  async getHeroData(): Promise<HeroSection> {
    await this.simulateDelay()
    
    const homepageData = MockDataLoader.getHomepageData()
    return HomePageMapper.validateAndMapHero(homepageData.hero)
  }

  async getFeaturedServices(): Promise<HomeServicePreview[]> {
    await this.simulateDelay()
    
    const homepageData = MockDataLoader.getHomepageData()
    return HomePageMapper.validateAndMapFeaturedServices(homepageData.featuredServices)
  }

  async getTestimonials(): Promise<Testimonial[]> {
    await this.simulateDelay()
    
    const homepageData = MockDataLoader.getHomepageData()
    return HomePageMapper.validateAndMapTestimonials(homepageData.testimonials)
  }

  async getCtaData(): Promise<CtaSection> {
    await this.simulateDelay()
    
    const homepageData = MockDataLoader.getHomepageData()
    return HomePageMapper.validateAndMapCta(homepageData.cta)
  }
}