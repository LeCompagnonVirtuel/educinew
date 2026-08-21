'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { sbSchools } from '@/lib/api';
import {
  Shield, Key, Clock, Smartphone, Save, Loader2, CheckCircle, AlertTriangle,
  Eye, EyeOff, Lock, Activity, Users, Globe, AlertCircle,
} from 'lucide-react';

export default function SecuritySettings() {
  const { user } = useAuth();
  const { school } = useSchool();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [showPw, setShowPw] = useState({ new: false, confirm: false });

  const [security, setSecurity] = useState({
    two_factor_enabled: false,
    session_timeout: 30,
    max_login_attempts: 5,
    lockout_duration: 15,
    require_password_change: false,
    allow_password_reset: true,
    captcha_enabled: true,
  });

  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  useEffect(() => {
    if (school?.academic_settings) {
      const s = school.academic_settings as any;
      if (s.security) setSecurity(prev => ({ ...prev, ...s.security }));
    }
    loadAuditLogs();
  }, [school]);

  const loadAuditLogs = async () => {
    if (!user?.schoolId) return;
    try {
      const supabase = getSupabase();
      const { data } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('school_id', user.schoolId)
        .order('created_at', { ascending: false })
        .limit(20);
      setAuditLogs(data || []);
    } catch {
      setAuditLogs([]);
    } finally {
      setLoadingLogs(false);
    }
  };

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePasswordChange = async () => {
    if (!passwords.new || !passwords.confirm) {
      showToast('error', 'Veuillez remplir les champs');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      showToast('error', 'Les mots de passe ne correspondent pas');
      return;
    }
    if (passwords.new.length < 8) {
      showToast('error', 'Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    setSaving(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.updateUser({ password: passwords.new });
      if (error) throw error;
      setPasswords({ new: '', confirm: '' });
      showToast('success', 'Mot de passe modifié avec succès');
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const handleSaveSecurity = async () => {
    setSaving(true);
    try {
      const existing = (school?.academic_settings as any) || {};
      await sbSchools.update(user!.schoolId!, {
        academic_settings: { ...existing, security },
      });
      showToast('success', 'Paramètres de sécurité sauvegardés');
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const actionLabels: Record<string, string> = {
    LOGIN: 'Connexion',
    LOGOUT: 'Déconnexion',
    CREATE: 'Création',
    UPDATE: 'Modification',
    DELETE: 'Suppression',
    EXPORT: 'Export',
    IMPORT: 'Import',
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Password Change */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Key size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Changer le mot de passe
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Nouveau mot de passe</label>
            <div className="relative">
              <input type={showPw.new ? 'text' : 'password'} value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} placeholder="••••••••" className="w-full pl-4 pr-10 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm" />
              <button onClick={() => setShowPw({ ...showPw, new: !showPw.new })} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPw.new ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Confirmer</label>
            <div className="relative">
              <input type={showPw.confirm ? 'text' : 'password'} value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} placeholder="••••••••" className="w-full pl-4 pr-10 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm" />
              <button onClick={() => setShowPw({ ...showPw, confirm: !showPw.confirm })} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPw.confirm ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        </div>
        <button onClick={handlePasswordChange} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary,#4F46E5)] text-white rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
          Modifier
        </button>
      </div>

      {/* Security Policy */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Shield size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Politique de sécurité
        </h3>
        <div className="space-y-3">
          {[
            { key: 'two_factor_enabled', label: 'Double authentification (2FA)', desc: 'Exiger un code de vérification supplémentaire' },
            { key: 'require_password_change', label: 'Changement de mot de passe obligatoire', desc: 'Forcer le changement à la première connexion' },
            { key: 'allow_password_reset', label: 'Réinitialisation par email', desc: 'Permettre la réinitialisation du mot de passe' },
            { key: 'captcha_enabled', label: 'CAPTCHA', desc: 'Protection contre les bots' },
          ].map(item => (
            <label key={item.key} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
              <div>
                <p className="text-sm font-medium text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setSecurity({ ...security, [item.key]: !security[item.key as keyof typeof security] })}
                className={`w-11 h-6 rounded-full transition-colors ${security[item.key as keyof typeof security] ? 'bg-[var(--color-primary,#4F46E5)]' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform mt-0.5 ${security[item.key as keyof typeof security] ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
              </button>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Timeout session (min)</label>
            <select value={security.session_timeout} onChange={e => setSecurity({ ...security, session_timeout: Number(e.target.value) })} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm">
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={60}>1 heure</option>
              <option value={120}>2 heures</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Tentatives max</label>
            <select value={security.max_login_attempts} onChange={e => setSecurity({ ...security, max_login_attempts: Number(e.target.value) })} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm">
              <option value={3}>3 tentatives</option>
              <option value={5}>5 tentatives</option>
              <option value={10}>10 tentatives</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Durée blocage (min)</label>
            <select value={security.lockout_duration} onChange={e => setSecurity({ ...security, lockout_duration: Number(e.target.value) })} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm">
              <option value={5}>5 min</option>
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={60}>1 heure</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Activity size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Journal d'audit
        </h3>
        {loadingLogs ? (
          <div className="text-center py-4"><Loader2 size={20} className="animate-spin mx-auto text-slate-400" /></div>
        ) : auditLogs.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">Aucune activité enregistrée</p>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {auditLogs.map((log: any) => (
              <div key={log.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Activity size={14} className="text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900 truncate">{actionLabels[log.action] || log.action} — {log.entity_type || ''}</p>
                  <p className="text-xs text-slate-500">{log.user_name || log.user_id} • {log.created_at ? new Date(log.created_at).toLocaleString('fr-FR') : ''}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button onClick={handleSaveSecurity} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary,#4F46E5)] text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Sauvegarder
        </button>
      </div>
    </div>
  );
}
