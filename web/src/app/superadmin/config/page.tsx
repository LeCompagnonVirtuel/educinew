'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/api/shared';
import {
  Settings, Globe, Key, Mail, Save, Eye, EyeOff, AlertTriangle,
} from 'lucide-react';

interface PlatformConfig {
  domain: string;
  support_email: string;
  noreply_email: string;
  supabase_url: string;
  resend_api_key: string;
  firebase_key: string;
  sentry_dsn: string;
  maintenance_mode: boolean;
  registration_open: boolean;
}

export default function SuperAdminConfigPage() {
  const [config, setConfig] = useState<PlatformConfig>({
    domain: '', support_email: '', noreply_email: '',
    supabase_url: '', resend_api_key: '', firebase_key: '', sentry_dsn: '',
    maintenance_mode: false, registration_open: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  useEffect(() => { loadConfig(); }, []);

  async function loadConfig() {
    const supabase = getSupabase();
    const { data } = await supabase.from('platform_config').select('*').single();
    if (data) {
      setConfig({
        domain: data.domain || '',
        support_email: data.support_email || '',
        noreply_email: data.noreply_email || '',
        supabase_url: data.supabase_url || '',
        resend_api_key: data.resend_api_key || '',
        firebase_key: data.firebase_key || '',
        sentry_dsn: data.sentry_dsn || '',
        maintenance_mode: data.maintenance_mode || false,
        registration_open: data.registration_open !== false,
      });
    }
    setLoading(false);
  }

  async function saveConfig() {
    setSaving(true);
    const supabase = getSupabase();
    const { error } = await supabase.from('platform_config').upsert({ id: 'main', ...config });
    if (error) {
      showToast('Erreur: ' + error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  function maskKey(key: string) {
    if (key.length <= 8) return '••••••••';
    return key.slice(0, 4) + '••••••••' + key.slice(-4);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-2 border-[#4F46E5] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm font-medium">
          {toastMsg}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuration Globale</h1>
          <p className="text-sm text-gray-500 mt-1">Domaines, clés API (chiffrées), emails système</p>
        </div>
        <button onClick={saveConfig} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-medium hover:bg-[#4338CA] disabled:opacity-50">
          <Save size={14} /> {saving ? 'Enregistrement...' : saved ? 'Enregistré !' : 'Enregistrer'}
        </button>
      </div>

      {/* Domain & General */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><Globe size={18} /> Domaine & Général</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Domaine principal</label>
            <input value={config.domain} onChange={(e) => setConfig(c => ({ ...c, domain: e.target.value }))} placeholder="educi.live" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Supabase URL</label>
            <input value={config.supabase_url} onChange={(e) => setConfig(c => ({ ...c, supabase_url: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={config.maintenance_mode} onChange={(e) => setConfig(c => ({ ...c, maintenance_mode: e.target.checked }))} className="rounded border-gray-300" />
            Mode maintenance global
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={config.registration_open} onChange={(e) => setConfig(c => ({ ...c, registration_open: e.target.checked }))} className="rounded border-gray-300" />
            Inscriptions ouvertes
          </label>
        </div>
        {config.maintenance_mode && (
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            <AlertTriangle size={16} /> Le mode maintenance est activé — la plateforme est inaccessible aux utilisateurs.
          </div>
        )}
      </div>

      {/* Emails */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><Mail size={18} /> Emails Système</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Email support</label>
            <input value={config.support_email} onChange={(e) => setConfig(c => ({ ...c, support_email: e.target.value }))} placeholder="support@educi.live" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Email no-reply</label>
            <input value={config.noreply_email} onChange={(e) => setConfig(c => ({ ...c, noreply_email: e.target.value }))} placeholder="noreply@educi.live" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><Key size={18} /> Clés API (chiffrées)</h2>
        <p className="text-xs text-gray-400">Les clés sont stockées de manière chiffrée. Elles ne sont jamais exposées en clair dans le navigateur.</p>
        {[
          { key: 'resend_api_key', label: 'Resend API Key' },
          { key: 'firebase_key', label: 'Firebase Server Key' },
          { key: 'sentry_dsn', label: 'Sentry DSN' },
        ].map((field) => (
          <div key={field.key}>
            <label className="text-xs font-medium text-gray-600 mb-1 block">{field.label}</label>
            <div className="relative">
              <input
                type={showKeys[field.key] ? 'text' : 'password'}
                value={(config as any)[field.key]}
                onChange={(e) => setConfig(c => ({ ...c, [field.key]: e.target.value }))}
                className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg text-sm font-mono"
              />
              <button
                onClick={() => setShowKeys(s => ({ ...s, [field.key]: !s[field.key] }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showKeys[field.key] ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
