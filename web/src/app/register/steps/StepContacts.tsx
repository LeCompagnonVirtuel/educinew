'use client';

import { useState, useMemo } from 'react';
import { useRegistration } from '@/components/registration/RegistrationContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Mail, Globe, Facebook, Instagram, Linkedin, Youtube, AlertCircle, Check } from 'lucide-react';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import { getCountryByNameFr } from '@/lib/data/african-countries';

export default function StepContacts() {
  const { data, updateContacts, nextStep, prevStep } = useRegistration();
  const c = data.contacts;
  const [error, setError] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const country = useMemo(() => getCountryByNameFr(data.location.country), [data.location.country]);
  const countryCode = country?.code || 'CI';

  const handleNext = () => {
    setTouched({ phonePrimary: true, emailPrimary: true });
    if (!c.phonePrimary && !c.emailPrimary) {
      setError('Au moins un téléphone ou un email de contact est requis');
      return;
    }
    setError('');
    nextStep();
  };

  const emailValid = c.emailPrimary && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.emailPrimary);

  const inputClass = 'w-full px-4 py-3.5 bg-white rounded-xl border-2 border-slate-200 focus:border-[#4F46E5] hover:border-slate-300 transition-all duration-200 outline-none text-slate-900 text-sm';

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Contacts de l&apos;établissement</h2>
        <p className="text-sm text-slate-500">Comment joindre votre école ?</p>
      </div>

      {/* Phones with smart input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <SmartPhoneInput
            value={c.phonePrimary || ''}
            onChange={v => { updateContacts({ phonePrimary: v }); setTouched(prev => ({ ...prev, phonePrimary: true })); }}
            countryCode={countryCode}
            label="Téléphone principal"
            required
            error={touched.phonePrimary && !c.phonePrimary && !c.emailPrimary ? 'Requis si pas d\'email' : undefined}
          />
        </div>
        <div className="relative">
          <SmartPhoneInput
            value={c.phoneSecondary || ''}
            onChange={v => updateContacts({ phoneSecondary: v })}
            countryCode={countryCode}
            label="Téléphone secondaire"
          />
        </div>
      </div>

      {/* Email + WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Email principal <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={c.emailPrimary || ''}
              onChange={e => { updateContacts({ emailPrimary: e.target.value }); setTouched(prev => ({ ...prev, emailPrimary: true })); }}
              className={`${inputClass} pl-10 pr-10 ${
                touched.emailPrimary ? (emailValid ? 'border-emerald-300' : c.emailPrimary ? 'border-red-300' : 'border-slate-200') : 'border-slate-200'
              }`}
              placeholder="contact@ecole.ci"
            />
            {touched.emailPrimary && c.emailPrimary && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                {emailValid ? <Check size={14} className="text-emerald-500" /> : <AlertCircle size={14} className="text-red-400" />}
              </div>
            )}
          </div>
          {touched.emailPrimary && !c.emailPrimary && !c.phonePrimary && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> Requis si pas de téléphone</p>
          )}
        </div>
        <div className="relative">
          <SmartPhoneInput
            value={c.whatsapp || ''}
            onChange={v => updateContacts({ whatsapp: v })}
            countryCode={countryCode}
            label="WhatsApp"
            placeholder="07 00 00 00"
          />
        </div>
      </div>

      {/* Website */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Site web</label>
        <div className="relative">
          <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={c.website || ''}
            onChange={e => updateContacts({ website: e.target.value })}
            className={inputClass + ' pl-10'}
            placeholder="https://ecole.ci"
          />
        </div>
      </div>

      {/* Social networks */}
      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Réseaux sociaux</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Facebook size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600" />
            <input value={c.facebook || ''} onChange={e => updateContacts({ facebook: e.target.value })} className={inputClass + ' pl-10'} placeholder="Facebook URL" />
          </div>
          <div className="relative">
            <Instagram size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-500" />
            <input value={c.instagram || ''} onChange={e => updateContacts({ instagram: e.target.value })} className={inputClass + ' pl-10'} placeholder="Instagram" />
          </div>
          <div className="relative">
            <Linkedin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-700" />
            <input value={c.linkedin || ''} onChange={e => updateContacts({ linkedin: e.target.value })} className={inputClass + ' pl-10'} placeholder="LinkedIn" />
          </div>
          <div className="relative">
            <Youtube size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-600" />
            <input value={c.youtube || ''} onChange={e => updateContacts({ youtube: e.target.value })} className={inputClass + ' pl-10'} placeholder="YouTube" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <button onClick={prevStep} className="flex-1 py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Retour
        </button>
        <button onClick={handleNext} className="flex-[2] py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all group">
          Continuer <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 text-center flex items-center justify-center gap-1">
          <AlertCircle size={12} /> {error}
        </motion.p>
      )}
    </motion.div>
  );
}
