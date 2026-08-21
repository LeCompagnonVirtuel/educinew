'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbPointageEleves, type StudentPointageRecord, type StudentDashboardStats } from '@/lib/api/domains/pointage-eleves.service';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useRealtimeSubscription } from '@/hooks/useRealtime';
import { cn, getInitials } from '@/lib/utils';
import { exportToFile, type ExportColumn } from '@/lib/export-utils';
import Image from 'next/image';
import QRScanner from '@/components/ui/QRScanner';
import {
  Users, UserCheck, UserX, Clock, AlertTriangle,
  TrendingUp, QrCode, LogOut, Download, RefreshCw,
  BarChart3, ScanLine, GraduationCap, BookOpen, Loader2,
  CheckCircle, XCircle, AlertCircle, Search,
  Activity, Zap, ChevronDown, X, Hash,
  Target, FileText, ArrowUpRight, ArrowDownRight,
  Wifi, WifiOff, Printer, Camera,
} from 'lucide-react';

type ViewTab = 'dashboard' | 'scanner' | 'timeline' | 'table' | 'reports';
type StatusFilter = 'all' | 'PRESENT' | 'LATE' | 'ABSENT' | 'DEPARTED' | 'EXCUSED';

const STATUS_CONFIG: Record<string, { color: string; bg: string; dot: string; label: string; labelFr: string }> = {
  PRESENT: { color: 'text-emerald-700', bg: 'bg-emerald-100', dot: 'bg-emerald-500', label: 'Present', labelFr: 'Présent' },
  LATE: { color: 'text-amber-700', bg: 'bg-amber-100', dot: 'bg-amber-500', label: 'Late', labelFr: 'Retard' },
  ABSENT: { color: 'text-red-700', bg: 'bg-red-100', dot: 'bg-red-500', label: 'Absent', labelFr: 'Absent' },
  DEPARTED: { color: 'text-blue-700', bg: 'bg-blue-100', dot: 'bg-blue-500', label: 'Departed', labelFr: 'Parti' },
  EXCUSED: { color: 'text-slate-600', bg: 'bg-slate-100', dot: 'bg-slate-400', label: 'Excused', labelFr: 'Excusé' },
};

