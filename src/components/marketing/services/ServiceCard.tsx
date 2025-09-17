'use client'

import React from 'react'
import Link from 'next/link'
import { Star, Clock, Eye, ArrowRight, CheckCircle, Home } from 'lucide-react'
import type { Service } from '@/core/entities/service'

interface ServiceCardProps {
  service: Service
  onViewDetails: (service: Service) => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewDetails }) => {
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all group h-full flex flex-col">
      {/* Badges */}
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
      
      {/* Image */}
      <div className="h-48 relative overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {service.originalPrice && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Save ${service.originalPrice - service.price}
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        {/* Header */}
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
        
        {/* Description */}
        <p className="text-content-secondary leading-relaxed mb-4 line-clamp-2">
          {service.shortDescription}
        </p>
        
        {/* Features */}
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
        
        {/* Action Buttons */}
        <div className="space-y-2 mt-auto">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewDetails(service)}
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
          {service.availability.mobile && (
            <div className="flex items-center justify-center gap-2 text-sm text-green-600">
              <Home className="w-4 h-4" />
              <span>Available at your location</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceCard