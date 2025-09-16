'use client';

import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { cn } from '@/shared/utils';

interface ListLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  onAdd?: () => void;
  addButtonText?: string;
  showSearch?: boolean;
  showFilter?: boolean;
  showAddButton?: boolean;
  headerActions?: React.ReactNode;
  className?: string;
}

/**
 * List Layout - Used for list/table views like appointments, services, users
 * Provides search, filter, and add functionality
 */
export const ListLayout: React.FC<ListLayoutProps> = ({
  children,
  title,
  subtitle,
  searchPlaceholder = 'Search...',
  onSearch,
  onFilter,
  onAdd,
  addButtonText = 'Add New',
  showSearch = true,
  showFilter = true,
  showAddButton = true,
  headerActions,
  className
}) => {
  return (
    <div className={cn('min-h-screen bg-slate-50 dark:bg-slate-900', className)}>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
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
          {headerActions && (
            <div className="flex items-center gap-3">
              {headerActions}
            </div>
          )}
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            {/* Search */}
            {showSearch && (
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Filter Button */}
            {showFilter && onFilter && (
              <button
                onClick={onFilter}
                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Filter size={16} />
                Filter
              </button>
            )}
          </div>

          {/* Add Button */}
          {showAddButton && onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              <Plus size={16} />
              {addButtonText}
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};