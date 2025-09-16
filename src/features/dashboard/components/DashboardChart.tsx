import React from 'react';

interface ChartProps {
  title: string;
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  type?: 'bar' | 'line' | 'donut';
  height?: number;
}

const DashboardChart: React.FC<ChartProps> = ({ 
  title, 
  data, 
  type = 'bar', 
  height = 200 
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  const renderBarChart = () => (
    <div className="flex items-end justify-between h-40 gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div className="w-full bg-slate-100 rounded-t-lg overflow-hidden relative">
            <div
              className={`${item.color || 'bg-teal-600'} transition-all duration-1000 ease-out rounded-t-lg`}
              style={{
                height: `${(item.value / maxValue) * 120}px`,
                minHeight: '4px'
              }}
            />
          </div>
          <span className="text-xs text-slate-600 mt-2 text-center">
            {item.label}
          </span>
          <span className="text-sm font-semibold text-slate-900">
            {item.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );

  const renderLineChart = () => {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item.value / maxValue) * 80;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="relative h-40">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="#0EA5A0"
            strokeWidth="2"
            points={points}
            vectorEffect="non-scaling-stroke"
          />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (item.value / maxValue) * 80;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill="#0EA5A0"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        <div className="flex justify-between mt-2">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-slate-600">{item.label}</div>
              <div className="text-sm font-semibold">{item.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDonutChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;
    
    const colors = [
      'bg-teal-600',
      'bg-blue-500',
      'bg-purple-500',
      'bg-amber-500',
      'bg-rose-500',
      'bg-emerald-500'
    ];

    return (
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="3"
            />
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -cumulativePercentage;
              cumulativePercentage += percentage;
              
              return (
                <circle
                  key={index}
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke={`#${['0EA5A0', '3B82F6', '8B5CF6', 'F59E0B', 'F43F5E', '10B981'][index % 6]}`}
                  strokeWidth="3"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-slate-900">{total.toLocaleString()}</div>
              <div className="text-xs text-slate-500">Total</div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
              <span className="text-sm text-slate-600 flex-1">{item.label}</span>
              <span className="text-sm font-semibold text-slate-900">
                {item.value.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">
                ({((item.value / total) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      {type === 'bar' && renderBarChart()}
      {type === 'line' && renderLineChart()}
      {type === 'donut' && renderDonutChart()}
    </div>
  );
};

export default DashboardChart;