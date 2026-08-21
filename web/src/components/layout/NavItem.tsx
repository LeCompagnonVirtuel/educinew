'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode | LucideIcon;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

export const NavItemComponent = ({ href, label, icon, active, badge, onClick }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = active || pathname === href || pathname.startsWith(href + '/');

  const renderIcon = (icon: React.ReactNode | LucideIcon) => {
    if (typeof icon === 'function') {
      // @ts-expect-error - LucideIcon is a component function
      return <icon size={16} />;
    }
    return icon;
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md text-body-sm transition-all duration-150',
        isActive
          ? 'bg-primary-50 dark:bg-primary-500/10 text-primary dark:text-primary-400 font-medium'
          : 'text-foreground-secondary dark:text-[var(--color-text-secondary)] hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] hover:text-foreground dark:hover:text-[var(--color-text-primary)]'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={cn('flex-shrink-0 w-5 h-5', isActive && 'text-primary dark:text-primary-400')}>
        {renderIcon(icon)}
      </span>
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className={cn(
          'flex-shrink-0 px-2 py-0.5 text-[11px] font-medium rounded-md',
          isActive
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-400'
            : 'bg-surface-muted text-foreground-muted dark:bg-[var(--color-surface-muted)] dark:text-[var(--color-text-muted)]'
        )}>
          {badge}
        </span>
      )}
    </Link>
  );
};
