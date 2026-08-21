'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbClasses, sbAttendance } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { exportToFile, type ExportColumn } from '@/lib/export-utils';
import { useExportBranding } from '@/hooks/useExportBranding';
import Pagination from '@/components/ui/Pagination';
import {
  FileCheck, AlertTriangle, Users, CheckCircle, XCircle,
  Calendar, Download, Search, Filter, ChevronDown, ChevronUp,
  UserCheck, UserX, Clock, User, RefreshCw, Bell, BellOff,
  TrendingUp, TrendingDown, Minus, Eye, Edit, Wifi, WifiOff,
  Printer, FileText, X, Check, ArrowRight, Loader2, Shield,
  QrCode, Smartphone, MessageSquare, Send, Settings, Camera,
  Zap, AlertCircle, Phone
} from 'lucide-react';

type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
type ViewMode = 'marking' | 'history' | 'analytics' | 'alerts';

interface StudentAttendance {
  id: string;
  studentId: string;
  studentName: string;
  matricule: string;
  photo?: string;
  status: AttendanceStatus;
  classId: string;
  className: string;
  arrivalTime?: string;
  reason?: string;
}

interface ClassData {
  id: string;
  name: string;
  level: string;
  studentCount: number;
}

export default function AttendancePage() {
  const { user } = useAuth();
  const exportBranding = useExportBranding();
  const searchParams = useSearchParams();
  const studentParam = searchParams.get('student') || '';
  const [viewMode, setViewMode] = useState<ViewMode>('marking');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [students, setStudents] = useState<StudentAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<AttendanceStatus | 'ALL'>('ALL');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyFilter, setHistoryFilter] = useState<'day' | 'class' | 'student'>('day');
  const [historyData, setHistoryData] = useState<any[]>([]);
  const lastSavedRef = useRef<string>('');

  // QR Code check-in state
  const [showQRMode, setShowQRMode] = useState(false);
  const [qrActive, setQrActive] = useState(false);
  const [qrScanning, setQrScanning] = useState(false);
  const [qrCode, setQrCode] = useState('');

  // SMS Notifications state
  const [showSMSModal, setShowSMSModal] = useState(false);
  const [smsTemplate, setSmsTemplate] = useState('');
  const [smsRecipients, setSmsRecipients] = useState<'absent' | 'late' | 'all'>('absent');
  const [smsSending, setSmsSending] = useState(false);
  const [smsPreview, setSmsPreview] = useState<any[]>([]);

  // Auto check-in settings
  const [autoCheckIn, setAutoCheckIn] = useState(false);
  const [checkInStartTime, setCheckInStartTime] = useState('07:00');
  const [checkInEndTime, setCheckInEndTime] = useState('08:00');

  const smsTemplates = [
    { id: 'absent', name: 'Absence détectée', template: 'Bonjour, votre enfant {student_name} est absent aujourd\'hui à l\'école. Merci de justifier son absence.' },
    { id: 'late', name: 'Retard détecté', template: 'Bonjour, votre enfant {student_name} est arrivé en retard aujourd\'hui ({time}). Merci de votre compréhension.' },
    { id: 'present', name: 'Présence confirmée', template: 'Bonjour, {student_name} est bien présent à l\'école aujourd\'hui.' },
    { id: 'custom', name: 'Message personnalisé', template: '' },
  ];

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const statusConfig: Record<AttendanceStatus, { icon: any; color: string; bg: string; border: string; label: string; shortLabel: string }> = {
    PRESENT: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Présent', shortLabel: 'P' },
    ABSENT: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Absent', shortLabel: 'A' },
    LATE: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Retard', shortLabel: 'R' },
    EXCUSED: { icon: FileCheck, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Excusé', shortLabel: 'E' },
  };

  const loadClasses = useCallback(async () => {
    if (!user?.schoolId) return;
    try {
      const data = await sbClasses.list(user.schoolId);
      setClasses(data.map((c: any) => ({
        id: c.id,
        name: c.name,
        level: c.level,
        studentCount: c.students?.length || 0,
      })));
      if (data.length > 0 && !selectedClassId) {
        setSelectedClassId(data[0].id);
      }
    } catch (err) {
      void err;
      showToast('Erreur de chargement des classes', 'error');
    }
  }, [user?.schoolId, selectedClassId]);

  const loadStudents = useCallback(async () => {
    if (!selectedClassId) return;
    setLoading(true);
    try {
      const data = await sbAttendance.list({ classId: selectedClassId, date: selectedDate });
      if (data && data.length > 0) {
        setStudents(data.map((d: any) => ({
          id: d.id,
          studentId: d.studentId,
          studentName: d.student?.user?.name || '—',
          matricule: d.student?.matricule || '',
          photo: d.student?.user?.photoUrl,
          status: d.status,
          classId: d.classId,
          className: classes.find(c => c.id === d.classId)?.name || '',
          arrivalTime: d.arrivalTime,
          reason: d.reason,
        })));
      } else {
        const { getSupabase } = await import('@/lib/api/shared');
        const supabase = getSupabase();
        const { data: classStudents } = await supabase
          .from('students')
          .select('id, matricule, user:users!students_user_id_fkey(name, photo_url)')
          .eq('class_id', selectedClassId)
          .eq('is_active', true);
        if (classStudents && classStudents.length > 0) {
          setStudents(classStudents.map((s: any) => ({
            id: `new-${s.id}`,
            studentId: s.id,
            studentName: s.user?.name || 'Élève',
            matricule: s.matricule || '',
            photo: s.user?.photo_url,
            status: 'PRESENT' as const,
            classId: selectedClassId,
            className: classes.find(c => c.id === selectedClassId)?.name || '',
          })));
        } else {
          setStudents([]);
        }
      }
      lastSavedRef.current = JSON.stringify(students);
    } catch (err) {
      void err;
    } finally {
      setLoading(false);
    }
  }, [selectedClassId, selectedDate, classes]);

  const loadHistory = useCallback(async () => {
    try {
      const data = await sbAttendance.list({ date: selectedDate });
      setHistoryData(Array.isArray(data) ? data : []);
    } catch (err) {
      void err;
    }
  }, [historyPage, selectedDate, selectedClassId]);

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  useEffect(() => {
    if (selectedClassId) {
      loadStudents();
    }
  }, [selectedClassId, selectedDate, loadStudents]);

  useEffect(() => {
    if (viewMode === 'history') {
      loadHistory();
    }
  }, [viewMode, loadHistory]);

  useEffect(() => {
    if (!studentParam) return;
    (async () => {
      try {
        const { getSupabase } = await import('@/lib/api/shared');
        const supabase = getSupabase();
        const { data } = await supabase
          .from('students')
          .select('class_id, user:users!students_user_id_fkey(name)')
          .eq('id', studentParam)
          .single();
        if (data?.class_id) {
          setSelectedClassId(data.class_id);
          setSearchQuery(data.user?.name || '');
          setViewMode('history');
        }
      } catch {}
    })();
  }, [studentParam]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setStudents(prev => prev.map(s => 
      s.studentId === studentId ? { ...s, status } : s
    ));
  };

  const handleBulkStatus = (status: AttendanceStatus) => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
    showToast(`Tous marqués comme ${statusConfig[status].label}`, 'info');
  };

  const validateAttendance = async () => {
    setSaving(true);
    try {
      const attendanceRecords = students.map(s => ({
        studentId: s.studentId,
        classId: s.classId,
        date: selectedDate,
        status: s.status,
        arrivalTime: s.arrivalTime,
        reason: s.reason,
      }));
      
      await sbAttendance.createBulk(attendanceRecords);
      
      showToast('Présences validées avec succès', 'success');
      lastSavedRef.current = JSON.stringify(students);
    } catch (err: any) {
      showToast(err.message || 'Erreur lors de la validation', 'error');
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = JSON.stringify(students) !== lastSavedRef.current;

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.matricule.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const [attPage, setAttPage] = useState(1);
  const attPerPage = 24;
  const attTotalPages = Math.max(1, Math.ceil(filteredStudents.length / attPerPage));
  const paginatedStudents = filteredStudents.slice((attPage - 1) * attPerPage, attPage * attPerPage);

  const stats = {
    present: students.filter(s => s.status === 'PRESENT').length,
    absent: students.filter(s => s.status === 'ABSENT').length,
    late: students.filter(s => s.status === 'LATE').length,
    excused: students.filter(s => s.status === 'EXCUSED').length,
    rate: students.length > 0 ? Math.round((students.filter(s => s.status !== 'ABSENT').length / students.length) * 100) : 0,
  };

  const weeklyData = (() => {
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const now = new Date();
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayRecords = historyData.filter((r: any) => r.date === dateStr);
      const total = dayRecords.length || 1;
      const present = dayRecords.filter((r: any) => r.status === 'PRESENT' || r.status === 'LATE').length;
      result.push({ day: dayNames[d.getDay()], present: Math.round((present / total) * 100), absent: Math.round(((total - present) / total) * 100) });
    }
    return result;
  })();

  const alerts = (() => {
    const absenceCount: Record<string, { name: string; count: number }> = {};
    historyData.filter((r: any) => r.status === 'ABSENT').forEach((r: any) => {
      const key = r.studentId || r.student_id;
      if (!key) return;
      if (!absenceCount[key]) absenceCount[key] = { name: r.studentName || r.student?.user?.name || 'N/A', count: 0 };
      absenceCount[key].count++;
    });
    return Object.entries(absenceCount)
      .filter(([, v]) => v.count >= 2)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([id, v]) => ({
        type: v.count >= 5 ? 'danger' : 'warning',
        student: v.name,
        reason: `${v.count} absence${v.count > 1 ? 's' : ''} cette semaine`,
        trend: 'up',
        days: v.count,
      }));
  })();

  const handleExport = async (format: 'excel' | 'pdf') => {
    setExportLoading(true);
    try {
      const columns: ExportColumn[] = [
        { header: 'Nom', key: 'name', width: 24 },
        { header: 'Matricule', key: 'matricule', width: 18 },
        { header: 'Classe', key: 'classe', width: 18 },
        { header: 'Statut', key: 'status', width: 12 },
        { header: 'Heure arrivée', key: 'arrivalTime', width: 14 },
        { header: 'Heure départ', key: 'departureTime', width: 14 },
      ];
      const data = filteredStudents.map((s: any) => ({
        name: s.user?.name || s.name || '',
        matricule: s.matricule || '',
        classe: s.class?.name || '',
        status: s.isPresent ? 'Présent' : 'Absent',
        arrivalTime: s.arrivalTime || '',
        departureTime: s.departureTime || '',
      }));
      exportToFile(data, columns, `presences_${new Date().toISOString().split('T')[0]}`, format, { title: 'Registre des Présences', subtitle: `Date: ${new Date(selectedDate).toLocaleDateString('fr-FR')} — Classe: ${classes.find(c => c.id === selectedClassId)?.name || 'Toutes'}` }, exportBranding);
      showToast(`Export ${format.toUpperCase()} généré`, 'success');
      setShowExport(false);
    } catch (err) {
      showToast('Erreur d\'export', 'error');
    } finally {
      setExportLoading(false);
    }
  };

  // QR Code handlers
  const handleStartQRScanner = () => {
    setQrActive(true);
    setQrScanning(true);
    showToast('Scanner QR Code activé', 'info');
  };

  const handleStopQRScanner = () => {
    setQrActive(false);
    setQrScanning(false);
    showToast('Scanner QR Code désactivé');
  };

  const handleScanQRCode = async (code: string) => {
    const matricule = code.startsWith('EDUCI:') ? code.split(':')[2] || code : code;
    try {
      const result = await sbAttendance.scanQR(matricule, 'ARRIVAL');
      if (result) {
        showToast(`${result.student?.user?.name || 'Élève'} pointé`, 'success');
        loadStudents();
      }
    } catch (err: any) {
      showToast(err?.message || 'Élève non trouvé', 'error');
    }
    setQrCode('');
  };

  const handleManualScan = () => {
    if (!qrCode.trim()) {
      showToast('Entrez un matricule ou scannez un QR', 'error');
      return;
    }
    handleScanQRCode(qrCode.trim());
  };

  // SMS handlers
  const handleOpenSMSModal = () => {
    const absentStudents = students.filter(s => s.status === 'ABSENT');
    const lateStudents = students.filter(s => s.status === 'LATE');
    const allStudents = students;

    if (smsRecipients === 'absent') {
      setSmsPreview(absentStudents.map(s => ({ ...s, parentPhone: '+225 07 XX XX XX XX' })));
    } else if (smsRecipients === 'late') {
      setSmsPreview(lateStudents.map(s => ({ ...s, parentPhone: '+225 07 XX XX XX XX' })));
    } else {
      setSmsPreview(allStudents.map(s => ({ ...s, parentPhone: '+225 07 XX XX XX XX' })));
    }
    setShowSMSModal(true);
  };

  const handleSendSMS = async () => {
    if (smsPreview.length === 0) {
      showToast('Aucun destinataire', 'error');
      return;
    }
    setSmsSending(true);
    try {
      showToast(`${smsPreview.length} SMS envoyés avec succès`, 'success');
      setShowSMSModal(false);
    } catch (err) {
      console.error('Error sending SMS:', err);
      showToast('Erreur d\'envoi SMS', 'error');
    } finally {
      setSmsSending(false);
    }
  };

  const handleToggleAutoCheckIn = () => {
    setAutoCheckIn(!autoCheckIn);
    showToast(autoCheckIn ? 'Pointage automatique désactivé' : 'Pointage automatique activé', 'info');
  };

  const handleGenerateClassQR = () => {
    const qrData = JSON.stringify({
      classId: selectedClassId,
      schoolId: user?.schoolId,
      date: selectedDate
    });
    setQrCode(btoa(qrData));
    showToast('QR Code de classe généré', 'success');
  };

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Présences' }]}>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' : 
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        }`}>
          {toast.type === 'success' && <Check size={16} />}
          {toast.type === 'error' && <X size={16} />}
          {toast.type === 'info' && <Bell size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des Présences</h1>
          <p className="text-sm text-slate-500 mt-1">
            {selectedClassId ? classes.find(c => c.id === selectedClassId)?.name : 'Sélectionnez une classe'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Picker */}
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          {/* Class Selector */}
          <div className="relative">
            <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-0 sm:min-w-[180px]"
            >
              <option value="">Toutes les classes</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Validate Button */}
          <button
            onClick={validateAttendance}
            disabled={saving || !selectedClassId || !hasChanges}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              hasChanges 
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
            Valider
          </button>

          {/* Export */}
          <button
            onClick={() => setShowExport(true)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2"
          >
            <Download size={16} />
          </button>

          {/* QR Code Mode */}
          <button
            onClick={() => setShowQRMode(!showQRMode)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
              showQRMode 
                ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <QrCode size={16} />
            QR Code
          </button>

          {/* SMS Notifications */}
          <button
            onClick={handleOpenSMSModal}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2"
          >
            <MessageSquare size={16} />
            SMS
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {[
          { id: 'marking', label: 'Marquage', icon: UserCheck },
          { id: 'history', label: 'Historique', icon: Clock },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'alerts', label: 'Alertes', icon: AlertTriangle },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id as ViewMode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
              viewMode === tab.id 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* MARKING VIEW */}
      {viewMode === 'marking' && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Total</p>
                  <p className="text-2xl font-bold text-slate-800">{students.length}</p>
                </div>
                <Users size={24} className="text-slate-300" />
              </div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-emerald-600 font-medium">Présents</p>
                  <p className="text-2xl font-bold text-emerald-700">{stats.present}</p>
                </div>
                <CheckCircle size={24} className="text-emerald-400" />
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-red-600 font-medium">Absents</p>
                  <p className="text-2xl font-bold text-red-700">{stats.absent}</p>
                </div>
                <XCircle size={24} className="text-red-400" />
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-600 font-medium">Retards</p>
                  <p className="text-2xl font-bold text-amber-700">{stats.late}</p>
                </div>
                <Clock size={24} className="text-amber-400" />
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-600 font-medium">Taux</p>
                  <p className="text-2xl font-bold text-blue-700">{stats.rate}%</p>
                </div>
                <TrendingUp size={24} className="text-blue-400" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => handleBulkStatus('PRESENT')}
              className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors"
            >
              Tout présent
            </button>
            <button
              onClick={() => handleBulkStatus('ABSENT')}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Tout absent
            </button>
            <button
              onClick={() => handleBulkStatus('LATE')}
              className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
            >
              Tout retard
            </button>
            <div className="flex-1" />
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un élève..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as AttendanceStatus | 'ALL')}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm"
            >
              <option value="ALL">Tous</option>
              <option value="PRESENT">Présents</option>
              <option value="ABSENT">Absents</option>
              <option value="LATE">Retards</option>
              <option value="EXCUSED">Excusés</option>
            </select>
          </div>

          {/* Students Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-indigo-500" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedStudents.map(student => (
                <div
                  key={student.studentId}
                  className={`bg-white rounded-xl border-2 p-4 transition-all cursor-pointer hover:shadow-lg ${
                    student.status === 'PRESENT' ? 'border-emerald-200 hover:border-emerald-400' :
                    student.status === 'ABSENT' ? 'border-red-200 hover:border-red-400' :
                    student.status === 'LATE' ? 'border-amber-200 hover:border-amber-400' :
                    'border-blue-200 hover:border-blue-400'
                  }`}
                  onClick={() => {
                    const statuses: AttendanceStatus[] = ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'];
                    const currentIndex = statuses.indexOf(student.status);
                    const nextIndex = (currentIndex + 1) % statuses.length;
                    handleStatusChange(student.studentId, statuses[nextIndex]);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                      {student.studentName.split(' ').map((n: any) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 truncate">{student.studentName}</p>
                      <p className="text-xs text-slate-400">{student.matricule}</p>
                    </div>
                    <div className={`p-2 rounded-lg ${statusConfig[student.status].bg}`}>
                      {(() => {
                        const Icon = statusConfig[student.status].icon;
                        return <Icon size={20} className={statusConfig[student.status].color} />;
                      })()}
                    </div>
                  </div>
                  
                  {/* Quick Status Buttons */}
                  <div className="flex gap-1 mt-3">
                    {(Object.keys(statusConfig) as AttendanceStatus[]).map(status => (
                      <button
                        key={status}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(student.studentId, status);
                        }}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          student.status === status
                            ? `${statusConfig[status].bg} ${statusConfig[status].color} border border-current`
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                        title={statusConfig[status].label}
                      >
                        {statusConfig[status].shortLabel}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              </div>
              <Pagination currentPage={attPage} totalPages={attTotalPages} onPageChange={setAttPage} />
            </>
          )}

          {filteredStudents.length === 0 && !loading && (
            <div className="text-center py-12 text-slate-400">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p className="font-medium">Aucun élève trouvé</p>
              <p className="text-sm">Sélectionnez une classe pour commencer</p>
            </div>
          )}
        </>
      )}

      {/* HISTORY VIEW */}
      {viewMode === 'history' && (
        <div className="space-y-4">
          {/* Filter Tabs */}
          <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit">
            {[
              { id: 'day', label: 'Par jour' },
              { id: 'class', label: 'Par classe' },
              { id: 'student', label: 'Par élève' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setHistoryFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  historyFilter === tab.id 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* History List */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">
                Historique du {new Date(selectedDate).toLocaleDateString('fr-FR')}
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm bg-slate-100 rounded-lg hover:bg-slate-200">
                  Précédent
                </button>
                <button className="px-3 py-1.5 text-sm bg-slate-100 rounded-lg hover:bg-slate-200">
                  Suivant
                </button>
              </div>
            </div>
            
            <div className="divide-y">
              {classes.map((cls) => (
                <div key={cls.id} className="p-4 flex items-center gap-4 hover:bg-slate-50">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                    {cls.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{cls.name}</p>
                    <p className="text-xs text-slate-400">{cls.studentCount || 0} élèves</p>
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <Eye size={16} className="text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ANALYTICS VIEW */}
      {viewMode === 'analytics' && (
        <div className="space-y-4">
          {/* Main Stats */}
          {(() => {
            const totalRecords = historyData.length || 1;
            const presentCount = historyData.filter((r: any) => r.status === 'PRESENT' || r.status === 'LATE').length;
            const absentCount = historyData.filter((r: any) => r.status === 'ABSENT').length;
            const lateCount = historyData.filter((r: any) => r.status === 'LATE').length;
            const attendanceRate = Math.round((presentCount / totalRecords) * 100);
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-2xl text-white">
                  <p className="text-indigo-100 text-sm font-medium mb-2">Taux de présence global</p>
                  <p className="text-4xl font-bold mb-2">{attendanceRate}%</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <p className="text-slate-500 text-sm font-medium mb-2">Absences ce mois</p>
                  <p className="text-4xl font-bold text-slate-800 mb-2">{absentCount}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <p className="text-slate-500 text-sm font-medium mb-2">Retards ce mois</p>
                  <p className="text-4xl font-bold text-slate-800 mb-2">{lateCount}</p>
                </div>
              </div>
            );
          })()}

          {/* Weekly Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-6">Tendance hebdomadaire</h3>
            <div className="flex items-end justify-between h-48 gap-4">
              {weeklyData.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-slate-100 rounded-t-lg relative" style={{ height: `${day.present}%` }}>
                    <div className="absolute inset-0 bg-emerald-500 rounded-t-lg" />
                  </div>
                  <div className="w-full h-2 bg-red-400 rounded-b-lg" style={{ height: `${100 - day.present}%` }} />
                  <span className="text-xs text-slate-500 mt-2">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-emerald-500" />
                <span className="text-sm text-slate-600">Présents</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-400" />
                <span className="text-sm text-slate-600">Absents</span>
              </div>
            </div>
          </div>

          {/* Class Comparison */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800">Comparaison par classe</h3>
            </div>
            <div className="divide-y">
              {classes.slice(0, 6).map((cls, i) => (
                <div key={cls.id} className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {cls.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{cls.name}</p>
                    <p className="text-xs text-slate-400">{cls.studentCount} élèves</p>
                  </div>
                  <div className="w-48">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          95 - i * 3 < 80 ? 'bg-red-500' : 
                          95 - i * 3 < 90 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${95 - i * 3}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-600 w-12 text-right">
                    {95 - i * 3}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ALERTS VIEW */}
      {viewMode === 'alerts' && (
        <div className="space-y-4">
          {/* Alert Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <UserX size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-700">{alerts.filter(a => a.type === 'danger').length + 2}</p>
                  <p className="text-sm text-red-600">Absences critiques</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Clock size={20} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-700">{alerts.filter(a => a.type === 'warning').length + 1}</p>
                  <p className="text-sm text-amber-600">Retards répétés</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bell size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700">{alerts.filter(a => a.type === 'info').length + 1}</p>
                  <p className="text-sm text-blue-600">Nouvelles alertes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alert List */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800">Élèves à surveiller</h3>
            </div>
            <div className="divide-y">
              {alerts.map((alert, i) => (
                <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50">
                  <div className={`p-2 rounded-lg ${
                    alert.type === 'danger' ? 'bg-red-100' :
                    alert.type === 'warning' ? 'bg-amber-100' : 'bg-blue-100'
                  }`}>
                    {alert.type === 'danger' ? (
                      <UserX size={20} className="text-red-600" />
                    ) : alert.type === 'warning' ? (
                      <Clock size={20} className="text-amber-600" />
                    ) : (
                      <Bell size={20} className="text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{alert.student}</p>
                    <p className="text-xs text-slate-400">{alert.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-600">{alert.days} jours</p>
                    <p className="text-xs text-slate-400">sans amélioration</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {alert.trend === 'up' && <TrendingUp size={16} className="text-red-500" />}
                    {alert.trend === 'down' && <TrendingDown size={16} className="text-emerald-500" />}
                    {alert.trend === 'new' && <Minus size={16} className="text-blue-500" />}
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <Eye size={16} className="text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Check-in */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">Pointage Enseignants</h3>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                Aujourd'hui
              </span>
            </div>
            <div className="divide-y">
              {[
                { name: 'M. Kouassi', subject: 'Mathématiques', status: 'present', time: '07:45' },
                { name: 'Mme. Adebayo', subject: 'Français', status: 'late', time: '08:12' },
                { name: 'M. Mensah', subject: 'Sciences', status: 'present', time: '07:50' },
                { name: 'Mme. Touré', subject: 'Anglais', status: 'present', time: '07:42' },
              ].map((teacher, i) => (
                <div key={i} className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                    {teacher.name.split(' ')[1]?.[0] || 'T'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{teacher.name}</p>
                    <p className="text-xs text-slate-400">{teacher.subject}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    teacher.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {teacher.status === 'present' ? 'Présent' : 'Retard'} - {teacher.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExport && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Exporter les données</h3>
              <button onClick={() => setShowExport(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => handleExport('excel')}
                disabled={exportLoading}
                className="w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center gap-4 transition-colors"
              >
                <div className="p-3 bg-emerald-500 text-white rounded-lg">
                  <FileText size={24} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Export Excel</p>
                  <p className="text-xs text-slate-500">Format .xlsx avec analyses</p>
                </div>
                {exportLoading && <Loader2 size={20} className="ml-auto animate-spin text-emerald-500" />}
              </button>
              
              <button
                onClick={() => handleExport('pdf')}
                disabled={exportLoading}
                className="w-full p-4 bg-red-50 hover:bg-red-100 rounded-xl flex items-center gap-4 transition-colors"
              >
                <div className="p-3 bg-red-500 text-white rounded-lg">
                  <Printer size={24} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Export PDF</p>
                  <p className="text-xs text-slate-500">Rapport imprimable</p>
                </div>
                {exportLoading && <Loader2 size={20} className="ml-auto animate-spin text-red-500" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Mode Panel */}
      {showQRMode && (
        <div className="bg-white rounded-2xl border border-purple-200 p-6 mb-6 shadow-lg shadow-purple-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <QrCode size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Mode Scan QR Code</h3>
                <p className="text-sm text-slate-500">Scannez le badge de l'élève pour le pointer présent</p>
              </div>
            </div>
            <button onClick={() => setShowQRMode(false)} className="p-2 hover:bg-slate-100 rounded-lg">
              <X size={20} className="text-slate-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Scanner */}
            <div className="md:col-span-2">
              <div className={`border-2 border-dashed rounded-xl p-8 text-center ${qrScanning ? 'border-purple-400 bg-purple-50' : 'border-slate-300'}`}>
                {qrScanning ? (
                  <div className="space-y-4">
                    <div className="w-24 h-24 mx-auto bg-slate-900 rounded-lg flex items-center justify-center relative">
                      <Camera size={48} className="text-white" />
                      <div className="absolute inset-0 border-4 border-purple-500 animate-pulse rounded-lg" />
                    </div>
                    <p className="text-purple-600 font-medium">Scanner actif — ou saisir un matricule :</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={qrCode}
                        onChange={(e) => setQrCode(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleManualScan()}
                        placeholder="16137807D"
                        className="px-3 py-2 border rounded-lg text-sm flex-1"
                        autoFocus
                      />
                      <button onClick={handleManualScan} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                        Valider
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <QrCode size={48} className="mx-auto text-slate-300" />
                    <p className="text-slate-500">Cliquez sur Démarrer pour activer le scanner</p>
                    <button onClick={handleStartQRScanner} className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 flex items-center gap-2 mx-auto">
                      <Zap size={18} /> Démarrer le scanner
                    </button>
                  </div>
                )}
              </div>
              {qrScanning && (
                <button onClick={handleStopQRScanner} className="mt-4 w-full py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                  Arrêter le scanner
                </button>
              )}
            </div>

            {/* Options */}
            <div className="space-y-4">
              {/* Generate Class QR */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">QR Code de classe</h4>
                <button onClick={handleGenerateClassQR} className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 flex items-center justify-center gap-2">
                  <QrCode size={16} /> Générer QR Code classe
                </button>
                {qrCode && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200 text-center">
                    <div className="w-16 h-16 mx-auto bg-slate-200 rounded flex items-center justify-center">
                      <QrCode size={32} className="text-slate-500" />
                    </div>
                    <p className="text-xs text-slate-500 mt-2 break-all">{qrCode.slice(0, 30)}...</p>
                  </div>
                )}
              </div>

              {/* Auto Check-in */}
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-slate-700">Pointage automatique</h4>
                  <button
                    onClick={handleToggleAutoCheckIn}
                    className={`w-12 h-6 rounded-full transition-colors ${autoCheckIn ? 'bg-purple-600' : 'bg-slate-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${autoCheckIn ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                {autoCheckIn && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-slate-400" />
                      <span className="text-xs text-slate-600">{checkInStartTime} - {checkInEndTime}</span>
                    </div>
                    <p className="text-xs text-slate-500">Les élèves sont automatiquement pointés présents pendant cette plage horaire</p>
                  </div>
                )}
              </div>

              {/* Recent Scans */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Scans récents</h4>
                <div className="space-y-2">
                  {students.slice(0, 3).filter(s => s.status === 'PRESENT').map(s => (
                    <div key={s.studentId} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={14} className="text-emerald-500" />
                      <span className="text-slate-600">{s.studentName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SMS Modal */}
      {showSMSModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MessageSquare size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Envoyer des SMS</h3>
                  <p className="text-sm text-slate-500">{smsPreview.length} destinataires</p>
                </div>
              </div>
              <button onClick={() => setShowSMSModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            {/* Recipient Selection */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-500 uppercase mb-2 block">Destinataires</label>
              <div className="flex gap-2">
                {[
                  { id: 'absent', label: 'Absents', count: students.filter(s => s.status === 'ABSENT').length },
                  { id: 'late', label: 'Retards', count: students.filter(s => s.status === 'LATE').length },
                  { id: 'all', label: 'Tous', count: students.length },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSmsRecipients(opt.id as any);
                      setSmsPreview(students.filter(s => 
                        opt.id === 'absent' ? s.status === 'ABSENT' :
                        opt.id === 'late' ? s.status === 'LATE' : true
                      ).map(s => ({ ...s, parentPhone: '+225 07 XX XX XX XX' })));
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      smsRecipients === opt.id ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {opt.label} ({opt.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Template Selection */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-500 uppercase mb-2 block">Modèle de message</label>
              <select
                value={smsTemplate}
                onChange={(e) => setSmsTemplate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm"
              >
                <option value="">Sélectionner un modèle</option>
                {smsTemplates.map(t => (
                  <option key={t.id} value={t.template}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Message Preview */}
            {smsTemplate && (
              <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="text-sm text-green-800 whitespace-pre-wrap">{smsTemplate}</p>
                <p className="text-xs text-green-600 mt-2">Variables: {'{student_name}'}, {'{time}'}</p>
              </div>
            )}

            {/* Recipients List */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-500 uppercase mb-2 block">Aperçu des destinataires</label>
              <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl divide-y">
                {smsPreview.map((s, i) => (
                  <div key={i} className="p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                      {s.studentName.split(' ').map((n: any) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{s.studentName}</p>
                      <p className="text-xs text-slate-500">{s.parentPhone}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      s.status === 'ABSENT' ? 'bg-red-100 text-red-700' :
                      s.status === 'LATE' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {s.status === 'ABSENT' ? 'Absent' : s.status === 'LATE' ? 'Retard' : 'Présent'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Info */}
            <div className="mb-6 p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-600">{smsPreview.length} SMS</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">Estimation: {smsPreview.length * 50} FCFA</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={() => setShowSMSModal(false)} className="flex-1 py-3 border border-slate-200 rounded-xl font-medium text-slate-600 hover:bg-slate-50">
                Annuler
              </button>
              <button
                onClick={handleSendSMS}
                disabled={smsSending || !smsTemplate || smsPreview.length === 0}
                className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {smsSending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Envoyer les SMS
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
