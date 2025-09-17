/**
 * BaseHeader Component
 * 
 * Provides core header functionality shared across all header variants.
 * Uses composition pattern with slots for customization.
 * 
 * Features:
 * - Responsive design with mobile menu
 * - Configurable logo, navigation, and action slots
 * - Consistent structure and behavior
 * - Accessibility support
 * - Theme integration
 */
'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/shared/utils'

export interface BaseHeaderProps {
  /** Logo component or content */
  logo?: React.ReactNode
  
  /** Navigation menu component */
  navigation?: React.ReactNode
  
  /** Action buttons/components (auth, theme toggle, etc.) */
  actions?: React.ReactNode
  
  /** Additional CSS classes */
  className?: string
  
  /** Whether header should be sticky */
  sticky?: boolean
  
  /** Custom mobile menu toggle handler */
  onMobileMenuToggle?: (isOpen: boolean) => void
  
  /** Background variant */
  variant?: 'default' | 'transparent' | 'elevated'
  
  /** Content width constraint */
  width?: 'full' | 'container'
}

export function BaseHeader({
  logo,
  navigation,
  actions,
  className,
  sticky = true,
  onMobileMenuToggle,
  variant = 'default',
  width = 'container'
}: BaseHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)
    onMobileMenuToggle?.(newState)
  }

  const headerVariants = {
    default: 'bg-surface border-b border-border',
    transparent: 'bg-transparent',
    elevated: 'bg-surface shadow-lg'
  }

  const containerClasses = width === 'container' 
    ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
    : 'px-4 sm:px-6 lg:px-8'

  return (
    <header className={cn(
      'z-50',
      sticky && 'sticky top-0',
      headerVariants[variant],
      className
    )}>
      <div className={containerClasses}>
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section - Logo */}
          {logo && (
            <div className="flex-shrink-0">
              {logo}
            </div>
          )}

          {/* Center Section - Navigation (Desktop) */}
          {navigation && (
            <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              {navigation}
            </nav>
          )}

          {/* Right Section - Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {actions}
            </div>

            {/* Mobile Menu Toggle */}
            {navigation && (
              <button
                onClick={handleMobileMenuToggle}
                className="md:hidden p-2 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-muted transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {navigation && isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 bg-surface">
            <nav className="flex flex-col space-y-4">
              {navigation}
              
              {/* Mobile Actions */}
              {actions && (
                <div className="pt-4 border-t border-border flex flex-col gap-3">
                  {actions}
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default BaseHeader