/**
 * Repository Interface: Vehicle Repository
 * 
 * Infrastructure layer interface for vehicle data operations.
 * Defines the contract for vehicle data persistence.
 */

import { Vehicle } from '../../../core/entities/client/types'

export interface IVehicleRepository {
  // Basic CRUD operations
  findById(id: string): Promise<Vehicle | null>
  findByClientId(clientId: string): Promise<Vehicle[]>
  findByPlateNumber(plateNumber: string): Promise<Vehicle | null>
  create(vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle>
  update(vehicle: Vehicle): Promise<Vehicle>
  delete(id: string): Promise<void>

  // Query operations
  findPrimaryByClientId(clientId: string): Promise<Vehicle | null>
  findByMakeAndModel(make: string, model: string): Promise<Vehicle[]>
  searchByPlateNumber(query: string, limit?: number): Promise<Vehicle[]>
  
  // Aggregation operations
  countByClientId(clientId: string): Promise<number>
  countByMake(make: string): Promise<number>
}