/**
 * Domain Service: Client Service
 * 
 * Business logic for client operations.
 * Pure functions with no infrastructure dependencies.
 */

import {
  Client,
  MembershipStatus,
  LoyaltyTier,
  ClientStats,
  ServiceRecommendation,
  Vehicle,
  ClientAddress,
  PaymentMethod,
  PromoCode
} from '../entities/client/types'
import { ClientBooking, BookingStatus } from '../entities/client-booking/types'
import { Service } from '../entities/service/types'

export class ClientService {
  /**
   * Calculate loyalty points for a purchase
   */
  static calculateLoyaltyPoints(
    amount: number,
    membershipStatus: MembershipStatus
  ): number {
    const basePoints = Math.floor(amount)
    
    switch (membershipStatus) {
      case MembershipStatus.ELITE:
        return basePoints * 3
      case MembershipStatus.PREMIUM:
        return basePoints * 2
      case MembershipStatus.BASIC:
      default:
        return basePoints
    }
  }

  /**
   * Calculate discount based on membership
   */
  static calculateMembershipDiscount(
    amount: number,
    membershipStatus: MembershipStatus
  ): number {
    switch (membershipStatus) {
      case MembershipStatus.ELITE:
        return amount * 0.20 // 20% discount
      case MembershipStatus.PREMIUM:
        return amount * 0.10 // 10% discount
      case MembershipStatus.BASIC:
      default:
        return 0
    }
  }

  /**
   * Determine loyalty tier based on points
   */
  static getLoyaltyTier(points: number): LoyaltyTier {
    if (points >= 10000) return LoyaltyTier.PLATINUM
    if (points >= 5000) return LoyaltyTier.GOLD
    if (points >= 1000) return LoyaltyTier.SILVER
    return LoyaltyTier.BRONZE
  }

  /**
   * Check if client is eligible for free service
   */
  static checkFreeServiceEligibility(
    bookingsCount: number,
    membershipStatus: MembershipStatus
  ): { eligible: boolean; bookingsUntilFree: number } {
    const requiredBookings = membershipStatus === MembershipStatus.ELITE ? 5 : 10
    const bookingsUntilFree = requiredBookings - (bookingsCount % requiredBookings)
    
    return {
      eligible: bookingsUntilFree === requiredBookings,
      bookingsUntilFree: bookingsUntilFree === requiredBookings ? 0 : bookingsUntilFree
    }
  }

  /**
   * Calculate client statistics
   */
  static calculateClientStats(
    client: Client,
    bookings: ClientBooking[]
  ): ClientStats {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    const bookingsThisMonth = bookings.filter(
      b => new Date(b.scheduledDate) >= startOfMonth
    )
    
    const completedBookings = bookings.filter(
      b => b.status === BookingStatus.COMPLETED
    )
    
    const totalSpent = completedBookings.reduce(
      (sum, b) => sum + (b.price?.total || 0), 
      0
    )
    
    const spentThisMonth = bookingsThisMonth
      .filter(b => b.status === BookingStatus.COMPLETED)
      .reduce((sum, b) => sum + (b.price?.total || 0), 0)
    
    const ratings = completedBookings
      .filter(b => b.rating?.rating)
      .map(b => b.rating!.rating)
    
    const averageRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
      : 0
    
    const activePromoCodes = 2 // Would be calculated from actual promo codes
    
    return {
      totalBookings: bookings.length,
      bookingsThisMonth: bookingsThisMonth.length,
      totalSpent,
      spentThisMonth,
      averageRating,
      loyaltyPoints: client.loyaltyPoints,
      walletBalance: client.walletBalance,
      activePromoCodes
    }
  }

  /**
   * Generate service recommendations
   */
  static generateRecommendations(
    client: Client,
    bookings: ClientBooking[],
    services: Service[]
  ): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = []
    
