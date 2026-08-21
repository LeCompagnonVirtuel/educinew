'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

type Phase = 'loading' | 'form' | 'success' | 'expired' | 'invalid' | 'used';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<Phase>('loading');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleAuth = async () => {
      const code = searchParams.get('code');
      const tokenHash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      const errorCode = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (errorCode) {
        if (errorDescription?.includes('expired')) {
          setPhase('expired');
        } else if (errorDescription?.includes('already been used') || errorDescription?.includes('used')) {
          setPhase('used');
        } else {
          setPhase('invalid');
        }
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          if (error.message?.includes('expired') || error.message?.includes('invalid')) {
            setPhase('expired');
          } else {
            setPhase('invalid');
          }
          return;
        }
        setPhase('form');
        return;
      }

      if (tokenHash && type === 'recovery') {
        const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'recovery' });
        if (error) {
          if (error.message?.includes('expired')) {
            setPhase('expired');
          } else if (error.message?.includes('used')) {
            setPhase('used');
          } else {
            setPhase('invalid');
          }
          return;
        }
        setPhase('form');
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setPhase('form');
        return;
      }

      setPhase('invalid');
    };

    handleAuth();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = resetPasswordSchema.safeParse({ password, confirmPassword });
    if (!result.success) {
      setError(result.error.issues[0]?.message || 'Données invalides');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      await supabase.auth.signOut();
      setPhase('success');
    } catch (err: any) {
      if (err?.message?.includes('same as')) {
        setError('Le nouveau mot de passe doit être différent de l\'ancien.');
      } else {
        setError(err?.message || 'Erreur lors de la mise à jour du mot de passe.');
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthLabel = () => {
    const s = passwordStrength();
    if (s <= 1) return { text: 'Faible', color: 'bg-red-500' };
    if (s <= 2) return { text: 'Moyen', color: 'bg-orange-500' };
    if (s <= 3) return { text: 'Bon', color: 'bg-yellow-500' };
    return { text: 'Excellent', color: 'bg-green-500' };
  };

  if (phase === 'loading') {
    return (
      <AuthLayout>
        <div className="text-center py-12">
          <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-sm text-gray-500">Vérification du lien de réinitialisation...</p>
        </div>
      </AuthLayout>
    );
  }

  if (phase === 'expired') {
    return (
      <AuthLayout>
        <div className="text-center space-y-5">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Lien expiré</h2>
          <p className="text-sm text-gray-600 max-w-sm mx-auto">
            Ce lien de réinitialisation a expiré. Les liens sont valables pendant 1 heure pour des raisons de sécurité.
          </p>
          <div className="space-y-3 pt-2">
            <Link
              href="/forgot-password"
              className="block w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-center"
            >
              Demander un nouveau lien
            </Link>
            <Link
              href="/auth/select-role"
              className="block text-sm text-primary hover:underline"
            >
              Retour à la connexion
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (phase === 'used') {
    return (
      <AuthLayout>
        <div className="text-center space-y-5">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Lien déjà utilisé</h2>
          <p className="text-sm text-gray-600 max-w-sm mx-auto">
            Ce lien a déjà été utilisé. Chaque lien de réinitialisation est à usage unique pour votre sécurité.
          </p>
          <div className="space-y-3 pt-2">
            <Link
              href="/auth/select-role"
              className="block w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-center"
            >
              Se connecter
            </Link>
            <Link
              href="/forgot-password"
              className="block text-sm text-gray-500 hover:text-primary hover:underline"
            >
              Demander un nouveau lien
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (phase === 'invalid') {
    return (
      <AuthLayout>
        <div className="text-center space-y-5">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Lien invalide</h2>
          <p className="text-sm text-gray-600 max-w-sm mx-auto">
            Ce lien de réinitialisation est invalide. Il a peut-être été modifié ou est incomplet.
          </p>
          <div className="space-y-3 pt-2">
            <Link
              href="/forgot-password"
              className="block w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-center"
            >
              Demander un nouveau lien
            </Link>
            <Link
              href="/auth/select-role"
              className="block text-sm text-gray-500 hover:text-primary hover:underline"
            >
              Retour à la connexion
            </Link>
            <a
              href="mailto:support@educi.live"
              className="block text-sm text-gray-400 hover:text-primary hover:underline"
            >
              Contacter le support
            </a>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (phase === 'success') {
    return (
      <AuthLayout>
        <div className="text-center space-y-5">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Mot de passe mis à jour !</h2>
          <p className="text-sm text-gray-600">
            Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
          </p>
          <Link
            href="/auth/select-role"
            className="block w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-center"
          >
            Se connecter
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Nouveau mot de passe</h1>
          <p className="text-sm text-gray-500 mt-1">
            Choisissez un mot de passe sécurisé pour votre compte.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2" role="alert">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Nouveau mot de passe
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none"
              placeholder="Minimum 8 caractères"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>

          {password.length > 0 && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i < passwordStrength() ? strengthLabel().color : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Force : <span className="font-medium">{strengthLabel().text}</span>
              </p>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmer le mot de passe
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none ${
              confirmPassword && confirmPassword !== password
                ? 'border-red-300 bg-red-50/50'
                : 'border-gray-300'
            }`}
            placeholder="Retapez le mot de passe"
          />
          {confirmPassword && confirmPassword !== password && (
            <p className="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 space-y-1">
          <p className="font-medium text-gray-700">Le mot de passe doit contenir :</p>
          <p className={password.length >= 8 ? 'text-green-600' : ''}>
            {password.length >= 8 ? '✓' : '○'} Au moins 8 caractères
          </p>
          <p className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
            {/[A-Z]/.test(password) ? '✓' : '○'} Au moins une majuscule
          </p>
          <p className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
            {/[0-9]/.test(password) ? '✓' : '○'} Au moins un chiffre
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || password.length < 8 || password !== confirmPassword}
          className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Mise à jour en cours...
            </span>
          ) : (
            'Mettre à jour le mot de passe'
          )}
        </button>

        <div className="text-center">
          <Link href="/auth/select-role" className="text-sm text-gray-500 hover:text-primary hover:underline transition-colors">
            Retour à la connexion
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
