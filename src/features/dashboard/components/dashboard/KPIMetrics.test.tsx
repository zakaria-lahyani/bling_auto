import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils/test-utils';
import KPIMetrics from './KPIMetrics';
import type { WashAnalytics } from '../../lib/mockData';

const mockWashAnalytics: WashAnalytics = {
  totalWashes: 2847,
  mobileWashes: 1523,
  onsiteWashes: 1324,
  homeWashes: 892,
  revenue: 185420,
  avgServiceTime: 45,
  customerSatisfaction: 4.8,
};

describe('KPIMetrics', () => {
  it('renders all metric cards', () => {
    render(<KPIMetrics washAnalytics={mockWashAnalytics} />);
    
    expect(screen.getByText('Total Washes')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Mobile Washes')).toBeInTheDocument();
    expect(screen.getByText('Avg. Service Time')).toBeInTheDocument();
  });

  it('displays correct values', () => {
    render(<KPIMetrics washAnalytics={mockWashAnalytics} />);
    
    expect(screen.getByText('2,847')).toBeInTheDocument();
    expect(screen.getByText('$185,420')).toBeInTheDocument();
    expect(screen.getByText('1,523')).toBeInTheDocument();
    expect(screen.getByText('45min')).toBeInTheDocument();
  });

  it('calculates mobile percentage correctly', () => {
    render(<KPIMetrics washAnalytics={mockWashAnalytics} />);
    
    const expectedPercentage = ((1523 / 2847) * 100).toFixed(1);
    expect(screen.getByText(`${expectedPercentage}% of total`)).toBeInTheDocument();
  });

  it('displays customer satisfaction rating', () => {
    render(<KPIMetrics washAnalytics={mockWashAnalytics} />);
    
    expect(screen.getByText('Rating: 4.8/5.0')).toBeInTheDocument();
  });
});