import type { Service } from '@/types/apps/serviceTypes'
import type { ServiceViewModel } from '../types'

export const mapServiceToViewModel = (service: Service): ServiceViewModel => {
  return {
    id: service.id,
    name: service.name,
    description: service.description,
    priceDisplay: formatPrice(service.price),
    duration: service.duration,
    availability: service.availability,
    categories: service.categories,
    image: service.image,
    isActive: service.isActive,
    isPopular: service.isPopular,
    availabilityDisplay: formatAvailability(service.availability),
    categoryDisplay: formatCategories(service.categories),
  }
}

// Helper functions
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
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