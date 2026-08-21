'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Lock, Mail, RefreshCw, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthSkeleton from '@/components/auth/AuthSkeleton';
import EduCILogo from '@/components/brand/EduCILogo';

const loginSchema = z.object({
  identifier: z.string().min(1, 'L\'identifiant est requis'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

interface RoleLoginPageProps {
  role: 'admin' | 'teacher' | 'parent' | 'student';
  icon: string;
  gradient: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  fieldLabelFr: string;
  fieldLabelEn: string;
  fieldPlaceholder: string;
  fieldType: 'email' | 'text';
  showForgotPassword: boolean;
}

export default function RoleLoginPage(props: RoleLoginPageProps) {
  const { login: authLogin } = useAuth();
  const { lang } = useLanguage();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [attempts, setAttempts] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return parseInt(sessionStorage.getItem('login_attempts') || '0', 10);
  });
  const [lockedUntil, setLockedUntil] = useState<number | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = sessionStorage.getItem('login_lock_until');
    if (stored) {
      const until = parseInt(stored, 10);
      return until > Date.now() ? until : null;
    }
    return null;
  });
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const MAX_ATTEMPTS = 5;
  const LOCKOUT_MS = 15 * 60 * 1000;

  useEffect(() => {
    setMounted(true);
    const savedIdentifier = localStorage.getItem('educi_remembered_identifier');
    if (savedIdentifier) {
      setIdentifier(savedIdentifier);
      setRememberMe(true);
    }
  }, [props.role]);

  const handleResendConfirmation = async () => {
    setResendingEmail(true);
    setResendSuccess(false);
    try {
      let email = identifier;
      if (!identifier.includes('@')) {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data: resolved } = await supabase.rpc('resolve_login_identifier', {
          p_identifier: identifier,
        });
        const resolvedEmail = Array.isArray(resolved) ? resolved[0]?.email : resolved;
        if (resolvedEmail) email = resolvedEmail;
      }
      const response = await fetch('/api/auth/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setResendSuccess(true);
      }
    } catch {}
    setTimeout(() => {
      setResendingEmail(false);
      setResendSuccess(false);
    }, 5000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedUntil && lockedUntil > Date.now()) {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 60000);
      setError(lang === 'fr' ? `Trop de tentatives. Réessayez dans ${remaining} min.` : `Too many attempts. Try again in ${remaining} min.`);
      return;
    }
    const result = loginSchema.safeParse({ identifier: identifier.trim(), password });
    if (!result.success) {
      setError(result.error.issues[0]?.message || (lang === 'fr' ? 'Veuillez remplir tous les champs.' : 'Please fill in all fields.'));
      return;
    }
    setLoading(true);
    setError('');
    setEmailNotConfirmed(false);
    try {
      await authLogin(identifier.trim(), password);
      if (rememberMe) {
        localStorage.setItem('educi_remembered_identifier', identifier.trim());
      } else {
        localStorage.removeItem('educi_remembered_identifier');
      }
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('login_lock_until');
        sessionStorage.removeItem('login_attempts');
      }
      setSuccess(true);
    } catch (err: any) {
      let msg = typeof err === 'string' ? err : (err?.message || err?.error_description || (typeof err?.error === 'string' ? err.error : '') || '');
      if (typeof msg !== 'string') msg = '';
      if (!msg || msg === '{}') msg = lang === 'fr' ? 'Identifiants incorrects' : 'Invalid credentials';
      if (msg.includes('Email not confirmed') || msg.includes('email not confirmed') || msg.includes('non confirmé') || msg.includes('non vérifié')) {
        setEmailNotConfirmed(true);
        msg = lang === 'fr'
          ? 'Votre email n\'a pas encore été confirmé. Vérifiez votre boîte de réception.'
          : 'Your email has not been confirmed yet. Check your inbox.';
      } else if (msg.includes('401') || msg.includes('Invalid') || msg.includes('invalid') || msg.includes('Identifiants') || msg.includes('Invalid login credentials')) {
        msg = lang === 'fr' ? 'Identifiants incorrects' : 'Invalid credentials';
      } else if (msg.includes('locked') || msg.includes('verrouillé')) {
        msg = lang === 'fr' ? 'Compte verrouillé. Réessayez plus tard.' : 'Account locked. Try again later.';
      } else if (msg.includes('not activated') || msg.includes('non activé')) {
        setEmailNotConfirmed(true);
        msg = lang === 'fr' ? 'Compte non activé. Vérifiez votre email.' : 'Account not activated. Check your email.';
      } else if (msg.includes('supprimé')) {
        msg = lang === 'fr' ? 'Ce compte a été supprimé.' : 'This account has been deleted.';
      } else if (msg.includes('serveur') || msg.includes('500') || msg.includes('Impossible de contacter') || msg.includes('fetch')) {
        msg = lang === 'fr' ? 'Service temporairement indisponible.' : 'Service temporarily unavailable.';
      }
      setError(msg);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('login_attempts', String(newAttempts));
      }
      if (newAttempts >= MAX_ATTEMPTS) {
        const lockTime = Date.now() + LOCKOUT_MS;
        setLockedUntil(lockTime);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('login_lock_until', String(lockTime));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      visualGradient={props.gradient}
      visualIcon={props.icon}
      visualTitle={props.titleFr}
      visualSubtitle={props.descFr}
    >
      <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {!mounted ? (
          <AuthSkeleton />
        ) : (
          <>
        {/* Mobile header */}
        <div className="lg:hidden flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity" aria-label="EduCI - Retour à l'accueil">
            <EduCILogo size="lg" theme="light" />
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          {lang === 'fr' ? 'Connexion' : 'Sign In'}
        </h1>
        <p className="mt-2 text-slate-500 text-[15px]">
          {lang === 'fr' ? props.descFr : props.descEn}
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          {error && (
            <div role="alert" className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              {error}
            </div>
          )}

          {emailNotConfirmed && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-amber-800">
                    {lang === 'fr' ? 'Email non confirmé' : 'Email not confirmed'}
                  </p>
                  <p className="text-xs text-amber-600">
                    {lang === 'fr'
                      ? 'Vous devez confirmer votre email avant de vous connecter.'
                      : 'You must confirm your email before signing in.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResendConfirmation}
                disabled={resendingEmail}
                className="w-full py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {resendingEmail ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full" />
                    {lang === 'fr' ? 'Envoi...' : 'Sending...'}
                  </>
                ) : resendSuccess ? (
                  <>
                    <CheckCircle size={14} />
                    {lang === 'fr' ? 'Email renvoyé !' : 'Email resent!'}
                  </>
                ) : (
                  <>
                    <RefreshCw size={14} />
                    {lang === 'fr' ? 'Renvoyer l\'email de confirmation' : 'Resend confirmation email'}
                  </>
                )}
              </button>
            </div>
          )}

          {/* Email/Identifier */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {lang === 'fr' ? props.fieldLabelFr : props.fieldLabelEn}
            </label>
            <input
              type={props.fieldType}
              value={identifier}
              onChange={(e) => { setIdentifier(e.target.value); setError(''); }}
              onFocus={() => setFocusedField('identifier')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 outline-none text-slate-900 text-[15px] bg-slate-50/50
                ${focusedField === 'identifier'
                  ? 'border-primary bg-white shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
                }`}
              placeholder={props.fieldPlaceholder}
              required
              autoComplete="username"
              autoFocus={!identifier}
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-700">
                {lang === 'fr' ? 'Mot de passe' : 'Password'}
              </label>
              {props.showForgotPassword && (
                <Link href="/forgot-password" className="text-sm font-medium text-primary hover:text-primary-700 transition-colors">
                  {lang === 'fr' ? 'Mot de passe oublié ?' : 'Forgot?'}
                </Link>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 outline-none text-slate-900 text-[15px] pr-12 bg-slate-50/50
                  ${focusedField === 'password'
                    ? 'border-primary bg-white shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                  }`}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? (lang === 'fr' ? 'Masquer le mot de passe' : 'Hide password') : (lang === 'fr' ? 'Afficher le mot de passe' : 'Show password')}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer"
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                {lang === 'fr' ? 'Se souvenir de moi' : 'Remember me'}
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || success}
            className={`w-full py-3.5 bg-gradient-to-r ${success ? 'from-emerald-500 to-emerald-600' : props.gradient} text-white rounded-xl flex items-center justify-center gap-2 text-[15px] font-semibold
              shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 active:scale-[0.98] disabled:opacity-80 group`}
          >
            {success ? (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {lang === 'fr' ? 'Redirection...' : 'Redirecting...'}
              </>
            ) : loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {lang === 'fr' ? 'Connexion...' : 'Signing in...'}
              </>
            ) : (
              <>
                {lang === 'fr' ? 'Se connecter' : 'Sign In'}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Security note - simple, no borders/lines */}
        <p className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <Lock size={12} className="text-emerald-500" />
          {lang === 'fr' ? 'Connexion chiffrée et sécurisée' : 'Encrypted secure connection'}
        </p>

        {/* Switch role */}
        <p className="mt-4 text-center">
          <Link href="/auth/select-role" className="text-sm text-slate-500 hover:text-primary transition-colors">
            ← {lang === 'fr' ? 'Changer d\'espace' : 'Different role?'}
          </Link>
        </p>
        </>
        )}
      </div>
    </AuthLayout>
  );
}
