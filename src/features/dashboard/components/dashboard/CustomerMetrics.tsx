import { Users, TrendingUp, Star, Activity } from 'lucide-react';
import { MetricCard } from '../../../../components/ui';
import type { CustomerMetrics } from '../../../../lib/mockData';

interface CustomerMetricsProps {
  customerMetrics: CustomerMetrics;
}

const CustomerMetricsSection = ({ customerMetrics }: CustomerMetricsProps) => {
  const loyaltyPercentage = ((customerMetrics.loyaltyMembers / customerMetrics.totalCustomers) * 100).toFixed(1);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Customers"
        value={customerMetrics.totalCustomers}
        icon={<Users className="w-8 h-8" />}
        color="default"
      />

      <MetricCard
        title="New Customers"
        value={customerMetrics.newCustomers}
        subtitle="This month"
        icon={<TrendingUp className="w-8 h-8" />}
        color="teal"
      />

      <MetricCard
        title="Loyalty Members"
        value={customerMetrics.loyaltyMembers}
        subtitle={`${loyaltyPercentage}% of total`}
        icon={<Star className="w-8 h-8" />}
        color="amber"
      />

      <MetricCard
        title="Churn Rate"
        value={`${customerMetrics.churnRate}%`}
        subtitle="Monthly average"
        icon={<Activity className="w-8 h-8" />}
        color="rose"
      />
    </div>
  );
};

export default CustomerMetricsSection;