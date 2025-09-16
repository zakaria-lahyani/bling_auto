// Booking feature types
export interface BookingSlot {
  id: string
  date: string
  time: string
  isAvailable: boolean
  locationId?: string
}

export interface BookingLocation {
  id: string
  name: string
  address: string
  type: 'onsite' | 'mobile'
  isAvailable: boolean
}

export interface BookingRequest {
  serviceId: string
  customerId: string
  slotId: string
  locationId?: string
  vehicleInfo: VehicleInfo
  notes?: string
}

export interface VehicleInfo {
  make: string
  model: string
  year: number
  color: string
  licensePlate: string
}

export interface BookingStep {
  step: number
  title: string
  description: string
  isCompleted: boolean
  isActive: boolean
}

// View models for UI components
export interface BookingFlowViewModel {
  steps: BookingStep[]
  currentStep: number
  canProceed: boolean
  canGoBack: boolean
  isLoading: boolean
  error: string | null
}

export interface BookingConfirmationViewModel {
  bookingId: string
  serviceName: string
  servicePrice: string
  date: string
  time: string
  location: string
  vehicleInfo: VehicleInfo
  estimatedDuration: string
  totalPrice: string
}

export interface TimeSlotViewModel {
  id: string
  time: string
  isAvailable: boolean
  isRecommended: boolean
  price?: number
}

export interface CalendarViewModel {
  month: string
  year: number
  days: CalendarDay[]
  selectedDate: string | null
  availableDates: string[]
}

export interface CalendarDay {
  date: string
  dayOfWeek: string
  isToday: boolean
  isSelected: boolean
  isAvailable: boolean
  isDisabled: boolean
}