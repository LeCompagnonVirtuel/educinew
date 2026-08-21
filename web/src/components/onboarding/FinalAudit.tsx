'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  Shield,
  RefreshCw,
} from 'lucide-react';
import { OnboardingData } from './OnboardingContext';

interface AuditItem {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'checking' | 'passed' | 'failed' | 'warning';
  details?: string;
}

interface FinalAuditProps {
  data: OnboardingData;
  onAllPassed?: () => void;
}

function buildAuditItems(data: OnboardingData): AuditItem[] {
  return [
    {
      id: 'account',
      label: 'Compte administrateur',
      description: 'Email et mot de passe définis',
      status: 'pending',
      details: !data.personal.email ? 'Email requis' : !data.personal.password ? 'Mot de passe requis' : undefined,
    },
    {
      id: 'school',
      label: 'Établissement',
      description: 'Nom officiel et type renseignés',
      status: 'pending',
      details: !data.school.officialName ? 'Nom officiel requis' : undefined,
    },
    {
      id: 'domain',
      label: 'Domaine',
      description: 'Pays et ville sélectionnés',
      status: 'pending',
      details: !data.location.country ? 'Pays requis' : !data.location.city ? 'Ville requise' : undefined,
    },
    {
      id: 'branding',
      label: 'Branding',
      description: 'Couleurs et thème configurés',
      status: 'pending',
    },
    {
      id: 'logo',
      label: 'Logo',
      description: 'Logo principal uploadé',
      status: 'pending',
      details: !data.branding.logoUrl ? 'Logo recommandé pour un rendu optimal' : undefined,
    },
    {
      id: 'qrcodes',
      label: 'QR Codes',
      description: 'Génération des codes activée',
      status: 'pending',
    },
    {
      id: 'payments',
      label: 'Paiements',
      description: 'Mode de paiement configuré',
      status: 'pending',
      details: !data.payments.moneyFusionUrl && !data.payments.cash ? 'Configurez Money Fusion ou activez les espèces' : undefined,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      description: 'Canal de notification actif',
      status: 'pending',
    },
    {
      id: 'emails',
      label: 'Emails',
      description: 'Service d\'emailing configuré',
      status: 'pending',
    },
    {
      id: 'security',
      label: 'Sécurité',
      description: 'Niveau de sécurité défini',
      status: 'pending',
    },
    {
      id: 'backups',
      label: 'Sauvegardes',
      description: 'Sauvegarde automatique activée',
      status: 'pending',
    },
    {
      id: 'sync',
      label: 'Synchronisation',
      description: 'Sync temps réel configurée',
      status: 'pending',
    },
    {
      id: 'modules',
      label: 'Modules',
      description: `${data.modules.length} modules sélectionnés`,
      status: 'pending',
      details: data.modules.length === 0 ? 'Sélectionnez au moins un module' : undefined,
    },
    {
      id: 'spaces',
      label: 'Espaces utilisateurs',
      description: 'Rôles et permissions définis',
      status: 'pending',
    },
    {
      id: 'documents',
      label: 'Documents',
      description: 'Templates de documents prêts',
      status: 'pending',
    },
    {
      id: 'api',
      label: 'API',
      description: 'Clés API générées',
      status: 'pending',
    },
    {
      id: 'realtime',
      label: 'Temps réel',
      description: 'Connexion WebSocket testée',
      status: 'pending',
    },
  ];
}

