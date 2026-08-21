import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export default function Alert({ variant = 'info', title, children, onDismiss, className = '' }: AlertProps) {
  const config = {
    info: {
      icon: Info,
      bg: 'bg-info-50 dark:bg-info-500/10',
      border: 'border-info-500/20',
      iconColor: 'text-info',
      titleColor: 'text-info-700 dark:text-info-500',
    },
    success: {
      icon: CheckCircle2,
      bg: 'bg-success-50 dark:bg-success-500/10',
      border: 'border-success-500/20',
      iconColor: 'text-success',
      titleColor: 'text-success-700 dark:text-success-500',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-warning-50 dark:bg-warning-500/10',
      border: 'border-warning-500/20',
      iconColor: 'text-warning',
      titleColor: 'text-warning-700 dark:text-warning-500',
    },
    danger: {
      icon: AlertCircle,
      bg: 'bg-danger-50 dark:bg-danger-500/10',
      border: 'border-danger-500/20',
      iconColor: 'text-danger',
      titleColor: 'text-danger-700 dark:text-danger-500',
    },
  };

  const { icon: Icon, bg, border, iconColor, titleColor } = config[variant];

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${bg} ${border} ${className}`} role="alert">
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
      <div className="flex-1 min-w-0">
        {title && <p className={`text-body-sm font-semibold ${titleColor} mb-0.5`}>{title}</p>}
        <div className="text-body-sm text-foreground-secondary dark:text-[var(--color-text-secondary)]">{children}</div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-4 h-4 text-foreground-muted" />
        </button>
      )}
    </div>
  );
}
