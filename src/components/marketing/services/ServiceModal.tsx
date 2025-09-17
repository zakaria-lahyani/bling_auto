'use client'

import React from 'react'
import Link from 'next/link'
import { 
  X, 
  Star, 
  Clock, 
  ArrowRight, 
  Target, 
  CheckCircle, 
  Award, 
  Sparkles,
  DollarSign,
  MapPin,
  Car,
  Home,
  Users
} from 'lucide-react'
import type { Service } from '@/core/entities/service'

interface ServiceModalProps {
  service: Service
  isOpen: boolean
  onClose: () => void
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg sm:rounded-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header with Always-Visible CTA - Responsive */}
        <div className="sticky top-0 bg-white border-b border-border shadow-sm z-10">
          {/* Mobile Header Layout */}
          <div className="sm:hidden p-4 space-y-3">
            {/* Top Row: Image, Title, Close */}
            <div className="flex items-start gap-3">
              <img 
                src={service.image} 
                alt={service.name}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-content-primary truncate">{service.name}</h2>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-xs text-content-muted ml-1">({service.reviewCount})</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Bottom Row: Duration and Book Button */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-content-muted">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{service.duration}</span>
              </div>
              <Link
                href="/contact"
                className="bg-brand-500 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-brand-600 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl flex-1 justify-center"
                onClick={onClose}
              >
                Book ${service.price}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Desktop Header Layout */}
          <div className="hidden sm:flex items-center justify-between p-6">
            <div className="flex items-center gap-4 flex-1">
              <img 
                src={service.image} 
                alt={service.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-content-primary">{service.name}</h2>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm text-content-muted ml-1">({service.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-content-muted">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{service.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Desktop Action Buttons */}
            <div className="flex items-center gap-3 ml-6">
              <Link
                href="/contact"
                className="bg-brand-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-600 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
                onClick={onClose}
              >
                Book ${service.price}
                <ArrowRight size={18} />
              </Link>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Overview */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-content-primary mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-brand-500" />
                  Service Overview
                </h3>
                <p className="text-content-secondary leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-content-primary mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  What's Included
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-surface rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-content-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-content-primary mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  Key Benefits
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.benefits?.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <Award className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-content-secondary">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              {service.addOns && service.addOns.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-content-primary mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-500" />
                    Available Add-ons
                  </h3>
                  <div className="space-y-3">
                    {service.addOns.map((addon) => (
                      <div key={addon.id} className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
                        <div>
                          <div className="font-semibold text-content-primary">{addon.name}</div>
                          <div className="text-sm text-content-muted">{addon.description}</div>
                        </div>
                        <div className="text-lg font-bold text-brand-600">+${addon.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4 lg:space-y-6">
              {/* Pricing */}
              <div className="bg-brand-50 p-4 sm:p-6 rounded-xl">
                <h3 className="text-lg font-bold text-content-primary mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-brand-500" />
                  Pricing & Time
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-content-secondary">Service Price:</span>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-bold text-brand-600">
                        ${service.price}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-content-secondary">Duration:</span>
                    <span className="font-semibold">{service.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-content-secondary">Estimated Time:</span>
                    <span className="font-semibold">
                      {service.estimatedTime.min}-{service.estimatedTime.max} min
                    </span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-surface p-4 sm:p-6 rounded-xl">
                <h3 className="text-lg font-bold text-content-primary mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  Availability
                </h3>
                <div className="space-y-3">
                  {service.availability.mobile && (
                    <div className="flex items-center gap-3 p-3 bg-green-100 rounded-lg">
                      <Car className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium">Mobile Service</div>
                        <div className="text-sm text-content-muted">Available at your location</div>
                      </div>
                    </div>
                  )}
                  {service.availability.inShop && (
                    <div className="flex items-center gap-3 p-3 bg-blue-100 rounded-lg">
                      <Home className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">In-Shop Service</div>
                        <div className="text-sm text-content-muted">Available at our location</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Category & Stats */}
              <div className="bg-surface p-4 sm:p-6 rounded-xl">
                <h3 className="text-lg font-bold text-content-primary mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Service Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-content-secondary">Category:</span>
                    <span className="font-semibold text-brand-600">{service.category.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-content-secondary">Rating:</span>
                    <span className="font-semibold">{service.rating}/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-content-secondary">Reviews:</span>
                    <span className="font-semibold">{service.reviewCount}</span>
                  </div>
                  {service.popular && (
                    <div className="flex items-center gap-2 text-yellow-600 bg-yellow-100 p-2 rounded-lg">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">Most Popular</span>
                    </div>
                  )}
                  {service.featured && (
                    <div className="flex items-center gap-2 text-purple-600 bg-purple-100 p-2 rounded-lg">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-medium">Featured Service</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceModal