/**
 * Use Case: Get Client Dashboard
 * 
 * Application layer use case for retrieving client dashboard data.
 * Orchestrates domain services and repositories to build dashboard view.
 */

import { Client, ClientStats, ServiceRecommendation, ActivityItem } from '../../entities/client/types'
import { ClientBooking } from '../../entities/client-booking/types'
import { Service } from '../../entities/service/types'
import { ClientService } from '../../services/client.service'

export interface ClientRepository {
  findById(id: string): Promise<Client | null>
  update(client: Client): Promise<Client>
}

export interface BookingRepository {
  findByClientId(clientId: string): Promise<ClientBooking[]>
  findUpcomingByClientId(clientId: string): Promise<ClientBooking[]>
}

export interface ServiceRepository {
  findAll(): Promise<Service[]>
  findById(id: string): Promise<Service | null>
}

export interface GetClientDashboardRequest {
  clientId: string
}

export interface GetClientDashboardResponse {
  client: Client
  upcomingBookings: ClientBooking[]
  recentActivity: ActivityItem[]
  stats: ClientStats
  recommendations: ServiceRecommendation[]
}

export class GetClientDashboardUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private bookingRepository: BookingRepository,
    private serviceRepository: ServiceRepository
  ) {}

  async execute(request: GetClientDashboardRequest): Promise<GetClientDashboardResponse> {
    const { clientId } = request

    // Get client data
    const client = await this.clientRepository.findById(clientId)
    if (!client) {
      throw new Error('Client not found')
    }

    // Get bookings data
    const [allBookings, upcomingBookings] = await Promise.all([
      this.bookingRepository.findByClientId(clientId),
      this.bookingRepository.findUpcomingByClientId(clientId)
    ])

    // Get services for recommendations
    const services = await this.serviceRepository.findAll()

    // Calculate stats using domain service
    const stats = ClientService.calculateClientStats(client, allBookings)

    // Generate recommendations using domain service
    const recommendations = ClientService.generateRecommendations(client, allBookings, services)

    // Generate recent activity
    const recentActivity = this.generateRecentActivity(allBookings)

    return {
      client,
      upcomingBookings,
      recentActivity,
      stats,
      recommendations
    }
  }

  private generateRecentActivity(bookings: ClientBooking[]): ActivityItem[] {
    const activities: ActivityItem[] = []

    // Get recent bookings (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentBookings = bookings
      .filter(b => new Date(b.createdAt) >= thirtyDaysAgo)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)

    for (const booking of recentBookings) {
      activities.push({
        id: `booking-${booking.id}`,
        type: 'booking',
        title: `Booking ${booking.status}`,
        description: `${booking.service?.name || 'Service'} - ${booking.scheduledDate}`,
        date: new Date(booking.createdAt),
        status: booking.status,
        metadata: {
          bookingId: booking.id,
          amount: booking.price.total
        }
      })

      // Add payment activity if completed
      if (booking.status === 'completed') {
        activities.push({
          id: `payment-${booking.id}`,
          type: 'payment',
          title: 'Payment processed',
          description: `$${booking.price.total} for ${booking.service?.name || 'service'}`,
          date: new Date(booking.completedAt || booking.createdAt),
          status: 'completed',
          metadata: {
            bookingId: booking.id,
            amount: booking.price.total
          }
        })
      }

      // Add loyalty points activity
      if (booking.status === 'completed') {
        const pointsEarned = Math.floor(booking.price.total)
        activities.push({
          id: `loyalty-${booking.id}`,
          type: 'loyalty',
          title: 'Points earned',
          description: `+${pointsEarned} loyalty points`,
          date: new Date(booking.completedAt || booking.createdAt),
          status: 'completed',
          metadata: {
            bookingId: booking.id,
            points: pointsEarned
          }
        })
      }
    }

    // Sort by date and return top 10
    return activities
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10)
  }
}