import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'glass' | 'gradient' | 'elevated' | 'premium' | 'interactive' | 'success' | 'warning' | 'danger';
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

const Card = ({ 
  children, 
  className, 
  padding = 'md', 
  variant = 'default',
  hoverable = false,
  clickable = false,
  onClick
}: CardProps) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const paddingClasses = {
    none: '',
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm',
    glass: 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/5',
    gradient: 'bg-gradient-to-br from-brand-500 to-brand-600 border-0 text-white shadow-lg shadow-brand-500/25',
    elevated: 'bg-white border border-gray-100 shadow-xl shadow-gray-900/10',
    premium: 'bg-gradient-to-br from-white via-gray-50/50 to-white border border-gray-200/50 shadow-xl shadow-gray-900/5',
    interactive: 'bg-white border border-gray-200 shadow-md hover:shadow-xl hover:border-brand-300 hover:-translate-y-1',
    success: 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-sm',
    warning: 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-sm',
    danger: 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 shadow-sm',
  };

  const hoverEffects = hoverable ? 'hover:shadow-2xl hover:shadow-gray-900/10 hover:-translate-y-1 hover:scale-[1.01]' : '';
  const clickableEffects = clickable || onClick ? 'cursor-pointer active:scale-[0.98] select-none' : '';

  return (
    <div
      className={clsx(
        baseClasses,
        paddingClasses[padding],
        variantClasses[variant],
        hoverEffects,
        clickableEffects,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Enhanced CardContent component
interface CardContentProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
}

export const CardContent = ({ children, className, padding = 'md' }: CardContentProps) => {
  const paddingClasses = {
    none: '',
    xs: 'p-2',
    sm: 'p-4', 
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div className={clsx(paddingClasses[padding], 'text-gray-900', className)}>
      {children}
    </div>
  );
};

// CardHeader component
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={clsx('px-6 py-4 border-b border-gray-100', className)}>
      {children}
    </div>
  );
};

// CardFooter component
interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div className={clsx('px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl', className)}>
      {children}
    </div>
  );
};

export default Card;