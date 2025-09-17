/**
 * Homepage Data Transfer Objects
 * Standardized DTOs for homepage content API communication
 */

import { z } from 'zod'
import type { 
  HomePageData, 
  HeroSection, 
  HomeServicePreview, 
  Testimonial, 
  CtaSection 
} from '@/infrastructure/repositories/interfaces/homepage.repository'

// Validation schemas
export const HeroSectionSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  badges: z.array(z.string()).optional(),
  primaryCTA: z.object({
    text: z.string(),
    href: z.string()
  }),
  secondaryCTA: z.object({
    text: z.string(),
    href: z.string()
  }).optional(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
    width: z.number().optional(),
    height: z.number().optional()
  }).optional(),
  stats: z.object({
    value: z.string(),
    label: z.string()
  }).optional(),
  theme: z.enum(['gradient', 'solid', 'image']).optional()
})

export const HomeServicePreviewSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  duration: z.string(),
  image: z.string(),
  popular: z.boolean().optional(),
  features: z.array(z.string())
})

export const TestimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  content: z.string(),
  rating: z.number().min(1).max(5),
  image: z.string().optional(),
  location: z.string().optional(),
  serviceUsed: z.string().optional(),
  date: z.string().optional()
})

export const CtaSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  primaryButton: z.object({
    text: z.string(),
    href: z.string()
  }),
  secondaryButton: z.object({
    text: z.string(),
    href: z.string()
  }).optional(),
  backgroundImage: z.string().optional()
})

export const HomePageDataSchema = z.object({
  hero: HeroSectionSchema,
  services: z.array(HomeServicePreviewSchema),
  testimonials: z.array(TestimonialSchema),
  cta: CtaSectionSchema,
  stats: z.object({
    happyCustomers: z.number(),
    servicesCompleted: z.number(),
    averageRating: z.number(),
    yearsExperience: z.number()
  }).optional()
})

// Type exports
export type HeroSectionDTO = z.infer<typeof HeroSectionSchema>
export type HomeServicePreviewDTO = z.infer<typeof HomeServicePreviewSchema>
export type TestimonialDTO = z.infer<typeof TestimonialSchema>
export type CtaSectionDTO = z.infer<typeof CtaSectionSchema>
export type HomePageDataDTO = z.infer<typeof HomePageDataSchema>

