/**
 * Call-to-Action Block Component
 * 
 * A reusable CTA section for driving user action at the end of pages.
 * Features gradient backgrounds, icons, and multiple button options.
 * 
 * @param title - Main heading
 * @param subtitle - Supporting description
 * @param primaryCTA - Primary action button
 * @param secondaryCTA - Optional secondary button
 * @param icon - Optional icon to display
 * @param theme - Visual theme variant
 */
'use client'

import React from 'react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

export interface CTAButton {
  text: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
}

export interface CTABlockProps {
  title: string
  subtitle?: string
  primaryCTA: CTAButton
  secondaryCTA?: CTAButton
  icon?: LucideIcon | React.ReactNode
  theme?: 'gradient' | 'brand' | 'dark' | 'light'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const CTABlock: React.FC<CTABlockProps> = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  icon: Icon,
  theme = 'gradient',
  size = 'medium',
  className = ''
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'gradient':
        return 'bg-gradient-to-r from-brand-500 to-brand-600 text-white'
      case 'brand':
        return 'bg-brand-500 text-white'
      case 'dark':
        return 'bg-gray-900 text-white'
      case 'light':
        return 'bg-gray-50 text-gray-900'
      default:
        return 'bg-gradient-to-r from-brand-500 to-brand-600 text-white'
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

  const getTitleSize = () => {
    switch (size) {
      case 'small':
        return 'text-2xl lg:text-3xl'
      case 'medium':
        return 'text-3xl lg:text-5xl'
      case 'large':
        return 'text-4xl lg:text-6xl'
      default:
        return 'text-3xl lg:text-5xl'
    }
  }

  const getButtonVariantClasses = (variant: CTAButton['variant'] = 'primary', isSecondary = false) => {
    const baseClasses = 'px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center'
    
    if (theme === 'light') {
      switch (variant) {
        case 'primary':
          return `${baseClasses} bg-brand-500 text-white hover:bg-brand-600 shadow-lg`
        case 'secondary':
          return `${baseClasses} bg-gray-200 text-gray-900 hover:bg-gray-300`
        case 'outline':
          return `${baseClasses} border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white`
        default:
          return `${baseClasses} bg-brand-500 text-white hover:bg-brand-600 shadow-lg`
      }
    }
    
    // For dark themes (gradient, brand, dark)
    if (isSecondary || variant === 'secondary' || variant === 'outline') {
      return `${baseClasses} border-2 border-white text-white hover:bg-white hover:text-brand-700`
    }
    
    return `${baseClasses} bg-white text-brand-700 hover:bg-brand-50 shadow-lg`
  }

  return (
    <section className={`${getSizeClasses()} ${getThemeClasses()} ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        {Icon && (
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              {React.createElement(Icon as any, { className: "w-8 h-8 text-white" })}
            </div>
          </div>
        )}
        
        {/* Title */}
        <h2 className={`${getTitleSize()} font-bold mb-6`}>
          {title}
        </h2>
        
        {/* Subtitle */}
        {subtitle && (
          <p className={`text-xl leading-relaxed mb-8 max-w-2xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-brand-100'
          }`}>
            {subtitle}
          </p>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryCTA.href}
            className={getButtonVariantClasses(primaryCTA.variant)}
          >
            {primaryCTA.text}
          </Link>
          
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className={getButtonVariantClasses(secondaryCTA.variant, true)}
            >
              {secondaryCTA.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default CTABlock