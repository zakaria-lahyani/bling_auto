/**
 * Mock Vehicle Repository
 * 
 * Infrastructure layer mock implementation for vehicle data operations.
 * Used for testing and development.
 */

import { Vehicle } from '../../../../core/entities/client/types'
import { IVehicleRepository } from '../../interfaces/vehicle.repository'

export class MockVehicleRepository implements IVehicleRepository {
  private vehicles: Vehicle[] = [
    {
      id: 'vehicle-1',
      clientId: 'client-1',
      make: 'Tesla',
      model: 'Model 3',
      year: '2022',
      color: 'Pearl White',
      plateNumber: 'ABC123',
      vin: '5YJ3E1EA5KF123456',
      isPrimary: true,
      notes: 'Main vehicle for family use',
      createdAt: new Date('2022-01-15'),
      updatedAt: new Date()
    },
    {
      id: 'vehicle-2',
      clientId: 'client-1',
      make: 'BMW',
      model: 'X5',
      year: '2021',
      color: 'Black',
      plateNumber: 'XYZ789',
      vin: 'WBAJA7C55KC123456',
      isPrimary: false,
      notes: 'Weekend vehicle',
      createdAt: new Date('2022-03-20'),
      updatedAt: new Date()
    }
  ]

  async findById(id: string): Promise<Vehicle | null> {
    return this.vehicles.find(vehicle => vehicle.id === id) || null
  }

  async findByClientId(clientId: string): Promise<Vehicle[]> {
    return this.vehicles.filter(vehicle => vehicle.clientId === clientId)
  }

  async findByPlateNumber(plateNumber: string): Promise<Vehicle | null> {
    return this.vehicles.find(vehicle => 
      vehicle.plateNumber.toLowerCase() === plateNumber.toLowerCase()
    ) || null
  }

  async create(vehicleData: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> {
    const vehicle: Vehicle = {
      ...vehicleData,
      id: `vehicle-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    this.vehicles.push(vehicle)
    return vehicle
  }

  async update(vehicle: Vehicle): Promise<Vehicle> {
    const index = this.vehicles.findIndex(v => v.id === vehicle.id)
    if (index === -1) {
      throw new Error('Vehicle not found')
    }
    
    const updatedVehicle = {
      ...vehicle,
      updatedAt: new Date()
    }
    
    this.vehicles[index] = updatedVehicle
    return updatedVehicle
  }

  async delete(id: string): Promise<void> {
    const index = this.vehicles.findIndex(vehicle => vehicle.id === id)
    if (index === -1) {
      throw new Error('Vehicle not found')
    }
    
    this.vehicles.splice(index, 1)
  }

  async findPrimaryByClientId(clientId: string): Promise<Vehicle | null> {
    return this.vehicles.find(vehicle => 
      vehicle.clientId === clientId && vehicle.isPrimary
    ) || null
  }

  async findByMakeAndModel(make: string, model: string): Promise<Vehicle[]> {
    return this.vehicles.filter(vehicle => 
      vehicle.make.toLowerCase() === make.toLowerCase() &&
      vehicle.model.toLowerCase() === model.toLowerCase()
    )
  }

  async searchByPlateNumber(query: string, limit?: number): Promise<Vehicle[]> {
    const searchTerm = query.toLowerCase()
    let results = this.vehicles.filter(vehicle => 
      vehicle.plateNumber.toLowerCase().includes(searchTerm)
    )
    
    if (limit) {
      results = results.slice(0, limit)
    }
    
    return results
  }

  async countByClientId(clientId: string): Promise<number> {
    return this.vehicles.filter(vehicle => vehicle.clientId === clientId).length
  }

  async countByMake(make: string): Promise<number> {
    return this.vehicles.filter(vehicle => 
      vehicle.make.toLowerCase() === make.toLowerCase()
    ).length
  }
}