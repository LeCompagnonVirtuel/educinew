'use client';

import { X } from 'lucide-react';
import { useEffect, useCallback } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: React.ReactNode;
}

export default function Modal({ open, onClose, title, description, children, size = 'md', footer }: ModalProps) {
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

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title || 'Modal'}>
      <div
        className="absolute inset-0 bg-foreground/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`relative w-full ${sizes[size]} bg-surface-bright dark:bg-[var(--color-surface)] rounded-xl shadow-xl border border-border dark:border-[var(--color-border)] animate-scale-in max-h-[90vh] flex flex-col`}>
        {title && (
          <div className="flex items-start justify-between px-6 py-4 border-b border-border dark:border-[var(--color-border)] flex-shrink-0">
            <div>
              <h3 className="text-h4 text-foreground dark:text-[var(--color-text-primary)]">{title}</h3>
              {description && <p className="text-body-sm text-foreground-secondary dark:text-[var(--color-text-secondary)] mt-1">{description}</p>}
            </div>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="p-2 -mr-2 -mt-1 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="px-6 py-5 overflow-y-auto flex-1">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-border dark:border-[var(--color-border)] flex items-center justify-end gap-3 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
