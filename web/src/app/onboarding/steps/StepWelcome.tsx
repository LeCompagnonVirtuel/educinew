'use client';

import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, Clock, Shield, Wifi } from 'lucide-react';
import EduCILogo from '@/components/brand/EduCILogo';

const features = [
  { icon: '🤖', title: 'IA Éducative', desc: 'Tuteur intelligent, quiz et résumés automatiques' },
  { icon: '📊', title: 'Tableaux de bord', desc: 'Statistiques en temps réel par rôle' },
  { icon: '📱', title: 'Application mobile', desc: 'iOS et Android pour tous les acteurs' },
  { icon: '💳', title: 'Paiements intégrés', desc: 'Mobile Money, cartes bancaires, virements' },
  { icon: '📷', title: 'Pointage QR Code', desc: 'Géolocalisation et reconnaissance faciale' },
  { icon: '📄', title: 'Bulletins automatiques', desc: 'Génération PDF avec branding personnalisé' },
  { icon: '👨‍👩‍👧‍👦', title: 'Multi-acteurs', desc: 'Admin, enseignants, parents, élèves' },
  { icon: '🔒', title: 'Sécurisé', desc: 'Isolation multi-tenant et chiffrement' },
];

const guarantees = [
  { icon: Clock, text: 'Prêt en moins de 10 minutes' },
  { icon: Wifi, text: 'Sauvegarde automatique' },
  { icon: Shield, text: 'Données sécurisées' },
];

export default function StepWelcome() {
  const { nextStep } = useOnboarding();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <EduCILogo size="lg" showSlogan />
        <div className="mt-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-[#4F46E5]/30"
          >
            🏫
          </motion.div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Créez votre école
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] bg-clip-text text-transparent"> numérique</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            EduCI construit automatiquement votre plateforme éducative complète.
            Identité visuelle, espaces utilisateurs, QR codes, paiements — tout sera configuré pour vous.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className="bg-white rounded-2xl p-4 border border-slate-100 hover:border-[#4F46E5]/20 hover:shadow-lg hover:shadow-[#4F46E5]/5 transition-all duration-300 group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
            <h3 className="text-xs font-bold text-slate-900 mb-0.5">{feature.title}</h3>
            <p className="text-[10px] text-slate-500 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-center"
      >
        {/* Guarantees */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {guarantees.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
              <Icon size={16} className="text-[#10B981]" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={nextStep}
          className="px-10 py-4 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-[#4F46E5]/30 transition-all duration-300 active:scale-[0.98] group inline-flex items-center gap-3"
        >
          <Sparkles size={20} />
          Créer mon établissement
          <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center justify-center gap-4 mt-5 text-xs text-slate-400">
          <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-[#10B981]" /> 15 étapes guidées</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-[#10B981]" /> Reprise à tout moment</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-[#10B981]" /> Aucune CB requise</span>
        </div>
      </motion.div>
    </div>
  );
}
