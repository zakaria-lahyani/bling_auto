'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, Calendar, User, BarChart3, Package, Clipboard, TruckIcon } from 'lucide-react';
import { useUserStore, type UserRole } from '../store';

interface SidebarProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRole, setCurrentRole }) => {
  const pathname = usePathname();

  const roles = ['Visitor', 'Client', 'Operator', 'Manager', 'Owner'] as const;

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-64 bg-slate-50 dark:bg-slate-800 min-h-screen flex flex-col p-4 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center">
          <TruckIcon className="w-6 h-6 text-teal-800" strokeWidth={1.8} />
        </div>
        <span className="text-lg font-semibold text-teal-800 dark:text-teal-400">Premium Wash</span>
      </div>

      {/* Role Selector */}
      <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-3">
        <h3 className="text-sm font-medium text-teal-800 dark:text-teal-300 mb-2">Quick role view</h3>
        <div className="flex flex-wrap gap-1">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setCurrentRole(role)}
              className={`px-2 py-1 rounded-full text-sm font-medium transition-colors ${
                currentRole === role
                  ? 'bg-teal-600 text-white'
                  : 'bg-teal-200 dark:bg-teal-800 text-teal-800 dark:text-teal-200 hover:bg-teal-300 dark:hover:bg-teal-700'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex flex-col gap-6 pt-2">
        {/* Public Section */}
        <div>
          <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 px-3">Public</h3>
          <nav className="space-y-1">
            <Link
              href="/"
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-teal-600 text-white' 
                  : 'text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-slate-700'
              }`}
            >
              <Home size={18} strokeWidth={1.5} />
              Home
            </Link>
            <Link
              href="/services"
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive('/services') 
                  ? 'bg-teal-600 text-white' 
                  : 'text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-slate-700'
              }`}
            >
              <Settings size={18} strokeWidth={1.5} />
              Services
            </Link>
            <Link
              href="/booking"
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive('/booking') 
                  ? 'bg-teal-600 text-white' 
                  : 'text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-slate-700'
              }`}
            >
              <Calendar size={18} strokeWidth={1.5} />
              Booking
            </Link>
          </nav>
        </div>

        {/* Client Area */}
        {['Client', 'Operator', 'Manager', 'Owner'].includes(currentRole) && (
          <div>
            <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 px-3">Client Area</h3>
            <nav className="space-y-1">
              <Link
                href="/appointments"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/appointments') 
                    ? 'bg-teal-600 text-white' 
                    : 'text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-slate-700'
                }`}
              >
                <Calendar size={18} strokeWidth={1.5} />
                My Appointments
              </Link>
              <Link
                href="/loyalty"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/loyalty') 
                    ? 'bg-teal-600 text-white' 
                    : 'text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-slate-700'
                }`}
              >
                <User size={18} strokeWidth={1.5} />
                Loyalty
              </Link>
              <Link
                href="/profile"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/profile') 
                    ? 'bg-teal-600 text-white' 
                    : 'text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-slate-700'
                }`}
              >
                <User size={18} strokeWidth={1.5} />
                Profile
              </Link>
            </nav>
          </div>
        )}

        {/* Operations */}
        {['Operator', 'Manager', 'Owner'].includes(currentRole) && (
          <div>
            <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 px-3">Operations</h3>
            <nav className="space-y-1">
              <Link
                href="/planning"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/planning') 
                    ? 'bg-teal-600 text-white' 
                    : 'text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-slate-700'
                }`}
              >
                <Clipboard size={18} strokeWidth={1.5} />
                Planning
              </Link>
              <Link
                href="/jobs"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/jobs') 
                    ? 'bg-teal-600 text-white' 
                    : 'text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-slate-700'
                }`}
              >
                <Calendar size={18} strokeWidth={1.5} />
                Jobs Today
              </Link>
              <Link
                href="/operator-jobs"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/operator-jobs') 
                    ? 'bg-teal-600 text-white' 
                    : 'text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-slate-700'
                }`}
              >
                <Clipboard size={18} strokeWidth={1.5} />
                Declare Job
              </Link>
            </nav>
          </div>
        )}

        {/* Management */}
        {['Manager', 'Owner'].includes(currentRole) && (
          <div>
            <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 px-3">Management</h3>
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/dashboard') 
                    ? 'bg-teal-600 text-white' 
                    : 'text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-slate-700'
                }`}
              >
                <BarChart3 size={18} strokeWidth={1.5} />
                Dashboard
              </Link>
              <Link
                href="/services-mgmt"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/services-mgmt') 
                    ? 'bg-teal-600 text-white' 
                    : 'text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-slate-700'
                }`}
              >
                <Settings size={18} strokeWidth={1.5} />
                Services Mgmt
              </Link>
              <Link
                href="/stock"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/stock') 
                    ? 'bg-teal-600 text-white' 
                    : 'text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-slate-700'
                }`}
              >
                <Package size={18} strokeWidth={1.5} />
                Stock
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;