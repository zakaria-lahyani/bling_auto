/**
 * Repository Interface: Payment Method Repository
 * 
 * Infrastructure layer interface for payment method data operations.
 * Defines the contract for payment method data persistence.
 */

import { PaymentMethod, PaymentMethodType } from '../../../core/entities/client/types'

export interface IPaymentMethodRepository {
  // Basic CRUD operations
  findById(id: string): Promise<PaymentMethod | null>
  findByClientId(clientId: string): Promise<PaymentMethod[]>
  create(paymentMethod: Omit<PaymentMethod, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaymentMethod>
  update(paymentMethod: PaymentMethod): Promise<PaymentMethod>
  delete(id: string): Promise<void>

  // Query operations
  findPrimaryByClientId(clientId: string): Promise<PaymentMethod | null>
  findActiveByClientId(clientId: string): Promise<PaymentMethod[]>
  findByType(type: PaymentMethodType): Promise<PaymentMethod[]>
  findByLast4(last4: string): Promise<PaymentMethod[]>
  
  // Aggregation operations
  countByClientId(clientId: string): Promise<number>
  countByType(type: PaymentMethodType): Promise<number>
  countActiveByClientId(clientId: string): Promise<number>
}