'use client';

import { useState } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';
import {
  Shield, Smartphone, Key, CheckCircle, AlertTriangle,
  Loader2, Copy, Eye, EyeOff, RefreshCw,
} from 'lucide-react';

export default function TwoFactorPage() {
  const { user } = useAuth();
  const [step, setStep] = useState<'intro' | 'setup' | 'verify' | 'enabled' | 'disable'>('intro');
  const [loading, setLoading] = useState(false);
  const [totpSecret, setTotpSecret] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [error, setError] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showCodes, setShowCodes] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  async function handleEnable2FA() {
    setLoading(true);
    setError('');
    try {
      const supabase = getSupabase();
      const { data, error: enrollError } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'EduCI Authenticator',
      });
      if (enrollError) throw enrollError;
      if (data) {
        setTotpSecret(data.totp.secret);
        setQrUrl(data.totp.uri);
        setStep('setup');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'activation 2FA.');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode() {
    if (verifyCode.length !== 6) {
      setError('Le code doit contenir 6 chiffres.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const supabase = getSupabase();
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const totpFactor = factors?.totp?.[0];
      if (!totpFactor) throw new Error('Facteur TOTP introuvable.');

      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId: totpFactor.id,
      });
      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: totpFactor.id,
        challengeId: challenge.id,
        code: verifyCode,
      });
      if (verifyError) throw verifyError;

      const codes = Array.from({ length: 8 }, () =>
        Math.random().toString(36).substring(2, 6).toUpperCase() + '-' +
        Math.random().toString(36).substring(2, 6).toUpperCase()
      );
      setBackupCodes(codes);
      setIs2FAEnabled(true);
      setStep('enabled');
    } catch (err: any) {
      setError(err.message || 'Code invalide. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDisable2FA() {
    setLoading(true);
    setError('');
    try {
      const supabase = getSupabase();
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const totpFactor = factors?.totp?.[0];
      if (totpFactor) {
        const { error: unenrollError } = await supabase.auth.mfa.unenroll({
          factorId: totpFactor.id,
        });
        if (unenrollError) throw unenrollError;
      }
      setIs2FAEnabled(false);
      setStep('intro');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la désactivation.');
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Paramètres' }, { label: 'Authentification à deux facteurs' }]}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#191c1d]">Authentification à deux facteurs (2FA)</h2>
          <p className="text-[#464555] mt-1">Renforcez la sécurité de votre compte avec une vérification supplémentaire.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertTriangle size={18} className="text-red-500 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {step === 'intro' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-[#3525cd]" />
              </div>
              <h3 className="text-xl font-bold text-[#191c1d] mb-2">Protégez votre compte</h3>
              <p className="text-[#464555] text-sm max-w-md mx-auto">
                L&apos;authentification à deux facteurs ajoute une couche de sécurité supplémentaire.
                En plus de votre mot de passe, vous devrez entrer un code généré par votre téléphone.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { icon: Smartphone, title: 'Application d\'authentification', desc: 'Google Authenticator, Authy, ou Microsoft Authenticator' },
                { icon: Key, title: 'Codes de secours', desc: '8 codes à usage unique en cas de perte de votre téléphone' },
                { icon: Shield, title: 'Protection renforcée', desc: 'Même si quelqu\'un obtient votre mot de passe, il ne pourra pas se connecter' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                  <div className="p-2 rounded-lg bg-white border border-gray-200">
                    <item.icon size={18} className="text-[#3525cd]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#191c1d] text-sm">{item.title}</p>
                    <p className="text-xs text-[#464555] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleEnable2FA}
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Shield size={18} />}
              Activer la 2FA
            </button>
          </div>
        )}

        {step === 'setup' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-xl font-bold text-[#191c1d] mb-2">Configuration</h3>
            <p className="text-[#464555] text-sm mb-6">
              Scannez le QR code ci-dessous avec votre application d&apos;authentification, ou entrez la clé manuellement.
            </p>

            {qrUrl && (
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white border-2 border-gray-200 rounded-xl">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`}
                    alt="QR Code 2FA"
                    className="w-48 h-48"
                  />
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#464555] mb-2">Clé secrète (entrée manuelle)</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-[#191c1d] break-all">
                  {totpSecret}
                </code>
                <button
                  onClick={() => copyToClipboard(totpSecret)}
                  className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  title="Copier"
                >
                  <Copy size={16} className="text-[#464555]" />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#464555] mb-2">Code de vérification</label>
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full p-3 border border-gray-200 rounded-xl text-center text-2xl font-mono tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-[#3525cd] focus:border-transparent"
                maxLength={6}
              />
              <p className="text-xs text-[#464555] mt-2">Entrez le code à 6 chiffres affiché dans votre application.</p>
            </div>

            <button
              onClick={handleVerifyCode}
              disabled={loading || verifyCode.length !== 6}
              className="w-full py-3.5 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
              Vérifier et activer
            </button>
          </div>
        )}

        {step === 'enabled' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-[#191c1d] mb-2">2FA activée avec succès !</h3>
              <p className="text-[#464555] text-sm">
                Votre compte est maintenant protégé par l&apos;authentification à deux facteurs.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} className="text-amber-600" />
                <p className="font-medium text-amber-800 text-sm">Sauvegardez vos codes de secours</p>
              </div>
              <p className="text-xs text-amber-700">
                Ces codes vous permettront de vous connecter si vous perdez accès à votre application d&apos;authentification.
                Conservez-les dans un endroit sûr.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-[#464555]">Codes de secours</label>
                <button
                  onClick={() => setShowCodes(!showCodes)}
                  className="text-sm text-[#3525cd] flex items-center gap-1"
                >
                  {showCodes ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showCodes ? 'Masquer' : 'Afficher'}
                </button>
              </div>
              {showCodes && (
                <div className="grid grid-cols-2 gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  {backupCodes.map((code, i) => (
                    <code key={i} className="text-sm font-mono text-[#191c1d] p-2 bg-white rounded border border-gray-100 text-center">
                      {code}
                    </code>
                  ))}
                </div>
              )}
              <button
                onClick={() => copyToClipboard(backupCodes.join('\n'))}
                className="mt-3 text-sm text-[#3525cd] flex items-center gap-1 hover:underline"
              >
                <Copy size={14} /> Copier tous les codes
              </button>
            </div>

            <button
              onClick={() => setStep('intro')}
              className="w-full py-3 bg-gray-100 text-[#191c1d] font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Terminé
            </button>
          </div>
        )}

        {/* Disable Section */}
        {is2FAEnabled && step === 'intro' && (
          <div className="mt-6 bg-white rounded-2xl border border-red-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-50"><Shield size={18} className="text-red-500" /></div>
              <div>
                <p className="font-medium text-[#191c1d]">Désactiver la 2FA</p>
                <p className="text-xs text-[#464555]">Votre compte sera moins sécurisé.</p>
              </div>
            </div>
            <button
              onClick={handleDisable2FA}
              disabled={loading}
              className="px-4 py-2.5 bg-red-50 text-red-700 font-medium rounded-xl hover:bg-red-100 transition-colors text-sm border border-red-200 disabled:opacity-50"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : 'Désactiver l\'authentification à deux facteurs'}
            </button>
          </div>
        )}
      </div>
    </RoleLayout>
  );
}
