'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, ArrowRight } from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  action?: () => void;
  category?: string;
}

interface CommandPaletteProps {
  items: CommandItem[];
  placeholder?: string;
}

export default function CommandPalette({ items, placeholder = 'Rechercher une page, action...' }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      )
    : items.slice(0, 8);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setOpen(prev => !prev);
    }
    if (e.key === 'Escape') {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      const item = filtered[selectedIndex];
      if (item.action) item.action();
      if (item.href) window.location.href = item.href;
      setOpen(false);
    }
  };

  const handleSelect = (item: CommandItem) => {
    if (item.action) item.action();
    if (item.href) window.location.href = item.href;
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" role="dialog" aria-modal="true" aria-label="Recherche globale">
      <div
        className="absolute inset-0 bg-foreground/30 dark:bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg mx-4 bg-surface-bright dark:bg-[var(--color-surface)] border border-border dark:border-[var(--color-border)] rounded-xl shadow-xl animate-scale-in overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-border dark:border-[var(--color-border)]">
          <Search className="w-5 h-5 text-foreground-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            className="flex-1 h-12 bg-transparent text-body text-foreground dark:text-[var(--color-text-primary)] placeholder:text-foreground-muted focus:outline-none"
            aria-label="Recherche"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-foreground-muted bg-surface-muted dark:bg-[var(--color-surface-muted)] border border-border dark:border-[var(--color-border)] rounded">
            Esc
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center text-body-sm text-foreground-muted">Aucun resultat</p>
          )}
          {filtered.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                i === selectedIndex
                  ? 'bg-primary-50 dark:bg-primary-500/10'
                  : 'hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)]'
              }`}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              {item.icon && (
                <span className="flex-shrink-0 text-foreground-muted">{item.icon}</span>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-body-sm font-medium text-foreground dark:text-[var(--color-text-primary)] truncate">{item.label}</p>
                {item.description && (
                  <p className="text-caption text-foreground-muted truncate">{item.description}</p>
                )}
              </div>
              {item.category && (
                <span className="flex-shrink-0 text-caption text-foreground-muted">{item.category}</span>
              )}
              {i === selectedIndex && <ArrowRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
            </button>
          ))}
        </div>

        <div className="px-4 py-2.5 border-t border-border dark:border-[var(--color-border)] flex items-center gap-4 text-[11px] text-foreground-muted">
          <span><kbd className="font-mono px-1 py-0.5 bg-surface-muted dark:bg-[var(--color-surface-muted)] rounded">&#8593;&#8595;</kbd> Naviguer</span>
          <span><kbd className="font-mono px-1 py-0.5 bg-surface-muted dark:bg-[var(--color-surface-muted)] rounded">&#9166;</kbd> Ouvrir</span>
          <span><kbd className="font-mono px-1 py-0.5 bg-surface-muted dark:bg-[var(--color-surface-muted)] rounded">Esc</kbd> Fermer</span>
        </div>
      </div>
    </div>
  );
}
