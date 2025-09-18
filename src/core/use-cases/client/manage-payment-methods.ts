/**
 * Use Case: Manage Payment Methods
 * 
 * Application layer use cases for payment method management:
 * - Add payment method
 * - Update payment method
 * - Remove payment method
 * - Set primary payment method
 */

import { PaymentMethod, PaymentMethodType } from '../../entities/client/types'

export interface PaymentMethodRepository {
  findByClientId(clientId: string): Promise<PaymentMethod[]>
  findById(id: string): Promise<PaymentMethod | null>
  create(paymentMethod: Omit<PaymentMethod, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaymentMethod>
  update(paymentMethod: PaymentMethod): Promise<PaymentMethod>
  delete(id: string): Promise<void>
}

// Add Payment Method Use Case
export interface AddPaymentMethodRequest {
  clientId: string
  type: PaymentMethodType
  provider?: string
  last4?: string
  expiryMonth?: number
  expiryYear?: number
  holderName: string
  setPrimary?: boolean
}

export interface AddPaymentMethodResponse {
  paymentMethod: PaymentMethod
  success: boolean
  errors?: string[]
}

export class AddPaymentMethodUseCase {
  constructor(private paymentMethodRepository: PaymentMethodRepository) {}

  async execute(request: AddPaymentMethodRequest): Promise<AddPaymentMethodResponse> {
    const { clientId, type, provider, last4, expiryMonth, expiryYear, holderName, setPrimary } = request
    const errors: string[] = []

    // Validate required fields
    if (!holderName.trim()) {
      errors.push('Cardholder name is required')
    }

    // Validate card-specific fields
    if (type === PaymentMethodType.CARD) {
      if (!last4) errors.push('Last 4 digits are required for cards')
      if (!expiryMonth || expiryMonth < 1 || expiryMonth > 12) {
        errors.push('Valid expiry month is required for cards')
      }
      if (!expiryYear || expiryYear < new Date().getFullYear()) {
        errors.push('Valid expiry year is required for cards')
      }
      if (last4 && (last4.length !== 4 || !/^\d{4}$/.test(last4))) {
        errors.push('Last 4 digits must be exactly 4 numbers')
      }
    }

    if (errors.length > 0) {
      return { paymentMethod: {} as PaymentMethod, success: false, errors }
    }

    // Get existing payment methods
    const existingMethods = await this.paymentMethodRepository.findByClientId(clientId)
    const shouldBePrimary = setPrimary || existingMethods.length === 0

    // If setting as primary, update existing primary method
    if (shouldBePrimary && existingMethods.length > 0) {
      const currentPrimary = existingMethods.find(m => m.isPrimary)
      if (currentPrimary) {
        await this.paymentMethodRepository.update({
          ...currentPrimary,
          isPrimary: false,
          updatedAt: new Date()
        })
      }
    }

    // Create payment method
    const paymentMethod = await this.paymentMethodRepository.create({
      clientId,
      type,
      provider: provider?.toLowerCase(),
      last4,
      expiryMonth,
      expiryYear,
      holderName: holderName.trim(),
      isPrimary: shouldBePrimary,
      isActive: true
    })

    return { paymentMethod, success: true }
  }
}

// Update Payment Method Use Case
export interface UpdatePaymentMethodRequest {
  paymentMethodId: string
  clientId: string
  holderName?: string
  expiryMonth?: number
  expiryYear?: number
  isActive?: boolean
}

export interface UpdatePaymentMethodResponse {
  paymentMethod: PaymentMethod
  success: boolean
  errors?: string[]
}

export class UpdatePaymentMethodUseCase {
  constructor(private paymentMethodRepository: PaymentMethodRepository) {}

