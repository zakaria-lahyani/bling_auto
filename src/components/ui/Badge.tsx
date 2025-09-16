'use client'

import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export default function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  className,
  onClick 
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200',
    primary: 'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200',
    success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    outline: 'bg-transparent border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200'
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs rounded-full',
    md: 'px-3 py-1 text-sm rounded-full',
    lg: 'px-4 py-2 text-base rounded-full'
  }

  return (
    <span
      className={clsx(
        'inline-block font-medium',
        variantClasses[variant],
        sizeClasses[size],
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
      onClick={onClick}
    >
      {children}
    </span>
  )
}