/**
 * Example: Updated ServicesPage using Data Package
 * 
 * This shows how to migrate from direct data imports to the data package.
 * The component becomes more robust with loading states and error handling.
 */

'use client'

import React, { useState, useEffect } from 'react'
import { MarketingLayout } from '@/shared/layouts/marketing'
import { 
  getServices, 
  getServiceCategories,
  type Service, 
  type ServiceCategory,
  type SearchParams 
} from '@/lib/data'
import {
  ServiceModal,
  SearchAndFilters,
  ServiceGrid
} from '@/components/marketing/services'

const ServicesPageWithDataPackage = () => {
  // State management
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showMobileOnly, setShowMobileOnly] = useState<boolean>(false)
  const [showPopularOnly, setShowPopularOnly] = useState<boolean>(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false)
  
  // Modal state
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showServiceDetails, setShowServiceDetails] = useState<boolean>(false)

  // Load initial data
  useEffect(() => {
    loadData()
  }, [])

  // Load filtered data when filters change
  useEffect(() => {
    loadServices()
  }, [selectedCategory, searchQuery, showMobileOnly, showPopularOnly, showFeaturedOnly])

  const loadData = async () => {
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

  const loadServices = async () => {
    try {
      // Build search parameters
      const params: SearchParams = {}
      
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

  // Modal handlers
  const openServiceDetails = (service: Service) => {
    setSelectedService(service)
    setShowServiceDetails(true)
  }

  const closeServiceDetails = () => {
    setShowServiceDetails(false)
    setTimeout(() => setSelectedService(null), 300)
  }

  // Loading state
  if (loading) {
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
  if (error) {
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
              onClick={loadData}
              className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </MarketingLayout>
    )
  }

  // Calculate dynamic counts for filters
  const getCategoryCounts = () => {
    const counts: Record<string, number> = {}
    
    categories.forEach(category => {
      // This would need to be calculated based on current filters
      // For now, using static count
      counts[category.slug] = category.serviceCount || 0
    })
    
    return counts
  }

  const getFilterCounts = () => {
    return {
      mobile: services.filter(s => s.availability.mobile).length,
      popular: services.filter(s => s.popular).length,
      featured: services.filter(s => s.featured).length
    }
  }

  return (
    <MarketingLayout header={{ variant: 'default', showAuth: true }}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white overflow-hidden">
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
              Search through {services.length} professional services, filter by category, 
              and book the perfect care for your vehicle.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <SearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchSuggestions={[]} // Would need to implement search suggestions
            showSuggestions={false}
            onSuggestionClick={() => {}}
            viewMode="grid"
            onViewModeChange={() => {}}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showMobileOnly={showMobileOnly}
            onMobileToggle={() => setShowMobileOnly(!showMobileOnly)}
            showPopularOnly={showPopularOnly}
            onPopularToggle={() => setShowPopularOnly(!showPopularOnly)}
            showFeaturedOnly={showFeaturedOnly}
            onFeaturedToggle={() => setShowFeaturedOnly(!showFeaturedOnly)}
            serviceCategories={categories}
            categoryCounts={getCategoryCounts()}
            filterCounts={getFilterCounts()}
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
            resultCount={services.length}
          />

          {/* Services Grid */}
          <ServiceGrid
            services={services}
            viewMode="grid"
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
    </MarketingLayout>
  )
}

export default ServicesPageWithDataPackage