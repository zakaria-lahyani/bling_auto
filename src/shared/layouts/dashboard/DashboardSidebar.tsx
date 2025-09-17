/**
 * DashboardSidebar Component
 * 
 * Sidebar navigation specifically designed for dashboard pages.
 * Built on BaseSidebar with dashboard-specific navigation items.
 * 
 * Features:
 * - Role-based navigation menu
 * - Collapsible with hover expand
 * - Company branding in header
 * - User info in footer
 * - Mobile overlay support
 */
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Car, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  FileText, 
  BarChart3,
  Package,
  Wrench,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { BaseSidebar, BaseNavigation, type NavigationItem } from '../base'
import { AuthService } from '@/infrastructure/auth/auth'
import { useSettings } from '@/shared/hooks/useSettings'
import { cn } from '@/shared/utils'

export interface DashboardSidebarProps {
  /** Whether sidebar is collapsed */
  isCollapsed?: boolean
  
  /** Collapse toggle handler */
  onToggleCollapse?: () => void
  
  /** Whether sidebar is open (mobile) */
  isOpen?: boolean
  
  /** Open toggle handler (mobile) */
  onToggleOpen?: () => void
  
  /** Custom navigation items */
  customNavItems?: NavigationItem[]
  
  /** Additional CSS classes */
  className?: string
}

// Default navigation items based on user roles
const getNavigationItems = (userRole?: string): NavigationItem[] => {
  const baseItems: NavigationItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      roles: ['Client', 'Operator', 'Manager', 'Owner']
    },
    {
      title: 'My Bookings',
      href: '/dashboard/bookings',
      icon: Calendar,
      roles: ['Client']
    },
    {
      title: 'Schedule',
      href: '/dashboard/schedule',
      icon: Calendar,
      roles: ['Operator', 'Manager', 'Owner']
    },
    {
      title: 'Customers',
      href: '/dashboard/customers',
      icon: Users,
      roles: ['Manager', 'Owner']
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      roles: ['Manager', 'Owner']
    },
    {
      title: 'Services',
      href: '/dashboard/services',
      icon: Wrench,
      roles: ['Manager', 'Owner']
    },
    {
      title: 'Inventory',
      href: '/dashboard/inventory',
      icon: Package,
      roles: ['Operator', 'Manager', 'Owner']
    },
    {
      title: 'Reviews',
      href: '/dashboard/reviews',
      icon: Star,
      roles: ['Manager', 'Owner']
    },
    {
      title: 'Reports',
      href: '/dashboard/reports',
      icon: FileText,
      roles: ['Manager', 'Owner']
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      roles: ['Client', 'Operator', 'Manager', 'Owner']
    }
  ]

  // Add sub-items for certain roles
  if (userRole === 'Owner' || userRole === 'Manager') {
    const analyticsIndex = baseItems.findIndex(item => item.title === 'Analytics')
    if (analyticsIndex !== -1 && baseItems[analyticsIndex]) {
      baseItems[analyticsIndex]!.children = [
        {
          title: 'Overview',
          href: '/dashboard/analytics/overview',
          roles: ['Manager', 'Owner']
        },
        {
          title: 'Revenue',
          href: '/dashboard/analytics/revenue',
          roles: ['Manager', 'Owner']
        },
        {
          title: 'Performance',
          href: '/dashboard/analytics/performance',
          roles: ['Manager', 'Owner']
        }
      ]
    }
  }

  return baseItems
}

export function DashboardSidebar({
  isCollapsed = false,
  onToggleCollapse,
  isOpen = false,
  onToggleOpen,
  customNavItems,
  className
}: DashboardSidebarProps) {
  const [user, setUser] = useState<ReturnType<typeof AuthService.getCurrentUser>>(null)
  const { settings } = useSettings()

  useEffect(() => {
    setUser(AuthService.getCurrentUser())
  }, [])

  const navigationItems = customNavItems || getNavigationItems(user?.role)

  // Logo Header Component
  const SidebarHeader = (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center flex-shrink-0">
        <Car className="w-5 h-5 text-white" />
      </div>
      <div className={cn(
        'transition-opacity duration-200',
        isCollapsed && 'opacity-0'
      )}>
        <div className="font-bold text-content-primary">CarWash Pro</div>
        <div className="text-xs text-content-muted">Dashboard</div>
      </div>
    </div>
  )

  // User Footer Component
  const SidebarFooter = user && (
    <div className="flex items-center gap-3 p-3 bg-surface-muted rounded-lg">
      <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <span className="text-brand-600 text-sm font-medium">
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </span>
        )}
      </div>
      
      <div className={cn(
        'min-w-0 flex-1 transition-opacity duration-200',
        isCollapsed && 'opacity-0'
      )}>
        <div className="text-sm font-medium text-content-primary truncate">
          {user.name}
        </div>
        <div className="text-xs text-content-muted">
          {user.role}
        </div>
      </div>
    </div>
  )

  // Navigation Component
  const SidebarNavigation = (
    <div className="px-3">
      <BaseNavigation
        items={navigationItems}
        orientation="vertical"
        variant="sidebar"
        userRole={user?.role}
        showIcons={true}
        showBadges={true}
        className="space-y-1"
      />
    </div>
  )

  return (
    <BaseSidebar
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
      isOpen={isOpen}
      onToggleOpen={onToggleOpen}
      collapsedWidth="80px"
      expandedWidth="260px"
      header={SidebarHeader}
      footer={SidebarFooter}
      className={cn('dashboard-sidebar', className)}
    >
      {SidebarNavigation}
    </BaseSidebar>
  )
}

export default DashboardSidebar