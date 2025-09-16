'use client'

import React from 'react'
import { MapPin, Truck, Building } from 'lucide-react'
import { Card, Heading3, BodyText, Caption, Badge } from '../../../components/ui'
import type { BookingLocation } from '../types'

interface LocationSelectionProps {
  locations: BookingLocation[]
  selectedLocation?: BookingLocation
  onLocationSelect: (location: BookingLocation) => void
}

export const LocationSelection: React.FC<LocationSelectionProps> = ({
  locations,
  selectedLocation,
  onLocationSelect
}) => {
  const getLocationIcon = (type: 'onsite' | 'mobile') => {
    return type === 'mobile' ? Truck : Building
  }

  const getLocationBadge = (type: 'onsite' | 'mobile') => {
    return {
      mobile: { text: 'Mobile Service', className: 'bg-blue-100 text-blue-700' },
      onsite: { text: 'On-site Location', className: 'bg-green-100 text-green-700' }
    }[type]
  }

  return (
    <div className="space-y-6">
      <div>
        <Heading3 className="mb-2">Choose Service Location</Heading3>
        <BodyText color="secondary">
          Select where you'd like your car wash service to take place
        </BodyText>
      </div>
      
      <div className="space-y-4">
        {locations.map((location) => {
          const Icon = getLocationIcon(location.type)
          const badge = getLocationBadge(location.type)
          const isSelected = selectedLocation?.id === location.id
          
          return (
            <Card
              key={location.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-brand-500' : ''
              } ${!location.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => location.isAvailable && onLocationSelect(location)}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    location.type === 'mobile' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    <Icon size={24} className={
                      location.type === 'mobile' ? 'text-blue-600' : 'text-green-600'
                    } />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Heading3>{location.name}</Heading3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${badge.className}`}
                      >
                        {badge.text}
                      </Badge>
                      {!location.isAvailable && (
                        <Badge variant="outline" className="bg-red-100 text-red-700">
                          Unavailable
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin size={16} className="text-content-muted mt-0.5" />
                      <BodyText color="secondary">{location.address}</BodyText>
                    </div>
                    
                    {location.type === 'mobile' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                        <Caption color="secondary" className="font-medium mb-1">
                          Mobile Service Benefits:
                        </Caption>
                        <ul className="space-y-1">
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full" />
                            <Caption color="muted">Service at your location</Caption>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full" />
                            <Caption color="muted">No need to travel</Caption>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full" />
                            <Caption color="muted">Professional equipment provided</Caption>
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    {location.type === 'onsite' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                        <Caption color="secondary" className="font-medium mb-1">
                          On-site Location Benefits:
                        </Caption>
                        <ul className="space-y-1">
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full" />
                            <Caption color="muted">Full-service facility</Caption>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full" />
                            <Caption color="muted">All services available</Caption>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full" />
                            <Caption color="muted">Comfortable waiting area</Caption>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
      
      {locations.length === 0 && (
        <div className="text-center py-12">
          <MapPin size={48} className="text-content-muted mx-auto mb-4" />
          <Heading3 className="mb-2">No locations available</Heading3>
          <BodyText color="muted">
            Please contact us to schedule your service.
          </BodyText>
        </div>
      )}
    </div>
  )
}