'use client'

import React from 'react'
import { Car, AlertCircle } from 'lucide-react'
import { ServiceCard } from './ServiceCard'
import { useServices } from '../hooks/useServices'
import type { ServiceFilters } from '../types'

interface ServiceListProps {
  filters?: ServiceFilters
  onServiceSelect?: (serviceId: string) => void
  onServiceBook?: (serviceId: string) => void
  showBookButton?: boolean
  selectedServiceId?: string
  className?: string
}

export function ServiceList({ 
  filters, 
  onServiceSelect, 
  onServiceBook, 
  showBookButton = true,
  selectedServiceId,
  className = ''
}: ServiceListProps) {
  const { services, isLoading, error } = useServices(filters)

  if (isLoading) {
    return <ServiceListSkeleton />
  }

  if (error) {
    return (
      <div className="bg-white border border-red-200 rounded-3xl p-12 text-center">
        <AlertCircle size={48} className="text-red-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Failed to load services</h3>
        <p className="text-slate-600">{error.message}</p>
      </div>
    )
  }

  if (services.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
        <Car size={48} className="text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No services found</h3>
        <p className="text-slate-600">
          No services are currently available.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onSelect={onServiceSelect}
          onBook={onServiceBook}
          showBookButton={showBookButton}
          isSelected={selectedServiceId === service.id}
        />
      ))}
    </div>
  )
}

function ServiceListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="w-full h-48 bg-slate-200 rounded-2xl mb-4 animate-pulse" />
          <div className="space-y-3">
            <div className="h-6 bg-slate-200 rounded-lg w-3/4 animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
            <div className="flex justify-between items-center mt-6">
              <div className="h-8 bg-slate-200 rounded w-20 animate-pulse" />
              <div className="h-10 bg-slate-200 rounded-lg w-24 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}