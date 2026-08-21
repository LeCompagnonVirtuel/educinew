'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbPointage, type PointageRecord, type PointageDashboardStats, type PointageClassStats } from '@/lib/api/domains/pointage.service';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useRealtimeSubscription } from '@/hooks/useRealtime';
import { cn, getInitials } from '@/lib/utils';
import { exportToFile, type ExportColumn } from '@/lib/export-utils';
import Image from 'next/image';
import {
  Users, UserCheck, UserX, Clock, AlertTriangle, Calendar,
  TrendingUp, QrCode, MapPin, LogIn, LogOut,
  Download, RefreshCw, BarChart3, Camera, ScanLine,
  GraduationCap, BookOpen, Loader2, CheckCircle, XCircle,
  AlertCircle, Smartphone, Search, Filter, Bell,
  Activity, Zap, Shield, Timer, Eye,
  ChevronDown, ChevronRight, X, Hash,
  Wifi, WifiOff, Building2, FileText, Target,
} from 'lucide-react';

type ViewTab = 'dashboard' | 'scanner' | 'timeline' | 'table' | 'reports';
type PersonFilter = 'all' | 'student' | 'teacher' | 'staff';
type StatusFilter = 'all' | 'PRESENT' | 'LATE' | 'ABSENT' | 'DEPARTED' | 'ON_BREAK';

