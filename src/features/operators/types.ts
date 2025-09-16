// Operator management types
export interface Operator {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  role: OperatorRole
  department: string
  status: 'active' | 'inactive' | 'on_leave' | 'terminated'
  hireDate: string
  avatar?: string
  skills: OperatorSkill[]
  certifications: OperatorCertification[]
  schedule: WorkSchedule
  performanceRating: number // 1-5 scale
  totalJobsCompleted: number
  averageJobTime: number // in minutes
  customerRating: number // 1-5 scale
  lastActiveAt: string
  notes?: string
}

export interface OperatorRole {
  id: string
  name: string
  description: string
  permissions: string[]
  hourlyRate: number
  color: string
}

export interface OperatorSkill {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  certifiedAt?: string
  expiresAt?: string
}

export interface OperatorCertification {
  id: string
  name: string
  issuedBy: string
  issuedAt: string
  expiresAt?: string
  certificateNumber?: string
  isActive: boolean
}

export interface WorkSchedule {
  id: string
  operatorId: string
  scheduleType: 'full_time' | 'part_time' | 'contract'
  workDays: WorkDay[]
  timeZone: string
  effectiveFrom: string
  effectiveTo?: string
}

export interface WorkDay {
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  isWorkDay: boolean
  startTime?: string // HH:MM format
  endTime?: string // HH:MM format
  breakTime?: number // minutes
}

export interface OperatorShift {
  id: string
  operatorId: string
  operatorName: string
  date: string
  startTime: string
  endTime: string
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
  jobsAssigned: string[] // job IDs
  jobsCompleted: string[]
  totalHours: number
  notes?: string
}

export interface OperatorPerformance {
  id: string
  operatorId: string
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  startDate: string
  endDate: string
  metrics: {
    jobsCompleted: number
    averageJobTime: number
    customerRatingAverage: number
    punctualityScore: number // percentage
    qualityScore: number // 1-5 scale
    efficiency: number // percentage
    revenue: number
  }
  goals: {
    jobsTarget: number
    timeTarget: number
    qualityTarget: number
  }
  achievements: string[]
  improvements: string[]
}

export interface OperatorAvailability {
  id: string
  operatorId: string
  date: string
  timeSlots: TimeSlot[]
  isAvailable: boolean
  reason?: string // for unavailability
}

export interface TimeSlot {
  startTime: string
  endTime: string
  isAvailable: boolean
  jobId?: string // if assigned to a job
}

// Filter types
export interface OperatorFilter {
  role?: string
  department?: string
  status?: Operator['status']
  skills?: string[]
  availability?: boolean
  performanceMin?: number
}

export interface PerformanceFilter {
  operatorId?: string
  period?: OperatorPerformance['period']
  dateFrom?: string
  dateTo?: string
}

// View model types
export interface OperatorCardViewModel {
  id: string
  fullName: string
  email: string
  phone: string
  role: string
  roleColor: string
  department: string
  status: Operator['status']
  statusColor: string
  statusIcon: string
  avatar?: string
  performanceRating: number
  performanceColor: string
  totalJobsCompleted: number
  customerRating: number
  isAvailableToday: boolean
  currentJob?: string
  skills: {
    name: string
    level: string
    levelColor: string
  }[]
  upcomingShifts: number
  hireDate: string
  yearsOfService: number
}

export interface OperatorDashboardViewModel {
  totalOperators: number
  activeOperators: number
  operatorsOnShift: number
  availableOperators: number
  averagePerformance: number
  todayMetrics: {
    completedJobs: number
    averageJobTime: number
    customerSatisfaction: number
    punctuality: number
  }
  topPerformers: OperatorCardViewModel[]
  scheduleOverview: {
    date: string
    operators: {
      id: string
      name: string
      shift: string
      status: string
    }[]
  }[]
  recentActivity: {
    id: string
    operatorName: string
    action: string
    timestamp: string
    details?: string
  }[]
  alerts: {
    id: string
    type: 'absence' | 'late' | 'performance' | 'certification'
    message: string
    severity: 'low' | 'medium' | 'high'
    createdAt: string
  }[]
  loading: boolean
  error: string | null
}

export interface ScheduleViewModel {
  date: string
  shifts: {
    operatorId: string
    operatorName: string
    avatar?: string
    startTime: string
    endTime: string
    status: OperatorShift['status']
    statusColor: string
    jobsCount: number
    totalHours: number
  }[]
  summary: {
    totalShifts: number
    totalHours: number
    averageJobsPerOperator: number
  }
}