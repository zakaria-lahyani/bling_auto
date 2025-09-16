'use client';

import React from 'react';
import { cn } from '@/shared/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  className?: string;
}

/**
 * Dashboard Layout - Used for dashboard/analytics pages
 * Provides consistent spacing and header structure
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  headerActions,
  className
}) => {
  return (
    <div className={cn('min-h-screen bg-slate-50 dark:bg-slate-900', className)}>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Page Header */}
        {(title || subtitle || headerActions) && (
          <div className="flex items-start justify-between">
            <div>
              {title && (
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {subtitle}
                </p>
              )}
            </div>
            {headerActions && (
              <div className="flex items-center gap-3">
                {headerActions}
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};