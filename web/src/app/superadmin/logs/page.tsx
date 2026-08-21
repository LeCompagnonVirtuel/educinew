'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/api/shared';
import {
  ScrollText, Search, AlertTriangle, XCircle, Info,
  ChevronLeft, ChevronRight, RefreshCw, Download, Filter,
} from 'lucide-react';

interface TechnicalLog {
  id: string;
  level: string;
  service: string;
  message: string;
  stack_trace: string | null;
  created_at: string;
}

const SERVICES = ['', 'api', 'auth', 'database', 'realtime', 'email', 'storage', 'edge_functions'];
const LEVELS = ['', 'error', 'warning', 'info'];

export default function SuperAdminLogsPage() {
  const [logs, setLogs] = useState<TechnicalLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [service, setService] = useState('');
  const [level, setLevel] = useState('');
  const [search, setSearch] = useState('');
  const pageSize = 25;

  useEffect(() => { loadLogs(); }, [page, service, level, search]);

  async function loadLogs() {
    setLoading(true);
    const supabase = getSupabase();
    let query = supabase
      .from('technical_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (service) query = query.eq('service', service);
    if (level) query = query.eq('level', level);
    if (search) query = query.ilike('message', `%${search}%`);

    const { data, count, error } = await query;
    if (error && (error.code === '42P01' || error.message?.includes('does not exist'))) {
      setLogs([]);
      setTotal(0);
      setLoading(false);
      return;
    }
    setLogs(data || []);
    setTotal(count || 0);
    setLoading(false);
  }

  function exportCSV() {
    const headers = ['Date', 'Service', 'Niveau', 'Message'];
    const rows = logs.map(l => [
      new Date(l.created_at).toLocaleString('fr-FR'),
      l.service, l.level, l.message.replace(/;/g, ','),
    ]);
    const csv = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs_techniques_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const getLevelIcon = (lvl: string) => {
    switch (lvl) {
      case 'error': return <XCircle size={14} className="text-red-500" />;
      case 'warning': return <AlertTriangle size={14} className="text-yellow-500" />;
      default: return <Info size={14} className="text-blue-400" />;
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Journal Technique</h1>
          <p className="text-sm text-gray-500 mt-1">Erreurs techniques uniquement — aucune donnée utilisateur ou contenu pédagogique</p>
        </div>
        <div className="flex gap-2">
          <button onClick={loadLogs} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <RefreshCw size={14} /> Actualiser
          </button>
          <button onClick={exportCSV} className="flex items-center gap-2 px-3 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-medium hover:bg-[#4338CA]">
            <Download size={14} /> CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text" placeholder="Rechercher dans les messages..."
            value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
          />
        </div>
        <select value={service} onChange={(e) => { setService(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
          <option value="">Tous les services</option>
          {SERVICES.filter(Boolean).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={level} onChange={(e) => { setLevel(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
          <option value="">Tous les niveaux</option>
          <option value="error">Erreur</option>
          <option value="warning">Avertissement</option>
          <option value="info">Info</option>
        </select>
      </div>

      {/* Logs */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin w-8 h-8 border-2 border-[#4F46E5] border-t-transparent rounded-full" />
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-16">
            <ScrollText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Aucun log technique</p>
            <p className="text-xs text-gray-400 mt-1">La table technical_logs enregistrera automatiquement les erreurs système</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {logs.map((log) => (
              <div key={log.id} className="px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getLevelIcon(log.level)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-600">{log.service}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(log.created_at).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 break-words">{log.message}</p>
                    {log.stack_trace && (
                      <pre className="mt-1 text-[11px] text-gray-400 font-mono bg-gray-50 rounded p-2 overflow-x-auto max-h-24">{log.stack_trace}</pre>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">{total} logs • Page {page}/{totalPages}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
