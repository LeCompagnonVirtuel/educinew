'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  variant?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, variant = 'info', duration = 4000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 200);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-success" />,
    error: <AlertCircle className="w-5 h-5 text-danger" />,
    info: <Info className="w-5 h-5 text-info" />,
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-bright dark:bg-[var(--color-surface)] border border-border dark:border-[var(--color-border)] shadow-float max-w-sm transition-all duration-200 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
      role="alert"
    >
      {icons[variant]}
      <p className="text-body-sm text-foreground dark:text-[var(--color-text-primary)] flex-1">{message}</p>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 200); }}
        className="p-1 rounded-md hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] transition-colors"
        aria-label="Fermer"
      >
        <X className="w-4 h-4 text-foreground-muted" />
      </button>
    </div>
  );
}
