/**
 * DashboardLayout Component
 * 
 * Complete layout solution for dashboard and authenticated pages.
 * Combines DashboardHeader, DashboardSidebar, and DashboardFooter.
 * 
 * Features:
 * - Responsive sidebar with collapse/expand
 * - Mobile-friendly with overlay sidebar
 * - Settings-based customization
 * - Search functionality
 * - User authentication handling
 */
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeader } from './DashboardHeader'
import { DashboardSidebar } from './DashboardSidebar'
import { DashboardFooter } from './DashboardFooter'
import { AuthService } from '@/infrastructure/auth/auth'
import { useSettings } from '@/shared/hooks/useSettings'
import { cn } from '@/shared/utils'

export interface DashboardLayoutProps {
  /** Page content */
  children: React.ReactNode
  
  /** Page title for header */
  title?: string
  
  /** Page description/subtitle */
  description?: string
  
  /** Header configuration */
  header?: {
    showSearch?: boolean
    showNotifications?: boolean
    showThemeToggle?: boolean
    searchPlaceholder?: string
    onSearch?: (query: string) => void
    notificationCount?: number
  }
  
  /** Sidebar configuration */
  sidebar?: {
    defaultCollapsed?: boolean
    customNavItems?: any[]
  }
  
  /** Footer configuration */
  footer?: {
    showVersion?: boolean
    showStatus?: boolean
    version?: string
    systemStatus?: 'operational' | 'maintenance' | 'degraded'
  }
  
  /** Content area styling */
  contentClassName?: string
  
  /** Layout container styling */
  className?: string
  
  /** Whether to require authentication */
  requireAuth?: boolean
  
  /** Required user roles */
  requiredRoles?: string[]
}

export function DashboardLayout({
  children,
  title,
  description,
  header = {},
  sidebar = {},
  footer = {},
  contentClassName,
  className,
  requireAuth = true,
  requiredRoles = []
}: DashboardLayoutProps) {
  const router = useRouter()
  const { settings } = useSettings()
  
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(sidebar.defaultCollapsed || false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // User state
  const [user, setUser] = useState<ReturnType<typeof AuthService.getCurrentUser>>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = AuthService.getCurrentUser()
      setUser(currentUser)
      
      if (requireAuth && !currentUser) {
        router.push('/auth/login')
        return
      }
      
      if (requiredRoles.length > 0 && currentUser) {
        const userHasRole = requiredRoles.includes(currentUser.role)
        setHasAccess(userHasRole)
        
        if (!userHasRole) {
          router.push('/dashboard') // Redirect to main dashboard
          return
        }
      } else {
        setHasAccess(true)
      }
      
      setIsLoading(false)
    }

    checkAuth()
  }, [requireAuth, requiredRoles, router])

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [children])

  // Handle search
  const handleSearch = (query: string) => {
    header.onSearch?.(query)
    // Default search behavior - could navigate to search page
    if (!header.onSearch) {
      router.push(`/dashboard/search?q=${encodeURIComponent(query)}`)
    }
  }

  // Calculate content margin based on sidebar state
  const sidebarWidth = sidebarCollapsed ? '80px' : '260px'
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-page-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-content-secondary">Loading...</span>
        </div>
      </div>
    )
  }

  // Show access denied
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-page-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-content-primary mb-2">Access Denied</h1>
          <p className="text-content-secondary mb-4">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('min-h-screen bg-page-background', className)}>
      
      {/* Dashboard Header */}
      <DashboardHeader
        onMobileMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onSearch={handleSearch}
        searchPlaceholder={header.searchPlaceholder}
        showSearch={header.showSearch}
        showNotifications={header.showNotifications}
        showThemeToggle={header.showThemeToggle}
        notificationCount={header.notificationCount}
      />
      
      <div className="flex">
        
        {/* Dashboard Sidebar */}
        <DashboardSidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          isOpen={sidebarOpen}
          onToggleOpen={() => setSidebarOpen(!sidebarOpen)}
          customNavItems={sidebar.customNavItems}
        />
        
        {/* Main Content Area */}
        <main className={cn(
          'flex-1 transition-all duration-300 ease-in-out',
          'min-h-[calc(100vh-4rem)]', // Subtract header height
          `lg:ml-[${sidebarWidth}]`, // Desktop sidebar margin
          settings.footer?.type === 'fixed' && 'pb-14' // Footer padding
        )}>
          
          {/* Page Header */}
          {(title || description) && (
            <div className="bg-surface border-b border-border px-6 py-4">
              {title && (
                <h1 className="text-2xl font-bold text-content-primary">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-content-secondary mt-1">
                  {description}
                </p>
              )}
            </div>
          )}
          
          {/* Page Content */}
          <div className={cn(
            'p-6',
            settings.contentWidth === 'compact' && 'max-w-7xl mx-auto',
            contentClassName
          )}>
            {children}
          </div>
        </main>
      </div>
      
      {/* Dashboard Footer */}
      {settings.footer?.type !== 'hidden' && (
        <DashboardFooter
          isFixed={settings.footer?.type === 'fixed'}
          showVersion={footer.showVersion}
          showStatus={footer.showStatus}
          version={footer.version}
          systemStatus={footer.systemStatus}
        />
      )}
    </div>
  )
}

export default DashboardLayout