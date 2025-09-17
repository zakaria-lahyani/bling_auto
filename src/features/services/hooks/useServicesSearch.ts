/**
 * Services Search Hook
 * 
 * Handles all search logic for services.
 * Single responsibility: Search functionality and suggestion generation.
 */

import { useState, useMemo, useCallback, useEffect } from 'react'
import type { Service } from '@/core/entities/service/types'

interface UseServicesSearchReturn {
  // Search state
  searchQuery: string
  searchResults: Service[]
  suggestions: string[]
  showSuggestions: boolean
  
  // Search actions
  setSearchQuery: (query: string) => void
  selectSuggestion: (suggestion: string) => void
  clearSearch: () => void
  hideSuggestions: () => void
  showSuggestionsPanel: () => void
  
  // Helper methods
  hasSearchQuery: boolean
  resultCount: number
}

export function useServicesSearch(services: Service[]): UseServicesSearchReturn {
  const [searchQuery, setSearchQueryState] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

  // Memoize services to prevent infinite re-renders
  const memoizedServices = useMemo(() => services, [services?.length])

  // Filter services based on search query
  const searchResults = useMemo(() => {
    if (!memoizedServices || memoizedServices.length === 0) {
      return []
    }

    if (!searchQuery.trim()) {
      return memoizedServices
    }

    const query = searchQuery.toLowerCase().trim()

    return memoizedServices.filter(service => {
      // Search in service name
      if (service.name.toLowerCase().includes(query)) {
        return true
      }

      // Search in service description
      if (service.description.toLowerCase().includes(query)) {
        return true
      }

      // Search in service tags
      if (service.tags.some(tag => tag.toLowerCase().includes(query))) {
        return true
      }

      // Search in category name
      if (service.category.name.toLowerCase().includes(query)) {
        return true
      }

      // Search in features
      if (service.features?.some(feature => feature.toLowerCase().includes(query))) {
        return true
      }

      return false
    })
  }, [memoizedServices, searchQuery])

  // Generate search suggestions
  useEffect(() => {
    if (searchQuery.length > 0 && memoizedServices.length > 0) {
      const suggestionSet = new Set<string>()
      const query = searchQuery.toLowerCase()
      
      memoizedServices.forEach(service => {
        // Add service names that match
        if (service.name.toLowerCase().includes(query)) {
          suggestionSet.add(service.name)
        }
        
        // Add matching tags
        service.tags.forEach(tag => {
          if (tag.toLowerCase().includes(query)) {
            suggestionSet.add(tag)
          }
        })
        
        // Add category names that match
        if (service.category.name.toLowerCase().includes(query)) {
          suggestionSet.add(service.category.name)
        }

        // Add matching features
        service.features?.forEach(feature => {
          if (feature.toLowerCase().includes(query)) {
            suggestionSet.add(feature)
          }
        })
      })
      
      // Convert to array and limit to 8 suggestions
      const suggestionsArray = Array.from(suggestionSet)
        .slice(0, 8)
        .sort((a, b) => {
          // Prioritize exact matches
          const aExact = a.toLowerCase() === query
          const bExact = b.toLowerCase() === query
          if (aExact && !bExact) return -1
          if (!aExact && bExact) return 1
          
          // Prioritize starts with matches
          const aStartsWith = a.toLowerCase().startsWith(query)
          const bStartsWith = b.toLowerCase().startsWith(query)
          if (aStartsWith && !bStartsWith) return -1
          if (!aStartsWith && bStartsWith) return 1
          
          // Alphabetical order
          return a.localeCompare(b)
        })

      setSuggestions(suggestionsArray)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery, memoizedServices])

  // Search actions
  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query)
    if (query.length === 0) {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [])

  const selectSuggestion = useCallback((suggestion: string) => {
    setSearchQueryState(suggestion)
    setShowSuggestions(false)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQueryState('')
    setSuggestions([])
    setShowSuggestions(false)
  }, [])

  const hideSuggestions = useCallback(() => {
    setShowSuggestions(false)
  }, [])

  const showSuggestionsPanel = useCallback(() => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }, [suggestions])

  // Helper properties
  const hasSearchQuery = useMemo(() => {
    return searchQuery.trim().length > 0
  }, [searchQuery])

  const resultCount = useMemo(() => {
    return searchResults.length
  }, [searchResults])

  return {
    searchQuery,
    searchResults,
    suggestions,
    showSuggestions,
    setSearchQuery,
    selectSuggestion,
    clearSearch,
    hideSuggestions,
    showSuggestionsPanel,
    hasSearchQuery,
    resultCount
  }
}