'use client';

import { useState, useEffect, useCallback } from 'react';
import { Mail, CheckCircle, XCircle, Clock, RefreshCw, Search, Filter, Download, BarChart3 } from 'lucide-react';
import { emailApi } from '@/lib/api/email';
import type { EmailLog } from '@/lib/api/email';

export default function EmailLogsPage() {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [stats, setStats] = useState<{ total: number; sent: number; failed: number; pending: number; byType: Record<string, number> } | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [search, setSearch] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [logsData, statsData] = await Promise.all([
        emailApi.getLogs(undefined, filterStatus || undefined, filterType || undefined, 100),
        emailApi.getStats(),
      ]);
      setLogs(logsData);
      setStats(statsData);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterType]);

  useEffect(() => { loadData(); }, [loadData]);

  const filteredLogs = logs.filter(log =>
    !search || log.recipientEmail?.toLowerCase().includes(search.toLowerCase()) ||
    log.subject?.toLowerCase().includes(search.toLowerCase()) ||
    log.recipientName?.toLowerCase().includes(search.toLowerCase())
  );

  const statusIcon = (status: string) => {
    switch (status) {
      case 'SENT': return <CheckCircle size={16} className="text-green-500" />;
      case 'FAILED': return <XCircle size={16} className="text-red-500" />;
      case 'PENDING':
      case 'RETRY': return <Clock size={16} className="text-yellow-500" />;
      default: return <Mail size={16} className="text-gray-400" />;
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'SENT': return 'bg-green-50 text-green-700 border-green-200';
      case 'FAILED': return 'bg-red-50 text-red-700 border-red-200';
      case 'PENDING':
      case 'RETRY': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Email Logs</h1>
            <p className="text-gray-500 text-sm mt-1">Suivi des envois d&apos;emails EduCI</p>
          </div>
          <button onClick={loadData} disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Actualiser
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><Mail size={20} className="text-blue-500" /></div>
                <span className="text-sm font-medium text-gray-500">Total</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"><CheckCircle size={20} className="text-green-500" /></div>
                <span className="text-sm font-medium text-gray-500">Envoyés</span>
              </div>
              <p className="text-3xl font-bold text-green-600">{stats.sent}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center"><XCircle size={20} className="text-red-500" /></div>
                <span className="text-sm font-medium text-gray-500">Échecs</span>
              </div>
              <p className="text-3xl font-bold text-red-600">{stats.failed}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center"><Clock size={20} className="text-yellow-500" /></div>
                <span className="text-sm font-medium text-gray-500">En attente</span>
              </div>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
          </div>
        )}

        {stats && Object.keys(stats.byType).length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={18} className="text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-700">Par type</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.byType).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                <span key={type} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-600">
                  {type} <span className="text-gray-400">({count})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher par email, sujet..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Tous les statuts</option>
              <option value="SENT">Envoyé</option>
              <option value="FAILED">Échoué</option>
              <option value="PENDING">En attente</option>
            </select>
            <select value={filterType} onChange={e => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Tous les types</option>
              {stats && Object.keys(stats.byType).sort().map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-500">Statut</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Destinataire</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Sujet</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Type</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Tentatives</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">Chargement...</td></tr>
                ) : filteredLogs.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">Aucun email trouvé</td></tr>
                ) : filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor(log.status)}`}>
                        {statusIcon(log.status)} {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{log.recipientName || '-'}</div>
                      <div className="text-gray-500 text-xs">{log.recipientEmail}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{log.subject}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">{log.emailType}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                      {log.createdAt ? new Date(log.createdAt).toLocaleString('fr-FR') : '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-center">{log.attempts || 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
