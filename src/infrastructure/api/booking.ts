import { fetcher } from './fetcher'
import type { BookingRequest, BookingSlot, BookingLocation } from '../../features/booking/types'
import type { Appointment } from '@/types/apps/appointmentTypes'

export const bookingApi = {
  /**
   * Get available time slots for a service
   */
  async getAvailableSlots(serviceId: string, date?: string): Promise<BookingSlot[]> {
    try {
      const params = new URLSearchParams({ serviceId })
      if (date) params.append('date', date)
      
      // TODO: Replace with real API call
      // return await fetcher.get<BookingSlot[]>(`/api/booking/slots?${params}`)
      
      // Mock data for now
      await new Promise(resolve => setTimeout(resolve, 300))
      return [
        {
          id: 'slot-1',
          date: '2025-01-16',
          time: '09:00',
          isAvailable: true,
          locationId: 'loc-1'
        },
        {
          id: 'slot-2',
          date: '2025-01-16',
          time: '10:30',
          isAvailable: true,
          locationId: 'loc-1'
        },
        {
          id: 'slot-3',
          date: '2025-01-16',
          time: '14:00',
          isAvailable: true,
          locationId: 'loc-2'
        },
        {
          id: 'slot-4',
          date: '2025-01-16',
          time: '15:30',
          isAvailable: false,
          locationId: 'loc-1'
        }
      ]
    } catch (error) {
      throw new Error(`Failed to fetch available slots: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get available locations
   */
  async getAvailableLocations(): Promise<BookingLocation[]> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.get<BookingLocation[]>('/api/booking/locations')
      
      // Mock data for now
      await new Promise(resolve => setTimeout(resolve, 200))
      return [
        {
          id: 'loc-1',
          name: 'Downtown Location',
          address: '123 Main St, Downtown',
          type: 'onsite',
          isAvailable: true
        },
        {
          id: 'loc-2',
          name: 'Mobile Service',
          address: 'Your Location',
          type: 'mobile',
          isAvailable: true
        }
      ]
    } catch (error) {
      throw new Error(`Failed to fetch available locations: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Create a new booking
   */
  async create(booking: BookingRequest): Promise<Appointment> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.post<Appointment>('/api/booking', booking)
      
      // Mock creation for now
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Create a proper appointment object matching the schema
      const now = new Date()
      
      return {
        id: `booking-${Date.now()}`,
        serviceId: booking.serviceId,
        serviceName: 'Service Name', // Would come from service lookup in real implementation
        customerName: 'Customer Name', // Would come from auth context in real implementation
        customerEmail: 'customer@example.com',
        customerPhone: '555-0123',
        vehicleInfo: {
          make: booking.vehicleInfo.make,
          model: booking.vehicleInfo.model,
          year: booking.vehicleInfo.year,
          color: booking.vehicleInfo.color,
          licensePlate: booking.vehicleInfo.licensePlate,
        },
        scheduledDate: now.toISOString().split('T')[0], // YYYY-MM-DD format
        scheduledTime: '09:00', // Default time, would be extracted from slotId in real implementation
        location: booking.locationId === 'loc-2' ? 'onsite' : 'instore',
        address: booking.locationId === 'loc-2' ? 'Customer Address' : '123 Main St, Downtown',
        status: 'pending',
        totalAmount: 75, // Would be calculated from service in real implementation
        duration: '60 minutes', // Would come from service in real implementation
        notes: booking.notes,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
      } as Appointment
    } catch (error) {
      throw new Error(`Failed to create booking: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get available dates for a service
   */
  async getAvailableDates(serviceId: string, monthYear?: string): Promise<string[]> {
    try {
      const params = new URLSearchParams({ serviceId })
      if (monthYear) params.append('monthYear', monthYear)
      
      // TODO: Replace with real API call
      // return await fetcher.get<string[]>(`/api/booking/available-dates?${params}`)
      
      // Mock data for now
      await new Promise(resolve => setTimeout(resolve, 200))
      const today = new Date()
      const dates: string[] = []
      
      for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        // Skip some dates to simulate availability
        if (i % 3 !== 0) {
          const dateString = date.toISOString().split('T')[0]
          if (dateString) {
            dates.push(dateString)
          }
        }
      }
      
      return dates
    } catch (error) {
      throw new Error(`Failed to fetch available dates: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Validate booking details
   */
  async validateBooking(booking: Partial<BookingRequest>): Promise<{ isValid: boolean; errors: string[] }> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.post<{ isValid: boolean; errors: string[] }>('/api/booking/validate', booking)
      
      // Mock validation for now
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const errors: string[] = []
      
      if (!booking.serviceId) errors.push('Service is required')
      if (!booking.slotId) errors.push('Time slot is required')
      if (!booking.vehicleInfo) errors.push('Vehicle information is required')
      
      return {
        isValid: errors.length === 0,
        errors
      }
    } catch (error) {
      throw new Error(`Failed to validate booking: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}