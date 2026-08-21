import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  change?: string;
  changeType?: string;
  iconBg?: string;
  iconColor?: string;
  className?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, change, changeType, iconBg, iconColor, className = '' }: StatCardProps) {
  return (
    <div className={`bg-surface-bright dark:bg-[var(--color-surface)] rounded-lg border border-border dark:border-[var(--color-border)] p-5 shadow-card transition-all duration-200 hover:shadow-md group ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1 min-w-0">
          <p className="text-body-sm text-foreground-secondary dark:text-[var(--color-text-secondary)] font-medium truncate">{title}</p>
          <p className="text-h3 font-display text-foreground dark:text-[var(--color-text-primary)] tabular-nums">{value}</p>
          {trend && (
            <div className={`inline-flex items-center gap-1 text-caption font-medium ${
              trend.isPositive ? 'text-success' : 'text-danger'
            }`}>
              {trend.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
            </div>
          )}
          {change && (
            <p className={`text-caption font-medium ${
              changeType === 'positive' ? 'text-success' : changeType === 'negative' ? 'text-danger' : 'text-foreground-muted'
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className={`flex-shrink-0 p-2.5 rounded-lg transition-transform duration-200 group-hover:scale-105 ${iconBg || 'bg-primary-50 dark:bg-primary-500/10'}`}>
          <Icon className={`w-5 h-5 ${iconColor || 'text-primary dark:text-primary-400'}`} />
        </div>
      </div>
    </div>
  );
}
