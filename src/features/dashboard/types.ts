// Dashboard feature types
export interface DashboardMetrics {
  revenue: number
  totalWashes: number
  avgRating: number
  completionRate: number
}

export interface ServicePerformance {
  serviceId: string
  serviceName: string
  revenue: number
  washCount: number
  avgRating: number
}

export interface LocationPerformance {
  locationId: string
  locationName: string
  revenue: number
  washCount: number
  utilizationRate: number
}

export interface DailyStats {
  date: string
  revenue: number
  washCount: number
  avgRevenue: number
}

export interface CustomerMetrics {
  totalCustomers: number
  newCustomers: number
  returningCustomers: number
  avgSpending: number
  loyaltyRate: number
}

// View models for UI components
export interface DashboardViewModel {
  metrics: DashboardMetrics
  servicePerformance: ServicePerformance[]
  locationPerformance: LocationPerformance[]
  dailyStats: DailyStats[]
  customerMetrics: CustomerMetrics
  loading: boolean
  error: string | null
}

export interface KPICardViewModel {
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: string
  format: 'currency' | 'number' | 'percentage'
}