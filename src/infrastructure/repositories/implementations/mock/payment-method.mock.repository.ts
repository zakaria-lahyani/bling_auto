/**
 * Mock Payment Method Repository
 * 
 * Infrastructure layer mock implementation for payment method data operations.
 * Used for testing and development.
 */

import { PaymentMethod, PaymentMethodType } from '../../../../core/entities/client/types'
import { IPaymentMethodRepository } from '../../interfaces/payment-method.repository'

export class MockPaymentMethodRepository implements IPaymentMethodRepository {
  private paymentMethods: PaymentMethod[] = [
    {
      id: 'payment-1',
      clientId: 'client-1',
      type: PaymentMethodType.CARD,
      provider: 'visa',
      last4: '1234',
      expiryMonth: 12,
      expiryYear: 2025,
      holderName: 'Sarah Johnson',
      isPrimary: true,
      isActive: true,
      createdAt: new Date('2022-01-15'),
      updatedAt: new Date()
    },
    {
      id: 'payment-2',
      clientId: 'client-1',
      type: PaymentMethodType.CARD,
      provider: 'mastercard',
      last4: '5678',
      expiryMonth: 6,
      expiryYear: 2024,
      holderName: 'Sarah Johnson',
      isPrimary: false,
      isActive: true,
      createdAt: new Date('2022-03-20'),
      updatedAt: new Date()
    },
    {
      id: 'payment-3',
      clientId: 'client-1',
      type: PaymentMethodType.WALLET,
      provider: 'apple',
      last4: '9012',
      holderName: 'Apple Pay',
      isPrimary: false,
      isActive: true,
      createdAt: new Date('2022-05-10'),
      updatedAt: new Date()
    }
  ]

  async findById(id: string): Promise<PaymentMethod | null> {
    return this.paymentMethods.find(method => method.id === id) || null
  }

  async findByClientId(clientId: string): Promise<PaymentMethod[]> {
    return this.paymentMethods.filter(method => method.clientId === clientId)
  }

  async create(methodData: Omit<PaymentMethod, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaymentMethod> {
    const paymentMethod: PaymentMethod = {
      ...methodData,
      id: `payment-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    this.paymentMethods.push(paymentMethod)
    return paymentMethod
  }

  async update(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
    const index = this.paymentMethods.findIndex(m => m.id === paymentMethod.id)
    if (index === -1) {
      throw new Error('Payment method not found')
    }
    
    const updatedMethod = {
      ...paymentMethod,
      updatedAt: new Date()
    }
    
    this.paymentMethods[index] = updatedMethod
    return updatedMethod
  }

  async delete(id: string): Promise<void> {
    const index = this.paymentMethods.findIndex(method => method.id === id)
    if (index === -1) {
      throw new Error('Payment method not found')
    }
    
    this.paymentMethods.splice(index, 1)
  }

  async findPrimaryByClientId(clientId: string): Promise<PaymentMethod | null> {
    return this.paymentMethods.find(method => 
      method.clientId === clientId && method.isPrimary && method.isActive
    ) || null
  }

  async findActiveByClientId(clientId: string): Promise<PaymentMethod[]> {
    return this.paymentMethods.filter(method => 
      method.clientId === clientId && method.isActive
    )
  }

  async findByType(type: PaymentMethodType): Promise<PaymentMethod[]> {
    return this.paymentMethods.filter(method => method.type === type)
  }

  async findByLast4(last4: string): Promise<PaymentMethod[]> {
    return this.paymentMethods.filter(method => method.last4 === last4)
  }

  async countByClientId(clientId: string): Promise<number> {
    return this.paymentMethods.filter(method => method.clientId === clientId).length
  }

  async countByType(type: PaymentMethodType): Promise<number> {
    return this.paymentMethods.filter(method => method.type === type).length
  }

  async countActiveByClientId(clientId: string): Promise<number> {
    return this.paymentMethods.filter(method => 
      method.clientId === clientId && method.isActive
    ).length
  }
}