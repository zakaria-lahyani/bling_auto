import { fetcher } from './fetcher'

// Import types from fake-db structure
import type {
  Appointment,
  AppointmentFilters,
} from '@/types/apps/appointmentTypes'

export const appointmentsApi = {
  /**
   * Get all appointments with optional filters
   */
  async list(filters?: AppointmentFilters): Promise<{ appointments: Appointment[] }> {
    const searchParams = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }

    const endpoint = `/api/appointments${searchParams.toString() ? `?${searchParams}` : ''}`
    return await fetcher.get<{ appointments: Appointment[] }>(endpoint)
  },

  /**
   * Get an appointment by ID (not implemented in fake-db pattern yet)
   */
  async getById(id: string): Promise<Appointment | null> {
    // For now, get all appointments and find by ID
    const data = await this.list()
    return data.appointments.find(a => a.id === id) || null
  },

  /**
   * Get appointments for a specific customer
   */
  async getByCustomer(customerEmail: string): Promise<{ appointments: Appointment[] }> {
    return this.list({ customerEmail })
  },

  /**
   * Get upcoming appointments
   */
  async getUpcoming(): Promise<{ appointments: Appointment[] }> {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateFrom = tomorrow.toISOString().split('T')[0]
    
    return this.list({ 
      dateFrom,
      status: 'confirmed' 
    })
  },

  /**
   * Get today's appointments
   */
  async getToday(): Promise<{ appointments: Appointment[] }> {
    const today = new Date().toISOString().split('T')[0]
    return this.list({ 
      dateFrom: today, 
      dateTo: today 
    })
  },

  /**
   * Get appointments for a specific date
   */
  async getByDate(date: string): Promise<{ appointments: Appointment[] }> {
    return this.list({ 
      dateFrom: date, 
      dateTo: date 
    })
  },

  /**
   * Get appointments by status
   */
  async getByStatus(status: Appointment['status']): Promise<{ appointments: Appointment[] }> {
    return this.list({ status })
  },
}