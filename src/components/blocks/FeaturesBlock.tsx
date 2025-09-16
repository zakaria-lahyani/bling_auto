/**
 * Features Block Component
 * 
 * A reusable features showcase section that displays feature cards in a grid.
 * Perfect for highlighting key benefits, services, or capabilities.
 * 
 * @param title - Section heading
 * @param subtitle - Section description
 * @param features - Array of feature objects
 * @param columns - Number of columns (2, 3, or 4)
 * @param theme - Visual theme variant
 */
'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
import { getIcon } from '@core/utils/iconMapper'

export interface Feature {
  icon: LucideIcon | React.ReactNode | string
  title: string
  description: string
  link?: {
    text: string
    href: string
  }
}

export interface FeaturesBlockProps {
  title: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  theme?: 'light' | 'dark' | 'surface'
  className?: string
}

const FeaturesBlock: React.FC<FeaturesBlockProps> = ({
  title,
  subtitle,
  features,
  columns = 4,
  theme = 'surface',
  className = ''
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-white'
      case 'dark':
        return 'bg-gray-900 text-white'
      case 'surface':
        return 'bg-surface'
      default:
        return 'bg-surface'
    }
  }

  const getColumnClasses = () => {
    switch (columns) {
      case 2:
        return 'md:grid-cols-2'
      case 3:
        return 'md:grid-cols-2 lg:grid-cols-3'
      case 4:
        return 'md:grid-cols-2 lg:grid-cols-4'
      default:
        return 'md:grid-cols-2 lg:grid-cols-4'
    }
  }

  return (
    <section className={`py-20 ${getThemeClasses()} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-content-primary mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-content-secondary max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Features Grid */}
        <div className={`grid ${getColumnClasses()} gap-8`}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-page-background border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all group"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-200 transition-colors">
                {typeof feature.icon === 'string' ? (
                  <div className="w-8 h-8 text-brand-600">{getIcon(feature.icon)}</div>
                ) : typeof feature.icon === 'function' ? (
                  <feature.icon className="w-8 h-8 text-brand-600" />
                ) : (
                  <div className="w-8 h-8 text-brand-600">{feature.icon}</div>
                )}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-content-primary mb-2">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-content-secondary mb-4">
                {feature.description}
              </p>
              
              {/* Optional Link */}
              {feature.link && (
                <a
                  href={feature.link.href}
                  className="text-brand-600 hover:text-brand-700 font-medium text-sm hover:underline"
                >
                  {feature.link.text} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesBlock