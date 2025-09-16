'use client'

import { ReactNode, ElementType } from 'react'
import { cn } from '@/shared/utils'

interface TypographyProps {
  children: ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'small'
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'error' | 'danger'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
  className?: string
  as?: ElementType
}

export function Typography({ 
  children, 
  variant = 'body',
  color = 'primary',
  weight,
  align = 'left',
  className,
  as
}: TypographyProps) {
  const variantClasses = {
    h1: 'text-4xl lg:text-5xl font-semibold leading-tight',
    h2: 'text-3xl font-semibold',
    h3: 'text-xl font-semibold', 
    h4: 'text-lg font-semibold',
    body: 'text-base',
    caption: 'text-sm',
    small: 'text-xs'
  }

  const colorClasses = {
    primary: 'text-slate-900 dark:text-slate-100',
    secondary: 'text-slate-700 dark:text-slate-300',
    muted: 'text-slate-600 dark:text-slate-400',
    accent: 'text-teal-600 dark:text-teal-400',
    success: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    error: 'text-red-600 dark:text-red-400',
    danger: 'text-red-600 dark:text-red-400'
  }

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  const defaultElements: Record<string, ElementType> = {
    h1: 'h1',
    h2: 'h2', 
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    caption: 'p',
    small: 'span'
  }

  const Component = as || defaultElements[variant] || 'p'

  return (
    <Component
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        weight && weightClasses[weight],
        alignClasses[align],
        className
      )}
    >
      {children}
    </Component>
  )
}

// Convenience components
export const Heading1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
)

export const Heading2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
)

export const Heading3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
)

export const Heading4 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" {...props} />
)

export const BodyText = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body" {...props} />
)

export const Caption = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="caption" {...props} />
)

export const SmallText = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="small" {...props} />
)

// Alias exports for convenience
export const H1 = Heading1
export const H2 = Heading2
export const H3 = Heading3
export const H4 = Heading4