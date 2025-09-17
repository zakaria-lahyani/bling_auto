/**
 * Pricing Service Interface
 */

import type { Service } from '@/core/entities/service/types'
import type { VehicleInfo, Location } from '@/core/entities/booking/types'

export interface PricingCalculation {
  basePrice: number
  vehicleMultiplier: number
  locationMultiplier: number
  discounts: PricingDiscount[]
  taxes: PricingTax[]
  totalPrice: number
  estimatedDuration: number
}

export interface PricingDiscount {
  type: 'loyalty' | 'seasonal' | 'bulk' | 'first_time'
  name: string
  amount: number
  percentage?: number
}

export interface PricingTax {
  type: 'sales_tax' | 'service_tax' | 'environmental_fee'
  name: string
  rate: number
  amount: number
}

export interface PricingFactors {
  vehicleSize: 'small' | 'medium' | 'large' | 'xl'
  serviceComplexity: 'basic' | 'standard' | 'premium'
  locationFactor: number
  timeOfDay?: 'peak' | 'standard' | 'off_peak'
  dayOfWeek?: 'weekday' | 'weekend'
}

export interface IPricingService {
  calculatePrice(
    service: Service,
    vehicleInfo: VehicleInfo,
    location: Location,
    factors?: Partial<PricingFactors>
  ): Promise<number>

  calculateDetailedPrice(
    service: Service,
    vehicleInfo: VehicleInfo,
    location: Location,
    factors?: Partial<PricingFactors>
  ): Promise<PricingCalculation>

  getBasePrice(serviceId: string): Promise<number>
  getVehicleMultiplier(vehicleType: VehicleInfo['vehicleType'], vehicleSize: 'small' | 'medium' | 'large' | 'xl'): number
  getLocationMultiplier(location: Location): Promise<number>
  getAvailableDiscounts(customerId?: string): Promise<PricingDiscount[]>
  applyDiscount(basePrice: number, discount: PricingDiscount): number
}

export class PricingService implements IPricingService {
  async calculatePrice(
    service: Service,
    vehicleInfo: VehicleInfo,
    location: Location,
    _factors?: Partial<PricingFactors>
  ): Promise<number> {
    const calculation = await this.calculateDetailedPrice(service, vehicleInfo, location)
    return calculation.totalPrice
  }

  async calculateDetailedPrice(
    service: Service,
    vehicleInfo: VehicleInfo,
    location: Location,
    _factors?: Partial<PricingFactors>
  ): Promise<PricingCalculation> {
    const basePrice = await this.getBasePrice(service.id)
    const vehicleMultiplier = this.getVehicleMultiplier(vehicleInfo.vehicleType, 'medium') // Default size since it's not in VehicleInfo
    const locationMultiplier = await this.getLocationMultiplier(location)

    const adjustedPrice = basePrice * vehicleMultiplier * locationMultiplier

    // For now, return simple calculation
    // TODO: Implement complex pricing logic with discounts and taxes
    return {
      basePrice,
      vehicleMultiplier,
      locationMultiplier,
      discounts: [],
      taxes: [],
      totalPrice: Math.round(adjustedPrice * 100) / 100,
      estimatedDuration: 60 // Default duration since service doesn't have this property
    }
  }

  async getBasePrice(serviceId: string): Promise<number> {
    // TODO: Fetch from pricing repository or service data
    const basePrices: Record<string, number> = {
      'basic-wash': 25,
      'premium-wash': 45,
      'detail-wash': 85,
      'mobile-wash': 35
    }
    return basePrices[serviceId] || 30
  }

  getVehicleMultiplier(vehicleType: VehicleInfo['vehicleType'], vehicleSize: 'small' | 'medium' | 'large' | 'xl'): number {
    const sizeMultipliers = {
      small: 1.0,
      medium: 1.2,
      large: 1.5,
      xl: 1.8
    }

    const typeMultipliers = {
      sedan: 1.0,
      suv: 1.3,
      truck: 1.4,
      van: 1.5,
      motorcycle: 0.7,
      other: 1.1
    }

    return (sizeMultipliers[vehicleSize] || 1.0) * (typeMultipliers[vehicleType] || 1.0)
  }

  async getLocationMultiplier(_location: Location): Promise<number> {
    // TODO: Implement distance-based pricing
    return 1.0
  }

  async getAvailableDiscounts(_customerId?: string): Promise<PricingDiscount[]> {
    // TODO: Implement discount logic
    return []
  }

  applyDiscount(basePrice: number, discount: PricingDiscount): number {
    if (discount.percentage) {
      return basePrice * (1 - discount.percentage / 100)
    }
    return Math.max(0, basePrice - discount.amount)
  }
}