'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbPointagePersonnel, type StaffPointageRecord, type StaffDashboardStats, type ActivityEvent } from '@/lib/api/domains/pointage-personnel.service';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useRealtimeSubscription } from '@/hooks/useRealtime';
import { cn, getInitials } from '@/lib/utils';
import { exportToFile, type ExportColumn } from '@/lib/export-utils';
import Image from 'next/image';
import QRScanner from '@/components/ui/QRScanner';
import {
  Users, UserCheck, UserX, Clock, AlertTriangle, Calendar,
  TrendingUp, QrCode, LogIn, LogOut, Download, RefreshCw,
  BarChart3, ScanLine, GraduationCap, BookOpen, Loader2,
  CheckCircle, XCircle, AlertCircle, Search, Filter,
  Activity, Zap, Eye, ChevronDown, X, Hash,
  Target, FileText, Building2, Timer, Briefcase,
  Wifi, WifiOff, ArrowUpRight, ArrowDownRight, Coffee,
  UserPlus, ChevronRight, MoreHorizontal, Printer, Camera,
} from 'lucide-react';

type ViewTab = 'dashboard' | 'scanner' | 'timeline' | 'table' | 'reports';
type StatusFilter = 'all' | 'PRESENT' | 'LATE' | 'ABSENT' | 'DEPARTED' | 'ON_BREAK';
type CategoryFilter = 'all' | 'teacher' | 'admin_staff';

const STATUS_CONFIG: Record<string, { color: string; bg: string; dot: string; label: string; labelFr: string }> = {
  PRESENT: { color: 'text-emerald-700', bg: 'bg-emerald-100', dot: 'bg-emerald-500', label: 'Present', labelFr: 'Présent' },
  LATE: { color: 'text-amber-700', bg: 'bg-amber-100', dot: 'bg-amber-500', label: 'Late', labelFr: 'Retard' },
  ABSENT: { color: 'text-red-700', bg: 'bg-red-100', dot: 'bg-red-500', label: 'Absent', labelFr: 'Absent' },
  DEPARTED: { color: 'text-blue-700', bg: 'bg-blue-100', dot: 'bg-blue-500', label: 'Departed', labelFr: 'Parti' },
  ON_BREAK: { color: 'text-purple-700', bg: 'bg-purple-100', dot: 'bg-purple-500', label: 'On Break', labelFr: 'En pause' },
  EXCUSED: { color: 'text-slate-600', bg: 'bg-slate-100', dot: 'bg-slate-400', label: 'Excused', labelFr: 'Excusé' },
};

