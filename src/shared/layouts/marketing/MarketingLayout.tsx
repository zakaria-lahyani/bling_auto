/**
 * MarketingLayout Component
 * 
 * Complete layout solution for marketing and public pages.
 * Combines MarketingHeader and MarketingFooter with proper content area.
 * 
 * Features:
 * - Marketing-focused header and footer
 * - SEO-friendly structure
 * - Responsive design
 * - Customizable components
 */
'use client'

import React from 'react'
import { MarketingHeader } from './MarketingHeader'
import { MarketingFooter } from './MarketingFooter'
import { cn } from '@/shared/utils'

export interface MarketingLayoutProps {
  /** Page content */
  children: React.ReactNode
  
  /** Header configuration */
  header?: {
    variant?: 'default' | 'transparent' | 'elevated'
    showAuth?: boolean
    customLogo?: React.ReactNode
    navigationItems?: Array<{
      name: string
      href: string
    }>
  }
  
  /** Footer configuration */
  footer?: {
    showNewsletter?: boolean
    onNewsletterSignup?: (email: string) => void
  }
  
  /** Main content area styling */
  contentClassName?: string
  
  /** Layout container styling */
  className?: string
  
  /** Whether to add top spacing (for transparent headers) */
  addTopSpacing?: boolean
}

export function MarketingLayout({
  children,
  header = {},
  footer = {},
  contentClassName,
  className,
  addTopSpacing = false
}: MarketingLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-page-background flex flex-col', className)}>
      
      {/* Marketing Header */}
      <MarketingHeader
        variant={header.variant}
        showAuth={header.showAuth}
        customLogo={header.customLogo}
        navigationItems={header.navigationItems}
      />
      
      {/* Main Content Area */}
      <main className={cn(
        'flex-1',
        addTopSpacing && 'pt-16', // Add spacing for transparent headers
        contentClassName
      )}>
        {children}
      </main>
      
      {/* Marketing Footer */}
      <MarketingFooter
        showNewsletter={footer.showNewsletter}
        onNewsletterSignup={footer.onNewsletterSignup}
      />
    </div>
  )
}

export default MarketingLayout