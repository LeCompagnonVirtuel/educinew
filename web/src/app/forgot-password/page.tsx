'use client';

import { useState } from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, Shield } from 'lucide-react';
import { sbAuth } from '@/lib/api';
import { useLanguage } from '@/hooks/useLanguage';
import AuthLayout from '@/components/auth/AuthLayout';

const emailSchema = z.object({
  email: z.string().email('Adresse email invalide'),
});

export default function ForgotPasswordPage() {
  const { lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse({ email: email.trim() });
    if (!result.success) {
      setError(result.error.issues[0]?.message || (lang === 'fr' ? 'Adresse email invalide.' : 'Invalid email address.'));
      return;
    }
    setLoading(true);
    setError('');
    try {
      await sbAuth.forgotPassword(email.trim());
      setSent(true);
    } catch (err: any) {
      setError(err.message || (lang === 'fr' ? 'Une erreur est survenue.' : 'An error occurred.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      visualGradient="from-slate-800 via-slate-700 to-slate-900"
      visualIcon="🔐"
      visualTitle={lang === 'fr' ? 'Sécurité des accès' : 'Access Security'}
      visualSubtitle={lang === 'fr' ? 'Réinitialisez votre mot de passe en toute sécurité.' : 'Reset your password securely.'}
    >
      {sent ? (
        /* Success State */
        <div className={`text-center transition-all duration-500 ${sent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#111827] mb-2">
            {lang === 'fr' ? 'Email envoyé !' : 'Email Sent!'}
          </h1>
          <p className="text-sm text-[#6B7280] mb-8 max-w-xs mx-auto leading-relaxed">
            {lang === 'fr'
              ? 'Si un compte existe avec cette adresse, vous recevrez un lien de réinitialisation dans quelques minutes.'
              : 'If an account exists with this address, you will receive a reset link within a few minutes.'}
          </p>
          <Link
            href="/auth/select-role"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            {lang === 'fr' ? 'Retour à la connexion' : 'Back to Login'}
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        /* Form State */
        <div>
          <div className="mb-8">
            {/* Security icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center mb-5 border border-slate-200/60">
              <Shield size={26} className="text-slate-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight mb-2">
              {lang === 'fr' ? 'Mot de passe oublié ?' : 'Forgot Password?'}
            </h1>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              {lang === 'fr'
                ? 'Entrez votre adresse email et nous vous enverrons un lien de réinitialisation.'
                : 'Enter your email and we\'ll send you a reset link.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div role="alert" className="bg-red-50 border border-red-100 text-red-600 px-4 py-3.5 rounded-xl text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                {lang === 'fr' ? 'Adresse email' : 'Email Address'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={`w-full px-4 py-3.5 bg-white rounded-xl border-2 transition-all duration-200 outline-none text-[#111827] text-[15px]
                  ${focused
                    ? 'border-[#4F46E5] bg-white'
                    : 'border-slate-200 hover:border-slate-300'
                  }`}
                placeholder={lang === 'fr' ? 'nom@ecole.edu' : 'name@school.edu'}
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white rounded-xl flex items-center justify-center gap-2 text-[15px] font-semibold shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {lang === 'fr' ? 'Envoi...' : 'Sending...'}
                </span>
              ) : (
                <>
                  {lang === 'fr' ? 'Envoyer le lien' : 'Send Reset Link'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/auth/select-role" className="inline-flex items-center gap-1.5 text-sm text-[#4F46E5] font-semibold hover:underline transition-colors">
              <ChevronLeft size={16} />
              {lang === 'fr' ? 'Retour à la connexion' : 'Back to Login'}
            </Link>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
