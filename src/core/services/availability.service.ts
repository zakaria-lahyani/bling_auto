/**
 * Availability Service Interface
 */

import type { Location } from '@/core/entities/booking/types'

export interface TimeSlot {
  startTime: Date
  endTime: Date
  isAvailable: boolean
  bookingId?: string
}

export interface AvailabilityWindow {
  date: Date
  timeSlots: TimeSlot[]
  isFullyBooked: boolean
}

export interface AvailabilityConstraints {
  minAdvanceHours: number
  maxAdvanceDays: number
  workingHours: {
    start: string // "09:00"
    end: string   // "18:00"
  }
  workingDays: number[] // [1,2,3,4,5] for Mon-Fri
  slotDuration: number // minutes
  bufferBetweenSlots: number // minutes
}

export interface IAvailabilityService {
  checkAvailability(serviceId: string, scheduledDate: Date, location?: Location): Promise<boolean>
  getAvailableSlots(serviceId: string, date: Date, location?: Location): Promise<TimeSlot[]>
  getAvailabilityWindow(serviceId: string, fromDate: Date, toDate: Date, location?: Location): Promise<AvailabilityWindow[]>
  reserveSlot(serviceId: string, scheduledDate: Date, duration: number, bookingId: string): Promise<boolean>
  releaseSlot(bookingId: string): Promise<boolean>
  getConstraints(serviceId: string): Promise<AvailabilityConstraints>
}

export class AvailabilityService implements IAvailabilityService {
  private constraints: AvailabilityConstraints = {
    minAdvanceHours: 2,
    maxAdvanceDays: 30,
    workingHours: {
      start: "09:00",
      end: "18:00"
    },
    workingDays: [1, 2, 3, 4, 5], // Monday to Friday
    slotDuration: 60, // 1 hour slots
    bufferBetweenSlots: 15 // 15 minutes between appointments
  }

  async checkAvailability(serviceId: string, scheduledDate: Date, location?: Location): Promise<boolean> {
    // Basic availability check
    const now = new Date()
    const minAdvanceTime = new Date(now.getTime() + (this.constraints.minAdvanceHours * 60 * 60 * 1000))
    const maxAdvanceTime = new Date(now.getTime() + (this.constraints.maxAdvanceDays * 24 * 60 * 60 * 1000))

    // Check if date is within allowed range
    if (scheduledDate < minAdvanceTime || scheduledDate > maxAdvanceTime) {
      return false
    }

    // Check if it's a working day
    const dayOfWeek = scheduledDate.getDay()
    if (!this.constraints.workingDays.includes(dayOfWeek)) {
      return false
    }

    // Check if it's within working hours
    const timeString = scheduledDate.toTimeString().substring(0, 5)
    if (timeString < this.constraints.workingHours.start || timeString > this.constraints.workingHours.end) {
      return false
    }

    // TODO: Check against actual bookings
    // For now, assume available
    return true
  }

  async getAvailableSlots(serviceId: string, date: Date, location?: Location): Promise<TimeSlot[]> {
    const slots: TimeSlot[] = []
    const workingStart = this.parseTime(this.constraints.workingHours.start)
    const workingEnd = this.parseTime(this.constraints.workingHours.end)
    
    const slotDurationMs = this.constraints.slotDuration * 60 * 1000
    const bufferMs = this.constraints.bufferBetweenSlots * 60 * 1000

    const dayStart = new Date(date)
    dayStart.setHours(workingStart.hours, workingStart.minutes, 0, 0)

    const dayEnd = new Date(date)
    dayEnd.setHours(workingEnd.hours, workingEnd.minutes, 0, 0)

    let currentTime = new Date(dayStart)
    
    while (currentTime.getTime() + slotDurationMs <= dayEnd.getTime()) {
      const endTime = new Date(currentTime.getTime() + slotDurationMs)
      
      slots.push({
        startTime: new Date(currentTime),
        endTime,
        isAvailable: await this.checkAvailability(serviceId, currentTime, location)
      })

      currentTime = new Date(currentTime.getTime() + slotDurationMs + bufferMs)
    }

    return slots
  }

  async getAvailabilityWindow(serviceId: string, fromDate: Date, toDate: Date, location?: Location): Promise<AvailabilityWindow[]> {
    const windows: AvailabilityWindow[] = []
    const currentDate = new Date(fromDate)

    while (currentDate <= toDate) {
      const timeSlots = await this.getAvailableSlots(serviceId, currentDate, location)
      const availableSlots = timeSlots.filter(slot => slot.isAvailable)
      
      windows.push({
        date: new Date(currentDate),
        timeSlots,
        isFullyBooked: availableSlots.length === 0
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return windows
  }

  async reserveSlot(serviceId: string, scheduledDate: Date, duration: number, bookingId: string): Promise<boolean> {
    // TODO: Implement actual slot reservation logic
    // For now, always return true
    return true
  }

  async releaseSlot(bookingId: string): Promise<boolean> {
    // TODO: Implement actual slot release logic
    // For now, always return true
    return true
  }

  async getConstraints(serviceId: string): Promise<AvailabilityConstraints> {
    // TODO: Service-specific constraints
    return this.constraints
  }

  private parseTime(timeString: string): { hours: number; minutes: number } {
    const parts = timeString.split(':').map(Number)
    const hours = parts[0] ?? 0
    const minutes = parts[1] ?? 0
    return { hours, minutes }
  }
}