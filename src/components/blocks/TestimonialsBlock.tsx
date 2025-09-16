/**
 * Testimonials Block Component
 * 
 * A reusable testimonials section that displays customer reviews in a grid.
 * Features star ratings, customer photos, and responsive design.
 * 
 * @param title - Section heading
 * @param subtitle - Section description
 * @param testimonials - Array of testimonial objects
 * @param columns - Number of columns (2 or 3)
 * @param theme - Visual theme variant
 */
'use client'

import React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'

export interface Testimonial {
  id?: string
  name: string
  role: string
  content: string
  rating: number
  image: string
  company?: string
  location?: string
}

export interface TestimonialsBlockProps {
  title: string
  subtitle?: string
  testimonials: Testimonial[]
  columns?: 2 | 3
  theme?: 'light' | 'surface' | 'dark'
  showRating?: boolean
  className?: string
}

const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  title,
  subtitle,
  testimonials,
  columns = 3,
  theme = 'surface',
  showRating = true,
  className = ''
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-white'
      case 'dark':
        return 'bg-gray-900'
      case 'surface':
        return 'bg-surface'
      default:
        return 'bg-surface'
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

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <section className={`py-20 ${getThemeClasses()} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-content-primary mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-content-secondary">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Testimonials Grid */}
        <div className={`grid ${getColumnClasses()} gap-8`}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id || index} 
              className="bg-page-background border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              {/* Rating Stars */}
              {showRating && (
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
              )}
              
              {/* Quote Content */}
              <p className="text-content-secondary mb-6 italic text-lg leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Customer Info */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-100"
                  />
                </div>
                <div>
                  <div className="font-semibold text-content-primary">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-content-muted">
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </div>
                  {testimonial.location && (
                    <div className="text-xs text-content-muted">
                      {testimonial.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsBlock