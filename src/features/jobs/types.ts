// Jobs feature types
export interface Job {
  id: string
  appointmentId: string
  customerId: string
  customerName: string
  serviceId: string
  serviceName: string
  scheduledAt: string
  estimatedDuration: number
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  location: string
  address?: string
  vehicleInfo: {
    make: string
    model: string
    year: number
    color: string
    licensePlate: string
  }
  notes?: string
  assignedOperatorId?: string
  priority: 'low' | 'medium' | 'high'
}

export interface JobFilter {
  status?: Job['status']
  operatorId?: string
  date?: string
  priority?: Job['priority']
}

// View models
export interface JobCardViewModel {
  id: string
  customerName: string
  serviceName: string
  time: string
  duration: string
  location: string
  address?: string
  status: Job['status']
  statusColor: string
  statusIcon: string
  priority: Job['priority']
  vehicleInfo: string
  notes?: string
  canStart: boolean
  canComplete: boolean
  canCancel: boolean
}

export interface JobsViewModel {
  todayJobs: JobCardViewModel[]
  upcomingJobs: JobCardViewModel[]
  completedJobs: JobCardViewModel[]
  loading: boolean
  error: string | null
  totalCount: number
  statusCounts: {
    scheduled: number
    inProgress: number
    completed: number
    cancelled: number
  }
}