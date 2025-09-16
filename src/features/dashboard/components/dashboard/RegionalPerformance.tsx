import { MapPin, Star } from 'lucide-react';
import { Card } from '@/shared/components/ui';
import type { LocationStats } from '@/lib/mockData';

interface RegionalPerformanceProps {
  locationStats: LocationStats[];
}

const RegionalPerformance = ({ locationStats }: RegionalPerformanceProps) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Regional Performance
      </h3>
      <div className="space-y-4">
        {locationStats.map((location, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">{location.region}</p>
                <p className="text-sm text-slate-500">
                  {location.washes} washes • ${location.revenue.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span className="text-sm font-medium">{location.avgRating}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RegionalPerformance;