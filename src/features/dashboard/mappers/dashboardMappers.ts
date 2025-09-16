import type { 
  DashboardMetrics, 
  ServicePerformance, 
  LocationPerformance, 
  DailyStats, 
  CustomerMetrics,
  KPICardViewModel 
} from '../types'

// Import actual mock data types
import type { 
  WashAnalytics as MockWashAnalytics,
  ServiceTypeStats as MockServiceTypeStats,
  LocationStats as MockLocationStats,
  DailyStats as MockDailyStats,
  CustomerMetrics as MockCustomerMetrics
} from '@/shared/utils/types'

// Mappers from mock data to domain models
export const mapWashAnalyticsToDashboardMetrics = (data: MockWashAnalytics): DashboardMetrics => ({
  revenue: data.revenue,
  totalWashes: data.totalWashes,
  avgRating: data.customerSatisfaction || 4.5, // Mock data uses customerSatisfaction
  completionRate: 95, // Not in mock data, using default
})

export const mapServiceStatsToServicePerformance = (data: MockServiceTypeStats[]): ServicePerformance[] =>
  data.map(item => ({
    serviceId: item.serviceName.toLowerCase().replace(/\s+/g, '-'),
    serviceName: item.serviceName,
    revenue: item.revenue,
    washCount: item.count, // Mock data uses 'count'
    avgRating: 4.5, // Not in mock data, using default
  }))

export const mapLocationStatsToLocationPerformance = (data: MockLocationStats[]): LocationPerformance[] =>
  data.map(item => ({
    locationId: item.region.toLowerCase().replace(/\s+/g, '-'),
    locationName: item.region, // Mock data uses 'region'
    revenue: item.revenue,
    washCount: item.washes, // Mock data uses 'washes'
    utilizationRate: 85, // Not in mock data, using default
  }))

export const mapMockDailyStatsToDailyStats = (data: MockDailyStats[]): DailyStats[] =>
  data.map(item => ({
    date: item.date,
    revenue: item.revenue,
    washCount: item.washes, // Mock data uses 'washes'
    avgRevenue: item.revenue / item.washes, // Calculate from existing data
  }))

export const mapMockCustomerMetricsToCustomerMetrics = (data: MockCustomerMetrics): CustomerMetrics => ({
  totalCustomers: data.totalCustomers,
  newCustomers: data.newCustomers,
  returningCustomers: data.returningCustomers,
  avgSpending: 75, // Not in mock data, using default
  loyaltyRate: 60, // Not in mock data, using default
})

// View model mappers for UI components
export const createKPICardsFromMetrics = (metrics: DashboardMetrics): KPICardViewModel[] => [
  {
    title: 'Total Revenue',
    value: metrics.revenue,
    change: 12.5, // TODO: Calculate from historical data
    changeType: 'increase' as const,
    icon: 'DollarSign',
    format: 'currency' as const,
  },
  {
    title: 'Total Washes',
    value: metrics.totalWashes,
    change: 8.2,
    changeType: 'increase' as const,
    icon: 'Car',
    format: 'number' as const,
  },
  {
    title: 'Average Rating',
    value: metrics.avgRating,
    change: 2.1,
    changeType: 'increase' as const,
    icon: 'Star',
    format: 'number' as const,
  },
  {
    title: 'Completion Rate',
    value: metrics.completionRate,
    change: -1.5,
    changeType: 'decrease' as const,
    icon: 'CheckCircle',
    format: 'percentage' as const,
  },
]

// Utility functions for formatting
export const formatCurrency = (value: number): string => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

export const formatNumber = (value: number): string => 
  new Intl.NumberFormat('en-US').format(value)

export const formatPercentage = (value: number): string => 
  `${value.toFixed(1)}%`

export const formatValue = (value: number, format: 'currency' | 'number' | 'percentage'): string => {
  switch (format) {
    case 'currency':
      return formatCurrency(value)
    case 'number':
      return formatNumber(value)
    case 'percentage':
      return formatPercentage(value)
    default:
      return value.toString()
  }
}