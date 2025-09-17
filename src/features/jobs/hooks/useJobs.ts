import { useState, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { sdk } from '@/infrastructure/api'
import type { Job, JobFilter, JobCardViewModel, JobsViewModel } from '../types'

export const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (filters?: JobFilter) => [...jobKeys.lists(), filters] as const,
  details: () => [...jobKeys.all, 'detail'] as const,
  detail: (id: string) => [...jobKeys.details(), id] as const,
  byOperator: (operatorId: string) => [...jobKeys.all, 'operator', operatorId] as const,
  byStatus: (status: Job['status']) => [...jobKeys.all, 'status', status] as const,
  byDate: (date: string) => [...jobKeys.all, 'date', date] as const,
}

export function useJobs(filters?: JobFilter) {
  const queryClient = useQueryClient()
  
  const {
    data: jobs,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: jobKeys.list(filters),
    queryFn: () => sdk.jobs.list(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Transform jobs to view models
  const transformJobToViewModel = useCallback((job: Job): JobCardViewModel => {
    const getStatusColor = (status: Job['status']) => {
      switch (status) {
        case 'scheduled': return 'bg-blue-100 text-blue-800'
        case 'in_progress': return 'bg-yellow-100 text-yellow-800'
        case 'completed': return 'bg-green-100 text-green-800'
        case 'cancelled': return 'bg-red-100 text-red-800'
        default: return 'bg-gray-100 text-gray-800'
      }
    }

    const getStatusIcon = (status: Job['status']) => {
      switch (status) {
        case 'scheduled': return 'Clock'
        case 'in_progress': return 'AlertCircle'
        case 'completed': return 'CheckCircle'
        case 'cancelled': return 'XCircle'
        default: return 'Clock'
      }
    }

    const formatDuration = (minutes: number) => {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      if (hours > 0) {
        return `${hours}h ${mins}m`
      }
      return `${mins}m`
    }

    return {
      id: job.id,
      customerName: job.customerName,
      serviceName: job.serviceName,
      time: job.scheduledAt,
      duration: formatDuration(job.estimatedDuration),
      location: job.location,
      address: job.address,
      status: job.status,
      statusColor: getStatusColor(job.status),
      statusIcon: getStatusIcon(job.status),
      priority: job.priority,
      vehicleInfo: `${job.vehicleInfo.year} ${job.vehicleInfo.make} ${job.vehicleInfo.model} - ${job.vehicleInfo.color}`,
      notes: job.notes,
      canStart: job.status === 'scheduled',
      canComplete: job.status === 'in_progress',
      canCancel: ['scheduled', 'in_progress'].includes(job.status),
    }
  }, [])

  const jobViewModels = jobs?.map(transformJobToViewModel) || []

  // Categorize jobs
  const todayJobs = jobViewModels.filter(job => 
    job.status !== 'completed' && job.status !== 'cancelled'
  )
  const upcomingJobs = jobViewModels.filter(job => job.status === 'scheduled')
  const completedJobs = jobViewModels.filter(job => job.status === 'completed')

  // Calculate status counts
  const statusCounts = {
    scheduled: jobViewModels.filter(job => job.status === 'scheduled').length,
    inProgress: jobViewModels.filter(job => job.status === 'in_progress').length,
    completed: jobViewModels.filter(job => job.status === 'completed').length,
    cancelled: jobViewModels.filter(job => job.status === 'cancelled').length,
  }

  const viewModel: JobsViewModel = {
    todayJobs,
    upcomingJobs,
    completedJobs,
    loading: isLoading,
    error: error?.message || null,
    totalCount: jobViewModels.length,
    statusCounts,
  }

  return {
    ...viewModel,
    refetch,
  }
}

export function useJob(id: string) {
  const {
    data: job,
    isLoading,
    error
  } = useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => sdk.jobs.getById(id),
    enabled: !!id,
  })

  return {
    job,
    isLoading,
    error: error?.message || null,
  }
}

export function useJobActions() {
  const queryClient = useQueryClient()

  const startJobMutation = useMutation({
    mutationFn: (jobId: string) => sdk.jobs.start(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all })
    },
  })

  const completeJobMutation = useMutation({
    mutationFn: (jobId: string) => sdk.jobs.complete(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all })
    },
  })

  const cancelJobMutation = useMutation({
    mutationFn: (jobId: string) => sdk.jobs.cancel(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all })
    },
  })

  const rescheduleJobMutation = useMutation({
    mutationFn: ({ jobId, newDateTime }: { jobId: string; newDateTime: string }) => 
      sdk.jobs.reschedule(jobId, newDateTime),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all })
    },
  })

  return {
    startJob: startJobMutation.mutateAsync,
    completeJob: completeJobMutation.mutateAsync,
    cancelJob: cancelJobMutation.mutateAsync,
    rescheduleJob: rescheduleJobMutation.mutateAsync,
    isStarting: startJobMutation.isPending,
    isCompleting: completeJobMutation.isPending,
    isCancelling: cancelJobMutation.isPending,
    isRescheduling: rescheduleJobMutation.isPending,
  }
}

export function useTodayJobs() {
  const today = new Date().toISOString().split('T')[0] ?? ''
  
  return useQuery({
    queryKey: jobKeys.byDate(today),
    queryFn: () => sdk.jobs.getByDate(today),
    staleTime: 1000 * 60 * 2, // 2 minutes - more frequent updates for today's jobs
    refetchInterval: 1000 * 60 * 5, // Auto-refresh every 5 minutes
  })
}

export function useOperatorJobs(operatorId: string) {
  return useQuery({
    queryKey: jobKeys.byOperator(operatorId),
    queryFn: () => sdk.jobs.getByOperator(operatorId),
    enabled: !!operatorId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}