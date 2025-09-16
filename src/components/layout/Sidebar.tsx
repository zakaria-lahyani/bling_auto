'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BarChart3, Calendar, Car, Clipboard, Map, Package, 
  Settings, Star, User, Wifi, Home, Plus
} from 'lucide-react'
import { RBAC, type UserRole } from '../../lib/rbac'

interface SidebarProps {
  currentRole: UserRole
  setCurrentRole: (role: UserRole) => void
}

export function Sidebar({ currentRole, setCurrentRole }: SidebarProps) {
  const pathname = usePathname()
  const routes = RBAC.getRoutes(currentRole)

  const iconMap = {
    'Home': Home,
    'Car': Car,
    'Calendar': Calendar,
    'Plus': Plus,
    'Star': Star,
    'User': User,
    'Clipboard': Clipboard,
    'BarChart3': BarChart3,
    'Map': Map,
    'Package': Package,
    'Settings': Settings,
    'Wifi': Wifi,
  }

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">Premium Car Wash</h1>
      </div>

      {/* Role Selector */}
      <div className="p-4 border-b border-slate-700">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Current Role
        </label>
        <select
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value as UserRole)}
          className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
        >
          <option value="Visitor">Visitor</option>
          <option value="Client">Client</option>
          <option value="Operator">Operator</option>
          <option value="Manager">Manager</option>
          <option value="Owner">Owner</option>
        </select>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {routes.map((route) => {
            const Icon = iconMap[route.icon as keyof typeof iconMap] || Home
            const isActive = pathname === route.path
            
            return (
              <Link
                key={route.path}
                href={route.path}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-teal-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }
                `}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{route.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Demo User</div>
            <div className="text-xs text-slate-400">{currentRole}</div>
          </div>
        </div>
      </div>
    </div>
  )
}