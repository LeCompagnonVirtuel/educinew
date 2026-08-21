'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getSupabase } from '@/lib/api/shared';
import {
  CheckCircle, ArrowRight, ArrowLeft, School, Users, Smartphone,
  CreditCard, Sparkles, FileText, Bus, Settings, Bell,
  LayoutDashboard, Loader2,
} from 'lucide-react';

const tourSteps = [
  {
    id: 'welcome',
    title: 'Bienvenue sur EduCI !',
    description: 'Votre établissement est maintenant actif. Découvrons ensemble votre nouvelle plateforme.',
    icon: Sparkles,
    color: 'from-[#4F46E5] to-[#8B5CF6]',
  },
  {
    id: 'dashboard',
    title: 'Tableau de bord',
    description: 'Visualisez les statistiques clés de votre établissement en temps réel : effectifs, présences, paiements et plus.',
    icon: LayoutDashboard,
    color: 'from-blue-500 to-cyan-500',
    action: { label: 'Voir le dashboard', path: '/dashboard' },
  },
  {
    id: 'students',
    title: 'Gestion des élèves',
    description: 'Inscrivez vos élèves, importez des listes Excel, gérez les dossiers et suivez les parcours scolaires.',
    icon: Users,
    color: 'from-emerald-500 to-teal-500',
    action: { label: 'Gérer les élèves', path: '/students' },
  },
  {
    id: 'teachers',
    title: 'Enseignants',
    description: 'Ajoutez vos enseignants, assignez-les aux classes et matières, et gérez leur pointage.',
    icon: School,
    color: 'from-orange-500 to-amber-500',
    action: { label: 'Gérer les enseignants', path: '/teachers' },
  },
  {
    id: 'grades',
    title: 'Notes et bulletins',
    description: 'Saisissez les notes, calculez automatiquement les moyennes et générez les bulletins PDF.',
    icon: FileText,
    color: 'from-violet-500 to-purple-500',
    action: { label: 'Gérer les notes', path: '/grades' },
  },
  {
    id: 'attendance',
    title: 'Présences et pointage',
    description: 'Suivez les présences par QR code, pointage GPS ou saisie manuelle. Statistiques en temps réel.',
    icon: Smartphone,
    color: 'from-pink-500 to-rose-500',
    action: { label: 'Gérer les présences', path: '/attendance' },
  },
  {
    id: 'payments',
    title: 'Paiements',
    description: 'Configurez les frais scolaires, acceptez les paiements Mobile Money et suivez les transactions.',
    icon: CreditCard,
    color: 'from-yellow-500 to-orange-500',
    action: { label: 'Gérer les paiements', path: '/payments' },
  },
  {
    id: 'transport',
    title: 'Transport scolaire',
    description: 'Gérez vos bus, itinéraires et chauffères. Suivez le transport en temps réel.',
    icon: Bus,
    color: 'from-indigo-500 to-blue-500',
    action: { label: 'Gérer le transport', path: '/transport' },
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Envoyez des notifications push, SMS et WhatsApp aux parents et enseignants.',
    icon: Bell,
    color: 'from-red-500 to-pink-500',
    action: { label: 'Voir les notifications', path: '/notifications' },
  },
  {
    id: 'settings',
    title: 'Paramètres',
    description: 'Configurez votre établissement, le branding, les modules et les préférences de sécurité.',
    icon: Settings,
    color: 'from-slate-500 to-gray-600',
    action: { label: 'Paramètres', path: '/settings' },
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [schoolName, setSchoolName] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const supabase = getSupabase();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { router.push('/login'); return; }

        // Check if onboarding already completed
        if (user.user_metadata?.onboarding_completed) {
          router.push('/dashboard');
          return;
        }

        // Get school name
        const schoolId = user.user_metadata?.school_id;
        if (schoolId) {
          const { data: school } = await supabase
            .from('schools')
            .select('name')
            .eq('id', schoolId)
            .single();
          if (school) setSchoolName(school.name);
        }
      } catch {}
      setLoading(false);
    }
    load();
  }, [router]);

  const markOnboardingDone = async () => {
    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.auth.updateUser({
          data: { onboarding_completed: true },
        });
        await supabase.from('users').update({ onboarding_completed: true }).eq('id', user.id);
      }
    } catch {}
  };

  const handleComplete = async () => {
    await markOnboardingDone();
    router.push('/dashboard');
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleActionClick = async (path: string) => {
    await markOnboardingDone();
    router.push(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <Loader2 size={32} className="text-[#4F46E5] animate-spin" />
      </div>
    );
  }

  const step = tourSteps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === tourSteps.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="flex items-center gap-1.5 mb-8 justify-center">
          {tourSteps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i <= currentStep ? 'bg-[#4F46E5] w-8' : 'bg-slate-200 w-4'}`} />
          ))}
        </div>

        {/* Main card */}
        <AnimatePresence mode="wait">
          <motion.div key={step.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

            {/* Header gradient */}
            <div className={`p-8 bg-gradient-to-br ${step.color} text-white text-center`}>
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <step.icon size={32} className="text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{step.title}</h1>
              {schoolName && isFirst && <p className="text-white/80 text-sm">{schoolName}</p>}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 text-center">
              <p className="text-slate-600 text-base leading-relaxed max-w-md mx-auto mb-8">{step.description}</p>

              {step.action && (
                <button onClick={() => handleActionClick(step.action!.path)}
                  className="mb-6 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 mx-auto">
                  {step.action.label} <ArrowRight size={16} />
                </button>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {!isFirst ? (
                  <button onClick={() => setCurrentStep(c => c - 1)} className="px-4 py-2.5 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors flex items-center gap-1.5">
                    <ArrowLeft size={16} /> Précédent
                  </button>
                ) : <div />}

                {isLast ? (
                  <button onClick={handleComplete} className="px-6 py-3 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                    Accéder au dashboard <CheckCircle size={16} />
                  </button>
                ) : (
                  <button onClick={() => setCurrentStep(c => c + 1)} className="px-6 py-3 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                    Suivant <ArrowRight size={16} />
                  </button>
                )}
              </div>

              {!isLast && (
                <button onClick={handleSkip} className="mt-4 text-xs text-slate-400 hover:text-slate-600 transition-colors">
                  Passer la visite guidée
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Step counter */}
        <p className="text-center text-xs text-slate-400 mt-4">{currentStep + 1} / {tourSteps.length}</p>
      </div>
    </div>
  );
}
