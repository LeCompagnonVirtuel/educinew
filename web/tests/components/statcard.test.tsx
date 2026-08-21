import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCard from '@/components/ui/StatCard';
import { Users } from 'lucide-react';

describe('StatCard', () => {
  it('renders title and value', () => {
    render(<StatCard title="Students" value="150" icon={Users} />);
    expect(screen.getByText('Students')).toBeTruthy();
    expect(screen.getByText('150')).toBeTruthy();
  });
  it('renders trend', () => {
    render(<StatCard title="Growth" value="10%" icon={Users} trend={{ value: 5, isPositive: true }} />);
    expect(screen.getByText('+5%')).toBeTruthy();
  });
  it('renders change prop', () => {
    render(<StatCard title="Revenue" value="$1000" icon={Users} change="+12%" changeType="positive" />);
    expect(screen.getByText('+12%')).toBeTruthy();
  });
});
