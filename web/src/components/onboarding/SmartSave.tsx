'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud,
  CloudOff,
  Check,
  AlertCircle,
  Loader2,
  RefreshCw,
  Clock,
} from 'lucide-react';

type SaveStatus = 'saving' | 'saved' | 'offline' | 'error' | 'synced';

interface SmartSaveProps {
  status: SaveStatus;
  lastSaved: Date | null;
  onManualSave?: () => void;
  retryCount?: number;
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return 'à l\'instant';
  if (seconds < 60) return `il y a ${seconds} secondes`;
  const minutes = Math.floor(seconds / 60);
  if (minutes === 1) return 'il y a 1 minute';
  if (minutes < 60) return `il y a ${minutes} minutes`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return 'il y a 1 heure';
  return `il y a ${hours} heures`;
}

const STATUS_CONFIG: Record<SaveStatus, { icon: React.ElementType; color: string; bgColor: string; borderColor: string; label: string }> = {
  saving: {
    icon: Loader2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    label: 'Sauvegarde...',
  },
  saved: {
    icon: Cloud,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    label: 'Sauvegardé',
  },
  synced: {
    icon: Check,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    label: 'Synchronisé',
  },
  offline: {
    icon: CloudOff,
    color: 'text-slate-500',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    label: 'Hors ligne',
  },
  error: {
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    label: 'Erreur',
  },
};

export default function SmartSave({
  status,
  lastSaved,
  onManualSave,
  retryCount = 0,
}: SmartSaveProps) {
  const [timeAgo, setTimeAgo] = useState(lastSaved ? getTimeAgo(lastSaved) : '');
  const [isRetrying, setIsRetrying] = useState(false);

  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  const isSpinning = status === 'saving';

  useEffect(() => {
    if (!lastSaved) return;
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(lastSaved));
    }, 5000);
    return () => clearInterval(interval);
  }, [lastSaved]);

  useEffect(() => {
    if (lastSaved) setTimeAgo(getTimeAgo(lastSaved));
  }, [lastSaved]);

  const handleRetry = useCallback(async () => {
    if (!onManualSave || isRetrying) return;
    setIsRetrying(true);
    onManualSave();
    setTimeout(() => setIsRetrying(false), 2000);
  }, [onManualSave, isRetrying]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed top-4 right-4 z-40"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border shadow-sm backdrop-blur-sm ${config.bgColor} ${config.borderColor}`}
        >
          <div className={`shrink-0 ${config.color}`}>
            <Icon
              size={16}
              className={isSpinning ? 'animate-spin' : ''}
              strokeWidth={2.5}
            />
          </div>

          <div className="flex flex-col">
            <span className={`text-xs font-semibold ${config.color}`}>
              {config.label}
            </span>
            {lastSaved && status !== 'saving' && (
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock size={9} />
                {timeAgo}
              </span>
            )}
          </div>

          {status === 'error' && onManualSave && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleRetry}
              disabled={isRetrying}
              className="shrink-0 w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors disabled:opacity-50"
              title="Réessayer"
            >
              <RefreshCw
                size={13}
                className={`text-red-600 ${isRetrying ? 'animate-spin' : ''}`}
              />
            </motion.button>
          )}

          {status === 'offline' && onManualSave && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleRetry}
              disabled={isRetrying}
              className="shrink-0 w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors disabled:opacity-50"
              title="Tentative de reconnexion"
            >
              <RefreshCw
                size={13}
                className={`text-slate-600 ${isRetrying ? 'animate-spin' : ''}`}
              />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
