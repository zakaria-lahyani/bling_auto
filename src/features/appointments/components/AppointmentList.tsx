'use client'

import React from 'react'
import { Calendar, Clock, MapPin, Car, User, CheckCircle, AlertCircle, XCircle, Eye, MoreHorizontal } from 'lucide-react'
import { Button } from '../../../components/ui'
import { useAppointments } from '../hooks/useAppointments'
import type { AppointmentFilters } from '../types'

interface AppointmentListProps {
  filters?: AppointmentFilters
  showActions?: boolean
  onViewReceipt?: (appointmentId: string) => void
  onReschedule?: (appointmentId: string) => void
}

export function AppointmentList({ 
  filters, 
  showActions = true, 
  onViewReceipt, 
  onReschedule 
}: AppointmentListProps) {
  const { appointments, isLoading, error } = useAppointments(filters)
  // TODO: Add cancel mutation when implemented
  const handleCancel = async (appointmentId: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      try {
        // await cancelMutation.mutateAsync(appointmentId)
        console.log('Cancel appointment:', appointmentId)
      } catch (error) {
        console.error('Failed to cancel appointment:', error)
      }
    }
  }

  if (isLoading) {
    return <AppointmentListSkeleton />
  }

  if (error) {
    return (
      <div className="bg-white border border-red-200 rounded-3xl p-12 text-center">
        <AlertCircle size={48} className="text-red-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Failed to load appointments</h3>
        <p className="text-slate-600">{error.message}</p>
      </div>
    )
  }

  if (appointments.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
        <Calendar size={48} className="text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No appointments found</h3>
        <p className="text-slate-600">Your appointments will appear here once you book a service.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Car size={24} className="text-teal-600" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{appointment.serviceName}</h3>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${appointment.statusColor}`}>
                    {getStatusIcon(appointment.statusLabel)}
                    {appointment.statusLabel}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{appointment.displayDate} at {appointment.displayTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>Duration: {appointment.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car size={14} />
                      <span>{appointment.vehicleDisplay}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{appointment.locationDisplay}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{appointment.customerName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {showActions && (
              <div className="flex items-center gap-2 ml-4">
                <div className="text-right mr-4">
                  <div className="text-xl font-bold text-slate-900">{appointment.priceDisplay}</div>
                  <div className="text-sm text-slate-600">Total</div>
                </div>
                
                {appointment.canReschedule && onReschedule && (
                  <Button
                    onClick={() => onReschedule(appointment.id)}
                    variant="outline"
                    size="sm"
                    className="text-teal-600 border-teal-600 hover:bg-teal-50"
                  >
                    Reschedule
                  </Button>
                )}
                
                {appointment.canCancel && (
                  <Button
                    onClick={() => handleCancel(appointment.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    disabled={false}
                  >
                    Cancel
                  </Button>
                )}

                {onViewReceipt && (
                  <Button
                    onClick={() => onViewReceipt(appointment.id)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Eye size={14} />
                    Receipt
                  </Button>
                )}
                
                <button className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case 'scheduled': return <Clock size={16} className="text-blue-600" />
    case 'confirmed': return <CheckCircle size={16} className="text-green-600" />
    case 'in progress': return <AlertCircle size={16} className="text-amber-600" />
    case 'completed': return <CheckCircle size={16} className="text-green-600" />
    case 'cancelled': return <XCircle size={16} className="text-red-600" />
    default: return <Clock size={16} className="text-gray-600" />
  }
}

function AppointmentListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-200 rounded-xl animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-slate-200 rounded-lg w-1/3 animate-pulse" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="w-24 h-16 bg-slate-200 rounded-lg animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}