'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EduCILogo from '@/components/brand/EduCILogo';
import {
  Mail, CheckCircle, AlertTriangle, Clock, ArrowRight,
  RefreshCw, Shield, Building2, Loader2, Sparkles,
  Database, Users, Palette, QrCode, Settings, Bell,
  FolderOpen, Key, FileText, Wifi, Cpu,
} from 'lucide-react';

type VerifyStatus = 'loading' | 'verifying' | 'activating' | 'success' | 'no_token' | 'expired' | 'invalid' | 'already_verified';

const activationSteps = [
  { label: 'Validation du token', icon: Shield },
  { label: 'Activation du compte', icon: Users },
  { label: 'Création de l\'établissement', icon: Building2 },
  { label: 'Configuration du branding', icon: Palette },
  { label: 'Initialisation de la base de données', icon: Database },
  { label: 'Création des QR Codes', icon: QrCode },
  { label: 'Configuration des modules', icon: Settings },
  { label: 'Activation des notifications', icon: Bell },
  { label: 'Création du stockage', icon: FolderOpen },
  { label: 'Configuration des permissions', icon: Key },
  { label: 'Création des templates', icon: FileText },
  { label: 'Synchronisation temps réel', icon: Wifi },
  { label: 'Configuration EduCI AI', icon: Cpu },
  { label: 'Finalisation', icon: CheckCircle },
];

