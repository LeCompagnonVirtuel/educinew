'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import RoleLayout from '@/components/layout/RoleLayout';
import { api, sbTeachers, sbSubjects } from '@/lib/api';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import { getInitials } from '@/lib/utils';
import { exportToFile, type ExportColumn } from '@/lib/export-utils';
import { useExportBranding } from '@/hooks/useExportBranding';
import Pagination from '@/components/ui/Pagination';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import {
  Search, Plus, Eye, Edit, Trash2, X, Check,
  GraduationCap, Clock, FileText, Download, Calendar,
  BarChart3, Users, Filter, MessageSquare, CreditCard,
  AlertTriangle, DollarSign, BookOpen, UsersRound, PlusCircle,
  Clock3, TrendingUp, TrendingDown, ArrowRight,
  FileSpreadsheet, UploadCloud, DownloadCloud, FilterX,
  Edit2, Trash, Loader2, QrCode, CalendarDays, UserCog,
  Send, Phone, Mail, MapPin, Briefcase, Award, Target,
  CheckCircle2, XCircle, AlertCircle, RefreshCw
} from 'lucide-react';

interface Salary {
  id: string;
  teacherId: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  paymentDate: string;
  status: 'paid' | 'pending' | 'delayed';
  period: string;
}

interface LessonPlan {
  id: string;
  teacherId: string;
  subjectName: string;
  className: string;
  topic: string;
  objectives: string[];
  duration: number;
  materials: string[];
  date: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
}

interface TimetableSlot {
  day: string;
  time: string;
  className: string;
  subject: string;
  room?: string;
}

