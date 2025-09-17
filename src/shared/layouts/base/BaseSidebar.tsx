/**
 * BaseSidebar Component
 * 
 * Provides core sidebar functionality for dashboard layouts.
 * Supports collapsible behavior, hover states, and responsive design.
 * 
 * Features:
 * - Collapsible with smooth animations
 * - Hover expand when collapsed
 * - Responsive behavior (auto-collapse on mobile)
 * - Configurable width and positioning
 * - Overlay mode for mobile
 */
'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/shared/utils'

export interface BaseSidebarProps {
  /** Sidebar content */
  children: React.ReactNode
  
  /** Whether sidebar is collapsed */
  isCollapsed?: boolean
  
  /** Collapse toggle handler */
  onToggleCollapse?: () => void
  
  /** Whether sidebar is open (mobile) */
  isOpen?: boolean
  
  /** Open toggle handler (mobile) */
  onToggleOpen?: () => void
  
  /** Sidebar position */
  position?: 'left' | 'right'
  
  /** Collapsed width */
  collapsedWidth?: string
  
  /** Expanded width */
  expandedWidth?: string
  
  /** Whether to show overlay on mobile */
  showOverlay?: boolean
  
  /** Logo/branding area */
  header?: React.ReactNode
  
  /** Footer area */
  footer?: React.ReactNode
  
  /** Additional CSS classes */
  className?: string
  
  /** Custom breakpoint for mobile behavior */
  mobileBreakpoint?: string
}

export function BaseSidebar({
  children,
  isCollapsed = false,
  onToggleCollapse,
  isOpen = false,
  onToggleOpen,
  position = 'left',
  collapsedWidth = '80px',
  expandedWidth = '260px',
  showOverlay = true,
  header,
  footer,
  className,
  mobileBreakpoint = 'lg'
}: BaseSidebarProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      const breakpointMap = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280
      }
      
      const breakpointValue = breakpointMap[mobileBreakpoint as keyof typeof breakpointMap] || 1024
      setIsMobile(window.innerWidth < breakpointValue)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [mobileBreakpoint])

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile && onToggleOpen) {
      onToggleOpen()
    }
  }

  // Prevent event bubbling when clicking sidebar content
  const handleSidebarClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // Determine if sidebar should be in expanded state
  const isExpanded = isMobile ? isOpen : isCollapsed ? isHovered : true

  // Calculate sidebar width
  const sidebarWidth = isExpanded ? expandedWidth : collapsedWidth

  // Position classes
  const positionClasses = {
    left: {
      sidebar: 'left-0',
      marginClass: `ml-[${sidebarWidth}]`
    },
    right: {
      sidebar: 'right-0',
      marginClass: `mr-[${sidebarWidth}]`
    }
  }

  const styles = positionClasses[position]

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 h-full bg-surface border-r border-border z-50 transition-all duration-300 ease-in-out',
          styles.sidebar,
          isMobile ? (
            isOpen ? 'translate-x-0' : position === 'left' ? '-translate-x-full' : 'translate-x-full'
          ) : 'translate-x-0',
          className
        )}
        style={{ width: sidebarWidth }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={handleSidebarClick}
      >
        <div className="flex flex-col h-full">
          
          {/* Header Section */}
          {header && (
            <div className="flex-shrink-0 border-b border-border">
              <div className="flex items-center justify-between p-4">
                <div className={cn(
                  'transition-opacity duration-200',
                  !isExpanded && 'opacity-0'
                )}>
                  {header}
                </div>
                
                {/* Mobile Close Button */}
                {isMobile && (
                  <button
                    onClick={onToggleOpen}
                    className="p-2 rounded-lg hover:bg-surface-muted transition-colors lg:hidden"
                    aria-label="Close sidebar"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className={cn(
              'transition-opacity duration-200',
              !isExpanded && 'opacity-0'
            )}>
              {children}
            </div>
          </div>

          {/* Footer Section */}
          {footer && (
            <div className="flex-shrink-0 border-t border-border p-4">
              <div className={cn(
                'transition-opacity duration-200',
                !isExpanded && 'opacity-0'
              )}>
                {footer}
              </div>
            </div>
          )}
        </div>

        {/* Collapse Toggle (Desktop) */}
        {!isMobile && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className={cn(
              'absolute -right-3 top-1/2 transform -translate-y-1/2',
              'w-6 h-6 bg-surface border border-border rounded-full',
              'flex items-center justify-center hover:bg-surface-muted transition-colors',
              'text-content-muted hover:text-content-primary'
            )}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <div className={cn(
              'w-2 h-2 border-r-2 border-b-2 border-current transform transition-transform',
              isCollapsed ? 'rotate-[-135deg]' : 'rotate-[45deg]'
            )} />
          </button>
        )}
      </aside>
    </>
  )
}

export default BaseSidebar