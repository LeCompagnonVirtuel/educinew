'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { sbSchools } from '@/lib/api';
import {
  Mail, Send, Save, Loader2, CheckCircle, AlertTriangle,
  TestTube, Server, Key, Globe, Eye, EyeOff,
} from 'lucide-react';

export default function EmailSettings() {
  const { user } = useAuth();
  const { school } = useSchool();
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);

  const [emailConfig, setEmailConfig] = useState({
    provider: 'resend',
    resend_api_key: '',
    smtp_host: '',
    smtp_port: '587',
    smtp_user: '',
    smtp_pass: '',
    from_name: '',
    from_email: '',
    reply_to: '',
    signature: '',
    enabled: true,
  });

  const [testEmail, setTestEmail] = useState('');

  useEffect(() => {
    if (school?.integrations) {
      const i = school.integrations as any;
      setEmailConfig(prev => ({
        ...prev,
        resend_api_key: i.resend_api_key || i.email_api_key || '',
        smtp_host: i.smtp_host || '',
        smtp_port: i.smtp_port || '587',
        smtp_user: i.smtp_user || '',
        smtp_pass: i.smtp_pass || '',
        from_name: i.from_name || school.name || '',
        from_email: i.from_email || school.email || '',
        reply_to: i.reply_to || '',
        signature: i.email_signature || '',
        enabled: i.email_enabled !== false,
      }));
    }
  }, [school]);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const integrations = (school?.integrations as any) || {};
      await sbSchools.update(user!.schoolId!, {
        integrations: {
          ...integrations,
          resend_api_key: emailConfig.resend_api_key,
          smtp_host: emailConfig.smtp_host,
          smtp_port: emailConfig.smtp_port,
          smtp_user: emailConfig.smtp_user,
          smtp_pass: emailConfig.smtp_pass,
          from_name: emailConfig.from_name,
          from_email: emailConfig.from_email,
          reply_to: emailConfig.reply_to,
          email_signature: emailConfig.signature,
          email_enabled: emailConfig.enabled,
        },
      });
      showToast('success', 'Configuration email sauvegardée');
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const handleTest = async () => {
    if (!testEmail) {
      showToast('error', 'Entrez une adresse email pour le test');
      return;
    }
    setTesting(true);
    try {
      const res = await fetch('/api/auth/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail, test: true }),
      });
      if (!res.ok) throw new Error('Échec de l\'envoi');
      showToast('success', `Email de test envoyé à ${testEmail}`);
    } catch (e: any) {
      showToast('error', e.message || 'Erreur d\'envoi');
    }
    setTesting(false);
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

      {/* Provider */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Server size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Fournisseur email
        </h3>
        <div className="flex gap-3">
          {[
            { id: 'resend', label: 'Recommandé', desc: 'Resend API — Simple et fiable' },
            { id: 'smtp', label: 'SMTP', desc: 'Serveur SMTP personnalisé' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setEmailConfig({ ...emailConfig, provider: p.id })}
              className={`flex-1 p-4 rounded-xl border text-left transition-all ${
                emailConfig.provider === p.id
                  ? 'border-[var(--color-primary,#4F46E5)] bg-[var(--color-primary,#4F46E5)]/5 ring-1 ring-[var(--color-primary,#4F46E5)]/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <p className="text-sm font-semibold text-slate-900">{p.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* API Key */}
      {emailConfig.provider === 'resend' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Key size={18} className="text-[var(--color-primary,#4F46E5)]" />
            Clé API Resend
          </h3>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={emailConfig.resend_api_key}
              onChange={e => setEmailConfig({ ...emailConfig, resend_api_key: e.target.value })}
              placeholder="re_..."
              className="w-full pl-4 pr-12 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm font-mono"
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-xs text-slate-400">La clé est stockée de manière sécurisée. Elle est utilisée uniquement pour l'envoi d'emails.</p>
        </div>
      )}

      {/* SMTP Config */}
      {emailConfig.provider === 'smtp' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Server size={18} className="text-[var(--color-primary,#4F46E5)]" />
            Configuration SMTP
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Serveur</label>
              <input type="text" value={emailConfig.smtp_host} onChange={e => setEmailConfig({ ...emailConfig, smtp_host: e.target.value })} placeholder="smtp.example.com" className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Port</label>
              <input type="text" value={emailConfig.smtp_port} onChange={e => setEmailConfig({ ...emailConfig, smtp_port: e.target.value })} placeholder="587" className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Utilisateur</label>
              <input type="text" value={emailConfig.smtp_user} onChange={e => setEmailConfig({ ...emailConfig, smtp_user: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Mot de passe</label>
              <input type="password" value={emailConfig.smtp_pass} onChange={e => setEmailConfig({ ...emailConfig, smtp_pass: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm" />
            </div>
          </div>
        </div>
      )}

      {/* Sender Info */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Mail size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Expéditeur
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Nom expéditeur</label>
            <input type="text" value={emailConfig.from_name} onChange={e => setEmailConfig({ ...emailConfig, from_name: e.target.value })} placeholder="EduCI" className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email expéditeur</label>
            <input type="email" value={emailConfig.from_email} onChange={e => setEmailConfig({ ...emailConfig, from_email: e.target.value })} placeholder="noreply@educi.com" className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Reply-to</label>
            <input type="email" value={emailConfig.reply_to} onChange={e => setEmailConfig({ ...emailConfig, reply_to: e.target.value })} placeholder="contact@educi.com" className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Signature email</label>
          <textarea value={emailConfig.signature} onChange={e => setEmailConfig({ ...emailConfig, signature: e.target.value })} rows={3} placeholder="L'équipe EduCI" className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm resize-none" />
        </div>
      </div>

      {/* Test */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <TestTube size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Tester l'envoi
        </h3>
        <div className="flex gap-3">
          <input type="email" value={testEmail} onChange={e => setTestEmail(e.target.value)} placeholder="email@exemple.com" className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm" />
          <button onClick={handleTest} disabled={testing} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50">
            {testing ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            Envoyer
          </button>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary,#4F46E5)] text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Sauvegarder
        </button>
      </div>
    </div>
  );
}
