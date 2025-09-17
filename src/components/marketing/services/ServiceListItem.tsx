'use client'

import React from 'react'
import Link from 'next/link'
import { Star, Clock, Eye, ArrowRight, CheckCircle, Home } from 'lucide-react'
import { Service } from '@/data/servicesData'

interface ServiceListItemProps {
  service: Service
  onViewDetails: (service: Service) => void
}

const ServiceListItem: React.FC<ServiceListItemProps> = ({ service, onViewDetails }) => {
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-64 h-48 md:h-auto relative flex-shrink-0">
          <img 
            src={service.image} 
            alt={service.name}
            className="w-full h-full object-cover"
          />
          {service.originalPrice && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Save ${service.originalPrice - service.price}
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute bottom-4 left-4 space-y-2">
            {service.popular && (
              <div className="bg-brand-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                🔥 Popular
              </div>
            )}
            {service.featured && (
              <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                ✨ Featured
              </div>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Main Content */}
            <div className="flex-1 space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-content-primary mb-2 hover:text-brand-600 transition-colors">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-content-muted ml-1">({service.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-content-muted">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {service.originalPrice && (
                    <div className="text-sm text-content-muted line-through">
                      ${service.originalPrice}
                    </div>
                  )}
                  <div className="text-3xl font-bold text-brand-600">
                    ${service.price}
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-content-secondary leading-relaxed">
                {service.description}
              </p>
              
              {/* Features */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-content-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Area */}
            <div className="lg:w-48 flex flex-col gap-3">
              <button
                onClick={() => onViewDetails(service)}
                className="w-full bg-surface text-content-primary border border-border py-3 px-6 rounded-xl font-medium hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 transition-colors flex items-center justify-center gap-2"
              >
                <Eye size={16} />
                View Details
              </button>
              
              <Link
                href="/contact"
                className="w-full bg-brand-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-brand-600 transition-colors flex items-center justify-center gap-2"
              >
                Book Service
                <ArrowRight size={16} />
              </Link>
              
              {service.availability.mobile && (
                <div className="flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 py-2 px-3 rounded-lg">
                  <Home className="w-4 h-4" />
                  <span>Mobile Available</span>
                </div>
              )}
              
              {service.addOns && service.addOns.length > 0 && (
                <div className="text-center">
                  <div className="text-sm text-content-muted mb-2">Add-ons available</div>
                  <div className="text-xs text-brand-600">Starting at +${Math.min(...service.addOns.map(addon => addon.price))}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceListItem