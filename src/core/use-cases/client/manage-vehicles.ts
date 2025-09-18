/**
 * Use Case: Manage Client Vehicles
 * 
 * Application layer use cases for vehicle management operations:
 * - Add vehicle
 * - Update vehicle
 * - Remove vehicle
 * - Set primary vehicle
 */

import { Vehicle } from '../../entities/client/types'

export interface VehicleRepository {
  findByClientId(clientId: string): Promise<Vehicle[]>
  findById(id: string): Promise<Vehicle | null>
  create(vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle>
  update(vehicle: Vehicle): Promise<Vehicle>
  delete(id: string): Promise<void>
  findByPlateNumber(plateNumber: string): Promise<Vehicle | null>
}

// Add Vehicle Use Case
export interface AddVehicleRequest {
  clientId: string
  make: string
  model: string
  year: string
  color: string
  plateNumber: string
  vin?: string
  notes?: string
  setPrimary?: boolean
}

export interface AddVehicleResponse {
  vehicle: Vehicle
  success: boolean
  errors?: string[]
}

export class AddVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(request: AddVehicleRequest): Promise<AddVehicleResponse> {
    const { clientId, make, model, year, color, plateNumber, vin, notes, setPrimary } = request
    const errors: string[] = []

    // Validate required fields
    if (!make.trim()) errors.push('Make is required')
    if (!model.trim()) errors.push('Model is required')
    if (!year.trim()) errors.push('Year is required')
    if (!color.trim()) errors.push('Color is required')
    if (!plateNumber.trim()) errors.push('Plate number is required')

    // Validate year
    const currentYear = new Date().getFullYear()
    const vehicleYear = parseInt(year)
    if (isNaN(vehicleYear) || vehicleYear < 1900 || vehicleYear > currentYear + 1) {
      errors.push('Invalid year')
    }

    // Check plate number uniqueness
    const existingVehicle = await this.vehicleRepository.findByPlateNumber(plateNumber)
    if (existingVehicle) {
      errors.push('Plate number is already registered')
    }

    if (errors.length > 0) {
      return { vehicle: {} as Vehicle, success: false, errors }
    }

    // Get existing vehicles to determine if this should be primary
    const existingVehicles = await this.vehicleRepository.findByClientId(clientId)
    const shouldBePrimary = setPrimary || existingVehicles.length === 0

    // If setting as primary, update existing primary vehicle
    if (shouldBePrimary && existingVehicles.length > 0) {
      const currentPrimary = existingVehicles.find(v => v.isPrimary)
      if (currentPrimary) {
        await this.vehicleRepository.update({
          ...currentPrimary,
          isPrimary: false,
          updatedAt: new Date()
        })
      }
    }

    // Create vehicle
    const vehicle = await this.vehicleRepository.create({
      clientId,
      make: make.trim(),
      model: model.trim(),
      year: year.trim(),
      color: color.trim(),
      plateNumber: plateNumber.trim().toUpperCase(),
      vin: vin?.trim(),
      notes: notes?.trim(),
      isPrimary: shouldBePrimary
    })

    return { vehicle, success: true }
  }
}

// Update Vehicle Use Case
export interface UpdateVehicleRequest {
  vehicleId: string
  clientId: string
  make?: string
  model?: string
  year?: string
  color?: string
  plateNumber?: string
  vin?: string
  notes?: string
}

export interface UpdateVehicleResponse {
  vehicle: Vehicle
  success: boolean
  errors?: string[]
}

export class UpdateVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(request: UpdateVehicleRequest): Promise<UpdateVehicleResponse> {
    const { vehicleId, clientId, make, model, year, color, plateNumber, vin, notes } = request
    const errors: string[] = []

    // Get existing vehicle
    const vehicle = await this.vehicleRepository.findById(vehicleId)
    if (!vehicle) {
      throw new Error('Vehicle not found')
    }

    // Verify ownership
    if (vehicle.clientId !== clientId) {
      throw new Error('Unauthorized: Vehicle does not belong to client')
    }