function formatMinutes(mins: number): string {
  if (mins <= 0) return '0h00';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h${String(m).padStart(2, '0')}`;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'à l\'instant';
  if (mins < 60) return `il y a ${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `il y a ${hours}h`;
  return `il y a ${Math.floor(hours / 24)}j`;
}

export default function PointagePersonnelPage() {
  const { user } = useAuth();
  const { lang } = useLanguage();

  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [stats, setStats] = useState<StaffDashboardStats | null>(null);
  const [records, setRecords] = useState<StaffPointageRecord[]>([]);
  const [scanInput, setScanInput] = useState('');
  const [scanLoading, setScanLoading] = useState(false);
  const [lastScanResult, setLastScanResult] = useState<{
    success: boolean; message: string; personName?: string; personRole?: string; time?: string;
  } | null>(null);
  const [tableSearch, setTableSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [sortField, setSortField] = useState<'name' | 'time' | 'status'>('time');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [cameraMode, setCameraMode] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [historyRange, setHistoryRange] = useState<'today' | 'yesterday' | 'week' | 'month'>('today');
  const scanInputRef = useRef<HTMLInputElement>(null);

  const fr = lang === 'fr';

  // ─── Clock ─────────────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ─── Online detection ──────────────────────────────────────────────
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const showToast = useCallback((msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // ─── Data loading ──────────────────────────────────────────────────
  const loadAll = useCallback(async () => {
    if (!user?.schoolId) return;
    try {
      const [statsData, recordsData] = await Promise.all([
        sbPointagePersonnel.getDashboardStats(),
        sbPointagePersonnel.getTodayRecords(),
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

  // ─── Realtime ──────────────────────────────────────────────────────
  useRealtimeSubscription([
    { table: 'teacher_attendance', event: '*', onData: () => { loadAll(); } },
    { table: 'staff_attendance', event: '*', onData: () => { loadAll(); } },
  ]);

  // ─── Auto-refresh fallback ─────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(loadAll, 30000);
    return () => clearInterval(interval);
  }, [loadAll]);

  // ─── QR Scan handler ───────────────────────────────────────────────
  const handleQRScan = async (cameraCode?: string) => {
    const code = cameraCode || scanInput.trim();
    if (!code) { showToast(fr ? 'Saisissez un code' : 'Enter a code', 'error'); return; }
    setScanLoading(true);
    try {
      const result = await sbPointagePersonnel.scanQR(code, 'ARRIVAL');
      setLastScanResult({
        success: result.success,
        message: result.message,
        personName: result.person?.name,
        personRole: result.person?.role,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
      if (result.success) { showToast(result.message, 'success'); loadAll(); }
      else { showToast(result.message, 'error'); }
      setScanInput('');
      scanInputRef.current?.focus();
    } catch (err: any) {
      setLastScanResult({ success: false, message: err?.message || 'Erreur scan', time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) });
      showToast(err?.message || 'Erreur', 'error');
    } finally { setScanLoading(false); }
  };

  // ─── Export ────────────────────────────────────────────────────────
  const handleExport = (format: 'excel' | 'pdf' | 'csv' = 'excel') => {
    const data = filteredSortedRecords.map(r => ({
      time: r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString('fr-FR') : '—',
      name: r.personName,
      role: r.personRole,
      category: r.category === 'teacher' ? 'Enseignant' : 'Personnel',
      department: r.department || '—',
      checkout: r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString('fr-FR') : '—',
      workTime: r.totalWorkMinutes > 0 ? formatMinutes(r.totalWorkMinutes) : '—',
      status: fr ? (STATUS_CONFIG[r.status]?.labelFr || r.status) : (STATUS_CONFIG[r.status]?.label || r.status),
      method: r.method,
      lateMinutes: r.lateMinutes || 0,
    }));
    const columns: ExportColumn[] = [
      { header: fr ? 'Heure' : 'Time', key: 'time' },
      { header: fr ? 'Nom' : 'Name', key: 'name' },
      { header: fr ? 'Fonction' : 'Role', key: 'role' },
      { header: fr ? 'Catégorie' : 'Category', key: 'category' },
      { header: fr ? 'Département' : 'Department', key: 'department' },
      { header: fr ? 'Départ' : 'Departure', key: 'checkout' },
      { header: fr ? 'Temps travail' : 'Work Time', key: 'workTime' },
      { header: fr ? 'Statut' : 'Status', key: 'status' },
      { header: fr ? 'Méthode' : 'Method', key: 'method' },
      { header: fr ? 'Retard (min)' : 'Late (min)', key: 'lateMinutes' },
    ];
    const filename = `pointage_personnel_${new Date().toISOString().split('T')[0]}`;
    exportToFile(data, columns, filename, format);
    showToast(fr ? 'Export téléchargé' : 'Export downloaded', 'success');
  };

  // ─── Filtered & sorted records ─────────────────────────────────────
  const filteredSortedRecords = useMemo(() => {
    let filtered = records.filter(r => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && r.category !== categoryFilter) return false;
      if (tableSearch) {
        const s = tableSearch.toLowerCase();
        if (!r.personName.toLowerCase().includes(s) &&
            !(r.matricule && r.matricule.toLowerCase().includes(s)) &&
            !(r.personRole && r.personRole.toLowerCase().includes(s)) &&
            !(r.department && r.department.toLowerCase().includes(s))) return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = a.personName.localeCompare(b.personName);
      else if (sortField === 'time') cmp = (a.checkInTime || a.createdAt).localeCompare(b.checkInTime || b.createdAt);
      else if (sortField === 'status') cmp = a.status.localeCompare(b.status);
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return filtered;
  }, [records, statusFilter, categoryFilter, tableSearch, sortField, sortDir]);

  // ─── Status helpers ────────────────────────────────────────────────
  const statusCfg = (status: string) => STATUS_CONFIG[status] || STATUS_CONFIG.ABSENT;
  const formatTime = (iso: string | null) => {
    if (!iso) return '—';
    try { return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); } catch { return '—'; }
  };

  // ─── Loading state ─────────────────────────────────────────────────
  if (loading || !stats) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: fr ? 'Pointage Personnel' : 'Staff Attendance' }]}>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
              <Briefcase size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-violet-600" />
            </div>
            <p className="text-slate-500 text-sm font-medium">{fr ? 'Chargement des données...' : 'Loading data...'}</p>
          </div>
        </div>
      </RoleLayout>
    );
  }

  // ─── Date formatting ───────────────────────────────────────────────
  const dateStr = currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const dateStrCapitalized = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  // ─── Tabs config ───────────────────────────────────────────────────
  const tabs: { key: ViewTab; label: string; icon: any }[] = [
    { key: 'dashboard', label: fr ? 'Tableau de bord' : 'Dashboard', icon: Activity },
    { key: 'scanner', label: fr ? 'Scanner QR' : 'QR Scanner', icon: QrCode },
    { key: 'timeline', label: fr ? 'Activité' : 'Activity', icon: Clock },
    { key: 'table', label: fr ? 'Données' : 'Data', icon: FileText },
    { key: 'reports', label: fr ? 'Rapports' : 'Reports', icon: BarChart3 },
  ];

  // ─── Activity action labels ────────────────────────────────────────
  const actionLabel = (evt: ActivityEvent) => {
    if (evt.action === 'ARRIVAL') return fr ? 'est arrivé(e)' : 'arrived';
    if (evt.action === 'DEPARTURE') return fr ? 'est parti(e)' : 'left';
    if (evt.action === 'LATE') return fr ? `est arrivé(e) en retard (+${evt.lateMinutes}min)` : `arrived late (+${evt.lateMinutes}min)`;
    if (evt.action === 'BREAK_START') return fr ? 'a pris une pause' : 'started break';
    if (evt.action === 'BREAK_END') return fr ? 'a repris le travail' : 'ended break';
    return evt.action;
  };

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: fr ? 'Pointage du Personnel' : 'Staff Attendance' }]}>
      {/* Toast */}
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

        {/* ═══════════════════════════════════════════════════════════════
            PREMIUM HEADER WITH CLOCK
        ═══════════════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-violet-950 rounded-3xl p-6 md:p-8 shadow-2xl shadow-slate-300">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left: Title + Date */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-violet-500/20 border border-violet-400/30">
                  <Briefcase size={22} className="text-violet-300" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {fr ? 'Pointage du Personnel' : 'Staff Attendance'}
                </h1>
              </div>
              <p className="text-slate-400 ml-[52px] text-sm">
                {dateStrCapitalized}
              </p>
            </div>

            {/* Center: Premium Clock */}
            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 shadow-lg">
                <div className="font-mono text-5xl md:text-6xl font-bold text-white tracking-tight leading-none">
                  {String(currentTime.getHours()).padStart(2, '0')}
                  <span className="text-violet-400 animate-pulse">:</span>
                  {String(currentTime.getMinutes()).padStart(2, '0')}
                  <span className="text-violet-400 animate-pulse">:</span>
                  <span className="text-slate-300">{String(currentTime.getSeconds()).padStart(2, '0')}</span>
                </div>
                <p className="text-center text-xs text-slate-400 mt-2 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {fr ? 'Heure locale de l\'établissement' : 'School local time'}
                </p>
              </div>
            </div>

            {/* Right: Status + Sync */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                    <Wifi size={12} />
                    {fr ? 'En ligne' : 'Online'}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full border border-red-400/20">
                    <WifiOff size={12} />
                    {fr ? 'Hors ligne' : 'Offline'}
                  </span>
                )}
                <button onClick={loadAll} className="p-2 bg-white/10 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all" title={fr ? 'Rafraîchir' : 'Refresh'}>
                  <RefreshCw size={16} />
                </button>
              </div>
              {lastSync && (
                <p className="text-[10px] text-slate-500">
                  {fr ? 'Sync' : 'Sync'}: {lastSync.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
              )}
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="relative mt-6 pt-5 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <UserCheck size={18} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalPresent}</p>
                <p className="text-[11px] text-slate-400">{fr ? 'Présents' : 'Present'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Clock size={18} className="text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalLate}</p>
                <p className="text-[11px] text-slate-400">{fr ? 'Retards' : 'Late'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Coffee size={18} className="text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalOnBreak}</p>
                <p className="text-[11px] text-slate-400">{fr ? 'En pause' : 'On break'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-500/20">
                <UserX size={18} className="text-slate-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.notCheckedIn}</p>
                <p className="text-[11px] text-slate-400">{fr ? 'Non pointés' : 'Not checked'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            TAB NAVIGATION
        ═══════════════════════════════════════════════════════════════ */}
        <div className="flex items-center gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-100 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
                activeTab === tab.key
                  ? 'bg-violet-600 text-white shadow-sm shadow-violet-200'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            TAB 1 — DASHBOARD
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card: Attendance Rate */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-violet-100 group-hover:bg-violet-200 transition-colors">
                    <Target size={18} className="text-violet-600" />
                  </div>
                  <span className="text-xs font-medium text-slate-400 uppercase">{fr ? 'Présence' : 'Attendance'}</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{stats.attendanceRate}%</p>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-violet-500 rounded-full transition-all duration-1000" style={{ width: `${stats.attendanceRate}%` }} />
                </div>
              </div>

              {/* Card: Teachers */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-indigo-100 group-hover:bg-indigo-200 transition-colors">
                    <GraduationCap size={18} className="text-indigo-600" />
                  </div>
                  <span className="text-xs font-medium text-slate-400 uppercase">{fr ? 'Enseignants' : 'Teachers'}</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{stats.teachersPresent + stats.teachersLate}<span className="text-lg text-slate-400">/{stats.totalTeachers}</span></p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs text-emerald-600 font-medium">{stats.teachersPresent} {fr ? 'prés.' : 'pres.'}</span>
                  <span className="text-xs text-amber-600 font-medium">{stats.teachersLate} {fr ? 'ret.' : 'late'}</span>
                </div>
              </div>

              {/* Card: Staff */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-purple-100 group-hover:bg-purple-200 transition-colors">
                    <Building2 size={18} className="text-purple-600" />
                  </div>
                  <span className="text-xs font-medium text-slate-400 uppercase">{fr ? 'Personnel' : 'Staff'}</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{stats.staffPresent + stats.staffLate}<span className="text-lg text-slate-400">/{stats.totalStaff}</span></p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs text-emerald-600 font-medium">{stats.staffPresent} {fr ? 'prés.' : 'pres.'}</span>
                  <span className="text-xs text-purple-600 font-medium">{stats.staffOnBreak} {fr ? 'pause' : 'break'}</span>
                </div>
              </div>

              {/* Card: Avg Work Time */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-amber-100 group-hover:bg-amber-200 transition-colors">
                    <Timer size={18} className="text-amber-600" />
                  </div>
                  <span className="text-xs font-medium text-slate-400 uppercase">{fr ? 'Temps moyen' : 'Avg Time'}</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{formatMinutes(stats.avgWorkMinutes)}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs text-amber-600 font-medium">{fr ? 'Suppl.' : 'OT'}: {formatMinutes(stats.totalOvertime)}</span>
                </div>
              </div>
            </div>

            {/* Attendance Bar */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Activity size={18} className="text-violet-500" />
                  {fr ? 'Répartition des présences' : 'Attendance Distribution'}
                </h3>
                <span className="text-sm font-bold text-violet-600">{stats.attendanceRate}%</span>
              </div>
              <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${stats.totalPersonnel > 0 ? ((stats.totalPresent - stats.totalLate) / stats.totalPersonnel) * 100 : 0}%` }} title={fr ? 'Présents' : 'Present'} />
                <div className="bg-amber-500 h-full transition-all duration-1000" style={{ width: `${stats.totalPersonnel > 0 ? (stats.totalLate / stats.totalPersonnel) * 100 : 0}%` }} title={fr ? 'Retards' : 'Late'} />
                <div className="bg-purple-500 h-full transition-all duration-1000" style={{ width: `${stats.totalPersonnel > 0 ? (stats.totalOnBreak / stats.totalPersonnel) * 100 : 0}%` }} title={fr ? 'En pause' : 'On Break'} />
                <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${stats.totalPersonnel > 0 ? (stats.totalDeparted / stats.totalPersonnel) * 100 : 0}%` }} title={fr ? 'Partis' : 'Departed'} />
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />{fr ? 'Présents' : 'Present'}: {stats.totalPresent - stats.totalLate}</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" />{fr ? 'Retards' : 'Late'}: {stats.totalLate}</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" />{fr ? 'En pause' : 'On Break'}: {stats.totalOnBreak}</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" />{fr ? 'Partis' : 'Departed'}: {stats.totalDeparted}</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300" />{fr ? 'Non pointés' : 'Not checked'}: {stats.notCheckedIn}</span>
              </div>
            </div>

            {/* Activity Feed + Weekly Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Live Activity Feed */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <Activity size={16} className="text-violet-500" />
                    {fr ? 'Activité en temps réel' : 'Live Activity'}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="max-h-[360px] overflow-y-auto">
                  {stats.activityFeed.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">
                      {fr ? 'Aucune activité aujourd\'hui' : 'No activity today'}
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-50">
                      {stats.activityFeed.map((evt) => (
                        <div key={evt.id} className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
                          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {evt.personPhoto ? (
                              <Image src={evt.personPhoto} alt="" width={36} height={36} unoptimized className="rounded-full object-cover" />
                            ) : (
                              <span className="text-xs font-bold text-slate-500">{getInitials(evt.personName)}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-700 truncate">
                              <span className="font-semibold">{evt.personName}</span>{' '}
                              <span className="text-slate-500">{actionLabel(evt)}</span>
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {formatTime(evt.time)} · {evt.method}
                            </p>
                          </div>
                          <span className="text-[10px] text-slate-400 flex-shrink-0">{timeAgo(evt.time)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Weekly Chart */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <BarChart3 size={16} className="text-violet-500" />
                    {fr ? 'Présence hebdomadaire' : 'Weekly Attendance'}
                  </h3>
                </div>
                <div className="p-5">
                  <div className="flex items-end gap-2 h-[260px]">
                    {stats.weeklyData.map((d, i) => {
                      const maxVal = Math.max(...stats.weeklyData.map(w => w.present + w.absent + w.late), 1);
                      const presentH = (d.present / maxVal) * 200;
                      const absentH = (d.absent / maxVal) * 200;
                      const lateH = (d.late / maxVal) * 200;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full flex flex-col items-center" style={{ height: '220px' }}>
                            <div className="flex-1" />
                            <div className="w-full max-w-[40px] flex flex-col-reverse">
                              <div className="bg-emerald-400 rounded-t-sm" style={{ height: `${presentH}px` }} />
                              <div className="bg-amber-400" style={{ height: `${lateH}px` }} />
                              <div className="bg-red-300 rounded-b-sm" style={{ height: `${absentH}px` }} />
                            </div>
                          </div>
                          <span className="text-[11px] font-medium text-slate-500">{d.day}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-center gap-4 mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />{fr ? 'Présent' : 'Present'}</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" />{fr ? 'Retard' : 'Late'}</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-300" />{fr ? 'Absent' : 'Absent'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Punctuality + Department Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100"><Zap size={18} className="text-emerald-600" /></div>
                  <h4 className="font-semibold text-slate-800">{fr ? 'Ponctualité' : 'Punctuality'}</h4>
                </div>
                <p className="text-3xl font-bold text-emerald-600">{stats.punctualityRate}%</p>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats.punctualityRate}%` }} />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-amber-100"><Timer size={18} className="text-amber-600" /></div>
                  <h4 className="font-semibold text-slate-800">{fr ? 'Heures supplémentaires' : 'Overtime'}</h4>
                </div>
                <p className="text-3xl font-bold text-amber-600">{formatMinutes(stats.totalOvertime)}</p>
                <p className="text-xs text-slate-400 mt-1">{fr ? 'total cumulé aujourd\'hui' : 'total accumulated today'}</p>
              </div>

              {stats.departmentStats.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Building2 size={16} className="text-violet-500" />
                    {fr ? 'Par département' : 'By Department'}
                  </h4>
                  <div className="space-y-2">
                    {stats.departmentStats.map((dept, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">{dept.department}</span>
                          <span className="font-semibold text-slate-800">{dept.present}/{dept.total}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-violet-400 rounded-full" style={{ width: `${dept.rate}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 2 — SCANNER
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'scanner' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
              <div className="flex flex-col items-center gap-5 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <ScanLine size={28} className="text-slate-600" />
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-bold text-slate-900 mb-1">
                    {fr ? 'Scanner un QR Code Personnel' : 'Scan Staff QR Code'}
                  </h2>
                  <p className="text-slate-500 text-sm">
                    {fr ? 'Caméra ou saisie manuelle du code' : 'Camera or manual code entry'}
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 w-full">
                  <button onClick={() => setCameraMode(true)} className={cn('flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all', cameraMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700')}>
                    <Camera size={16} />{fr ? 'Caméra' : 'Camera'}
                  </button>
                  <button onClick={() => setCameraMode(false)} className={cn('flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all', !cameraMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700')}>
                    <Hash size={16} />{fr ? 'Manuel' : 'Manual'}
                  </button>
                </div>

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
                          placeholder={fr ? 'Code badge ou matricule...' : 'Badge code or matricule...'}
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
                    <p className="text-center text-xs text-slate-400 mt-3">
                      {fr ? 'Scannez le badge QR ou saisissez le code manuellement' : 'Scan QR badge or enter code manually'}
                    </p>
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
                    <h3 className={cn('font-bold', lastScanResult.success ? 'text-emerald-800' : 'text-red-800')}>
                      {lastScanResult.success ? (fr ? 'Pointage réussi' : 'Check-in successful') : (fr ? 'Échec du pointage' : 'Check-in failed')}
                    </h3>
                    <p className={cn('text-sm mt-0.5', lastScanResult.success ? 'text-emerald-600' : 'text-red-600')}>
                      {lastScanResult.message}
                    </p>
                    {lastScanResult.personName && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                        <span className="font-medium">{lastScanResult.personName}</span>
                        {lastScanResult.personRole && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600">{lastScanResult.personRole}</span>
                        )}
                      </div>
                    )}
                    {lastScanResult.time && <p className="text-xs text-slate-400 mt-1 font-mono">{lastScanResult.time}</p>}
                  </div>
                  <button onClick={() => setLastScanResult(null)} className="text-slate-400 hover:text-slate-600 p-1"><X size={16} /></button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 3 — ACTIVITY TIMELINE
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Clock size={18} className="text-violet-500" />
                {fr ? 'Activité en temps réel' : 'Real-time Activity'}
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            {stats.activityFeed.length === 0 ? (
              <div className="text-center py-20">
                <Activity size={48} className="text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400">{fr ? 'Aucune activité aujourd\'hui' : 'No activity today'}</p>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-slate-100" />
                <div className="divide-y divide-slate-50">
                  {stats.activityFeed.map((evt) => (
                    <div key={evt.id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                      <div className={cn(
                        'w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold z-10 flex-shrink-0 border-3 border-white shadow-sm overflow-hidden',
                        evt.action === 'ARRIVAL' ? 'bg-emerald-100 text-emerald-700' :
                        evt.action === 'LATE' ? 'bg-amber-100 text-amber-700' :
                        evt.action === 'DEPARTURE' ? 'bg-blue-100 text-blue-700' :
                        evt.action === 'BREAK_START' ? 'bg-purple-100 text-purple-700' :
                        'bg-slate-100 text-slate-600'
                      )}>
                        {evt.personPhoto ? (
                          <Image src={evt.personPhoto} alt="" width={44} height={44} unoptimized className="rounded-full object-cover" />
                        ) : (
                          getInitials(evt.personName)
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-700">
                          <span className="font-semibold">{evt.personName}</span>{' '}
                          <span className="text-slate-500">{actionLabel(evt)}</span>
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="font-mono text-xs text-slate-500">{formatTime(evt.time)}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">{evt.method}</span>
                          <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-medium', evt.category === 'teacher' ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700')}>
                            {evt.category === 'teacher' ? fr ? 'Enseignant' : 'Teacher' : fr ? 'Personnel' : 'Staff'}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 flex-shrink-0 mt-1">{timeAgo(evt.time)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 4 — DATA TABLE
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'table' && (
          <div className="space-y-4">
            {/* Filters Bar */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <div className="flex-1 relative w-full md:w-auto">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={tableSearch}
                    onChange={e => setTableSearch(e.target.value)}
                    placeholder={fr ? 'Rechercher un nom, fonction, département...' : 'Search name, role, department...'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm transition-all"
                  />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                  <div className="relative flex-1 md:flex-initial">
                    <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value as CategoryFilter)} className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-violet-400 outline-none text-sm bg-white cursor-pointer">
                      <option value="all">{fr ? 'Tous les types' : 'All types'}</option>
                      <option value="teacher">{fr ? 'Enseignants' : 'Teachers'}</option>
                      <option value="admin_staff">{fr ? 'Personnel' : 'Staff'}</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative flex-1 md:flex-initial">
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as StatusFilter)} className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-violet-400 outline-none text-sm bg-white cursor-pointer">
                      <option value="all">{fr ? 'Tous les statuts' : 'All statuses'}</option>
                      <option value="PRESENT">Présent</option>
                      <option value="LATE">Retard</option>
                      <option value="ABSENT">Absent</option>
                      <option value="DEPARTED">Parti</option>
                      <option value="ON_BREAK">En pause</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative flex-1 md:flex-initial">
                    <select value={sortField} onChange={e => setSortField(e.target.value as any)} className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-violet-400 outline-none text-sm bg-white cursor-pointer">
                      <option value="time">{fr ? 'Trier par heure' : 'Sort by time'}</option>
                      <option value="name">{fr ? 'Trier par nom' : 'Sort by name'}</option>
                      <option value="status">{fr ? 'Trier par statut' : 'Sort by status'}</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                  <button onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')} className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors" title={sortDir === 'asc' ? 'Ascendant' : 'Descendant'}>
                    {sortDir === 'asc' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  </button>
                  <button onClick={() => handleExport('excel')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-50 text-violet-600 hover:bg-violet-100 text-sm font-medium transition-colors whitespace-nowrap">
                    <Download size={16} />
                    {fr ? 'Exporter' : 'Export'}
                  </button>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{fr ? 'Personne' : 'Person'}</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{fr ? 'Fonction' : 'Role'}</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{fr ? 'Arrivée' : 'Check-in'}</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{fr ? 'Départ' : 'Check-out'}</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{fr ? 'Durée' : 'Duration'}</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{fr ? 'Statut' : 'Status'}</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{fr ? 'Méthode' : 'Method'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSortedRecords.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-16 text-slate-400">{fr ? 'Aucun enregistrement trouvé' : 'No records found'}</td></tr>
                    ) : (
                      filteredSortedRecords.map((record) => (
                        <tr key={record.id} className="border-b border-slate-50 hover:bg-violet-50/30 transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center flex-shrink-0">
                                {record.personPhoto ? (
                                  <Image src={record.personPhoto} alt="" width={36} height={36} unoptimized className="rounded-full object-cover" />
                                ) : (
                                  <span className="text-xs font-bold text-slate-500">{getInitials(record.personName)}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">{record.personName}</p>
                                {record.matricule && <p className="text-xs text-slate-400 font-mono">{record.matricule}</p>}
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-slate-600">{record.personRole}</span>
                            {record.department && <p className="text-xs text-slate-400">{record.department}</p>}
                          </td>
                          <td className="px-5 py-3 font-mono text-slate-700">{formatTime(record.checkInTime)}</td>
                          <td className="px-5 py-3 font-mono text-slate-700">{formatTime(record.checkOutTime)}</td>
                          <td className="px-5 py-3 text-slate-600 font-medium">
                            {record.totalWorkMinutes > 0 ? formatMinutes(record.totalWorkMinutes) : '—'}
                          </td>
                          <td className="px-5 py-3">
                            <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold', statusCfg(record.status).bg, statusCfg(record.status).color)}>
                              <span className={cn('w-1.5 h-1.5 rounded-full', statusCfg(record.status).dot)} />
                              {fr ? statusCfg(record.status).labelFr : statusCfg(record.status).label}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">{record.method}</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {filteredSortedRecords.length > 0 && (
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
                  <span>{filteredSortedRecords.length} {fr ? 'enregistrement(s)' : 'record(s)'}</span>
                  <span>{fr ? 'Dernière sync' : 'Last sync'}: {lastSync?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) || '—'}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 5 — REPORTS
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'reports' && (
          <div className="space-y-5">
            {/* Export buttons */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Download size={18} className="text-violet-500" />
                {fr ? 'Exporter les données' : 'Export Data'}
              </h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => handleExport('excel')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-sm font-medium transition-colors border border-emerald-200">
                  <FileText size={16} />
                  Excel
                </button>
                <button onClick={() => handleExport('csv')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium transition-colors border border-blue-200">
                  <FileText size={16} />
                  CSV
                </button>
                <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-sm font-medium transition-colors border border-red-200">
                  <FileText size={16} />
                  PDF
                </button>
                <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 text-sm font-medium transition-colors border border-slate-200">
                  <Printer size={16} />
                  {fr ? 'Imprimer' : 'Print'}
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">{fr ? 'Total personnel' : 'Total Staff'}</p>
                <p className="text-3xl font-bold text-violet-600">{stats.totalPersonnel}</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">{fr ? 'Taux de présence' : 'Attendance'}</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.attendanceRate}%</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">{fr ? 'Taux de retard' : 'Late Rate'}</p>
                <p className="text-3xl font-bold text-amber-600">{stats.lateRate}%</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">{fr ? 'Ponctualité' : 'Punctuality'}</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.punctualityRate}%</p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <GraduationCap size={16} className="text-indigo-500" />
                  {fr ? 'Enseignants' : 'Teachers'}
                </h4>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">{fr ? 'Total' : 'Total'}</span><span className="font-semibold text-slate-800">{stats.totalTeachers}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{fr ? 'Présents' : 'Present'}</span><span className="font-semibold text-emerald-600">{stats.teachersPresent}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{fr ? 'Retards' : 'Late'}</span><span className="font-semibold text-amber-600">{stats.teachersLate}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{fr ? 'Absents' : 'Absent'}</span><span className="font-semibold text-red-500">{stats.teachersAbsent}</span></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Building2 size={16} className="text-purple-500" />
                  {fr ? 'Personnel Administratif' : 'Admin Staff'}
                </h4>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">{fr ? 'Total' : 'Total'}</span><span className="font-semibold text-slate-800">{stats.totalStaff}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{fr ? 'Présents' : 'Present'}</span><span className="font-semibold text-emerald-600">{stats.staffPresent}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{fr ? 'En pause' : 'On Break'}</span><span className="font-semibold text-purple-600">{stats.staffOnBreak}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{fr ? 'Partis' : 'Departed'}</span><span className="font-semibold text-blue-600">{stats.staffDeparted}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleLayout>
  );
}
