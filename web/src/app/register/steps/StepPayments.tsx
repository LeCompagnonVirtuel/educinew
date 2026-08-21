'use client';

import { useState } from 'react';
import { useRegistration } from '@/components/registration/RegistrationContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CreditCard, Eye, EyeOff, CheckCircle, AlertTriangle, Shield } from 'lucide-react';

const MONEY_FUSION_URL_REGEX = /^https:\/\/pay\.moneyfusion\.net\/([^/]+)\/([^/]+)\/pay\/?$/;

export default function StepPayments() {
  const { data, updatePayments, nextStep, prevStep } = useRegistration();
  const [showUrl, setShowUrl] = useState(false);
  const [urlError, setUrlError] = useState('');

  const paymentUrl = (data.payments as any).moneyFusionUrl || '';

  const validateUrl = (url: string) => {
    if (!url) { setUrlError(''); return; }
    if (!MONEY_FUSION_URL_REGEX.test(url.trim())) {
      setUrlError('Format attendu: https://pay.moneyfusion.net/{businessname}/{token}/pay/');
    } else {
      setUrlError('');
    }
  };

  const isValid = paymentUrl && MONEY_FUSION_URL_REGEX.test(paymentUrl.trim());

  const inputClass = 'w-full px-4 py-3.5 bg-white rounded-xl border-2 border-slate-200 focus:border-[#4F46E5] hover:border-slate-300 transition-all duration-200 outline-none text-slate-900 text-sm';

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Paiements</h2>
        <p className="text-sm text-slate-500">Configurez Money Fusion pour recevoir les paiements de scolarité.</p>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Shield size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-blue-800">Paiements sécurisés via Money Fusion</p>
          <p className="text-xs text-blue-600 mt-1">
            Les paiements vont directement sur votre compte Money Fusion.
            Supporte Mobile Money (Orange, MTN, Wave, Moov) et cartes bancaires.
          </p>
        </div>
      </div>

      {/* Money Fusion URL */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">💰</span>
          <div>
            <p className="text-sm font-bold text-slate-900">Money Fusion</p>
            <p className="text-[10px] text-slate-400">Passerelle de paiement unique</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">URL de paiement</label>
            <div className="relative">
              <input
                type={showUrl ? 'text' : 'password'}
                value={paymentUrl}
                onChange={e => { updatePayments({ moneyFusionUrl: e.target.value } as any); validateUrl(e.target.value); }}
                className={inputClass + ' pr-10 font-mono'}
                placeholder="https://pay.moneyfusion.net/{businessname}/{token}/pay/"
              />
              <button type="button" onClick={() => setShowUrl(!showUrl)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showUrl ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {urlError && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertTriangle size={12} /> {urlError}</p>}
            {isValid && <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1"><CheckCircle size={12} /> URL Money Fusion valide</p>}
          </div>

          <p className="text-xs text-slate-400">
            Vous pouvez aussi configurer cela plus tard dans Paramètres → Paiements.
          </p>
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
