'use client';

import { useState, useRef } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), 300);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {visible && (
        <div
          className={`absolute ${positions[position]} z-50 px-2.5 py-1.5 text-[11px] font-medium text-white bg-foreground dark:bg-[var(--color-surface-raised)] dark:text-[var(--color-text-primary)] dark:border dark:border-[var(--color-border)] rounded-md shadow-lg whitespace-nowrap animate-fade-in pointer-events-none`}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
}
