// Service domain types
export interface Service {
  id: string
  name: string
  description: string
  price: number
  estimatedDuration: number // in minutes
  category: ServiceCategory
  features: string[]
  isActive: boolean
  imageUrl?: string
}

export type ServiceCategory = 
  | 'basic'
  | 'premium'
  | 'specialty'
  | 'maintenance'
  | 'detailing'

export interface ServicePackage {
  id: string
  name: string
  description: string
  services: string[] // service IDs
  totalPrice: number
  discountPercentage: number
  isPopular?: boolean
}

export interface ServiceAvailability {
  serviceId: string
  availableSlots: TimeSlot[]
  unavailableDates: Date[]
}

export interface TimeSlot {
  startTime: string
  endTime: string
  isAvailable: boolean
}