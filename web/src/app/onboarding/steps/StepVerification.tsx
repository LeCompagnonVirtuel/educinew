'use client';

import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function StepVerification() {
  const { data, nextStep } = useOnboarding();
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    setResending(true);
    try {
      const response = await fetch('/api/auth/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.personal.email }),
      });
      if (!response.ok) {
        const d = await response.json().catch(() => ({}));
        // Error handled by response status
      }
    } catch {}
    setTimeout(() => setResending(false), 3000);
  };

  return (
    <div className="w-full max-w-lg mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#4F46E5] to-[#60A5FA] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#4F46E5]/30">
          <Mail size={36} className="text-white" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          Confirmez votre email
        </h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto mb-2">
          Un email de confirmation a été envoyé à
        </p>
        <p className="font-bold text-slate-900 text-lg mb-6">{data.personal.email}</p>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
          Cliquez sur le lien dans l&apos;email pour activer votre compte et accéder à votre espace.
          Vérifiez aussi vos spams.
        </p>

        <div className="space-y-3 max-w-sm mx-auto">
          <button
            onClick={handleResend}
            disabled={resending}
            className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} className={resending ? 'animate-spin' : ''} />
            {resending ? 'Envoi en cours...' : 'Renvoyer l\'email de confirmation'}
          </button>

          <button
            onClick={nextStep}
            className="w-full py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            Continuer vers le tableau de bord
            <ArrowRight size={18} />
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Le lien de confirmation expire dans 24 heures.
        </p>
      </motion.div>
    </div>
  );
}