export default function VerificationPage() {
  const router = useRouter();
  const [status, setStatus] = useState<VerifyStatus>('loading');
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendEmail, setResendEmail] = useState('');
  const [draftId, setDraftId] = useState<string | null>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [globalProgress, setGlobalProgress] = useState(0);
  const hasVerified = useRef(false);

  // Countdown for success redirect (only if no magic link is handling it)
  useEffect(() => {
    if (status !== 'success') return;
    // If magic link redirect is in progress, don't compete with it
    if (typeof window !== 'undefined' && (window as any).__educi_magic_redirect) return;
    if (countdown <= 0) { router.push('/login'); return; }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, countdown, router]);

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Verify token from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (hasVerified.current) return;
    const search = new URLSearchParams(window.location.search);
    const token = search.get('token');
    const draftIdParam = search.get('id');
    if (draftIdParam) setDraftId(draftIdParam);
    if (!token) { setStatus('no_token'); return; }
    hasVerified.current = true;
    verifyToken(token, draftIdParam);
  }, []);

  const verifyToken = async (token: string, draftId?: string | null) => {
    setStatus('verifying');

    try {
      const response = await fetch('/api/registration/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, draftId }),
      });

      const data = await response.json();

      // Handle already active account
      if (data.alreadyActive || data.code === 'ALREADY_ACTIVE') {
        setStatus('already_verified');
        setSchoolName(data.schoolName || '');
        if (data.schoolId) {
          localStorage.setItem('educi_school_id', data.schoolId);
        }
        return;
      }

      if (!response.ok) {
        if (data.code === 'EXPIRED' || data.code === 'HASH_MISMATCH') {
          setStatus('expired');
          if (data.email) setResendEmail(data.email);
          return;
        }
        if (data.code === 'TOKEN_CONSUMED') {
          setStatus('already_verified');
          return;
        }
        setStatus('invalid'); setMessage(data.error || 'Lien invalide.'); return;
      }

      // Success - animate activation steps
      setUserName(data.email?.split('@')[0] || '');
      setUserEmail(data.email || '');
      setSchoolName(data.schoolName || '');
      setSchoolCode(data.schoolCode || '');
      setStatus('activating');

      // Animate activation steps
      for (let i = 0; i < activationSteps.length; i++) {
        setCurrentStepIdx(i);
        await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
        setCompletedSteps(prev => [...prev, i]);
        setGlobalProgress(Math.round(((i + 1) / activationSteps.length) * 100));
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      setStatus('success');

      // Auto-login via magic link
      if (data.magicLink) {
        try {
          localStorage.setItem('educi_school_id', data.schoolId);
          localStorage.setItem('educi_onboarding_completed', 'false');
          (window as any).__educi_magic_redirect = true;
          setTimeout(() => {
            window.location.href = data.magicLink;
          }, 2000);
        } catch {
          localStorage.setItem('educi_school_id', data.schoolId);
        }
      } else {
        // No magic link — store school info and let middleware handle redirect
        localStorage.setItem('educi_school_id', data.schoolId);
        localStorage.setItem('educi_onboarding_completed', 'false');
      }
    } catch {
      setStatus('invalid');
      setMessage('Erreur de connexion. Réessayez.');
    }
  };

  const handleResend = async () => {
    const email = resendEmail || userEmail;
    if (!email || resendCooldown > 0) return;
    setResending(true); setResendSuccess(false);
    try {
      const body: Record<string, string> = { email };
      if (draftId) body.draftId = draftId;
      const response = await fetch('/api/registration/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (response.ok) { setResendSuccess(true); setResendCooldown(60); }
      else { const data = await response.json(); setMessage(data.error || 'Erreur.'); }
    } catch { setMessage('Erreur de connexion.'); }
    setTimeout(() => { setResending(false); setResendSuccess(false); }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <style>{`
        @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes scaleIn{0%{transform:scale(.7);opacity:0}70%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}
        @keyframes pulseRing{0%{transform:scale(.8);opacity:.6}100%{transform:scale(1.4);opacity:0}}
        .anim-slide-up{animation:slideUp .6s cubic-bezier(.16,1,.3,1) forwards}
        .anim-fade-in{animation:fadeIn .5s ease forwards}
        .anim-scale-in{animation:scaleIn .5s cubic-bezier(.34,1.56,.64,1) forwards}
        .anim-pulse-ring{animation:pulseRing 1.5s ease-out infinite}
      `}</style>

      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <EduCILogo size="lg" />
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* LOADING / VERIFYING */}
            {(status === 'loading' || status === 'verifying') && (
              <div className="text-center space-y-6 anim-fade-in">
                <div className="relative mx-auto w-20 h-20">
                  <div className="absolute inset-0 rounded-full bg-indigo-100 anim-pulse-ring" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center border-2 border-indigo-200">
                    <Loader2 size={32} className="text-[#4F46E5] animate-spin" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{status === 'verifying' ? 'Vérification en cours…' : 'Chargement…'}</h2>
                  <p className="text-slate-500 text-sm mt-1">Validation de votre lien de confirmation</p>
                </div>
              </div>
            )}

            {/* ACTIVATING */}
            {status === 'activating' && (
              <div className="text-center space-y-6 anim-fade-in">
                <div className="relative mx-auto w-20 h-20">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4F46E5]/10 to-[#8B5CF6]/10 flex items-center justify-center border-2 border-[#4F46E5]/20">
                    <Loader2 size={32} className="text-[#4F46E5] animate-spin" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Activation en cours…</h2>
                  <p className="text-slate-500 text-sm mt-1">Nous configurons votre établissement</p>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400">Configuration</span>
                    <span className="font-bold text-[#4F46E5]">{globalProgress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] rounded-full transition-all duration-300" style={{ width: `${globalProgress}%` }} />
                  </div>
                </div>

                {/* Steps list */}
                <div className="bg-slate-50 rounded-xl p-4 text-left max-h-[240px] overflow-y-auto space-y-1.5">
                  {activationSteps.map((step, i) => {
                    const isDone = completedSteps.includes(i);
                    const isActive = i === currentStepIdx && !isDone;
                    const Icon = step.icon;
                    return (
                      <div key={i} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${isDone ? 'bg-emerald-50' : isActive ? 'bg-[#4F46E5]/5' : 'opacity-30'}`}>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isDone ? 'bg-emerald-100 text-emerald-600' : isActive ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'bg-slate-100 text-slate-400'}`}>
                          {isDone ? <CheckCircle size={12} strokeWidth={3} /> : isActive ? <Loader2 size={12} className="animate-spin" /> : <Icon size={12} />}
                        </div>
                        <span className={`text-xs font-medium ${isDone ? 'text-emerald-700' : isActive ? 'text-[#4F46E5]' : 'text-slate-400'}`}>{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* NO TOKEN */}
            {status === 'no_token' && (
              <div className="text-center space-y-6 anim-fade-in">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center mx-auto border-2 border-indigo-200">
                  <Mail size={32} className="text-[#4F46E5]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Vérifiez votre e-mail</h2>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1">
                    Nous vous avons envoyé un lien de confirmation. Cliquez sur le bouton dans l&apos;e-mail pour activer votre compte.
                  </p>
                </div>
                <div className="space-y-3">
                  <input type="email" value={resendEmail} onChange={e => setResendEmail(e.target.value)} placeholder="votre@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent outline-none text-sm" />
                  <button onClick={handleResend} disabled={resending || resendCooldown > 0 || !resendEmail}
                    className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {resending ? <><Loader2 size={16} className="animate-spin" /> Envoi…</> : resendSuccess ? <><CheckCircle size={16} className="text-emerald-600" /> Lien renvoyé !</> : resendCooldown > 0 ? `Renvoyer dans ${resendCooldown}s` : <><RefreshCw size={16} /> Renvoyer le lien</>}
                  </button>
                  <Link href="/register" className="w-full py-3.5 border-2 border-slate-200 text-slate-700 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-slate-50 transition-all">
                    Retour à l&apos;inscription
                  </Link>
                </div>
                <p className="text-xs text-slate-400">Le lien expire dans 24 heures. Vérifiez aussi vos spams.</p>
              </div>
            )}

            {/* SUCCESS */}
            {status === 'success' && (
              <div className="text-center space-y-6 anim-scale-in">
                <div className="relative mx-auto w-28 h-28">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center border-4 border-emerald-100 shadow-lg shadow-emerald-100/50">
                    <CheckCircle size={56} className="text-emerald-500" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Établissement activé !</h2>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1">Votre compte et votre établissement sont maintenant opérationnels.</p>
                </div>
                {(userName || schoolName) && (
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/60 rounded-2xl p-5 space-y-3 text-left shadow-sm">
                    {schoolName && <div className="flex items-center justify-between text-sm py-2.5 border-b border-emerald-200/40"><span className="text-slate-500 flex items-center gap-2"><Building2 size={14} /> Établissement</span><span className="font-semibold text-slate-900">{schoolName}</span></div>}
                    {schoolCode && <div className="flex items-center justify-between text-sm py-2.5 border-b border-emerald-200/40"><span className="text-slate-500">Code</span><span className="font-mono font-semibold text-slate-900 text-xs">{schoolCode}</span></div>}
                    {userEmail && <div className="flex items-center justify-between text-sm py-2.5"><span className="text-slate-500 flex items-center gap-2"><Mail size={14} /> Email</span><span className="font-semibold text-slate-900 text-xs">{userEmail}</span></div>}
                  </div>
                )}
                <div className="space-y-3">
                  <button onClick={() => router.push('/onboarding')} className="w-full py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-[15px] font-semibold shadow-lg shadow-indigo-200/50 hover:shadow-xl transition-all active:scale-[0.98] group">
                    Configurer mon établissement <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-xs text-slate-400">Redirection automatique dans {countdown > 0 ? `${countdown}s` : '…'}</p>
                </div>
              </div>
            )}

            {/* EXPIRED */}
            {status === 'expired' && (
              <div className="text-center space-y-6 anim-slide-up">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center mx-auto border-4 border-amber-100">
                  <Clock size={34} className="text-amber-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Lien expiré</h2>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1">Ce lien de confirmation a expiré. Demandez un nouveau lien.</p>
                </div>
                <button onClick={handleResend} disabled={resending || resendCooldown > 0}
                  className="w-full py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-[15px] font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50">
                  {resending ? <><Loader2 size={18} className="animate-spin" /> Envoi…</> : resendSuccess ? <><CheckCircle size={18} /> Lien renvoyé !</> : <><RefreshCw size={18} /> Renvoyer un e-mail</>}
                </button>
                {resendCooldown > 0 && <p className="text-xs text-slate-400">Renvoyer dans {resendCooldown}s</p>}
              </div>
            )}

            {/* INVALID */}
            {status === 'invalid' && (
              <div className="text-center space-y-6 anim-slide-up">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center mx-auto border-4 border-red-100">
                  <AlertTriangle size={34} className="text-red-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Lien invalide</h2>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1">{message || 'Ce lien de confirmation n\'est pas valide.'}</p>
                </div>
                <Link href="/register" className="w-full py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-[15px] font-semibold shadow-lg hover:shadow-xl transition-all">
                  Retour à l&apos;inscription <ArrowRight size={18} />
                </Link>
              </div>
            )}

            {/* ALREADY VERIFIED */}
            {status === 'already_verified' && (
              <div className="text-center space-y-6 anim-slide-up">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mx-auto border-4 border-blue-100">
                  <CheckCircle size={34} className="text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Compte déjà activé</h2>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1">Votre compte est déjà actif. Connectez-vous pour continuer.</p>
                </div>
                <Link href="/login" className="w-full py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-[15px] font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.98] group">
                  Se connecter <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5"><Shield size={10} /> Vérification sécurisée — educi.live</p>
        </div>
      </div>
    </div>
  );
}
