'use client'

import React from 'react'
import { Clock, MapPin, Car, User, MoreVertical, Play, CheckCircle, XCircle } from 'lucide-react'
import { Card, Button, Badge, BodyText, Caption } from '../../../components/ui'
import type { JobCardViewModel } from '../types'

interface JobCardProps {
  job: JobCardViewModel
  onStart?: (jobId: string) => void
  onComplete?: (jobId: string) => void
  onCancel?: (jobId: string) => void
  onViewDetails?: (jobId: string) => void
  isLoading?: boolean
  compact?: boolean
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onStart,
  onComplete,
  onCancel,
  onViewDetails,
  isLoading = false,
  compact = false
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = () => {
    switch (job.statusIcon) {
      case 'Clock': return <Clock size={16} />
      case 'AlertCircle': return <Play size={16} />
      case 'CheckCircle': return <CheckCircle size={16} />
      case 'XCircle': return <XCircle size={16} />
      default: return <Clock size={16} />
    }
  }

  return (
    <Card className={`p-4 hover:shadow-md transition-shadow ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Badge className={job.statusColor}>
              {getStatusIcon()}
              <span className="ml-1 capitalize">{job.status.replace('_', ' ')}</span>
            </Badge>
            <Badge variant="outline" className={getPriorityColor(job.priority)}>
              {job.priority}
            </Badge>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="p-1">
          <MoreVertical size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        {/* Customer & Service */}
        <div>
          <BodyText weight="medium" className="mb-1">{job.customerName}</BodyText>
          <BodyText className="text-brand-600">{job.serviceName}</BodyText>
        </div>

        {/* Time & Duration */}
        <div className="flex items-center gap-4 text-sm text-content-muted">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <Caption>{job.time}</Caption>
          </div>
          <Caption>({job.duration})</Caption>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2">
          <MapPin size={14} className="text-content-muted mt-0.5" />
          <div>
            <Caption className="font-medium">{job.location}</Caption>
            <Caption color="muted" className="text-xs">{job.address}</Caption>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="flex items-center gap-2">
          <Car size={14} className="text-content-muted" />
          <Caption>{job.vehicleInfo}</Caption>
        </div>

        {/* Notes */}
        {job.notes && (
          <div className="bg-surface-muted p-2 rounded text-sm">
            <Caption color="muted">"{job.notes}"</Caption>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-border">
          {job.canStart && onStart && (
            <Button 
              size="sm" 
              onClick={() => onStart(job.id)}
              disabled={isLoading}
              className="flex-1"
            >
              <Play size={14} className="mr-1" />
              Start
            </Button>
          )}
          
          {job.canComplete && onComplete && (
            <Button 
              size="sm" 
              onClick={() => onComplete(job.id)}
              disabled={isLoading}
              className="flex-1"
            >
              <CheckCircle size={14} className="mr-1" />
              Complete
            </Button>
          )}
          
          {job.canCancel && onCancel && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onCancel(job.id)}
              disabled={isLoading}
            >
              <XCircle size={14} className="mr-1" />
              Cancel
            </Button>
          )}
          
          {onViewDetails && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onViewDetails(job.id)}
              disabled={isLoading}
              className={job.canStart || job.canComplete ? 'px-3' : 'flex-1'}
            >
              Details
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}