'use client';

import { useState } from 'react';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import StepCard from '@/components/onboarding/StepCard';
import { Building2, FileText, Hash } from 'lucide-react';

const inputClass = (field: string, focused: string) =>
  `w-full px-4 py-3.5 bg-white rounded-xl border-2 transition-all duration-300 outline-none text-slate-900 text-[15px]
   ${focused === field ? 'border-[#4F46E5] bg-white shadow-sm shadow-[#4F46E5]/5' : 'border-slate-200 hover:border-slate-300'}`;

const labelClass = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2';

const schoolTypes = [
  { value: 'MATERNELLE', label: 'Maternelle', icon: '🌱' },
  { value: 'PRIMAIRE', label: 'Primaire', icon: '🏫' },
  { value: 'COLLEGE', label: 'Collège', icon: '🎓' },
  { value: 'LYCEE', label: 'Lycée', icon: '🏛️' },
  { value: 'UNIVERSITE', label: 'Université', icon: '🎓' },
  { value: 'FORMATION', label: 'Formation professionnelle', icon: '⚙️' },
];

export default function StepSchool() {
  const { data, updateSchool, nextStep } = useOnboarding();
  const [focused, setFocused] = useState('');

  return (
    <StepCard
      title="Votre établissement"
      subtitle="Définissez l'identité officielle de votre école."
      icon="🏫"
      onNext={nextStep}
      canProceed={!!data.school.officialName}
    >
      <div className="space-y-5">
        {/* School Type */}
        <div>
          <label className={labelClass}>Type d'établissement</label>
          <div className="grid grid-cols-3 gap-2">
            {schoolTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => updateSchool({ type: type.value })}
                className={`p-3 rounded-xl border-2 text-left transition-all duration-300 ${
                  data.school.type === type.value
                    ? 'border-[#4F46E5] bg-[#4F46E5]/5'
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <span className="text-xl block mb-1">{type.icon}</span>
                <p className="text-xs font-bold text-slate-700">{type.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Names */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Nom officiel *</label>
            <div className="relative">
              <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={data.school.officialName}
                onChange={(e) => updateSchool({ officialName: e.target.value })}
                onFocus={() => setFocused('official')} onBlur={() => setFocused('')}
                className={inputClass('official', focused) + ' pl-11'}
                placeholder="Lycée Moderne de Cocody"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Nom commercial</label>
            <input
              value={data.school.commercialName}
              onChange={(e) => updateSchool({ commercialName: e.target.value })}
              onFocus={() => setFocused('commercial')} onBlur={() => setFocused('')}
              className={inputClass('commercial', focused)}
              placeholder="LMC"
            />
          </div>
        </div>

        {/* Acronym + Visibility */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Acronyme / Sigle</label>
            <div className="relative">
              <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={data.school.acronym}
                onChange={(e) => updateSchool({ acronym: e.target.value })}
                onFocus={() => setFocused('acronym')} onBlur={() => setFocused('')}
                className={inputClass('acronym', focused) + ' pl-11'}
                placeholder="LMC"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Statut</label>
            <div className="flex gap-2">
              {['PRIVE', 'PUBLIC'].map((v) => (
                <button
                  key={v}
                  onClick={() => updateSchool({ visibility: v })}
                  className={`flex-1 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                    data.school.visibility === v
                      ? 'border-[#4F46E5] bg-[#4F46E5]/5 text-[#4F46E5]'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {v === 'PRIVE' ? 'Privé' : 'Public'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Authorization + Ministry */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>N° Autorisation</label>
            <div className="relative">
              <FileText size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={data.school.authorizationNumber}
                onChange={(e) => updateSchool({ authorizationNumber: e.target.value })}
                onFocus={() => setFocused('auth')} onBlur={() => setFocused('')}
                className={inputClass('auth', focused) + ' pl-11'}
                placeholder="N° 12345/A"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Ministère de rattachement</label>
            <input
              value={data.school.ministry}
              onChange={(e) => updateSchool({ ministry: e.target.value })}
              onFocus={() => setFocused('ministry')} onBlur={() => setFocused('')}
              className={inputClass('ministry', focused)}
              placeholder="Ministère de l'Éducation"
            />
          </div>
        </div>

        {/* Tax + RCCM */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>N° Fiscal (optionnel)</label>
            <input
              value={data.school.taxNumber}
              onChange={(e) => updateSchool({ taxNumber: e.target.value })}
              onFocus={() => setFocused('tax')} onBlur={() => setFocused('')}
              className={inputClass('tax', focused)}
              placeholder="CI-1234567890"
            />
          </div>
          <div>
            <label className={labelClass}>N° RCCM (optionnel)</label>
            <input
              value={data.school.rccm}
              onChange={(e) => updateSchool({ rccm: e.target.value })}
              onFocus={() => setFocused('rccm')} onBlur={() => setFocused('')}
              className={inputClass('rccm', focused)}
              placeholder="ABJ-01-12345"
            />
          </div>
        </div>
      </div>
    </StepCard>
  );
}
