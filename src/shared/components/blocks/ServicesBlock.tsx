/**
 * Services Block Component
 * 
 * A reusable services showcase section that displays service cards with pricing,
 * features, and booking capabilities. Perfect for displaying car wash packages.
 * 
 * @param title - Section heading
 * @param subtitle - Section description
 * @param services - Array of service objects
 * @param columns - Number of columns (2 or 3)
 * @param showPricing - Whether to display pricing information
 * @param ctaText - Text for the call-to-action button
 */
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'

export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: string
  image: string
  popular?: boolean
  features: string[]
  link?: string
}

export interface ServicesBlockProps {
  title: string
  subtitle?: string
  services: Service[]
  columns?: 2 | 3
  showPricing?: boolean
  ctaText?: string
  ctaLink?: string
  theme?: 'light' | 'surface'
  className?: string
  showViewAll?: boolean
  viewAllText?: string
  viewAllLink?: string
}

const ServicesBlock: React.FC<ServicesBlockProps> = ({
  title,
  subtitle,
  services,
  columns = 3,
  showPricing = true,
  ctaText = 'Book This Service',
  ctaLink = '/booking',
  theme = 'light',
  className = '',
  showViewAll = false,
  viewAllText = 'View All Services',
  viewAllLink = '/services'
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-white'
      case 'surface':
        return 'bg-surface'
      default:
        return 'bg-white'
    }
  }

  const getColumnClasses = () => {
    switch (columns) {
      case 2:
        return 'md:grid-cols-2'
      case 3:
        return 'md:grid-cols-2 lg:grid-cols-3'
      default:
        return 'md:grid-cols-2 lg:grid-cols-3'
    }
  }

  return (
    <section className={`py-20 ${getThemeClasses()} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-content-primary">
              {title}
            </h2>
            {showViewAll && (
              <div className="hidden lg:flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-2 rounded-full text-sm font-medium">
                <span>10+ Services Available</span>
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xl text-content-secondary">
              {subtitle}
            </p>
          )}
          {showViewAll && (
            <p className="text-content-muted mt-2 text-sm">
              Showing our most popular services • <Link href={viewAllLink} className="text-brand-600 hover:text-brand-700 font-medium underline">Browse all options</Link>
            </p>
          )}
        </div>
        
        {/* Services Grid */}
        <div className={`grid ${getColumnClasses()} gap-8`}>
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all group flex flex-col h-full"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="bg-brand-500 text-white text-center py-2 font-semibold text-sm">
                  🔥 Most Popular
                </div>
              )}
              
              {/* Service Image */}
              <div className="relative overflow-hidden">
                <Image 
                  src={service.image} 
                  alt={service.name} 
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              
              {/* Service Details */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Header with Price */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-content-primary">
                    {service.name}
                  </h3>
                  {showPricing && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-brand-600">
                        ${service.price}
                      </div>
                      <div className="text-sm text-content-muted">
                        {service.duration}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Description */}
                <p className="text-content-secondary mb-4">
                  {service.description}
                </p>
                
                {/* Features List */}
                <div className="space-y-2 mb-6 flex-grow">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-content-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button - Always at bottom */}
                <Link
                  href={service.link || ctaLink}
                  className="w-full bg-brand-500 text-white py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors flex items-center justify-center gap-2 mt-auto"
                >
                  {ctaText}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Services Section */}
        {showViewAll && (
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-brand-50 to-blue-50 rounded-2xl p-8 border border-brand-100">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    <span>7+ More Services</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-content-primary mb-3">
                  Complete Automotive Care Solutions
                </h3>
                
                <p className="text-content-secondary mb-6">
                  From basic maintenance to premium detailing and paint protection, 
                  we offer a full range of professional car care services tailored to your needs.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
                  <div className="flex items-center justify-center gap-2 text-brand-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Interior Detailing</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-brand-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Paint Correction</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-brand-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Headlight Restoration</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-brand-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Engine Bay Cleaning</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-brand-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Leather Conditioning</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-brand-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>And much more...</span>
                  </div>
                </div>
                
                <Link
                  href={viewAllLink}
                  className="inline-flex items-center gap-2 bg-brand-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-600 transition-colors shadow-lg hover:shadow-xl"
                >
                  {viewAllText}
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ServicesBlock