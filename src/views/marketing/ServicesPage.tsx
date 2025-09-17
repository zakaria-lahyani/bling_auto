/**
 * Services Page
 * 
 * User-friendly services page with filtering, search, and backend-ready data structure.
 * Features category filters, search functionality, and responsive design.
 */
'use client'

import React, { useState, useMemo } from 'react'
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
  Zap
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
  
  // Newsletter signup handler (consistent with other pages)
  const handleNewsletterSignup = (email: string) => {
    console.log('Newsletter signup:', email)
    // TODO: Implement newsletter signup logic
  }

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
                              // Could add scroll to service or open modal
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
                  <ServiceCard key={service.id} service={service} />
                ) : (
                  <ServiceListItem key={service.id} service={service} />
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
    </MarketingLayout>
  )
}

// Service Card Component (Grid View)
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
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
          <Link
            href="/contact"
            className="w-full bg-brand-500 text-white py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors flex items-center justify-center gap-2"
          >
            Book This Service
            <ArrowRight size={16} />
          </Link>
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
const ServiceListItem: React.FC<{ service: Service }> = ({ service }) => {
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