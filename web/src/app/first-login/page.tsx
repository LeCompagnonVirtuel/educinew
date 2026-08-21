'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';
import { Loader2, Eye, EyeOff, CheckCircle } from 'lucide-react';

const roleDashboards: Record<string, string> = {
  SUPER_ADMIN: '/superadmin',
  ADMIN: '/dashboard',
  COMPTABLE: '/comptable',
  SECRETAIRE: '/secretaire',
  CENSEUR: '/censeur',
  SURVEILLANT: '/surveillant',
  TEACHER: '/teacher-dashboard',
  PARENT: '/parent',
  STUDENT: '/student',
};

export default function FirstLoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [step, setStep] = useState<'password' | 'done'>('password');
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkFirstLogin = async () => {
      const supabase = createClient();
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        router.push('/login');
        return;
      }
      // Check DB first (consistent with middleware), fallback to metadata
      const { data: dbUser } = await supabase
        .from('users')
        .select('is_first_login, role')
        .eq('id', currentUser.id)
        .single();
      const isFirstLogin = dbUser?.is_first_login === true || currentUser.user_metadata?.is_first_login === true;
      if (!isFirstLogin) {
        const role = dbUser?.role || currentUser.user_metadata?.role || 'STUDENT';
        router.push(roleDashboards[role] || '/dashboard');
        return;
      }
      setUser(currentUser);
      setChecking(false);
    };
    checkFirstLogin();
  }, [router]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordStrength = (): { level: number; label: string; color: string } => {
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (newPassword.length >= 12) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[a-z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;

    if (score <= 2) return { level: 1, label: 'Faible', color: 'bg-red-500' };
    if (score <= 4) return { level: 2, label: 'Moyen', color: 'bg-orange-500' };
    return { level: 3, label: 'Fort', color: 'bg-green-500' };
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setError('Le mot de passe doit contenir au moins une lettre majuscule');
      return;
    }
    if (!/[a-z]/.test(newPassword)) {
      setError('Le mot de passe doit contenir au moins une lettre minuscule');
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setError('Le mot de passe doit contenir au moins un chiffre');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      const { data: { user: updatedUser } } = await supabase.auth.getUser();
      if (updatedUser) {
        await supabase.auth.updateUser({
          data: { ...updatedUser.user_metadata, is_first_login: false, must_change_password: false },
        });
        await supabase.from('users').update({
          is_first_login: false,
          last_password_change: new Date().toISOString(),
        }).eq('id', updatedUser.id);
        setUser(updatedUser);
      }

      setStep('done');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la modification du mot de passe');
    } finally {
      setLoading(false);
    }
  };

  const strength = passwordStrength();

  if (checking) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (step === 'done') {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <div className="bg-surface-container rounded-2xl w-full max-w-md p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-on-surface mb-2">Mot de passe modifié</h1>
          <p className="text-on-surface-variant mb-6">
            Votre mot de passe a été modifié avec succès. Vous allez être redirigé vers votre tableau de bord.
          </p>
          <button onClick={async () => {
            const supabase = createClient();
            const { data: dbUser } = await supabase.from('users').select('role').eq('id', user?.id).single();
            const role = dbUser?.role || 'STUDENT';
            router.push(roleDashboards[role] || '/dashboard');
          }}
            className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors">
            Accéder au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-surface-container rounded-2xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-on-surface mb-2">Bienvenue sur EduCI</h1>
        <p className="text-on-surface-variant mb-6">
          Pour des raisons de sécurité, vous devez modifier votre mot de passe temporaire.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">Nouveau mot de passe</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl pr-10 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {newPassword && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= strength.level ? strength.color : 'bg-gray-200'}`} />
                  ))}
                </div>
                <p className="text-xs text-on-surface-variant">Force: {strength.label}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">Confirmer le mot de passe</label>
            <input type={showPassword ? 'text' : 'password'} value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          <button onClick={handleChangePassword} disabled={loading || !newPassword || !confirmPassword}
            className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Modifier le mot de passe'}
          </button>
        </div>
      </div>
    </div>
  );
}
