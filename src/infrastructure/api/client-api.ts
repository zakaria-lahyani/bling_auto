/**
 * Client API Layer
 * 
 * @deprecated Use the repository pattern instead: repositoryFactory.getClientRepository()
 * 
 * This class is now a thin wrapper around the repository pattern for backward compatibility.
 * Please migrate to using the repository pattern for new code.
 * 
 * Migration example:
 * OLD: import { ClientAPI } from '@/infrastructure/api/client-api'
 *      const client = await ClientAPI.getClient(clientId)
 * 
 * NEW: import { repositoryFactory } from '@/infrastructure/repositories/factory/repository.factory'
 *      const clientRepo = repositoryFactory.getClientRepository()
 *      const client = await clientRepo.findById(clientId)
 */

import { repositoryFactory } from '../repositories/factory/repository.factory'

// Get the repository instance
const clientRepository = repositoryFactory.getClientRepository()

export class ClientAPI {
  // ============================================================================
  // CLIENT OPERATIONS
  // ============================================================================

  /**
   * @deprecated Use clientRepository.findById(clientId) instead
   */
  static async getClient(clientId: string) {
    const client = await clientRepository.findById(clientId)
    if (!client) {
      throw new Error('Client not found')
    }
    return { data: client, success: true }
  }

  /**
   * @deprecated Use clientRepository.update(clientId, updates) instead
   */
  static async updateClient(clientId: string, updates: any) {
    return await clientRepository.update(clientId, updates)
  }

  // ============================================================================
  // VEHICLE OPERATIONS
  // ============================================================================

  /**
   * @deprecated Use clientRepository.getVehicles(clientId) instead
   */
  static async getVehicles(clientId: string) {
    return await clientRepository.getVehicles(clientId)
  }

  /**
   * @deprecated Use clientRepository.addVehicle(clientId, vehicleData) instead
   */
  static async addVehicle(clientId: string, vehicleData: any) {
    return await clientRepository.addVehicle(clientId, vehicleData)
  }

  /**
   * @deprecated Use clientRepository.updateVehicle(vehicleId, updates) instead
   */
  static async updateVehicle(vehicleId: string, updates: any) {
    return await clientRepository.updateVehicle(vehicleId, updates)
  }

  /**
   * @deprecated Use clientRepository.deleteVehicle(vehicleId) instead
   */
  static async deleteVehicle(vehicleId: string) {
    return await clientRepository.deleteVehicle(vehicleId)
  }

  // ============================================================================
  // PAYMENT METHOD OPERATIONS
  // ============================================================================

  /**
   * @deprecated Use clientRepository.getPaymentMethods(clientId) instead
   */
  static async getPaymentMethods(clientId: string) {
    return await clientRepository.getPaymentMethods(clientId)
  }

  /**
   * @deprecated Use clientRepository.addPaymentMethod(clientId, methodData) instead
   */
  static async addPaymentMethod(clientId: string, methodData: any) {
    return await clientRepository.addPaymentMethod(clientId, methodData)
  }

  /**
   * @deprecated Use clientRepository.updatePaymentMethod(methodId, updates) instead
   */
  static async updatePaymentMethod(methodId: string, updates: any) {
    return await clientRepository.updatePaymentMethod(methodId, updates)
  }

  /**
   * @deprecated Use clientRepository.deletePaymentMethod(methodId) instead
   */
  static async deletePaymentMethod(methodId: string) {
    return await clientRepository.deletePaymentMethod(methodId)
  }

  // ============================================================================
  // BOOKING OPERATIONS
  // ============================================================================

  /**
   * @deprecated Use clientRepository.getBookings(clientId, filters) instead
   */
  static async getBookings(clientId: string, filters?: any) {
    return await clientRepository.getBookings(clientId, filters)
  }

  /**
   * @deprecated Use clientRepository.getUpcomingBookings(clientId) instead
   */
  static async getUpcomingBookings(clientId: string) {
    return await clientRepository.getUpcomingBookings(clientId)
  }

  /**
   * @deprecated Use clientRepository.createBooking(clientId, bookingData) instead
   */
  static async createBooking(clientId: string, bookingData: any) {
    return await clientRepository.createBooking(clientId, bookingData)
  }

  // ============================================================================
  // ADDRESS OPERATIONS
  // ============================================================================

  /**
   * @deprecated Use clientRepository.getAddresses(clientId) instead
   */
  static async getAddresses(clientId: string) {
    return await clientRepository.getAddresses(clientId)
  }

  /**
   * @deprecated Use clientRepository.addAddress(clientId, addressData) instead
   */
  static async addAddress(clientId: string, addressData: any) {
    return await clientRepository.addAddress(clientId, addressData)
  }

  // ============================================================================
  // DASHBOARD DATA
  // ============================================================================

  /**
   * @deprecated Use clientRepository.getDashboardData(clientId) instead
   */
  static async getDashboardData(clientId: string) {
    return await clientRepository.getDashboardData(clientId)
  }
}