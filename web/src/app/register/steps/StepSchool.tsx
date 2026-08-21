'use client';

import { useState } from 'react';
import { useRegistration } from '@/components/registration/RegistrationContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Building2, FileText } from 'lucide-react';

const schoolTypes = [
  { value: 'PRIMARY', label: 'Primaire', icon: '🏫', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  { value: 'SECONDARY', label: 'Collège / Lycée', icon: '🎓', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  { value: 'UNIVERSITY', label: 'Université', icon: '🏛️', color: 'bg-violet-50 text-violet-600 border-violet-200' },
  { value: 'VOCATIONAL', label: 'Formation', icon: '⚙️', color: 'bg-amber-50 text-amber-600 border-amber-200' },
];

export default function StepSchool() {
  const { data, updateSchool, nextStep, prevStep } = useRegistration();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const s = data.school;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!s.officialName || s.officialName.length < 3) errs.officialName = "Nom officiel requis (min 3 caractères)";
    if (!s.type) errs.type = "Type d'établissement requis";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => { if (validate()) nextStep(); };

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 bg-white rounded-xl border-2 transition-all duration-200 outline-none text-slate-900 text-sm ${
      errors[field] ? 'border-red-300' : 'border-slate-200 focus:border-[#4F46E5] hover:border-slate-300'
    }`;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Informations de l'établissement</h2>
        <p className="text-sm text-slate-500">Décrivez votre établissement scolaire.</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Nom officiel *</label>
        <div className="relative">
          <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={s.officialName} onChange={e => updateSchool({ officialName: e.target.value })} className={inputClass('officialName') + ' pl-10'} placeholder="Collège Moderne de Cocody" />
        </div>
        {errors.officialName && <p className="text-xs text-red-500 mt-1">{errors.officialName}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Nom commercial</label>
          <input value={s.commercialName} onChange={e => updateSchool({ commercialName: e.target.value })} className={inputClass('commercialName')} placeholder="CMC" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Acronyme</label>
          <input value={s.acronym} onChange={e => updateSchool({ acronym: e.target.value })} className={inputClass('acronym')} placeholder="CMC" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Type d'établissement *</label>
        <div className="grid grid-cols-2 gap-3">
          {schoolTypes.map(t => (
            <button key={t.value} onClick={() => updateSchool({ type: t.value })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${s.type === t.value ? t.color + ' border-current' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
              <span className="text-2xl block mb-1">{t.icon}</span>
              <p className="text-sm font-bold text-slate-700">{t.label}</p>
            </button>
          ))}
        </div>
        {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Visibilité</label>
          <select value={s.visibility} onChange={e => updateSchool({ visibility: e.target.value })} className={inputClass('visibility')}>
            <option value="PRIVE">Privé</option>
            <option value="PUBLIC">Public</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Ministère de tutelle</label>
          <input value={s.ministry} onChange={e => updateSchool({ ministry: e.target.value })} className={inputClass('ministry')} placeholder="MENET" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">N° RCCM</label>
          <div className="relative">
            <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={s.rccm} onChange={e => updateSchool({ rccm: e.target.value })} className={inputClass('rccm') + ' pl-10'} placeholder="CI-ABJ-0000" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">N° Fiscal</label>
          <input value={s.taxNumber} onChange={e => updateSchool({ taxNumber: e.target.value })} className={inputClass('taxNumber')} placeholder="12345678" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Date création</label>
          <input type="date" value={s.creationDate} onChange={e => updateSchool({ creationDate: e.target.value })} className={inputClass('creationDate')} />
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
