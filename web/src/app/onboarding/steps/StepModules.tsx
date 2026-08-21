'use client';

import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import StepCard from '@/components/onboarding/StepCard';
import { Check } from 'lucide-react';

const allModules = [
  { name: 'Élèves', icon: '👨‍🎓', desc: 'Gestion des inscriptions et profils' },
  { name: 'Enseignants', icon: '👩‍🏫', desc: 'Gestion du corps enseignant' },
  { name: 'Parents', icon: '👨‍👩‍👧', desc: 'Portail parent et communication' },
  { name: 'Classes', icon: '🏛️', desc: 'Structure des niveaux et sections' },
  { name: 'Notes', icon: '📝', desc: 'Saisie et calcul des notes' },
  { name: 'Bulletins', icon: '📄', desc: 'Génération automatique des bulletins' },
  { name: 'Pointage QR Code', icon: '📷', desc: 'Pointage par QR code et géolocalisation' },
  { name: 'Présences', icon: '✅', desc: 'Suivi des présences et absences' },
  { name: 'Paiements', icon: '💳', desc: 'Scolarité et Mobile Money' },
  { name: 'Transport', icon: '🚌', desc: 'Gestion des bus et suivi GPS' },
  { name: 'Marketplace', icon: '🛒', desc: 'Achat/vente de ressources éducatives' },
  { name: 'Messagerie', icon: '💬', desc: 'Communication interne sécurisée' },
  { name: 'Notifications', icon: '🔔', desc: 'Alertes push, email et SMS' },
  { name: 'EduCI AI', icon: '🤖', desc: 'Tuteur IA, quiz et résumés' },
  { name: 'Rapports', icon: '📊', desc: 'Statistiques et tableaux de bord' },
  { name: 'Bibliothèque', icon: '📚', desc: 'Ressources documentaires' },
  { name: 'Emploi du temps', icon: '📅', desc: 'Planning des cours et salles' },
];

export default function StepModules() {
  const { data, setModules, nextStep } = useOnboarding();

  const toggleModule = (name: string) => {
    if (data.modules.includes(name)) {
      setModules(data.modules.filter(m => m !== name));
    } else {
      setModules([...data.modules, name]);
    }
  };

  return (
    <StepCard
      title="Modules à activer"
      subtitle="Choisissez les fonctionnalités dont vous avez besoin. Vous pourrez en ajouter plus tard."
      icon="🧩"
      onNext={nextStep}
      canProceed={data.modules.length > 0}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {allModules.map((mod) => {
          const active = data.modules.includes(mod.name);
          return (
            <button
              key={mod.name}
              onClick={() => toggleModule(mod.name)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-3 group ${
                active
                  ? 'border-[#4F46E5] bg-[#4F46E5]/5'
                  : 'border-slate-100 hover:border-slate-200 opacity-60 hover:opacity-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                active ? 'bg-[#4F46E5]/10' : 'bg-slate-100'
              }`}>
                {mod.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${active ? 'text-[#4F46E5]' : 'text-slate-700'}`}>{mod.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{mod.desc}</p>
              </div>
              {active && (
                <div className="w-6 h-6 rounded-full bg-[#4F46E5] flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-slate-500">
          <span className="font-bold text-[#4F46E5]">{data.modules.length}</span> modules sélectionnés
        </p>
      </div>
    </StepCard>
  );
}
