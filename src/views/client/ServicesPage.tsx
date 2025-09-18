/**
 * Modern Client Services Page
 * Premium service catalog with glassmorphism design and smooth animations
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
  Plus,
  Flame,
  Users,
  Timer,
  ArrowUpRight,
  Bookmark,
  ThumbsUp
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

  // Enhanced service data with modern visual properties
  const services = [
    {
      id: 'basic',
      name: 'Essential Wash',
      price: 25,
      originalPrice: null,
      duration: '30 min',
      description: 'Perfect for regular maintenance with premium soap and care',
      features: ['Exterior wash', 'Premium soap', 'Spot-free rinse', 'Basic dry', 'Tire cleaning'],
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
      tags: ['quick', 'affordable', 'everyday'],
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      popularity: '2.1k+ bookings'
    },
    {
      id: 'premium',
      name: 'Premium Detail',
      price: 72,
      originalPrice: 85,
      duration: '2 hours',
      description: 'Complete transformation inside and out with professional-grade products',
      features: ['Interior deep clean', 'Exterior detail', 'Premium products', 'Tire shine', 'Dashboard conditioning', 'Glass cleaning'],
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
      tags: ['thorough', 'premium', 'most-popular'],
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      popularity: '1.8k+ bookings'
    },
    {
      id: 'express-wax',
      name: 'Express Shine',
      price: 45,
      originalPrice: null,
      duration: '45 min',
      description: 'Quick wash with lasting protection and premium shine',
      features: ['Wash & rinse', 'Wax application', 'Quick dry', 'Wheel clean', 'Tire shine'],
      icon: Zap,
      category: 'add-on',
      popular: false,
      recommended: true,
      premium: false,
      discount: null,
      bookingCount: 1,
      lastBooked: '2024-01-08',
      rating: 4.5,
      reviews: 67,
      tags: ['protection', 'shine', 'mid-range'],
      gradient: 'from-amber-500 to-amber-600',
      bgGradient: 'from-amber-50 to-amber-100',
      popularity: '980+ bookings'
    },
    {
      id: 'ceramic',
      name: 'Ceramic Shield',
      price: 254,
      originalPrice: 299,
      duration: '4 hours',
      description: 'Ultimate protection with ceramic coating technology',
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
      tags: ['protection', 'long-term', 'premium'],
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      popularity: '450+ bookings'
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
      tags: ['eco-friendly', 'sustainable', 'green'],
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      popularity: '320+ bookings'
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

  const ServiceCard: React.FC<{ service: any; compact?: boolean; index?: number }> = ({ service, compact = false, index = 0 }) => (
    <div 
      className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02] ${
        compact ? 'flex items-center gap-6' : ''
      } bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-gray-500/20`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-30`}></div>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className={`relative p-4 sm:p-6 md:p-8 ${compact ? 'flex items-center gap-4 sm:gap-6 w-full' : ''}`}>
        {/* Service Header */}
        <div className={`${compact ? 'flex-shrink-0' : 'mb-4 sm:mb-6'}`}>
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`relative p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-xl shadow-${service.gradient.split('-')[1]}-500/25 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-white" />
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                  {service.recommended && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs rounded-full font-medium shadow-lg">
                      <Crown className="w-3 h-3" />
                      For You
                    </span>
                  )}
                  {service.popular && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs rounded-full font-medium shadow-lg">
                      <Flame className="w-3 h-3" />
                      Popular
                    </span>
                  )}
                  {service.premium && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs rounded-full font-medium shadow-lg">
                      <Award className="w-3 h-3" />
                      Premium
                    </span>
                  )}
                  {service.discount && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full font-medium shadow-lg animate-pulse">
                      <Zap className="w-3 h-3" />
                      {service.discount}% OFF
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-brand-600 transition-colors">{service.name}</h3>
                {!compact && (
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
                )}
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Service Content */}
        <div className={`${compact ? 'flex-1' : ''} space-y-4`}>
          
          {/* Features */}
          <div className={`${compact ? 'grid grid-cols-2 gap-2' : 'space-y-2'}`}>
            {service.features.slice(0, compact ? 4 : 5).map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className={`text-gray-700 ${compact ? 'text-sm' : ''}`}>{feature}</span>
              </div>
            ))}
          </div>

          {/* Rating and Social Proof */}
          <div className="flex items-center gap-6 py-2">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700 ml-1">{service.rating}</span>
              <span className="text-sm text-gray-500">({service.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>{service.popularity}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Timer className="w-4 h-4" />
              <span>{service.duration}</span>
            </div>
          </div>

          {/* Personalization */}
          {service.lastBooked && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 backdrop-blur-sm border border-blue-200/50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Last booked: {service.lastBooked}</p>
                  <p className="text-xs text-blue-600">You loved this service!</p>
                </div>
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm">
                  <ThumbsUp className="w-4 h-4" />
                  Book Again
                </button>
              </div>
            </div>
          )}

          {/* Pricing and CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">${service.price}</span>
              {service.originalPrice && (
                <span className="text-sm sm:text-base md:text-lg text-gray-500 line-through">${service.originalPrice}</span>
              )}
              {user.membershipStatus === 'Premium' && (
                <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs rounded-full font-medium shadow-lg">
                  -10% Member
                </span>
              )}
            </div>
            
            <button className="group flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-semibold hover:from-brand-600 hover:to-brand-700 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-brand-500/25 hover:shadow-2xl hover:shadow-brand-500/40 text-sm sm:text-base">
              <span>Book Now</span>
              <ArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <ClientLayout user={user}>
      <div className="space-y-8">
        
        {/* Modern Header with Glassmorphism */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl px-6 py-3 mb-6">
            <Car className="w-6 h-6 text-brand-600" />
            <span className="text-brand-700 font-semibold">Premium Car Care</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Our Services
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized recommendations based on your preferences and history
          </p>
        </div>

        {/* Enhanced Special Offers */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Special Offers</h2>
              <p className="text-sm sm:text-base text-gray-600">Exclusive deals crafted just for you</p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {offers.map((offer, index) => (
              <div 
                key={offer.id} 
                className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-purple-600"></div>
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>
                
                <div className="relative p-6 sm:p-8 text-white">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Gift className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                      <div>
                        <h3 className="text-lg sm:text-2xl font-bold">{offer.title}</h3>
                        <p className="text-sm sm:text-base text-white/80">{offer.description}</p>
                      </div>
                    </div>
                    {offer.popular && (
                      <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-sm rounded-full font-bold shadow-lg animate-bounce">
                        POPULAR
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 sm:gap-6 mb-6">
                    <div>
                      <div className="text-2xl sm:text-4xl font-bold">${offer.bundlePrice}</div>
                      <div className="text-white/70">
                        <span className="line-through text-sm sm:text-base">${offer.originalPrice}</span>
                        <span className="ml-2 text-yellow-300 font-semibold text-sm sm:text-base">Save ${offer.savings}</span>
                      </div>
                    </div>
                    <div className="flex-1 text-right">
                      <div className="text-xs sm:text-sm text-white/70">Valid until</div>
                      <div className="font-semibold text-sm sm:text-base">{offer.validUntil}</div>
                    </div>
                  </div>
                  
                  <button className="group w-full bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-semibold hover:bg-white hover:text-brand-600 transition-all duration-300 border border-white/30 hover:border-white flex items-center justify-center gap-2">
                    <span>Claim Offer</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Filters and Search */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-1">
              {/* Enhanced Search Bar */}
              <div className="relative group flex-1 max-w-md">
                <Search className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 group-hover:text-gray-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl text-xs sm:text-sm placeholder-gray-400 focus:bg-white/80 focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/30 focus:outline-none transition-all duration-300 hover:bg-white/70"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              {/* Enhanced Filter Dropdown */}
              <div className="relative group">
                <Filter className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 group-hover:text-gray-600 transition-colors" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as FilterType)}
                  className="pl-10 sm:pl-12 pr-8 sm:pr-10 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl text-xs sm:text-sm focus:bg-white/80 focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/30 focus:outline-none transition-all duration-300 hover:bg-white/70 appearance-none cursor-pointer"
                >
                  <option value="all">All Services</option>
                  <option value="recommended">✨ Recommended for You</option>
                  <option value="popular">🔥 Popular</option>
                  <option value="premium">👑 Premium</option>
                  <option value="add-ons">➕ Add-ons</option>
                </select>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            {/* Enhanced View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100/60 backdrop-blur-sm rounded-xl p-1 border border-white/20">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-white/60'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-white/60'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(filter !== 'all' || searchTerm) && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/20">
              <span className="text-sm text-gray-600">Active filters:</span>
              {filter !== 'all' && (
                <span className="px-3 py-1 bg-brand-100 text-brand-700 text-xs rounded-full font-medium flex items-center gap-1">
                  {filter === 'recommended' && '✨ Recommended'}
                  {filter === 'popular' && '🔥 Popular'}
                  {filter === 'premium' && '👑 Premium'}
                  {filter === 'add-ons' && '➕ Add-ons'}
                  <button onClick={() => setFilter('all')} className="text-brand-500 hover:text-brand-600">
                    ×
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium flex items-center gap-1">
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="text-purple-500 hover:text-purple-600">
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Services Grid/List */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Services</h2>
              <p className="text-gray-600">
                {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                {filter !== 'all' && ` in ${filter}`}
              </p>
            </div>
          </div>
          
          <div className={`${
            viewMode === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-6'
          }`}>
            {filteredServices.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                compact={viewMode === 'list'} 
                index={index}
              />
            ))}
          </div>
          
          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {
                  setFilter('all')
                  setSearchTerm('')
                }}
                className="bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Add-ons Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-3xl p-8 border border-gray-200/50">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 to-brand-500/10 backdrop-blur-sm rounded-2xl px-6 py-3 mb-6">
              <Plus className="w-6 h-6 text-purple-600" />
              <span className="text-purple-700 font-semibold">Service Add-ons</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Enhance Your Experience</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Add these premium touches to make your car wash even more comprehensive
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div 
                key={addon.id} 
                className="group bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-brand-100 group-hover:from-purple-200 group-hover:to-brand-200 transition-colors">
                    <Plus className="w-6 h-6 text-purple-600" />
                  </div>
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors group-hover:scale-110 transform duration-300">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {addon.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">${addon.price}</span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{addon.duration}</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-50 to-brand-50 text-purple-700 py-3 rounded-xl font-semibold hover:from-purple-100 hover:to-brand-100 transition-all duration-300 border border-purple-200/50 group-hover:shadow-lg">
                  Add to Service
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-4">
              💡 <strong>Pro Tip:</strong> Bundle multiple add-ons for additional savings
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-brand-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-purple-700 hover:to-brand-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25">
              Create Custom Package
            </button>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}

export default ServicesPage