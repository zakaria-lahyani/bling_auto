import type { Appointment } from '@/types/apps/appointmentTypes'
import type { AppointmentViewModel } from '../types'

export const mapAppointmentToViewModel = (appointment: Appointment): AppointmentViewModel => {
  const statusColors = {
    pending: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  }

  const statusLabels = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled'
  }

  return {
    id: appointment.id,
    serviceName: appointment.serviceName,
    customerName: appointment.customerName,
    displayDate: formatDate(appointment.scheduledDate),
    displayTime: formatTime(appointment.scheduledTime),
    duration: appointment.duration,
    statusLabel: statusLabels[appointment.status],
    statusColor: statusColors[appointment.status],
    locationDisplay: formatLocation(appointment.location, appointment.address),
    priceDisplay: formatPrice(appointment.totalAmount),
    vehicleDisplay: formatVehicle(appointment.vehicleInfo),
    canCancel: ['pending', 'confirmed'].includes(appointment.status),
    canReschedule: ['pending', 'confirmed'].includes(appointment.status),
    canStart: appointment.status === 'confirmed',
    canComplete: appointment.status === 'in_progress'
  }
}

// TODO: Add form data mapping when appointment creation is implemented

// Helper functions
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':')
  const date = new Date()
  date.setHours(parseInt(hours), parseInt(minutes))
  
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

function formatLocation(location: string, address: string): string {
  if (location === 'onsite') {
    return `On-site - ${address}`
  }
  return `In-store - ${address}`
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

function formatVehicle(vehicle: { make: string; model: string; year: number; color: string; licensePlate: string }): string {
  return `${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.color})`
}