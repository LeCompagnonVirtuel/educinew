'use client';

import { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, Bell, User, MoreHorizontal } from 'lucide-react';

interface BottomNavProps {
  homeHref: string;
  onMoreClick: () => void;
}

const tabs = [
  { id: 'home', icon: Home, label: 'Accueil', hrefKey: 'home' as const },
  { id: 'modules', icon: Layers, label: 'Modules', action: 'more' as const },
  { id: 'notifications', icon: Bell, label: 'Notifs', href: '/notifications' },
  { id: 'profile', icon: User, label: 'Profil', href: '/profile' },
];

export default memo(function BottomNav({ homeHref, onMoreClick }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-surface-bright/95 dark:bg-[var(--color-surface)]/95 backdrop-blur-lg border-t border-border/50 dark:border-[var(--color-border)]/50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-14 max-w-md mx-auto">
        {tabs.map(tab => {
          const href = tab.hrefKey === 'home' ? homeHref : tab.href;
          const isMore = tab.action === 'more';
          const isActive = !isMore && href && (pathname === href || pathname?.startsWith(href + '/'));
          const Icon = tab.icon;

          if (isMore) {
            return (
              <button
                key={tab.id}
                onClick={onMoreClick}
                className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-md text-foreground-secondary dark:text-[var(--color-text-secondary)] transition-colors active:scale-95"
                aria-label={tab.label}
              >
                <MoreHorizontal size={22} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={tab.id}
              href={href!}
              className={`relative flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-md transition-colors active:scale-95 ${
                isActive ? 'text-primary' : 'text-foreground-secondary dark:text-[var(--color-text-secondary)]'
              }`}
              aria-label={tab.label}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {tab.id === 'notifications' && (
                <span className="absolute top-0.5 right-1/4 w-2 h-2 bg-danger rounded-full ring-2 ring-surface-bright dark:ring-[var(--color-surface)]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
});
