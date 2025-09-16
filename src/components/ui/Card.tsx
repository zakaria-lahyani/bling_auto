import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'elevated';
  onClick?: () => void;
}

const Card = ({ 
  children, 
  className, 
  padding = 'md', 
  variant = 'default',
  onClick
}: CardProps) => {
  const baseClasses = 'rounded-3xl border';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantClasses = {
    default: 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700',
    gradient: 'bg-gradient-to-r from-teal-500 to-blue-600 border-transparent text-white',
    elevated: 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg',
  };

  return (
    <div
      className={clsx(
        baseClasses,
        paddingClasses[padding],
        variantClasses[variant],
        onClick && 'cursor-pointer hover:shadow-lg transition-shadow',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// CardContent component for structured content
interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={clsx('p-6 text-slate-900 dark:text-slate-100', className)}>{children}</div>;
};

export default Card;