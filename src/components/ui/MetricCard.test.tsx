import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils/test-utils';
import MetricCard from './MetricCard';
import { Car } from 'lucide-react';

describe('MetricCard', () => {
  it('renders basic metric card', () => {
    render(
      <MetricCard
        title="Total Sales"
        value={1500}
        subtitle="This month"
      />
    );
    
    expect(screen.getByText('Total Sales')).toBeInTheDocument();
    expect(screen.getByText('1,500')).toBeInTheDocument();
    expect(screen.getByText('This month')).toBeInTheDocument();
  });

  it('renders string values', () => {
    render(
      <MetricCard
        title="Average"
        value="$45.50"
      />
    );
    
    expect(screen.getByText('$45.50')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <MetricCard
        title="Cars Washed"
        value={100}
        icon={<Car data-testid="car-icon" />}
      />
    );
    
    expect(screen.getByTestId('car-icon')).toBeInTheDocument();
  });

  it('renders trend information', () => {
    render(
      <MetricCard
        title="Revenue"
        value={5000}
        trend={{ value: '+12.5%', isPositive: true }}
      />
    );
    
    const trendElement = screen.getByText('+12.5%');
    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveClass('text-emerald-600');
  });

  it('renders negative trend', () => {
    render(
      <MetricCard
        title="Revenue"
        value={5000}
        trend={{ value: '-5.2%', isPositive: false }}
      />
    );
    
    const trendElement = screen.getByText('-5.2%');
    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveClass('text-red-600');
  });

  it('applies color themes correctly', () => {
    const { rerender } = render(
      <MetricCard
        title="Test"
        value={100}
        color="emerald"
        icon={<Car data-testid="icon" />}
      />
    );
    
    let iconContainer = screen.getByTestId('icon').parentElement;
    expect(iconContainer).toHaveClass('bg-emerald-100');
    
    rerender(
      <MetricCard
        title="Test"
        value={100}
        color="blue"
        icon={<Car data-testid="icon" />}
      />
    );
    
    iconContainer = screen.getByTestId('icon').parentElement;
    expect(iconContainer).toHaveClass('bg-blue-100');
  });
});