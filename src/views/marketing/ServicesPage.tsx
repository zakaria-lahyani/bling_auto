/**
 * Services Page
 * 
 * User-friendly services page with filtering, search, and backend-ready data structure.
 * Features category filters, search functionality, and responsive design.
 */
'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { 
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  MapPin,
  Home,
  Sparkles,
  Shield,
  Droplets,
  Palette,
  Wrench,
  Car,
  Zap,
  X,
  Eye,
  Award,
  Target,
  Timer,
  DollarSign,
  Users,
  Calendar
} from 'lucide-react'
import { MarketingLayout } from '@/shared/layouts/marketing'
import Link from 'next/link'
import { 
  allServices, 
  serviceCategories, 
  getServicesByCategory, 
  searchServices,
  type Service,
  type ServiceCategory 
} from '@/data/servicesData'

const ServicesPage = () => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showMobileOnly, setShowMobileOnly] = useState<boolean>(false)
  const [showPopularOnly, setShowPopularOnly] = useState<boolean>(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showServiceDetails, setShowServiceDetails] = useState<boolean>(false)
  
  // Newsletter signup handler (consistent with other pages)
  const handleNewsletterSignup = (email: string) => {
    console.log('Newsletter signup:', email)
    // TODO: Implement newsletter signup logic
  }

  // Service details handlers
  const openServiceDetails = (service: Service) => {
    setSelectedService(service)
    setShowServiceDetails(true)
    document.body.style.overflow = 'hidden' // Prevent background scroll
  }

  const closeServiceDetails = () => {
    setSelectedService(null)
    setShowServiceDetails(false)
    document.body.style.overflow = 'unset' // Restore scroll
  }

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeServiceDetails()
      }
    }

    if (showServiceDetails) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [showServiceDetails])

  // Combinable filter logic
  const filteredServices = useMemo(() => {
    let services: Service[]
    
    if (searchQuery) {
      // Search takes priority - search within all services
      services = searchServices(searchQuery)
    } else {
      // Start with category filtering
      services = getServicesByCategory(selectedCategory)
    }
    
    // Apply additional filters on top of base results
    if (showMobileOnly) {
      services = services.filter(service => service.availability.mobile)
    }
    
    if (showPopularOnly) {
      services = services.filter(service => service.popular)
    }
    
    if (showFeaturedOnly) {
      services = services.filter(service => service.featured)
    }
    
    return services
  }, [selectedCategory, searchQuery, showMobileOnly, showPopularOnly, showFeaturedOnly])
  
  // Calculate dynamic counts for each filter based on current selection
  const getFilterCounts = useMemo(() => {
    let baseServices: Service[]
    
    if (searchQuery) {
      baseServices = searchServices(searchQuery)
    } else {
      baseServices = getServicesByCategory(selectedCategory)
    }
    
    // Apply currently active filters to get intermediate results
    if (showMobileOnly) {
      baseServices = baseServices.filter(service => service.availability.mobile)
    }
    if (showPopularOnly) {
      baseServices = baseServices.filter(service => service.popular)
    }
    if (showFeaturedOnly) {
      baseServices = baseServices.filter(service => service.featured)
    }
    
    return {
      mobile: showMobileOnly ? baseServices.length : baseServices.filter(s => s.availability.mobile).length,
      popular: showPopularOnly ? baseServices.length : baseServices.filter(s => s.popular).length,
      featured: showFeaturedOnly ? baseServices.length : baseServices.filter(s => s.featured).length,
    }
  }, [selectedCategory, searchQuery, showMobileOnly, showPopularOnly, showFeaturedOnly])
  
  // Calculate category counts based on current special filters
  const getCategoryCounts = useMemo(() => {
    let baseServices = allServices
    
    // Apply special filters first
    if (showMobileOnly) {
      baseServices = baseServices.filter(service => service.availability.mobile)
    }
    if (showPopularOnly) {
      baseServices = baseServices.filter(service => service.popular)
    }
    if (showFeaturedOnly) {
      baseServices = baseServices.filter(service => service.featured)
    }
    
    // Count services in each category
    const counts: Record<string, number> = {}
    serviceCategories.forEach(category => {
      if (category.slug === 'all') {
        counts[category.slug] = baseServices.length
      } else {
        counts[category.slug] = baseServices.filter(service => service.category.slug === category.slug).length
      }
    })
    
    return counts
  }, [showMobileOnly, showPopularOnly, showFeaturedOnly])

  // Get category icon
  const getCategoryIcon = (iconName: string) => {
    const icons = {
      droplets: <Droplets className="w-4 h-4" />,
      sparkles: <Sparkles className="w-4 h-4" />,
      shield: <Shield className="w-4 h-4" />,
      palette: <Palette className="w-4 h-4" />,
      wrench: <Wrench className="w-4 h-4" />,
      car: <Car className="w-4 h-4" />,
      zap: <Zap className="w-4 h-4" />,
      grid: <Grid3X3 className="w-4 h-4" />
    }
    return icons[iconName as keyof typeof icons] || <Star className="w-4 h-4" />
  }

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <MarketingLayout
      header={{
        variant: 'default',
        showAuth: true
      }}
      footer={{
        showNewsletter: true,
        onNewsletterSignup: handleNewsletterSignup
      }}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block text-brand-200">Car Care Service</span>
            </h1>
            <p className="text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed mb-8">
              Search through {allServices.length} professional services, filter by category, 
              and book the perfect care for your vehicle.
            </p>
          </div>
          
          {/* Enhanced Search Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="relative mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-200 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search services... (e.g., 'ceramic coating', 'mobile wash', 'interior')" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-12 py-4 bg-white/90 border-0 rounded-xl text-lg text-content-primary placeholder-content-muted focus:outline-none focus:ring-4 focus:ring-white/30 transition-all backdrop-blur-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-content-muted hover:text-content-primary transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
                
                {/* Search Suggestions */}
                {searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-border z-50 max-h-60 overflow-y-auto">
                    {filteredServices.length > 0 ? (
                      <div className="p-2">
                        <div className="text-xs text-content-muted px-3 py-2 bg-surface rounded-lg mb-2">
                          {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                        </div>
                        {filteredServices.slice(0, 5).map((service) => (
                          <button
                            key={service.id}
                            onClick={() => {
                              setSearchQuery('')
                              openServiceDetails(service)
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-surface rounded-lg transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <img src={service.image} alt={service.name} className="w-10 h-10 rounded-lg object-cover" />
                              <div className="flex-1">
                                <div className="font-medium text-content-primary">{service.name}</div>
                                <div className="text-sm text-content-muted">${service.price} • {service.duration}</div>
                              </div>
                              {service.availability.mobile && (
                                <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                  Mobile
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                        {filteredServices.length > 5 && (
                          <div className="text-center py-2 text-sm text-content-muted border-t border-border mt-2">
                            +{filteredServices.length - 5} more services
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-content-muted">
                        <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <div className="text-sm">No services found for "{searchQuery}"</div>
                        <div className="text-xs mt-1">Try searching for "wash", "detail", or "mobile"</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                    <CheckCircle className="w-6 h-6 text-green-300" />
                  </div>
                  <div className="text-sm text-brand-100">{allServices.length} Services</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                    <Car className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="text-sm text-brand-100">Mobile Available</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                    <Star className="w-6 h-6 text-yellow-300 fill-current" />
                  </div>
                  <div className="text-sm text-brand-100">4.5+ Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Filters Section */}
      <section className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Filter Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-content-primary" />
              <h3 className="text-lg font-semibold text-content-primary">Filter Services</h3>
              {(selectedCategory !== 'all' || showMobileOnly || showPopularOnly || showFeaturedOnly || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setShowMobileOnly(false)
                    setShowPopularOnly(false)
                    setShowFeaturedOnly(false)
                    setSearchQuery('')
                  }}
                  className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
                >
                  Clear all filters
                  <span className="w-4 h-4 bg-brand-100 rounded-full flex items-center justify-center text-xs">✕</span>
                </button>
              )}
            </div>
            
            {/* View Controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-content-muted hidden sm:block">View:</span>
              <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'text-content-muted hover:text-content-primary hover:bg-white'
                  }`}
                  title="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'text-content-muted hover:text-content-primary hover:bg-white'
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            {serviceCategories.map((category) => {
              const isSelected = selectedCategory === category.slug
              const dynamicCount = getCategoryCounts[category.slug] || 0
              const isDisabled = dynamicCount === 0
              
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.slug)
                  }}
                  disabled={isDisabled}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? 'bg-brand-500 text-white shadow-lg scale-105'
                      : isDisabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      : 'bg-surface text-content-secondary border border-border hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700'
                  }`}
                >
                  <div className={`flex items-center justify-center w-5 h-5 ${
                    isSelected ? 'text-white' : isDisabled ? 'text-gray-400' : 'text-brand-500'
                  }`}>
                    {getCategoryIcon(category.icon)}
                  </div>
                  <span>{category.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : isDisabled
                      ? 'bg-gray-200 text-gray-500'
                      : 'bg-brand-100 text-brand-600'
                  }`}>
                    {dynamicCount}
                  </span>
                </button>
              )
            })}
          </div>
          
          {/* Special Filters */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setShowMobileOnly(!showMobileOnly)
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                showMobileOnly
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-surface text-content-secondary border border-border hover:border-green-300 hover:bg-green-50 hover:text-green-700'
              }`}
              title="Show only services available at your location"
            >
              <Car className="w-4 h-4" />
              <span>Mobile Available</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                showMobileOnly
                  ? 'bg-white/20 text-white'
                  : 'bg-green-100 text-green-600'
              }`}>
                {getFilterCounts.mobile}
              </span>
            </button>
            
            <button
              onClick={() => {
                setShowPopularOnly(!showPopularOnly)
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                showPopularOnly
                  ? 'bg-yellow-500 text-white shadow-lg'
                  : 'bg-surface text-content-secondary border border-border hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Most Popular</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                showPopularOnly
                  ? 'bg-white/20 text-white'
                  : 'bg-yellow-100 text-yellow-600'
              }`}>
                {getFilterCounts.popular}
              </span>
            </button>
            
            <button
              onClick={() => {
                setShowFeaturedOnly(!showFeaturedOnly)
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                showFeaturedOnly
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-surface text-content-secondary border border-border hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Featured</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                showFeaturedOnly
                  ? 'bg-white/20 text-white'
                  : 'bg-purple-100 text-purple-600'
              }`}>
                {getFilterCounts.featured}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Results Header */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-content-primary">
                {searchQuery ? (
                  <>Search Results for "{searchQuery}"</>
                ) : (
                  (() => {
                    const filters = []
                    if (showFeaturedOnly) filters.push('Featured')
                    if (showPopularOnly) filters.push('Popular')
                    if (showMobileOnly) filters.push('Mobile')
                    
                    const categoryName = selectedCategory === 'all' 
                      ? 'All Services' 
                      : serviceCategories.find(cat => cat.slug === selectedCategory)?.name
                    
                    if (filters.length > 0) {
                      return `${filters.join(' + ')} ${categoryName}`
                    }
                    return categoryName
                  })()
                )}
              </h2>
              <p className="text-content-muted mt-1">
                {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                {(() => {
                  const activeFilters = []
                  if (showFeaturedOnly) activeFilters.push('Featured')
                  if (showPopularOnly) activeFilters.push('Popular')
                  if (showMobileOnly) activeFilters.push('Mobile Available')
                  
                  return activeFilters.length > 0 ? ` • ${activeFilters.join(', ')}` : ''
                })()}
              </p>
            </div>
            {filteredServices.length > 0 && (
              <div className="text-sm text-content-muted">
                Showing {filteredServices.length} of {allServices.length} services
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Grid/List */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-content-primary mb-2">
                No services found
              </h3>
              <p className="text-content-muted mb-6">
                {searchQuery 
                  ? `No services match "${searchQuery}". Try adjusting your search terms.`
                  : 'No services available in this category.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setShowMobileOnly(false)
                }}
                className="px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 transition-colors"
              >
                View All Services
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
            }>
              {filteredServices.map((service) => (
                viewMode === 'grid' ? (
                  <ServiceCard key={service.id} service={service} onViewDetails={openServiceDetails} />
                ) : (
                  <ServiceListItem key={service.id} service={service} onViewDetails={openServiceDetails} />
                )
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call-to-Action Section */}
      {filteredServices.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Book Your Service?
            </h2>
            <p className="text-xl text-brand-100 mb-8">
              Choose from our professional car care services and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-brand-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
              >
                Book Now
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-brand-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Service Details Modal */}
      {showServiceDetails && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg sm:rounded-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header with Always-Visible CTA - Responsive */}
            <div className="sticky top-0 bg-white border-b border-border shadow-sm z-10">
              {/* Mobile Header Layout */}
              <div className="sm:hidden p-4 space-y-3">
                {/* Top Row: Image, Title, Close */}
                <div className="flex items-start gap-3">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-content-primary truncate">{selectedService.name}</h2>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(selectedService.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-xs text-content-muted ml-1">({selectedService.reviewCount})</span>
                    </div>
                  </div>
                  <button
                    onClick={closeServiceDetails}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Bottom Row: Duration and Book Button */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-content-muted">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{selectedService.duration}</span>
                  </div>
                  <Link
                    href="/contact"
                    className="bg-brand-500 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-brand-600 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl flex-1 justify-center"
                    onClick={closeServiceDetails}
                  >
                    Book ${selectedService.price}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Desktop Header Layout */}
              <div className="hidden sm:flex items-center justify-between p-6">
                <div className="flex items-center gap-4 flex-1">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-content-primary">{selectedService.name}</h2>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(selectedService.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                            <span className="text-sm text-content-muted ml-1">({selectedService.reviewCount} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1 text-content-muted">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{selectedService.duration}</span>
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
                    onClick={closeServiceDetails}
                  >
                    Book ${selectedService.price}
                    <ArrowRight size={18} />
                  </Link>
                  <button
                    onClick={closeServiceDetails}
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
                      {selectedService.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.tags.map((tag, idx) => (
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
                      {selectedService.features.map((feature, idx) => (
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
                      {selectedService.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                          <Award className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base text-content-secondary">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons */}
                  {selectedService.addOns && selectedService.addOns.length > 0 && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-content-primary mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-brand-500" />
                        Available Add-ons
                      </h3>
                      <div className="space-y-3">
                        {selectedService.addOns.map((addon) => (
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
                            ${selectedService.price}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-content-secondary">Duration:</span>
                        <span className="font-semibold">{selectedService.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-content-secondary">Estimated Time:</span>
                        <span className="font-semibold">
                          {selectedService.estimatedTime.min}-{selectedService.estimatedTime.max} min
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
                      {selectedService.availability.mobile && (
                        <div className="flex items-center gap-3 p-3 bg-green-100 rounded-lg">
                          <Car className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="font-medium">Mobile Service</div>
                            <div className="text-sm text-content-muted">Available at your location</div>
                          </div>
                        </div>
                      )}
                      {selectedService.availability.inShop && (
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
                        <span className="font-semibold text-brand-600">{selectedService.category.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-content-secondary">Rating:</span>
                        <span className="font-semibold">{selectedService.rating}/5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-content-secondary">Reviews:</span>
                        <span className="font-semibold">{selectedService.reviewCount}</span>
                      </div>
                      {selectedService.popular && (
                        <div className="flex items-center gap-2 text-yellow-600 bg-yellow-100 p-2 rounded-lg">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">Most Popular</span>
                        </div>
                      )}
                      {selectedService.featured && (
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
      )}
    </MarketingLayout>
  )
}

// Service Card Component (Grid View)
const ServiceCard: React.FC<{ service: Service; onViewDetails: (service: Service) => void }> = ({ service, onViewDetails }) => {
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all group h-full flex flex-col">
      {/* Badges */}
      <div className="flex">
        {service.popular && (
          <div className="bg-brand-500 text-white text-center py-2 px-4 font-semibold text-sm flex-1">
            🔥 Most Popular
          </div>
        )}
        {service.featured && !service.popular && (
          <div className="bg-purple-500 text-white text-center py-2 px-4 font-semibold text-sm flex-1">
            ⭐ Featured
          </div>
        )}
      </div>
      
      {/* Service Image */}
      <div className={`relative overflow-hidden ${service.popular || service.featured ? 'h-48' : 'h-56'}`}>
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          {service.availability.mobile && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Car className="w-3 h-3" />
              Mobile
            </div>
          )}
        </div>
      </div>
      
      {/* Service Details */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-content-primary leading-tight mb-1">
              {service.name}
            </h3>
            <div className="flex items-center gap-2">
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

// Service List Item Component (List View)
const ServiceListItem: React.FC<{ service: Service; onViewDetails: (service: Service) => void }> = ({ service, onViewDetails }) => {
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
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {service.popular && (
              <div className="bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                🔥 Most Popular
              </div>
            )}
            {service.featured && !service.popular && (
              <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                ⭐ Featured
              </div>
            )}
            {service.availability.mobile && (
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Car className="w-3 h-3" />
                Mobile
              </div>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-content-primary mb-2">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-content-muted">({service.reviewCount} reviews)</span>
                    <div className="flex items-center gap-1 text-sm text-content-muted">
                      <Clock className="w-4 h-4" />
                      {service.duration}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {service.originalPrice && (
                    <div className="text-lg text-content-muted line-through">
                      ${service.originalPrice}
                    </div>
                  )}
                  <div className="text-3xl font-bold text-brand-600">
                    ${service.price}
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-content-secondary leading-relaxed mb-4">
                {service.description}
              </p>
              
              {/* Features */}
              <div className="grid md:grid-cols-2 gap-2 mb-4">
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

export default ServicesPage