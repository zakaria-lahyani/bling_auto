/**
 * Stats Block Component
 * 
 * A reusable statistics section that displays key metrics in an attractive grid.
 * Perfect for showcasing business achievements, user counts, or performance metrics.
 * 
 * @param title - Section heading (optional)
 * @param subtitle - Section description (optional)
 * @param stats - Array of statistic objects
 * @param columns - Number of columns (2, 3, or 4)
 * @param theme - Visual theme variant
 */
'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
import { getIcon } from '@core/utils/iconMapper'

export interface Stat {
  id?: string
  value: string | number
  label: string
  description?: string
  icon?: LucideIcon | React.ReactNode | string
  color?: 'brand' | 'green' | 'blue' | 'purple' | 'orange' | 'red'
  prefix?: string
  suffix?: string
}

export interface StatsBlockProps {
  title?: string
  subtitle?: string
  stats: Stat[]
  columns?: 2 | 3 | 4
  theme?: 'light' | 'surface' | 'dark' | 'minimal'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const StatsBlock: React.FC<StatsBlockProps> = ({
  title,
  subtitle,
  stats,
  columns = 4,
  theme = 'light',
  size = 'medium',
  className = ''
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-white'
      case 'surface':
        return 'bg-surface'
      case 'dark':
        return 'bg-gray-900 text-white'
      case 'minimal':
        return 'bg-transparent'
      default:
        return 'bg-white'
    }
  }

  const getColumnClasses = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2'
      case 3:
        return 'grid-cols-1 md:grid-cols-3'
      case 4:
        return 'grid-cols-2 md:grid-cols-4'
      default:
        return 'grid-cols-2 md:grid-cols-4'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'py-12'
      case 'medium':
        return 'py-20'
      case 'large':
        return 'py-28'
      default:
        return 'py-20'
    }
  }

  const getColorClasses = (color: Stat['color'] = 'brand') => {
    switch (color) {
      case 'brand':
        return 'bg-brand-100 text-brand-600'
      case 'green':
        return 'bg-green-100 text-green-600'
      case 'blue':
        return 'bg-blue-100 text-blue-600'
      case 'purple':
        return 'bg-purple-100 text-purple-600'
      case 'orange':
        return 'bg-orange-100 text-orange-600'
      case 'red':
        return 'bg-red-100 text-red-600'
      default:
        return 'bg-brand-100 text-brand-600'
    }
  }

  return (
    <section className={`${getSizeClasses()} ${getThemeClasses()} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl lg:text-5xl font-bold text-content-primary mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-content-secondary max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {/* Stats Grid */}
        <div className={`grid ${getColumnClasses()} gap-6 lg:gap-8`}>
          {stats.map((stat, index) => (
            <div 
              key={stat.id || index}
              className={`text-center p-6 rounded-2xl ${
                theme === 'minimal' 
                  ? 'border border-border' 
                  : 'bg-page-background border border-border hover:shadow-lg'
              } transition-all`}
            >
              {/* Icon */}
              {stat.icon && (
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${getColorClasses(stat.color)}`}>
                  {typeof stat.icon === 'string' ? (
                    <div className="w-6 h-6">{getIcon(stat.icon)}</div>
                  ) : typeof stat.icon === 'function' ? (
                    <stat.icon className="w-6 h-6" />
                  ) : (
                    <div className="w-6 h-6">{stat.icon}</div>
                  )}
                </div>
              )}
              
              {/* Value */}
              <div className="text-3xl lg:text-4xl font-bold text-content-primary mb-2">
                {stat.prefix}
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                {stat.suffix}
              </div>
              
              {/* Label */}
              <div className="text-lg font-medium text-content-secondary mb-1">
                {stat.label}
              </div>
              
              {/* Description */}
              {stat.description && (
                <p className="text-sm text-content-muted">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBlock