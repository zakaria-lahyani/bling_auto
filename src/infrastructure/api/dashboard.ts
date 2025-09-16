import { fetcher } from './fetcher'

// Import types from fake-db structure
import type { DashboardData } from '@/types/apps/dashboardTypes'

export const dashboardApi = {
  /**
   * Get complete dashboard data
   */
  async getData(): Promise<DashboardData> {
    return await fetcher.get<DashboardData>('/api/dashboard')
  },

  /**
   * Get key performance indicators
   */
  async getKPIs(): Promise<DashboardData['kpis']> {
    const data = await this.getData()
    return data.kpis
  },

  /**
   * Get recent appointments
   */
  async getRecentAppointments(): Promise<DashboardData['recentAppointments']> {
    const data = await this.getData()
    return data.recentAppointments
  },

  /**
   * Get popular services stats
   */
  async getPopularServices(): Promise<DashboardData['popularServices']> {
    const data = await this.getData()
    return data.popularServices
  },

  /**
   * Get revenue chart data
   */
  async getRevenueChart(): Promise<DashboardData['revenueChart']> {
    const data = await this.getData()
    return data.revenueChart
  },

  /**
   * Get appointment status statistics
   */
  async getAppointmentStatus(): Promise<DashboardData['appointmentStatus']> {
    const data = await this.getData()
    return data.appointmentStatus
  },

  /**
   * Get customer metrics
   */
  async getCustomerMetrics(): Promise<DashboardData['customerMetrics']> {
    const data = await this.getData()
    return data.customerMetrics
  },
}