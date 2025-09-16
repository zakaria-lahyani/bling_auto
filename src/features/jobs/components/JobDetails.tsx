'use client'

import React from 'react'
import { 
  ArrowLeft, Calendar, Clock, MapPin, Car, User, Phone, Mail, 
  AlertCircle, CheckCircle, XCircle, Play, Edit, MessageSquare,
  CreditCard, FileText
} from 'lucide-react'
import { Card, Button, Badge, Heading2, Heading3, BodyText, Caption } from '../../../components/ui'
import { useJob, useJobActions } from '../hooks/useJobs'

interface JobDetailsProps {
  jobId: string
  onBack: () => void
  onEdit?: () => void
}

export const JobDetails: React.FC<JobDetailsProps> = ({
  jobId,
  onBack,
  onEdit
}) => {
  const { job, isLoading, error } = useJob(jobId)
  const { 
    startJob, 
    completeJob, 
    cancelJob,
    isStarting,
    isCompleting,
    isCancelling
  } = useJobActions()

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <BodyText color="muted">Loading job details...</BodyText>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <BodyText color="muted">Error loading job: {error}</BodyText>
        <Button variant="outline" onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="text-center py-8">
        <BodyText color="muted">Job not found</BodyText>
        <Button variant="outline" onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock size={16} />
      case 'in_progress': return <AlertCircle size={16} />
      case 'completed': return <CheckCircle size={16} />
      case 'cancelled': return <XCircle size={16} />
      default: return <Clock size={16} />
    }
  }

  const handleJobAction = async (action: 'start' | 'complete' | 'cancel') => {
    try {
      switch (action) {
        case 'start':
          await startJob(job.id)
          break
        case 'complete':
          await completeJob(job.id)
          break
        case 'cancel':
          await cancelJob(job.id)
          break
      }
    } catch (error) {
      console.error(`Failed to ${action} job:`, error)
    }
  }

  const isActionLoading = isStarting || isCompleting || isCancelling
  const canStart = job.status === 'scheduled'
  const canComplete = job.status === 'in_progress'
  const canCancel = ['scheduled', 'in_progress'].includes(job.status)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          <div>
            <Heading2>Job Details</Heading2>
            <Caption color="muted">Job ID: {job.id}</Caption>
          </div>
        </div>
        
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit size={16} className="mr-2" />
              Edit
            </Button>
          )}
        </div>
      </div>

      {/* Status and Actions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge className={getStatusColor(job.status)}>
              {getStatusIcon(job.status)}
              <span className="ml-2 capitalize">{job.status.replace('_', ' ')}</span>
            </Badge>
            <Badge variant="outline" className={getPriorityColor(job.priority)}>
              {job.priority} priority
            </Badge>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          {canStart && (
            <Button 
              onClick={() => handleJobAction('start')}
              disabled={isActionLoading}
            >
              <Play size={16} className="mr-2" />
              Start Job
            </Button>
          )}
          
          {canComplete && (
            <Button 
              onClick={() => handleJobAction('complete')}
              disabled={isActionLoading}
            >
              <CheckCircle size={16} className="mr-2" />
              Mark Complete
            </Button>
          )}
          
          {canCancel && (
            <Button 
              variant="outline"
              onClick={() => handleJobAction('cancel')}
              disabled={isActionLoading}
            >
              <XCircle size={16} className="mr-2" />
              Cancel Job
            </Button>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Information */}
        <Card className="p-6">
          <Heading3 className="mb-4">Customer Information</Heading3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User size={20} className="text-content-muted mt-0.5" />
              <div>
                <BodyText weight="medium">{job.customerName}</BodyText>
                <Caption color="muted">Customer ID: {job.customerId}</Caption>
              </div>
            </div>
            
            {/* Mock contact info - in real app would come from customer data */}
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-content-muted" />
              <Caption>(555) 123-4567</Caption>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-content-muted" />
              <Caption>customer@example.com</Caption>
            </div>
          </div>
        </Card>

        {/* Service Information */}
        <Card className="p-6">
          <Heading3 className="mb-4">Service Information</Heading3>
          <div className="space-y-4">
            <div>
              <BodyText weight="medium" className="mb-1">{job.serviceName}</BodyText>
              <Caption color="muted">Service ID: {job.serviceId}</Caption>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-content-muted" />
                <Caption>{job.estimatedDuration} minutes</Caption>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-content-muted" />
                <Caption>$99</Caption>
              </div>
            </div>
          </div>
        </Card>

        {/* Schedule Information */}
        <Card className="p-6">
          <Heading3 className="mb-4">Schedule</Heading3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-content-muted" />
              <div>
                <BodyText weight="medium">Today</BodyText>
                <Caption color="muted">{new Date().toLocaleDateString()}</Caption>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-content-muted" />
              <div>
                <BodyText weight="medium">{job.scheduledAt}</BodyText>
                <Caption color="muted">Estimated duration: {job.estimatedDuration} min</Caption>
              </div>
            </div>
          </div>
        </Card>

        {/* Location Information */}
        <Card className="p-6">
          <Heading3 className="mb-4">Location</Heading3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-content-muted mt-0.5" />
              <div>
                <BodyText weight="medium">{job.location}</BodyText>
                <Caption color="muted">{job.address}</Caption>
              </div>
            </div>
            
            <Badge variant="outline" className="w-fit">
              {job.location === 'Mobile Service' ? 'Mobile Service' : 'On-site Location'}
            </Badge>
          </div>
        </Card>

        {/* Vehicle Information */}
        <Card className="p-6">
          <Heading3 className="mb-4">Vehicle Information</Heading3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Car size={20} className="text-content-muted mt-0.5" />
              <div>
                <BodyText weight="medium">
                  {job.vehicleInfo.year} {job.vehicleInfo.make} {job.vehicleInfo.model}
                </BodyText>
                <div className="space-y-1 mt-2">
                  <Caption color="muted">Color: {job.vehicleInfo.color}</Caption>
                  <Caption color="muted">License: {job.vehicleInfo.licensePlate}</Caption>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Notes */}
        {job.notes && (
          <Card className="p-6">
            <Heading3 className="mb-4">Notes</Heading3>
            <div className="flex items-start gap-3">
              <MessageSquare size={20} className="text-content-muted mt-0.5" />
              <div>
                <BodyText>"{job.notes}"</BodyText>
              </div>
            </div>
          </Card>
        )}

        {/* Operator Assignment */}
        {job.assignedOperatorId && (
          <Card className="p-6">
            <Heading3 className="mb-4">Assigned Operator</Heading3>
            <div className="flex items-center gap-3">
              <User size={20} className="text-content-muted" />
              <div>
                <BodyText weight="medium">Operator {job.assignedOperatorId}</BodyText>
                <Caption color="muted">ID: {job.assignedOperatorId}</Caption>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Job History */}
      <Card className="p-6">
        <Heading3 className="mb-4">Job History</Heading3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-surface-muted rounded">
            <FileText size={16} className="text-content-muted" />
            <div className="flex-1">
              <BodyText className="text-sm">Job created</BodyText>
              <Caption color="muted">Today at 8:00 AM</Caption>
            </div>
          </div>
          
          {job.status !== 'scheduled' && (
            <div className="flex items-center gap-3 p-3 bg-surface-muted rounded">
              <Play size={16} className="text-green-600" />
              <div className="flex-1">
                <BodyText className="text-sm">Job started</BodyText>
                <Caption color="muted">Today at 9:00 AM</Caption>
              </div>
            </div>
          )}
          
          {job.status === 'completed' && (
            <div className="flex items-center gap-3 p-3 bg-surface-muted rounded">
              <CheckCircle size={16} className="text-green-600" />
              <div className="flex-1">
                <BodyText className="text-sm">Job completed</BodyText>
                <Caption color="muted">Today at 10:30 AM</Caption>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}