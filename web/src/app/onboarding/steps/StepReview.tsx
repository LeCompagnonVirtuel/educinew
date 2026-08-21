'use client';

import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import StepCard from '@/components/onboarding/StepCard';
import { Check, Edit, User, Building, MapPin, Palette, CreditCard, Bell, BookOpen, Puzzle, Shield, Phone } from 'lucide-react';

const sections = [
  { key: 'personal', label: 'Informations personnelles', icon: User, step: 1 },
  { key: 'school', label: 'Établissement', icon: Building, step: 2 },
  { key: 'location', label: 'Localisation', icon: MapPin, step: 3 },
  { key: 'contacts', label: 'Contacts', icon: Phone, step: 4 },
  { key: 'branding', label: 'Identité visuelle', icon: Palette, step: 5 },
  { key: 'academic', label: 'Configuration académique', icon: BookOpen, step: 6 },
  { key: 'modules', label: 'Modules', icon: Puzzle, step: 7 },
  { key: 'payments', label: 'Paiements', icon: CreditCard, step: 8 },
  { key: 'notifications', label: 'Notifications', icon: Bell, step: 9 },
  { key: 'security', label: 'Accès & Sécurité', icon: Shield, step: 10 },
];

function getSectionStatus(key: string, data: any): { complete: boolean; summary: string } {
  switch (key) {
    case 'personal':
      return {
        complete: !!(data.personal.lastName && data.personal.email && data.personal.password),
        summary: data.personal.lastName ? `${data.personal.firstName} ${data.personal.lastName}` : '',
      };
    case 'school':
      return {
        complete: !!(data.school.officialName),
        summary: data.school.officialName || '',
      };
    case 'location':
      return {
        complete: !!(data.location.city),
        summary: data.location.city ? `${data.location.city}, ${data.location.country}` : '',
      };
    case 'contacts':
      return {
        complete: !!(data.contacts.phonePrimary || data.contacts.emailPrimary),
        summary: data.contacts.emailPrimary || data.contacts.phonePrimary || '',
      };
    case 'branding':
      return {
        complete: !!(data.branding.displayName || data.branding.logoUrl || data.branding.primaryColor !== '#4F46E5'),
        summary: data.branding.displayName || 'Couleurs configurées',
      };
    case 'academic':
      return {
        complete: !!(data.academic.periodType),
        summary: data.academic.periodType === 'TRIMESTRE' ? 'Trimestres' : data.academic.periodType === 'SEMESTRE' ? 'Semestres' : '',
      };
    case 'modules':
      return {
        complete: data.modules.length > 0,
        summary: `${data.modules.length} modules activés`,
      };
    case 'payments':
      return {
        complete: !!(data.payments.mobileMoney || data.payments.bankCards || data.payments.cash),
        summary: [data.payments.mobileMoney && 'Mobile Money', data.payments.bankCards && 'Cartes', data.payments.cash && 'Espèces'].filter(Boolean).join(', '),
      };
    case 'notifications':
      return {
        complete: !!(data.notifications.emailEnabled || data.notifications.pushEnabled),
        summary: [data.notifications.emailEnabled && 'Email', data.notifications.pushEnabled && 'Push', data.notifications.smsEnabled && 'SMS'].filter(Boolean).join(', '),
      };
    case 'security':
      return {
        complete: true,
        summary: `Niveau ${data.security.securityLevel}${data.security.twoFactorEnabled ? ' + 2FA' : ''}`,
      };
    default:
      return { complete: false, summary: '' };
  }
}

export default function StepReview() {
  const { data, setStep, nextStep } = useOnboarding();
  const completedCount = sections.filter(s => getSectionStatus(s.key, data).complete).length;
  const allComplete = completedCount === sections.length;

  return (
    <StepCard
      title="Vérification finale"
      subtitle="Vérifiez toutes les informations avant la création de votre plateforme."
      icon="✅"
      onNext={nextStep}
      nextLabel="Créer mon établissement"
      canProceed={allComplete}
    >
      <div className="space-y-2">
        {sections.map(({ key, label, icon: Icon, step }) => {
          const { complete, summary } = getSectionStatus(key, data);
          return (
            <div
              key={key}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                complete
                  ? 'border-[#10B981]/20 bg-[#10B981]/5'
                  : 'border-red-100 bg-red-50/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                complete ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-red-100 text-red-400'
              }`}>
                {complete ? <Check size={18} strokeWidth={3} /> : <Icon size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${complete ? 'text-slate-900' : 'text-red-700'}`}>{label}</p>
                <p className="text-[11px] text-slate-400 truncate">
                  {complete ? summary || '✓ Complété' : '⚠ À compléter'}
                </p>
              </div>
              <button
                onClick={() => setStep(step)}
                className="p-2 rounded-lg hover:bg-white text-slate-400 hover:text-[#4F46E5] transition-all"
              >
                <Edit size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 p-5 bg-gradient-to-r from-[#4F46E5]/5 to-[#8B5CF6]/5 rounded-xl border border-[#4F46E5]/10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-slate-900">
            {allComplete ? '🎉 Tout est prêt !' : `${completedCount}/${sections.length} sections complétées`}
          </p>
          <div className="flex items-center gap-1">
            {sections.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i < completedCount ? 'bg-[#10B981]' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-600">
          {allComplete
            ? 'En cliquant sur « Créer mon établissement », EduCI va automatiquement configurer votre plateforme complète : établissement, branding, modules, espaces utilisateurs, documents, QR codes, notifications et bien plus.'
            : 'Veuillez compléter toutes les sections avant de créer votre établissement.'
          }
        </p>
        {allComplete && (
          <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-slate-500">
            {[
              'Établissement & administration',
              'Année scolaire & périodes',
              'Branding & couleurs propagés',
              'Modules & permissions',
              'Paiements Money Fusion',
              'Stockage & journaux',
              'Espaces Élève, Parent, Enseignant',
              'QR Codes & documents',
              'Notifications multi-canal',
              'Sécurité & 2FA',
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-[#4F46E5]" />
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </StepCard>
  );
}
