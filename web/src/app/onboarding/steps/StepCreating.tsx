'use client';

import { useEffect, useState, useRef } from 'react';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { motion } from 'framer-motion';
import {
  Check, Loader2, School, Users, Palette, CreditCard, Settings,
  Shield, Database, Bell, FolderOpen, Key, QrCode, FileText,
  Cpu, Sparkles, Wifi,
} from 'lucide-react';
import { sbAuth } from '@/lib/api';
import { getSupabase } from '@/lib/api/shared';

const creationSteps = [
  { label: 'Création de votre établissement', icon: School, duration: 1200 },
  { label: 'Configuration du cloud', icon: Database, duration: 800 },
  { label: 'Création des bases de données', icon: Database, duration: 1000 },
  { label: 'Enregistrement du compte administrateur', icon: Users, duration: 900 },
  { label: 'Configuration des permissions', icon: Key, duration: 700 },
  { label: 'Activation du branding', icon: Palette, duration: 600 },
  { label: 'Création des QR Codes', icon: QrCode, duration: 500 },
  { label: 'Configuration des documents', icon: FileText, duration: 600 },
  { label: 'Activation des modules', icon: Settings, duration: 700 },
  { label: 'Configuration des paiements', icon: CreditCard, duration: 500 },
  { label: 'Initialisation de la sécurité', icon: Shield, duration: 600 },
  { label: 'Création des espaces utilisateurs', icon: FolderOpen, duration: 800 },
  { label: 'Activation des notifications', icon: Bell, duration: 500 },
  { label: 'Préparation de l\'application mobile', icon: Cpu, duration: 700 },
  { label: 'Configuration d\'EduCI AI', icon: Sparkles, duration: 600 },
  { label: 'Synchronisation temps réel', icon: Wifi, duration: 500 },
  { label: 'Finalisation', icon: Check, duration: 400 },
];

export default function StepCreating() {
  const { data, nextStep } = useOnboarding();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [globalProgress, setGlobalProgress] = useState(0);
  const hasRun = useRef(false);
  const passwordRef = useRef<string | null>(null);

  const registerSchool = async () => {
    setError('');
    setCompleted([]);
    setCurrentIdx(0);
    setGlobalProgress(0);

    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      const existingSchoolId = (user as any)?.schoolId || (user as any)?.school_id || (user as any)?.user_metadata?.school_id;
      let result: any;

      setCurrentIdx(0);
      if (existingSchoolId) {
        result = { school: { id: existingSchoolId } };
      } else {
        // School should have been created during email verification
        // Try to fetch it from the database
        const { data: dbUser } = await supabase
          .from('users')
          .select('school_id')
          .eq('id', user?.id)
          .single();

        if (dbUser?.school_id) {
          result = { school: { id: dbUser.school_id } };
        } else {
          // Fallback: call registerSchool (returns pending, school already exists via OTP)
          if (!passwordRef.current) {
            passwordRef.current = data.personal.password;
          }
          await sbAuth.registerSchool({
            adminName: `${data.personal.firstName} ${data.personal.lastName}`,
            adminEmail: data.personal.email,
            adminPassword: passwordRef.current,
            schoolName: data.school.officialName,
            address: data.location.fullAddress,
            phone: data.contacts.phonePrimary,
            schoolEmail: data.contacts.emailPrimary,
            region: data.location.region,
            city: data.location.city,
            schoolType: data.school.type,
          });
          // Re-fetch school_id after registration attempt
          const { data: updatedUser } = await supabase
            .from('users')
            .select('school_id')
            .eq('id', user?.id)
            .single();
          result = { school: { id: updatedUser?.school_id } };
        }
      }
      setCompleted([0]);
      setGlobalProgress(6);

      for (let i = 1; i < creationSteps.length; i++) {
        const step = creationSteps[i];
        setCurrentIdx(i);
        await new Promise(resolve => setTimeout(resolve, step.duration));
        setCompleted(prev => [...prev, i]);
        setGlobalProgress(Math.round(((i + 1) / creationSteps.length) * 100));
      }

      const schoolId = (result as any)?.school?.id;
      if (schoolId && typeof window !== 'undefined') {
        localStorage.setItem('educi_school_id', schoolId);
      }

      try {
        const draftKey = localStorage.getItem('educi_onboarding_draft_id');
        if (draftKey) {
          await supabase.from('onboarding_drafts').update({ completed: true, updated_at: new Date().toISOString() }).eq('id', draftKey);
        }
      } catch {}

      localStorage.removeItem('educi_onboarding');
      localStorage.removeItem('educi_onboarding_draft_id');
      localStorage.removeItem('educi_pending_registration');

      await new Promise(resolve => setTimeout(resolve, 800));
      nextStep();
    } catch (err: any) {
      hasRun.current = false;
      setError(err.message || 'Une erreur est survenue lors de la création.');
    }
  };

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    registerSchool();
  }, [data, nextStep]);

  const allDone = completed.length === creationSteps.length;

  return (
    <div className="w-full max-w-xl mx-auto text-center">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#4F46E5]/30">
          {error ? (
            <span className="text-4xl">⚠️</span>
          ) : allDone ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
              <Check size={40} className="text-white" strokeWidth={3} />
            </motion.div>
          ) : (
            <Loader2 size={40} className="text-white animate-spin" />
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          {error ? 'Erreur de création' : allDone ? 'Votre école est prête !' : 'Construction en cours...'}
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          {error
            ? 'Un problème est survenu. Veuillez réessayer.'
            : allDone
            ? 'Votre plateforme est entièrement configurée et opérationnelle.'
            : 'EduCI construit votre environnement numérique complet. Veuillez patienter.'
          }
        </p>
      </motion.div>

      {/* Global Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-400">Configuration</span>
          <span className="font-bold text-[#4F46E5]">{globalProgress}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${globalProgress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-4 sm:p-6 text-left max-h-[360px] overflow-y-auto custom-scrollbar">
        {creationSteps.map((step, i) => {
          const isDone = completed.includes(i);
          const isActive = i === currentIdx && !isDone && !error;
          const Icon = step.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isDone ? 'bg-[#10B981]/5' : isActive ? 'bg-[#4F46E5]/5' : 'opacity-30'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isDone ? 'bg-[#10B981]/10 text-[#10B981]' : isActive ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'bg-slate-100 text-slate-400'
              }`}>
                {isDone ? <Check size={14} strokeWidth={3} /> : isActive ? <Loader2 size={14} className="animate-spin" /> : <Icon size={14} />}
              </div>
              <span className={`text-sm font-medium ${isDone ? 'text-[#10B981]' : isActive ? 'text-[#4F46E5]' : 'text-slate-400'}`}>
                {step.label}
              </span>
              {isDone && <span className="ml-auto text-[10px] text-[#10B981] font-mono">✓</span>}
            </motion.div>
          );
        })}
      </div>

      {error && (
        <button
          onClick={() => {
            hasRun.current = false;
            registerSchool();
          }}
          className="mt-6 px-8 py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}
