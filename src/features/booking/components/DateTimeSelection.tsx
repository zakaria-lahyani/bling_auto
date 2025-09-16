'use client'

import React, { useState } from 'react'
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, Heading3, BodyText, Caption, Button } from '../../../components/ui'
import type { BookingSlot } from '../types'

interface DateTimeSelectionProps {
  availableSlots: BookingSlot[]
  selectedSlot?: BookingSlot
  onSlotSelect: (slot: BookingSlot) => void
  isLoading?: boolean
}

export const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  availableSlots,
  selectedSlot,
  onSlotSelect,
  isLoading = false
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })
  
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get unique dates from available slots
  const availableDates = [...new Set(availableSlots.map(slot => slot.date))].sort()
  
  // Get slots for selected date
  const slotsForDate = availableSlots.filter(slot => slot.date === selectedDate)

  // Calendar logic
  const generateCalendarDays = (month: Date) => {
    const year = month.getFullYear()
    const monthIndex = month.getMonth()
    
    const firstDay = new Date(year, monthIndex, 1)
    const lastDay = new Date(year, monthIndex + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      days.push(day)
    }
    
    return days
  }

  const calendarDays = generateCalendarDays(currentMonth)
  const today = new Date().toISOString().split('T')[0]

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + (direction === 'next' ? 1 : -1))
    setCurrentMonth(newMonth)
  }

  const isDateAvailable = (date: string) => {
    return availableDates.includes(date)
  }

  const isDateDisabled = (date: string) => {
    return date < today || !isDateAvailable(date)
  }

  return (
    <div className="space-y-6">
      <div>
        <Heading3 className="mb-2">Select Date & Time</Heading3>
        <BodyText color="secondary">
          Choose your preferred appointment date and time slot
        </BodyText>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Heading3>
              {currentMonth.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </Heading3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                leftIcon={<ChevronLeft size={16} />}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                rightIcon={<ChevronRight size={16} />}
              />
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-content-muted">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              const dateString = day.toISOString().split('T')[0]
              const isCurrentMonth = day.getMonth() === currentMonth.getMonth()
              const isSelected = dateString === selectedDate
              const isAvailable = isDateAvailable(dateString)
              const isDisabled = isDateDisabled(dateString)
              
              return (
                <button
                  key={index}
                  onClick={() => !isDisabled && setSelectedDate(dateString)}
                  disabled={isDisabled}
                  className={`
                    p-2 text-sm rounded-lg transition-colors relative
                    ${!isCurrentMonth ? 'text-content-muted' : ''}
                    ${isSelected ? 'bg-brand-500 text-white' : ''}
                    ${isAvailable && !isSelected ? 'hover:bg-brand-50 text-brand-600' : ''}
                    ${isDisabled ? 'text-content-muted cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    ${dateString === today ? 'font-bold' : ''}
                  `}
                >
                  {day.getDate()}
                  {isAvailable && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brand-500 rounded-full" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-brand-500 rounded-full" />
              <span className="text-content-muted">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-content-muted rounded-full opacity-50" />
              <span className="text-content-muted">Unavailable</span>
            </div>
          </div>
        </Card>

        {/* Time Slots */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-content-muted" />
            <Heading3>Available Times</Heading3>
          </div>
          
          {selectedDate && (
            <div className="mb-4">
              <Caption color="muted">
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Caption>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8">
              <BodyText color="muted">Loading available times...</BodyText>
            </div>
          ) : slotsForDate.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon size={48} className="text-content-muted mx-auto mb-4" />
              <BodyText color="muted">
                {selectedDate 
                  ? 'No available time slots for this date'
                  : 'Please select a date to see available times'
                }
              </BodyText>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {slotsForDate.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.isAvailable && onSlotSelect(slot)}
                  disabled={!slot.isAvailable}
                  className={`
                    p-3 rounded-lg border text-center transition-all
                    ${selectedSlot?.id === slot.id 
                      ? 'border-brand-500 bg-brand-50 text-brand-700' 
                      : slot.isAvailable
                        ? 'border-border hover:border-brand-300 hover:bg-brand-50'
                        : 'border-border bg-surface-muted text-content-muted cursor-not-allowed'
                    }
                  `}
                >
                  <div className="font-medium">{slot.time}</div>
                  {!slot.isAvailable && (
                    <div className="text-xs text-content-danger mt-1">Unavailable</div>
                  )}
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}