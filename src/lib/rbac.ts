export type UserRole = 'Visitor' | 'Client' | 'Operator' | 'Manager' | 'Owner'

export type Permission = 
  | 'view:dashboard'
  | 'view:appointments'
  | 'create:appointments'
  | 'update:appointments'
  | 'delete:appointments'
  | 'view:services'
  | 'create:services'
  | 'update:services'
  | 'delete:services'
  | 'view:jobs'
  | 'update:jobs'
  | 'view:planning'
  | 'create:planning'
  | 'update:planning'
  | 'view:stock'
  | 'update:stock'
  | 'view:operators'
  | 'manage:operators'
  | 'view:customers'
  | 'manage:customers'
  | 'view:analytics'
  | 'manage:system'

export interface RouteConfig {
  path: string
  label: string
  icon?: string
  permission?: Permission
  roles?: UserRole[]
}

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  Visitor: [
    'view:services',
    'create:appointments'
  ],
  Client: [
    'view:services',
    'view:appointments',
    'create:appointments',
    'update:appointments',
    'delete:appointments'
  ],
  Operator: [
    'view:services',
    'view:appointments',
    'update:appointments',
    'view:jobs',
    'update:jobs'
  ],
  Manager: [
    'view:dashboard',
    'view:appointments',
    'create:appointments',
    'update:appointments',
    'view:services',
    'view:jobs',
    'update:jobs',
    'view:planning',
    'create:planning',
    'update:planning',
    'view:stock',
    'update:stock',
    'view:operators',
    'view:customers',
    'view:analytics'
  ],
  Owner: [
    'view:dashboard',
    'view:appointments',
    'create:appointments',
    'update:appointments',
    'delete:appointments',
    'view:services',
    'create:services',
    'update:services',
    'delete:services',
    'view:jobs',
    'update:jobs',
    'view:planning',
    'create:planning',
    'update:planning',
    'view:stock',
    'update:stock',
    'view:operators',
    'manage:operators',
    'view:customers',
    'manage:customers',
    'view:analytics',
    'manage:system'
  ]
}

// Route configurations by role
export const ROLE_ROUTES: Record<UserRole, RouteConfig[]> = {
  Visitor: [
    { path: '/', label: 'Home', icon: 'Home' },
    { path: '/services', label: 'Services', icon: 'Car' },
    { path: '/booking', label: 'Book Now', icon: 'Calendar' }
  ],
  Client: [
    { path: '/appointments', label: 'My Appointments', icon: 'Calendar' },
    { path: '/booking', label: 'Book Service', icon: 'Plus' },
    { path: '/services', label: 'Services', icon: 'Car' },
    { path: '/loyalty', label: 'Loyalty Program', icon: 'Star' },
    { path: '/profile', label: 'Profile', icon: 'User' }
  ],
  Operator: [
    { path: '/jobs', label: 'Today\'s Jobs', icon: 'Clipboard' },
    { path: '/operator-jobs', label: 'My Jobs', icon: 'User' },
    { path: '/services', label: 'Services', icon: 'Car' }
  ],
  Manager: [
    { path: '/dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { path: '/appointments', label: 'Appointments', icon: 'Calendar' },
    { path: '/planning', label: 'Planning', icon: 'Map' },
    { path: '/jobs', label: 'Jobs', icon: 'Clipboard' },
    { path: '/stock', label: 'Stock', icon: 'Package' },
    { path: '/services', label: 'Services', icon: 'Car' }
  ],
  Owner: [
    { path: '/dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { path: '/appointments', label: 'Appointments', icon: 'Calendar' },
    { path: '/services-mgmt', label: 'Service Management', icon: 'Settings' },
    { path: '/planning', label: 'Planning', icon: 'Map' },
    { path: '/stock', label: 'Stock Management', icon: 'Package' },
    { path: '/connection', label: 'System Settings', icon: 'Wifi' }
  ]
}

export class RBAC {
  /**
   * Check if a role has a specific permission
   */
  static hasPermission(role: UserRole, permission: Permission): boolean {
    return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
  }

  /**
   * Check if a role can access a specific route
   */
  static canAccess(role: UserRole, path: string): boolean {
    const routes = ROLE_ROUTES[role] || []
    return routes.some(route => route.path === path)
  }

  /**
   * Get all permissions for a role
   */
  static getPermissions(role: UserRole): Permission[] {
    return ROLE_PERMISSIONS[role] || []
  }

  /**
   * Get all accessible routes for a role
   */
  static getRoutes(role: UserRole): RouteConfig[] {
    return ROLE_ROUTES[role] || []
  }

  /**
   * Filter routes based on permissions
   */
  static filterRoutesByPermissions(routes: RouteConfig[], role: UserRole): RouteConfig[] {
    return routes.filter(route => {
      if (route.permission) {
        return this.hasPermission(role, route.permission)
      }
      if (route.roles) {
        return route.roles.includes(role)
      }
      return true
    })
  }

  /**
   * Check if role can perform action on resource
   */
  static canPerformAction(
    role: UserRole, 
    action: 'view' | 'create' | 'update' | 'delete' | 'manage', 
    resource: string
  ): boolean {
    const permission = `${action}:${resource}` as Permission
    return this.hasPermission(role, permission)
  }

  /**
   * Get role hierarchy level (higher number = more permissions)
   */
  static getRoleLevel(role: UserRole): number {
    const levels: Record<UserRole, number> = {
      Visitor: 0,
      Client: 1,
      Operator: 2,
      Manager: 3,
      Owner: 4
    }
    return levels[role] || 0
  }

  /**
   * Check if roleA has higher privileges than roleB
   */
  static hasHigherPrivileges(roleA: UserRole, roleB: UserRole): boolean {
    return this.getRoleLevel(roleA) > this.getRoleLevel(roleB)
  }

  /**
   * Validate role transition (can only promote/demote by authorized roles)
   */
  static canChangeRole(currentUserRole: UserRole, targetUserRole: UserRole, newRole: UserRole): boolean {
    // Only Owner can change roles
    if (currentUserRole !== 'Owner') {
      return false
    }

    // Can't demote yourself
    if (targetUserRole === currentUserRole) {
      return false
    }

    // Can only change roles to lower or equal level
    return this.getRoleLevel(newRole) <= this.getRoleLevel(currentUserRole)
  }
}

// Client-side utilities for UI
export const rbac = {
  hasPermission: RBAC.hasPermission,
  canAccess: RBAC.canAccess,
  getRoutes: RBAC.getRoutes,
  canPerformAction: RBAC.canPerformAction,
}

// Higher-order component utilities
import React from 'react'

export function withRoleGuard<T extends object>(
  Component: React.ComponentType<T>,
  requiredRole: UserRole | UserRole[],
  fallback?: React.ComponentType
) {
  return function GuardedComponent(props: T) {
    // This would be implemented with your auth context
    // const { user } = useAuth()
    // const hasAccess = Array.isArray(requiredRole) 
    //   ? requiredRole.includes(user.role)
    //   : user.role === requiredRole
    
    // if (!hasAccess) {
    //   return fallback ? React.createElement(fallback) : null
    // }
    
    return React.createElement(Component, props)
  }
}

export function withPermissionGuard<T extends object>(
  Component: React.ComponentType<T>,
  requiredPermission: Permission,
  fallback?: React.ComponentType
) {
  return function GuardedComponent(props: T) {
    // This would be implemented with your auth context
    // const { user } = useAuth()
    // const hasPermission = RBAC.hasPermission(user.role, requiredPermission)
    
    // if (!hasPermission) {
    //   return fallback ? React.createElement(fallback) : null
    // }
    
    return React.createElement(Component, props)
  }
}