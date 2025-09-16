'use client'

import React from 'react'
import { Clock, MapPin, Star, Calendar } from 'lucide-react'
import { Button } from '@/shared/components/ui'
import type { ServiceCardProps } from '../types'

export function ServiceCard({ 
  service, 
  onSelect, 
  onBook, 
  showBookButton = true, 
  isSelected = false 
}: ServiceCardProps) {
  return (
    <div 
      className={`
        bg-white border rounded-3xl p-6 transition-all duration-200 hover:shadow-lg cursor-pointer
        ${isSelected ? 'border-teal-600 ring-2 ring-teal-100' : 'border-slate-200 hover:border-slate-300'}
      `}
      onClick={() => onSelect?.(service.id)}
    >
      {/* Service Image */}
      {service.image && (
        <div className="w-full h-48 rounded-2xl overflow-hidden mb-4">
          <img 
            src={service.image} 
            alt={service.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Service Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-slate-900">{service.name}</h3>
          {service.isPopular && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
              <Star size={12} fill="currentColor" />
              Popular
            </span>
          )}
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
      </div>

      {/* Service Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock size={16} />
          <span>Duration: {service.duration}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin size={16} />
          <span>{service.availabilityDisplay}</span>
        </div>

        {service.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {service.categories.map((category) => (
              <span 
                key={category}
                className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Price and Action */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-slate-900">{service.priceDisplay}</div>
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

      {/* Inactive overlay */}
      {!service.isActive && (
        <div className="absolute inset-0 bg-slate-50 bg-opacity-75 rounded-3xl flex items-center justify-center">
          <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-sm font-medium">
            Currently Unavailable
          </span>
        </div>
      )}
    </div>
  )
}