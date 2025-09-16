export interface KPIData {
  totalRevenue: number
  totalAppointments: number
  activeServices: number
  completionRate: number
  averageRating: number
  repeatCustomers: number
}

export interface RecentAppointment {
  id: string
  customerName: string
  serviceName: string
  scheduledDate: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  totalAmount: number
}

export interface PopularService {
  id: string
  name: string
  bookings: number
  revenue: number
  trend: number
}

export interface RevenueChart {
  categories: string[]
  series: {
    name: string
    data: number[]
  }[]
}

export interface AppointmentStatus {
  pending: number
  confirmed: number
  inProgress: number
  completed: number
  cancelled: number
}

export interface CustomerMetrics {
  newCustomers: number
  returningCustomers: number
  totalCustomers: number
  customerSatisfaction: number
}

export interface DashboardData {
  kpis: KPIData
  recentAppointments: RecentAppointment[]
  popularServices: PopularService[]
  revenueChart: RevenueChart
  appointmentStatus: AppointmentStatus
  customerMetrics: CustomerMetrics
}

export type DashboardType = DashboardData