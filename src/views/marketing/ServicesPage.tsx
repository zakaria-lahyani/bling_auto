'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { MarketingLayout } from '@/shared/layouts/marketing'
import { 
  allServices, 
  serviceCategories, 
  getServicesByCategory, 
  searchServices,
  Service 
} from '@/data/servicesData'
import {
  ServiceModal,
  SearchAndFilters,
  ServiceGrid
} from '@/components/marketing/services'

const ServicesPage = () => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showMobileOnly, setShowMobileOnly] = useState<boolean>(false)
  const [showPopularOnly, setShowPopularOnly] = useState<boolean>(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false)
  
  // Modal state
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showServiceDetails, setShowServiceDetails] = useState<boolean>(false)
  
  // Search suggestions state
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

  // Handle keyboard events for modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeServiceDetails()
      }
    }

    if (showServiceDetails) {
      document.addEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [showServiceDetails])

  // Generate search suggestions
  useEffect(() => {
    if (searchQuery.length > 0) {
      const suggestions = new Set<string>()
      
      allServices.forEach(service => {
        // Add service names that match
        if (service.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          suggestions.add(service.name)
        }
        
        // Add matching tags
        service.tags.forEach(tag => {
          if (tag.toLowerCase().includes(searchQuery.toLowerCase())) {
            suggestions.add(tag)
          }
        })
        
        // Add category names that match
        if (service.category.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          suggestions.add(service.category.name)
        }
      })
      
      setSearchSuggestions(Array.from(suggestions).slice(0, 8))
      setShowSuggestions(true)
    } else {
      setSearchSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false)
    if (showSuggestions) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showSuggestions])


  // Filter and search logic with combinable filters
  const filteredServices = useMemo(() => {
    let services: Service[]
    
    // Start with search or category
    if (searchQuery) {
      services = searchServices(searchQuery)
    } else {
      services = getServicesByCategory(selectedCategory)
    }
    
    // Apply additional filters
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

  // Dynamic count calculations for filters
  const getCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    
    serviceCategories.forEach(category => {
      let categoryServices = category.slug === 'all' ? allServices : getServicesByCategory(category.slug)
      
      // Apply current active filters to get dynamic counts
      if (showMobileOnly) {
        categoryServices = categoryServices.filter(service => service.availability.mobile)
      }
      if (showPopularOnly) {
        categoryServices = categoryServices.filter(service => service.popular)
      }
      if (showFeaturedOnly) {
        categoryServices = categoryServices.filter(service => service.featured)
      }
      
      counts[category.slug] = categoryServices.length
    })
    
    return counts
  }, [showMobileOnly, showPopularOnly, showFeaturedOnly])

  const getFilterCounts = useMemo(() => {
    let baseServices = searchQuery ? searchServices(searchQuery) : getServicesByCategory(selectedCategory)
    
    return {
      mobile: baseServices.filter(service => 
        service.availability.mobile &&
        (!showPopularOnly || service.popular) &&
        (!showFeaturedOnly || service.featured)
      ).length,
      popular: baseServices.filter(service => 
        service.popular &&
        (!showMobileOnly || service.availability.mobile) &&
        (!showFeaturedOnly || service.featured)
      ).length,
      featured: baseServices.filter(service => 
        service.featured &&
        (!showMobileOnly || service.availability.mobile) &&
        (!showPopularOnly || service.popular)
      ).length
    }
  }, [selectedCategory, searchQuery, showMobileOnly, showPopularOnly, showFeaturedOnly])

  // Modal handlers
  const openServiceDetails = (service: Service) => {
    setSelectedService(service)
    setShowServiceDetails(true)
  }

  const closeServiceDetails = () => {
    setShowServiceDetails(false)
    setTimeout(() => setSelectedService(null), 300)
  }

  // Search handlers
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    if (query) {
      setSelectedCategory('all')
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
  }

  // Filter handlers
  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug)
    setSearchQuery('')
  }

  const handleMobileToggle = () => {
    setShowMobileOnly(!showMobileOnly)
  }

  const handlePopularToggle = () => {
    setShowPopularOnly(!showPopularOnly)
  }

  const handleFeaturedToggle = () => {
    setShowFeaturedOnly(!showFeaturedOnly)
  }

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode)
  }

  return (
    <MarketingLayout header={{ variant: 'default', showAuth: true }}>
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
          
          {/* Quick Stats */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-3 backdrop-blur-sm">
                  <div className="w-8 h-8 text-green-300">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{allServices.length}</div>
                <div className="text-sm text-brand-100">Professional Services</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-3 backdrop-blur-sm">
                  <div className="w-8 h-8 text-blue-300">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">Mobile</div>
                <div className="text-sm text-brand-100">Service Available</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-3 backdrop-blur-sm">
                  <div className="w-8 h-8 text-yellow-300 fill-current">
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">4.7+</div>
                <div className="text-sm text-brand-100">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search and Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          searchSuggestions={searchSuggestions}
          showSuggestions={showSuggestions}
          onSuggestionClick={handleSuggestionClick}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          showMobileOnly={showMobileOnly}
          onMobileToggle={handleMobileToggle}
          showPopularOnly={showPopularOnly}
          onPopularToggle={handlePopularToggle}
          showFeaturedOnly={showFeaturedOnly}
          onFeaturedToggle={handleFeaturedToggle}
          serviceCategories={serviceCategories}
          categoryCounts={getCategoryCounts}
          filterCounts={getFilterCounts}
        />

        {/* Services Grid */}
        <ServiceGrid
          services={filteredServices}
          viewMode={viewMode}
          onViewDetails={openServiceDetails}
          searchQuery={searchQuery}
        />

          {/* Service Details Modal */}
          {selectedService && (
            <ServiceModal
              service={selectedService}
              isOpen={showServiceDetails}
              onClose={closeServiceDetails}
            />
          )}
        </div>
      </div>

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
                <div className="w-5 h-5">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
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

export default ServicesPage