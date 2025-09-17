/**
 * Marketing ServiceCard Component
 * 
 * Re-exports the unified ServiceCard with marketing variant as default
 */
'use client'

import React from 'react'
import UnifiedServiceCard from '@/shared/components/ServiceCard'
import type { Service } from '@/core/entities/service'

interface ServiceCardProps {
  service: Service
  onViewDetails: (service: Service) => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewDetails }) => {
  return (
    <UnifiedServiceCard 
      service={service}
      variant="marketing"
      onViewDetails={onViewDetails}
    />
  )
}

export default ServiceCard