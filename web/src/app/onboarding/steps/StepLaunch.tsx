'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { getSupabase } from '@/lib/api/shared';
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Camera, FileText,
  CreditCard, Settings, Sparkles, ChevronRight, X, ArrowRight,
  CheckCircle, Rocket, PartyPopper,
} from 'lucide-react';

const tourSteps = [
  {
    title: 'Tableau de bord',
    desc: 'Votre centre de contrôle. Toutes les statistiques de votre école en un coup d\'œil : effectifs, présences, paiements, performances.',
    icon: LayoutDashboard,
    color: 'from-[#4F46E5] to-[#60A5FA]',
  },
  {
    title: 'Gestion des élèves',
    desc: 'Inscriptions, profils complets, documents, QR codes personnels, historique académique.',
    icon: Users,
    color: 'from-[#8B5CF6] to-[#A78BFA]',
  },
  {
    title: 'Enseignants & Personnel',
    desc: 'Corps enseignant, affectations, emplois du temps, pointage et suivi de présence.',
    icon: GraduationCap,
    color: 'from-[#10B981] to-[#34D399]',
  },
  {
    title: 'Notes & Bulletins',
    desc: 'Saisie, calculs automatiques, moyennes pondérées, génération PDF avec votre branding.',
    icon: FileText,
    color: 'from-[#F59E0B] to-[#FBBF24]',
  },
  {
    title: 'Pointage QR Code',
    desc: 'Chaque élève possède un QR code unique. Pointage rapide avec géolocalisation.',
    icon: Camera,
    color: 'from-[#EF4444] to-[#F87171]',
  },
  {
    title: 'Paiements intégrés',
    desc: 'Paiements via Money Fusion (Mobile Money, cartes bancaires), suivi des soldes et relances automatiques.',
    icon: CreditCard,
    color: 'from-[#06B6D4] to-[#22D3EE]',
  },
  {
    title: 'EduCI AI',
    desc: 'Tuteur intelligent, génération automatique de quiz, résumés de cours, suggestions personnalisées.',
    icon: Sparkles,
    color: 'from-[#8B5CF6] to-[#C084FC]',
  },
  {
    title: 'Paramètres avancés',
    desc: 'Personnalisez tout : branding, modules, notifications, permissions, sécurité, intégrations.',
    icon: Settings,
    color: 'from-[#64748B] to-[#94A3B8]',
  },
];

