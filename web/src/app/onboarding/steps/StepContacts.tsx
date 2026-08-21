'use client';

import { useState, useMemo } from 'react';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import StepCard from '@/components/onboarding/StepCard';
import { Mail, Globe, Facebook, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import { getCountryByNameFr } from '@/lib/data/african-countries';

const inputClass = (field: string, focused: string) =>
  `w-full px-4 py-3.5 bg-white rounded-xl border-2 transition-all duration-300 outline-none text-slate-900 text-[15px]
   ${focused === field ? 'border-[#4F46E5] bg-white shadow-sm shadow-[#4F46E5]/5' : 'border-slate-200 hover:border-slate-300'}`;

const labelClass = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2';

const socialFields = [
  { key: 'website', label: 'Site Web', icon: Globe, placeholder: 'https://ecole.ci' },
  { key: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/ecole' },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/school/ecole' },
  { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: '@ecole_ci' },
  { key: 'twitter', label: 'X (Twitter)', icon: Twitter, placeholder: '@ecole_ci' },
  { key: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/@ecole' },
];

export default function StepContacts() {
  const { data, updateContacts, nextStep } = useOnboarding();
  const [focused, setFocused] = useState('');

  return (
    <StepCard
      title="Contacts"
      subtitle="Comment les parents, élèves et partenaires peuvent-ils vous joindre ?"
      icon="📞"
      onNext={nextStep}
      canProceed={!!(data.contacts.phonePrimary || data.contacts.emailPrimary)}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <SmartPhoneInput
            value={data.contacts.phonePrimary || ''}
            onChange={(v) => updateContacts({ phonePrimary: v })}
            label="Téléphone principal"
            required
          />
          <SmartPhoneInput
            value={data.contacts.phoneSecondary || ''}
            onChange={(v) => updateContacts({ phoneSecondary: v })}
            label="Téléphone secondaire"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SmartPhoneInput
            value={data.contacts.whatsapp || ''}
            onChange={(v) => updateContacts({ whatsapp: v })}
            label="WhatsApp"
          />
          <div>
            <label className={labelClass}>Email principal</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={data.contacts.emailPrimary}
                onChange={(e) => updateContacts({ emailPrimary: e.target.value })}
                onFocus={() => setFocused('emailP')} onBlur={() => setFocused('')}
                className={inputClass('emailP', focused) + ' pl-11'}
                placeholder="contact@ecole.ci"
              />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>Email administratif</label>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={data.contacts.emailAdmin}
              onChange={(e) => updateContacts({ emailAdmin: e.target.value })}
              onFocus={() => setFocused('emailA')} onBlur={() => setFocused('')}
              className={inputClass('emailA', focused) + ' pl-11'}
              placeholder="admin@ecole.ci"
            />
          </div>
        </div>

        {/* Social Media */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Réseaux sociaux (optionnel)</p>
          <div className="grid grid-cols-2 gap-3">
            {socialFields.map(({ key, label, icon: Icon, placeholder }) => (
              <div key={key}>
                <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                  <Icon size={12} /> {label}
                </label>
                <input
                  value={(data.contacts as any)[key]}
                  onChange={(e) => updateContacts({ [key]: e.target.value })}
                  onFocus={() => setFocused(key)} onBlur={() => setFocused('')}
                  className={inputClass(key, focused)}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </StepCard>
  );
}
