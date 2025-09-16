'use client'

import React, { useState } from 'react'
import { Filter, Search, Calendar, Clock, MapPin, User } from 'lucide-react'
import { Button, Input, Badge, Select, Heading3, BodyText, Caption } from '@/shared/components/ui'
import { JobCard } from './JobCard'
import { useJobs, useJobActions } from '../hooks/useJobs'
import type { JobFilter } from '../types'

interface JobsListProps {
  title?: string
  showFilters?: boolean
  defaultFilters?: JobFilter
  compact?: boolean
  onJobClick?: (jobId: string) => void
}

export const JobsList: React.FC<JobsListProps> = ({
  title = "Jobs",
  showFilters = true,
  defaultFilters,
  compact = false,
  onJobClick
}) => {
  const [filters, setFilters] = useState<JobFilter>(defaultFilters || {})
  const [searchTerm, setSearchTerm] = useState('')
  
  const { 
    todayJobs, 
    upcomingJobs, 
    completedJobs, 
    loading, 
    error, 
    statusCounts,
    refetch 
  } = useJobs(filters)
  
  const { 
    startJob, 
    completeJob, 
    cancelJob,
    isStarting,
    isCompleting,
    isCancelling
  } = useJobActions()

  // Filter jobs by search term
  const filterJobsBySearch = (jobs: any[]) => {
    if (!searchTerm) return jobs
    
    return jobs.filter(job => 
      job.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.vehicleInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const handleStatusFilter = (status: string) => {
    setFilters(prev => ({ 
      ...prev, 
      status: status === 'all' ? undefined : status as any 
    }))
  }

  const handlePriorityFilter = (priority: string) => {
    setFilters(prev => ({ 
      ...prev, 
      priority: priority === 'all' ? undefined : priority as any 
    }))
  }

  const handleJobAction = async (action: 'start' | 'complete' | 'cancel', jobId: string) => {
    try {
      switch (action) {
        case 'start':
          await startJob(jobId)
          break
        case 'complete':
          await completeJob(jobId)
          break
        case 'cancel':
          await cancelJob(jobId)
          break
      }
    } catch (error) {
      console.error(`Failed to ${action} job:`, error)
    }
  }

  const isActionLoading = isStarting || isCompleting || isCancelling

  if (error) {
    return (
      <div className="text-center py-8">
        <BodyText color="muted">Error loading jobs: {error}</BodyText>
        <Button variant="outline" onClick={() => refetch()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  const filteredTodayJobs = filterJobsBySearch(todayJobs)
  const filteredUpcomingJobs = filterJobsBySearch(upcomingJobs)
  const filteredCompletedJobs = filterJobsBySearch(completedJobs)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Heading3>{title}</Heading3>
          <Caption color="muted">
            {statusCounts.scheduled} scheduled, {statusCounts.inProgress} in progress, {statusCounts.completed} completed
          </Caption>
        </div>
        
        {showFilters && (
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-surface-muted p-4 rounded-lg space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-content-muted" />
            <Input
              placeholder="Search jobs by customer, service, vehicle, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Filter Options */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <Badge
                variant={!filters.status ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleStatusFilter('all')}
              >
                All ({statusCounts.scheduled + statusCounts.inProgress + statusCounts.completed})
              </Badge>
              <Badge
                variant={filters.status === 'scheduled' ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleStatusFilter('scheduled')}
              >
                Scheduled ({statusCounts.scheduled})
              </Badge>
              <Badge
                variant={filters.status === 'in_progress' ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleStatusFilter('in_progress')}
              >
                In Progress ({statusCounts.inProgress})
              </Badge>
              <Badge
                variant={filters.status === 'completed' ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleStatusFilter('completed')}
              >
                Completed ({statusCounts.completed})
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Badge
              variant={!filters.priority ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handlePriorityFilter('all')}
            >
              All Priority
            </Badge>
            <Badge
              variant={filters.priority === 'high' ? "default" : "outline"}
              className="cursor-pointer bg-red-100 text-red-800"
              onClick={() => handlePriorityFilter('high')}
            >
              High
            </Badge>
            <Badge
              variant={filters.priority === 'medium' ? "default" : "outline"}
              className="cursor-pointer bg-yellow-100 text-yellow-800"
              onClick={() => handlePriorityFilter('medium')}
            >
              Medium
            </Badge>
            <Badge
              variant={filters.priority === 'low' ? "default" : "outline"}
              className="cursor-pointer bg-green-100 text-green-800"
              onClick={() => handlePriorityFilter('low')}
            >
              Low
            </Badge>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <BodyText color="muted">Loading jobs...</BodyText>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Today's Jobs */}
          {(!filters.status || ['scheduled', 'in_progress'].includes(filters.status)) && filteredTodayJobs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={18} className="text-brand-600" />
                <Heading3>Today's Jobs</Heading3>
                <Badge variant="outline">{filteredTodayJobs.length}</Badge>
              </div>
              
              <div className={`grid gap-4 ${compact ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2'}`}>
                {filteredTodayJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onStart={(id) => handleJobAction('start', id)}
                    onComplete={(id) => handleJobAction('complete', id)}
                    onCancel={(id) => handleJobAction('cancel', id)}
                    onViewDetails={onJobClick}
                    isLoading={isActionLoading}
                    compact={compact}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Jobs */}
          {(!filters.status || filters.status === 'scheduled') && filteredUpcomingJobs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-blue-600" />
                <Heading3>Upcoming Jobs</Heading3>
                <Badge variant="outline">{filteredUpcomingJobs.length}</Badge>
              </div>
              
              <div className={`grid gap-4 ${compact ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2'}`}>
                {filteredUpcomingJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onStart={(id) => handleJobAction('start', id)}
                    onComplete={(id) => handleJobAction('complete', id)}
                    onCancel={(id) => handleJobAction('cancel', id)}
                    onViewDetails={onJobClick}
                    isLoading={isActionLoading}
                    compact={compact}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed Jobs */}
          {(!filters.status || filters.status === 'completed') && filteredCompletedJobs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User size={18} className="text-green-600" />
                <Heading3>Completed Jobs</Heading3>
                <Badge variant="outline">{filteredCompletedJobs.length}</Badge>
              </div>
              
              <div className={`grid gap-4 ${compact ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2'}`}>
                {filteredCompletedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onViewDetails={onJobClick}
                    isLoading={isActionLoading}
                    compact={compact}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredTodayJobs.length === 0 && filteredUpcomingJobs.length === 0 && filteredCompletedJobs.length === 0 && (
            <div className="text-center py-12">
              <MapPin size={48} className="text-content-muted mx-auto mb-4" />
              <Heading3 className="mb-2">No jobs found</Heading3>
              <BodyText color="muted">
                {searchTerm ? 'Try adjusting your search or filters' : 'No jobs match the current filters'}
              </BodyText>
            </div>
          )}
        </div>
      )}
    </div>
  )
}