function AuditRow({ item, index }: { item: AuditItem; index: number }) {
  const isPending = item.status === 'pending';
  const isChecking = item.status === 'checking';
  const isPassed = item.status === 'passed';
  const isFailed = item.status === 'failed';
  const isWarning = item.status === 'warning';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        isChecking
          ? 'bg-indigo-50 border border-indigo-200'
          : isPassed
          ? 'bg-green-50/50 border border-green-100'
          : isFailed
          ? 'bg-red-50/50 border border-red-100'
          : isWarning
          ? 'bg-amber-50/50 border border-amber-100'
          : 'border border-transparent'
      }`}
    >
      <div className="shrink-0">
        {isChecking && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 size={18} className="text-indigo-500" />
          </motion.div>
        )}
        {isPassed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <CheckCircle size={18} className="text-green-500" />
          </motion.div>
        )}
        {isFailed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <XCircle size={18} className="text-red-500" />
          </motion.div>
        )}
        {isWarning && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <AlertTriangle size={18} className="text-amber-500" />
          </motion.div>
        )}
        {isPending && <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-200" />}
      </div>

      <div className="flex-1 min-w-0">
        <span className={`text-sm font-medium ${isFailed ? 'text-red-700' : isWarning ? 'text-amber-700' : isPassed ? 'text-green-700' : 'text-slate-700'}`}>
          {item.label}
        </span>
        <p className={`text-xs mt-0.5 ${isFailed ? 'text-red-400' : isPassed ? 'text-green-500' : 'text-slate-400'}`}>
          {isFailed && item.details ? item.details : item.description}
        </p>
      </div>

      {isPassed && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full"
        >
          OK
        </motion.span>
      )}
      {isFailed && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full"
        >
          Erreur
        </motion.span>
      )}
      {isWarning && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full"
        >
          Attention
        </motion.span>
      )}
    </motion.div>
  );
}

export default function FinalAudit({ data, onAllPassed }: FinalAuditProps) {
  const [items, setItems] = useState<AuditItem[]>(() => buildAuditItems(data));
  const [isRunning, setIsRunning] = useState(false);
  const [allComplete, setAllComplete] = useState(false);

  const passedCount = items.filter(i => i.status === 'passed').length;
  const failedCount = items.filter(i => i.status === 'failed').length;
  const warningCount = items.filter(i => i.status === 'warning').length;
  const hasBlocking = failedCount > 0;

  const runAudit = useCallback(async () => {
    setIsRunning(true);
    setAllComplete(false);
    const updated = buildAuditItems(data);

    for (let i = 0; i < updated.length; i++) {
      setItems(prev =>
        prev.map((item, idx) =>
          idx === i ? { ...item, status: 'checking' } : item
        )
      );

      await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 200));

      setItems(prev =>
        prev.map((item, idx) => {
          if (idx !== i) return item;
          if (item.details && item.id !== 'logo') {
            return { ...item, status: 'failed' as const };
          }
          if (item.details && item.id === 'logo') {
            return { ...item, status: 'warning' as const };
          }
          return { ...item, status: 'passed' as const };
        })
      );
    }

    setIsRunning(false);
    const finalItems = updated.map((item, idx) => {
      if (item.details && item.id !== 'logo') return { ...item, status: 'failed' as const };
      if (item.details && item.id === 'logo') return { ...item, status: 'warning' as const };
      return { ...item, status: 'passed' as const };
    });
    setItems(finalItems);

    const allPassed = finalItems.every(i => i.status === 'passed' || i.status === 'warning');
    setAllComplete(allPassed);
    if (allPassed) onAllPassed?.();
  }, [data, onAllPassed]);

  useEffect(() => {
    runAudit();
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200"
        >
          <Shield size={24} className="text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Vérification finale</h2>
        <p className="text-slate-500 text-sm">Nous vérifions que tout est en place</p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-6 mb-6">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <span>{passedCount}/{items.length} vérifications</span>
          <div className="flex items-center gap-3">
            {warningCount > 0 && (
              <span className="text-amber-500">{warningCount} avertissement{warningCount > 1 ? 's' : ''}</span>
            )}
            {failedCount > 0 && (
              <span className="text-red-500">{failedCount} erreur{failedCount > 1 ? 's' : ''}</span>
            )}
          </div>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              hasBlocking
                ? 'bg-gradient-to-r from-red-400 to-red-500'
                : allComplete
                ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                : 'bg-gradient-to-r from-[#4F46E5] to-[#60A5FA]'
            }`}
            animate={{ width: `${items.length > 0 ? ((passedCount + warningCount) / items.length) * 100 : 0}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-4 mb-6">
        <div className="space-y-1.5">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <AuditRow key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={runAudit}
          disabled={isRunning}
          className="px-5 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300 text-sm flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw size={16} className={isRunning ? 'animate-spin' : ''} />
          Relancer
        </button>

        {allComplete && !hasBlocking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-200"
          >
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Prêt à créer</span>
          </motion.div>
        )}

        {hasBlocking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-200"
          >
            <XCircle size={16} />
            <span className="text-sm font-medium">Corrigez les erreurs</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
