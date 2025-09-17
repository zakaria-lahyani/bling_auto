/**
 * Home Page Repository Interface
 * 
 * Defines the contract for home page data access.
 * Supports both mock and API implementations.
 */

import React from 'react'

export interface HeroSection {
  title: string | React.ReactNode
  subtitle: string
  badges?: string[]
  primaryCTA: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  secondaryCTA?: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  stats?: {
    value: string
    label: string
    icon?: React.ReactNode
  }
  theme?: 'gradient' | 'solid' | 'image'
}

export interface HomeServicePreview {
  id: string
  name: string
  description: string
  price: number
  duration: string
  image: string
  popular?: boolean
  features: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image: string
  location?: string
  serviceUsed?: string
  date?: string
}

export interface CtaSection {
  title: string
  description: string
  primaryButton: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
  backgroundImage?: string
}

export interface HomePageData {
  hero: HeroSection
  services: HomeServicePreview[]
  testimonials: Testimonial[]
  cta: CtaSection
  stats?: {
    happyCustomers: number
    servicesCompleted: number
    averageRating: number
    yearsExperience: number
  }
}

export interface IHomePageRepository {
  /**
   * Get complete home page data
   */
  getPageData(): Promise<HomePageData>

  /**
   * Get hero section data only
   */
  getHeroData(): Promise<HeroSection>

  /**
   * Get featured services for home page
   */
  getFeaturedServices(): Promise<HomeServicePreview[]>

  /**
   * Get testimonials for home page
   */
  getTestimonials(): Promise<Testimonial[]>

  /**
   * Get CTA section data
   */
  getCtaData(): Promise<CtaSection>
}