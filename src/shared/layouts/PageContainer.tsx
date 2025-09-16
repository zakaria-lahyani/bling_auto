'use client'

import { ReactNode } from 'react'
import { cn } from '@/shared/utils'

interface PageContainerProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'fluid' | 'compact'
  background?: 'default' | 'muted' | 'elevated'
}

export function PageContainer({ 
  children, 
  className, 
  variant = 'default',
  background = 'default'
}: PageContainerProps) {
  const containerClasses = {
    default: 'min-h-screen',
    fluid: 'min-h-screen w-full',
    compact: 'min-h-[calc(100vh-4rem)]'
  }

  const backgroundClasses = {
    default: 'bg-white dark:bg-slate-900',
    muted: 'bg-slate-50 dark:bg-slate-800',
    elevated: 'bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700'
  }

  return (
    <div 
      className={cn(
        containerClasses[variant],
        backgroundClasses[background],
        'text-slate-900 dark:text-slate-100',
        className
      )}
    >
      {children}
    </div>
  )
}