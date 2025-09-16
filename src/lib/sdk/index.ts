// Export API modules
import { servicesApi } from './services'
import { appointmentsApi } from './appointments'
import { dashboardApi } from './dashboard'
import { bookingApi } from './booking'
import { jobsApi } from './jobs'
import { loyaltyApi } from './loyalty'
import { inventoryApi } from './inventory'

export { servicesApi, appointmentsApi, dashboardApi, bookingApi, jobsApi, loyaltyApi, inventoryApi }
export { fetcher, ApiError } from './fetcher'

// Re-export types from fake-db structure
export type * from '@/types/apps/serviceTypes'
export type * from '@/types/apps/appointmentTypes'
export type * from '@/types/apps/dashboardTypes'

// Main SDK object for easier imports
export const sdk = {
  services: servicesApi,
  appointments: appointmentsApi,
  dashboard: dashboardApi,
  booking: bookingApi,
  jobs: jobsApi,
  loyalty: loyaltyApi,
  inventory: inventoryApi,
} as const

// Auth utilities
export const auth = {
  setToken: (token: string) => {
    const { fetcher } = require('./fetcher')
    return fetcher.setAuthToken(token)
  },
  removeToken: () => {
    const { fetcher } = require('./fetcher')
    return fetcher.removeAuthToken()
  },
  configure: (config: any) => {
    const { fetcher } = require('./fetcher')
    return fetcher.setConfig(config)
  },
}