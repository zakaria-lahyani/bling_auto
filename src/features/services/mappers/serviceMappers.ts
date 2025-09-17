import type { Service, ServiceAvailability } from '@/core/entities/service'
import type { ServiceViewModel } from '../types'

export const mapServiceToViewModel = (service: Service): ServiceViewModel => {
  const availabilityString = mapAvailabilityToString(service.availability)
  return {
    id: service.id,
    name: service.name,
    description: service.description,
    priceDisplay: formatPrice(service.price),
    duration: service.duration,
    availability: availabilityString,
    categories: service.categories || [],
    image: service.image,
    isActive: service.isActive,
    isPopular: service.popular || false,
    availabilityDisplay: formatAvailability(availabilityString),
    categoryDisplay: formatCategories(service.categories || []),
  }
}

// Helper functions
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

function mapAvailabilityToString(availability: ServiceAvailability): 'onsite' | 'instore' | 'both' {
  if (availability.mobile && availability.inShop) {
    return 'both'
  } else if (availability.mobile) {
    return 'onsite'
  } else if (availability.inShop) {
    return 'instore'
  } else {
    return 'instore' // default fallback
  }
}

function formatAvailability(availability: string): string {
  switch (availability) {
    case 'onsite': return 'On-site Only'
    case 'instore': return 'In-store Only'
    case 'both': return 'On-site & In-store'
    default: return availability
  }
}

function formatCategories(categories: string[]): string {
  const categoryMap: Record<string, string> = {
    exterior: 'Exterior',
    interior: 'Interior',
    premium: 'Premium',
    eco: 'Eco-Friendly'
  }
  
  return categories
    .map(cat => categoryMap[cat] || cat)
    .join(', ')
}