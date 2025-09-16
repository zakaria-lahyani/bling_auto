'use client'

import React from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from './ui/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-5 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Premium Wash</h1>
        
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search services, bookings..."
              className="w-80 px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/connection"
              className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/booking"
              className="px-4 py-2.5 bg-teal-600 border border-teal-600 rounded-xl text-sm font-medium text-white hover:bg-teal-700 transition-colors"
            >
              Réserver
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;