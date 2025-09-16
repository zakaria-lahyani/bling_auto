'use client'

import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@core/utils'

interface StatisticsCardProps {
  title: string
  value: string | number
  change?: number
  trend?: 'up' | 'down'
  icon?: ReactNode
  color?: 'primary' | 'success' | 'error' | 'warning' | 'info'
  subtitle?: string
}

const StatisticsCard = ({
  title,
  value,
  change,
  trend = 'up',
  icon,
  color = 'primary',
  subtitle
}: StatisticsCardProps) => {
  const colorClasses = {
    primary: 'bg-blue-100 text-blue-600',
    success: 'bg-green-100 text-green-600',
    error: 'bg-red-100 text-red-600',
    warning: 'bg-amber-100 text-amber-600',
    info: 'bg-purple-100 text-purple-600'
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        {icon && (
          <div className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center',
            colorClasses[color]
          )}>
            {icon}
          </div>
        )}
        
        {change !== undefined && (
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium',
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          )}>
            {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      
      <div>
        <div className="text-2xl font-bold text-content-primary mb-1">
          {value}
        </div>
        <div className="text-sm font-medium text-content-secondary">
          {title}
        </div>
        {subtitle && (
          <div className="text-xs text-content-muted mt-1">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}

export default StatisticsCard