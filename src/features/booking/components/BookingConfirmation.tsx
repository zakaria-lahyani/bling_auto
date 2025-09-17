'use client'

import React from 'react'
import { CheckCircle, Calendar, Clock, MapPin, Car, CreditCard, User } from 'lucide-react'
import { Card, Heading3, Heading2, BodyText, Caption, Button, Badge } from '@/shared/components/ui'
import type { BookingSlot, BookingLocation, VehicleInfo } from '../types'

// Import Service type from the single source of truth
import type { Service as CoreService } from '@/core/entities/service'

// Create a simplified interface for this component's needs
interface Service extends Pick<CoreService, 'id' | 'name' | 'price' | 'description'> {
  duration: number // This component uses number instead of string
}

interface BookingConfirmationProps {
  service: Service
  slot: BookingSlot
  location: BookingLocation
  vehicleInfo: VehicleInfo
  customerInfo?: {
    name: string
    email: string
    phone: string
  }
  onConfirm: () => void
  onEdit: (step: number) => void
  isLoading?: boolean
  estimatedTotal?: number
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  service,
  slot,
  location,
  vehicleInfo,
  customerInfo,
  onConfirm,
  onEdit,
  isLoading = false,
  estimatedTotal
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const calculateEndTime = (startTime: string, duration: number) => {
    const [hours, minutes] = startTime.split(':').map(Number)
    const startDate = new Date()
    startDate.setHours(hours, minutes, 0, 0)
    
    const endDate = new Date(startDate.getTime() + duration * 60000)
    return endDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const total = estimatedTotal || service.price

  return (
    <div className="space-y-6">
      <div>
        <Heading3 className="mb-2">Confirm Your Booking</Heading3>
        <BodyText color="secondary">
          Please review your booking details and confirm your appointment
        </BodyText>
      </div>

      {/* Service Details */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Heading3>Service Details</Heading3>
          <Button variant="outline" size="sm" onClick={() => onEdit(1)}>
            Edit
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
              <Car size={24} className="text-brand-600" />
            </div>
            <div className="flex-1">
              <BodyText weight="medium" className="mb-1">{service.name}</BodyText>
              <Caption color="muted" className="mb-2">{service.description}</Caption>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-content-muted" />
                  <Caption>{service.duration} minutes</Caption>
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard size={16} className="text-content-muted" />
                  <Caption className="font-medium">${service.price}</Caption>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Date & Time */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Heading3>Date & Time</Heading3>
          <Button variant="outline" size="sm" onClick={() => onEdit(2)}>
            Edit
          </Button>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Calendar size={24} className="text-blue-600" />
          </div>
          <div>
            <BodyText weight="medium" className="mb-1">
              {formatDate(slot.date)}
            </BodyText>
            <div className="flex items-center gap-2 mb-2">
              <Caption color="muted">
                {formatTime(slot.time)} - {calculateEndTime(slot.time, service.duration)}
              </Caption>
              <Badge variant="outline" className="text-xs">
                {service.duration} min
              </Badge>
            </div>
            <Caption color="muted">
              Please arrive 5 minutes early
            </Caption>
          </div>
        </div>
      </Card>

      {/* Location */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Heading3>Service Location</Heading3>
          <Button variant="outline" size="sm" onClick={() => onEdit(3)}>
            Edit
          </Button>
        </div>
        
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            location.type === 'mobile' ? 'bg-blue-100' : 'bg-green-100'
          }`}>
            <MapPin size={24} className={
              location.type === 'mobile' ? 'text-blue-600' : 'text-green-600'
            } />
          </div>
          <div>
            <BodyText weight="medium" className="mb-1">{location.name}</BodyText>
            <Caption color="muted" className="mb-2">{location.address}</Caption>
            <Badge 
              variant="outline" 
              className={`text-xs ${
                location.type === 'mobile' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'bg-green-50 text-green-700'
              }`}
            >
              {location.type === 'mobile' ? 'Mobile Service' : 'On-site Location'}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Vehicle Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Heading3>Vehicle Information</Heading3>
          <Button variant="outline" size="sm" onClick={() => onEdit(4)}>
            Edit
          </Button>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Car size={24} className="text-purple-600" />
          </div>
          <div>
            <BodyText weight="medium" className="mb-1">
              {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
            </BodyText>
            <div className="space-y-1">
              <Caption color="muted">Color: {vehicleInfo.color}</Caption>
              <Caption color="muted">License Plate: {vehicleInfo.licensePlate}</Caption>
            </div>
          </div>
        </div>
      </Card>

      {/* Customer Information */}
      {customerInfo && (
        <Card className="p-6">
          <Heading3 className="mb-4">Customer Information</Heading3>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <User size={24} className="text-teal-600" />
            </div>
            <div>
              <BodyText weight="medium" className="mb-1">{customerInfo.name}</BodyText>
              <div className="space-y-1">
                <Caption color="muted">{customerInfo.email}</Caption>
                <Caption color="muted">{customerInfo.phone}</Caption>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Pricing Summary */}
      <Card className="p-6">
        <Heading3 className="mb-4">Pricing Summary</Heading3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <Caption>Service Fee:</Caption>
            <Caption>${service.price}</Caption>
          </div>
          
          {location.type === 'mobile' && (
            <div className="flex justify-between">
              <Caption>Mobile Service:</Caption>
              <Caption className="text-green-600">Included</Caption>
            </div>
          )}
          
          <div className="flex justify-between">
            <Caption>Tax & Fees:</Caption>
            <Caption>$0</Caption>
          </div>
          
          <hr className="border-border" />
          
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>
      </Card>

      {/* Confirmation Actions */}
      <Card className="p-6">
        <div className="text-center">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
          <Heading2 className="mb-2">Ready to Confirm?</Heading2>
          <BodyText color="secondary" className="mb-6">
            You'll receive a confirmation email with all the details after booking.
          </BodyText>
          
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => onEdit(1)} disabled={isLoading}>
              Go Back
            </Button>
            <Button 
              onClick={onConfirm} 
              disabled={isLoading}
              className="min-w-[200px]"
            >
              {isLoading ? 'Processing...' : `Confirm Booking - $${total}`}
            </Button>
          </div>
        </div>
      </Card>

      {/* Terms & Conditions */}
      <Card className="p-4 bg-surface-muted">
        <Caption color="muted" className="text-center">
          By confirming this booking, you agree to our{' '}
          <a href="#" className="text-brand-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-brand-600 hover:underline">
            Cancellation Policy
          </a>
        </Caption>
      </Card>
    </div>
  )
}