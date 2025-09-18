/**
 * Use Case: Update Client Profile
 * 
 * Application layer use case for updating client profile information.
 * Handles validation and business rules for profile updates.
 */

import { Client, ClientPreferences } from '../../entities/client/types'

export interface ClientRepository {
  findById(id: string): Promise<Client | null>
  update(client: Client): Promise<Client>
  findByEmail(email: string): Promise<Client | null>
  findByPhone(phone: string): Promise<Client | null>
}

export interface UpdateClientProfileRequest {
  clientId: string
  name?: string
  email?: string
  phone?: string
  preferences?: Partial<ClientPreferences>
  avatar?: string
}

export interface UpdateClientProfileResponse {
  client: Client
  success: boolean
  errors?: string[]
}

export class UpdateClientProfileUseCase {
  constructor(
    private clientRepository: ClientRepository
  ) {}

  async execute(request: UpdateClientProfileRequest): Promise<UpdateClientProfileResponse> {
    const { clientId, name, email, phone, preferences, avatar } = request
    const errors: string[] = []

    // Get current client
    const client = await this.clientRepository.findById(clientId)
    if (!client) {
      throw new Error('Client not found')
    }

    // Validate email uniqueness if changing
    if (email && email !== client.email) {
      const existingClient = await this.clientRepository.findByEmail(email)
      if (existingClient && existingClient.id !== clientId) {
        errors.push('Email is already in use by another account')
      }
    }

    // Validate phone uniqueness if changing
    if (phone && phone !== client.phone) {
      const existingClient = await this.clientRepository.findByPhone(phone)
      if (existingClient && existingClient.id !== clientId) {
        errors.push('Phone number is already in use by another account')
      }
    }

    // Validate email format
    if (email && !this.isValidEmail(email)) {
      errors.push('Invalid email format')
    }

    // Validate phone format
    if (phone && !this.isValidPhone(phone)) {
      errors.push('Invalid phone number format')
    }

    // Return errors if any validation failed
    if (errors.length > 0) {
      return {
        client,
        success: false,
        errors
      }
    }

    // Update client data
    const updatedClient: Client = {
      ...client,
      ...(name && { name }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(avatar !== undefined && { avatar }),
      ...(preferences && {
        preferences: {
          ...client.preferences,
          ...preferences,
          // Deep merge nested preferences
          ...(preferences.notifications && {
            notifications: {
              ...client.preferences.notifications,
              ...preferences.notifications
            }
          }),
          ...(preferences.services && {
            services: {
              ...client.preferences.services,
              ...preferences.services
            }
          }),
          ...(preferences.communication && {
            communication: {
              ...client.preferences.communication,
              ...preferences.communication
            }
          }),
          ...(preferences.display && {
            display: {
              ...client.preferences.display,
              ...preferences.display
            }
          })
        }
      }),
      updatedAt: new Date()
    }

    // Save updated client
    const savedClient = await this.clientRepository.update(updatedClient)

    return {
      client: savedClient,
      success: true
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  private isValidPhone(phone: string): boolean {
    // Basic phone validation - at least 10 digits
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
    return phoneRegex.test(phone)
  }
}