/**
 * BaseNavigation Component
 * 
 * Provides core navigation functionality shared across different navigation types.
 * Supports horizontal, vertical, and mobile navigation patterns.
 * 
 * Features:
 * - Flexible navigation items with icons, badges, and sub-menus
 * - Active state management
 * - Role-based visibility
 * - Responsive behavior
 * - Accessibility support
 */
'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/shared/utils'

export interface NavigationItem {
  /** Display text */
  title: string
  
  /** Navigation path */
  href: string
  
  /** Icon component */
  icon?: React.ComponentType<{ size?: number; className?: string }>
  
  /** Badge content (notification count, "new", etc.) */
  badge?: {
    content: string | number
    variant?: 'default' | 'success' | 'warning' | 'error'
  }
  
  /** Sub-navigation items */
  children?: NavigationItem[]
  
  /** Required user roles to see this item */
  roles?: string[]
  
  /** Whether item is disabled */
  disabled?: boolean
  
  /** External link indicator */
  external?: boolean
}

export interface BaseNavigationProps {
  /** Navigation items */
  items: NavigationItem[]
  
  /** Navigation orientation */
  orientation?: 'horizontal' | 'vertical'
  
  /** Current user role for filtering */
  userRole?: string
  
  /** Custom item click handler */
  onItemClick?: (item: NavigationItem) => void
  
  /** Custom active path matcher */
  isActivePath?: (href: string, pathname: string) => boolean
  
  /** Navigation variant */
  variant?: 'default' | 'pills' | 'underline' | 'sidebar'
  
  /** Additional CSS classes */
  className?: string
  
  /** Whether to show icons */
  showIcons?: boolean
  
  /** Whether to show badges */
  showBadges?: boolean
}

export function BaseNavigation({
  items,
  orientation = 'horizontal',
  userRole,
  onItemClick,
  isActivePath,
  variant = 'default',
  className,
  showIcons = true,
  showBadges = true
}: BaseNavigationProps) {
  const pathname = usePathname()

  // Filter items based on user role
  const visibleItems = items.filter(item => {
    if (!item.roles || item.roles.length === 0) return true
    return userRole && item.roles.includes(userRole)
  })

  // Default active path matcher
  const defaultIsActive = (href: string, currentPath: string) => {
    if (href === '/') return currentPath === href
    return currentPath.startsWith(href)
  }

  const activePathMatcher = isActivePath || defaultIsActive

  // Variant styles
  const variantClasses = {
    default: {
      container: orientation === 'horizontal' ? 'flex items-center space-x-6' : 'flex flex-col space-y-1',
      item: 'text-content-secondary hover:text-content-primary transition-colors',
      active: 'text-content-primary font-medium'
    },
    pills: {
      container: orientation === 'horizontal' ? 'flex items-center space-x-2' : 'flex flex-col space-y-1',
      item: 'px-3 py-2 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-muted transition-colors',
      active: 'bg-brand-100 text-brand-700 font-medium'
    },
    underline: {
      container: orientation === 'horizontal' ? 'flex items-center space-x-6' : 'flex flex-col space-y-1',
      item: 'pb-2 border-b-2 border-transparent text-content-secondary hover:text-content-primary transition-colors',
      active: 'border-brand-500 text-brand-600 font-medium'
    },
    sidebar: {
      container: 'flex flex-col space-y-1',
      item: 'flex items-center px-3 py-2 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-muted transition-colors',
      active: 'bg-brand-100 text-brand-700 font-medium'
    }
  }

  const styles = variantClasses[variant]

  const renderBadge = (badge: NavigationItem['badge']) => {
    if (!badge || !showBadges) return null

    const badgeVariants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    }

    return (
      <span className={cn(
        'ml-2 px-2 py-0.5 text-xs font-medium rounded-full',
        badgeVariants[badge.variant || 'default']
      )}>
        {badge.content}
      </span>
    )
  }

  const renderIcon = (IconComponent: NavigationItem['icon']) => {
    if (!IconComponent || !showIcons) return null
    return <IconComponent size={18} className="mr-2" />
  }

  const renderNavigationItem = (item: NavigationItem, depth = 0) => {
    const isActive = activePathMatcher(item.href, pathname)
    const hasChildren = item.children && item.children.length > 0
    const [isExpanded, setIsExpanded] = React.useState(isActive)

    const itemContent = (
      <>
        {renderIcon(item.icon)}
        <span className="flex-1">{item.title}</span>
        {renderBadge(item.badge)}
        {hasChildren && variant === 'sidebar' && (
          <ChevronRight 
            size={16} 
            className={cn(
              'transition-transform',
              isExpanded && 'rotate-90'
            )}
          />
        )}
      </>
    )

    const itemClasses = cn(
      styles.item,
      isActive && styles.active,
      item.disabled && 'opacity-50 cursor-not-allowed',
      depth > 0 && 'ml-4',
      variant === 'sidebar' && 'flex items-center w-full'
    )

    const handleClick = () => {
      if (item.disabled) return
      
      if (hasChildren && variant === 'sidebar') {
        setIsExpanded(!isExpanded)
      }
      
      onItemClick?.(item)
    }

    return (
      <div key={item.href}>
        {hasChildren && variant === 'sidebar' ? (
          <button
            onClick={handleClick}
            className={itemClasses}
            disabled={item.disabled}
          >
            {itemContent}
          </button>
        ) : (
          <Link
            href={item.href}
            onClick={handleClick}
            className={itemClasses}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
          >
            {itemContent}
          </Link>
        )}

        {/* Sub-navigation */}
        {hasChildren && variant === 'sidebar' && isExpanded && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children!.map(child => renderNavigationItem(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <nav className={cn(styles.container, className)}>
      {visibleItems.map(item => renderNavigationItem(item))}
    </nav>
  )
}

export default BaseNavigation