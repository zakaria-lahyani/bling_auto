/**
 * Repository Interface: Address Repository
 * 
 * Infrastructure layer interface for client address data operations.
 * Defines the contract for address data persistence.
 */

import { ClientAddress } from '../../../core/entities/client/types'

export interface IAddressRepository {
  // Basic CRUD operations
  findById(id: string): Promise<ClientAddress | null>
  findByClientId(clientId: string): Promise<ClientAddress[]>
  create(address: Omit<ClientAddress, 'id' | 'createdAt' | 'updatedAt'>): Promise<ClientAddress>
  update(address: ClientAddress): Promise<ClientAddress>
  delete(id: string): Promise<void>

  // Query operations
  findDefaultByClientId(clientId: string): Promise<ClientAddress | null>
  findByZipCode(zipCode: string): Promise<ClientAddress[]>
  findNearby(latitude: number, longitude: number, radiusKm: number): Promise<ClientAddress[]>
  
  // Aggregation operations
  countByClientId(clientId: string): Promise<number>
  countByCity(city: string): Promise<number>
}