export default function PointageElevesPage() {
  const { user } = useAuth();
  const { lang } = useLanguage();

  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [stats, setStats] = useState<StudentDashboardStats | null>(null);
  const [records, setRecords] = useState<StudentPointageRecord[]>([]);
  const [scanInput, setScanInput] = useState('');
  const [scanLoading, setScanLoading] = useState(false);
  const [lastScanResult, setLastScanResult] = useState<{
    success: boolean; message: string; personName?: string; time?: string;
  } | null>(null);
  const [tableSearch, setTableSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [classFilter, setClassFilter] = useState('all');
  const [sortField, setSortField] = useState<'name' | 'time' | 'status'>('time');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [cameraMode, setCameraMode] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const scanInputRef = useRef<HTMLInputElement>(null);

  const fr = lang === 'fr';

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);
    return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline); };
  }, []);

  const showToast = useCallback((msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const loadAll = useCallback(async () => {
    if (!user?.schoolId) return;
    try {
      const [statsData, recordsData] = await Promise.all([
        sbPointageEleves.getDashboardStats(),
        sbPointageEleves.getTodayRecords(),
      ]);
      setStats(statsData);
      setRecords(recordsData);
      setLastSync(new Date());
    } catch (err: any) {
      showToast(err?.message || 'Erreur de chargement', 'error');
    }
  }, [user?.schoolId, showToast]);

  useEffect(() => {
    if (user?.schoolId) {
      loadAll().finally(() => setLoading(false));
    }
  }, [user?.schoolId, loadAll]);

  useRealtimeSubscription([
    { table: 'attendance', event: 'INSERT', onData: () => loadAll() },
    { table: 'attendance', event: 'UPDATE', onData: () => loadAll() },
  ]);

  useEffect(() => {
    const interval = setInterval(loadAll, 30000);
    return () => clearInterval(interval);
  }, [loadAll]);

  const handleQRScan = async (cameraCode?: string) => {
    const code = cameraCode || scanInput.trim();
    if (!code) { showToast(fr ? 'Saisissez un matricule' : 'Enter a matricule', 'error'); return; }
    setScanLoading(true);
    try {
      const result = await sbPointageEleves.scanQR(code, 'ARRIVAL');
      setLastScanResult({
        success: result.success,
        message: result.message,
        personName: result.person?.name,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
      if (result.success) { showToast(result.message, 'success'); loadAll(); }
      else { showToast(result.message, result.duplicate ? 'info' : 'error'); }
      setScanInput('');
      scanInputRef.current?.focus();
    } catch (err: any) {
      setLastScanResult({ success: false, message: err?.message || 'Erreur scan', time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) });
      showToast(err?.message || 'Erreur', 'error');
    } finally { setScanLoading(false); }
  };

  const handleExport = (format: 'excel' | 'pdf' | 'csv' = 'excel') => {
    const data = filteredSortedRecords.map(r => ({
      time: r.arrivalTime || '—', name: r.studentName, matricule: r.matricule || '—',
      className: r.className || '—', departure: r.departureTime || '—',
      status: fr ? (STATUS_CONFIG[r.status]?.labelFr || r.status) : (STATUS_CONFIG[r.status]?.label || r.status),
      method: r.method, lateMinutes: r.lateMinutes || 0,
    }));
    const columns: ExportColumn[] = [
      { header: fr ? 'Heure' : 'Time', key: 'time' }, { header: fr ? 'Nom' : 'Name', key: 'name' },
      { header: 'Matricule', key: 'matricule' }, { header: fr ? 'Classe' : 'Class', key: 'className' },
      { header: fr ? 'Départ' : 'Departure', key: 'departure' }, { header: fr ? 'Statut' : 'Status', key: 'status' },
      { header: fr ? 'Méthode' : 'Method', key: 'method' }, { header: fr ? 'Retard' : 'Late', key: 'lateMinutes' },
    ];
    exportToFile(data, columns, `pointage_eleves_${new Date().toISOString().split('T')[0]}`, format);
    showToast(fr ? 'Export téléchargé' : 'Export downloaded', 'success');
  };

  const filteredSortedRecords = useMemo(() => {
    let filtered = records.filter(r => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (classFilter !== 'all' && r.className !== classFilter) return false;
      if (tableSearch) {
        const s = tableSearch.toLowerCase();
        if (!r.studentName.toLowerCase().includes(s) &&
            !(r.matricule && r.matricule.toLowerCase().includes(s)) &&
            !(r.className && r.className.toLowerCase().includes(s))) return false;
      }
      return true;
    });
    filtered.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = a.studentName.localeCompare(b.studentName);
      else if (sortField === 'time') cmp = (a.arrivalTime || a.createdAt).localeCompare(b.arrivalTime || b.createdAt);
      else if (sortField === 'status') cmp = a.status.localeCompare(b.status);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return filtered;
  }, [records, statusFilter, classFilter, tableSearch, sortField, sortDir]);

  const uniqueClasses = useMemo(() => [...new Set(records.map(r => r.className).filter(Boolean))], [records]);

  const statusCfg = (status: string) => STATUS_CONFIG[status] || STATUS_CONFIG.ABSENT;
  const formatTime = (iso: string | null) => {
    if (!iso) return '—';
    try { return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); } catch { return '—'; }
  };

  if (loading || !stats) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: fr ? 'Pointage Élèves' : 'Student Attendance' }]}>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-emerald-600 animate-spin" />
              <GraduationCap size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600" />
            </div>
            <p className="text-slate-500 text-sm font-medium">{fr ? 'Chargement des données...' : 'Loading data...'}</p>
          </div>
        </div>
      </RoleLayout>
    );
  }

  const dateStr = currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const dateStrCapitalized = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  const tabs: { key: ViewTab; label: string; icon: any }[] = [
    { key: 'dashboard', label: fr ? 'Tableau de bord' : 'Dashboard', icon: Activity },
    { key: 'scanner', label: fr ? 'Scanner QR' : 'QR Scanner', icon: QrCode },
    { key: 'timeline', label: fr ? 'Activité' : 'Activity', icon: Clock },
    { key: 'table', label: fr ? 'Données' : 'Data', icon: FileText },
    { key: 'reports', label: fr ? 'Rapports' : 'Reports', icon: BarChart3 },
  ];

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: fr ? 'Pointage des Élèves' : 'Student Attendance' }]}>
      {toast && (
        <div className={cn(
          'fixed top-4 right-4 z-[100] px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2',
          'animate-[slideInRight_0.3s_ease-out]',
          toast.type === 'success' ? 'bg-emerald-500 text-white' : toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        )}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : toast.type === 'error' ? <XCircle size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="max-w-[1400px] mx-auto space-y-5 px-4 md:px-0">

        {/* ═══ PREMIUM HEADER WITH CLOCK ═══ */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 md:p-8 shadow-2xl shadow-slate-300">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30">
                  <GraduationCap size={22} className="text-emerald-300" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {fr ? 'Pointage des Élèves' : 'Student Attendance'}
                </h1>
              </div>
              <p className="text-slate-400 ml-[52px] text-sm">{dateStrCapitalized}</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 shadow-lg">
                <div className="font-mono text-5xl md:text-6xl font-bold text-white tracking-tight leading-none">
                  {String(currentTime.getHours()).padStart(2, '0')}
                  <span className="text-emerald-400 animate-pulse">:</span>
                  {String(currentTime.getMinutes()).padStart(2, '0')}
                  <span className="text-emerald-400 animate-pulse">:</span>
                  <span className="text-slate-300">{String(currentTime.getSeconds()).padStart(2, '0')}</span>
                </div>
                <p className="text-center text-xs text-slate-400 mt-2 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {fr ? 'Heure locale de l\'établissement' : 'School local time'}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                    <Wifi size={12} />{fr ? 'En ligne' : 'Online'}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full border border-red-400/20">
                    <WifiOff size={12} />{fr ? 'Hors ligne' : 'Offline'}
                  </span>
                )}
                <button onClick={loadAll} className="p-2 bg-white/10 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all">
                  <RefreshCw size={16} />
                </button>
              </div>
              {lastSync && <p className="text-[10px] text-slate-500">{fr ? 'Sync' : 'Sync'}: {lastSync.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>}
            </div>
          </div>

          <div className="relative mt-6 pt-5 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20"><UserCheck size={18} className="text-emerald-400" /></div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.present + stats.late}</p>
                <p className="text-[11px] text-slate-400">{fr ? 'Présents' : 'Present'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20"><Clock size={18} className="text-amber-400" /></div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.late}</p>
                <p className="text-[11px] text-slate-400">{fr ? 'Retards' : 'Late'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20"><UserX size={18} className="text-red-400" /></div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.absent}</p>
                <p className="text-[11px] text-slate-400">{fr ? 'Absents' : 'Absent'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-500/20"><AlertTriangle size={18} className="text-slate-400" /></div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.notCheckedIn}</p>
                <p className="text-[11px] text-slate-400">{fr ? 'Non pointés' : 'Not checked'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ TABS ═══ */}
        <div className="flex items-center gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-100 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
              activeTab === tab.key ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            )}>
              <tab.icon size={16} />{tab.label}
            </button>
          ))}
        </div>

        {/* ═══ DASHBOARD ═══ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 transition-colors"><Target size={18} className="text-emerald-600" /></div>
                  <span className="text-xs font-medium text-slate-400 uppercase">{fr ? 'Présence' : 'Attendance'}</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{stats.attendanceRate}%</p>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-3"><div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${stats.attendanceRate}%` }} /></div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-slate-200 transition-colors"><Users size={18} className="text-slate-600" /></div>
                  <span className="text-xs font-medium text-slate-400 uppercase">{fr ? 'Total' : 'Total'}</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{stats.totalStudents}</p>
                <p className="text-xs text-slate-400 mt-1">{fr ? 'élèves inscrits' : 'enrolled students'}</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-amber-100 group-hover:bg-amber-200 transition-colors"><Zap size={18} className="text-amber-600" /></div>
                  <span className="text-xs font-medium text-slate-400 uppercase">{fr ? 'Ponctualité' : 'Punctuality'}</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{stats.totalStudents > 0 ? Math.round(((stats.present + stats.late - stats.late) / Math.max(stats.present + stats.late, 1)) * 100) : 0}%</p>
                <p className="text-xs text-slate-400 mt-1">{fr ? 'arrivées à l\'heure' : 'on-time arrivals'}</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors"><TrendingUp size={18} className="text-blue-600" /></div>
                  <span className="text-xs font-medium text-slate-400 uppercase">{fr ? 'Taux retard' : 'Late Rate'}</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{stats.lateRate}%</p>
                <p className="text-xs text-slate-400 mt-1">{fr ? 'des présents' : 'of present'}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2"><Activity size={18} className="text-emerald-500" />{fr ? 'Répartition des présences' : 'Attendance Distribution'}</h3>
                <span className="text-sm font-bold text-emerald-600">{stats.attendanceRate}%</span>
              </div>
              <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${stats.attendanceRate}%` }} />
                <div className="bg-amber-500 h-full transition-all duration-1000" style={{ width: `${stats.lateRate}%` }} />
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />{fr ? 'Présents' : 'Present'}: {stats.present}</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" />{fr ? 'Retards' : 'Late'}: {stats.late}</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400" />{fr ? 'Absents' : 'Absent'}: {stats.absent}</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300" />{fr ? 'Non pointés' : 'Not checked'}: {stats.notCheckedIn}</span>
              </div>
            </div>

            {stats.byClass.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100"><h3 className="font-semibold text-slate-800 flex items-center gap-2"><BookOpen size={16} className="text-emerald-500" />{fr ? 'Présences par classe' : 'Attendance by class'}</h3></div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-5 py-3 font-semibold text-slate-600">{fr ? 'Classe' : 'Class'}</th>
                      <th className="text-center px-4 py-3 font-semibold text-slate-600">Total</th>
                      <th className="text-center px-4 py-3 font-semibold text-emerald-600">{fr ? 'Présents' : 'Present'}</th>
                      <th className="text-center px-4 py-3 font-semibold text-amber-600">{fr ? 'Retards' : 'Late'}</th>
                      <th className="text-center px-4 py-3 font-semibold text-red-500">{fr ? 'Absents' : 'Absent'}</th>
                      <th className="text-center px-4 py-3 font-semibold text-slate-600">{fr ? 'Taux' : 'Rate'}</th>
                      <th className="text-left px-5 py-3 font-semibold text-slate-600 w-36"></th>
                    </tr></thead>
                    <tbody>{stats.byClass.map((cs, i) => (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3 font-medium text-slate-800">{cs.className}</td>
                        <td className="px-4 py-3 text-center font-semibold text-slate-700">{cs.total}</td>
                        <td className="px-4 py-3 text-center font-semibold text-emerald-600">{cs.present}</td>
                        <td className="px-4 py-3 text-center font-semibold text-amber-600">{cs.late}</td>
                        <td className="px-4 py-3 text-center font-semibold text-red-500">{cs.absent}</td>
                        <td className="px-4 py-3 text-center"><span className={cn('px-2.5 py-1 rounded-full text-xs font-bold', cs.rate >= 90 ? 'bg-emerald-100 text-emerald-700' : cs.rate >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>{cs.rate}%</span></td>
                        <td className="px-5 py-3"><div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className={cn('h-full rounded-full transition-all', cs.rate >= 90 ? 'bg-emerald-400' : cs.rate >= 70 ? 'bg-amber-400' : 'bg-red-400')} style={{ width: `${cs.rate}%` }} /></div></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.byLevel.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><BarChart3 size={16} className="text-emerald-500" />{fr ? 'Par niveau' : 'By level'}</h4>
                  <div className="space-y-3">{stats.byLevel.map((lv, i) => (
                    <div key={i}><div className="flex justify-between text-sm mb-1"><span className="text-slate-600">{lv.level}</span><span className="font-semibold text-slate-800">{lv.present}/{lv.total} ({lv.rate}%)</span></div><div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-400 rounded-full" style={{ width: `${lv.rate}%` }} /></div></div>
                  ))}</div>
                </div>
              )}
              {stats.byGender.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Users size={16} className="text-emerald-500" />{fr ? 'Par sexe' : 'By gender'}</h4>
                  <div className="space-y-3">{stats.byGender.map((g, i) => (
                    <div key={i}><div className="flex justify-between text-sm mb-1"><span className="text-slate-600">{g.gender === 'M' ? 'Masculin' : g.gender === 'F' ? 'Féminin' : g.gender}</span><span className="font-semibold text-slate-800">{g.present}/{g.total} ({g.rate}%)</span></div><div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-teal-400 rounded-full" style={{ width: `${g.rate}%` }} /></div></div>
                  ))}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ SCANNER ═══ */}
        {activeTab === 'scanner' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
              <div className="flex flex-col items-center gap-5 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <ScanLine size={28} className="text-slate-600" />
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-bold text-slate-900 mb-1">{fr ? 'Scanner un QR Code Élève' : 'Scan Student QR Code'}</h2>
                  <p className="text-slate-500 text-sm">{fr ? 'Caméra ou saisie manuelle du matricule' : 'Camera or manual matricule entry'}</p>
                </div>

                {/* Toggle camera / manual */}
                <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 w-full">
                  <button onClick={() => setCameraMode(true)} className={cn('flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all', cameraMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700')}>
                    <Camera size={16} />{fr ? 'Caméra' : 'Camera'}
                  </button>
                  <button onClick={() => setCameraMode(false)} className={cn('flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all', !cameraMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700')}>
                    <Hash size={16} />{fr ? 'Manuel' : 'Manual'}
                  </button>
                </div>

                {/* Camera mode */}
                {cameraMode && (
                  <div className="w-full">
                    {typeof window !== 'undefined' && (
                      <QRScanner
                        active={cameraMode}
                        onScan={(data) => { handleQRScan(data); }}
                        onError={(err) => showToast(err, 'error')}
                      />
                    )}
                  </div>
                )}

                {/* Manual mode */}
                {!cameraMode && (
                  <div className="w-full">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 relative">
                        <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          ref={scanInputRef}
                          type="text"
                          value={scanInput}
                          onChange={e => setScanInput(e.target.value.toUpperCase())}
                          onKeyDown={e => e.key === 'Enter' && handleQRScan()}
                          placeholder="16137807D"
                          className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none text-lg font-mono text-center tracking-wider transition-all"
                          disabled={scanLoading}
                          autoFocus
                        />
                      </div>
                      <button
                        onClick={() => handleQRScan()}
                        disabled={scanLoading || !scanInput.trim()}
                        className={cn(
                          'px-6 py-4 rounded-xl font-medium transition-all',
                          scanLoading || !scanInput.trim()
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] shadow-sm'
                        )}
                      >
                        {scanLoading ? <Loader2 size={20} className="animate-spin" /> : <ScanLine size={20} />}
                      </button>
                    </div>
                    <p className="text-center text-xs text-slate-400 mt-3">{fr ? 'Format : 8 chiffres + 1 lettre (ex: 16137807D)' : 'Format: 8 digits + 1 letter (e.g. 16137807D)'}</p>
                  </div>
                )}
              </div>
            </div>

            {lastScanResult && (
              <div className={cn('rounded-2xl p-5 border transition-all', lastScanResult.success ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200')}>
                <div className="flex items-start gap-4">
                  <div className={cn('p-2.5 rounded-xl', lastScanResult.success ? 'bg-emerald-100' : 'bg-red-100')}>
                    {lastScanResult.success ? <CheckCircle size={22} className="text-emerald-600" /> : <XCircle size={22} className="text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <h3 className={cn('font-bold', lastScanResult.success ? 'text-emerald-800' : 'text-red-800')}>{lastScanResult.success ? (fr ? 'Pointage réussi' : 'Check-in successful') : (fr ? 'Échec du pointage' : 'Check-in failed')}</h3>
                    <p className={cn('text-sm mt-0.5', lastScanResult.success ? 'text-emerald-600' : 'text-red-600')}>{lastScanResult.message}</p>
                    {lastScanResult.personName && <p className="text-sm text-slate-600 mt-1 font-medium">{lastScanResult.personName}</p>}
                    {lastScanResult.time && <p className="text-xs text-slate-400 mt-1 font-mono">{lastScanResult.time}</p>}
                  </div>
                  <button onClick={() => setLastScanResult(null)} className="text-slate-400 hover:text-slate-600 p-1"><X size={16} /></button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ TIMELINE ═══ */}
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2"><Clock size={18} className="text-emerald-500" />{fr ? 'Activité en temps réel' : 'Real-time Activity'}</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            {records.length === 0 ? (
              <div className="text-center py-20"><Activity size={48} className="text-slate-200 mx-auto mb-4" /><p className="text-slate-400">{fr ? 'Aucun pointage aujourd\'hui' : 'No check-ins today'}</p></div>
            ) : (
              <div className="relative"><div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-slate-100" /><div className="divide-y divide-slate-50">
                {records.map((record) => (
                  <div key={record.id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                    <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 flex-shrink-0 border-2 border-white shadow-sm overflow-hidden', record.status === 'PRESENT' ? 'bg-emerald-100 text-emerald-700' : record.status === 'LATE' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600')}>
                      {record.studentPhoto ? <Image src={record.studentPhoto} alt="" width={40} height={40} unoptimized className="rounded-full object-cover" /> : getInitials(record.studentName)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-700"><span className="font-semibold">{record.studentName}</span>{' '}<span className="text-slate-500">{record.status === 'LATE' ? fr ? 'est arrivé(e) en retard' : 'arrived late' : fr ? 'est arrivé(e)' : 'arrived'}</span></p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="font-mono text-xs text-slate-500">{formatTime(record.arrivalTime)}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">{record.method}</span>
                        {record.matricule && <span className="text-[10px] text-slate-400 font-mono">{record.matricule}</span>}
                        {record.className && <span className="text-[10px] text-slate-400">{record.className}</span>}
                      </div>
                    </div>
                    <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-medium', statusCfg(record.status).bg, statusCfg(record.status).color)}>{fr ? statusCfg(record.status).labelFr : statusCfg(record.status).label}</span>
                  </div>
                ))}
              </div></div>
            )}
          </div>
        )}

        {/* ═══ TABLE ═══ */}
        {activeTab === 'table' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <div className="flex-1 relative w-full md:w-auto"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={tableSearch} onChange={e => setTableSearch(e.target.value)} placeholder={fr ? 'Rechercher un nom, matricule...' : 'Search name, ID...'} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none text-sm transition-all" /></div>
                <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                  <div className="relative flex-1 md:flex-initial"><select value={statusFilter} onChange={e => setStatusFilter(e.target.value as StatusFilter)} className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-slate-400 outline-none text-sm bg-white cursor-pointer"><option value="all">{fr ? 'Tous les statuts' : 'All statuses'}</option><option value="PRESENT">Présent</option><option value="LATE">Retard</option><option value="ABSENT">Absent</option><option value="DEPARTED">Parti</option><option value="EXCUSED">Excusé</option></select><ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" /></div>
                  {uniqueClasses.length > 0 && <div className="relative flex-1 md:flex-initial"><select value={classFilter} onChange={e => setClassFilter(e.target.value)} className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-slate-400 outline-none text-sm bg-white cursor-pointer"><option value="all">{fr ? 'Toutes les classes' : 'All classes'}</option>{uniqueClasses.map(c => <option key={c} value={c}>{c}</option>)}</select><ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" /></div>}
                  <div className="relative flex-1 md:flex-initial"><select value={sortField} onChange={e => setSortField(e.target.value as any)} className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-slate-400 outline-none text-sm bg-white cursor-pointer"><option value="time">{fr ? 'Trier par heure' : 'Sort by time'}</option><option value="name">{fr ? 'Trier par nom' : 'Sort by name'}</option><option value="status">{fr ? 'Trier par statut' : 'Sort by status'}</option></select><ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" /></div>
                  <button onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')} className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">{sortDir === 'asc' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}</button>
                  <button onClick={() => handleExport('excel')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-medium transition-colors whitespace-nowrap"><Download size={16} />{fr ? 'Exporter' : 'Export'}</button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{fr ? 'Élève' : 'Student'}</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{fr ? 'Classe' : 'Class'}</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{fr ? 'Arrivée' : 'Arrival'}</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{fr ? 'Départ' : 'Departure'}</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{fr ? 'Statut' : 'Status'}</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{fr ? 'Méthode' : 'Method'}</th>
                  </tr></thead>
                  <tbody>{filteredSortedRecords.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-16 text-slate-400">{fr ? 'Aucun enregistrement trouvé' : 'No records found'}</td></tr>
                  ) : filteredSortedRecords.map((record) => (
                    <tr key={record.id} className="border-b border-slate-50 hover:bg-emerald-50/30 transition-colors">
                      <td className="px-5 py-3"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center flex-shrink-0">{record.studentPhoto ? <Image src={record.studentPhoto} alt="" width={36} height={36} unoptimized className="rounded-full object-cover" /> : <span className="text-xs font-bold text-slate-500">{getInitials(record.studentName)}</span>}</div><div><p className="font-medium text-slate-800">{record.studentName}</p>{record.matricule && <p className="text-xs text-slate-400 font-mono">{record.matricule}</p>}</div></div></td>
                      <td className="px-5 py-3 text-slate-600">{record.className || '—'}</td>
                      <td className="px-5 py-3 font-mono text-slate-700">{formatTime(record.arrivalTime)}</td>
                      <td className="px-5 py-3 font-mono text-slate-700">{formatTime(record.departureTime)}</td>
                      <td className="px-5 py-3"><span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold', statusCfg(record.status).bg, statusCfg(record.status).color)}><span className={cn('w-1.5 h-1.5 rounded-full', statusCfg(record.status).dot)} />{fr ? statusCfg(record.status).labelFr : statusCfg(record.status).label}</span></td>
                      <td className="px-5 py-3"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">{record.method}</span></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
              {filteredSortedRecords.length > 0 && <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between"><span>{filteredSortedRecords.length} {fr ? 'enregistrement(s)' : 'record(s)'}</span><span>{fr ? 'Dernière sync' : 'Last sync'}: {lastSync?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) || '—'}</span></div>}
            </div>
          </div>
        )}

        {/* ═══ REPORTS ═══ */}
        {activeTab === 'reports' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Download size={18} className="text-slate-600" />{fr ? 'Exporter les données' : 'Export Data'}</h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => handleExport('excel')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-sm font-medium transition-colors border border-emerald-200"><FileText size={16} />Excel</button>
                <button onClick={() => handleExport('csv')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium transition-colors border border-blue-200"><FileText size={16} />CSV</button>
                <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-sm font-medium transition-colors border border-red-200"><FileText size={16} />PDF</button>
                <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 text-sm font-medium transition-colors border border-slate-200"><Printer size={16} />{fr ? 'Imprimer' : 'Print'}</button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"><p className="text-xs font-semibold text-slate-400 uppercase mb-1">{fr ? 'Total élèves' : 'Total'}</p><p className="text-3xl font-bold text-slate-900">{stats.totalStudents}</p></div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"><p className="text-xs font-semibold text-slate-400 uppercase mb-1">{fr ? 'Présence' : 'Attendance'}</p><p className="text-3xl font-bold text-emerald-600">{stats.attendanceRate}%</p></div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"><p className="text-xs font-semibold text-slate-400 uppercase mb-1">{fr ? 'Retards' : 'Late Rate'}</p><p className="text-3xl font-bold text-amber-600">{stats.lateRate}%</p></div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"><p className="text-xs font-semibold text-slate-400 uppercase mb-1">{fr ? 'Non pointés' : 'Not Checked'}</p><p className="text-3xl font-bold text-slate-500">{stats.notCheckedIn}</p></div>
            </div>
            {stats.byClass.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2"><BarChart3 size={16} className="text-slate-600" />{fr ? 'Statistiques par classe' : 'Class statistics'}</h3>
                  <button onClick={() => { const data = stats.byClass.map(cs => ({ classe: cs.className, total: cs.total, presents: cs.present, absents: cs.absent, retards: cs.late, taux: `${cs.rate}%` })); exportToFile(data, [{ header: 'Classe', key: 'classe' }, { header: 'Total', key: 'total' }, { header: 'Présents', key: 'presents' }, { header: 'Absents', key: 'absents' }, { header: 'Retards', key: 'retards' }, { header: 'Taux', key: 'taux' }], `stats_classes_${new Date().toISOString().split('T')[0]}`, 'excel'); showToast('Exporté', 'success'); }} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"><Download size={14} />{fr ? 'Exporter' : 'Export'}</button>
                </div>
                <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-slate-50 border-b border-slate-100"><th className="text-left px-6 py-3 font-semibold text-slate-600">{fr ? 'Classe' : 'Class'}</th><th className="text-center px-4 py-3 font-semibold text-slate-600">Total</th><th className="text-center px-4 py-3 font-semibold text-emerald-600">{fr ? 'Présents' : 'Present'}</th><th className="text-center px-4 py-3 font-semibold text-amber-600">{fr ? 'Retards' : 'Late'}</th><th className="text-center px-4 py-3 font-semibold text-red-500">{fr ? 'Absents' : 'Absent'}</th><th className="text-center px-4 py-3 font-semibold text-slate-600">{fr ? 'Taux' : 'Rate'}</th></tr></thead><tbody>{stats.byClass.map((cs, i) => (<tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50"><td className="px-6 py-3 font-medium text-slate-800">{cs.className}</td><td className="px-4 py-3 text-center font-semibold text-slate-700">{cs.total}</td><td className="px-4 py-3 text-center font-semibold text-emerald-600">{cs.present}</td><td className="px-4 py-3 text-center font-semibold text-amber-600">{cs.late}</td><td className="px-4 py-3 text-center font-semibold text-red-500">{cs.absent}</td><td className="px-4 py-3 text-center"><span className={cn('px-2.5 py-1 rounded-full text-xs font-bold', cs.rate >= 90 ? 'bg-emerald-100 text-emerald-700' : cs.rate >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>{cs.rate}%</span></td></tr>))}</tbody></table></div>
              </div>
            )}
          </div>
        )}
      </div>
    </RoleLayout>
  );
}