// Mapper class
export class HomePageMapper {
  /**
   * Map API response to domain entity
   */
  static toDomain(dto: HomePageDataDTO): HomePageData {
    return {
      hero: {
        title: dto.hero.title,
        subtitle: dto.hero.subtitle,
        badges: dto.hero.badges,
        primaryCTA: {
          text: dto.hero.primaryCTA.text,
          href: dto.hero.primaryCTA.href
        },
        secondaryCTA: dto.hero.secondaryCTA ? {
          text: dto.hero.secondaryCTA.text,
          href: dto.hero.secondaryCTA.href
        } : undefined,
        image: dto.hero.image,
        stats: dto.hero.stats,
        theme: dto.hero.theme
      },
      services: dto.services.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        image: service.image,
        popular: service.popular || false,
        features: service.features
      })),
      testimonials: dto.testimonials.map(testimonial => ({
        id: testimonial.id,
        name: testimonial.name,
        role: testimonial.role || '',
        content: testimonial.content,
        rating: testimonial.rating,
        image: testimonial.image || '',
        location: testimonial.location,
        serviceUsed: testimonial.serviceUsed,
        date: testimonial.date
      })),
      cta: {
        title: dto.cta.title,
        description: dto.cta.description,
        primaryButton: {
          text: dto.cta.primaryButton.text,
          href: dto.cta.primaryButton.href
        },
        secondaryButton: dto.cta.secondaryButton ? {
          text: dto.cta.secondaryButton.text,
          href: dto.cta.secondaryButton.href
        } : undefined,
        backgroundImage: dto.cta.backgroundImage
      },
      stats: dto.stats
    }
  }

  /**
   * Map domain entity to API format
   */
  static toDTO(data: HomePageData): HomePageDataDTO {
    return {
      hero: {
        title: typeof data.hero.title === 'string' ? data.hero.title : String(data.hero.title),
        subtitle: data.hero.subtitle,
        badges: data.hero.badges,
        primaryCTA: data.hero.primaryCTA,
        secondaryCTA: data.hero.secondaryCTA,
        image: data.hero.image,
        stats: data.hero.stats,
        theme: data.hero.theme
      },
      services: data.services,
      testimonials: data.testimonials.map(testimonial => ({
        ...testimonial,
        date: typeof testimonial.date === 'string' ? testimonial.date : testimonial.date
      })),
      cta: {
        title: data.cta.title,
        description: data.cta.description,
        primaryButton: data.cta.primaryButton,
        secondaryButton: data.cta.secondaryButton,
        backgroundImage: data.cta.backgroundImage
      },
      stats: data.stats
    }
  }

  /**
   * Map hero section
   */
  static heroToDomain(dto: HeroSectionDTO): HeroSection {
    return {
      title: dto.title,
      subtitle: dto.subtitle,
      badges: dto.badges,
      primaryCTA: {
        text: dto.primaryCTA.text,
        href: dto.primaryCTA.href
      },
      secondaryCTA: dto.secondaryCTA ? {
        text: dto.secondaryCTA.text,
        href: dto.secondaryCTA.href
      } : undefined,
      image: dto.image,
      stats: dto.stats,
      theme: dto.theme
    }
  }

  /**
   * Map featured services array
   */
  static featuredServicesToDomain(dtos: HomeServicePreviewDTO[]): HomeServicePreview[] {
    return dtos.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      image: service.image,
      popular: service.popular || false,
      features: service.features
    }))
  }

  /**
   * Map testimonials array
   */
  static testimonialsToDomain(dtos: TestimonialDTO[]): Testimonial[] {
    return dtos.map(testimonial => ({
      id: testimonial.id,
      name: testimonial.name,
      role: testimonial.role || '',
      content: testimonial.content,
      rating: testimonial.rating,
      image: testimonial.image || '',
      location: testimonial.location,
      serviceUsed: testimonial.serviceUsed,
      date: testimonial.date
    }))
  }

  /**
   * Map CTA section
   */
  static ctaToDomain(dto: CtaSectionDTO): CtaSection {
    return {
      title: dto.title,
      description: dto.description,
      primaryButton: {
        text: dto.primaryButton.text,
        href: dto.primaryButton.href
      },
      secondaryButton: dto.secondaryButton ? {
        text: dto.secondaryButton.text,
        href: dto.secondaryButton.href
      } : undefined,
      backgroundImage: dto.backgroundImage
    }
  }

  /**
   * Validate complete homepage data
   */
  static validateAndMapHomePage(data: unknown): HomePageData {
    const validated = HomePageDataSchema.parse(data)
    return HomePageMapper.toDomain(validated)
  }

  /**
   * Validate hero section data
   */
  static validateAndMapHero(data: unknown): HeroSection {
    const validated = HeroSectionSchema.parse(data)
    return HomePageMapper.heroToDomain(validated)
  }

  /**
   * Validate featured services data
   */
  static validateAndMapFeaturedServices(data: unknown): HomeServicePreview[] {
    const validated = z.array(HomeServicePreviewSchema).parse(data)
    return HomePageMapper.featuredServicesToDomain(validated)
  }

  /**
   * Validate testimonials data
   */
  static validateAndMapTestimonials(data: unknown): Testimonial[] {
    const validated = z.array(TestimonialSchema).parse(data)
    return HomePageMapper.testimonialsToDomain(validated)
  }

  /**
   * Validate CTA section data
   */
  static validateAndMapCta(data: unknown): CtaSection {
    const validated = CtaSectionSchema.parse(data)
    return HomePageMapper.ctaToDomain(validated)
  }
}