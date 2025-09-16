/**
 * Vertical Navigation Component
 * 
 * The main navigation sidebar that displays menu items based on user role.
 * Supports collapsible behavior, multi-level menu items, and role-based access.
 * 
 * Features:
 * - Role-based menu filtering
 * - Collapsible/expandable behavior
 * - Active route highlighting
 * - Multi-level menu support
 * - Icon-based navigation
 * - Responsive hover behavior
 * 
 * Navigation Structure:
 * ```
 * ┌─────────────────┐
 * │ [Logo/Brand]    │
 * ├─────────────────┤
 * │ Dashboard       │
 * │ Services        │
 * │ Appointments    │
 * │ > Analytics     │ ← Expandable
 * │   - Reports     │
 * │   - Metrics     │
 * │ Settings        │
 * ├─────────────────┤
 * │ [Collapse Btn]  │
 * └─────────────────┘
 * ```
 * 
 * @param isCollapsed - Whether the navigation is in collapsed state
 * @param onToggleCollapse - Handler to toggle collapse state
 * @param onMouseEnter - Handler for mouse enter (used for hover expand)
 * @param onMouseLeave - Handler for mouse leave (used for hover collapse)
 */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, Menu, Car } from 'lucide-react'
import { getNavigationConfig } from '@/configs/navigation'
import { AuthService } from '@/lib/auth'
import type { MenuItem } from '@menu/types'
import { cn } from '@core/utils'
import { getIcon } from '@core/utils/iconMapper'

/**
 * Props for the VerticalNav component
 */
interface VerticalNavProps {
  /** Whether the navigation is collapsed */
  isCollapsed: boolean
  /** Handler to toggle collapse state */
  onToggleCollapse: () => void
  /** Mouse enter handler for hover behavior */
  onMouseEnter: () => void
  /** Mouse leave handler for hover behavior */
  onMouseLeave: () => void
}

const VerticalNav = ({ 
  isCollapsed, 
  onToggleCollapse, 
  onMouseEnter, 
  onMouseLeave 
}: VerticalNavProps) => {
  const pathname = usePathname()
  const [navigation, setNavigation] = useState<MenuItem[]>([])
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  
  useEffect(() => {
    // Get user role and navigation config
    const user = AuthService.getCurrentUser()
    const navConfig = getNavigationConfig(user?.role)
    setNavigation(navConfig)
  }, [])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const isItemActive = (item: MenuItem): boolean => {
    if (item.path === pathname) return true
    if (item.children) {
      return item.children.some(child => isItemActive(child))
    }
    return false
  }

  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const isActive = isItemActive(item)
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)

    if (item.type === 'section') {
      return (
        <div key={item.id} className="mb-4">
          {!isCollapsed && (
            <div className="px-4 py-2 text-xs font-semibold text-content-muted uppercase tracking-wider">
              {item.title}
            </div>
          )}
          {item.children?.map(child => renderMenuItem(child, depth + 1))}
        </div>
      )
    }

    if (item.type === 'divider') {
      return <div key={item.id} className="my-2 border-t border-border-muted" />
    }

    return (
      <div key={item.id}>
        <div
          className={cn(
            'flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-all',
            'hover:bg-surface-muted',
            isActive && 'bg-brand-500 text-white hover:bg-brand-600',
            depth > 0 && 'ml-4'
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id)
            } else if (item.path) {
              window.location.href = item.path
            }
          }}
        >
          <div className="flex items-center gap-3">
            {item.icon && (
              <div className={cn(
                'w-5 h-5 flex items-center justify-center',
                isActive ? 'text-white' : 'text-content-secondary'
              )}>
                {typeof item.icon === 'string' ? getIcon(item.icon) : item.icon}
              </div>
            )}
            {!isCollapsed && (
              <span className={cn(
                'text-sm font-medium',
                isActive ? 'text-white' : 'text-content-primary'
              )}>
                {item.title}
              </span>
            )}
          </div>
          
          {!isCollapsed && (
            <>
              {item.badge && (
                <span className={cn(
                  'px-2 py-0.5 text-xs rounded-full',
                  item.badge.color === 'primary' && 'bg-brand-100 text-brand-700',
                  item.badge.color === 'success' && 'bg-green-100 text-green-700',
                  item.badge.color === 'error' && 'bg-red-100 text-red-700'
                )}>
                  {item.badge.label}
                </span>
              )}
              
              {hasChildren && (
                <ChevronRight 
                  size={16} 
                  className={cn(
                    'transition-transform',
                    isExpanded && 'rotate-90'
                  )}
                />
              )}
            </>
          )}
        </div>
        
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1">
            {item.children?.map(child => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <nav 
      className={cn(
        'fixed left-0 top-0 h-full bg-surface border-r border-border transition-all duration-300 z-40',
        isCollapsed ? 'w-[80px]' : 'w-[260px]'
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Logo Area */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <Link href="/dashboards/analytics" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-content-primary">
              CarWash Pro
            </span>
          </Link>
        )}
        
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-surface-muted transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="overflow-y-auto h-[calc(100%-80px)] py-4">
        {navigation.map(item => renderMenuItem(item))}
      </div>
    </nav>
  )
}

export default VerticalNav