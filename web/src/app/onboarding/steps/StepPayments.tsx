'use client';

import { useState } from 'react';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import StepCard from '@/components/onboarding/StepCard';
import { CreditCard, Key, Eye, EyeOff, CheckCircle, AlertTriangle } from 'lucide-react';

const MONEY_FUSION_URL_REGEX = /^https:\/\/pay\.moneyfusion\.net\/([^/]+)\/([^/]+)\/pay\/?$/;

const inputClass = (field: string, focused: string) =>
  `w-full px-4 py-3.5 bg-white rounded-xl border-2 transition-all duration-300 outline-none text-slate-900 text-[15px]
   ${focused === field ? 'border-[#4F46E5] bg-white shadow-sm shadow-[#4F46E5]/5' : 'border-slate-200 hover:border-slate-300'}`;

const labelClass = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2';

export default function StepPayments() {
  const { data, updatePayments, nextStep } = useOnboarding();
  const [focused, setFocused] = useState('');
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

  return (
    <StepCard
      title="Paiements"
      subtitle="Configurez Money Fusion pour recevoir les paiements de scolarité."
      icon="💰"
      onNext={nextStep}
    >
      <div className="space-y-5">
        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <CreditCard size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-800">Passerelle unique: Money Fusion</p>
            <p className="text-xs text-blue-600 mt-1">
              Les paiements vont directement sur votre compte Money Fusion. EduCI ne manipule jamais les fonds.
              L'URL est chiffrée et sécurisée.
            </p>
          </div>
        </div>

        {/* Money Fusion Config */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center">
              <Key size={16} className="text-[#4F46E5]" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Configuration Money Fusion</p>
              <p className="text-[10px] text-slate-400">Entrez l'URL de paiement de votre compte</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className={labelClass}>URL de paiement Money Fusion</label>
              <div className="relative">
                <input
                  type={showUrl ? 'text' : 'password'}
                  value={paymentUrl}
                  onChange={(e) => { updatePayments({ moneyFusionUrl: e.target.value }); validateUrl(e.target.value); }}
                  onFocus={() => setFocused('url')} onBlur={() => setFocused('')}
                  className={inputClass('url', focused) + ' pr-10 font-mono text-sm'}
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
              Vous trouverez cette URL dans votre tableau de bord Money Fusion, section "Intégration API".
              Vous pouvez aussi configurer cela plus tard dans les paramètres.
            </p>
          </div>
        </div>
      </div>
    </StepCard>
  );
}
