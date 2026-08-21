'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, Menu, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { useBranding } from '@/components/branding/BrandingProvider';
import { getInitials } from '@/lib/utils';
import { ROLE_LABELS } from '@/lib/roles';
import EduCILogo from '@/components/brand/EduCILogo';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface AppTopBarProps {
  breadcrumbs?: { label: string; href?: string }[];
  onMenuClick: () => void;
}

export default memo(function AppTopBar({ breadcrumbs, onMenuClick }: AppTopBarProps) {
  const { user } = useAuth();
  const { school } = useSchool();
  const { branding } = useBranding();

  return (
    <header className="sticky top-0 z-30 h-14 bg-surface-bright/80 dark:bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-border/50 dark:border-[var(--color-border)]/50 flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-md text-foreground-secondary hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] transition-colors"
          aria-label="Menu"
        >
          <Menu size={20} />
        </button>

        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="flex items-center gap-1.5 text-body-sm min-w-0" aria-label="Breadcrumbs">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5 min-w-0">
                {i > 0 && <span className="text-foreground-muted">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-foreground-secondary dark:text-[var(--color-text-secondary)] hover:text-primary truncate transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-foreground dark:text-[var(--color-text-primary)] truncate">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        ) : (
          <div className="hidden sm:flex items-center gap-2 min-w-0">
            {branding?.logo_url ? (
              <Image
                src={branding.logo_url}
                alt={school?.name || 'EduCI'}
                width={24}
                height={24}
                unoptimized
                className="h-6 w-auto object-contain flex-shrink-0"
              />
            ) : school?.name ? (
              <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-[10px]">{school.name.charAt(0)}</span>
              </div>
            ) : (
              <EduCILogo size="xs" />
            )}
            <span className="text-body-sm font-semibold text-foreground dark:text-[var(--color-text-primary)] truncate max-w-[200px]">
              {school?.name || 'EduCI'}
            </span>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1.5">
        <button
          className="hidden md:flex items-center gap-2 h-9 px-3 rounded-md bg-surface-muted/60 dark:bg-[var(--color-surface-muted)]/60 text-foreground-muted text-body-sm hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] transition-colors"
          aria-label="Recherche globale"
        >
          <Search size={15} />
          <span className="hidden lg:inline">Rechercher...</span>
          <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-surface-bright dark:bg-[var(--color-surface)] border border-border dark:border-[var(--color-border)] rounded">
            Ctrl K
          </kbd>
        </button>

        <ThemeToggle />

        <Link
          href="/notifications"
          className="relative p-2 rounded-md text-foreground-secondary dark:text-[var(--color-text-secondary)] hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-surface-bright dark:ring-[var(--color-surface)]" />
        </Link>

        <div className="hidden sm:block h-6 w-px bg-border/60 dark:bg-[var(--color-border)]/60 mx-1" />

        <Link href="/profile" className="hidden sm:flex items-center gap-2.5 hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] rounded-md px-2.5 py-1.5 transition-colors">
          <div className="text-right">
            <p className="text-caption font-semibold text-foreground dark:text-[var(--color-text-primary)] truncate max-w-[120px]">
              {user?.name || 'Utilisateur'}
            </p>
            <p className="text-[10px] text-foreground-secondary dark:text-[var(--color-text-secondary)]">
              {ROLE_LABELS[user?.role || ''] || user?.role || ''}
            </p>
          </div>
          {user?.photoUrl ? (
            <Image
              src={user.photoUrl}
              alt={user.name || 'User'}
              width={32}
              height={32}
              unoptimized
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
              {getInitials(user?.name || 'U')}
            </div>
          )}
        </Link>
      </div>
    </header>
  );
});
