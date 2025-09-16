// Booking domain types
export interface Booking {
  id: string
  customerId: string
  serviceId: string
  vehicleInfo: VehicleInfo
  location: Location
  scheduledDate: Date
  status: BookingStatus
  price: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface VehicleInfo {
  make: string
  model: string
  year: number
  color: string
  licensePlate?: string
  vehicleType: 'sedan' | 'suv' | 'truck' | 'van' | 'motorcycle'
}

export interface Location {
  address: string
  city: string
  state: string
  zipCode: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed' 
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'rescheduled'