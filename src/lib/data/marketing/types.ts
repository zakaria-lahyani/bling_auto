/**
 * Marketing Data Types
 * 
 * Complete type definitions for all marketing pages data.
 * These types work with both static data and API responses.
 */

import type { Service, ServiceCategory } from '@/core/entities/service'

// Common types
export interface SeoData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonicalUrl?: string
  jsonLd?: Record<string, any>
}

export interface CtaButton {
  text: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
  external?: boolean
}

// Homepage specific types
export interface HomePageData {
  seo: SeoData
  hero: HeroSection
  stats: StatsSection
  services: ServicesSection
  features: FeaturesSection
  testimonials: TestimonialsSection
  cta: CtaSection
  lastUpdated: string
}

export interface HeroSection {
  title: string
  subtitle?: string
  description: string
  primaryCta: CtaButton
  secondaryCta?: CtaButton
  backgroundImage?: string
  badge?: {
    text: string
    variant: 'success' | 'info' | 'warning'
  }
  highlights: string[]
}

export interface StatsSection {
  title: string
  description?: string
  items: StatsItem[]
}

export interface StatsItem {
  id: string
  label: string
  value: string | number
  description?: string
  icon: string
  suffix?: string
  prefix?: string
}

export interface ServicesSection {
  title: string
  description?: string
  viewAllCta: CtaButton
  featuredServices: Service[]
}

export interface FeaturesSection {
  title: string
  description?: string
  items: FeatureItem[]
}

export interface FeatureItem {
  id: string
  title: string
  description: string
  icon: string
  benefits?: string[]
  cta?: CtaButton
}

export interface TestimonialsSection {
  title: string
  description?: string
  items: TestimonialItem[]
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  company?: string
  content: string
  rating: number
  image?: string
  location?: string
  serviceUsed?: string
}

export interface CtaSection {
  title: string
  description?: string
  primaryCta: CtaButton
  secondaryCta?: CtaButton
  backgroundPattern?: string
}

// Services page types
export interface ServicesPageData {
  seo: SeoData
  hero: ServicesHeroSection
  categories: ServiceCategory[]
  services: Service[]
  filters: FilterOptions
  lastUpdated: string
}

export interface ServicesHeroSection {
  title: string
  description: string
  stats: {
    totalServices: number
    averageRating: number
    happyCustomers: number
  }
}

// Service types - imported from single source of truth
export type { 
  Service,
  ServiceAddOn,
  ServiceCategory,
  ServiceAvailability
} from '@/core/entities/service'

// ServiceCategory is now imported from core entities above

export interface FilterOptions {
  categories: ServiceCategory[]
  priceRange: {
    min: number
    max: number
  }
  availability: ('mobile' | 'inShop')[]
  tags: string[]
  sortOptions: {
    value: string
    label: string
  }[]
}

// About page types
export interface AboutPageData {
  seo: SeoData
  hero: AboutHeroSection
  story: StorySection
  team: TeamSection
  values: ValuesSection
  achievements: AchievementsSection
  cta: CtaSection
  lastUpdated: string
}

export interface AboutHeroSection {
  title: string
  description: string
  image: string
  stats: StatsItem[]
}

export interface StorySection {
  title: string
  content: string
  timeline?: TimelineItem[]
  images?: string[]
}

export interface TimelineItem {
  year: string
  title: string
  description: string
}

export interface TeamSection {
  title: string
  description?: string
  members: TeamMember[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social?: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}

export interface ValuesSection {
  title: string
  description?: string
  values: ValueItem[]
}

export interface ValueItem {
  id: string
  title: string
  description: string
  icon: string
}

export interface AchievementsSection {
  title: string
  items: AchievementItem[]
}

export interface AchievementItem {
  id: string
  title: string
  description: string
  icon: string
  date?: string
}

// Contact page types
export interface ContactPageData {
  seo: SeoData
  hero: ContactHeroSection
  info: ContactInfo
  locations: LocationInfo[]
  faqs: FaqSection
  lastUpdated: string
}

export interface ContactHeroSection {
  title: string
  description: string
  benefits: string[]
}

export interface ContactInfo {
  phone: string
  email: string
  address: AddressInfo
  hours: BusinessHours
  socialMedia: SocialMediaLinks
  emergencyContact?: {
    phone: string
    available: string
  }
}

export interface AddressInfo {
  street: string
  city: string
  state: string
  zip: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface BusinessHours {
  [key: string]: string | undefined
  timezone?: string
}

export interface SocialMediaLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  youtube?: string
  google?: string
  yelp?: string
}

export interface LocationInfo {
  id: string
  name: string
  address: AddressInfo
  phone: string
  hours: BusinessHours
  services: string[]
  manager?: string
  image?: string
}

export interface FaqSection {
  title: string
  items: FaqItem[]
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  category?: string
}

// Search and filtering
export interface SearchParams {
  query?: string
  category?: string
  priceMin?: number
  priceMax?: number
  availability?: ('mobile' | 'inShop')[]
  featured?: boolean
  popular?: boolean
  new?: boolean
  tags?: string[]
  sortBy?: 'price' | 'rating' | 'duration' | 'popular' | 'featured' | 'name'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// API response wrapper
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
    lastUpdated?: string
  }
}

// ISR and caching
export interface CacheConfig {
  revalidate: number
  tags?: string[]
}

export interface PageProps {
  params?: { [key: string]: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// Global settings
export interface GlobalSettings {
  site: SiteSettings
  business: BusinessSettings
  seo: GlobalSeoSettings
  integrations: IntegrationSettings
}

export interface SiteSettings {
  name: string
  tagline: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  theme: 'light' | 'dark' | 'auto'
  maintenance: boolean
}

export interface BusinessSettings {
  name: string
  legalName: string
  foundedYear: number
  description: string
  industry: string
  size: string
  logo: string
  contact: ContactInfo
}

export interface GlobalSeoSettings {
  defaultTitle: string
  titleTemplate: string
  defaultDescription: string
  defaultKeywords: string[]
  ogImage: string
  twitterHandle: string
  siteUrl: string
  googleSiteVerification?: string
  bingSiteVerification?: string
}

export interface IntegrationSettings {
  googleAnalytics?: string
  googleTagManager?: string
  facebookPixel?: string
  hotjarId?: string
  intercomId?: string
  crisp?: string
}