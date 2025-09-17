/**
 * DashboardFooter Component
 * 
 * Footer specifically designed for dashboard pages.
 * Built on BaseFooter with minimal, dashboard-appropriate content.
 * 
 * Features:
 * - Copyright notice
 * - Quick support links
 * - System status (optional)
 * - Version information (optional)
 */
'use client'

import React from 'react'
import Link from 'next/link'
import { BaseFooter } from '../base'
import { cn } from '@/shared/utils'

export interface DashboardFooterProps {
  /** Whether footer should be fixed */
  isFixed?: boolean
  
  /** Whether to show version information */
  showVersion?: boolean
  
  /** Application version */
  version?: string
  
  /** Whether to show system status */
  showStatus?: boolean
  
  /** System status */
  systemStatus?: 'operational' | 'maintenance' | 'degraded'
  
  /** Additional support links */
  supportLinks?: Array<{
    name: string
    href: string
  }>
  
  /** Additional CSS classes */
  className?: string
}

const defaultSupportLinks = [
  { name: 'Support', href: '/support' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Privacy Policy', href: '/privacy' }
]

export function DashboardFooter({
  isFixed = false,
  showVersion = false,
  version = '1.0.0',
  showStatus = false,
  systemStatus = 'operational',
  supportLinks = defaultSupportLinks,
  className
}: DashboardFooterProps) {
  
  const statusConfig = {
    operational: {
      color: 'text-green-600',
      bg: 'bg-green-100',
      text: 'All systems operational'
    },
    maintenance: {
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      text: 'Scheduled maintenance'
    },
    degraded: {
      color: 'text-red-600',
      bg: 'bg-red-100',
      text: 'System performance degraded'
    }
  }

  const currentStatus = statusConfig[systemStatus]

  // Left Content - Copyright and Version
  const LeftContent = (
    <div className="flex items-center gap-4">
      <div className="text-sm text-content-muted">
        © {new Date().getFullYear()} CarWash Pro. All rights reserved.
      </div>
      
      {showVersion && (
        <div className="text-xs text-content-muted bg-surface-muted px-2 py-1 rounded">
          v{version}
        </div>
      )}
    </div>
  )

  // Right Content - Links and Status
  const RightContent = (
    <div className="flex items-center gap-6">
      
      {/* Support Links */}
      <div className="flex items-center gap-4">
        {supportLinks.map((link, index) => (
          <React.Fragment key={link.name}>
            {index > 0 && (
              <span className="text-content-muted">•</span>
            )}
            <Link
              href={link.href}
              className="text-sm text-content-muted hover:text-content-primary transition-colors"
            >
              {link.name}
            </Link>
          </React.Fragment>
        ))}
      </div>

      {/* System Status */}
      {showStatus && (
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-2 h-2 rounded-full',
            currentStatus.bg
          )} />
          <span className={cn(
            'text-xs font-medium',
            currentStatus.color
          )}>
            {currentStatus.text}
          </span>
        </div>
      )}
    </div>
  )

  return (
    <BaseFooter
      variant="minimal"
      position={isFixed ? 'fixed' : 'static'}
      leftContent={LeftContent}
      rightContent={RightContent}
      className={cn('dashboard-footer', className)}
    />
  )
}

export default DashboardFooter