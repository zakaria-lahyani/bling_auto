/**
 * Landing Page - Modular Block-Based Architecture
 * 
 * This page demonstrates the new block-based architecture where each section
 * is a standalone, reusable component. The page simply imports blocks and 
 * data, making it extremely clean and maintainable.
 * 
 * Benefits:
 * - Easy to understand structure
 * - Reusable blocks across pages  
 * - Centralized data management
 * - Simple to modify or rearrange sections
 * - Consistent styling and behavior
 */
'use client'

import React from 'react'
import { ArrowRight, Play, CheckCircle } from 'lucide-react'
import { AuthService } from '@/lib/auth'

// Import all block components
import {
  HeroBlock,
  FeaturesBlock, 
  ServicesBlock,
  TestimonialsBlock,
  CTABlock
} from '@/components/blocks'

// Import page data
import {
  heroData,
  featuresData,
  servicesData,
  testimonialsData,
  ctaData
} from '@/data/homePageData'

const LandingPage = () => {
  const user = AuthService.getCurrentUser()

  // Customize hero CTAs based on user authentication
  const customHeroData = {
    ...heroData,
    title: (
      <>
        Premium Car Wash,{' '}
        <span className="text-brand-200">Wherever You Are</span>
      </>
    ),
    primaryCTA: {
      text: user ? "Go to Dashboard" : "Book Now - $25",
      href: user ? "/dashboards/analytics" : "/apps/booking",
      icon: <ArrowRight size={20} />
    },
    secondaryCTA: {
      text: "Connect With Us",
      href: "/connect",
      icon: <Play size={20} />
    },
    stats: {
      value: "2,500+",
      label: "Happy Customers",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />
    }
  }

  // Customize CTA section based on user authentication
  const customCTAData = {
    ...ctaData,
    primaryCTA: {
      text: user ? "Book Your Service" : "Get Started Today",
      href: user ? "/apps/booking" : "/login"
    }
  }

  return (
    <div className="space-y-0">
      {/* Hero Section - Main landing area with primary CTA */}
      <HeroBlock {...customHeroData} />

      {/* Features Section - Why choose us */}
      <FeaturesBlock 
        {...featuresData}
        theme="surface"
        columns={4}
      />

      {/* Services Section - Our service packages */}
      <ServicesBlock 
        {...servicesData}
        theme="light"
        columns={3}
        ctaLink={user ? "/apps/booking" : "/login"}
      />

      {/* Testimonials Section - Social proof */}
      <TestimonialsBlock 
        {...testimonialsData}
        theme="surface" 
        columns={3}
      />

      {/* Call-to-Action Section - Final conversion push */}
      <CTABlock 
        {...customCTAData}
        theme="gradient"
        size="medium"
      />
    </div>
  )
}

export default LandingPage