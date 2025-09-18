/**
 * Client Services Page
 * 
 * Service catalog focused on upselling and cross-selling to existing clients.
 * Shows personalized recommendations, bundles, and seasonal offers.
 */

'use client'

import React, { useState } from 'react'
import {
  Car,
  Star,
  Clock,
  Shield,
  Sparkles,
  Droplets,
  Award,
  TrendingUp,
  Gift,
  Zap,
  CheckCircle,
  ArrowRight,
  Percent,
  Calendar,
  Heart,
  Crown,
  Filter,
  Grid3X3,
  List,
  Search,
  Plus
} from 'lucide-react'
import ClientLayout from '@/shared/layouts/client/ClientLayout'

interface ServicesPageProps {
  user?: {
    name: string
    email: string
    loyaltyPoints: number
    membershipStatus: string
    lastService?: string
    preferences?: string[]
  }
}

type ViewMode = 'grid' | 'list'
type FilterType = 'all' | 'recommended' | 'popular' | 'premium' | 'add-ons'

const ServicesPage: React.FC<ServicesPageProps> = ({
  user = {
    name: 'Sarah',
    email: 'sarah@example.com',
    loyaltyPoints: 850,
    membershipStatus: 'Premium',
    lastService: 'Premium Detail',
    preferences: ['eco-friendly', 'premium']
  }
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Service data with personalization flags
  const services = [
    {
      id: 'basic',
      name: 'Basic Wash',
      price: 25,
      originalPrice: null,
      duration: '30 min',
      description: 'Essential exterior wash with soap and rinse',
      features: ['Exterior wash', 'Soap and rinse', 'Basic dry', 'Tire cleaning'],
      icon: Droplets,
      category: 'basic',
      popular: true,
      recommended: false,
      premium: false,
      discount: null,
      bookingCount: 12,
      lastBooked: '2024-01-10',
      rating: 4.2,
      reviews: 156,
      tags: ['quick', 'affordable', 'everyday']
    },
    {
      id: 'premium',
      name: 'Premium Detail',
      price: 72,
      originalPrice: 85,
      duration: '2 hours',
      description: 'Complete interior and exterior detailing service',
      features: ['Interior cleaning', 'Exterior detail', 'Premium products', 'Tire shine', 'Dashboard conditioning', 'Glass cleaning'],
      icon: Sparkles,
      category: 'premium',
      popular: true,
      recommended: true,
      premium: false,
      discount: 15,
      bookingCount: 3,
      lastBooked: '2024-01-15',
      rating: 4.8,
      reviews: 89,
      tags: ['thorough', 'premium', 'most-popular']
    },
    {
      id: 'express-wax',
      name: 'Express Wax',
      price: 45,
      originalPrice: null,
      duration: '45 min',
      description: 'Quick wash with protective wax coating',
      features: ['Wash & rinse', 'Wax application', 'Quick dry', 'Tire cleaning'],
      icon: Star,
      category: 'add-on',
      popular: false,
      recommended: true,
      premium: false,
      discount: null,
      bookingCount: 1,
      lastBooked: '2024-01-08',
      rating: 4.5,
      reviews: 67,
      tags: ['protection', 'shine', 'mid-range']
    },
    {
      id: 'ceramic',
      name: 'Ceramic Coating',
      price: 254,
      originalPrice: 299,
      duration: '4 hours',
      description: 'Premium paint protection with ceramic coating',
      features: ['Paint correction', 'Ceramic application', '2-year warranty', 'Hydrophobic finish', 'UV protection'],
      icon: Shield,
      category: 'premium',
      popular: false,
      recommended: true,
      premium: true,
      discount: 15,
      bookingCount: 0,
      lastBooked: null,
      rating: 4.9,
      reviews: 45,
      tags: ['protection', 'long-term', 'premium']
    },
    {
      id: 'eco-wash',
      name: 'Eco-Friendly Wash',
      price: 30,
      originalPrice: null,
      duration: '35 min',
      description: 'Environmentally conscious wash with biodegradable products',
      features: ['Eco-friendly products', 'Water-saving process', 'Exterior wash', 'Biodegradable soap'],
      icon: Heart,
      category: 'eco',
      popular: false,
      recommended: true,
      premium: false,
      discount: null,
      bookingCount: 2,
      lastBooked: '2024-01-12',
      rating: 4.6,
      reviews: 23,
      tags: ['eco-friendly', 'sustainable', 'green']
    }
  ]

  // Seasonal offers and bundles
  const offers = [
    {
      id: 'winter-bundle',
      title: 'Winter Protection Bundle',
      description: 'Premium Detail + Express Wax for ultimate winter protection',
      services: ['Premium Detail', 'Express Wax'],
      originalPrice: 117,
      bundlePrice: 95,
      savings: 22,
      validUntil: '2024-02-29',
      popular: true
    },
    {
      id: 'monthly-unlimited',
      title: 'Monthly Unlimited',
      description: 'Unlimited basic washes for one low monthly price',
      services: ['Basic Wash (Unlimited)'],
      originalPrice: 100,
      bundlePrice: 59,
      savings: 41,
      validUntil: 'Ongoing',
      popular: false
    }
  ]

  // Add-on services
  const addOns = [
    { id: 'interior-vacuum', name: 'Interior Vacuum', price: 15, duration: '10 min' },
    { id: 'tire-shine', name: 'Tire Shine', price: 10, duration: '5 min' },
    { id: 'air-freshener', name: 'Air Freshener', price: 5, duration: '2 min' },
    { id: 'headlight-restore', name: 'Headlight Restoration', price: 35, duration: '20 min' }
  ]

  const filteredServices = services.filter(service => {
    const matchesFilter = filter === 'all' || 
      (filter === 'recommended' && service.recommended) ||
      (filter === 'popular' && service.popular) ||
      (filter === 'premium' && service.premium) ||
      (filter === 'add-ons' && service.category === 'add-on')
    
    const matchesSearch = searchTerm === '' || 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesFilter && matchesSearch
  })

  const ServiceCard: React.FC<{ service: any; compact?: boolean }> = ({ service, compact = false }) => (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 ${compact ? 'flex items-center gap-4' : ''}`}>
      {/* Service Header */}
      <div className={`${compact ? 'flex-shrink-0' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
              <service.icon className="w-6 h-6 text-brand-600" />
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-1">
                {service.recommended && (
                  <span className="px-2 py-1 bg-brand-100 text-brand-700 text-xs rounded-full font-medium">
                    For You
                  </span>
                )}
                {service.popular && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                    Popular
                  </span>
                )}
                {service.premium && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Premium
                  </span>
                )}
                {service.discount && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                    {service.discount}% OFF
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Service Content */}
      <div className={`${compact ? 'flex-1' : ''}`}>
        {!compact && (
          <p className="text-gray-600 mb-4">{service.description}</p>
        )}
        
        {/* Features */}
        <div className={`mb-4 ${compact ? 'grid grid-cols-2 gap-1' : 'space-y-2'}`}>
          {service.features.slice(0, compact ? 4 : 6).map((feature: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className={`text-gray-700 ${compact ? 'text-sm' : ''}`}>{feature}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {service.duration}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            {service.rating} ({service.reviews})
          </div>
          {service.bookingCount > 0 && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Booked {service.bookingCount}x
            </div>
          )}
        </div>

        {/* Personalization */}
        {service.lastBooked && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-700">
              <strong>Last booked:</strong> {service.lastBooked}
              <button className="ml-2 text-blue-600 hover:text-blue-800 font-medium">
                Book again
              </button>
            </p>
          </div>
        )}

        {/* Pricing and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">${service.price}</span>
            {service.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${service.originalPrice}</span>
            )}
            {user.membershipStatus === 'Premium' && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                -10% Member
              </span>
            )}
          </div>
          
          <button className="bg-brand-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <ClientLayout user={user}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Services</h1>
          <p className="text-gray-600">Personalized recommendations based on your preferences and history</p>
        </div>

        {/* Special Offers */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Special Offers Just for You</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  {offer.popular && (
                    <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs rounded-full font-bold">
                      POPULAR
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-brand-100 mb-4">{offer.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl font-bold">${offer.bundlePrice}</div>
                  <div className="text-brand-200">
                    <span className="line-through">${offer.originalPrice}</span>
                    <div className="text-sm">Save ${offer.savings}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-200">Valid until {offer.validUntil}</span>
                  <button className="bg-white text-brand-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Get Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
              <option value="all">All Services</option>
              <option value="recommended">Recommended for You</option>
              <option value="popular">Popular</option>
              <option value="premium">Premium</option>
              <option value="add-ons">Add-ons</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-brand-100 text-brand-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-brand-100 text-brand-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Services Grid/List */}
        <div className={`mb-8 ${
          viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} compact={viewMode === 'list'} />
          ))}
        </div>

        {/* Add-ons Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Add-on Services</h2>
          <p className="text-gray-600 mb-6">Enhance your car wash with these additional services</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addOns.map((addon) => (
              <div key={addon.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-300 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                  <button className="text-brand-600 hover:text-brand-700">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>${addon.price}</span>
                  <span>{addon.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}

export default ServicesPage