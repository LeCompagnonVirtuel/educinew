import { forwardRef } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', interactive = false, padding = 'md' }, ref) => {
    const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };
    return (
      <div
        ref={ref}
        className={`bg-surface-bright dark:bg-[var(--color-surface)] rounded-lg border border-border dark:border-[var(--color-border)] shadow-card transition-all duration-200 ${
          interactive ? 'hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer' : ''
        } ${paddings[padding]} ${className}`}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
export default Card;

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-b border-border dark:border-[var(--color-border)] ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-t border-border dark:border-[var(--color-border)] bg-surface-muted/50 dark:bg-[var(--color-surface-muted)]/50 rounded-b-lg ${className}`}>
      {children}
    </div>
  );
}
