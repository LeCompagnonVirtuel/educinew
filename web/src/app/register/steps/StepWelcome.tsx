'use client';

import { useRegistration } from '@/components/registration/RegistrationContext';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Users, Shield, Sparkles, Zap, Globe } from 'lucide-react';

const features = [
  { icon: Building2, title: 'Gestion complète', desc: 'Élèves, notes, présences, bulletins' },
  { icon: Users, title: 'Multi-rôles', desc: 'Admin, enseignant, parent, élève' },
  { icon: Shield, title: 'Sécurisé', desc: 'Données isolées et protégées' },
  { icon: Zap, title: 'Temps réel', desc: 'Notifications et synchronisation' },
  { icon: Globe, title: 'Mobile & Web', desc: 'Accessible partout, tout le temps' },
];

export default function StepWelcome() {
  const { nextStep } = useRegistration();

  return (
    <div className="text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#4F46E5]/30">
          <Sparkles size={36} className="text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Créez votre établissement
        </h1>
        <p className="text-slate-500 text-base max-w-md mx-auto mb-10">
          En quelques minutes, configurez votre école numérique complète.
          Vos données sont sauvegardées automatiquement.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center shrink-0">
              <f.icon size={18} className="text-[#4F46E5]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{f.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={nextStep}
        className="w-full max-w-sm mx-auto py-4 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-[15px] font-semibold shadow-xl hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-300 active:scale-[0.98] group"
      >
        Commencer l'inscription
        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
      </motion.button>

      <p className="text-xs text-slate-400 mt-4">⏱️ Environ 5 minutes — Sauvegarde automatique</p>
    </div>
  );
}
