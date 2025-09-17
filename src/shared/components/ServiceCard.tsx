/**
 * Unified ServiceCard Component
 * 
 * Consolidates the functionality of both marketing and feature ServiceCard components
 * with a variant system for different use cases.
 */
'use client'

import React from 'react'
import Link from 'next/link'
import { Star, Clock, Eye, ArrowRight, CheckCircle, Home, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/shared/components/ui'
import type { Service } from '@/core/entities/service'

export type ServiceCardVariant = 'marketing' | 'selection' | 'booking'

export interface ServiceCardProps {
  service: Service
  variant?: ServiceCardVariant
  // Marketing variant props
  onViewDetails?: (service: Service) => void
  // Selection variant props
  onSelect?: (serviceId: string) => void
  isSelected?: boolean
  // Booking variant props
  onBook?: (serviceId: string) => void
  showBookButton?: boolean
  // Common props
  className?: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  variant = 'marketing',
  onViewDetails,
  onSelect,
  isSelected = false,
  onBook,
  showBookButton = true,
  className = ''
}) => {
  const baseClasses = "bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition-all h-full"
  
  const variantClasses = {
    marketing: "group flex flex-col border-border",
    selection: `cursor-pointer p-6 rounded-3xl ${isSelected ? 'border-teal-600 ring-2 ring-teal-100' : 'border-slate-200 hover:border-slate-300'}`,
    booking: "border-slate-200 hover:border-slate-300 rounded-3xl"
  }

  const containerClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  const renderBadges = () => {
    if (variant !== 'marketing') return null
    
    return (
      <div className="flex">
        {service.popular && (
          <div className="bg-brand-500 text-white text-center py-2 px-4 font-semibold text-sm flex-1">
            🔥 Most Popular
          </div>
        )}
        {service.featured && (
          <div className="bg-purple-500 text-white text-center py-2 px-4 font-semibold text-sm flex-1">
            ✨ Featured
          </div>
        )}
      </div>
    )
  }

  const renderImage = () => {
    if (!service.image) return null

    const imageClasses = variant === 'marketing' 
      ? "h-48 relative overflow-hidden"
      : "w-full h-48 rounded-2xl overflow-hidden mb-4"

    return (
      <div className={imageClasses}>
        <img 
          src={service.image} 
          alt={service.name}
          className={`w-full h-full object-cover ${variant === 'marketing' ? 'group-hover:scale-105 transition-transform duration-300' : ''}`}
        />
        {variant === 'marketing' && service.originalPrice && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Save ${service.originalPrice - service.price}
          </div>
        )}
      </div>
    )
  }

  const renderHeader = () => {
    if (variant === 'marketing') {
      return (
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-content-primary mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
              {service.name}
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-content-muted">({service.reviewCount})</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            {service.originalPrice && (
              <div className="text-sm text-content-muted line-through">
                ${service.originalPrice}
              </div>
            )}
            <div className="text-2xl font-bold text-brand-600">
              ${service.price}
            </div>
            <div className="text-sm text-content-muted flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {service.duration}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-slate-900">{service.name}</h3>
            {(service.popular || (service as any).isPopular) && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                <Star size={12} fill="currentColor" />
                Popular
              </span>
            )}
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            {service.shortDescription || service.description}
          </p>
        </div>
      )
    }
  }

  const renderContent = () => {
    if (variant === 'marketing') {
      return (
        <>
          <p className="text-content-secondary leading-relaxed mb-4 line-clamp-2">
            {service.shortDescription}
          </p>
          
          <div className="space-y-2 mb-6 flex-grow">
            {service.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-content-secondary">{feature}</span>
              </div>
            ))}
            {service.features.length > 3 && (
              <div className="text-sm text-content-muted">+{service.features.length - 3} more features</div>
            )}
          </div>
        </>
      )
    } else {
      return (
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock size={16} />
            <span>Duration: {service.duration}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={16} />
            <span>{service.availability?.mobile ? 'Mobile & On-site' : 'On-site only'}</span>
          </div>

          {service.category && (
            <div className="flex flex-wrap gap-1">
              <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                {typeof service.category === 'string' ? service.category : service.category.name}
              </span>
            </div>
          )}
        </div>
      )
    }
  }

  const renderActions = () => {
    if (variant === 'marketing') {
      return (
        <div className="space-y-2 mt-auto">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewDetails?.(service)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-surface text-content-primary border border-border rounded-xl font-medium hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 transition-colors"
            >
              <Eye size={16} />
              <span>Details</span>
            </button>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 transition-colors"
            >
              <span>Book</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          {service.availability?.mobile && (
            <div className="flex items-center justify-center gap-2 text-sm text-green-600">
              <Home className="w-4 h-4" />
              <span>Available at your location</span>
            </div>
          )}
        </div>
      )
    } else {
      return (
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-slate-900">${service.price}</div>
            <div className="text-sm text-slate-600">Total price</div>
          </div>
          
          {showBookButton && (
            <Button
              onClick={(e) => {
                e.stopPropagation()
                onBook?.(service.id)
              }}
              variant="primary"
              className="flex items-center gap-2"
            >
              <Calendar size={16} />
              Book Now
            </Button>
          )}
        </div>
      )
    }
  }

  const handleClick = () => {
    if (variant === 'selection' && onSelect) {
      onSelect(service.id)
    }
  }

  return (
    <div className={containerClasses} onClick={handleClick}>
      {renderBadges()}
      {renderImage()}
      
      <div className={variant === 'marketing' ? "p-6 flex flex-col flex-grow" : ""}>
        {renderHeader()}
        {renderContent()}
        {renderActions()}
      </div>

      {/* Inactive overlay for selection variant */}
      {variant !== 'marketing' && !service.isActive && (
        <div className="absolute inset-0 bg-slate-50 bg-opacity-75 rounded-3xl flex items-center justify-center">
          <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-sm font-medium">
            Currently Unavailable
          </span>
        </div>
      )}
    </div>
  )
}

export default ServiceCard