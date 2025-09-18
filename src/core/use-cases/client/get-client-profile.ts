/**
 * Use Case: Get Client Profile
 * 
 * Application layer use case for retrieving complete client profile data
 * including personal info, vehicles, addresses, and payment methods.
 */

import { Client, Vehicle, ClientAddress, PaymentMethod } from '../../entities/client/types'

export interface ClientRepository {
  findById(id: string): Promise<Client | null>
}

export interface VehicleRepository {
  findByClientId(clientId: string): Promise<Vehicle[]>
}

export interface AddressRepository {
  findByClientId(clientId: string): Promise<ClientAddress[]>
}

export interface PaymentMethodRepository {
  findByClientId(clientId: string): Promise<PaymentMethod[]>
}

export interface GetClientProfileRequest {
  clientId: string
}

export interface GetClientProfileResponse {
  client: Client
  vehicles: Vehicle[]
  addresses: ClientAddress[]
  paymentMethods: PaymentMethod[]
}

export class GetClientProfileUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private vehicleRepository: VehicleRepository,
    private addressRepository: AddressRepository,
    private paymentMethodRepository: PaymentMethodRepository
  ) {}

  async execute(request: GetClientProfileRequest): Promise<GetClientProfileResponse> {
    const { clientId } = request

    // Get client data
    const client = await this.clientRepository.findById(clientId)
    if (!client) {
      throw new Error('Client not found')
    }

    // Get related data in parallel
    const [vehicles, addresses, paymentMethods] = await Promise.all([
      this.vehicleRepository.findByClientId(clientId),
      this.addressRepository.findByClientId(clientId),
      this.paymentMethodRepository.findByClientId(clientId)
    ])

    return {
      client,
      vehicles,
      addresses,
      paymentMethods
    }
  }
}