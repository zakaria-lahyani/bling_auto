/**
 * Services Loading State Component
 * 
 * Displays loading skeleton for the services page with proper spacing
 * and visual hierarchy matching the final layout.
 */

import React from 'react'

const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-16"></div>
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>
)

const SkeletonFilter: React.FC = () => (
  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
)

export const ServicesLoadingState: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-12 bg-white/20 rounded mx-auto mb-6 w-96"></div>
              <div className="h-6 bg-white/20 rounded mx-auto mb-4 w-80"></div>
              <div className="h-6 bg-white/20 rounded mx-auto w-64"></div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-6 text-center">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col items-center animate-pulse">
                  <div className="w-16 h-16 bg-white/20 rounded-xl mb-3"></div>
                  <div className="h-6 bg-white/20 rounded w-12 mb-1"></div>
                  <div className="h-4 bg-white/20 rounded w-24"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Search and Filters Skeleton */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              
              {/* View Toggle */}
              <div className="flex gap-2">
                <div className="h-12 w-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 w-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map(i => (
                <SkeletonFilter key={i} />
              ))}
            </div>
          </div>

          {/* Services Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      <div className="fixed inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 font-medium">Loading services...</p>
          </div>
        </div>
      </div>
    </div>
  )
}