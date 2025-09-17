/**
 * Services Page Layout Component
 * 
 * Pure presentation component for services page layout.
 * Single responsibility: Rendering the services page structure.
 */

import React from 'react'
import type { Service, ServiceCategory } from '@/core/entities/service/types'
import { MarketingLayout } from '@/shared/layouts/marketing'
import {
  ServiceModal,
  SearchAndFilters,
  ServiceGrid
} from '@/components/marketing/services'

interface ServicesPageLayoutProps {
  // Data props
  services: Service[]
  categories: ServiceCategory[]
  
  // Search props
  searchQuery: string
  onSearchChange: (query: string) => void
  suggestions: string[]
  showSuggestions: boolean
  onSuggestionSelect: (suggestion: string) => void
  onSuggestionsHide: () => void
  onSuggestionsShow: () => void
  
  // Filter props
  selectedCategory: string
  onCategoryChange: (category: string) => void
  showMobileOnly: boolean
  onMobileOnlyChange: (show: boolean) => void
  showPopularOnly: boolean
  onPopularOnlyChange: (show: boolean) => void
  showFeaturedOnly: boolean
  onFeaturedOnlyChange: (show: boolean) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  onClearFilters: () => void
  activeFilterCount: number
  
  // Modal props
  selectedService: Service | null
  isModalOpen: boolean
  onServiceSelect: (service: Service) => void
  onModalClose: () => void
  
  // State props
  isLoading?: boolean
  error?: string | null
}

const ServicesPageLayout: React.FC<ServicesPageLayoutProps> = ({
  services,
  categories,
  searchQuery,
  onSearchChange,
  suggestions,
  showSuggestions,
  onSuggestionSelect,
  onSuggestionsHide,
  onSuggestionsShow,
  selectedCategory,
  onCategoryChange,
  showMobileOnly,
  onMobileOnlyChange,
  showPopularOnly,
  onPopularOnlyChange,
  showFeaturedOnly,
  onFeaturedOnlyChange,
  viewMode,
  onViewModeChange,
  onClearFilters,
  activeFilterCount,
  selectedService,
  isModalOpen,
  onServiceSelect,
  onModalClose,
  isLoading = false,
  error = null
}) => {
  // Loading state
  if (isLoading) {
    return (
      <MarketingLayout
        header={{ variant: 'default', showAuth: true }}
        footer={{ showNewsletter: true }}
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading services...</p>
          </div>
        </div>
      </MarketingLayout>
    )
  }

  // Error state
  if (error) {
    return (
      <MarketingLayout
        header={{ variant: 'default', showAuth: true }}
        footer={{ showNewsletter: true }}
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </MarketingLayout>
    )
  }

  return (
    <MarketingLayout
      header={{ variant: 'default', showAuth: true }}
      footer={{ showNewsletter: true }}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                Professional Car Care Services
              </h1>
              <p className="text-xl text-brand-100 max-w-3xl mx-auto">
                From basic washes to premium detailing, we offer comprehensive car care solutions 
                with mobile and in-shop availability. Book online for same-day service.
              </p>
              
              {/* Stats */}
              <div className="flex justify-center items-center gap-8 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">{services.length}</div>
                  <div className="text-brand-200 text-sm">Services Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.7</div>
                  <div className="text-brand-200 text-sm">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2,500+</div>
                  <div className="text-brand-200 text-sm">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              searchSuggestions={suggestions}
              showSuggestions={showSuggestions}
              onSuggestionClick={onSuggestionSelect}
              serviceCategories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
              showMobileOnly={showMobileOnly}
              onMobileToggle={onMobileOnlyChange}
              showPopularOnly={showPopularOnly}
              onPopularToggle={onPopularOnlyChange}
              showFeaturedOnly={showFeaturedOnly}
              onFeaturedToggle={onFeaturedOnlyChange}
              viewMode={viewMode}
              onViewModeChange={onViewModeChange}
              onClearFilters={onClearFilters}
              activeFilterCount={activeFilterCount}
              resultCount={services.length}
              categoryCounts={
                categories.reduce((counts, category) => {
                  if (category.slug === 'all') {
                    counts[category.slug] = services.length;
                  } else {
                    counts[category.slug] = services.filter(s => s.category.slug === category.slug).length;
                  }
                  return counts;
                }, {} as Record<string, number>)
              }
              filterCounts={{
                mobile: services.filter(s => s.availability?.mobile).length,
                popular: services.filter(s => s.popular).length,
                featured: services.filter(s => s.featured).length
              }}
            />
          </div>
        </div>

        {/* Services Grid Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No services found matching your criteria.
              </p>
              <button
                onClick={onClearFilters}
                className="mt-4 bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <ServiceGrid
              services={services}
              viewMode={viewMode}
              onServiceSelect={onServiceSelect}
            />
          )}
        </div>

        {/* Service Modal */}
        {selectedService && (
          <ServiceModal
            service={selectedService}
            isOpen={isModalOpen}
            onClose={onModalClose}
          />
        )}
      </div>
    </MarketingLayout>
  )
}

export default ServicesPageLayout