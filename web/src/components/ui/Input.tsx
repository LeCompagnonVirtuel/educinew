'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-label text-foreground dark:text-[var(--color-text-primary)]">
            {label}
            {props.required && <span className="text-danger ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full h-10 px-3 ${icon ? 'pl-10' : ''} border rounded-md bg-surface-bright dark:bg-[var(--color-surface)] text-foreground dark:text-[var(--color-text-primary)] text-body-sm placeholder:text-foreground-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
              error
                ? 'border-danger focus:ring-danger/20 focus:border-danger'
                : 'border-border dark:border-[var(--color-border)]'
            } ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-caption text-danger" role="alert">{error}</p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-caption text-foreground-muted">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
