/**
 * Domain Entity: Client Booking
 * 
 * Core business entities for client booking domain.
 */

import { Client, Vehicle, ClientAddress, PaymentMethod } from '../client/types'
import { Service } from '../service/types'

// Booking entity
export interface ClientBooking {
  id: string
  clientId: string
  client?: Client
  serviceId: string
  service?: Service
  vehicleId: string
  vehicle?: Vehicle
  addressId: string
  address?: ClientAddress
  scheduledDate: Date
  scheduledTime: string
  estimatedDuration: number // in minutes
  status: BookingStatus
  paymentMethodId?: string
  paymentMethod?: PaymentMethod
  price: BookingPrice
  washer?: Washer
  notes?: string
  cancellationReason?: string
  completedAt?: Date
  rating?: BookingRating
  createdAt: Date
  updatedAt: Date
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}

export interface BookingPrice {
  basePrice: number
  discount: number
  discountReason?: string
  addOns: BookingAddOn[]
  serviceFee: number
  tip?: number
  tax: number
  total: number
  currency: string
  promoCodeApplied?: string
  loyaltyPointsUsed?: number
}

export interface BookingAddOn {
  id: string
  name: string
  price: number
  quantity: number
}

export interface Washer {
  id: string
  name: string
  photo?: string
  rating: number
  totalJobs: number
  phoneNumber?: string
  isAvailable: boolean
}

export interface BookingRating {
  rating: number // 1-5
  review?: string
  photos?: string[]
  washerResponse?: string
  createdAt: Date
}

// Booking flow state
export interface BookingFlowState {
  step: BookingFlowStep
  serviceSelection?: ServiceSelection
  scheduleSelection?: ScheduleSelection
  locationSelection?: LocationSelection
  paymentSelection?: PaymentSelection
  confirmation?: BookingConfirmation
}

export enum BookingFlowStep {
  SERVICE = 'service',
  SCHEDULE = 'schedule',
  LOCATION = 'location',
  PAYMENT = 'payment',
  CONFIRMATION = 'confirmation'
}

export interface ServiceSelection {
  serviceId: string
  service?: Service
  addOns: string[]
  specialInstructions?: string
}

export interface ScheduleSelection {
  date: Date
  time: string
  duration: number
  isFlexible: boolean
}

export interface LocationSelection {
  addressId: string
  address?: ClientAddress
  vehicleId: string
  vehicle?: Vehicle
  parkingInstructions?: string
}

export interface PaymentSelection {
  paymentMethodId: string
  paymentMethod?: PaymentMethod
  promoCode?: string
  useLoyaltyPoints: boolean
  loyaltyPointsAmount?: number
  tipAmount?: number
}

export interface BookingConfirmation {
  bookingId: string
  booking: ClientBooking
  estimatedArrival?: Date
  washer?: Washer
  confirmationCode: string
}

// Booking management
export interface BookingModification {
  bookingId: string
  modificationType: ModificationType
  newDate?: Date
  newTime?: string
  newAddressId?: string
  newVehicleId?: string
  newServiceId?: string
  reason: string
  requestedAt: Date
  approvedAt?: Date
  status: 'pending' | 'approved' | 'rejected'
}

export enum ModificationType {
  RESCHEDULE = 'reschedule',
  CHANGE_LOCATION = 'change_location',
  CHANGE_VEHICLE = 'change_vehicle',
  CHANGE_SERVICE = 'change_service',
  ADD_SERVICE = 'add_service',
  CANCEL = 'cancel'
}

// Booking filters and search
export interface BookingFilters {
  status?: BookingStatus[]
  dateFrom?: Date
  dateTo?: Date
  serviceIds?: string[]
  vehicleIds?: string[]
  minPrice?: number
  maxPrice?: number
  washerIds?: string[]
  hasReview?: boolean
}

export interface BookingSearchResult {
  bookings: ClientBooking[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// Booking statistics
export interface BookingStatistics {
  clientId: string
  totalBookings: number
  completedBookings: number
  cancelledBookings: number
  upcomingBookings: number
  totalSpent: number
  averageBookingValue: number
  favoriteService?: Service
  favoriteWasher?: Washer
  preferredTimeSlots: string[]
  lastBookingDate?: Date
}

// Quick booking templates
export interface QuickBookingTemplate {
  id: string
  clientId: string
  name: string
  serviceId: string
  vehicleId: string
  addressId: string
  preferredDay?: string // 'monday', 'tuesday', etc.
  preferredTime?: string
  addOns?: string[]
  notes?: string
  isDefault: boolean
  usageCount: number
  lastUsed?: Date
}

// Recurring bookings
export interface RecurringBooking {
  id: string
  clientId: string
  templateId: string
  template: QuickBookingTemplate
  frequency: BookingFrequency
  startDate: Date
  endDate?: Date
  nextScheduledDate: Date
  totalOccurrences?: number
  completedOccurrences: number
  isActive: boolean
  pausedUntil?: Date
}

export enum BookingFrequency {
  WEEKLY = 'weekly',
  BI_WEEKLY = 'bi_weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly'
}

// Booking notifications
export interface BookingNotification {
  id: string
  bookingId: string
  type: NotificationType
  title: string
  message: string
  sentAt: Date
  readAt?: Date
  channel: 'email' | 'sms' | 'push' | 'in_app'
}

export enum NotificationType {
  BOOKING_CONFIRMED = 'booking_confirmed',
  BOOKING_REMINDER = 'booking_reminder',
  WASHER_ON_WAY = 'washer_on_way',
  WASHER_ARRIVED = 'washer_arrived',
  SERVICE_STARTED = 'service_started',
  SERVICE_COMPLETED = 'service_completed',
  PAYMENT_PROCESSED = 'payment_processed',
  REVIEW_REQUEST = 'review_request',
  BOOKING_MODIFIED = 'booking_modified',
  BOOKING_CANCELLED = 'booking_cancelled'
}