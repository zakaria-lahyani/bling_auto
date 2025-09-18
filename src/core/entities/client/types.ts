/**
 * Domain Entity: Client
 * 
 * Core business entities for client/user domain.
 * These are pure business objects with no dependencies on infrastructure.
 */

// Client entity
export interface Client {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  membershipStatus: MembershipStatus
  memberSince: Date
  loyaltyPoints: number
  walletBalance: number
  preferredPaymentMethodId?: string
  defaultAddressId?: string
  preferences: ClientPreferences
  vehicles: Vehicle[]
  createdAt: Date
  updatedAt: Date
}

// Membership tiers
export enum MembershipStatus {
  BASIC = 'basic',
  PREMIUM = 'premium',
  ELITE = 'elite'
}

// Client preferences
export interface ClientPreferences {
  notifications: NotificationPreferences
  services: ServicePreferences
  communication: CommunicationPreferences
  display: DisplayPreferences
}

export interface NotificationPreferences {
  email: boolean
  sms: boolean
  push: boolean
}

export interface ServicePreferences {
  ecoFriendly: boolean
  premiumProducts: boolean
  expressService: boolean
  preferredTimeSlots?: string[]
}

export interface CommunicationPreferences {
  marketingEmails: boolean
  serviceTips: boolean
  promotions: boolean
}

export interface DisplayPreferences {
  darkMode: boolean
  language: string
  currency: string
}

// Vehicle entity
export interface Vehicle {
  id: string
  clientId: string
  make: string
  model: string
  year: string
  color: string
  plateNumber: string
  vin?: string
  isPrimary: boolean
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// Address entity
export interface ClientAddress {
  id: string
  clientId: string
  label: string // "Home", "Office", etc.
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  isDefault: boolean
  instructions?: string
  createdAt: Date
  updatedAt: Date
}

// Payment method entity
export interface PaymentMethod {
  id: string
  clientId: string
  type: PaymentMethodType
  provider?: string // 'visa', 'mastercard', 'apple', etc.
  last4?: string
  expiryMonth?: number
  expiryYear?: number
  holderName: string
  isPrimary: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export enum PaymentMethodType {
  CARD = 'card',
  WALLET = 'wallet',
  BANK_ACCOUNT = 'bank_account',
  LOYALTY_POINTS = 'loyalty_points'
}

// Loyalty program
export interface LoyaltyAccount {
  clientId: string
  points: number
  tier: LoyaltyTier
  pointsEarnedThisMonth: number
  pointsRedeemedThisMonth: number
  nextTierPoints: number
  expiringPoints?: {
    amount: number
    expiryDate: Date
  }
  history: LoyaltyTransaction[]
}

export enum LoyaltyTier {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum'
}

export interface LoyaltyTransaction {
  id: string
  type: 'earned' | 'redeemed' | 'expired'
  points: number
  description: string
  referenceId?: string // booking ID, etc.
  date: Date
}

// Wallet
export interface Wallet {
  clientId: string
  balance: number
  currency: string
  transactions: WalletTransaction[]
  lastUpdated: Date
}

export interface WalletTransaction {
  id: string
  type: 'credit' | 'debit' | 'refund'
  amount: number
  description: string
  referenceId?: string
  date: Date
  status: 'completed' | 'pending' | 'failed'
}

// Promo codes
export interface PromoCode {
  id: string
  code: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minimumPurchase?: number
  maximumDiscount?: number
  validFrom: Date
  validUntil: Date
  usageLimit?: number
  usedCount: number
  applicableServices?: string[]
  clientRestrictions?: string[] // specific client IDs
  isActive: boolean
}

export interface ClientPromoCode {
  clientId: string
  promoCodeId: string
  promoCode: PromoCode
  usedAt?: Date
  appliedToBookingId?: string
}

// Client session
export interface ClientSession {
  clientId: string
  token: string
  refreshToken?: string
  expiresAt: Date
  device?: string
  ipAddress?: string
  lastActivity: Date
}

// Dashboard data
export interface ClientDashboard {
  client: Client
  upcomingBookings: any[] // Will reference booking entity
  recentActivity: ActivityItem[]
  stats: ClientStats
  recommendations: ServiceRecommendation[]
}

export interface ActivityItem {
  id: string
  type: 'booking' | 'payment' | 'review' | 'loyalty' | 'promo'
  title: string
  description: string
  date: Date
  status?: string
  metadata?: Record<string, any>
}

export interface ClientStats {
  totalBookings: number
  bookingsThisMonth: number
  totalSpent: number
  spentThisMonth: number
  averageRating: number
  loyaltyPoints: number
  walletBalance: number
  activePromoCodes: number
}

export interface ServiceRecommendation {
  serviceId: string
  reason: string // "Most booked", "Based on your preferences", etc.
  priority: number
  discount?: number
}

// Export all types
export type ClientEntity = Client