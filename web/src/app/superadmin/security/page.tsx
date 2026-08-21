'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import {
  Shield, AlertTriangle, CheckCircle,
  LogIn, Clock, Monitor, XCircle,
} from 'lucide-react';

interface LoginEntry {
  id: string;
  ip_address: string;
  device: string;
  location: string | null;
  success: boolean;
  created_at: string;
}

export default function SuperAdminSecurityPage() {
  const { user } = useAuth();
  const [loginHistory, setLoginHistory] = useState<LoginEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<{ type: string; message: string; date: string }[]>([]);

  useEffect(() => { loadSecurity(); }, []);

  async function loadSecurity() {
    const supabase = getSupabase();

    const { data: logins } = await supabase
      .from('login_history')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })
      .limit(20);
    setLoginHistory(logins || []);

    const { data: alertData } = await supabase
      .from('security_alerts')
      .select('type, message, created_at')
      .order('created_at', { ascending: false })
      .limit(10);
    setAlerts((alertData || []).map((a: any) => ({ type: a.type, message: a.message, date: a.created_at })));

    setLoading(false);
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sécurité du Compte</h1>
        <p className="text-sm text-gray-500 mt-1">Journal de connexion, alertes d&apos;intrusion</p>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Monitor size={18} /> Sessions actives</h2>
        <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center gap-3">
          <CheckCircle size={16} className="text-green-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">Session actuelle</p>
            <p className="text-xs text-gray-500">Connecté maintenant • {user?.email}</p>
          </div>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><AlertTriangle size={18} /> Alertes de Sécurité</h2>
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <Shield size={32} className="mx-auto text-green-300 mb-2" />
            <p className="text-sm text-gray-500">Aucune alerte de sécurité</p>
          </div>
        ) : (
          <div className="space-y-2">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                <XCircle size={16} className="text-red-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(alert.date).toLocaleString('fr-FR')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Login History */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><LogIn size={18} /> Historique de Connexion</h2>
        {loginHistory.length === 0 ? (
          <div className="text-center py-8">
            <Clock size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">Aucun historique disponible</p>
            <p className="text-xs text-gray-400 mt-1">La table login_history enregistrera les connexions</p>
          </div>
        ) : (
          <div className="space-y-2">
            {loginHistory.map((entry) => (
              <div key={entry.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-50 hover:bg-gray-50/50">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${entry.success ? 'bg-green-50' : 'bg-red-50'}`}>
                  {entry.success ? <CheckCircle size={14} className="text-green-500" /> : <XCircle size={14} className="text-red-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{entry.device || 'Appareil inconnu'}</p>
                  <p className="text-xs text-gray-400">{entry.ip_address} • {entry.location || 'Localisation inconnue'}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(entry.created_at).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
