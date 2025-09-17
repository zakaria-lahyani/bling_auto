// Create Booking Use Case
import type { Booking, VehicleInfo, Location } from '@/core/entities/booking/types'
import type { IServiceRepository } from '@/infrastructure/repositories/interfaces'
import type { IPricingService } from '@/core/services/pricing.service'
import type { IAvailabilityService } from '@/core/services/availability.service'

export interface CreateBookingRequest {
  customerId: string
  serviceId: string
  vehicleInfo: VehicleInfo
  location: Location
  scheduledDate: Date
  notes?: string
}

export interface CreateBookingResponse {
  booking: Booking
  estimatedPrice: number
  confirmationCode: string
}

// Business rules for booking creation
export class CreateBookingUseCase {
  constructor(
    private serviceRepository: IServiceRepository,
    private pricingService: IPricingService,
    private availabilityService: IAvailabilityService
  ) {}

  async execute(request: CreateBookingRequest): Promise<CreateBookingResponse> {
    // Validate service exists and is active
    const service = await this.serviceRepository.findById(request.serviceId)
    if (!service || !service.isActive) {
      throw new Error('Service not available')
    }

    // Check availability
    const isAvailable = await this.availabilityService.checkAvailability(
      request.serviceId,
      request.scheduledDate
    )
    if (!isAvailable) {
      throw new Error('Selected time slot is not available')
    }

    // Calculate price
    const estimatedPrice = await this.pricingService.calculatePrice(
      service,
      request.vehicleInfo,
      request.location
    )

    // Create booking (simplified - in real app would persist to database)
    const booking: Booking = {
      id: this.generateBookingId(),
      customerId: request.customerId,
      serviceId: request.serviceId,
      vehicleInfo: request.vehicleInfo,
      location: request.location,
      scheduledDate: request.scheduledDate,
      status: 'pending',
      price: estimatedPrice,
      notes: request.notes,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    // Generate confirmation code
    const confirmationCode = this.generateConfirmationCode()

    return {
      booking,
      estimatedPrice,
      confirmationCode
    }
  }

  private generateBookingId(): string {
    return `BK${Date.now()}${Math.random().toString(36).substring(2, 11)}`
  }

  private generateConfirmationCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
  }
}