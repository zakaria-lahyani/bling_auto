// Create Booking Use Case
import type { Booking, VehicleInfo, Location } from '@/core/entities/booking/types'
import type { Service } from '@/core/entities/service/types'
import type { User } from '@/core/entities/user/types'

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
    private bookingRepository: any,
    private serviceRepository: any,
    private userRepository: any,
    private pricingService: any,
    private availabilityService: any
  ) {}

  async execute(request: CreateBookingRequest): Promise<CreateBookingResponse> {
    // Validate customer exists
    const customer = await this.userRepository.findById(request.customerId)
    if (!customer) {
      throw new Error('Customer not found')
    }

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

    // Create booking
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

    // Save booking
    const savedBooking = await this.bookingRepository.create(booking)
    
    // Generate confirmation code
    const confirmationCode = this.generateConfirmationCode()

    return {
      booking: savedBooking,
      estimatedPrice,
      confirmationCode
    }
  }

  private generateBookingId(): string {
    return `BK${Date.now()}${Math.random().toString(36).substr(2, 9)}`
  }

  private generateConfirmationCode(): string {
    return Math.random().toString(36).substr(2, 8).toUpperCase()
  }
}