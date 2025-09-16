// User domain types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: UserRole
  preferences: UserPreferences
  addresses: Address[]
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'customer' | 'operator' | 'admin' | 'manager'

export interface UserPreferences {
  preferredContactMethod: 'email' | 'phone' | 'sms'
  notifications: {
    booking: boolean
    promotions: boolean
    reminders: boolean
  }
  defaultLocation?: string
}

export interface Address {
  id: string
  label: string // 'Home', 'Work', etc.
  street: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

export interface Customer extends User {
  role: 'customer'
  loyaltyPoints: number
  totalBookings: number
  membershipLevel: 'bronze' | 'silver' | 'gold' | 'platinum'
}

export interface Operator extends User {
  role: 'operator'
  skills: string[]
  serviceAreas: string[]
  rating: number
  isActive: boolean
}