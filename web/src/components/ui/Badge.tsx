interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export default function Badge({ children, variant = 'default', size = 'sm', dot = false, className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-surface-muted text-foreground-secondary dark:bg-[var(--color-surface-muted)] dark:text-[var(--color-text-secondary)]',
    success: 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-500',
    warning: 'bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-500',
    danger: 'bg-danger-50 text-danger-700 dark:bg-danger-500/10 dark:text-danger-500',
    info: 'bg-info-50 text-info-700 dark:bg-info-500/10 dark:text-info-500',
    primary: 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-500',
    secondary: 'bg-secondary-50 text-secondary-700 dark:bg-secondary-500/10 dark:text-secondary-500',
  };

  const dotColors = {
    default: 'bg-foreground-muted',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    info: 'bg-info',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-caption',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}