    // Validate fields if provided
    if (make !== undefined && !make.trim()) errors.push('Make cannot be empty')
    if (model !== undefined && !model.trim()) errors.push('Model cannot be empty')
    if (year !== undefined && !year.trim()) errors.push('Year cannot be empty')
    if (color !== undefined && !color.trim()) errors.push('Color cannot be empty')
    if (plateNumber !== undefined && !plateNumber.trim()) errors.push('Plate number cannot be empty')

    // Validate year if provided
    if (year !== undefined) {
      const currentYear = new Date().getFullYear()
      const vehicleYear = parseInt(year)
      if (isNaN(vehicleYear) || vehicleYear < 1900 || vehicleYear > currentYear + 1) {
        errors.push('Invalid year')
      }
    }

    // Check plate number uniqueness if changing
    if (plateNumber && plateNumber !== vehicle.plateNumber) {
      const existingVehicle = await this.vehicleRepository.findByPlateNumber(plateNumber)
      if (existingVehicle && existingVehicle.id !== vehicleId) {
        errors.push('Plate number is already registered')
      }
    }

    if (errors.length > 0) {
      return { vehicle, success: false, errors }
    }

    // Update vehicle
    const updatedVehicle = await this.vehicleRepository.update({
      ...vehicle,
      ...(make !== undefined && { make: make.trim() }),
      ...(model !== undefined && { model: model.trim() }),
      ...(year !== undefined && { year: year.trim() }),
      ...(color !== undefined && { color: color.trim() }),
      ...(plateNumber !== undefined && { plateNumber: plateNumber.trim().toUpperCase() }),
      ...(vin !== undefined && { vin: vin?.trim() }),
      ...(notes !== undefined && { notes: notes?.trim() }),
      updatedAt: new Date()
    })

    return { vehicle: updatedVehicle, success: true }
  }
}

// Set Primary Vehicle Use Case
export interface SetPrimaryVehicleRequest {
  vehicleId: string
  clientId: string
}

export interface SetPrimaryVehicleResponse {
  success: boolean
  errors?: string[]
}

export class SetPrimaryVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(request: SetPrimaryVehicleRequest): Promise<SetPrimaryVehicleResponse> {
    const { vehicleId, clientId } = request

    // Get vehicle to be set as primary
    const vehicle = await this.vehicleRepository.findById(vehicleId)
    if (!vehicle) {
      throw new Error('Vehicle not found')
    }

    // Verify ownership
    if (vehicle.clientId !== clientId) {
      throw new Error('Unauthorized: Vehicle does not belong to client')
    }

    // Get all client vehicles
    const allVehicles = await this.vehicleRepository.findByClientId(clientId)

    // Update all vehicles: set new primary and unset old primary
    await Promise.all(
      allVehicles.map(v =>
        this.vehicleRepository.update({
          ...v,
          isPrimary: v.id === vehicleId,
          updatedAt: new Date()
        })
      )
    )

    return { success: true }
  }
}

// Remove Vehicle Use Case
export interface RemoveVehicleRequest {
  vehicleId: string
  clientId: string
}

export interface RemoveVehicleResponse {
  success: boolean
  errors?: string[]
}

export class RemoveVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(request: RemoveVehicleRequest): Promise<RemoveVehicleResponse> {
    const { vehicleId, clientId } = request

    // Get vehicle to be removed
    const vehicle = await this.vehicleRepository.findById(vehicleId)
    if (!vehicle) {
      throw new Error('Vehicle not found')
    }

    // Verify ownership
    if (vehicle.clientId !== clientId) {
      throw new Error('Unauthorized: Vehicle does not belong to client')
    }

    // Get all client vehicles
    const allVehicles = await this.vehicleRepository.findByClientId(clientId)

    // Don't allow removing the last vehicle
    if (allVehicles.length === 1) {
      return {
        success: false,
        errors: ['Cannot remove the last vehicle. Please add another vehicle first.']
      }
    }

    // If removing primary vehicle, set another as primary
    if (vehicle.isPrimary) {
      const otherVehicle = allVehicles.find(v => v.id !== vehicleId)
      if (otherVehicle) {
        await this.vehicleRepository.update({
          ...otherVehicle,
          isPrimary: true,
          updatedAt: new Date()
        })
      }
    }

    // Remove vehicle
    await this.vehicleRepository.delete(vehicleId)

    return { success: true }
  }
}