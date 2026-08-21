'use client';

import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, children, className = '', disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 ease-spring disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.97]';

    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-600 shadow-sm hover:shadow-md hover:shadow-primary/10',
      secondary: 'bg-secondary text-white hover:bg-secondary-600 shadow-sm hover:shadow-md hover:shadow-secondary/10',
      danger: 'bg-danger text-white hover:bg-danger-600 shadow-sm',
      ghost: 'text-foreground-secondary hover:bg-surface-muted hover:text-foreground',
      outline: 'border border-border text-foreground hover:bg-surface-muted hover:border-border-strong',
    };

    const sizes = {
      sm: 'h-8 px-3 text-body-sm gap-1.5',
      md: 'h-10 px-4 text-body-sm gap-2',
      lg: 'h-12 px-6 text-body gap-2.5',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && icon}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
