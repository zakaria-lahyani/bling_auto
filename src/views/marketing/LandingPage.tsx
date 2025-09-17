/**
 * Landing Page
 * 
 * Main marketing landing page using the new MarketingLayout
 * with modular block-based architecture.
 */
'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight, Play, CheckCircle, Clock, Droplets, Shield, Car, Sparkles } from 'lucide-react'
import { MarketingLayout } from '@/shared/layouts/marketing'
import { AuthService } from '@/infrastructure/auth/auth'

// Import all block components
import {
  HeroBlock,
  FeaturesBlock, 
  ServicesBlock,
  TestimonialsBlock,
  CTABlock
} from '@/shared/components/blocks'

// Import page data
import {
  heroData,
  servicesData,
  testimonialsData,
  ctaData
} from '@/data/homePageData'

const LandingPage = () => {
  const [user, setUser] = useState<ReturnType<typeof AuthService.getCurrentUser>>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setUser(AuthService.getCurrentUser())
    setIsHydrated(true)
  }, [])

  // Newsletter signup handler
  const handleNewsletterSignup = (email: string) => {
    console.log('Newsletter signup:', email)
    // TODO: Implement newsletter signup logic
  }

  // Customize hero CTAs based on user authentication (after hydration)
  const customHeroData = {
    ...heroData,
    title: (
      <>
        Premium Car Wash,{' '}
        <span className="text-brand-200">Wherever You Are</span>
      </>
    ),
    primaryCTA: {
      text: isHydrated && user ? "Go to Dashboard" : "Book Now - $25",
      href: isHydrated && user ? "/dashboard" : "/booking",
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

  // Features data with React icons
  const featuresData = {
    title: "Why Choose CarWash Pro?",
    subtitle: "We're not just another car wash. We're your vehicle care partners, committed to convenience, quality, and your satisfaction.",
    features: [
      {
        icon: Clock,
        title: 'Same-Day Service',
        description: 'Book online and get your car cleaned today. Fast, reliable service.',
      },
      {
        icon: Droplets,
        title: 'Eco-Friendly',
        description: 'Water-efficient processes and biodegradable cleaning products.',
      },
      {
        icon: Shield,
        title: 'Fully Insured',
        description: 'Professional team with full insurance coverage for your peace of mind.',
      },
      {
        icon: Car,
        title: 'Mobile Service',
        description: 'We come to you! Available at your home or office location.',
      }
    ]
  }

  // Customize CTA section based on user authentication (after hydration)
  const customCTAData = {
    ...ctaData,
    primaryCTA: {
      text: isHydrated && user ? "Book Your Service" : "Get Started Today",
      href: isHydrated && user ? "/booking" : "/auth/login"
    },
    icon: Sparkles
  }

  return (
    <MarketingLayout
      header={{
        variant: 'default',
        showAuth: true
      }}
      footer={{
        showNewsletter: true,
        onNewsletterSignup: handleNewsletterSignup
      }}
    >
      {/* Hero Section - Main landing area with primary CTA */}
      <HeroBlock {...customHeroData} />

      {/* Section Divider */}
      <div className="bg-gradient-to-r from-transparent via-brand-200 to-transparent h-px"></div>

      {/* Features Section - Why choose us */}
      <FeaturesBlock 
        {...featuresData}
        theme="surface"
        columns={4}
      />

      {/* Section Divider */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-brand-300"></div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 rounded-full border border-brand-200">
              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
              <span className="text-brand-600 font-medium text-xs">Our Services</span>
              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-brand-300"></div>
          </div>
        </div>
      </div>

      {/* Services Section - Our service packages */}
      <ServicesBlock 
        {...servicesData}
        theme="light"
        columns={3}
        ctaLink={isHydrated && user ? "/booking" : "/auth/login"}
        showViewAll={true}
        viewAllText="View All Services"
        viewAllLink="/services"
      />

      {/* Section Divider */}
      <div className="bg-surface py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-gray-200 shadow-sm">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 font-medium text-xs">Customer Reviews</span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </div>
      </div>

      {/* Testimonials Section - Social proof with auto-sliding */}
      <TestimonialsBlock 
        {...testimonialsData}
        theme="surface" 
        columns={3}
        enableSlider={true}
        autoPlay={true}
        autoPlayInterval={4000}
      />

      {/* Call-to-Action Section - Final conversion push */}
      <CTABlock 
        {...customCTAData}
        theme="gradient"
        size="medium"
      />
    </MarketingLayout>
  )
}

export default LandingPage