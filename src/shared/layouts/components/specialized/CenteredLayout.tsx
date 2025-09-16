'use client';

import React from 'react';
import { cn } from '@/shared/utils';

interface CenteredLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showLogo?: boolean;
  className?: string;
}

/**
 * Centered Layout - Used for auth pages, connection page, simple forms
 * Centers content vertically and horizontally
 */
export const CenteredLayout: React.FC<CenteredLayoutProps> = ({
  children,
  title,
  subtitle,
  maxWidth = 'md',
  showLogo = true,
  className
}) => {
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <div className={cn('min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4', className)}>
      <div className={cn('w-full space-y-6', maxWidthClasses[maxWidth])}>
        {/* Logo */}
        {showLogo && (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              Premium Wash
            </h1>
          </div>
        )}

        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center space-y-2">
            {title && (
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
};