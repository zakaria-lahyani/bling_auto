'use client'

import { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'hero' | 'featured' | 'cta'
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'transparent' | 'default' | 'muted' | 'elevated' | 'gradient'
  width?: 'full' | 'container' | 'narrow'
}

export function Section({ 
  children, 
  className,
  variant = 'default',
  spacing = 'md',
  background = 'transparent',
  width = 'container'
}: SectionProps) {
  const spacingClasses = {
    none: '',
    sm: 'py-8 px-5',
    md: 'py-16 px-5',
    lg: 'py-20 px-5',
    xl: 'py-24 px-5'
  }

  const backgroundClasses = {
    transparent: '',
    default: 'bg-white dark:bg-slate-900',
    muted: 'bg-slate-50 dark:bg-slate-800',
    elevated: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-sm',
    gradient: 'bg-gradient-to-r from-teal-600 to-teal-700 text-white'
  }

  const widthClasses = {
    full: 'w-full',
    container: 'max-w-6xl mx-auto',
    narrow: 'max-w-4xl mx-auto'
  }

  const variantClasses = {
    default: '',
    hero: 'bg-slate-900 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 text-white',
    featured: 'bg-white dark:bg-slate-800',
    cta: 'bg-gradient-to-r from-teal-600 to-teal-700 text-white'
  }

  return (
    <section 
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        variantClasses[variant],
        className
      )}
    >
      <div className={widthClasses[width]}>
        {children}
      </div>
    </section>
  )
}