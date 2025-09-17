/**
 * Example: ServicesPage with SSG/ISR Support
 * 
 * This version can work with both client-side data loading
 * and server-side static generation with initial data.
 */

'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { MarketingLayout } from '@/shared/layouts/marketing'
import { 
  getServices, 
  getServiceCategories,
  type Service, 
  type ServiceCategory,
  type ServicesPageData 
} from '@/lib/data'
import {
  ServiceModal,
  SearchAndFilters,
  ServiceGrid
} from '@/components/marketing/services'

interface ServicesPageProps {
  initialData?: ServicesPageData
}

const ServicesPageWithSSG = ({ initialData }: ServicesPageProps) => {
  // Data state - initialize with SSG data if available
  const [services, setServices] = useState<Service[]>(initialData?.services || [])
  const [categories, setCategories] = useState<ServiceCategory[]>(initialData?.categories || [])
  const [loading, setLoading] = useState(!initialData)
  const [error, setError] = useState<string | null>(null)
  
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

  // Load initial data only if not provided by SSG
  useEffect(() => {
    if (!initialData) {
      loadInitialData()
    }
  }, [initialData])

  // Load data when filters change
  useEffect(() => {
    loadFilteredServices()
  }, [selectedCategory, searchQuery, showMobileOnly, showPopularOnly, showFeaturedOnly])

  const loadInitialData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [servicesData, categoriesData] = await Promise.all([
        getServices(),
        getServiceCategories()
      ])
      
      setServices(servicesData)
      setCategories(categoriesData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
      console.error('Failed to load initial data:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadFilteredServices = async () => {
    try {
      // Build search parameters
      const params: any = {}
      
      if (searchQuery) {
        params.query = searchQuery
      }
      
      if (selectedCategory && selectedCategory !== 'all') {
        params.category = selectedCategory
      }
      
      if (showFeaturedOnly) {
        params.featured = true
      }
      
      if (showPopularOnly) {
        params.popular = true
      }
      
      if (showMobileOnly) {
        params.availability = ['mobile']
      }

      const filteredServices = await getServices(params)
      setServices(filteredServices)
    } catch (err) {
      console.error('Failed to load filtered services:', err)
      // Don't show error for filter operations, just keep previous data
    }
  }

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
    if (searchQuery.length > 0 && services.length > 0) {
      const suggestions = new Set<string>()
      
      services.forEach(service => {
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
  }, [searchQuery, services])

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false)
    if (showSuggestions) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
    return undefined
  }, [showSuggestions])

  // Services are already filtered by the data layer
  const filteredServices = services

  // Dynamic count calculations for filters
  const getCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    
    categories.forEach(category => {
      // Use the serviceCount from the category data
      counts[category.slug] = category.serviceCount || 0
    })
    
    return counts
  }, [categories])

  const getFilterCounts = useMemo(() => {
    return {
      mobile: services.filter(service => service.availability.mobile).length,
      popular: services.filter(service => service.popular).length,
      featured: services.filter(service => service.featured).length
    }
  }, [services])

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

  // Loading state (only show if no initial data)
  if (loading && !initialData) {
    return (
      <MarketingLayout header={{ variant: 'default', showAuth: true }}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-content-muted">Loading services...</p>
          </div>
        </div>
      </MarketingLayout>
    )
  }

  // Error state
  if (error && !initialData) {
    return (
      <MarketingLayout header={{ variant: 'default', showAuth: true }}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-content-primary mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-content-muted mb-6">{error}</p>
            <button
              onClick={loadInitialData}
              className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </MarketingLayout>
    )
  }

  // Use SEO data from initial data if available
  const heroData = initialData?.hero || {
    title: 'Find Your Perfect Car Care Service',
    description: `Search through ${services.length} professional services, filter by category, and book the perfect care for your vehicle.`,
    stats: {
      totalServices: services.length,
      averageRating: 4.7,
      happyCustomers: 2500
    }
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
              {heroData.title}
            </h1>
            <p className="text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed mb-8">
              {heroData.description}
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
                <div className="text-2xl font-bold text-white mb-1">{heroData.stats.totalServices}</div>
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
                <div className="text-2xl font-bold text-white mb-1">{heroData.stats.averageRating}+</div>
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
            serviceCategories={categories}
            categoryCounts={getCategoryCounts}
            filterCounts={getFilterCounts}
            onClearFilters={() => {
              setSelectedCategory('all')
              setShowMobileOnly(false)
              setShowPopularOnly(false)
              setShowFeaturedOnly(false)
              setSearchQuery('')
            }}
            activeFilterCount={
              (selectedCategory !== 'all' ? 1 : 0) +
              (showMobileOnly ? 1 : 0) +
              (showPopularOnly ? 1 : 0) +
              (showFeaturedOnly ? 1 : 0) +
              (searchQuery ? 1 : 0)
            }
            resultCount={filteredServices.length}
          />

          {/* Services Grid */}
          <ServiceGrid
            services={filteredServices}
            viewMode={viewMode}
            onServiceSelect={openServiceDetails}
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
      
      {/* SSG/ISR Debug Info in Development */}
      {process.env.NODE_ENV === 'development' && initialData && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs">
          <div>SSG: ✅ Data loaded at build time</div>
          <div>Last updated: {new Date(initialData.lastUpdated).toLocaleString()}</div>
        </div>
      )}
    </MarketingLayout>
  )
}

export default ServicesPageWithSSG