    // Most booked service
    const serviceFrequency = bookings.reduce((acc, booking) => {
      acc[booking.serviceId] = (acc[booking.serviceId] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const mostBookedServiceId = Object.entries(serviceFrequency)
      .sort(([, a], [, b]) => b - a)[0]?.[0]
    
    if (mostBookedServiceId) {
      recommendations.push({
        serviceId: mostBookedServiceId,
        reason: 'Your favorite service',
        priority: 1,
        discount: 10
      })
    }
    
    // Eco-friendly services if preferred
    if (client.preferences?.services?.ecoFriendly) {
      const ecoService = services.find(s => 
        s.tags?.includes('eco-friendly')
      )
      if (ecoService) {
        recommendations.push({
          serviceId: ecoService.id,
          reason: 'Eco-friendly option',
          priority: 2,
          discount: 5
        })
      }
    }
    
    // Premium services for premium members
    if (client.membershipStatus === MembershipStatus.PREMIUM ||
        client.membershipStatus === MembershipStatus.ELITE) {
      const premiumService = services.find(s => 
        s.category?.name === 'Premium'
      )
      if (premiumService) {
        recommendations.push({
          serviceId: premiumService.id,
          reason: 'Exclusive for Premium members',
          priority: 3,
          discount: 15
        })
      }
    }
    
    return recommendations.slice(0, 3) // Top 3 recommendations
  }

  /**
   * Validate promo code for client
   */
  static validatePromoCode(
    promoCode: PromoCode,
    client: Client,
    amount: number,
    serviceId?: string
  ): { valid: boolean; reason?: string; discount?: number } {
    const now = new Date()
    
    // Check if active
    if (!promoCode.isActive) {
      return { valid: false, reason: 'Promo code is not active' }
    }
    
    // Check validity period
    if (now < promoCode.validFrom || now > promoCode.validUntil) {
      return { valid: false, reason: 'Promo code has expired' }
    }
    
    // Check usage limit
    if (promoCode.usageLimit && promoCode.usedCount >= promoCode.usageLimit) {
      return { valid: false, reason: 'Promo code usage limit reached' }
    }
    
    // Check minimum purchase
    if (promoCode.minimumPurchase && amount < promoCode.minimumPurchase) {
      return { 
        valid: false, 
        reason: `Minimum purchase of $${promoCode.minimumPurchase} required` 
      }
    }
    
    // Check client restrictions
    if (promoCode.clientRestrictions?.length && 
        !promoCode.clientRestrictions.includes(client.id)) {
      return { valid: false, reason: 'Promo code not valid for your account' }
    }
    
    // Check applicable services
    if (serviceId && promoCode.applicableServices?.length &&
        !promoCode.applicableServices.includes(serviceId)) {
      return { valid: false, reason: 'Promo code not valid for this service' }
    }
    
    // Calculate discount
    let discount = promoCode.discountType === 'percentage'
      ? amount * (promoCode.discountValue / 100)
      : promoCode.discountValue
    
    // Apply maximum discount cap
    if (promoCode.maximumDiscount && discount > promoCode.maximumDiscount) {
      discount = promoCode.maximumDiscount
    }
    
    return { valid: true, discount }
  }

  /**
   * Check if client can use loyalty points
   */
  static canUseLoyaltyPoints(
    client: Client,
    pointsRequested: number,
    minimumPoints: number = 100
  ): { canUse: boolean; reason?: string; value?: number } {
    if (client.loyaltyPoints < minimumPoints) {
      return { 
        canUse: false, 
        reason: `Minimum ${minimumPoints} points required` 
      }
    }
    
    if (pointsRequested > client.loyaltyPoints) {
      return { 
        canUse: false, 
        reason: `You only have ${client.loyaltyPoints} points available` 
      }
    }
    
    // 10 points = $1
    const value = pointsRequested / 10
    
    return { canUse: true, value }
  }

  /**
   * Get primary vehicle
   */
  static getPrimaryVehicle(vehicles: Vehicle[]): Vehicle | undefined {
    return vehicles.find(v => v.isPrimary) || vehicles[0]
  }

  /**
   * Get default address
   */
  static getDefaultAddress(addresses: ClientAddress[]): ClientAddress | undefined {
    return addresses.find(a => a.isDefault) || addresses[0]
  }

  /**
   * Get primary payment method
   */
  static getPrimaryPaymentMethod(methods: PaymentMethod[]): PaymentMethod | undefined {
    return methods.find(m => m.isPrimary && m.isActive) || 
           methods.find(m => m.isActive)
  }

  /**
   * Calculate next free wash
   */
  static calculateNextFreeWash(
    bookingsCount: number,
    membershipStatus: MembershipStatus
  ): number {
    const eligibility = this.checkFreeServiceEligibility(bookingsCount, membershipStatus)
    return eligibility.bookingsUntilFree
  }

  /**
   * Format membership benefits
   */
  static getMembershipBenefits(status: MembershipStatus): string[] {
    switch (status) {
      case MembershipStatus.ELITE:
        return [
          '20% off all services',
          '3x loyalty points',
          'VIP booking priority',
          'Unlimited basic washes',
          'Dedicated account manager',
          'Exclusive services access'
        ]
      case MembershipStatus.PREMIUM:
        return [
          '10% off all services',
          '2x loyalty points',
          'Priority booking',
          'Free monthly basic wash',
          '24/7 support'
        ]
      case MembershipStatus.BASIC:
      default:
        return [
          'Basic wash discounts',
          'Loyalty points',
          'Email support'
        ]
    }
  }
}