/**
 * Testimonials Block Component
 * 
 * A reusable testimonials section that displays customer reviews in a grid or slider.
 * Features star ratings, customer photos, responsive design, and optional carousel mode.
 * 
 * @param title - Section heading
 * @param subtitle - Section description
 * @param testimonials - Array of testimonial objects
 * @param columns - Number of columns (2 or 3)
 * @param theme - Visual theme variant
 * @param enableSlider - Enable carousel/slider mode
 * @param autoPlay - Auto-play carousel
 * @param autoPlayInterval - Auto-play interval in milliseconds
 */
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

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
  enableSlider?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  title,
  subtitle,
  testimonials,
  columns = 3,
  theme = 'surface',
  showRating = true,
  enableSlider = true,
  autoPlay = true,
  autoPlayInterval = 4000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)

  // Update visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth
        let newVisibleCount
        if (width >= 1024) { // lg breakpoint
          newVisibleCount = 3
        } else if (width >= 768) { // md breakpoint
          newVisibleCount = 2
        } else {
          newVisibleCount = 1
        }
        
        setVisibleCount(newVisibleCount)
        // Reset current index when screen size changes to prevent out-of-bounds
        setCurrentIndex(0)
      }
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  // Auto-play functionality - automatically cycles through testimonials
  useEffect(() => {
    if (!enableSlider || !autoPlay || testimonials.length <= visibleCount) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = testimonials.length - visibleCount
        // Loop back to beginning when reaching the end
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [enableSlider, autoPlay, autoPlayInterval, testimonials.length, visibleCount])

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

  const handlePrevious = () => {
    setCurrentIndex(prev => {
      if (prev === 0) {
        // Loop to the last slide
        return Math.max(0, testimonials.length - visibleCount)
      }
      return prev - 1
    })
  }

  const handleNext = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + 1
      // Loop back to start if we've gone past the last possible slide
      return nextIndex > testimonials.length - visibleCount ? 0 : nextIndex
    })
  }

  // For slider mode, we need to show all testimonials but with proper positioning
  // For non-slider mode, show all testimonials
  const visibleTestimonials = enableSlider 
    ? testimonials
    : testimonials

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
        
        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {enableSlider && testimonials.length > visibleCount && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-border rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-6 h-6 text-content-primary" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-border rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-6 h-6 text-content-primary" />
              </button>
            </>
          )}
          
          {/* Testimonials Grid/Slider */}
          {enableSlider ? (
            <div className="overflow-hidden">
              <div 
                className="flex gap-8 transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(calc(-${currentIndex} * (${100 / visibleCount}% + ${32 / visibleCount}px)))`
                }}
              >
                {visibleTestimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id || index} 
                    className="bg-page-background border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow flex-shrink-0"
                    style={{
                      width: `calc(${100 / visibleCount}% - ${(32 * (visibleCount - 1)) / visibleCount}px)`
                    }}
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
          ) : (
            /* Non-slider grid layout */
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
          )}

          {/* Dots Indicator */}
          {enableSlider && testimonials.length > visibleCount && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: testimonials.length - visibleCount + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-brand-500' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsBlock