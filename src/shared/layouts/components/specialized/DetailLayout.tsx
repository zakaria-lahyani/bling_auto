'use client';

import React from 'react';
import { ArrowLeft, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/utils';

interface DetailLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  customActions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

/**
 * Detail Layout - Used for detail/view pages like user profiles, service details
 * Provides back navigation and common actions
 */
export const DetailLayout: React.FC<DetailLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = true,
  backUrl,
  onEdit,
  onDelete,
  showActions = true,
  customActions,
  breadcrumbs,
  className
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <div className={cn('min-h-screen bg-slate-50 dark:bg-slate-900', className)}>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {crumb.href ? (
                  <button
                    onClick={() => router.push(crumb.href!)}
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-slate-900 dark:text-slate-100">
                    {crumb.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-slate-400">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {/* Back Button */}
            {showBackButton && (
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
            )}

            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          {(showActions && (onEdit || onDelete)) || customActions ? (
            <div className="flex items-center gap-2">
              {customActions}
              
              {showActions && (onEdit || onDelete) && (
                <div className="flex items-center gap-2">
                  {onEdit && (
                    <button
                      onClick={onEdit}
                      className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                  )}
                  
                  {onDelete && (
                    <button
                      onClick={onDelete}
                      className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm font-medium text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};