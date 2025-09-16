import { Card, Table } from '@/shared/components/ui';
import type { ServiceTypeStats } from '@/lib/mockData';

interface ServiceDetailsTableProps {
  serviceStats: ServiceTypeStats[];
}

const ServiceDetailsTable = ({ serviceStats }: ServiceDetailsTableProps) => {
  const columns = [
    {
      key: 'serviceName',
      header: 'Service',
      render: (item: ServiceTypeStats) => (
        <span className="font-medium text-slate-900">{item.serviceName}</span>
      ),
    },
    {
      key: 'count',
      header: 'Volume',
      align: 'right' as const,
      render: (item: ServiceTypeStats) => item.count.toLocaleString(),
    },
    {
      key: 'revenue',
      header: 'Revenue',
      align: 'right' as const,
      render: (item: ServiceTypeStats) => `$${item.revenue.toLocaleString()}`,
    },
    {
      key: 'avgDuration',
      header: 'Avg Duration',
      align: 'right' as const,
      render: (item: ServiceTypeStats) => `${item.avgDuration}min`,
    },
    {
      key: 'percentage',
      header: 'Market Share',
      align: 'right' as const,
      render: (item: ServiceTypeStats) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-700">
          {item.percentage}%
        </span>
      ),
    },
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Service Performance Details
      </h3>
      <Table data={serviceStats} columns={columns} />
    </Card>
  );
};

export default ServiceDetailsTable;