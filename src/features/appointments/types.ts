// Re-export types from fake-db structure
export type {
  Appointment,
  AppointmentFilters,
  VehicleInfo,
} from '@/types/apps/appointmentTypes'

// Feature-specific view models
export interface AppointmentViewModel {
  id: string
  serviceName: string
  customerName: string
  displayDate: string
  displayTime: string
  duration: string
  statusLabel: string
  statusColor: string
  locationDisplay: string
  priceDisplay: string
  vehicleDisplay: string
  canCancel: boolean
  canReschedule: boolean
  canStart: boolean
  canComplete: boolean
}

export interface AppointmentListViewModel {
  appointments: AppointmentViewModel[]
  totalCount: number
  hasMore: boolean
  isLoading: boolean
  error?: string
}

export interface AppointmentFormData {
  serviceId: string
  date: string
  time: string
  locationType: 'onsite' | 'mobile'
  address?: string
  vehicle: {
    make: string
    model: string
    year: number
    color: string
    licensePlate: string
  }
  customer: {
    name: string
    phone: string
    email?: string
  }
  notes?: string
}