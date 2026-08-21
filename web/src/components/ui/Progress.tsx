interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

export default function Progress({ value, max = 100, variant = 'primary', size = 'md', showLabel = false, className = '' }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-caption text-foreground-secondary dark:text-[var(--color-text-secondary)]">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-surface-muted dark:bg-[var(--color-surface-muted)] rounded-full overflow-hidden ${sizes[size]}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-spring ${colors[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
