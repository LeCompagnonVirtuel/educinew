'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { sbSchools } from '@/lib/api';
import {
  Database, Download, Upload, Trash2, Save, Loader2, CheckCircle, AlertTriangle,
  HardDrive, Clock, RefreshCw, Server, Globe, AlertCircle, FileText,
} from 'lucide-react';

export default function SystemSettings() {
  const { user } = useAuth();
  const { school } = useSchool();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const [systemInfo, setSystemInfo] = useState({
    version: '1.0.0',
    database: 'Supabase PostgreSQL',
    backend: 'Next.js 14',
    storage_used: 0,
    storage_limit: 1024 * 1024 * 1024,
    documents_count: 0,
    images_count: 0,
  });

  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [logFilter, setLogFilter] = useState('all');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadSystemInfo();
    loadLogs();
  }, [user?.schoolId]);

  const loadSystemInfo = async () => {
    if (!user?.schoolId) return;
    const supabase = getSupabase();
    const [docsRes, auditRes] = await Promise.allSettled([
      supabase.from('documents').select('id', { count: 'exact', head: true }).eq('school_id', user.schoolId),
      supabase.from('audit_logs').select('id', { count: 'exact', head: true }).eq('school_id', user.schoolId),
    ]);
    setSystemInfo(prev => ({
      ...prev,
      documents_count: docsRes.status === 'fulfilled' ? (docsRes.value.count || 0) : 0,
    }));
  };

  const loadLogs = async () => {
    if (!user?.schoolId) return;
    try {
      const supabase = getSupabase();
      const { data } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('school_id', user.schoolId)
        .order('created_at', { ascending: false })
        .limit(50);
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

  const handleExportAll = async () => {
    setExporting(true);
    try {
      const supabase = getSupabase();
      const [schoolRes, studentsRes, teachersRes, gradesRes, classesRes] = await Promise.allSettled([
        supabase.from('schools').select('*').eq('id', user!.schoolId!).single(),
        supabase.from('students').select('*, user:users(name, email)').eq('school_id', user!.schoolId!),
        supabase.from('teachers').select('*, user:users(name, email)').eq('school_id', user!.schoolId!),
        supabase.from('grades').select('*, student:students(matricule, user:users(name)), subject:subjects(name)').eq('school_id', user!.schoolId!),
        supabase.from('classes').select('*').eq('school_id', user!.schoolId!),
      ]);

      const exportData = {
        export_date: new Date().toISOString(),
        school: schoolRes.status === 'fulfilled' ? schoolRes.value.data : null,
        students: studentsRes.status === 'fulfilled' ? studentsRes.value.data || [] : [],
        teachers: teachersRes.status === 'fulfilled' ? teachersRes.value.data || [] : [],
        grades: gradesRes.status === 'fulfilled' ? gradesRes.value.data || [] : [],
        classes: classesRes.status === 'fulfilled' ? classesRes.value.data || [] : [],
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `educi-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('success', 'Export téléchargé avec succès');
    } catch (e: any) {
      showToast('error', e.message || 'Erreur d\'export');
    }
    setExporting(false);
  };

  const filteredLogs = logFilter === 'all' ? auditLogs : auditLogs.filter(l => l.action === logFilter);

  const actionLabels: Record<string, string> = {
    LOGIN: 'Connexion', LOGOUT: 'Déconnexion', CREATE: 'Création', UPDATE: 'Modification',
    DELETE: 'Suppression', EXPORT: 'Export', IMPORT: 'Import',
  };

  const actionColors: Record<string, string> = {
    CREATE: 'bg-emerald-100 text-emerald-700',
    UPDATE: 'bg-blue-100 text-blue-700',
    DELETE: 'bg-red-100 text-red-700',
    LOGIN: 'bg-purple-100 text-purple-700',
    LOGOUT: 'bg-slate-100 text-slate-600',
    EXPORT: 'bg-amber-100 text-amber-700',
    IMPORT: 'bg-cyan-100 text-cyan-700',
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

      {/* System Info */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Server size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Informations système
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Version', value: systemInfo.version, icon: Globe },
            { label: 'Base de données', value: systemInfo.database, icon: Database },
            { label: 'Backend', value: systemInfo.backend, icon: Server },
          ].map(item => (
            <div key={item.label} className="p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <item.icon size={14} className="text-slate-400" />
                <p className="text-xs text-slate-500">{item.label}</p>
              </div>
              <p className="text-sm font-semibold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Storage */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <HardDrive size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Stockage
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Documents</span>
            <span className="font-semibold text-slate-900">{systemInfo.documents_count}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Quota utilisé</span>
            <span className="font-semibold text-slate-900">{(systemInfo.storage_used / 1024 / 1024).toFixed(1)} MB / {(systemInfo.storage_limit / 1024 / 1024 / 1024).toFixed(0)} GB</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[var(--color-primary,#4F46E5)] rounded-full" style={{ width: `${Math.min((systemInfo.storage_used / systemInfo.storage_limit) * 100, 100)}%` }} />
          </div>
        </div>
      </div>

      {/* Backup */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Database size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Sauvegarde
        </h3>
        <div className="flex gap-3">
          <button
            onClick={handleExportAll}
            disabled={exporting}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary,#4F46E5)] text-white rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            Exporter tout (JSON)
          </button>
          <button
            onClick={loadLogs}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200"
          >
            <RefreshCw size={14} />
            Actualiser
          </button>
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Clock size={18} className="text-[var(--color-primary,#4F46E5)]" />
            Journal système
          </h3>
          <select value={logFilter} onChange={e => setLogFilter(e.target.value)} className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs focus:border-[var(--color-primary,#4F46E5)] outline-none">
            <option value="all">Tous</option>
            <option value="CREATE">Créations</option>
            <option value="UPDATE">Modifications</option>
            <option value="DELETE">Suppressions</option>
            <option value="LOGIN">Connexions</option>
          </select>
        </div>

        {loadingLogs ? (
          <div className="text-center py-4"><Loader2 size={20} className="animate-spin mx-auto text-slate-400" /></div>
        ) : filteredLogs.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">Aucune activité</p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredLogs.map((log: any) => (
              <div key={log.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${actionColors[log.action] || 'bg-slate-100 text-slate-500'}`}>
                  {actionLabels[log.action] || log.action}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900 truncate">{log.entity_type || 'Système'} {log.entity_id ? `#${log.entity_id.slice(0, 8)}` : ''}</p>
                  <p className="text-xs text-slate-500">{log.user_name || log.user_id || 'Système'} • {log.created_at ? new Date(log.created_at).toLocaleString('fr-FR') : ''}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
