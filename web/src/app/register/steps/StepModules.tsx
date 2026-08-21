'use client';

import { useRegistration } from '@/components/registration/RegistrationContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const availableModules = [
  { id: 'Élèves', icon: '👨‍🎓', desc: 'Gestion des inscriptions et dossiers' },
  { id: 'Enseignants', icon: '👨‍🏫', desc: 'Gestion du personnel enseignant' },
  { id: 'Parents', icon: '👨‍👩‍👧', desc: 'Espace parents connectés' },
  { id: 'Classes', icon: '🏫', desc: 'Organisation des classes' },
  { id: 'Notes', icon: '📝', desc: 'Saisie et calcul des moyennes' },
  { id: 'Bulletins', icon: '📊', desc: 'Génération automatique PDF' },
  { id: 'Pointage QR Code', icon: '📱', desc: 'Présences par QR code' },
  { id: 'Présences', icon: '✅', desc: 'Suivi des présences' },
  { id: 'Paiements', icon: '💳', desc: 'Frais scolaires et Mobile Money' },
  { id: 'Transport', icon: '🚌', desc: 'Gestion du transport scolaire' },
  { id: 'Messagerie', icon: '💬', desc: 'Communication interne' },
  { id: 'Notifications', icon: '🔔', desc: 'Alertes temps réel' },
  { id: 'EduCI AI', icon: '🤖', desc: 'Assistant intelligent' },
  { id: 'Rapports', icon: '📈', desc: 'Statistiques et analytiques' },
  { id: 'Emploi du temps', icon: '📅', desc: 'Planning des cours' },
  { id: 'Bibliothèque', icon: '📚', desc: 'Gestion de la bibliothèque' },
  { id: 'Marketplace', icon: '🛒', desc: 'Ressources éducatives' },
];

export default function StepModules() {
  const { data, setModules, nextStep, prevStep } = useRegistration();
  const selected = data.modules;

  const toggle = (id: string) => {
    setModules(selected.includes(id) ? selected.filter(m => m !== id) : [...selected, id]);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Modules</h2>
        <p className="text-sm text-slate-500">Choisissez les fonctionnalités actives ({selected.length} sélectionnés).</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {availableModules.map(mod => {
          const isActive = selected.includes(mod.id);
          return (
            <button key={mod.id} onClick={() => toggle(mod.id)}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                isActive ? 'border-[#4F46E5] bg-[#4F46E5]/5' : 'border-slate-100 bg-white hover:border-slate-200'
              }`}>
              <span className="text-2xl">{mod.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">{mod.id}</p>
                <p className="text-xs text-slate-500 mt-0.5">{mod.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                isActive ? 'bg-[#4F46E5] text-white' : 'bg-slate-100'
              }`}>
                {isActive && <Check size={12} strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3 pt-4">
        <button onClick={prevStep} className="flex-1 py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Retour
        </button>
        <button onClick={nextStep} className="flex-[2] py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all group">
          Continuer <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
