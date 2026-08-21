'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSupabase } from '@/lib/api/shared';
import {
  Database, Server, Wifi, Mail, HardDrive, Users,
  RefreshCw, CheckCircle, AlertTriangle, XCircle, Clock,
  Activity, Gauge, Globe,
} from 'lucide-react';

interface ServiceCheck {
  name: string;
  icon: any;
  status: 'operational' | 'degraded' | 'down' | 'checking';
  latency: number | null;
  details: string;
}

export default function SuperAdminMonitoringPage() {
  const [services, setServices] = useState<ServiceCheck[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState('');
  const [storageInfo, setStorageInfo] = useState<{ buckets: number; totalSize: string }>({ buckets: 0, totalSize: '—' });

  const runChecks = useCallback(async () => {
    setRefreshing(true);
    const supabase = getSupabase();
    const results: ServiceCheck[] = [];

    // Database
    try {
      const start = performance.now();
      const { error } = await supabase.from('schools').select('id', { head: true }).limit(1);
      results.push({ name: 'Supabase Database', icon: Database, status: error ? 'degraded' : 'operational', latency: Math.round(performance.now() - start), details: error ? error.message : 'Connexion OK' });
    } catch {
      results.push({ name: 'Supabase Database', icon: Database, status: 'down', latency: null, details: 'Connexion impossible' });
    }

    // Auth
    try {
      const start = performance.now();
      const { data } = await supabase.auth.getSession();
      results.push({ name: 'Supabase Auth', icon: Users, status: data.session ? 'operational' : 'degraded', latency: Math.round(performance.now() - start), details: data.session ? 'Session active' : 'Session expirée' });
    } catch {
      results.push({ name: 'Supabase Auth', icon: Users, status: 'down', latency: null, details: 'Auth indisponible' });
    }

    // API
    try {
      const start = performance.now();
      const res = await fetch('/api/health');
      results.push({ name: 'API Backend', icon: Server, status: res.ok ? 'operational' : 'degraded', latency: Math.round(performance.now() - start), details: res.ok ? 'Routes actives' : `Erreur ${res.status}` });
    } catch {
      results.push({ name: 'API Backend', icon: Server, status: 'down', latency: null, details: 'API indisponible' });
    }

    // Realtime
    try {
      const start = performance.now();
      const channel = supabase.channel('sa-monitoring');
      await new Promise<void>((resolve) => {
        channel.subscribe(() => resolve());
        setTimeout(resolve, 3000);
      });
      const elapsed = Math.round(performance.now() - start);
      supabase.removeChannel(channel);
      results.push({ name: 'Realtime WebSocket', icon: Wifi, status: elapsed < 3000 ? 'operational' : 'degraded', latency: elapsed < 3000 ? elapsed : null, details: elapsed < 3000 ? 'WebSocket connecté' : 'Connexion lente' });
    } catch {
      results.push({ name: 'Realtime WebSocket', icon: Wifi, status: 'degraded', latency: null, details: 'Vérification impossible' });
    }

    // Storage
    try {
      const start = performance.now();
      const { data, error } = await supabase.storage.listBuckets();
      results.push({ name: 'Storage / Fichiers', icon: HardDrive, status: error ? 'degraded' : 'operational', latency: Math.round(performance.now() - start), details: error ? error.message : `${data?.length || 0} buckets` });
      setStorageInfo({ buckets: data?.length || 0, totalSize: '—' });
    } catch {
      results.push({ name: 'Storage / Fichiers', icon: HardDrive, status: 'down', latency: null, details: 'Storage indisponible' });
    }

    // Email (external — no real check)
    results.push({ name: 'Resend Email', icon: Mail, status: 'operational', latency: null, details: 'Service externe' });

    // Edge Functions / Workers
    results.push({ name: 'Edge Functions', icon: Globe, status: 'operational', latency: null, details: 'Vérification manuelle' });

    setServices(results);
    setLastRefresh(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    setRefreshing(false);
  }, []);

  useEffect(() => { runChecks(); }, [runChecks]);
  useEffect(() => {
    const interval = setInterval(runChecks, 60000);
    return () => clearInterval(interval);
  }, [runChecks]);

  const operational = services.filter(s => s.status === 'operational').length;
  const degraded = services.filter(s => s.status === 'degraded').length;
  const down = services.filter(s => s.status === 'down').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle size={16} className="text-green-500" />;
      case 'degraded': return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'down': return <XCircle size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-gray-400 animate-pulse" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monitoring Infrastructure</h1>
          <p className="text-sm text-gray-500 mt-1">Santé des services en temps réel — rafraîchissement automatique toutes les 60s</p>
        </div>
        <div className="flex items-center gap-3">
          {lastRefresh && <span className="text-xs text-gray-400"><Clock size={12} className="inline mr-1" />{lastRefresh}</span>}
          <button onClick={runChecks} disabled={refreshing} className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-medium hover:bg-[#4338CA] disabled:opacity-50">
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} /> Vérifier
          </button>
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center"><CheckCircle size={18} className="text-green-500" /></div>
          <div><p className="text-2xl font-bold text-gray-900">{operational}</p><p className="text-xs text-gray-500">Opérationnels</p></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center"><AlertTriangle size={18} className="text-yellow-500" /></div>
          <div><p className="text-2xl font-bold text-gray-900">{degraded}</p><p className="text-xs text-gray-500">Dégradés</p></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center"><XCircle size={18} className="text-red-500" /></div>
          <div><p className="text-2xl font-bold text-gray-900">{down}</p><p className="text-xs text-gray-500">Hors ligne</p></div>
        </div>
      </div>

      {/* Service list */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {services.map((svc, i) => (
          <div key={i} className="px-5 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <svc.icon size={18} className="text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">{svc.name}</p>
              <p className="text-xs text-gray-400">{svc.details}</p>
            </div>
            <div className="flex items-center gap-3">
              {svc.latency !== null && <span className="text-xs text-gray-400 font-mono">{svc.latency}ms</span>}
              {getStatusIcon(svc.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
