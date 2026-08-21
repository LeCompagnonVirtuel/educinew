import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ icon: Icon = Inbox, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="w-14 h-14 rounded-xl bg-surface-muted dark:bg-[var(--color-surface-muted)] flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-foreground-muted dark:text-[var(--color-text-muted)]" />
      </div>
      <h3 className="text-h4 text-foreground dark:text-[var(--color-text-primary)] mb-1">{title}</h3>
      {description && (
        <p className="text-body-sm text-foreground-secondary dark:text-[var(--color-text-secondary)] mb-5 max-w-sm">{description}</p>
      )}
      {action}
    </div>
  );
}
