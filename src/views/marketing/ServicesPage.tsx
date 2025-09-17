/**
 * Services Page - Refactored for Single Responsibility
 * 
 * Pure orchestration component that uses service hooks and presents data.
 * Single responsibility: Coordinate data and user interactions.
 */

'use client'

import React from 'react'
import { ErrorBoundary } from '@/shared/errors'
import { useServicesPageEssentials } from '@/features/services/hooks/useServicesPageData'
import { useServicesFiltering } from '@/features/services/hooks/useServicesFiltering'
import { useServicesSearch } from '@/features/services/hooks/useServicesSearch'
import { useServiceModal } from '@/features/services/hooks/useServiceModal'
import ServicesPageLayout from '@/features/services/components/ServicesPageLayout'

const ServicesPage = () => {
  // Service-driven data fetching
  const { services, categories, isLoading, error } = useServicesPageEssentials()

  // Business logic hooks
  const {
    filters,
    filteredServices,
    setSelectedCategory,
    setShowMobileOnly,
    setShowPopularOnly,
    setShowFeaturedOnly,
    setViewMode,
    clearAllFilters,
    getActiveFilterCount
  } = useServicesFiltering(services || [])

  const {
    searchQuery,
    searchResults,
    suggestions,
    showSuggestions,
    setSearchQuery,
    selectSuggestion,
    hideSuggestions,
    showSuggestionsPanel
  } = useServicesSearch(filteredServices)

  const {
    selectedService,
    isOpen: isModalOpen,
    openModal,
    closeModal
  } = useServiceModal()

  // Loading and error states are handled by the layout component
  return (
    <ErrorBoundary>
      <ServicesPageLayout
        // Data props
        services={searchResults}
        categories={categories || []}
        
        // Search props
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        onSuggestionSelect={selectSuggestion}
        onSuggestionsHide={hideSuggestions}
        onSuggestionsShow={showSuggestionsPanel}
        
        // Filter props
        selectedCategory={filters.selectedCategory}
        onCategoryChange={setSelectedCategory}
        showMobileOnly={filters.showMobileOnly}
        onMobileOnlyChange={setShowMobileOnly}
        showPopularOnly={filters.showPopularOnly}
        onPopularOnlyChange={setShowPopularOnly}
        showFeaturedOnly={filters.showFeaturedOnly}
        onFeaturedOnlyChange={setShowFeaturedOnly}
        viewMode={filters.viewMode}
        onViewModeChange={setViewMode}
        onClearFilters={clearAllFilters}
        activeFilterCount={getActiveFilterCount()}
        
        // Modal props
        selectedService={selectedService}
        isModalOpen={isModalOpen}
        onServiceSelect={openModal}
        onModalClose={closeModal}
        
        // State props
        isLoading={isLoading}
        error={error ? error.message : null}
      />
    </ErrorBoundary>
  )
}

export default ServicesPage