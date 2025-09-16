import { Car, DollarSign, Clock, Truck } from 'lucide-react';
import { MetricCard } from '../../../../components/ui';
import type { WashAnalytics } from '../../../../lib/mockData';

interface KPIMetricsProps {
  washAnalytics: WashAnalytics;
}

const KPIMetrics = ({ washAnalytics }: KPIMetricsProps) => {
  const mobilePercentage = (washAnalytics.mobileWashes / washAnalytics.totalWashes) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Washes"
        value={washAnalytics.totalWashes}
        trend={{ value: "+12.5% from last month", isPositive: true }}
        icon={<Car className="w-6 h-6" />}
        color="teal"
      />

      <MetricCard
        title="Revenue"
        value={`$${washAnalytics.revenue.toLocaleString()}`}
        trend={{ value: "+8.3% from last month", isPositive: true }}
        icon={<DollarSign className="w-6 h-6" />}
        color="emerald"
      />

      <MetricCard
        title="Mobile Washes"
        value={washAnalytics.mobileWashes}
        subtitle={`${mobilePercentage.toFixed(1)}% of total`}
        icon={<Truck className="w-6 h-6" />}
        color="blue"
      />

      <MetricCard
        title="Avg. Service Time"
        value={`${washAnalytics.avgServiceTime}min`}
        subtitle={`Rating: ${washAnalytics.customerSatisfaction}/5.0`}
        icon={<Clock className="w-6 h-6" />}
        color="purple"
      />
    </div>
  );
};

export default KPIMetrics;