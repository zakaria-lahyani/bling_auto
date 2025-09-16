/**
 * Hero Block Component
 * 
 * A reusable hero section that can be used on any landing/marketing page.
 * Features gradient background, call-to-action buttons, and optional image.
 * 
 * @param title - Main heading text
 * @param subtitle - Supporting description text
 * @param badges - Array of badge text to display
 * @param primaryCTA - Primary call-to-action button config
 * @param secondaryCTA - Secondary call-to-action button config
 * @param image - Hero image configuration
 * @param stats - Optional floating stats card
 */
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, CheckCircle } from 'lucide-react'
import { getIcon } from '@core/utils/iconMapper'

export interface HeroBlockProps {
  title: string | React.ReactNode
  subtitle: string
  badges?: string[]
  primaryCTA: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  secondaryCTA?: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  stats?: {
    value: string
    label: string
    icon?: React.ReactNode | string
  }
  theme?: 'gradient' | 'solid' | 'image'
  className?: string
}

const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  subtitle,
  badges = [],
  primaryCTA,
  secondaryCTA,
  image,
  stats,
  theme = 'gradient',
  className = ''
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'gradient':
        return 'bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white'
      case 'solid':
        return 'bg-brand-500 text-white'
      case 'image':
        return 'bg-gray-900 text-white'
      default:
        return 'bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white'
    }
  }

  return (
    <section className={`relative ${getThemeClasses()} ${className}`}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Badges */}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
            
            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              {title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-brand-100 leading-relaxed max-w-lg">
              {subtitle}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={primaryCTA.href}
                className="bg-white text-brand-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-brand-50 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {primaryCTA.icon || <ArrowRight size={20} />}
                {primaryCTA.text}
              </Link>
              
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.href}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-brand-700 transition-all flex items-center justify-center gap-2"
                >
                  {secondaryCTA.icon || <Play size={20} />}
                  {secondaryCTA.text}
                </Link>
              )}
            </div>
          </div>
          
          {/* Image Section */}
          {image && (
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width || 600}
                  height={image.height || 400}
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                  priority
                />
              </div>
              
              {/* Floating Stats */}
              {stats && (
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      {typeof stats.icon === 'string' ? (
                        <div className="w-6 h-6 text-green-600">{getIcon(stats.icon)}</div>
                      ) : stats.icon ? (
                        <div className="w-6 h-6 text-green-600">{stats.icon}</div>
                      ) : (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{stats.value}</div>
                      <div className="text-sm text-gray-600">{stats.label}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroBlock