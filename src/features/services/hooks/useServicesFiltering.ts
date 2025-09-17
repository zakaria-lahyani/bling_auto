/**
 * Services Filtering Hook
 * 
 * Handles all filtering logic for services.
 * Single responsibility: Filter management and application.
 */

import { useState, useMemo, useCallback } from 'react'
import type { Service } from '@/core/entities/service/types'

interface FilterState {
  selectedCategory: string
  showMobileOnly: boolean
  showPopularOnly: boolean
  showFeaturedOnly: boolean
  viewMode: 'grid' | 'list'
}

interface UseServicesFilteringReturn {
  // Filter state
  filters: FilterState
  
  // Filtered results
  filteredServices: Service[]
  
  // Filter actions
  setSelectedCategory: (category: string) => void
  setShowMobileOnly: (show: boolean) => void
  setShowPopularOnly: (show: boolean) => void
  setShowFeaturedOnly: (show: boolean) => void
  setViewMode: (mode: 'grid' | 'list') => void
  clearAllFilters: () => void
  
  // Helper methods
  getActiveFilterCount: () => number
  hasActiveFilters: boolean
}

export function useServicesFiltering(services: Service[]): UseServicesFilteringReturn {
  const [filters, setFilters] = useState<FilterState>({
    selectedCategory: 'all',
    showMobileOnly: false,
    showPopularOnly: false,
    showFeaturedOnly: false,
    viewMode: 'grid'
  })

  // Filter services based on current filter state
  const filteredServices = useMemo(() => {
    if (!services || services.length === 0) {
      return []
    }

    return services.filter(service => {
      // Category filter
      if (filters.selectedCategory !== 'all') {
        if (service.category.slug !== filters.selectedCategory) {
          return false
        }
      }

      // Mobile availability filter
      if (filters.showMobileOnly && !service.availability.mobile) {
        return false
      }

      // Popular filter
      if (filters.showPopularOnly && !service.popular) {
        return false
      }

      // Featured filter
      if (filters.showFeaturedOnly && !service.featured) {
        return false
      }

      return true
    })
  }, [services, filters])

  // Filter update functions
  const setSelectedCategory = useCallback((category: string) => {
    setFilters(prev => ({ ...prev, selectedCategory: category }))
  }, [])

  const setShowMobileOnly = useCallback((show: boolean) => {
    setFilters(prev => ({ ...prev, showMobileOnly: show }))
  }, [])

  const setShowPopularOnly = useCallback((show: boolean) => {
    setFilters(prev => ({ ...prev, showPopularOnly: show }))
  }, [])

  const setShowFeaturedOnly = useCallback((show: boolean) => {
    setFilters(prev => ({ ...prev, showFeaturedOnly: show }))
  }, [])

  const setViewMode = useCallback((mode: 'grid' | 'list') => {
    setFilters(prev => ({ ...prev, viewMode: mode }))
  }, [])

  const clearAllFilters = useCallback(() => {
    setFilters({
      selectedCategory: 'all',
      showMobileOnly: false,
      showPopularOnly: false,
      showFeaturedOnly: false,
      viewMode: 'grid'
    })
  }, [])

  // Helper methods
  const getActiveFilterCount = useCallback(() => {
    let count = 0
    if (filters.selectedCategory !== 'all') count++
    if (filters.showMobileOnly) count++
    if (filters.showPopularOnly) count++
    if (filters.showFeaturedOnly) count++
    return count
  }, [filters])

  const hasActiveFilters = useMemo(() => {
    return getActiveFilterCount() > 0
  }, [getActiveFilterCount])

  return {
    filters,
    filteredServices,
    setSelectedCategory,
    setShowMobileOnly,
    setShowPopularOnly,
    setShowFeaturedOnly,
    setViewMode,
    clearAllFilters,
    getActiveFilterCount,
    hasActiveFilters
  }
}