import { BarChart3, Receipt, PieChart } from 'lucide-react';
import { Card } from '@/shared/components/ui';

interface DashboardTabsProps {
  activeTab: 'kpis' | 'expenses' | 'financial';
  onTabChange: (tab: 'kpis' | 'expenses' | 'financial') => void;
}

const DashboardTabs = ({ activeTab, onTabChange }: DashboardTabsProps) => {
  const tabs = [
    {
      id: 'kpis' as const,
      label: 'KPIs & Analytics',
      icon: <BarChart3 size={16} />,
    },
    {
      id: 'expenses' as const,
      label: 'Expense Management',
      icon: <Receipt size={16} />,
    },
    {
      id: 'financial' as const,
      label: 'Financial Summary',
      icon: <PieChart size={16} />,
    },
  ];

  return (
    <Card>
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default DashboardTabs;