'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRealtimeNotifications } from '@/hooks/useRealtime';
import { Bell, X, CheckCircle, AlertTriangle, CreditCard } from 'lucide-react';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: string;
  timestamp: number;
}

const TOAST_DURATION = 5000;

const typeIcons: Record<string, React.ReactNode> = {
  PAYMENT: <CreditCard size={18} className="text-emerald-600" />,
  ATTENDANCE: <CheckCircle size={18} className="text-blue-600" />,
  ALERT: <AlertTriangle size={18} className="text-amber-600" />,
};

export function RealtimeToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const handleNewNotification = useCallback((notification: any) => {
    if (!notification) return;
    const toast: Toast = {
      id: notification.id || String(Date.now()),
      title: notification.title || 'Notification',
      message: notification.message || notification.body || '',
      type: notification.type || 'INFO',
      timestamp: Date.now(),
    };
    setToasts((prev) => [toast, ...prev].slice(0, 3));
  }, []);

  const { unreadCount } = useRealtimeNotifications(handleNewNotification);

  useEffect(() => {
    if (toasts.length === 0) return;
    const interval = setInterval(() => {
      setToasts((prev) => {
        const filtered = prev.filter((t) => Date.now() - t.timestamp < TOAST_DURATION);
        if (filtered.length === 0) clearInterval(interval);
        return filtered;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [toasts.length]);

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white rounded-xl shadow-xl border border-slate-100 p-4 flex items-start gap-3 animate-in slide-in-from-right-5 fade-in duration-300"
        >
          <div className="mt-0.5">
            {typeIcons[toast.type] || <Bell size={18} className="text-[#4f46e5]" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#191c1d] truncate">{toast.title}</p>
            <p className="text-xs text-[#464555] mt-0.5 line-clamp-2">{toast.message}</p>
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
