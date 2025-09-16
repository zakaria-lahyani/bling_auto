'use client'

import React from 'react'
import Image from 'next/image'
import { Clock, MapPin } from 'lucide-react'
import { Card, Heading3, BodyText, Caption, Badge } from '../../../components/ui'

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  availability: 'onsite' | 'mobile' | 'both'
  image: string
  features: string[]
  isPopular: boolean
}

interface ServiceSelectionProps {
  services: Service[]
  selectedServiceId?: string
  onServiceSelect: (serviceId: string) => void
}

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  services,
  selectedServiceId,
  onServiceSelect
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Heading3 className="mb-2">Select Your Service</Heading3>
        <BodyText color="secondary">
          Choose the car wash service that best fits your needs
        </BodyText>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card 
            key={service.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedServiceId === service.id ? 'ring-2 ring-brand-500' : ''
            }`}
            onClick={() => onServiceSelect(service.id)}
          >
            <div className="aspect-video bg-surface-muted overflow-hidden rounded-t-xl">
              <Image 
                src={service.image} 
                alt={service.name}
                width={400}
                height={300}
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Heading3 className="flex-1">{service.name}</Heading3>
                {service.isPopular && (
                  <Badge variant="primary" className="ml-2">Popular</Badge>
                )}
              </div>
              
              <BodyText color="secondary" className="mb-4 text-sm">
                {service.description}
              </BodyText>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-content-primary">
                    ${service.price}
                  </span>
                  <div className="flex items-center gap-1 text-content-muted">
                    <Clock size={14} />
                    <Caption>{service.duration} min</Caption>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-content-muted">
                  <MapPin size={14} />
                  <Caption>
                    {service.availability === 'both' 
                      ? 'On-site & Mobile' 
                      : service.availability === 'onsite' 
                        ? 'On-site Only' 
                        : 'Mobile Only'
                    }
                  </Caption>
                </div>
              </div>
              
              <div className="space-y-2">
                <Caption weight="medium" color="secondary">Features:</Caption>
                <ul className="space-y-1">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                      <Caption color="muted" className="text-xs">{feature}</Caption>
                    </li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-xs text-content-muted">
                      +{service.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}