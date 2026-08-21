'use client';

import { useRegistration } from '@/components/registration/RegistrationContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Shield, Users, Lock, Smartphone } from 'lucide-react';

export default function StepSecurity() {
  const { data, updateSecurity, nextStep, prevStep } = useRegistration();
  const s = data.security;

  const inputClass = 'w-full px-4 py-3.5 bg-white rounded-xl border-2 border-slate-200 focus:border-[#4F46E5] hover:border-slate-300 transition-all duration-200 outline-none text-slate-900 text-sm';

  const levels = [
    { value: 'standard', label: 'Standard', desc: 'Protection de base', icon: Shield },
    { value: 'enhanced', label: 'Renforcé', desc: 'Sessions limitées, audit', icon: Lock },
    { value: 'maximum', label: 'Maximum', desc: '2FA obligatoire, IP whitelist', icon: Smartphone },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Sécurité et accès</h2>
        <p className="text-sm text-slate-500">Configurez les paramètres de sécurité.</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Niveau de sécurité</label>
        <div className="space-y-3">
          {levels.map(level => (
            <button key={level.value} onClick={() => updateSecurity({ securityLevel: level.value })}
              className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                s.securityLevel === level.value ? 'border-[#4F46E5] bg-[#4F46E5]/5' : 'border-slate-100 bg-white hover:border-slate-200'
              }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                s.securityLevel === level.value ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'bg-slate-100 text-slate-400'
              }`}>
                <level.icon size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{level.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{level.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Nombre max d'admins</label>
          <div className="relative">
            <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="number" min={1} max={50} value={s.maxAdmins} onChange={e => updateSecurity({ maxAdmins: parseInt(e.target.value) || 3 })} className={inputClass + ' pl-10'} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Délégation</label>
          <button onClick={() => updateSecurity({ allowDelegation: !s.allowDelegation })}
            className={`w-full px-4 py-3.5 rounded-xl border-2 text-left transition-all ${
              s.allowDelegation ? 'border-[#4F46E5] bg-[#4F46E5]/5' : 'border-slate-200 bg-white'
            }`}>
            <p className="text-sm font-medium text-slate-700">{s.allowDelegation ? 'Activée' : 'Désactivée'}</p>
            <p className="text-xs text-slate-500">Permettre aux admins de déléguer</p>
          </button>
        </div>
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
