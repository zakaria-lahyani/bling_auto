export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: string
  availability: 'both' | 'onsite' | 'instore'
  categories: string[]
  isActive: boolean
  isPopular: boolean
  image?: string
  createdAt: string
  updatedAt: string
}

export interface ServiceFilters {
  availability?: 'both' | 'onsite' | 'instore'
  category?: string
  isActive?: boolean
  isPopular?: boolean
  minPrice?: number
  maxPrice?: number
}

export type ServiceType = {
  services: Service[]
}