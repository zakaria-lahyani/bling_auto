/**
 * Improved Service Grid Component
 * 
 * Demonstrates the enhanced error recovery and state management
 * capabilities with the new data fetching hooks.
 */

import React, { useState } from 'react'
import { Search, Filter, Grid, List } from 'lucide-react'
import { useServicesWithStates, useServicesPaginated } from '@/features/services/hooks/useServicesWithStates'
import type { DataState } from '@/shared/hooks/useDataWithStates'
import type { Service } from '@/core/entities/service/types'
import { DataStateWrapper, ListStateWrapper, DataStateIndicator } from '@/shared/components/ui/DataStateWrapper'
import Button from '@/shared/components/ui/Button'
import Input from '@/shared/components/ui/Input'
import type { ServiceFilters } from '@/infrastructure/repositories'

// Type guard to check if data is paginated
function isPaginatedData(data: any): data is {
  items: Service[]
  total: number
  currentPage: number
  hasNext: boolean
  hasPrevious: boolean
  nextPage: () => void
  previousPage: () => void
  goToPage: (page: number) => void
  isLoading: boolean
  isError: boolean
  error: Error | null
  isEmpty: boolean
  isStale: boolean
  isFetching: boolean
  retry: () => void
  refetch: () => Promise<any>
  lastUpdated: Date | null
} {
  return 'items' in data && 'total' in data
}

interface ImprovedServiceGridProps {
  initialFilters?: ServiceFilters
  enablePagination?: boolean
  showDebugInfo?: boolean
  className?: string
}

export const ImprovedServiceGrid: React.FC<ImprovedServiceGridProps> = ({
  initialFilters = {},
  enablePagination = false,
  showDebugInfo = false,
  className = ''
}) => {
  const [filters, setFilters] = useState<ServiceFilters>(initialFilters)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Use either paginated or regular hook based on prop
  const servicesData = enablePagination 
    ? useServicesPaginated(filters, 1, 12)
    : useServicesWithStates(filters)
  
  // Create normalized data state for both types
  const normalizedDataState: DataState<Service[]> = isPaginatedData(servicesData) ? {
    data: servicesData.items,
    isLoading: servicesData.isLoading,
    isError: servicesData.isError,
    error: servicesData.error,
    isEmpty: servicesData.isEmpty,
    isStale: servicesData.isStale,
    isFetching: servicesData.isFetching,
    retry: servicesData.retry,
    refetch: servicesData.refetch,
    lastUpdated: servicesData.lastUpdated
  } : servicesData

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setFilters(prev => ({ ...prev, query: query || undefined }))
  }

  const handleFilterChange = (newFilters: Partial<ServiceFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({})
    setSearchQuery('')
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Filter button */}
          <Button variant="secondary" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>

          {/* Debug info */}
          {showDebugInfo && (
            <DataStateIndicator 
              dataState={normalizedDataState} 
              showDetails 
              className="ml-2" 
            />
          )}
        </div>
      </div>

      {/* Active filters display */}
      {Object.keys(filters).length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Active filters:</span>
          {Object.entries(filters).map(([key, value]) => (
            value && (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {key}: {Array.isArray(value) ? value.join(', ') : String(value)}
              </span>
            )
          ))}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Services grid with comprehensive state handling */}
      <ListStateWrapper
        dataState={normalizedDataState}
        emptyTitle="No services found"
        emptyDescription="Try adjusting your search criteria or clearing filters."
        emptyAction={{
          label: "Clear Filters",
          onClick: clearFilters
        }}
        loadingMessage="Loading services..."
        className="min-h-[400px]"
        showLastUpdated={showDebugInfo}
      >
        {(services) => (
          <div className="space-y-4">
            {/* Results count */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {enablePagination && isPaginatedData(servicesData) 
                  ? `Showing ${services.length} of ${servicesData.total} services`
                  : `${services.length} services found`
                }
              </p>
              
              {/* Refresh indicator */}
              {normalizedDataState.isFetching && (
                <span className="text-sm text-blue-600">Updating...</span>
              )}
            </div>

            {/* Services grid/list */}
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {services.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Pagination controls */}
            {enablePagination && isPaginatedData(servicesData) && (
              <div className="flex justify-center items-center gap-4 pt-6">
                <Button
                  variant="secondary"
                  disabled={!servicesData.hasPrevious}
                  onClick={servicesData.previousPage}
                >
                  Previous
                </Button>
                
                <span className="text-sm text-gray-600">
                  Page {servicesData.currentPage}
                </span>
                
                <Button
                  variant="secondary"
                  disabled={!servicesData.hasNext}
                  onClick={servicesData.nextPage}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </ListStateWrapper>
    </div>
  )
}

/**
 * Service card component with error handling
 */
const ServiceCard: React.FC<{
  service: any
  viewMode: 'grid' | 'list'
}> = ({ service, viewMode }) => {
  const [imageError, setImageError] = useState(false)

  const cardClass = viewMode === 'grid'
    ? 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
    : 'bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow'

  return (
    <div className={cardClass}>
      {/* Service image with error handling */}
      <div className={viewMode === 'grid' ? 'aspect-video' : 'w-24 h-24 flex-shrink-0'}>
        {!imageError ? (
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Service content */}
      <div className={viewMode === 'grid' ? 'p-4' : 'flex-1 min-w-0'}>
        <h3 className="font-semibold text-gray-900 truncate">
          {service.name}
        </h3>
        
        <p className={`text-gray-600 text-sm ${viewMode === 'grid' ? 'line-clamp-2 mt-1' : 'truncate'}`}>
          {service.shortDescription || service.description}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-brand-600">
            ${service.price}
          </span>
          
          <span className="text-sm text-gray-500">
            {service.duration}
          </span>
        </div>

        {/* Service badges */}
        <div className="mt-2 flex gap-1 flex-wrap">
          {service.featured && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Featured
            </span>
          )}
          {service.popular && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Popular
            </span>
          )}
          {service.availability?.mobile && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Mobile
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImprovedServiceGrid