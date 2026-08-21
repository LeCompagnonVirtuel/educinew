'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect: (id: string) => void;
  align?: 'left' | 'right';
  className?: string;
}

export default function Dropdown({ trigger, items, onSelect, align = 'left', className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative inline-flex ${className}`}>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div
          className={`absolute top-full mt-1.5 z-50 min-w-[180px] py-1.5 bg-surface-bright dark:bg-[var(--color-surface-raised)] border border-border dark:border-[var(--color-border)] rounded-lg shadow-lg animate-scale-in origin-top ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
          role="menu"
        >
          {items.map(item => {
            if (item.divider) {
              return <div key={item.id} className="my-1.5 h-px bg-border dark:bg-[var(--color-border)]" />;
            }
            return (
              <button
                key={item.id}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => { onSelect(item.id); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-body-sm transition-colors disabled:opacity-40 disabled:pointer-events-none ${
                  item.danger
                    ? 'text-danger hover:bg-danger-50 dark:hover:bg-danger-500/10'
                    : 'text-foreground dark:text-[var(--color-text-primary)] hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)]'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface SimpleDropdownProps {
  label: string;
  value?: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SelectDropdown({ label, value, options, onChange, placeholder = 'Selectionner...', className = '' }: SimpleDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-label text-foreground dark:text-[var(--color-text-primary)]">{label}</label>}
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full h-10 px-3 flex items-center justify-between border border-border dark:border-[var(--color-border)] rounded-md bg-surface-bright dark:bg-[var(--color-surface)] text-body-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <span className={selected ? 'text-foreground dark:text-[var(--color-text-primary)]' : 'text-foreground-muted'}>
            {selected?.label || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-foreground-muted transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto py-1 bg-surface-bright dark:bg-[var(--color-surface-raised)] border border-border dark:border-[var(--color-border)] rounded-lg shadow-lg animate-scale-in origin-top">
            {options.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-3 py-2 text-body-sm transition-colors ${
                  opt.value === value
                    ? 'bg-primary-50 dark:bg-primary-500/10 text-primary font-medium'
                    : 'text-foreground dark:text-[var(--color-text-primary)] hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
