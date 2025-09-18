/**
 * Repository Interface: Booking Repository
 * 
 * Infrastructure layer interface for booking data operations.
 * Defines the contract for booking data persistence.
 */

import { ClientBooking, BookingStatus, BookingFilters, BookingSearchResult } from '../../../core/entities/client-booking/types'

export interface IBookingRepository {
  // Basic CRUD operations
  findById(id: string): Promise<ClientBooking | null>
  findByClientId(clientId: string): Promise<ClientBooking[]>
  create(booking: Omit<ClientBooking, 'id' | 'createdAt' | 'updatedAt'>): Promise<ClientBooking>
  update(booking: ClientBooking): Promise<ClientBooking>
  delete(id: string): Promise<void>

  // Query operations
  findUpcomingByClientId(clientId: string): Promise<ClientBooking[]>
  findByStatus(status: BookingStatus): Promise<ClientBooking[]>
  findByDateRange(startDate: Date, endDate: Date): Promise<ClientBooking[]>
  findByServiceId(serviceId: string): Promise<ClientBooking[]>
  findByVehicleId(vehicleId: string): Promise<ClientBooking[]>
  
  // Search and filter operations
  search(filters: BookingFilters, page: number, pageSize: number): Promise<BookingSearchResult>
  
  // Aggregation operations
  countByClientId(clientId: string): Promise<number>
  countByStatus(status: BookingStatus): Promise<number>
  countCompletedByClientId(clientId: string): Promise<number>
  getTotalSpentByClientId(clientId: string): Promise<number>
  getAverageRatingByClientId(clientId: string): Promise<number>
  
  // Analytics operations
  findMostBookedServiceByClientId(clientId: string): Promise<string | null>
  findBookingsByMonthForClient(clientId: string, year: number): Promise<{ month: number; count: number; total: number }[]>
}