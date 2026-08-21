'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Cloud,
  Database,
  Shield,
  QrCode,
  FileText,
  Palette,
  Smartphone,
  Bell,
  Sparkles,
  Check,
  Loader2,
} from 'lucide-react';

interface CreationStep {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  duration: number;
  status: 'pending' | 'active' | 'completed';
}

const CREATION_STEPS: Omit<CreationStep, 'status'>[] = [
  { id: 'establishment', icon: Building2, label: 'Création de votre établissement...', description: 'Initialisation des données', duration: 2500 },
  { id: 'cloud', icon: Cloud, label: 'Configuration du cloud...', description: 'Espace de stockage dédié', duration: 2200 },
  { id: 'database', icon: Database, label: 'Création des bases de données...', description: 'Tables et relations', duration: 3000 },
  { id: 'permissions', icon: Shield, label: 'Configuration des permissions...', description: 'Rôles et accès', duration: 2000 },
  { id: 'qrcodes', icon: QrCode, label: 'Création des QR Codes...', description: 'Codes uniques par classe', duration: 2800 },
  { id: 'documents', icon: FileText, label: 'Configuration des documents...', description: 'Templates et formats', duration: 2400 },
  { id: 'branding', icon: Palette, label: 'Activation du branding...', description: 'Votre identité visuelle', duration: 2100 },
  { id: 'mobile', icon: Smartphone, label: 'Préparation de l\'application mobile...', description: 'Build en cours', duration: 3000 },
  { id: 'notifications', icon: Bell, label: 'Activation des notifications...', description: 'Push, email et SMS', duration: 1800 },
  { id: 'ai', icon: Sparkles, label: 'Configuration d\'EduCI AI...', description: 'Intelligence artificielle', duration: 2500 },
  { id: 'finalization', icon: Check, label: 'Finalisation...', description: 'Dernières vérifications', duration: 2000 },
];

function BouncingDots() {
  return (
    <span className="inline-flex gap-0.5 ml-1">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-1 h-1 bg-indigo-500 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

function StepRow({ step, index }: { step: CreationStep; index: number }) {
  const isActive = step.status === 'active';
  const isCompleted = step.status === 'completed';
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
        isActive
          ? 'bg-indigo-50 border border-indigo-200 shadow-md shadow-indigo-100'
          : isCompleted
          ? 'bg-green-50/50 border border-green-100'
          : 'bg-slate-50/50 border border-transparent'
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
          isCompleted
            ? 'bg-green-500 text-white shadow-lg shadow-green-200'
            : isActive
            ? 'bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-200'
            : 'bg-slate-100 text-slate-400'
        }`}
      >
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <Check size={18} strokeWidth={3} />
          </motion.div>
        ) : isActive ? (
          <Icon size={18} />
        ) : (
          <Icon size={16} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium truncate ${
              isCompleted ? 'text-green-700' : isActive ? 'text-indigo-700' : 'text-slate-400'
            }`}
          >
            {step.label}
          </span>
          {isActive && <BouncingDots />}
        </div>
        <p className={`text-xs mt-0.5 ${isCompleted ? 'text-green-500' : isActive ? 'text-indigo-400' : 'text-slate-300'}`}>
          {isCompleted ? 'Terminé' : step.description}
        </p>
      </div>

      {isActive && (
        <motion.div
          className="w-6 h-6 shrink-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 size={16} className="text-indigo-500" />
        </motion.div>
      )}
    </motion.div>
  );
}

function ConfettiPiece({ delay }: { delay: number }) {
  const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const x = Math.random() * 400 - 200;
  const rotation = Math.random() * 720 - 360;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-2 h-3 rounded-sm"
      style={{ backgroundColor: color }}
      initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
      animate={{
        x,
        y: [0, -100 - Math.random() * 200, 300],
        rotate: rotation,
        scale: [0, 1, 0.5],
        opacity: [1, 1, 0],
      }}
      transition={{ duration: 2 + Math.random(), delay, ease: 'easeOut' }}
    />
  );
}

function CelebrationOverlay({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <ConfettiPiece key={i} delay={i * 0.05} />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
        className="relative z-10 bg-white rounded-3xl shadow-2xl p-10 sm:p-14 text-center max-w-lg mx-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.5 }}
          className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-200"
        >
          <Check size={36} className="text-white" strokeWidth={3} />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-3xl font-bold text-slate-900 mb-3"
        >
          Bienvenue sur EduCI ! 🎉
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-slate-500 mb-8"
        >
          Votre établissement est prêt.
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="w-full py-4 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-base"
        >
          Commencer
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

interface ImmersiveCreationProps {
  onComplete: () => void;
}

export default function ImmersiveCreation({ onComplete }: ImmersiveCreationProps) {
  const [steps, setSteps] = useState<CreationStep[]>(
    CREATION_STEPS.map(s => ({ ...s, status: 'pending' }))
  );
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const completedCount = steps.filter(s => s.status === 'completed').length;
  const progress = Math.round((completedCount / steps.length) * 100);

  useEffect(() => {
    if (currentStepIndex >= steps.length) {
      const timer = setTimeout(() => setShowCelebration(true), 600);
      return () => clearTimeout(timer);
    }

    const current = steps[currentStepIndex];

    const activateTimer = setTimeout(() => {
      setSteps(prev =>
        prev.map((s, i) => (i === currentStepIndex ? { ...s, status: 'active' } : s))
      );
    }, 100);

    const completeTimer = setTimeout(() => {
      setSteps(prev =>
        prev.map((s, i) => (i === currentStepIndex ? { ...s, status: 'completed' } : s))
      );
      setCurrentStepIndex(prev => prev + 1);
    }, current.duration);

    return () => {
      clearTimeout(activateTimer);
      clearTimeout(completeTimer);
    };
  }, [currentStepIndex, steps]);

  if (showCelebration) {
    return <CelebrationOverlay onComplete={onComplete} />;
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-slate-900 mb-2"
        >
          Création en cours
        </motion.h2>
        <p className="text-slate-500 text-sm">Nous configurons votre plateforme</p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-6 mb-6">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>{completedCount}/{steps.length} étapes</span>
          <span className="font-medium text-indigo-600">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-4">
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {steps.map((step, index) => (
              <StepRow key={step.id} step={step} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
