import { ReactNode } from 'react';
import Card from './Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'default' | 'emerald' | 'teal' | 'blue' | 'purple' | 'amber' | 'rose';
}

const MetricCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'default',
}: MetricCardProps) => {
  const colorClasses = {
    default: {
      bg: 'bg-slate-100 dark:bg-slate-700',
      text: 'text-slate-600 dark:text-slate-300',
      value: 'text-slate-900 dark:text-slate-100',
    },
    emerald: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      value: 'text-emerald-900 dark:text-emerald-100',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-900/20',
      text: 'text-teal-600 dark:text-teal-400',
      value: 'text-teal-900 dark:text-teal-100',
    },
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      value: 'text-blue-900 dark:text-blue-100',
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/20',
      text: 'text-purple-600 dark:text-purple-400',
      value: 'text-purple-900 dark:text-purple-100',
    },
    amber: {
      bg: 'bg-amber-100 dark:bg-amber-900/20',
      text: 'text-amber-600 dark:text-amber-400',
      value: 'text-amber-900 dark:text-amber-100',
    },
    rose: {
      bg: 'bg-rose-100 dark:bg-rose-900/20',
      text: 'text-rose-600 dark:text-rose-400',
      value: 'text-rose-900 dark:text-rose-100',
    },
  };

  const colors = colorClasses[color];

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${colors.value}`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
          )}
          {trend && (
            <p
              className={`text-sm mt-1 ${
                trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {trend.value}
            </p>
          )}
        </div>
        {icon && (
          <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
            <div className={colors.text}>{icon}</div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;