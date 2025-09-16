/**
 * Vertical Layout Component
 * 
 * The main layout component that provides the structure for dashboard pages.
 * It implements a classic sidebar + main content layout with responsive behavior.
 * 
 * Features:
 * - Collapsible side navigation
 * - Responsive design
 * - Fixed/static app bar options
 * - Configurable content width
 * - Settings-based customization
 * - Special page handling (hides nav for certain routes)
 * 
 * Layout Structure:
 * ```
 * ┌─────────────────────────────────────┐
 * │ [Navigation] │ [App Bar]             │
 * │  Sidebar     ├─────────────────────  │
 * │              │ Main Content          │
 * │              │                       │
 * │              │ {children}            │
 * │              │                       │
 * │              ├─────────────────────  │
 * │              │ [Footer]              │
 * └─────────────────────────────────────┘
 * ```
 * 
 * @param children - Page content to render in the main area
 */
'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import type { ChildrenType } from '@core/types'
import VerticalNav from './components/vertical/Navigation'
import AppBar from './components/shared/AppBar'
import Footer from './components/shared/Footer'
import { useSettings } from '@core/hooks/useSettings'

const VerticalLayout = ({ children }: ChildrenType) => {
  const { settings } = useSettings()
  const pathname = usePathname()
  
  // Navigation state management
  const [navCollapsed, setNavCollapsed] = useState(false)
  const [navHovered, setNavHovered] = useState(false)
  
  // Special pages that should hide navigation (e.g., login, landing pages)
  const hideNav = pathname === '/connection'
  
  // Calculate if navigation should be in collapsed state
  const isCollapsed = settings.layout === 'collapsed' && navCollapsed && !navHovered

  return (
    <div className="min-h-screen bg-page-background flex">
      {/* Vertical Navigation Sidebar */}
      {!hideNav && (
        <VerticalNav 
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setNavCollapsed(!navCollapsed)}
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
        />
      )}
      
      {/* Main Content Area - Adjusts width based on navigation state */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        !hideNav && isCollapsed ? 'ml-[80px]' : !hideNav ? 'ml-[260px]' : ''
      }`}>
        
        {/* App Bar - Top navigation bar with user menu, notifications, etc. */}
        {settings.appBar?.type !== 'hidden' && (
          <AppBar 
            isFixed={settings.appBar?.type === 'fixed'}
            onMenuToggle={() => setNavCollapsed(!navCollapsed)}
          />
        )}
        
        {/* Main Content Area - Where page content is rendered */}
        <main className={`flex-1 overflow-auto ${
          // Add top padding if app bar is fixed
          settings.appBar?.type === 'fixed' ? 'pt-16' : ''
        } ${
          // Add bottom padding if footer is fixed
          settings.footer?.type === 'fixed' ? 'pb-14' : ''
        }`}>
          {/* Content Container - Handles width constraints and padding */}
          <div className={`${
            // Apply max width for compact mode
            settings.contentWidth === 'compact' ? 'max-w-7xl mx-auto' : ''
          } p-6`}>
            {/* Rendered page content goes here */}
            {children}
          </div>
        </main>
        
        {/* Footer - Bottom section with links, copyright, etc. */}
        {settings.footer?.type !== 'hidden' && (
          <Footer isFixed={settings.footer?.type === 'fixed'} />
        )}
      </div>
    </div>
  )
}

export default VerticalLayout