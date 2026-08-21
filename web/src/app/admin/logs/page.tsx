'use client';

import { useState, useEffect, useCallback } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';
import {
  Activity, Download, Search, Shield, Users, AlertTriangle, Clock,
  ChevronLeft, ChevronRight, Filter, LogIn, Edit, Trash2, Upload,
  Eye, RefreshCw,
} from 'lucide-react';

interface AuditLog {
  id: string;
  user_id: string;
  user_name?: string;
  user_role?: string;
  action: string;
  target: string;
  details: string;
  ip_address: string;
  severity: 'info' | 'warning' | 'error';
  created_at: string;
}

const ACTION_TYPES = [
  { value: '', label: 'Toutes les actions' },
  { value: 'LOGIN', label: 'Connexion' },
  { value: 'CREATE', label: 'Création' },
  { value: 'UPDATE', label: 'Modification' },
  { value: 'DELETE', label: 'Suppression' },
  { value: 'EXPORT', label: 'Export' },
  { value: 'IMPORT', label: 'Import' },
];

const SEVERITY_OPTIONS = [
  { value: '', label: 'Tous niveaux' },
  { value: 'info', label: 'Info' },
  { value: 'warning', label: 'Avertissement' },
  { value: 'error', label: 'Erreur' },
];

export default function AdminLogsPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [stats, setStats] = useState({ today: 0, logins: 0, errors: 0, activeUsers: 0 });
  const [filters, setFilters] = useState({
    action: '', severity: '', search: '', dateFrom: '', dateTo: '',
  });
  const pageSize = 20;

  const loadLogs = useCallback(async () => {
    if (!user?.schoolId) return;
    setLoading(true);
    try {
      const supabase = getSupabase();
      let query = supabase
        .from('audit_logs')
        .select('*', { count: 'exact' })
        .eq('school_id', user.schoolId)
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (filters.action) query = query.eq('action', filters.action);
      if (filters.severity) query = query.eq('severity', filters.severity);
      if (filters.search) query = query.or(`user_name.ilike.%${filters.search}%,target.ilike.%${filters.search}%,details.ilike.%${filters.search}%`);
      if (filters.dateFrom) query = query.gte('created_at', filters.dateFrom);
      if (filters.dateTo) query = query.lte('created_at', `${filters.dateTo}T23:59:59`);

      const { data, count, error } = await query;

      if (error) {
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          setLogs([]);
          setTotalCount(0);
          return;
        }
        throw error;
      }

      setLogs(data || []);
      setTotalCount(count || 0);

      const today = new Date().toISOString().split('T')[0];
      const { count: todayCount } = await supabase.from('audit_logs').select('id', { count: 'exact', head: true }).eq('school_id', user.schoolId).gte('created_at', today);
      const { count: loginsCount } = await supabase.from('audit_logs').select('id', { count: 'exact', head: true }).eq('school_id', user.schoolId).eq('action', 'LOGIN').gte('created_at', today);
      const { count: errorsCount } = await supabase.from('audit_logs').select('id', { count: 'exact', head: true }).eq('school_id', user.schoolId).eq('severity', 'error').gte('created_at', today);

      setStats({
        today: todayCount || 0,
        logins: loginsCount || 0,
        errors: errorsCount || 0,
        activeUsers: new Set((data || []).map((l: any) => l.user_id)).size,
      });
    } catch (err) {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [user?.schoolId, page, filters]);

  useEffect(() => { loadLogs(); }, [loadLogs]);

  const exportCSV = () => {
    const headers = ['Date', 'Utilisateur', 'Rôle', 'Action', 'Cible', 'Détails', 'IP', 'Sévérité'];
    const rows = logs.map(l => [
      new Date(l.created_at).toLocaleString('fr-FR'),
      l.user_name || l.user_id?.slice(0, 8),
      l.user_role || '',
      l.action,
      l.target,
      l.details,
      l.ip_address,
      l.severity,
    ]);
    const csv = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `journal_systeme_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'LOGIN': return <LogIn size={14} />;
      case 'CREATE': return <Upload size={14} />;
      case 'UPDATE': return <Edit size={14} />;
      case 'DELETE': return <Trash2 size={14} />;
      case 'EXPORT': return <Download size={14} />;
      default: return <Eye size={14} />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'LOGIN': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'CREATE': return 'bg-green-50 text-green-700 border-green-200';
      case 'UPDATE': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'DELETE': return 'bg-red-50 text-red-700 border-red-200';
      case 'EXPORT': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-red-100 text-red-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-blue-50 text-blue-600';
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Journal Système' }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Journal Système</h1>
            <p className="text-sm text-gray-500 mt-1">Historique complet des actions et événements</p>
          </div>
          <div className="flex gap-2">
            <button onClick={loadLogs} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <RefreshCw size={14} /> Actualiser
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-medium hover:bg-[#4338CA]">
              <Download size={14} /> Exporter CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Activity, label: "Actions aujourd'hui", value: stats.today, color: 'text-[#4F46E5]', bg: 'bg-indigo-50' },
            { icon: LogIn, label: 'Connexions', value: stats.logins, color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: AlertTriangle, label: 'Erreurs', value: stats.errors, color: 'text-red-600', bg: 'bg-red-50' },
            { icon: Users, label: 'Utilisateurs actifs', value: stats.activeUsers, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon size={18} className={stat.color} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text" placeholder="Rechercher..." value={filters.search}
                onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
              />
            </div>
            <select value={filters.action} onChange={(e) => setFilters(f => ({ ...f, action: e.target.value }))} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#4F46E5]/20">
              {ACTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <select value={filters.severity} onChange={(e) => setFilters(f => ({ ...f, severity: e.target.value }))} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#4F46E5]/20">
              {SEVERITY_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <input type="date" value={filters.dateFrom} onChange={(e) => setFilters(f => ({ ...f, dateFrom: e.target.value }))} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            <input type="date" value={filters.dateTo} onChange={(e) => setFilters(f => ({ ...f, dateTo: e.target.value }))} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin w-8 h-8 border-2 border-[#4F46E5] border-t-transparent rounded-full" />
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-16">
              <Shield size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700">Aucun enregistrement</h3>
              <p className="text-sm text-gray-500 mt-1">Le journal système enregistrera automatiquement les actions</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Utilisateur</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Action</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Cible</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">IP</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Sévérité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-gray-400" />
                          {new Date(log.created_at).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <span className="font-medium text-gray-900">{log.user_name || 'Système'}</span>
                          {log.user_role && <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{log.user_role}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getActionColor(log.action)}`}>
                          {getActionIcon(log.action)} {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 max-w-[200px] truncate">{log.target || '-'}</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">{log.ip_address || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSeverityBadge(log.severity)}`}>
                          {log.severity === 'error' ? 'Erreur' : log.severity === 'warning' ? 'Alerte' : 'Info'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <p className="text-sm text-gray-500">{totalCount} résultats • Page {page}/{totalPages}</p>
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
    </RoleLayout>
  );
}
