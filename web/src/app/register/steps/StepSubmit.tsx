'use client';

import { useState, useEffect, useRef } from 'react';
import { useRegistration } from '@/components/registration/RegistrationContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, Loader2, AlertTriangle, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';

type SubmitStatus = 'idle' | 'submitting' | 'email_sent' | 'error';

export default function StepSubmit() {
  const { data, submitRegistration, isSubmitting, prevStep } = useRegistration();
  const router = useRouter();
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resending, setResending] = useState(false);
  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSubmit = async () => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    setStatus('submitting');
    setError('');

    const result = await submitRegistration();

    if (result.success) {
      setEmail(result.email || data.personal.email);
      setStatus('email_sent');
    } else {
      setError(result.error || 'Erreur lors de la soumission');
      setStatus('error');
      hasSubmitted.current = false;
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !email) return;
    setResending(true);
    try {
      await fetch('/api/registration/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setResendCooldown(60);
    } catch (e) {
      console.error('[StepSubmit] Resend failed:', e);
    }
    setResending(false);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center py-6 space-y-6">
      {/* Idle state - show submit button */}
      {status === 'idle' && (
        <>
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] flex items-center justify-center mx-auto shadow-2xl shadow-[#4F46E5]/30">
            <Sparkles size={36} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Tout est prêt !</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Cliquez sur le bouton ci-dessous pour créer votre compte et envoyer l'email de confirmation.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 text-left max-w-sm mx-auto">
            <p className="text-xs text-slate-500 mb-1">Email de confirmation envoyé à :</p>
            <p className="text-sm font-semibold text-slate-800">{data.personal.email}</p>
          </div>

          <div className="space-y-3">
            <button onClick={handleSubmit} disabled={isSubmitting}
              className="w-full max-w-sm mx-auto py-4 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-[15px] font-semibold shadow-xl hover:shadow-2xl transition-all disabled:opacity-60 group">
              {isSubmitting ? (
                <><Loader2 size={18} className="animate-spin" /> Création en cours…</>
              ) : (
                <>Créer mon compte et envoyer l'email <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
            <button onClick={prevStep} className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
              ← Revenir au résumé
            </button>
          </div>
        </>
      )}

      {/* Submitting state */}
      {status === 'submitting' && (
        <>
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-indigo-100 animate-ping opacity-30" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center border-2 border-indigo-200">
              <Loader2 size={36} className="text-[#4F46E5] animate-spin" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Création de votre compte…</h2>
            <p className="text-sm text-slate-500">Veuillez patienter quelques instants.</p>
          </div>
        </>
      )}

      {/* Email sent state */}
      {status === 'email_sent' && (
        <>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', duration: 0.5 }}>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center mx-auto border-4 border-emerald-100 shadow-lg shadow-emerald-100/50">
              <Mail size={40} className="text-emerald-500" />
            </div>
          </motion.div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Email de confirmation envoyé !</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Un email a été envoyé à <strong className="text-slate-700">{email}</strong>.
              Cliquez sur le lien dans l'email pour activer votre compte et votre établissement.
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200/60 rounded-2xl p-5 text-left max-w-sm mx-auto space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-emerald-500" />
              <span className="text-slate-700">Compte créé avec succès</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-emerald-500" />
              <span className="text-slate-700">Brouillon sauvegardé</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail size={16} className="text-[#4F46E5]" />
              <span className="text-slate-700">Email de confirmation envoyé</span>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={handleResend} disabled={resending || resendCooldown > 0}
              className="w-full max-w-sm mx-auto py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {resending ? (
                <><Loader2 size={16} className="animate-spin" /> Envoi…</>
              ) : resendCooldown > 0 ? (
                `Renvoyer dans ${resendCooldown}s`
              ) : (
                <><RefreshCw size={16} /> Renvoyer l'email</>
              )}
            </button>
            <p className="text-xs text-slate-400">Le lien expire dans 24 heures. Vérifiez aussi vos spams.</p>
          </div>
        </>
      )}

      {/* Error state */}
      {status === 'error' && (
        <>
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto border-4 border-red-100">
            <AlertTriangle size={34} className="text-red-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Erreur</h2>
            <p className="text-sm text-slate-500">{error}</p>
          </div>
          <div className="space-y-3">
            <button onClick={handleSubmit}
              className="w-full max-w-sm mx-auto py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              Réessayer
            </button>
            <button onClick={prevStep} className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
              ← Revenir au résumé
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
