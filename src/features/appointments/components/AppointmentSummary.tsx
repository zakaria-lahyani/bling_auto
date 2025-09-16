'use client'

import React from 'react'
import { Calendar, CheckCircle, Clock, Star } from 'lucide-react'
import { useAppointments, useUpcomingAppointments } from '../hooks/useAppointments'

interface AppointmentSummaryProps {
  customerId?: string
}

export function AppointmentSummary({ customerId }: AppointmentSummaryProps) {
  const { appointments: allAppointments } = useAppointments(
    customerId ? { customerEmail: customerId } : undefined
  )
  const { appointments: upcomingAppointments } = useUpcomingAppointments()

  const completedAppointments = allAppointments.filter(a => a.statusLabel === 'Completed')
  const totalAppointments = allAppointments.length
  
  // Calculate total points earned (mock calculation)
  const totalPoints = completedAppointments.length * 25

  const summaryItems = [
    {
      label: 'Upcoming',
      value: upcomingAppointments.length,
      icon: Calendar,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      label: 'Completed',
      value: completedAppointments.length,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      label: 'Total Services',
      value: totalAppointments,
      icon: Clock,
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      label: 'Points Earned',
      value: totalPoints,
      icon: Star,
      color: 'teal',
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {summaryItems.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.label} className="bg-white border border-slate-200 rounded-3xl p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center`}>
                <Icon size={20} className={item.textColor} />
              </div>
              <div>
                <p className="text-sm text-slate-600">{item.label}</p>
                <p className="text-xl font-semibold text-slate-900">{item.value}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}