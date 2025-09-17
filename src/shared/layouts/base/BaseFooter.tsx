/**
 * BaseFooter Component
 * 
 * Provides core footer functionality shared across all footer variants.
 * Supports different layouts and positioning options.
 * 
 * Features:
 * - Flexible content areas (left, center, right)
 * - Multiple variants (minimal, full, marketing)
 * - Fixed or static positioning
 * - Responsive design
 * - Theme integration
 */
'use client'

import React from 'react'
import { cn } from '@/shared/utils'

export interface BaseFooterProps {
  /** Left section content (typically copyright) */
  leftContent?: React.ReactNode
  
  /** Center section content (typically navigation) */
  centerContent?: React.ReactNode
  
  /** Right section content (typically links/social) */
  rightContent?: React.ReactNode
  
  /** Footer variant */
  variant?: 'minimal' | 'full' | 'marketing'
  
  /** Position type */
  position?: 'static' | 'fixed' | 'sticky'
  
  /** Background theme */
  background?: 'default' | 'muted' | 'transparent'
  
  /** Content width constraint */
  width?: 'full' | 'container'
  
  /** Additional CSS classes */
  className?: string
}

export function BaseFooter({
  leftContent,
  centerContent,
  rightContent,
  variant = 'minimal',
  position = 'static',
  background = 'default',
  width = 'container',
  className
}: BaseFooterProps) {
  
  const positionClasses = {
    static: '',
    fixed: 'fixed bottom-0 left-0 right-0 z-20',
    sticky: 'sticky bottom-0'
  }

  const backgroundClasses = {
    default: 'bg-surface',
    muted: 'bg-surface-muted',
    transparent: 'bg-transparent'
  }

  const variantClasses = {
    minimal: 'h-14 border-t border-border',
    full: 'py-8 border-t border-border',
    marketing: 'py-12 border-t border-border'
  }

  const containerClasses = width === 'container' 
    ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
    : 'px-4 sm:px-6 lg:px-8'

  const contentLayoutClasses = variant === 'minimal'
    ? 'flex items-center justify-between'
    : 'space-y-6'

  return (
    <footer className={cn(
      positionClasses[position],
      backgroundClasses[background],
      variantClasses[variant],
      'flex items-center',
      className
    )}>
      <div className={cn(containerClasses, 'w-full')}>
        <div className={contentLayoutClasses}>
          
          {/* Minimal Layout - Single Row */}
          {variant === 'minimal' && (
            <>
              {leftContent && (
                <div className="flex-shrink-0">
                  {leftContent}
                </div>
              )}
              
              {centerContent && (
                <div className="flex-1 flex justify-center">
                  {centerContent}
                </div>
              )}
              
              {rightContent && (
                <div className="flex-shrink-0">
                  {rightContent}
                </div>
              )}
            </>
          )}

          {/* Full/Marketing Layout - Stacked Content */}
          {(variant === 'full' || variant === 'marketing') && (
            <>
              {/* Main Content Area */}
              {(leftContent || centerContent) && (
                <div className={cn(
                  variant === 'marketing' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
                    : 'flex flex-col md:flex-row justify-between items-start gap-6'
                )}>
                  {leftContent}
                  {centerContent}
                </div>
              )}
              
              {/* Bottom Section */}
              {rightContent && (
                <div className={cn(
                  'pt-6 border-t border-border',
                  variant === 'marketing' 
                    ? 'flex flex-col md:flex-row justify-between items-center'
                    : 'text-center'
                )}>
                  {rightContent}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </footer>
  )
}

export default BaseFooter