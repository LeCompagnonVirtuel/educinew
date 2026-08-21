'use client';

import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import StepCard from '@/components/onboarding/StepCard';
import { Shield, Users, Key, Lock } from 'lucide-react';

const securityLevels = [
  { value: 'standard', label: 'Standard', desc: 'Mot de passe unique, sessions normales', icon: '🔓' },
  { value: 'reinforced', label: 'Renforcé', desc: 'Sessions courtes, IP tracking, alertes', icon: '🔒' },
  { value: 'enterprise', label: 'Enterprise', desc: '2FA obligatoire, journaux complets, IP whitelist', icon: '🛡️' },
];

export default function StepSecurity() {
  const { data, updateSecurity, nextStep } = useOnboarding();

  return (
    <StepCard
      title="Accès & Sécurité"
      subtitle="Définissez les politiques de sécurité de votre établissement."
      icon="🔐"
      onNext={nextStep}
    >
      <div className="space-y-6">
        {/* Security Level */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Niveau de sécurité</p>
          <div className="space-y-2">
            {securityLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => updateSecurity({ securityLevel: level.value })}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-4 ${
                  data.security.securityLevel === level.value
                    ? 'border-[#4F46E5] bg-[#4F46E5]/5'
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  data.security.securityLevel === level.value ? 'bg-[#4F46E5]/10' : 'bg-slate-50'
                }`}>
                  {level.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{level.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{level.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  data.security.securityLevel === level.value ? 'border-[#4F46E5] bg-[#4F46E5]' : 'border-slate-200'
                }`}>
                  {data.security.securityLevel === level.value && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Max Admins */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Administrateurs</p>
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Users size={18} className="text-[#4F46E5]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Nombre max d&apos;administrateurs</p>
                  <p className="text-xs text-slate-400">Comptes avec accès total</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateSecurity({ maxAdmins: Math.max(1, data.security.maxAdmins - 1) })}
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-[#4F46E5]">{data.security.maxAdmins}</span>
                <button
                  onClick={() => updateSecurity({ maxAdmins: Math.min(10, data.security.maxAdmins + 1) })}
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3">
          <button
            onClick={() => updateSecurity({ allowDelegation: !data.security.allowDelegation })}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-4 ${
              data.security.allowDelegation ? 'border-[#4F46E5]/30 bg-[#4F46E5]/5' : 'border-slate-100'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <Key size={18} className="text-violet-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Délégation de responsabilités</p>
              <p className="text-xs text-slate-500">Permet de déléguer certaines fonctions à d&apos;autres utilisateurs</p>
            </div>
            <div className={`w-12 h-7 rounded-full transition-all duration-300 flex items-center px-1 ${
              data.security.allowDelegation ? 'bg-[#4F46E5] justify-end' : 'bg-slate-200 justify-start'
            }`}>
              <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
            </div>
          </button>

          <button
            onClick={() => updateSecurity({ twoFactorEnabled: !data.security.twoFactorEnabled })}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-4 ${
              data.security.twoFactorEnabled ? 'border-[#4F46E5]/30 bg-[#4F46E5]/5' : 'border-slate-100'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Lock size={18} className="text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Double authentification (2FA)</p>
              <p className="text-xs text-slate-500">Code TOTP requis à chaque connexion pour les admins</p>
            </div>
            <div className={`w-12 h-7 rounded-full transition-all duration-300 flex items-center px-1 ${
              data.security.twoFactorEnabled ? 'bg-[#4F46E5] justify-end' : 'bg-slate-200 justify-start'
            }`}>
              <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
            </div>
          </button>
        </div>
      </div>
    </StepCard>
  );
}
