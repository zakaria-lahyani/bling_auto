import { clsx } from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'slate';
  className?: string;
}

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  className 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const colorClasses = {
    primary: 'border-teal-600 dark:border-teal-400',
    white: 'border-white',
    slate: 'border-slate-600 dark:border-slate-400',
  };

  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-b-2',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    />
  );
};

export default LoadingSpinner;