export default function StepLaunch() {
  const router = useRouter();
  const { data } = useOnboarding();
  const [currentTour, setCurrentTour] = useState(0);
  const [showTour, setShowTour] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);

  const handleFinish = async () => {
    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      const schoolId = (user as any)?.schoolId || (user as any)?.school_id;

      if (schoolId && data) {
        const schoolUpdate: Record<string, any> = {};

        if (data.branding?.primaryColor || data.branding?.logoUrl) {
          schoolUpdate.primary_color = data.branding.primaryColor;
          schoolUpdate.secondary_color = data.branding.secondaryColor;
          schoolUpdate.accent_color = data.branding.accentColor;
          schoolUpdate.logo_url = data.branding.logoUrl;
        }

        if (data.academic) {
          schoolUpdate.academic_year = data.academic.academicYear;
          schoolUpdate.grading_system = data.academic.gradingSystem;
          if (data.location?.country === "Côte d'Ivoire") {
            schoolUpdate.timezone = 'Africa/Abidjan';
          }
        }

        if (data.contacts) {
          if (data.contacts.phonePrimary) schoolUpdate.phone = data.contacts.phonePrimary;
          if (data.contacts.emailPrimary) schoolUpdate.email = data.contacts.emailPrimary;
          if (data.contacts.website) schoolUpdate.website = data.contacts.website;
        }

        if (data.location) {
          if (data.location.fullAddress) schoolUpdate.address = data.location.fullAddress;
          if (data.location.city) schoolUpdate.city = data.location.city;
          if (data.location.region) schoolUpdate.region = data.location.region;
        }

        if (data.school) {
          if (data.school.acronym) schoolUpdate.acronym = data.school.acronym;
          if (data.school.type) schoolUpdate.school_type = data.school.type;
        }

        if (data.modules && data.modules.length > 0) {
          schoolUpdate.modules = data.modules;
        }

        if (data.notifications) {
          schoolUpdate.notification_email = data.notifications.emailEnabled ?? true;
          schoolUpdate.notification_push = data.notifications.pushEnabled ?? true;
          schoolUpdate.notification_sms = data.notifications.smsEnabled ?? false;
          schoolUpdate.notification_whatsapp = data.notifications.whatsappEnabled ?? false;
        }

        if (data.payments && (data.payments as any).moneyFusionUrl) {
          schoolUpdate.money_fusion_configured = true;
        }

        schoolUpdate.onboarding_completed = true;
        schoolUpdate.onboarding_completed_at = new Date().toISOString();

        await supabase.from('schools').update(schoolUpdate).eq('id', schoolId);
      }

      localStorage.removeItem('educi_onboarding');
      localStorage.removeItem('educi_onboarding_draft_id');
      localStorage.removeItem('educi_pending_registration');

      router.push('/dashboard');
    } catch {
      router.push('/dashboard');
    }
  };

  if (!showTour) {
    return (
      <div className="w-full max-w-lg mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 3, duration: 1 }}
              onAnimationComplete={() => setShowConfetti(false)}
              className="absolute inset-0 pointer-events-none overflow-hidden"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-sm"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][i % 5],
                  }}
                  initial={{ top: '-5%', rotate: 0 }}
                  animate={{ top: '105%', rotate: 360 + Math.random() * 720 }}
                  transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5, ease: 'easeIn' }}
                />
              ))}
            </motion.div>
          )}

          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#4F46E5]/30">
            <PartyPopper size={40} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Félicitations !</h1>
          <p className="text-lg text-slate-500 mb-2">
            <span className="font-bold text-[#4F46E5]">{data.school.officialName || 'Votre établissement'}</span>
          </p>
          <p className="text-slate-500 mb-8">est maintenant entièrement opérationnel sur EduCI.</p>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-8 text-left shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Tout est configuré</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Établissement créé',
                'Branding appliqué',
                'Modules activés',
                'Paiements configurés',
                'Espaces utilisateurs prêts',
                'QR Codes générés',
                'Notifications actives',
                'IA configurée',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={14} className="text-[#10B981] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleFinish}
            className="px-10 py-4 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-[#4F46E5]/30 transition-all duration-300 active:scale-[0.98] group inline-flex items-center gap-3"
          >
            <Rocket size={20} />
            Accéder à mon tableau de bord
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  const step = tourSteps[currentTour];
  const Icon = step.icon;
  const isLast = currentTour === tourSteps.length - 1;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Votre plateforme est prête !</h1>
          <p className="text-sm text-slate-500">
            Découvrez les fonctionnalités principales en {tourSteps.length} étapes rapides.
          </p>
        </motion.div>
      </div>

      {/* Tour Progress */}
      <div className="flex items-center justify-center gap-1.5 mb-8">
        {tourSteps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentTour ? 'w-8 bg-[#4F46E5]' : i < currentTour ? 'w-4 bg-[#4F46E5]/40' : 'w-4 bg-slate-200'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentTour}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-8"
        >
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}>
            <Icon size={28} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 text-center mb-2">{step.title}</h2>
          <p className="text-sm text-slate-500 text-center leading-relaxed">{step.desc}</p>

          {/* Mock UI */}
          <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-[10px] text-slate-400 ml-2">EduCI — {step.title}</span>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 rounded-full w-3/4" />
              <div className="h-3 bg-slate-200 rounded-full w-1/2" />
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="h-16 bg-white rounded-lg border border-slate-200" />
                <div className="h-16 bg-white rounded-lg border border-slate-200" />
                <div className="h-16 bg-white rounded-lg border border-slate-200" />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setShowTour(false)}
          className="text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
        >
          <X size={14} /> Passer la visite
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{currentTour + 1}/{tourSteps.length}</span>
          <button
            onClick={() => isLast ? setShowTour(false) : setCurrentTour(prev => prev + 1)}
            className="px-6 py-3 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
          >
            {isLast ? 'Terminer' : 'Suivant'}
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