  async execute(request: UpdatePaymentMethodRequest): Promise<UpdatePaymentMethodResponse> {
    const { paymentMethodId, clientId, holderName, expiryMonth, expiryYear, isActive } = request
    const errors: string[] = []

    // Get existing payment method
    const paymentMethod = await this.paymentMethodRepository.findById(paymentMethodId)
    if (!paymentMethod) {
      throw new Error('Payment method not found')
    }

    // Verify ownership
    if (paymentMethod.clientId !== clientId) {
      throw new Error('Unauthorized: Payment method does not belong to client')
    }

    // Validate fields if provided
    if (holderName !== undefined && !holderName.trim()) {
      errors.push('Cardholder name cannot be empty')
    }

    if (expiryMonth !== undefined && (expiryMonth < 1 || expiryMonth > 12)) {
      errors.push('Valid expiry month is required')
    }

    if (expiryYear !== undefined && expiryYear < new Date().getFullYear()) {
      errors.push('Valid expiry year is required')
    }

    // Don't allow deactivating the only active payment method
    if (isActive === false && paymentMethod.isActive) {
      const allMethods = await this.paymentMethodRepository.findByClientId(clientId)
      const activeMethods = allMethods.filter(m => m.isActive && m.id !== paymentMethodId)
      if (activeMethods.length === 0) {
        errors.push('Cannot deactivate the only active payment method')
      }
    }

    if (errors.length > 0) {
      return { paymentMethod, success: false, errors }
    }

    // Update payment method
    const updatedPaymentMethod = await this.paymentMethodRepository.update({
      ...paymentMethod,
      ...(holderName !== undefined && { holderName: holderName.trim() }),
      ...(expiryMonth !== undefined && { expiryMonth }),
      ...(expiryYear !== undefined && { expiryYear }),
      ...(isActive !== undefined && { isActive }),
      updatedAt: new Date()
    })

    return { paymentMethod: updatedPaymentMethod, success: true }
  }
}

// Set Primary Payment Method Use Case
export interface SetPrimaryPaymentMethodRequest {
  paymentMethodId: string
  clientId: string
}

export interface SetPrimaryPaymentMethodResponse {
  success: boolean
  errors?: string[]
}

export class SetPrimaryPaymentMethodUseCase {
  constructor(private paymentMethodRepository: PaymentMethodRepository) {}

  async execute(request: SetPrimaryPaymentMethodRequest): Promise<SetPrimaryPaymentMethodResponse> {
    const { paymentMethodId, clientId } = request

    // Get payment method to be set as primary
    const paymentMethod = await this.paymentMethodRepository.findById(paymentMethodId)
    if (!paymentMethod) {
      throw new Error('Payment method not found')
    }

    // Verify ownership
    if (paymentMethod.clientId !== clientId) {
      throw new Error('Unauthorized: Payment method does not belong to client')
    }

    // Must be active to be primary
    if (!paymentMethod.isActive) {
      return {
        success: false,
        errors: ['Cannot set inactive payment method as primary']
      }
    }

    // Get all client payment methods
    const allMethods = await this.paymentMethodRepository.findByClientId(clientId)

    // Update all methods: set new primary and unset old primary
    await Promise.all(
      allMethods.map(m =>
        this.paymentMethodRepository.update({
          ...m,
          isPrimary: m.id === paymentMethodId,
          updatedAt: new Date()
        })
      )
    )

    return { success: true }
  }
}

// Remove Payment Method Use Case
export interface RemovePaymentMethodRequest {
  paymentMethodId: string
  clientId: string
}

export interface RemovePaymentMethodResponse {
  success: boolean
  errors?: string[]
}

export class RemovePaymentMethodUseCase {
  constructor(private paymentMethodRepository: PaymentMethodRepository) {}

  async execute(request: RemovePaymentMethodRequest): Promise<RemovePaymentMethodResponse> {
    const { paymentMethodId, clientId } = request

    // Get payment method to be removed
    const paymentMethod = await this.paymentMethodRepository.findById(paymentMethodId)
    if (!paymentMethod) {
      throw new Error('Payment method not found')
    }

    // Verify ownership
    if (paymentMethod.clientId !== clientId) {
      throw new Error('Unauthorized: Payment method does not belong to client')
    }

    // Get all client payment methods
    const allMethods = await this.paymentMethodRepository.findByClientId(clientId)

    // Don't allow removing the last payment method
    if (allMethods.length === 1) {
      return {
        success: false,
        errors: ['Cannot remove the last payment method. Please add another method first.']
      }
    }

    // If removing primary method, set another as primary
    if (paymentMethod.isPrimary) {
      const otherActiveMethod = allMethods.find(m => m.id !== paymentMethodId && m.isActive)
      if (otherActiveMethod) {
        await this.paymentMethodRepository.update({
          ...otherActiveMethod,
          isPrimary: true,
          updatedAt: new Date()
        })
      }
    }

    // Remove payment method
    await this.paymentMethodRepository.delete(paymentMethodId)

    return { success: true }
  }
}