export default function PointagePremiumPage() {
  const { user } = useAuth();
  const { lang } = useLanguage();

  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState<PointageDashboardStats>({
    totalStudents: 0, studentsPresent: 0, studentsAbsent: 0, studentsLate: 0,
    totalTeachers: 0, teachersPresent: 0, teachersAbsent: 0, teachersLate: 0,
    totalStaff: 0, staffPresent: 0, staffAbsent: 0, staffLate: 0,
    staffOnBreak: 0, staffDeparted: 0, departures: 0, scansToday: 0,
    attendanceRate: 0, lateRate: 0, pendingAlerts: 0,
  });
  const [records, setRecords] = useState<PointageRecord[]>([]);
  const [classStats, setClassStats] = useState<PointageClassStats[]>([]);
  const [checkInLoading, setCheckInLoading] = useState(false);

  const [scanInput, setScanInput] = useState('');
  const [scanLoading, setScanLoading] = useState(false);
  const [lastScanResult, setLastScanResult] = useState<{
    success: boolean;
    message: string;
    personName?: string;
    personType?: string;
    time?: string;
  } | null>(null);

  const [tableSearch, setTableSearch] = useState('');
  const [personFilter, setPersonFilter] = useState<PersonFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  const scanInputRef = useRef<HTMLInputElement>(null);

  // ─── Clock ───────────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ─── Toast helper ────────────────────────────────────────────────
  const showToast = useCallback((msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // ─── Data loading ────────────────────────────────────────────────
  const loadAll = useCallback(async () => {
    if (!user?.schoolId) return;
    try {
      const [statsData, recordsData, classData] = await Promise.all([
        sbPointage.getDashboardStats(),
        sbPointage.getTodayRecords(),
        sbPointage.getClassStats(),
      ]);
      setStats(statsData);
      setRecords(recordsData);
      setClassStats(classData);
    } catch (err: any) {
      showToast(err?.message || 'Erreur de chargement', 'error');
    }
  }, [user?.schoolId, showToast]);

  useEffect(() => {
    if (user?.schoolId) {
      loadAll().finally(() => setLoading(false));
    }
  }, [user?.schoolId, loadAll]);

  // ─── Realtime ────────────────────────────────────────────────────
  useRealtimeSubscription([
    { table: 'attendance', event: 'INSERT', onData: () => loadAll() },
    { table: 'teacher_attendance', event: '*', onData: () => loadAll() },
    { table: 'staff_attendance', event: '*', onData: () => loadAll() },
  ]);

  // Auto-refresh every 30s
  useEffect(() => {
    const interval = setInterval(loadAll, 30000);
    return () => clearInterval(interval);
  }, [loadAll]);

  // ─── Check-In Handler ────────────────────────────────────────────
  const handleCheckIn = async () => {
    if (!user?.id || checkInLoading) return;
    setCheckInLoading(true);
    try {
      const role = (user.role || '').toUpperCase();
      let personType: 'student' | 'teacher' | 'staff' = 'student';
      if (role.includes('TEACHER') || role === 'CENSEUR' || role === 'SECRETAIRE') personType = 'teacher';
      else if (role === 'ADMIN' || role === 'SURVEILLANT' || role.includes('STAFF')) personType = 'staff';

      await sbPointage.checkIn(user.id, personType, 'MANUAL', undefined, undefined, {
        device: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 50) : 'Web',
        notes: user.name,
      });
      showToast(lang === 'fr' ? 'Pointage enregistré avec succès !' : 'Check-in recorded successfully!', 'success');
      loadAll();
    } catch (err: any) {
      showToast(err?.message || (lang === 'fr' ? 'Erreur lors du pointage' : 'Check-in error'), 'error');
    } finally {
      setCheckInLoading(false);
    }
  };

  // ─── QR Scan Handler ─────────────────────────────────────────────
  const handleQRScan = async () => {
    const code = scanInput.trim();
    if (!code) {
      showToast(lang === 'fr' ? 'Saisissez un code QR' : 'Enter a QR code', 'error');
      return;
    }
    setScanLoading(true);
    try {
      const result = await sbPointage.scanQR(code, 'ARRIVAL');
      setLastScanResult({
        success: result.success,
        message: result.message,
        personName: result.person?.name,
        personType: result.personType,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
      if (result.success) {
        showToast(result.message, 'success');
        loadAll();
      } else {
        showToast(result.message, result.duplicate ? 'info' : 'error');
      }
      setScanInput('');
      scanInputRef.current?.focus();
    } catch (err: any) {
      setLastScanResult({
        success: false,
        message: err?.message || (lang === 'fr' ? 'Erreur scan' : 'Scan error'),
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
      showToast(err?.message || 'Erreur', 'error');
    } finally {
      setScanLoading(false);
    }
  };

  // ─── Export ──────────────────────────────────────────────────────
  const handleExport = () => {
    const data = filteredRecords.map(r => ({
      time: r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString('fr-FR') : '—',
      name: r.personName,
      type: r.personType,
      className: r.className || '—',
      status: r.status,
      method: r.method,
      matricule: r.matricule || '—',
      lateMinutes: r.lateMinutes || 0,
    }));
    const columns: ExportColumn[] = [
      { header: 'Heure', key: 'time' },
      { header: 'Nom', key: 'name' },
      { header: 'Type', key: 'type' },
      { header: 'Classe', key: 'className' },
      { header: 'Statut', key: 'status' },
      { header: 'Méthode', key: 'method' },
      { header: 'Matricule', key: 'matricule' },
      { header: 'Retard (min)', key: 'lateMinutes' },
    ];
    exportToFile(data, columns, `pointage_export_${new Date().toISOString().split('T')[0]}`, 'excel');
    showToast(lang === 'fr' ? 'Export téléchargé' : 'Export downloaded', 'success');
  };

  // ─── Filtered records for table ──────────────────────────────────
  const filteredRecords = records.filter(r => {
    if (personFilter !== 'all' && r.personType !== personFilter) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (tableSearch) {
      const s = tableSearch.toLowerCase();
      if (!r.personName.toLowerCase().includes(s) &&
          !(r.matricule && r.matricule.toLowerCase().includes(s)) &&
          !(r.className && r.className.toLowerCase().includes(s))) return false;
    }
    return true;
  });

  // ─── Helpers ─────────────────────────────────────────────────────
  const formatTime = (iso: string | null) => {
    if (!iso) return '—';
    try { return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); } catch { return '—'; }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'PRESENT': return 'bg-emerald-100 text-emerald-700';
      case 'LATE': return 'bg-amber-100 text-amber-700';
      case 'ABSENT': return 'bg-red-100 text-red-700';
      case 'DEPARTED': return 'bg-blue-100 text-blue-700';
      case 'ON_BREAK': return 'bg-purple-100 text-purple-700';
      case 'EXCUSED': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'PRESENT': return 'Présent';
      case 'LATE': return 'Retard';
      case 'ABSENT': return 'Absent';
      case 'DEPARTED': return 'Parti';
      case 'ON_BREAK': return 'En pause';
      case 'EXCUSED': return 'Excusé';
      default: return status;
    }
  };

  const personTypeLabel = (type: string) => {
    switch (type) {
      case 'student': return 'Élève';
      case 'teacher': return 'Enseignant';
      case 'staff': return 'Personnel';
      default: return type;
    }
  };

  // ─── Tabs config ─────────────────────────────────────────────────
  const tabs: { key: ViewTab; label: string; icon: any }[] = [
    { key: 'dashboard', label: lang === 'fr' ? 'Tableau de bord' : 'Dashboard', icon: Activity },
    { key: 'scanner', label: lang === 'fr' ? 'Scanner QR' : 'QR Scanner', icon: QrCode },
    { key: 'timeline', label: lang === 'fr' ? 'Chronologie' : 'Timeline', icon: Clock },
    { key: 'table', label: lang === 'fr' ? 'Données' : 'Data Table', icon: FileText },
    { key: 'reports', label: lang === 'fr' ? 'Rapports' : 'Reports', icon: BarChart3 },
  ];

  // ─── Loading state ───────────────────────────────────────────────
  if (loading) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: 'Pointage' }]}>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 size={40} className="animate-spin text-[#4F46E5]" />
            <p className="text-slate-500 text-sm">{lang === 'fr' ? 'Chargement...' : 'Loading...'}</p>
          </div>
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Pointage & Présences' }]}>
      {/* ─── Toast ─────────────────────────────────────────────────── */}
      {toast && (
        <div className={cn(
          'fixed top-4 right-4 z-[100] px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2',
          'animate-in slide-in-from-right-5 duration-300',
          toast.type === 'success' ? 'bg-emerald-500 text-white' :
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        )}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : toast.type === 'error' ? <XCircle size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* ─── Header ───────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200">
                <Clock size={22} />
              </div>
              {lang === 'fr' ? 'Pointage & Présences' : 'Attendance'}
            </h1>
            <p className="text-slate-500 mt-1 ml-[52px] text-sm">
              {currentTime.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xl font-bold tracking-widest">
                {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
            <button onClick={loadAll} className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        {/* ─── Tab Navigation ───────────────────────────────────────── */}
        <div className="flex items-center gap-1 bg-slate-100/80 backdrop-blur-sm rounded-2xl p-1.5 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
                activeTab === tab.key
                  ? 'bg-white text-indigo-600 shadow-sm shadow-indigo-100'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
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
          <div className="space-y-6">
            {/* Premium Check-In Button */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 shadow-2xl shadow-indigo-200">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRhMiAyIDAgMSAxLTQgMCAyIDIgMCAwIDEgNCAwIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
              <div className="relative flex flex-col md:flex-row items-center gap-6">
                <button
                  onClick={handleCheckIn}
                  disabled={checkInLoading}
                  className={cn(
                    'relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300',
                    'bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-white/60 hover:scale-105',
                    'active:scale-95 shadow-xl',
                    checkInLoading && 'opacity-70 cursor-not-allowed'
                  )}
                >
                  {checkInLoading ? (
                    <Loader2 size={40} className="text-white animate-spin" />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Zap size={36} className="text-white" />
                      <span className="text-white/90 text-xs font-bold uppercase tracking-wider">
                        {lang === 'fr' ? 'Pointer' : 'Check In'}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-ping" />
                </button>
                <div className="text-center md:text-left text-white">
                  <h2 className="text-2xl font-bold mb-1">
                    {lang === 'fr' ? 'Pointer maintenant' : 'Check In Now'}
                  </h2>
                  <p className="text-white/70 text-sm max-w-md">
                    {lang === 'fr'
                      ? 'Appuyez pour enregistrer votre présence. Ce pointage sera horodaté automatiquement.'
                      : 'Press to record your attendance. This check-in will be timestamped automatically.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards — Students */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap size={16} className="text-indigo-500" />
                {lang === 'fr' ? 'Élèves' : 'Students'} — {stats.totalStudents}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-emerald-100"><UserCheck size={18} className="text-emerald-600" /></div>
                    <span className="text-xs font-medium text-slate-500 uppercase">Présents</span>
                  </div>
                  <p className="text-3xl font-bold text-emerald-600">{stats.studentsPresent}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-red-100"><UserX size={18} className="text-red-600" /></div>
                    <span className="text-xs font-medium text-slate-500 uppercase">Absents</span>
                  </div>
                  <p className="text-3xl font-bold text-red-500">{stats.studentsAbsent}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-amber-100"><Clock size={18} className="text-amber-600" /></div>
                    <span className="text-xs font-medium text-slate-500 uppercase">Retards</span>
                  </div>
                  <p className="text-3xl font-bold text-amber-600">{stats.studentsLate}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-indigo-100"><TrendingUp size={18} className="text-indigo-600" /></div>
                    <span className="text-xs font-medium text-slate-500 uppercase">Taux</span>
                  </div>
                  <p className="text-3xl font-bold text-indigo-600">
                    {stats.totalStudents > 0 ? Math.round(((stats.studentsPresent + stats.studentsLate) / stats.totalStudents) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards — Teachers */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-emerald-500" />
                {lang === 'fr' ? 'Enseignants' : 'Teachers'} — {stats.totalTeachers}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-emerald-100"><UserCheck size={18} className="text-emerald-600" /></div>
                    <span className="text-xs font-medium text-slate-500 uppercase">Présents</span>
                  </div>
                  <p className="text-3xl font-bold text-emerald-600">{stats.teachersPresent}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-red-100"><UserX size={18} className="text-red-600" /></div>
                    <span className="text-xs font-medium text-slate-500 uppercase">Absents</span>
                  </div>
                  <p className="text-3xl font-bold text-red-500">{stats.teachersAbsent}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-amber-100"><Clock size={18} className="text-amber-600" /></div>
                    <span className="text-xs font-medium text-slate-500 uppercase">Retards</span>
                  </div>
                  <p className="text-3xl font-bold text-amber-600">{stats.teachersLate}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-indigo-100"><TrendingUp size={18} className="text-indigo-600" /></div>
                    <span className="text-xs font-medium text-slate-500 uppercase">Taux</span>
                  </div>
                  <p className="text-3xl font-bold text-indigo-600">
                    {stats.totalTeachers > 0 ? Math.round(((stats.teachersPresent + stats.teachersLate) / stats.totalTeachers) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards — Staff */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Building2 size={16} className="text-purple-500" />
                {lang === 'fr' ? 'Personnel' : 'Staff'} — {stats.totalStaff}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-emerald-100"><UserCheck size={18} className="text-emerald-600" /></div>
                    <span className="text-xs font-medium text-slate-500 uppercase">Présents</span>
                  </div>
                  <p className="text-3xl font-bold text-emerald-600">{stats.staffPresent}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-purple-100"><Timer size={18} className="text-purple-600" /></div>
                    <span className="text-xs font-medium text-slate-500 uppercase">En pause</span>
                  </div>
                  <p className="text-3xl font-bold text-purple-600">{stats.staffOnBreak}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-blue-100"><LogOut size={18} className="text-blue-600" /></div>
                    <span className="text-xs font-medium text-slate-500 uppercase">Partis</span>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">{stats.staffDeparted}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-red-100"><AlertTriangle size={18} className="text-red-600" /></div>
                    <span className="text-xs font-medium text-slate-500 uppercase">Alertes</span>
                  </div>
                  <p className="text-3xl font-bold text-red-500">{stats.pendingAlerts}</p>
                </div>
              </div>
            </div>

            {/* Overall Attendance Rate */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Target size={18} className="text-indigo-500" />
                  {lang === 'fr' ? 'Taux de présence global' : 'Overall Attendance Rate'}
                </h3>
                <span className="text-2xl font-bold text-indigo-600">{stats.attendanceRate}%</span>
              </div>
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-emerald-400 h-full transition-all" style={{ width: `${stats.attendanceRate}%` }} />
              </div>
              <div className="flex gap-6 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {lang === 'fr' ? 'Présents' : 'Present'}: {stats.studentsPresent + stats.teachersPresent + stats.staffPresent}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {lang === 'fr' ? 'Retards' : 'Late'}: {stats.studentsLate + stats.teachersLate + stats.staffLate}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-300" />
                  {lang === 'fr' ? 'Absents' : 'Absent'}: {stats.studentsAbsent + stats.teachersAbsent + stats.staffAbsent}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 2 — QR SCANNER
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-sm">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                  <ScanLine size={36} className="text-white" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">
                    {lang === 'fr' ? 'Scanner un QR Code' : 'Scan a QR Code'}
                  </h2>
                  <p className="text-slate-500 text-sm">
                    {lang === 'fr' ? 'Saisissez ou scannez le matricule pour pointer' : 'Enter or scan the student ID to check in'}
                  </p>
                </div>

                <div className="w-full max-w-md">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        ref={scanInputRef}
                        type="text"
                        value={scanInput}
                        onChange={e => setScanInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleQRScan()}
                        placeholder={lang === 'fr' ? 'Saisissez le matricule...' : 'Enter student ID...'}
                        className="w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none text-lg font-mono text-center transition-all"
                        disabled={scanLoading}
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={handleQRScan}
                      disabled={scanLoading || !scanInput.trim()}
                      className={cn(
                        'px-6 py-4 rounded-2xl font-semibold text-white transition-all shadow-lg',
                        scanLoading || !scanInput.trim()
                          ? 'bg-slate-300 cursor-not-allowed shadow-none'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 shadow-indigo-200'
                      )}
                    >
                      {scanLoading ? <Loader2 size={20} className="animate-spin" /> : <ScanLine size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scan Result */}
            {lastScanResult && (
              <div className={cn(
                'rounded-2xl p-6 border-2 transition-all',
                lastScanResult.success
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-red-50 border-red-200'
              )}>
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'p-3 rounded-xl',
                    lastScanResult.success ? 'bg-emerald-100' : 'bg-red-100'
                  )}>
                    {lastScanResult.success
                      ? <CheckCircle size={24} className="text-emerald-600" />
                      : <XCircle size={24} className="text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <h3 className={cn('font-bold text-lg', lastScanResult.success ? 'text-emerald-800' : 'text-red-800')}>
                      {lastScanResult.success ? (lang === 'fr' ? 'Pointage réussi' : 'Check-in successful') : (lang === 'fr' ? 'Échec du pointage' : 'Check-in failed')}
                    </h3>
                    <p className={cn('text-sm mt-1', lastScanResult.success ? 'text-emerald-600' : 'text-red-600')}>
                      {lastScanResult.message}
                    </p>
                    {lastScanResult.personName && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                        <span className="font-medium">{lastScanResult.personName}</span>
                        {lastScanResult.personType && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs font-medium">
                            {personTypeLabel(lastScanResult.personType)}
                          </span>
                        )}
                      </div>
                    )}
                    {lastScanResult.time && (
                      <p className="text-xs text-slate-400 mt-2 font-mono">{lastScanResult.time}</p>
                    )}
                  </div>
                  <button onClick={() => setLastScanResult(null)} className="text-slate-400 hover:text-slate-600">
                    <X size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 3 — TIMELINE
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Clock size={18} className="text-indigo-500" />
                {lang === 'fr' ? 'Chronologie des pointages aujourd\'hui' : "Today's check-in timeline"}
              </h3>
              {records.length === 0 ? (
                <div className="text-center py-16">
                  <Clock size={48} className="text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-400">{lang === 'fr' ? 'Aucun pointage aujourd\'hui' : 'No check-ins today'}</p>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-slate-200" />
                  <div className="space-y-4">
                    {records.map((record, i) => (
                      <div key={record.id || i} className="flex items-start gap-4 relative">
                        <div className={cn(
                          'w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold z-10 flex-shrink-0 border-4 border-white shadow-sm',
                          record.status === 'PRESENT' ? 'bg-emerald-100 text-emerald-700' :
                          record.status === 'LATE' ? 'bg-amber-100 text-amber-700' :
                          record.status === 'DEPARTED' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-600'
                        )}>
                          {record.personPhoto ? (
                            <Image src={record.personPhoto} alt="" width={48} height={48} unoptimized className="rounded-full object-cover" />
                          ) : (
                            getInitials(record.personName)
                          )}
                        </div>
                        <div className="flex-1 bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-slate-800">{record.personName}</p>
                              <p className="text-xs text-slate-400 mt-0.5">
                                {personTypeLabel(record.personType)}
                                {record.className && ` · ${record.className}`}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-mono text-sm font-semibold text-slate-700">
                                {formatTime(record.checkInTime)}
                              </p>
                              {record.checkOutTime && (
                                <p className="font-mono text-xs text-slate-400">
                                  → {formatTime(record.checkOutTime)}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold', statusColor(record.status))}>
                              {statusLabel(record.status)}
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                              {record.method}
                            </span>
                            {record.lateMinutes > 0 && (
                              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                +{record.lateMinutes} min
                              </span>
                            )}
                          </div>
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
            TAB 4 — DATA TABLE
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'table' && (
          <div className="space-y-4">
            {/* Filters bar */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="flex-1 relative w-full md:w-auto">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={tableSearch}
                  onChange={e => setTableSearch(e.target.value)}
                  placeholder={lang === 'fr' ? 'Rechercher un nom, matricule...' : 'Search name, ID...'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:flex-initial">
                  <select
                    value={personFilter}
                    onChange={e => setPersonFilter(e.target.value as PersonFilter)}
                    className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 outline-none text-sm bg-white cursor-pointer"
                  >
                    <option value="all">{lang === 'fr' ? 'Tous les types' : 'All types'}</option>
                    <option value="student">{lang === 'fr' ? 'Élèves' : 'Students'}</option>
                    <option value="teacher">{lang === 'fr' ? 'Enseignants' : 'Teachers'}</option>
                    <option value="staff">{lang === 'fr' ? 'Personnel' : 'Staff'}</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative flex-1 md:flex-initial">
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value as StatusFilter)}
                    className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 outline-none text-sm bg-white cursor-pointer"
                  >
                    <option value="all">{lang === 'fr' ? 'Tous les statuts' : 'All statuses'}</option>
                    <option value="PRESENT">Présent</option>
                    <option value="LATE">Retard</option>
                    <option value="ABSENT">Absent</option>
                    <option value="DEPARTED">Parti</option>
                    <option value="ON_BREAK">En pause</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <Download size={16} />
                  {lang === 'fr' ? 'Exporter' : 'Export'}
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{lang === 'fr' ? 'Photo' : 'Photo'}</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{lang === 'fr' ? 'Nom' : 'Name'}</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{lang === 'fr' ? 'Type / Classe' : 'Type / Class'}</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{lang === 'fr' ? 'Arrivée' : 'Check-in'}</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{lang === 'fr' ? 'Départ' : 'Check-out'}</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{lang === 'fr' ? 'Statut' : 'Status'}</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-600">{lang === 'fr' ? 'Méthode' : 'Method'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-16 text-slate-400">
                          {lang === 'fr' ? 'Aucun enregistrement trouvé' : 'No records found'}
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((record, i) => (
                        <tr key={record.id || i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                              {record.personPhoto ? (
                                <Image src={record.personPhoto} alt="" width={36} height={36} unoptimized className="rounded-full object-cover" />
                              ) : (
                                <span className="text-xs font-bold text-slate-500">{getInitials(record.personName)}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <p className="font-medium text-slate-800">{record.personName}</p>
                            {record.matricule && <p className="text-xs text-slate-400 font-mono">{record.matricule}</p>}
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-slate-600">{personTypeLabel(record.personType)}</span>
                            {record.className && <p className="text-xs text-slate-400">{record.className}</p>}
                          </td>
                          <td className="px-5 py-3 font-mono text-slate-700">{formatTime(record.checkInTime)}</td>
                          <td className="px-5 py-3 font-mono text-slate-700">{formatTime(record.checkOutTime)}</td>
                          <td className="px-5 py-3">
                            <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold', statusColor(record.status))}>
                              {statusLabel(record.status)}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                              {record.method}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {filteredRecords.length > 0 && (
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 text-right">
                  {filteredRecords.length} {lang === 'fr' ? 'enregistrement(s)' : 'record(s)'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 5 — REPORTS
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">{lang === 'fr' ? 'Total scanné' : 'Total scanned'}</p>
                <p className="text-3xl font-bold text-indigo-600">{stats.scansToday}</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">{lang === 'fr' ? 'Taux de présence' : 'Attendance rate'}</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.attendanceRate}%</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">{lang === 'fr' ? 'Taux de retard' : 'Late rate'}</p>
                <p className="text-3xl font-bold text-amber-600">{stats.lateRate}%</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">{lang === 'fr' ? 'Alertes en attente' : 'Pending alerts'}</p>
                <p className="text-3xl font-bold text-red-500">{stats.pendingAlerts}</p>
              </div>
            </div>

            {/* Class Statistics Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <BarChart3 size={18} className="text-indigo-500" />
                  {lang === 'fr' ? 'Statistiques par classe' : 'Class statistics'}
                </h3>
                <button
                  onClick={() => {
                    const data = classStats.map(cs => ({
                      className: cs.className,
                      total: cs.total,
                      present: cs.present,
                      absent: cs.absent,
                      late: cs.late,
                      rate: `${cs.rate}%`,
                    }));
                    const columns: ExportColumn[] = [
                      { header: 'Classe', key: 'className' },
                      { header: 'Total', key: 'total' },
                      { header: 'Présents', key: 'present' },
                      { header: 'Absents', key: 'absent' },
                      { header: 'Retards', key: 'late' },
                      { header: 'Taux', key: 'rate' },
                    ];
                    exportToFile(data, columns, `stats_classes_${new Date().toISOString().split('T')[0]}`, 'excel');
                    showToast(lang === 'fr' ? 'Rapport exporté' : 'Report exported', 'success');
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                >
                  <Download size={14} />
                  {lang === 'fr' ? 'Exporter' : 'Export'}
                </button>
              </div>
              {classStats.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <BarChart3 size={40} className="mx-auto mb-3 opacity-50" />
                  <p className="text-sm">{lang === 'fr' ? 'Aucune donnée de classe disponible' : 'No class data available'}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="text-left px-6 py-3 font-semibold text-slate-600">{lang === 'fr' ? 'Classe' : 'Class'}</th>
                        <th className="text-center px-4 py-3 font-semibold text-slate-600">{lang === 'fr' ? 'Total' : 'Total'}</th>
                        <th className="text-center px-4 py-3 font-semibold text-emerald-600">{lang === 'fr' ? 'Présents' : 'Present'}</th>
                        <th className="text-center px-4 py-3 font-semibold text-amber-600">{lang === 'fr' ? 'Retards' : 'Late'}</th>
                        <th className="text-center px-4 py-3 font-semibold text-red-500">{lang === 'fr' ? 'Absents' : 'Absent'}</th>
                        <th className="text-center px-4 py-3 font-semibold text-slate-600">{lang === 'fr' ? 'Taux' : 'Rate'}</th>
                        <th className="text-left px-6 py-3 font-semibold text-slate-600 w-40">{lang === 'fr' ? 'Barre' : 'Bar'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classStats.map((cs, i) => (
                        <tr key={cs.classId || i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-3.5 font-medium text-slate-800">{cs.className}</td>
                          <td className="px-4 py-3.5 text-center font-semibold text-slate-700">{cs.total}</td>
                          <td className="px-4 py-3.5 text-center font-semibold text-emerald-600">{cs.present}</td>
                          <td className="px-4 py-3.5 text-center font-semibold text-amber-600">{cs.late}</td>
                          <td className="px-4 py-3.5 text-center font-semibold text-red-500">{cs.absent}</td>
                          <td className="px-4 py-3.5 text-center">
                            <span className={cn(
                              'px-2.5 py-1 rounded-full text-xs font-bold',
                              cs.rate >= 90 ? 'bg-emerald-100 text-emerald-700' :
                              cs.rate >= 70 ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            )}>
                              {cs.rate}%
                            </span>
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  'h-full rounded-full transition-all',
                                  cs.rate >= 90 ? 'bg-emerald-400' :
                                  cs.rate >= 70 ? 'bg-amber-400' :
                                  'bg-red-400'
                                )}
                                style={{ width: `${cs.rate}%` }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Category breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-indigo-100"><GraduationCap size={18} className="text-indigo-600" /></div>
                  <h4 className="font-semibold text-slate-800">{lang === 'fr' ? 'Élèves' : 'Students'}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">{lang === 'fr' ? 'Total' : 'Total'}</span><span className="font-semibold text-slate-800">{stats.totalStudents}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{lang === 'fr' ? 'Présents' : 'Present'}</span><span className="font-semibold text-emerald-600">{stats.studentsPresent}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{lang === 'fr' ? 'Retards' : 'Late'}</span><span className="font-semibold text-amber-600">{stats.studentsLate}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{lang === 'fr' ? 'Absents' : 'Absent'}</span><span className="font-semibold text-red-500">{stats.studentsAbsent}</span></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-100"><BookOpen size={18} className="text-emerald-600" /></div>
                  <h4 className="font-semibold text-slate-800">{lang === 'fr' ? 'Enseignants' : 'Teachers'}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">{lang === 'fr' ? 'Total' : 'Total'}</span><span className="font-semibold text-slate-800">{stats.totalTeachers}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{lang === 'fr' ? 'Présents' : 'Present'}</span><span className="font-semibold text-emerald-600">{stats.teachersPresent}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{lang === 'fr' ? 'Retards' : 'Late'}</span><span className="font-semibold text-amber-600">{stats.teachersLate}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{lang === 'fr' ? 'Absents' : 'Absent'}</span><span className="font-semibold text-red-500">{stats.teachersAbsent}</span></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-purple-100"><Building2 size={18} className="text-purple-600" /></div>
                  <h4 className="font-semibold text-slate-800">{lang === 'fr' ? 'Personnel' : 'Staff'}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">{lang === 'fr' ? 'Total' : 'Total'}</span><span className="font-semibold text-slate-800">{stats.totalStaff}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{lang === 'fr' ? 'Présents' : 'Present'}</span><span className="font-semibold text-emerald-600">{stats.staffPresent}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{lang === 'fr' ? 'En pause' : 'On break'}</span><span className="font-semibold text-purple-600">{stats.staffOnBreak}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{lang === 'fr' ? 'Partis' : 'Departed'}</span><span className="font-semibold text-blue-600">{stats.staffDeparted}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleLayout>
  );
}
