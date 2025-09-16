import { fetcher } from './fetcher'
import type { Job, JobFilter } from '../../features/jobs/types'

export const jobsApi = {
  /**
   * Get all jobs with optional filtering
   */
  async list(filters?: JobFilter): Promise<Job[]> {
    try {
      // TODO: Replace with real API call
      // const params = new URLSearchParams()
      // if (filters?.status) params.append('status', filters.status)
      // if (filters?.operatorId) params.append('operatorId', filters.operatorId)
      // if (filters?.date) params.append('date', filters.date)
      // if (filters?.priority) params.append('priority', filters.priority)
      // return await fetcher.get<Job[]>(`/api/jobs?${params}`)
      
      // Mock data for now
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const mockJobs: Job[] = [
        {
          id: '1',
          appointmentId: 'apt-1',
          customerId: 'cust-1',
          customerName: 'Alice Brown',
          serviceId: 'svc-1',
          serviceName: 'Premium Wash',
          scheduledAt: '09:00',
          estimatedDuration: 45,
          status: 'scheduled',
          location: 'Downtown Location',
          address: '123 Main St, Downtown',
          vehicleInfo: {
            make: 'Toyota',
            model: 'Camry',
            year: 2022,
            color: 'Silver',
            licensePlate: 'ABC-1234'
          },
          notes: 'Customer prefers interior focus',
          assignedOperatorId: 'op-1',
          priority: 'high'
        },
        {
          id: '2',
          appointmentId: 'apt-2',
          customerId: 'cust-2',
          customerName: 'Bob Davis',
          serviceId: 'svc-2',
          serviceName: 'Basic Wash',
          scheduledAt: '10:30',
          estimatedDuration: 30,
          status: 'in_progress',
          location: 'Mobile Service',
          address: '456 Oak Ave, North End',
          vehicleInfo: {
            make: 'Honda',
            model: 'CR-V',
            year: 2021,
            color: 'Blue',
            licensePlate: 'XYZ-5678'
          },
          notes: 'Quick service requested',
          assignedOperatorId: 'op-2',
          priority: 'medium'
        },
        {
          id: '3',
          appointmentId: 'apt-3',
          customerId: 'cust-3',
          customerName: 'Carol Wilson',
          serviceId: 'svc-3',
          serviceName: 'Full Detail',
          scheduledAt: '14:00',
          estimatedDuration: 120,
          status: 'completed',
          location: 'Downtown Location',
          address: '123 Main St, Downtown',
          vehicleInfo: {
            make: 'BMW',
            model: 'X5',
            year: 2020,
            color: 'Black',
            licensePlate: 'BMW-2020'
          },
          notes: 'VIP customer',
          assignedOperatorId: 'op-1',
          priority: 'low'
        }
      ]
      
      // Apply filters
      let filteredJobs = mockJobs
      if (filters?.status) {
        filteredJobs = filteredJobs.filter(job => job.status === filters.status)
      }
      if (filters?.operatorId) {
        filteredJobs = filteredJobs.filter(job => job.assignedOperatorId === filters.operatorId)
      }
      if (filters?.priority) {
        filteredJobs = filteredJobs.filter(job => job.priority === filters.priority)
      }
      
      return filteredJobs
    } catch (error) {
      throw new Error(`Failed to fetch jobs: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get a specific job by ID
   */
  async getById(id: string): Promise<Job> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.get<Job>(`/api/jobs/${id}`)
      
      const jobs = await this.list()
      const job = jobs.find(j => j.id === id)
      
      if (!job) {
        throw new Error('Job not found')
      }
      
      return job
    } catch (error) {
      throw new Error(`Failed to fetch job: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get jobs for a specific date
   */
  async getByDate(date: string): Promise<Job[]> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.get<Job[]>(`/api/jobs/date/${date}`)
      
      // For now, return all jobs (in real implementation, filter by date)
      return await this.list()
    } catch (error) {
      throw new Error(`Failed to fetch jobs for date: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Get jobs assigned to a specific operator
   */
  async getByOperator(operatorId: string): Promise<Job[]> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.get<Job[]>(`/api/jobs/operator/${operatorId}`)
      
      return await this.list({ operatorId })
    } catch (error) {
      throw new Error(`Failed to fetch operator jobs: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Start a job
   */
  async start(jobId: string): Promise<Job> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.post<Job>(`/api/jobs/${jobId}/start`, {})
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const job = await this.getById(jobId)
      return {
        ...job,
        status: 'in_progress'
      }
    } catch (error) {
      throw new Error(`Failed to start job: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Complete a job
   */
  async complete(jobId: string): Promise<Job> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.post<Job>(`/api/jobs/${jobId}/complete`, {})
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const job = await this.getById(jobId)
      return {
        ...job,
        status: 'completed'
      }
    } catch (error) {
      throw new Error(`Failed to complete job: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Cancel a job
   */
  async cancel(jobId: string): Promise<Job> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.post<Job>(`/api/jobs/${jobId}/cancel`, {})
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const job = await this.getById(jobId)
      return {
        ...job,
        status: 'cancelled'
      }
    } catch (error) {
      throw new Error(`Failed to cancel job: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Reschedule a job
   */
  async reschedule(jobId: string, newDateTime: string): Promise<Job> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.post<Job>(`/api/jobs/${jobId}/reschedule`, { newDateTime })
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const job = await this.getById(jobId)
      return {
        ...job,
        scheduledAt: newDateTime
      }
    } catch (error) {
      throw new Error(`Failed to reschedule job: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },

  /**
   * Assign job to operator
   */
  async assignOperator(jobId: string, operatorId: string): Promise<Job> {
    try {
      // TODO: Replace with real API call
      // return await fetcher.post<Job>(`/api/jobs/${jobId}/assign`, { operatorId })
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const job = await this.getById(jobId)
      return {
        ...job,
        assignedOperatorId: operatorId
      }
    } catch (error) {
      throw new Error(`Failed to assign operator: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}