export default function TeachersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const exportBranding = useExportBranding();
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    subjectId: '',
    classId: '',
    status: '',
    attendance: ''
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 25;

  const [showCreate, setShowCreate] = useState(false);
  const [showPreview, setShowPreview] = useState<any>(null);
  const [showEdit, setShowEdit] = useState<any>(null);
  const [showDelete, setShowDelete] = useState<any>(null);
  const [showImport, setShowImport] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showSalary, setShowSalary] = useState<any>(null);
  const [showLessonPlan, setShowLessonPlan] = useState<any>(null);
  const [showTimetable, setShowTimetable] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{ email: string; tempPassword: string; identifier?: string; invitationCode?: string } | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    subjectId: '', 
    gender: '',
    address: '',
    importFile: null as File | null,
    exportFormat: 'excel' as 'excel' | 'pdf'
  });

  const [salaryForm, setSalaryForm] = useState({
    baseSalary: 0,
    allowances: 0,
    deductions: 0
  });

  const [lessonPlanForm, setLessonPlanForm] = useState({
    subjectName: '',
    className: '',
    topic: '',
    objectives: '',
    duration: 60,
    materials: '',
    date: ''
  });

  const [analytics, setAnalytics] = useState({
    totalTeachers: 0,
    bySubject: [] as any[],
    byStatus: [] as any[],
    attendanceRate: 0
  });

  const [salaryHistory, setSalaryHistory] = useState<Salary[]>([]);
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);
  const [subjectsList, setSubjectsList] = useState<any[]>([]);

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000);
  };

  const loadTeachers = async () => {
    setLoading(true);
    try {
      const supabase = getSupabase();
      const schoolId = user?.schoolId;
      if (!schoolId) return;
      const [paginatedResult, subjectsRes, attendanceRes] = await Promise.all([
        sbTeachers.listPaginated(schoolId, (currentPage - 1), PAGE_SIZE),
        sbSubjects.list(schoolId).catch(() => []),
        supabase.from('attendance').select('teacher_id, status').eq('school_id', schoolId).eq('date', new Date().toISOString().split('T')[0]),
      ]);

      const allTeachers = paginatedResult.data || [];
      setTeachers(allTeachers);
      setTotalCount(paginatedResult.count);
      setSubjectsList(Array.isArray(subjectsRes) ? subjectsRes : []);

      // Compute analytics
      const subjectCounts: Record<string, number> = {};
      let activeCount = 0;
      let inactiveCount = 0;

      allTeachers.forEach((t: any) => {
        const subjectName = t.subject?.name || 'Non assigné';
        subjectCounts[subjectName] = (subjectCounts[subjectName] || 0) + 1;
        if (t.status === 'active' || t.user?.isActive) activeCount++;
        else inactiveCount++;
      });

      const maxSubject = Math.max(...Object.values(subjectCounts), 1);
      const bySubject = Object.entries(subjectCounts)
        .map(([name, count]) => ({ name, count, percentage: Math.round((count / maxSubject) * 100) }))
        .sort((a, b) => b.count - a.count);

      const byStatus = [
        { label: 'Actifs', value: activeCount },
        { label: 'Inactifs', value: inactiveCount },
      ];

      // Attendance rate
      const attData = attendanceRes.data || [];
      const presentTeachers = attData.filter((a: any) => a.status === 'PRESENT').length;
      const totalChecked = attData.length || 1;
      const attendanceRate = Math.round((presentTeachers / totalChecked) * 100);

      setAnalytics({
        totalTeachers: paginatedResult.count,
        bySubject,
        byStatus,
        attendanceRate: attData.length > 0 ? attendanceRate : 0
      });
    } catch (e: any) {
      setTeachers([]);
      setTotalCount(0);
      setAnalytics({ totalTeachers: 0, bySubject: [], byStatus: [], attendanceRate: 0 });
      showToast(e.message || 'Erreur lors du chargement des enseignants', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters]);

  useEffect(() => {
    if (!user?.schoolId) return;
    loadTeachers();
  }, [user?.schoolId, search, filters, currentPage]);

  const filtered = teachers.filter((t) => {
    if (search && !(
      t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      t.phone?.includes(search) ||
      t.subject?.name?.toLowerCase().includes(search.toLowerCase())
    )) return false;
    if (filters.subjectId && t.subjectId !== filters.subjectId) return false;
    if (filters.status) {
      const isActive = t.status === 'active' || t.user?.isActive;
      if (filters.status === 'active' && !isActive) return false;
      if (filters.status === 'inactive' && isActive) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const paginatedTeachers = filtered;

  const handleCreate = async () => {
    if (!form.name || !form.email) { showToast('Nom et email requis', 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { showToast('Format email invalide', 'error'); return; }
    setActionLoading(true);
    try {
      const result = await api.createTeacher({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        subjectId: form.subjectId || undefined,
        gender: form.gender || undefined,
        address: form.address || undefined,
        schoolId: user?.schoolId,
      });
      setCreatedCredentials({
        email: form.email,
        tempPassword: result?.credentials?.tempPassword || result?.credentials?.invitationCode || '',
        identifier: result?.credentials?.identifier || result?.identifier || '',
        invitationCode: result?.credentials?.invitationCode || result?.invitationCode || '',
      });
      setForm({ name: '', email: '', phone: '', subjectId: '', gender: '', address: '', importFile: null, exportFormat: 'excel' });
      loadTeachers();
    } catch (e: any) { showToast(e.message, 'error'); }
    finally { setActionLoading(false); }
  };

  const handleEdit = async () => {
    if (!showEdit) return;
    setActionLoading(true);
    try {
      await api.updateTeacher(showEdit.id, { 
        phone: form.phone || undefined, 
        subjectId: form.subjectId || undefined,
        gender: form.gender || undefined,
        address: form.address || undefined
      });
      showToast('Enseignant modifié avec succès');
      setShowEdit(null);
      loadTeachers();
    } catch (e: any) { showToast(e.message, 'error'); }
    finally { setActionLoading(false); }
  };

  const handleDelete = async () => {
    if (!showDelete) return;
    setActionLoading(true);
    try {
      await api.deleteTeacher(showDelete.id);
      showToast('Enseignant supprimé avec succès');
      setShowDelete(null);
      loadTeachers();
    } catch (e: any) { showToast(e.message, 'error'); }
    finally { setActionLoading(false); }
  };

  const openEdit = (teacher: any) => {
    setForm({ 
      ...form, 
      phone: teacher.phone || '', 
      subjectId: teacher.subjectId || '',
      gender: teacher.gender || '',
      address: teacher.address || ''
    });
    setShowEdit(teacher);
  };

  const openSalary = (teacher: any) => {
    setShowSalary(teacher);
    setSalaryHistory([]);
    setSalaryForm({
      baseSalary: teacher.salary || 0,
      allowances: 0,
      deductions: 0
    });
  };

  const openLessonPlan = (teacher: any) => {
    setShowLessonPlan(teacher);
    setLessonPlans([]);
  };

  const openTimetable = async (teacher: any) => {
    setShowTimetable(teacher);
    setTimetable([]);
    try {
      const supabase = getSupabase();
      const { data } = await supabase
        .from('timetable_slots')
        .select('*, subject:subjects(name), class:classes(name)')
        .eq('subject_id', teacher.subjectId || '');
      const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
      const slots: TimetableSlot[] = (data || []).map((s: any) => ({
        day: dayNames[s.day_of_week] || `Jour ${s.day_of_week}`,
        time: `${s.start_time} - ${s.end_time}`,
        className: s.class?.name || '',
        subject: s.subject?.name || '',
        room: s.room || undefined
      }));
      setTimetable(slots);
    } catch (err) {
      // Error handled by catch block
    }
  };

  const handleViewSchedule = (teacher: any) => {
    openTimetable(teacher);
  };

  const handleViewAttendance = (teacher: any) => {
    router.push(`/attendance?teacher=${teacher.id}`);
  };

  const handleViewPerformance = (teacher: any) => {
    router.push(`/teachers/${teacher.id}`);
  };

  const handleSaveSalary = async () => {
    if (!showSalary) return;
    if (!salaryForm.baseSalary || salaryForm.baseSalary <= 0) {
      showToast('Le salaire doit être supérieur à 0', 'error');
      return;
    }
    setActionLoading(true);
    try {
      const supabase = getSupabase();
      await supabase.from('teachers').update({ salary: salaryForm.baseSalary }).eq('id', showSalary.id);
      showToast(`Salaire mis à jour: ${formatCurrency(salaryForm.baseSalary)} FCFA`, 'success');
      loadTeachers();
    } catch (e: any) {
      showToast(e.message || 'Erreur lors de la mise à jour', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddLessonPlan = async () => {
    if (!lessonPlanForm.topic || !lessonPlanForm.className) {
      showToast('Sujet et classe requis', 'error');
      return;
    }
    if (!showLessonPlan) return;
    setActionLoading(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('lesson_plans').insert({
        teacher_id: showLessonPlan.id,
        subject_name: lessonPlanForm.subjectName || showLessonPlan.subject?.name || '',
        class_name: lessonPlanForm.className,
        topic: lessonPlanForm.topic,
        objectives: lessonPlanForm.objectives ? lessonPlanForm.objectives.split(',').map((o: string) => o.trim()) : [],
        duration: lessonPlanForm.duration,
        materials: lessonPlanForm.materials ? lessonPlanForm.materials.split(',').map((m: string) => m.trim()) : [],
        date: lessonPlanForm.date || new Date().toISOString().split('T')[0],
        status: 'draft',
        school_id: user?.schoolId,
      });
      if (error) throw error;
      showToast('Plan de leçon ajouté avec succès');
      setLessonPlanForm({ subjectName: '', className: '', topic: '', objectives: '', duration: 60, materials: '', date: '' });
    } catch (e: any) {
      showToast(e.message || 'Erreur lors de l\'ajout du plan', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount);
  };

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Gestion' }, { label: 'Enseignants' }]}>
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase mb-2 block">Gestion des enseignants</span>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-none mb-2">Gestion des enseignants</h2>
          <p className="text-lg text-slate-500">{analytics.totalTeachers} enseignants enregistrés</p>
        </div>
        <div className="flex items-center gap-3">
          {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
            <>
              <button onClick={() => setShowImport(true)} className="px-6 py-3 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-sm shadow-lg shadow-green-200 active:scale-95 flex items-center gap-2">
                <UploadCloud size={16} /> Importer
              </button>
              <button onClick={() => setShowExport(true)} className="px-6 py-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 active:scale-95 flex items-center gap-2">
                <DownloadCloud size={16} /> Exporter
              </button>
              <button onClick={() => setShowCreate(true)} className="px-8 py-3 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-200 active:scale-95 flex items-center gap-2">
                <Plus size={18} /> Ajouter
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Recherche</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Nom, email, téléphone..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" 
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Matière</label>
            <select
              value={filters.subjectId}
              onChange={(e) => setFilters({ ...filters, subjectId: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Toutes les matières</option>
              {subjectsList.map((s: any) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Statut</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Présence</label>
            <select
              value={filters.attendance}
              onChange={(e) => setFilters({ ...filters, attendance: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Toutes les présences</option>
              <option value="present">Présent</option>
              <option value="absent">Absent</option>
              <option value="late">En retard</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4">
          <button onClick={() => setFilters({ subjectId: '', classId: '', status: '', attendance: '' })} className="px-4 py-2 bg-indigo-50 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-100 flex items-center gap-2">
            <FilterX size={16} /> Réinitialiser
          </button>
          <span className="text-sm text-slate-500">{filtered.length} résultat(s)</span>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-on-surface mb-4">Répartition par matière</h3>
          <div className="space-y-3">
            {analytics.bySubject.length > 0 ? analytics.bySubject.slice(0, 6).map((subject: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{subject.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${subject.percentage}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 w-6">{subject.count}</span>
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-400 text-center py-4">Aucune donnée</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-on-surface mb-4">Statut des enseignants</h3>
          <div className="flex items-center justify-center gap-8 h-32">
            {analytics.byStatus.length > 0 ? analytics.byStatus.map((status: any, i: number) => (
              <div key={i} className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-2 ${i === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                  {status.value}
                </div>
                <span className="text-sm text-slate-600">{status.label}</span>
              </div>
            )) : (
              <p className="text-sm text-slate-400">Aucune donnée</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-on-surface mb-4">Taux de présence</h3>
          <div className="flex items-center justify-center h-32">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2dfff" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4F46E5" strokeWidth="3" strokeDasharray={`${analytics.attendanceRate}, 100`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{analytics.attendanceRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl overflow-x-auto shadow-sm">
        <table className="w-full text-left min-w-[900px]">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Photo</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nom & Prénom</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Matière(s)</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Classes</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Téléphone</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Salaire</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Statut</th>
              <th className="px-10 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={8} className="text-center py-12 text-slate-400"><Loader2 size={24} className="animate-spin mx-auto" /></td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-12 text-slate-400">Aucun enseignant trouvé</td></tr>
            ) : (
              paginatedTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 overflow-hidden flex items-center justify-center text-indigo-700 font-bold text-sm">
                      {getInitials(teacher.user?.name || '?')}
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <p className="text-sm font-bold text-slate-900">{teacher.user?.name}</p>
                    <p className="text-xs text-slate-500">{teacher.user?.email}</p>
                  </td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600">
                      {teacher.subject?.name || 'Non assigné'}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex flex-wrap gap-1">
                      {teacher.classes?.slice(0, 2).map((cls: any, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600">
                          {cls.name}
                        </span>
                      ))}
                      {(teacher.classes?.length || 0) > 2 && (
                        <span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600">
                          +{(teacher.classes?.length || 0) - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-sm text-slate-700">{teacher.phone || '-'}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-sm font-semibold text-emerald-600">{formatCurrency(teacher.salary || 0)} FCFA</span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      teacher.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {teacher.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-10 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setShowPreview(teacher)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="Voir profil"><Eye size={16} /></button>
                      {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
                        <>
                          <button onClick={() => openEdit(teacher)} className="p-2 text-slate-400 hover:text-amber-500 transition-colors" title="Modifier"><Edit size={16} /></button>
                          <button onClick={() => openSalary(teacher)} className="p-2 text-slate-400 hover:text-emerald-600 transition-colors" title="Salaire"><DollarSign size={16} /></button>
                          <button onClick={() => openLessonPlan(teacher)} className="p-2 text-slate-400 hover:text-purple-600 transition-colors" title="Plans de leçon"><BookOpen size={16} /></button>
                          <button onClick={() => openTimetable(teacher)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="Emploi du temps"><CalendarDays size={16} /></button>
                          <button onClick={() => setShowDelete(teacher)} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Supprimer"><Trash2 size={16} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {/* CREATE MODAL */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => { setShowCreate(false); setCreatedCredentials(null); }}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">{createdCredentials ? 'Compte créé' : 'Ajouter un enseignant'}</h3>
              <button onClick={() => { setShowCreate(false); setCreatedCredentials(null); }} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            {createdCredentials ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="font-medium text-green-800 flex items-center gap-2"><CheckCircle2 size={18} /> Enseignant créé avec succès !</p>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm text-green-700">Email: <code className="bg-green-100 px-2 py-1 rounded font-mono">{createdCredentials.email}</code></p>
                    {createdCredentials.tempPassword && (
                      <p className="text-sm text-green-700">Mot de passe temporaire: <code className="bg-green-100 px-2 py-1 rounded font-mono">{createdCredentials.tempPassword}</code></p>
                    )}
                    {createdCredentials.identifier && (
                      <p className="text-sm text-green-700">Identifiant: <code className="bg-green-100 px-2 py-1 rounded font-mono">{createdCredentials.identifier}</code></p>
                    )}
                    {createdCredentials.invitationCode && (
                      <p className="text-sm text-green-700">Code d&apos;invitation: <code className="bg-green-100 px-2 py-1 rounded font-mono">{createdCredentials.invitationCode}</code></p>
                    )}
                  </div>
                  <p className="text-xs text-green-600 mt-3">Transmettez ces informations à l&apos;enseignant. Le mot de passe devra être changé à la première connexion.</p>
                </div>
                <button onClick={() => { setCreatedCredentials(null); setShowCreate(false); }} className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700">Fermer</button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nom complet *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm" placeholder="M. Konan Pierre" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm" placeholder="konan@educi.ci" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Téléphone</label>
                      <SmartPhoneInput value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} countryCode="CI" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Sexe</label>
                      <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm">
                        <option value="">Sélectionner</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Matière</label>
                    <select value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm">
                      <option value="">Aucune matière</option>
                      {subjectsList.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowCreate(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
                  <button onClick={handleCreate} disabled={actionLoading} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
                    {actionLoading ? 'Création...' : <><Check size={16} /> Créer</>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* SALARY MODAL */}
      {showSalary && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowSalary(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Gestion des salaires</h3>
                <p className="text-sm text-slate-500">{showSalary?.user?.name}</p>
              </div>
              <button onClick={() => setShowSalary(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>

            {/* Salary Configuration */}
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-on-surface mb-4 flex items-center gap-2">
                <DollarSign size={18} /> Configuration du salaire
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Salaire de base</label>
                  <input type="number" value={salaryForm.baseSalary} onChange={(e) => setSalaryForm({ ...salaryForm, baseSalary: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Allocations</label>
                  <input type="number" value={salaryForm.allowances} onChange={(e) => setSalaryForm({ ...salaryForm, allowances: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Déductions</label>
                  <input type="number" value={salaryForm.deductions} onChange={(e) => setSalaryForm({ ...salaryForm, deductions: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                </div>
              </div>
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg flex items-center justify-between">
                <span className="font-medium text-emerald-800">Salaire net:</span>
                <span className="text-2xl font-bold text-emerald-700">{formatCurrency(salaryForm.baseSalary + salaryForm.allowances - salaryForm.deductions)} FCFA</span>
              </div>
              <button onClick={handleSaveSalary} className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
                Enregistrer
              </button>
            </div>

            {/* Salary History */}
            <div>
              <h4 className="font-semibold text-on-surface mb-4 flex items-center gap-2">
                <Clock size={18} /> Historique des paiements
              </h4>
              <div className="space-y-3">
                {salaryHistory.map(salary => (
                  <div key={salary.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-on-surface">{salary.period}</p>
                        <p className="text-xs text-slate-500">Payé le {new Date(salary.paymentDate).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600">{formatCurrency(salary.netSalary)} FCFA</p>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          salary.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                          salary.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {salary.status === 'paid' ? <CheckCircle2 size={12} /> : salary.status === 'pending' ? <Clock size={12} /> : <XCircle size={12} />}
                          {salary.status === 'paid' ? 'Payé' : salary.status === 'pending' ? 'En attente' : 'Retardé'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-slate-500">
                      <span>Base: {formatCurrency(salary.baseSalary)}</span>
                      <span>+ Allocations: {formatCurrency(salary.allowances)}</span>
                      <span>- Déductions: {formatCurrency(salary.deductions)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LESSON PLAN MODAL */}
      {showLessonPlan && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowLessonPlan(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Plans de leçon</h3>
                <p className="text-sm text-slate-500">{showLessonPlan?.user?.name}</p>
              </div>
              <button onClick={() => setShowLessonPlan(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>

            {/* Add Lesson Plan Form */}
            <div className="bg-indigo-50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-on-surface mb-4 flex items-center gap-2">
                <PlusCircle size={18} /> Nouveau plan de leçon
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Matière</label>
                  <input value={lessonPlanForm.subjectName} onChange={(e) => setLessonPlanForm({ ...lessonPlanForm, subjectName: e.target.value })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" placeholder="Mathématiques" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Classe</label>
                  <input value={lessonPlanForm.className} onChange={(e) => setLessonPlanForm({ ...lessonPlanForm, className: e.target.value })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" placeholder="6ème A" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Sujet / Chapitre</label>
                  <input value={lessonPlanForm.topic} onChange={(e) => setLessonPlanForm({ ...lessonPlanForm, topic: e.target.value })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" placeholder="Équations du premier degré" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Durée (min)</label>
                  <input type="number" value={lessonPlanForm.duration} onChange={(e) => setLessonPlanForm({ ...lessonPlanForm, duration: parseInt(e.target.value) || 60 })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Date</label>
                  <input type="date" value={lessonPlanForm.date} onChange={(e) => setLessonPlanForm({ ...lessonPlanForm, date: e.target.value })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                </div>
              </div>
              <button onClick={handleAddLessonPlan} className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2">
                <PlusCircle size={16} /> Ajouter le plan
              </button>
            </div>

            {/* Lesson Plans List */}
            <div>
              <h4 className="font-semibold text-on-surface mb-4">Plans existants</h4>
              <div className="space-y-3">
                {lessonPlans.map(plan => (
                  <div key={plan.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-on-surface">{plan.topic}</p>
                        <p className="text-sm text-slate-500">{plan.subjectName} • {plan.className} • {new Date(plan.date).toLocaleDateString('fr-FR')}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">{plan.duration} min</span>
                          {plan.objectives.slice(0, 2).map((obj, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">{obj}</span>
                          ))}
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        plan.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                        plan.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                        plan.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {plan.status === 'approved' ? <CheckCircle2 size={12} /> :
                         plan.status === 'submitted' ? <Clock size={12} /> :
                         plan.status === 'rejected' ? <XCircle size={12} /> :
                         <Edit size={12} />}
                        {plan.status === 'approved' ? 'Approuvé' :
                         plan.status === 'submitted' ? 'Soumis' :
                         plan.status === 'rejected' ? 'Refusé' :
                         'Brouillon'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TIMETABLE MODAL */}
      {showTimetable && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowTimetable(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Emploi du temps</h3>
                <p className="text-sm text-slate-500">{showTimetable?.user?.name}</p>
              </div>
              <button onClick={() => setShowTimetable(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              {timetable.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-6">Aucun créneau assigné à cet enseignant</p>
              )}
              {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map(day => {
                const daySlots = timetable.filter(t => t.day === day);
                if (daySlots.length === 0) return null;
                return (
                  <div key={day}>
                    <h4 className="font-semibold text-on-surface mb-2 flex items-center gap-2">
                      <CalendarDays size={16} className="text-indigo-600" /> {day}
                    </h4>
                    <div className="space-y-2">
                      {daySlots.map((slot, i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-4">
                          <div className="text-sm font-medium text-indigo-600 w-24">{slot.time}</div>
                          <div className="flex-1">
                            <p className="font-medium text-on-surface">{slot.subject}</p>
                            <p className="text-xs text-slate-500">{slot.className}</p>
                          </div>
                          {slot.room && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">{slot.room}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Détails de l&apos;enseignant</h3>
              <button onClick={() => setShowPreview(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            
            <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
              <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-2xl">
                {getInitials(showPreview.user?.name || '?')}
              </div>
              <div>
                <p className="text-xl font-bold">{showPreview.user?.name}</p>
                <p className="text-sm text-slate-500">{showPreview.user?.email}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold mt-2 ${
                  showPreview.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {showPreview.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase">Téléphone</p>
                <p className="text-sm font-bold mt-1">{showPreview.phone || '-'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase">Matière</p>
                <p className="text-sm font-bold mt-1">{showPreview.subject?.name || '-'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase">Salaire</p>
                <p className="text-sm font-bold mt-1 text-emerald-600">{formatCurrency(showPreview.salary || 0)} FCFA</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase">Retards</p>
                <p className="text-sm font-bold mt-1">{showPreview.lateCount || 0}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setShowPreview(null); openSalary(showPreview); }} className="flex-1 py-3 bg-emerald-50 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-100 flex items-center justify-center gap-2">
                <DollarSign size={16} /> Salaire
              </button>
              <button onClick={() => { setShowPreview(null); openLessonPlan(showPreview); }} className="flex-1 py-3 bg-purple-50 text-purple-600 font-semibold rounded-xl hover:bg-purple-100 flex items-center justify-center gap-2">
                <BookOpen size={16} /> Plans
              </button>
              <button onClick={() => { setShowPreview(null); openTimetable(showPreview); }} className="flex-1 py-3 bg-blue-50 text-blue-600 font-semibold rounded-xl hover:bg-blue-100 flex items-center justify-center gap-2">
                <CalendarDays size={16} /> Emploi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowEdit(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Modifier l&apos;enseignant</h3>
              <button onClick={() => setShowEdit(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nom</label>
                <input value={showEdit.user?.name || ''} disabled className="w-full px-4 py-3 bg-slate-100 rounded-xl text-sm text-slate-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Téléphone</label>
                <SmartPhoneInput value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} countryCode="CI" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowEdit(null)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleEdit} disabled={actionLoading} className="flex-1 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 disabled:opacity-50 flex items-center justify-center gap-2">
                {actionLoading ? 'Modification...' : <><Check size={16} /> Enregistrer</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowDelete(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"><Trash2 size={24} className="text-red-500" /></div>
              <div>
                <h3 className="text-lg font-bold">Supprimer l&apos;enseignant</h3>
                <p className="text-sm text-slate-500">Cette action est irréversible.</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Êtes-vous sûr de vouloir supprimer <strong>{showDelete.user?.name}</strong> ?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDelete(null)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleDelete} disabled={actionLoading} className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 disabled:opacity-50">
                {actionLoading ? 'Suppression...' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMPORT MODAL */}
      {showImport && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowImport(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Import massif d&apos;enseignants</h3>
              <button onClick={() => setShowImport(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Fichier Excel/CSV</label>
                <input type="file" accept=".xlsx,.xls,.csv" className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm" />
                <p className="text-xs text-slate-500 mt-1">Formats: .xlsx, .xls, .csv (max 10MB)</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowImport(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={async () => {
                const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                const file = fileInput?.files?.[0];
                if (!file) { showToast('Veuillez sélectionner un fichier', 'error'); return; }
                setActionLoading(true);
                try {
                  const validation = await api.validateTeacherImportFile(file);
                  const validRows = (validation.rows || validation).filter((r: any) => r.valid !== false);
                  if (validRows.length === 0) { showToast('Aucune ligne valide dans le fichier', 'error'); setActionLoading(false); return; }
                  const result = await api.confirmTeacherImport(validRows);
                  showToast(`Import réussi : ${result.teachersCreated || validRows.length} enseignants créés`, 'success');
                  setShowImport(false);
                  loadTeachers();
                } catch (e: any) { showToast(e.message || 'Erreur lors de l\'import', 'error'); }
                finally { setActionLoading(false); }
              }} disabled={actionLoading} className="flex-1 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2">
                {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <><UploadCloud size={16} /> Importer</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT MODAL */}
      {showExport && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowExport(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Exporter les données enseignants</h3>
              <button onClick={() => setShowExport(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Format</label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:bg-slate-50">
                    <input type="radio" value="excel" checked className="h-4 w-4 text-indigo-600" />
                    <FileSpreadsheet size={20} className="text-emerald-600" />
                    <span className="text-sm">Excel (.xlsx)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:bg-slate-50">
                    <input type="radio" value="pdf" className="h-4 w-4 text-indigo-600" />
                    <FileText size={20} className="text-red-600" />
                    <span className="text-sm">PDF</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowExport(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={() => {
                const columns: ExportColumn[] = [
                  { header: 'Nom', key: 'name', width: 24 },
                  { header: 'Email', key: 'email', width: 28 },
                  { header: 'Téléphone', key: 'phone', width: 16 },
                  { header: 'Matière', key: 'subject', width: 20 },
                  { header: 'Statut', key: 'status', width: 12 },
                ];
                const data = (teachers || []).map((t: any) => ({
                  name: t.user?.name || t.name || '',
                  email: t.user?.email || t.email || '',
                  phone: t.phone || t.user?.phone || '',
                  subject: t.subject?.name || '',
                  status: t.user?.isActive ? 'Actif' : 'Inactif',
                }));
                exportToFile(data, columns, `enseignants_export_${new Date().toISOString().split('T')[0]}`, form.exportFormat === 'pdf' ? 'pdf' : 'excel', { title: 'Liste des Enseignants', subtitle: `${(teachers || []).length} enseignants — Année scolaire 2025 — 2026` }, exportBranding);
                setShowExport(false);
              }} className="flex-1 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 flex items-center justify-center gap-2">
                <DownloadCloud size={16} /> Exporter
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
