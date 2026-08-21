'use client';

import { useState, useMemo } from 'react';
import { useRegistration } from '@/components/registration/RegistrationContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, Mail, Lock, Calendar } from 'lucide-react';
import CountrySelect from '@/components/ui/CountrySelect';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { getCountryByNameFr, africanCountries } from '@/lib/data/african-countries';

export default function StepPersonal() {
  const { data, updatePersonal, nextStep, prevStep } = useRegistration();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const p = data.personal;

  const country = useMemo(() => getCountryByNameFr(data.location?.country || ''), [data.location?.country]);
  const countryCode = country?.code || 'CI';
  const nationalities = useMemo(() => africanCountries.map(c => c.nameFr), []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!p.lastName || p.lastName.length < 2) errs.lastName = 'Nom requis (min 2 caractères)';
    if (!p.firstName || p.firstName.length < 2) errs.firstName = 'Prénom requis (min 2 caractères)';
    if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) errs.email = 'Email invalide';
    if (!p.password || p.password.length < 8) errs.password = 'Min 8 caractères';
    else if (!/[A-Z]/.test(p.password)) errs.password = 'Au moins une majuscule';
    else if (!/[0-9]/.test(p.password)) errs.password = 'Au moins un chiffre';
    if (p.password !== p.confirmPassword) errs.confirmPassword = 'Les mots de passe ne correspondent pas';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 bg-white rounded-xl border-2 transition-all duration-200 outline-none text-slate-900 text-sm ${
      errors[field] ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-[#4F46E5] hover:border-slate-300'
    }`;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Informations du propriétaire</h2>
        <p className="text-sm text-slate-500">Vous serez l'administrateur principal de l'établissement.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Civilité</label>
          <select value={p.civility} onChange={e => updatePersonal({ civility: e.target.value })} className={inputClass('civility')}>
            <option value="">Sélectionner</option>
            <option value="M.">M.</option>
            <option value="Mme">Mme</option>
            <option value="Mlle">Mlle</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Genre</label>
          <select value={p.gender} onChange={e => updatePersonal({ gender: e.target.value })} className={inputClass('gender')}>
            <option value="">Sélectionner</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Nom *</label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={p.lastName} onChange={e => updatePersonal({ lastName: e.target.value })} className={inputClass('lastName') + ' pl-10'} placeholder="Konan" />
          </div>
          {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Prénom *</label>
          <input value={p.firstName} onChange={e => updatePersonal({ firstName: e.target.value })} className={inputClass('firstName')} placeholder="Jean-Pierre" />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Date de naissance</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="date" value={p.dateOfBirth} onChange={e => updatePersonal({ dateOfBirth: e.target.value })} className={inputClass('dateOfBirth') + ' pl-10'} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Nationalité</label>
          <SearchableSelect
            options={nationalities}
            value={p.nationality || ''}
            onChange={v => updatePersonal({ nationality: v })}
            placeholder="Sélectionner votre nationalité"
            allowCustom
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SmartPhoneInput
          value={p.phone || ''}
          onChange={v => updatePersonal({ phone: v })}
          countryCode={countryCode}
          label="Téléphone"
        />
        <SmartPhoneInput
          value={p.whatsapp || ''}
          onChange={v => updatePersonal({ whatsapp: v })}
          countryCode={countryCode}
          label="WhatsApp"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email *</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="email" value={p.email} onChange={e => updatePersonal({ email: e.target.value })} className={inputClass('email') + ' pl-10'} placeholder="admin@ecole.ci" />
        </div>
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Mot de passe *</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="password" value={p.password} onChange={e => updatePersonal({ password: e.target.value })} className={inputClass('password') + ' pl-10'} placeholder="••••••••" />
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Confirmer *</label>
          <input type="password" value={p.confirmPassword} onChange={e => updatePersonal({ confirmPassword: e.target.value })} className={inputClass('confirmPassword')} placeholder="••••••••" />
          {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button onClick={prevStep} className="flex-1 py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Retour
        </button>
        <button onClick={handleNext} className="flex-[2] py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all group">
          Continuer <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
