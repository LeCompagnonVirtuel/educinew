'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface ThemeToggleProps {
  variant?: 'icon' | 'full';
  className?: string;
}

export default function ThemeToggle({ variant = 'icon', className = '' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  if (variant === 'icon') {
    return (
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-md text-foreground-secondary hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] transition-colors ${className}`}
        aria-label={resolvedTheme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
      >
        {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-1 p-1 rounded-lg bg-surface-muted dark:bg-[var(--color-surface-muted)] ${className}`}>
      {([
        { id: 'light' as const, icon: Sun, label: 'Clair' },
        { id: 'system' as const, icon: Monitor, label: 'Systeme' },
        { id: 'dark' as const, icon: Moon, label: 'Sombre' },
      ]).map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-caption font-medium transition-all ${
            theme === id
              ? 'bg-surface-bright dark:bg-[var(--color-surface)] text-foreground dark:text-[var(--color-text-primary)] shadow-sm'
              : 'text-foreground-muted hover:text-foreground-secondary'
          }`}
          aria-label={label}
        >
          <Icon size={14} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
