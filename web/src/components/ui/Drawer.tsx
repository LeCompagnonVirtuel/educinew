'use client';

import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  footer?: React.ReactNode;
}

export default function Drawer({ open, onClose, title, children, side = 'right', size = 'md', footer }: DrawerProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' };
  const position = side === 'left'
    ? 'left-0 animate-[slideFromLeft_0.3s_ease-spring]'
    : 'right-0 animate-[slideFromRight_0.3s_ease-spring]';

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title || 'Drawer'}>
      <div
        className="absolute inset-0 bg-foreground/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`absolute top-0 bottom-0 ${position} w-full ${sizes[size]} bg-surface-bright dark:bg-[var(--color-surface)] border-l border-border dark:border-[var(--color-border)] shadow-xl flex flex-col`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-[var(--color-border)] flex-shrink-0">
            <h3 className="text-h4 text-foreground dark:text-[var(--color-text-primary)]">{title}</h3>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="p-2 -mr-2 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 border-t border-border dark:border-[var(--color-border)] flex items-center justify-end gap-3 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
