'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '../../lib/utils';

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backUrl?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
}

/**
 * Form Layout - Used for forms, settings, and input-heavy pages
 * Provides centered content with optional back navigation
 */
export const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = false,
  backUrl,
  maxWidth = 'lg',
  className
}) => {
  const router = useRouter();

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full'
  };

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <div className={cn('min-h-screen bg-slate-50 dark:bg-slate-900 py-8', className)}>
      <div className={cn('mx-auto px-4', maxWidthClasses[maxWidth])}>
        {/* Back Button */}
        {showBackButton && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form Content */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};