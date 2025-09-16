export interface VehicleInfo {
  make: string
  model: string
  year: number
  color: string
  licensePlate: string
}

export interface Appointment {
  id: string
  serviceId: string
  serviceName: string
  customerName: string
  customerEmail: string
  customerPhone: string
  vehicleInfo: VehicleInfo
  scheduledDate: string
  scheduledTime: string
  location: 'onsite' | 'instore'
  address: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  totalAmount: number
  duration: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface AppointmentFilters {
  status?: Appointment['status']
  location?: Appointment['location']
  serviceId?: string
  customerEmail?: string
  dateFrom?: string
  dateTo?: string
}

export type AppointmentType = {
  appointments: Appointment[]
}