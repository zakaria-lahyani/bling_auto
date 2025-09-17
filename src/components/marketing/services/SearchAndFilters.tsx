'use client'

import React from 'react'
import { Search, Grid3X3, List, Car, Star, Award } from 'lucide-react'
import type { ServiceCategory } from '@/core/entities/service'
import { getCategoryIcon } from '@/shared/utils/iconMapper'

interface SearchAndFiltersProps {
  // Search props
  searchQuery: string
  onSearchChange: (query: string) => void
  searchSuggestions: string[]
  showSuggestions: boolean
  onSuggestionClick: (suggestion: string) => void
  
  // View mode props
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  
  // Filter props
  selectedCategory: string
  onCategoryChange: (categorySlug: string) => void
  showMobileOnly: boolean
  onMobileToggle: (show: boolean) => void
  showPopularOnly: boolean
  onPopularToggle: (show: boolean) => void
  showFeaturedOnly: boolean
  onFeaturedToggle: (show: boolean) => void
  
  // Data
  serviceCategories: ServiceCategory[]
  categoryCounts: Record<string, number>
  filterCounts: {
    mobile: number
    popular: number
    featured: number
  }
  
  // Actions
  onClearFilters: () => void
  activeFilterCount: number
  resultCount: number
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  searchSuggestions,
  showSuggestions,
  onSuggestionClick,
  viewMode,
  onViewModeChange,
  selectedCategory,
  onCategoryChange,
  showMobileOnly,
  onMobileToggle,
  showPopularOnly,
  onPopularToggle,
  showFeaturedOnly,
  onFeaturedToggle,
  serviceCategories,
  categoryCounts,
  filterCounts,
  onClearFilters,
  activeFilterCount,
  resultCount
}) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
      {/* Search Section */}
      <div className="mb-6">
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-content-muted w-5 h-5" />
            <input
              type="text"
              placeholder="Search services... (e.g., 'wash', 'ceramic', 'mobile')"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-border rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors bg-surface"
            />
          </div>
          
          {/* Search Suggestions */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
              {searchSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => onSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-brand-50 transition-colors flex items-center gap-3 border-b border-border last:border-0"
                >
                  <Search className="w-4 h-4 text-content-muted" />
                  <span className="text-content-primary">
                    {suggestion.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => 
                      part.toLowerCase() === searchQuery.toLowerCase() ? 
                        <span key={i} className="font-semibold text-brand-600">{part}</span> : 
                        part
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-content-secondary font-medium">View:</span>
          <div className="flex items-center bg-surface border border-border rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
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
              onClick={() => onViewModeChange('list')}
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
          const dynamicCount = categoryCounts[category.slug] || 0
          const isDisabled = dynamicCount === 0
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.slug)}
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
          onClick={() => onMobileToggle(!showMobileOnly)}
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
            {filterCounts.mobile}
          </span>
        </button>
        
        <button
          onClick={() => onPopularToggle(!showPopularOnly)}
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
            {filterCounts.popular}
          </span>
        </button>
        
        <button
          onClick={() => onFeaturedToggle(!showFeaturedOnly)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            showFeaturedOnly
              ? 'bg-purple-500 text-white shadow-lg'
              : 'bg-surface text-content-secondary border border-border hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Featured</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            showFeaturedOnly
              ? 'bg-white/20 text-white'
              : 'bg-purple-100 text-purple-600'
          }`}>
            {filterCounts.featured}
          </span>
        </button>
      </div>
    </div>
  )
}

export default SearchAndFilters