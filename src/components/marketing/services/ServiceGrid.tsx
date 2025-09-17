'use client'

import React from 'react'
import type { Service } from '@/core/entities/service'
import ServiceCard from './ServiceCard'
import ServiceListItem from './ServiceListItem'

interface ServiceGridProps {
  services: Service[]
  viewMode: 'grid' | 'list'
  onServiceSelect: (service: Service) => void
  searchQuery?: string
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ 
  services, 
  viewMode, 
  onServiceSelect,
  searchQuery 
}) => {
  // Empty state
  if (services.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 text-gray-400">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16.5C21 17.328 20.328 18 19.5 18H4.5C3.672 18 3 17.328 3 16.5V7.5C3 6.672 3.672 6 4.5 6H19.5C20.328 6 21 6.672 21 7.5V16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12L16 9V15L12 12Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-content-primary mb-2">
            No services found
          </h3>
          <p className="text-content-muted mb-6">
            {searchQuery 
              ? `No services match your search for "${searchQuery}". Try different keywords or adjust your filters.`
              : 'No services match your current filters. Try adjusting your selection.'
            }
          </p>
          <div className="space-y-2 text-sm text-content-muted">
            <p>Try:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Selecting "All Services" category</li>
              <li>Clearing your search query</li>
              <li>Removing active filters</li>
              <li>Searching for terms like "wash", "detail", or "mobile"</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  // Results count
  const ResultsHeader = () => (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-content-primary">
          {searchQuery ? 'Search Results' : 'Services'}
        </h2>
        <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">
          {services.length} service{services.length !== 1 ? 's' : ''}
        </span>
      </div>
      {searchQuery && (
        <div className="text-sm text-content-muted">
          Results for "{searchQuery}"
        </div>
      )}
    </div>
  )

  return (
    <div>
      <ResultsHeader />
      
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onViewDetails={onServiceSelect}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {services.map((service) => (
            <ServiceListItem
              key={service.id}
              service={service}
              onViewDetails={onServiceSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ServiceGrid