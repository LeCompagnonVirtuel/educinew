'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbClasses, sbSubjects, sbTeachers } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { exportToFile, type ExportColumn } from '@/lib/export-utils';
import { useExportBranding } from '@/hooks/useExportBranding';
import {
  GraduationCap, Users, TrendingUp, Plus, Eye, Edit, Trash2, X, Check,
  BookOpen, User, Search, Calendar, BarChart3, Copy, ArrowRightLeft,
  ChevronDown, Clock, FileText, AlertTriangle, Download, MapPin,
  Layers, GitMerge, Printer, LayoutGrid
} from 'lucide-react';

export default function ClassesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const exportBranding = useExportBranding();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    level: '',
    stream: '',
    academicYear: ''
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [classesPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(1);

  // Modals
  const [showCreate, setShowCreate] = useState(false);
  const [showPreview, setShowPreview] = useState<any>(null);
  const [showEdit, setShowEdit] = useState<any>(null);
  const [showDelete, setShowDelete] = useState<any>(null);
  const [showAssign, setShowAssign] = useState<any>(null);
  const [showTimetable, setShowTimetable] = useState<any>(null);
  const [showRoomAssignment, setShowRoomAssignment] = useState<any>(null);
  const [showSubjectManagement, setShowSubjectManagement] = useState<any>(null);
  const [showMerge, setShowMerge] = useState<any>(null);
  const [showExport, setShowExport] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Form state
  const [form, setForm] = useState({ 
    name: '', 
    level: '', 
    stream: '',
    capacity: 45,
    academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    mainTeacherId: ''
  });

  // Room assignment state
  const [roomForm, setRoomForm] = useState({
    roomId: '',
    dayOfWeek: 'MONDAY',
    startTime: '08:00',
    endTime: '09:00'
  });
  const [classRooms, setClassRooms] = useState<any[]>([]);
  const [assignedRooms, setAssignedRooms] = useState<any[]>([]);

  // Subject management state
  const [subjectForm, setSubjectForm] = useState({
    subjectId: '',
    teacherId: '',
    hoursPerWeek: 2
  });
  const [availableSubjects, setAvailableSubjects] = useState<any[]>([]);
  const [classSubjects, setClassSubjects] = useState<any[]>([]);

  // Timetable state
  const [weekDays] = useState(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']);
  const [dayLabels] = useState({ MONDAY: 'Lundi', TUESDAY: 'Mardi', WEDNESDAY: 'Mercredi', THURSDAY: 'Jeudi', FRIDAY: 'Vendredi', SATURDAY: 'Samedi' });
  const [timetableSlots, setTimetableSlots] = useState<any[]>([]);
  const [timeSlots] = useState(['07:30', '08:30', '09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30']);
  const [newSlotForm, setNewSlotForm] = useState({ dayOfWeek: 'MONDAY', startTime: '08:00', endTime: '09:00', subjectId: '', teacherId: '', roomId: '' });

  // Merge state
  const [mergeTarget, setMergeTarget] = useState('');
  const [mergeMode, setMergeMode] = useState<'move' | 'merge'>('move');

  // Teachers list
  const [teachersList, setTeachersList] = useState<any[]>([]);

  // Analytics
  const [analytics, setAnalytics] = useState({
    totalClasses: 0,
    totalStudents: 0,
    avgClassSize: 0,
    byLevel: [],
    byStream: [],
    performanceByClass: []
  });

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000);
  };

  const loadClasses = async () => {
    if (!user?.schoolId) return;
    setLoading(true);
    try {
      const [classesData, analyticsData] = await Promise.all([
        sbClasses.listWithPagination(search, { level: filters.level, stream: filters.stream }, currentPage),
        sbClasses.getAnalytics(user.schoolId)
      ]);
      
      setClasses(classesData.data || []);
      setTotalPages(classesData.totalPages || 1);
      setAnalytics(analyticsData as any || {
        totalClasses: 0,
        totalStudents: 0,
        avgClassSize: 0,
        byLevel: [],
        byStream: [],
        performanceByClass: []
      });
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.schoolId) loadClasses();
  }, [user?.schoolId, search, filters, currentPage]);

  useEffect(() => {
    if (!user?.schoolId) return;
    async function loadDropdowns() {
      try {
        const [subjects, teachers] = await Promise.all([
          sbSubjects.list(user!.schoolId),
          sbTeachers.list(user!.schoolId),
        ]);
        setAvailableSubjects((subjects || []).map((s: any) => ({ id: s.id, name: s.name, code: s.code || '' })));
        setTeachersList((teachers || []).map((t: any) => ({ id: t.id, name: t.user?.name || `${t.firstName || ''} ${t.lastName || ''}`.trim() || 'Enseignant', subject: t.subject?.name || '' })));
      } catch {}
    }
    loadDropdowns();
  }, [user?.schoolId]);

  const filteredClasses = classes.filter((cls) =>
    cls.name?.toLowerCase().includes(search.toLowerCase()) ||
    cls.level?.toLowerCase().includes(search.toLowerCase())
  );

  // Group classes by level
  const groupedByLevel = filteredClasses.reduce((acc: any, cls) => {
    const level = cls.level || 'Non classé';
    if (!acc[level]) acc[level] = [];
    acc[level].push(cls);
    return acc;
  }, {});

  const handleCreate = async () => {
    if (!form.name) { showToast('Nom de classe requis', 'error'); return; }
    setActionLoading(true);
    try {
      await sbClasses.create({
        name: form.name,
        level: form.level || form.name,
        capacity: form.capacity || 45,
        school_id: user?.schoolId,
      });
      showToast('Classe créée avec succès');
      setShowCreate(false);
      setForm({ name: '', level: '', stream: '', capacity: 45, academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`, mainTeacherId: '' });
      loadClasses();
    } catch (e: any) { showToast(e.message, 'error'); }
    finally { setActionLoading(false); }
  };

  const handleEdit = async () => {
    if (!showEdit) return;
    setActionLoading(true);
    try {
      await sbClasses.update(showEdit.id, {
        name: form.name,
        level: form.level,
        capacity: form.capacity,
      });
      showToast('Classe modifiée avec succès');
      setShowEdit(null);
      loadClasses();
    } catch (e: any) { showToast(e.message, 'error'); }
    finally { setActionLoading(false); }
  };

  const handleDelete = async () => {
    if (!showDelete) return;
    setActionLoading(true);
    try {
      await sbClasses.remove(showDelete.id);
      showToast('Classe supprimée avec succès');
      setShowDelete(null);
      loadClasses();
    } catch (e: any) { showToast(e.message, 'error'); }
    finally { setActionLoading(false); }
  };

  const handleDuplicate = async (cls: any) => {
    setActionLoading(true);
    try {
      await sbClasses.create({
        name: `${cls.name} (copie)`,
        level: cls.level,
        stream: cls.stream,
        capacity: cls.capacity,
        school_id: user?.schoolId
      });
      showToast('Classe dupliquée avec succès');
      loadClasses();
    } catch (e: any) { showToast(e.message, 'error'); }
    finally { setActionLoading(false); }
  };

  const openEdit = (cls: any) => {
    setForm({ 
      name: cls.name || '', 
      level: cls.level || '', 
      stream: cls.stream || '',
      capacity: cls.capacity || 45,
      academicYear: cls.academicYear?.name || `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
      mainTeacherId: cls.mainTeacherId || ''
    });
    setShowEdit(cls);
  };

  // Row action handlers
  const handleViewStudents = (cls: any) => {
    router.push(`/students?classId=${cls.id}`);
  };

  const handleViewSchedule = async (cls: any) => {
    setShowTimetable(cls);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      const { data } = await supabase
        .from('timetable_slots')
        .select('id, day_of_week, start_time, end_time, subject:subjects(name), teacher:teachers(user:users(name)), room:rooms(name)')
        .eq('class_id', cls.id)
        .order('start_time');
      setTimetableSlots((data || []).map((s: any) => ({
        id: s.id,
        dayOfWeek: s.day_of_week ?? s.dayOfWeek,
        startTime: s.start_time || s.startTime,
        endTime: s.end_time || s.endTime,
        subject: s.subject?.name || '—',
        teacher: s.teacher?.user?.name || '—',
        room: s.room?.name || 'Non assigné',
      })));
    } catch {
      setTimetableSlots([]);
    }
  };

  const handleAddTimetableSlot = async () => {
    if (!newSlotForm.subjectId || !newSlotForm.teacherId) {
      showToast('Veuillez sélectionner une matière et un enseignant', 'error');
      return;
    }
    if (!showTimetable?.id) return;
    setActionLoading(true);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      const dayMap: Record<string, number> = { MONDAY: 1, TUESDAY: 2, WEDNESDAY: 3, THURSDAY: 4, FRIDAY: 5, SATURDAY: 6 };
      const { data: inserted, error } = await supabase
        .from('timetable_slots')
        .insert({
          class_id: showTimetable.id,
          subject_id: newSlotForm.subjectId,
          teacher_id: newSlotForm.teacherId,
          day_of_week: dayMap[newSlotForm.dayOfWeek] || 1,
          start_time: newSlotForm.startTime,
          end_time: newSlotForm.endTime,
          room: newSlotForm.roomId || null,
          school_id: user?.schoolId,
        })
        .select('id, day_of_week, start_time, end_time, subject:subjects(name), teacher:teachers(user:users(name)), room')
        .single();
      if (error) throw error;
      const subject = availableSubjects.find(s => s.id === newSlotForm.subjectId);
      const teacher = teachersList.find(t => t.id === newSlotForm.teacherId);
      setTimetableSlots([...timetableSlots, {
        id: inserted.id,
        dayOfWeek: inserted.day_of_week,
        startTime: inserted.start_time,
        endTime: inserted.end_time,
        subject: inserted.subject?.name || subject?.name || '—',
        teacher: inserted.teacher?.user?.name || teacher?.name || '—',
        room: inserted.room || 'Non assigné',
      }]);
      setNewSlotForm({ dayOfWeek: 'MONDAY', startTime: '08:00', endTime: '09:00', subjectId: '', teacherId: '', roomId: '' });
      showToast('Créneau ajouté avec succès');
    } catch (e: any) {
      showToast(e.message || 'Erreur lors de l\'ajout', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveTimetableSlot = async (slotId: number) => {
    setActionLoading(true);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      const { error } = await supabase.from('timetable_slots').delete().eq('id', String(slotId));
      if (error) throw error;
      setTimetableSlots(timetableSlots.filter(s => s.id !== slotId));
      showToast('Créneau supprimé');
    } catch (e: any) {
      showToast(e.message || 'Erreur lors de la suppression', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenRoomAssignment = async (cls: any) => {
    setShowRoomAssignment(cls);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      const { data } = await supabase
        .from('room_assignments')
        .select('id, room_id, day_of_week, start_time, end_time, room:rooms(name, building)')
        .eq('class_id', cls.id);
      setAssignedRooms((data || []).map((r: any) => ({
        id: r.id,
        roomId: r.room_id,
        dayOfWeek: r.day_of_week ?? r.dayOfWeek,
        startTime: r.start_time || r.startTime,
        endTime: r.end_time || r.endTime,
        roomName: r.room?.name || '—',
        building: r.room?.building || '—',
      })));
    } catch {
      setAssignedRooms([]);
    }
  };

  const handleAssignRoom = async () => {
    if (!roomForm.roomId) {
      showToast('Veuillez sélectionner une salle', 'error');
      return;
    }
    if (!showRoomAssignment?.id) return;
    setActionLoading(true);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      const { data: inserted, error } = await supabase
        .from('room_assignments')
        .insert({
          class_id: showRoomAssignment.id,
          room_id: roomForm.roomId,
          day_of_week: roomForm.dayOfWeek,
          start_time: roomForm.startTime,
          end_time: roomForm.endTime,
        })
        .select('id, room_id, day_of_week, start_time, end_time, room:rooms(name, building)')
        .single();
      if (error) throw error;
      const room = classRooms.find(r => r.id === roomForm.roomId);
      setAssignedRooms([...assignedRooms, {
        id: inserted.id,
        roomId: inserted.room_id,
        dayOfWeek: inserted.day_of_week,
        startTime: inserted.start_time,
        endTime: inserted.end_time,
        roomName: inserted.room?.name || room?.name || '—',
        building: inserted.room?.building || room?.building || '—',
      }]);
      setRoomForm({ roomId: '', dayOfWeek: 'MONDAY', startTime: '08:00', endTime: '09:00' });
      showToast('Salle assignée avec succès');
    } catch (e: any) {
      showToast(e.message || 'Erreur lors de l\'assignation', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveRoomAssignment = async (assignmentId: number) => {
    setActionLoading(true);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      const { error } = await supabase.from('room_assignments').delete().eq('id', String(assignmentId));
      if (error) throw error;
      setAssignedRooms(assignedRooms.filter(r => r.id !== assignmentId));
      showToast('Assignation supprimée');
    } catch (e: any) {
      showToast(e.message || 'Erreur lors de la suppression', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenSubjectManagement = async (cls: any) => {
    setShowSubjectManagement(cls);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      const { data } = await supabase
        .from('class_subjects')
        .select('id, hours_per_week, subject:subjects(id, name), teacher:teachers(id, user:users(name))')
        .eq('class_id', cls.id);
      setClassSubjects((data || []).map((cs: any) => ({
        id: cs.id,
        subject: cs.subject,
        teacher: cs.teacher ? { id: cs.teacher.id, name: cs.teacher.user?.name || '—' } : null,
        hoursPerWeek: cs.hours_per_week || 2,
      })));
    } catch {
      setClassSubjects([]);
    }
  };

  const handleAddSubject = async () => {
    if (!subjectForm.subjectId || !subjectForm.teacherId) {
      showToast('Veuillez sélectionner une matière et un enseignant', 'error');
      return;
    }
    if (!showSubjectManagement?.id) return;
    setActionLoading(true);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      const { data: inserted, error } = await supabase
        .from('class_subjects')
        .insert({
          class_id: showSubjectManagement.id,
          subject_id: subjectForm.subjectId,
          teacher_id: subjectForm.teacherId,
          hours_per_week: subjectForm.hoursPerWeek,
        })
        .select('id, hours_per_week, subject:subjects(id, name), teacher:teachers(id, user:users(name))')
        .single();
      if (error) throw error;
      const subject = availableSubjects.find(s => s.id === subjectForm.subjectId);
      const teacher = teachersList.find(t => t.id === subjectForm.teacherId);
      setClassSubjects([...classSubjects, {
        id: inserted.id,
        subject: inserted.subject || subject,
        teacher: inserted.teacher ? { id: inserted.teacher.id, name: inserted.teacher.user?.name } : teacher,
        hoursPerWeek: subjectForm.hoursPerWeek,
      }]);
      setSubjectForm({ subjectId: '', teacherId: '', hoursPerWeek: 2 });
      showToast('Matière ajoutée avec succès');
    } catch (e: any) {
      showToast(e.message || 'Erreur lors de l\'ajout', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveSubject = async (subjectId: number) => {
    setActionLoading(true);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      const { error } = await supabase.from('class_subjects').delete().eq('id', subjectId);
      if (error) throw error;
      setClassSubjects(classSubjects.filter(s => s.id !== subjectId));
      showToast('Matière supprimée');
    } catch (e: any) {
      showToast(e.message || 'Erreur lors de la suppression', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleMergeClasses = async () => {
    if (!mergeTarget) {
      showToast('Veuillez sélectionner une classe cible', 'error');
      return;
    }
    if (!showMerge?.id) return;
    setActionLoading(true);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      const { error } = await supabase
        .from('students')
        .update({ class_id: mergeTarget })
        .eq('class_id', showMerge.id);
      if (error) throw error;
      showToast('Élèves déplacés vers la classe cible');
      setShowMerge(null);
      setMergeTarget('');
      loadClasses();
    } catch (e: any) {
      showToast(e.message || 'Erreur lors du déplacement', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportClasses = (format: string) => {
    const columns: ExportColumn[] = [
      { header: 'Nom', key: 'name', width: 24 },
      { header: 'Niveau', key: 'level', width: 16 },
      { header: 'Section', key: 'section', width: 14 },
      { header: 'Effectif', key: 'studentCount', width: 12 },
      { header: 'Professeur principal', key: 'teacherName', width: 24 },
      { header: 'Salle', key: 'room', width: 12 },
    ];
    const data = filteredClasses.map((cls: any) => ({
      name: cls.name || '',
      level: cls.level || '',
      section: cls.section || '',
      studentCount: cls.studentCount ?? cls.students_count ?? '',
      teacherName: cls.teacher?.user?.name || cls.teacherName || '',
      room: cls.room || '',
    }));
    const exportFormat = format === 'PDF' ? 'pdf' : format === 'CSV' ? 'csv' : 'excel';
    exportToFile(data, columns, `classes_${new Date().toISOString().split('T')[0]}`, exportFormat, { title: 'Liste des Classes', subtitle: `${filteredClasses.length} classes — Année scolaire ${new Date().getFullYear()} — ${new Date().getFullYear() + 1}` }, exportBranding);
    showToast(`Export ${format} généré avec succès`);
    setShowExport(false);
  };

  const handlePrintTimetable = () => {
    window.print();
    showToast('Impression lancée');
  };

  const handleViewGrades = (cls: any) => {
    router.push(`/grades?classId=${cls.id}`);
  };

  const handleViewAttendance = (cls: any) => {
    showToast(`Présences de ${cls.name}`, 'success');
  };

  const [assignForm, setAssignForm] = useState({ subjectId: '', teacherId: '' });

  const handleAssignTeacher = async () => {
    if (!showAssign || !assignForm.subjectId || !assignForm.teacherId) {
      showToast('Veuillez sélectionner une matière et un enseignant', 'error');
      return;
    }
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      const { error } = await supabase
        .from('class_subjects')
        .upsert({
          class_id: showAssign.id,
          subject_id: assignForm.subjectId,
          teacher_id: assignForm.teacherId,
        }, { onConflict: 'class_id,subject_id' });
      if (error) throw error;
      showToast('Enseignant assigné avec succès');
      setShowAssign(null);
      setAssignForm({ subjectId: '', teacherId: '' });
    } catch (err: any) {
      showToast(err.message || 'Erreur lors de l\'assignation', 'error');
    }
  };

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Gestion' }, { label: 'Classes' }]}>
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase mb-2 block">Gestion des classes</span>
          <h2 className="text-4xl font-bold tracking-tight text-on-surface">Gestion des classes</h2>
          <p className="text-on-surface-variant mt-2">{analytics.totalClasses} classes • {analytics.totalStudents} élèves</p>
        </div>
        {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
          <div className="flex items-center gap-3">
            <button onClick={() => setShowExport(true)} className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-3 rounded-full border border-slate-200 flex items-center gap-2 shadow-sm active:scale-95 transition-all">
              <Download size={18} /><span className="font-semibold text-sm">Exporter</span>
            </button>
            <button onClick={() => setShowCreate(true)} className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all">
              <Plus size={18} /><span className="font-semibold text-sm">Créer une classe</span>
            </button>
          </div>
        )}
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
                placeholder="Nom de la classe..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" 
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Niveau</label>
            <select
              value={filters.level}
              onChange={(e) => setFilters({ ...filters, level: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Tous les niveaux</option>
              <option value="6ème">6ème</option>
              <option value="5ème">5ème</option>
              <option value="4ème">4ème</option>
              <option value="3ème">3ème</option>
              <option value="2nde">2nde</option>
              <option value="1ère">1ère</option>
              <option value="Tle">Terminale</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Filière</label>
            <select
              value={filters.stream}
              onChange={(e) => setFilters({ ...filters, stream: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Toutes les filières</option>
              <option value=" Générale">Générale</option>
              <option value="Scientifique">Scientifique</option>
              <option value="Littéraire">Littéraire</option>
              <option value="Technique">Technique</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Année scolaire</label>
            <select
              value={filters.academicYear}
              onChange={(e) => setFilters({ ...filters, academicYear: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">{new Date().getFullYear()}-{new Date().getFullYear() + 1}</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <GraduationCap size={24} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Total classes</p>
              <p className="text-2xl font-bold">{analytics.totalClasses}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Total élèves</p>
              <p className="text-2xl font-bold">{analytics.totalStudents}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <TrendingUp size={24} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Moyenne générale</p>
              <p className="text-2xl font-bold">{analytics.avgClassSize}/20</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <BarChart3 size={24} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Taille moyenne</p>
              <p className="text-2xl font-bold">{analytics.avgClassSize}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Classes by Level */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Chargement...</div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedByLevel).map(([level, levelClasses]: [string, any]) => (
            <div key={level}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <GraduationCap size={20} className="text-indigo-600" />
                  Niveau {level}
                  <span className="text-sm font-normal text-slate-500">({levelClasses.length} classe{levelClasses.length > 1 ? 's' : ''})</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {levelClasses.map((cls: any) => (
                  <div key={cls.id} className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/30 rounded-bl-full -mr-6 -mt-6 group-hover:scale-110 transition-transform duration-500" />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-indigo-600/60 mb-1 block">{cls.stream || 'General'}</span>
                          <h4 className="text-xl font-bold text-slate-900">{cls.name}</h4>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => setShowPreview(cls)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-colors" title="Voir détails">
                            <Eye size={14} />
                          </button>
                          {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
                            <>
                              <button onClick={() => openEdit(cls)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-amber-50 hover:text-amber-600 transition-colors" title="Modifier">
                                <Edit size={14} />
                              </button>
                              <button onClick={() => setShowDelete(cls)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors" title="Supprimer">
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-[0.65rem] text-slate-500 uppercase font-semibold">Élèves</p>
                          <p className="text-lg font-bold flex items-center gap-1">
                            <Users size={14} />{cls._count?.students || 0} / {cls.capacity || 45}
                          </p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-[0.65rem] text-slate-500 uppercase font-semibold">Moyenne</p>
                          <p className="text-lg font-bold text-emerald-600 flex items-center gap-1">
                            <TrendingUp size={14} />{cls.averageGrade || '—'}/20
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <User size={12} />{cls.mainTeacher?.user?.name || 'Non assigné'}
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                          Actif
                        </span>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                        <button onClick={() => handleViewStudents(cls)} className="px-2 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors flex items-center justify-center gap-1">
                          <Users size={12} />Élèves
                        </button>
                        <button onClick={() => handleViewSchedule(cls)} className="px-2 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors flex items-center justify-center gap-1">
                          <Calendar size={12} />Emploi
                        </button>
                        <button onClick={() => handleViewGrades(cls)} className="px-2 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors flex items-center justify-center gap-1">
                          <BarChart3 size={12} />Notes
                        </button>
                        <button onClick={() => handleOpenSubjectManagement(cls)} className="px-2 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors flex items-center justify-center gap-1" title="Matières">
                          <BookOpen size={12} />Matières
                        </button>
                        {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
                          <>
                            <button onClick={() => handleOpenRoomAssignment(cls)} className="px-2 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors flex items-center justify-center gap-1" title="Salles">
                              <MapPin size={12} />Salle
                            </button>
                            <button onClick={() => setShowAssign(cls)} className="px-2 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors flex items-center justify-center gap-1" title="Assigner prof">
                              <User size={12} />+
                            </button>
                            <button onClick={() => setShowMerge(cls)} className="px-2 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors flex items-center justify-center gap-1" title="Fusionner">
                              <GitMerge size={12} />
                            </button>
                            <button onClick={() => handleDuplicate(cls)} className="px-2 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors flex items-center justify-center gap-1" title="Dupliquer">
                              <Copy size={12} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-50 hover:bg-slate-50"
          >
            Précédent
          </button>
          <span className="px-4 py-2">
            Page {currentPage} / {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-50 hover:bg-slate-50"
          >
            Suivant
          </button>
        </div>
      )}

      {/* CREATE MODAL */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Créer une classe</h3>
              <button onClick={() => setShowCreate(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nom de la classe *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm" placeholder="6ème A" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Niveau *</label>
                  <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm">
                    <option value="">Sélectionner</option>
                    <option value="6ème">6ème</option>
                    <option value="5ème">5ème</option>
                    <option value="4ème">4ème</option>
                    <option value="3ème">3ème</option>
                    <option value="2nde">2nde</option>
                    <option value="1ère">1ère</option>
                    <option value="Tle">Terminale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Filière</label>
                  <select value={form.stream} onChange={(e) => setForm({ ...form, stream: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm">
                    <option value="">Aucune</option>
                    <option value="Générale">Générale</option>
                    <option value="Scientifique">Scientifique</option>
                    <option value="Littéraire">Littéraire</option>
                    <option value="Technique">Technique</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Capacité</label>
                  <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) || 45 })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Année scolaire</label>
                  <select value={form.academicYear} onChange={(e) => setForm({ ...form, academicYear: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm">
                    <option value={`${new Date().getFullYear()}-${new Date().getFullYear() + 1}`}>{new Date().getFullYear()}-{new Date().getFullYear() + 1}</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreate(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleCreate} disabled={actionLoading} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {actionLoading ? 'Création...' : <><Check size={16} /> Créer</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL - Detailed Class View */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Détails de la classe</h3>
              <button onClick={() => setShowPreview(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>

            {/* Class Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 text-white mb-6">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-indigo-200 mb-1 block">{showPreview.stream || 'Classe générale'}</span>
              <h4 className="text-2xl font-bold">{showPreview.name}</h4>
              <p className="text-indigo-200 mt-1">Niveau {showPreview.level}</p>
            </div>

            {/* General Info */}
            <div className="mb-6">
              <h5 className="text-sm font-bold text-slate-500 uppercase mb-3">Informations générales</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[0.65rem] text-slate-500 uppercase font-semibold">Année scolaire</p>
                  <p className="text-sm font-bold mt-1">{showPreview.academicYear?.name || `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[0.65rem] text-slate-500 uppercase font-semibold">Capacité</p>
                  <p className="text-sm font-bold mt-1">{showPreview.capacity || 45} places</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[0.65rem] text-slate-500 uppercase font-semibold">Enseignant principal</p>
                  <p className="text-sm font-bold mt-1">{showPreview.mainTeacher?.user?.name || 'Non assigné'}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[0.65rem] text-slate-500 uppercase font-semibold">Statut</p>
                  <p className="text-sm font-bold mt-1 text-emerald-600">Actif</p>
                </div>
              </div>
            </div>

            {/* Students */}
            <div className="mb-6">
              <h5 className="text-sm font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                <Users size={16} /> Élèves ({showPreview._count?.students || 0})
              </h5>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Effectif actuel</span>
                  <span className="text-sm font-bold">{showPreview._count?.students || 0} / {showPreview.capacity || 45}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full transition-all" 
                    style={{ width: `${Math.min(100, ((showPreview._count?.students || 0) / (showPreview.capacity || 45)) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Academic Performance */}
            <div className="mb-6">
              <h5 className="text-sm font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                <TrendingUp size={16} /> Performance académique
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-[0.65rem] text-slate-500 uppercase font-semibold">Moyenne</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{showPreview.averageGrade || '—'}/20</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-[0.65rem] text-slate-500 uppercase font-semibold">Taux réussite</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{showPreview.successRate || '—'}%</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-[0.65rem] text-slate-500 uppercase font-semibold">Présence</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">{showPreview.attendanceRate || '—'}%</p>
                </div>
              </div>
            </div>

            {/* Teachers */}
            <div className="mb-6">
              <h5 className="text-sm font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                <User size={16} /> Enseignants ({showPreview._count?.classSubjects || 0})
              </h5>
              <div className="bg-slate-50 rounded-xl p-4">
                {showPreview.teachers?.map((teacher: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                      {teacher.user?.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{teacher.user?.name}</p>
                      <p className="text-xs text-slate-500">{teacher.subject?.name}</p>
                    </div>
                  </div>
                )) || <p className="text-sm text-slate-500">Aucun enseignant assigné</p>}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <button onClick={() => handleViewStudents(showPreview)} className="flex-1 py-3 bg-indigo-50 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-100 flex items-center justify-center gap-2">
                <Users size={16} /> Voir élèves
              </button>
              <button onClick={() => handleViewSchedule(showPreview)} className="flex-1 py-3 bg-purple-50 text-purple-600 font-semibold rounded-xl hover:bg-purple-100 flex items-center justify-center gap-2">
                <Calendar size={16} /> Emploi du temps
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
              <h3 className="text-xl font-bold">Modifier la classe</h3>
              <button onClick={() => setShowEdit(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nom</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Niveau</label>
                  <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm">
                    <option value="">Sélectionner</option>
                    <option value="6ème">6ème</option>
                    <option value="5ème">5ème</option>
                    <option value="4ème">4ème</option>
                    <option value="3ème">3ème</option>
                    <option value="2nde">2nde</option>
                    <option value="1ère">1ère</option>
                    <option value="Tle">Terminale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Capacité</label>
                  <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) || 45 })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm" />
                </div>
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
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle size={24} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Supprimer la classe</h3>
                <p className="text-sm text-slate-500">Cette action est irréversible.</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Êtes-vous sûr de vouloir supprimer la classe <strong>{showDelete.name}</strong> ? 
              Tous les élèves et enseignants assignés seront désaffectés.
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

      {/* TIMETABLE MODAL */}
      {showTimetable && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowTimetable(null)}>
          <div className="bg-white rounded-2xl w-full max-w-5xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Emploi du temps</h3>
                <p className="text-sm text-slate-500">{showTimetable.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handlePrintTimetable} className="p-2 hover:bg-slate-100 rounded-lg" title="Imprimer"><Printer size={20} /></button>
                <button onClick={() => setShowTimetable(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
              </div>
            </div>

            {/* Add new slot form */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-bold text-slate-600 mb-3">Ajouter un créneau</h4>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                <select value={newSlotForm.dayOfWeek} onChange={(e) => setNewSlotForm({ ...newSlotForm, dayOfWeek: e.target.value })} className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm">
                  {Object.entries(dayLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <select value={newSlotForm.startTime} onChange={(e) => setNewSlotForm({ ...newSlotForm, startTime: e.target.value })} className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm">
                  {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <select value={newSlotForm.endTime} onChange={(e) => setNewSlotForm({ ...newSlotForm, endTime: e.target.value })} className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm">
                  {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <select value={newSlotForm.subjectId} onChange={(e) => setNewSlotForm({ ...newSlotForm, subjectId: e.target.value })} className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm">
                  <option value="">Matière</option>
                  {availableSubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <select value={newSlotForm.teacherId} onChange={(e) => setNewSlotForm({ ...newSlotForm, teacherId: e.target.value })} className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm">
                  <option value="">Professeur</option>
                  {teachersList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                <select value={newSlotForm.roomId} onChange={(e) => setNewSlotForm({ ...newSlotForm, roomId: e.target.value })} className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm">
                  <option value="">Salle</option>
                  {classRooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
                <div className="md:col-span-6 flex justify-end">
                  <button onClick={handleAddTimetableSlot} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>

            {/* Timetable Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="px-3 py-2 text-left font-bold text-slate-600">Horaire</th>
                    {Object.entries(dayLabels).map(([key, label]) => (
                      <th key={key} className="px-3 py-2 text-center font-bold text-slate-600 min-w-[150px]">{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time, idx) => (
                    <tr key={time} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-3 py-2 font-semibold text-slate-600">{time} - {timeSlots[idx + 1] || ''}</td>
                      {weekDays.map(day => {
                        const slot = timetableSlots.find(s => s.dayOfWeek === day && s.startTime === time);
                        return (
                          <td key={day} className="px-2 py-2 min-w-[150px]">
                            {slot ? (
                              <div className="bg-indigo-100 border border-indigo-200 rounded-lg p-2 relative group">
                                <button onClick={() => handleRemoveTimetableSlot(slot.id)} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <X size={8} />
                                </button>
                                <p className="font-semibold text-indigo-700 text-xs">{slot.subject}</p>
                                <p className="text-[10px] text-slate-500">{slot.teacher}</p>
                                <p className="text-[10px] text-slate-400">{slot.room}</p>
                              </div>
                            ) : (
                              <div className="h-full min-h-[60px] border border-dashed border-slate-200 rounded-lg"></div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ROOM ASSIGNMENT MODAL */}
      {showRoomAssignment && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowRoomAssignment(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Assignation des salles</h3>
                <p className="text-sm text-slate-500">{showRoomAssignment.name}</p>
              </div>
              <button onClick={() => setShowRoomAssignment(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>

            {/* Add room form */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-bold text-slate-600 mb-3">Assigner une salle</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Salle</label>
                  <select value={roomForm.roomId} onChange={(e) => setRoomForm({ ...roomForm, roomId: e.target.value })} className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm">
                    <option value="">Sélectionner</option>
                    {classRooms.map(r => <option key={r.id} value={r.id}>{r.name} ({r.building})</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Jour</label>
                  <select value={roomForm.dayOfWeek} onChange={(e) => setRoomForm({ ...roomForm, dayOfWeek: e.target.value })} className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm">
                    {Object.entries(dayLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Heure début</label>
                  <select value={roomForm.startTime} onChange={(e) => setRoomForm({ ...roomForm, startTime: e.target.value })} className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm">
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Heure fin</label>
                  <select value={roomForm.endTime} onChange={(e) => setRoomForm({ ...roomForm, endTime: e.target.value })} className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm">
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={handleAssignRoom} className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700">
                Assigner
              </button>
            </div>

            {/* Assigned rooms list */}
            <div>
              <h4 className="text-sm font-bold text-slate-600 mb-3">Salles assignées ({assignedRooms.length})</h4>
              {assignedRooms.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">Aucune salle assignée</p>
              ) : (
                <div className="space-y-2">
                  {assignedRooms.map(assignment => (
                    <div key={assignment.id} className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <MapPin size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{assignment.roomName}</p>
                          <p className="text-xs text-slate-500">{dayLabels[assignment.dayOfWeek as keyof typeof dayLabels]} • {assignment.startTime} - {assignment.endTime} • Bâtiment {assignment.building}</p>
                        </div>
                      </div>
                      <button onClick={() => handleRemoveRoomAssignment(assignment.id)} className="p-1 hover:bg-red-50 rounded text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBJECT MANAGEMENT MODAL */}
      {showSubjectManagement && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowSubjectManagement(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Gestion des matières</h3>
                <p className="text-sm text-slate-500">{showSubjectManagement.name}</p>
              </div>
              <button onClick={() => setShowSubjectManagement(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>

            {/* Add subject form */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-bold text-slate-600 mb-3">Ajouter une matière</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Matière</label>
                  <select value={subjectForm.subjectId} onChange={(e) => setSubjectForm({ ...subjectForm, subjectId: e.target.value })} className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm">
                    <option value="">Sélectionner</option>
                    {availableSubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Professeur</label>
                  <select value={subjectForm.teacherId} onChange={(e) => setSubjectForm({ ...subjectForm, teacherId: e.target.value })} className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm">
                    <option value="">Sélectionner</option>
                    {teachersList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Heures/semaine</label>
                  <input type="number" min="1" max="10" value={subjectForm.hoursPerWeek} onChange={(e) => setSubjectForm({ ...subjectForm, hoursPerWeek: parseInt(e.target.value) || 1 })} className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm" />
                </div>
              </div>
              <button onClick={handleAddSubject} className="mt-3 px-4 py-2 bg-cyan-600 text-white text-sm font-semibold rounded-lg hover:bg-cyan-700">
                Ajouter
              </button>
            </div>

            {/* Subjects list */}
            <div>
              <h4 className="text-sm font-bold text-slate-600 mb-3">Matières de la classe ({classSubjects.length})</h4>
              {classSubjects.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">Aucune matière assignée</p>
              ) : (
                <div className="space-y-2">
                  {classSubjects.map(cs => (
                    <div key={cs.id} className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                          <BookOpen size={18} className="text-cyan-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{cs.subject?.name}</p>
                          <p className="text-xs text-slate-500">{cs.teacher?.name} • {cs.hoursPerWeek}h/semaine</p>
                        </div>
                      </div>
                      <button onClick={() => handleRemoveSubject(cs.id)} className="p-1 hover:bg-red-50 rounded text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total hours */}
            <div className="mt-6 bg-indigo-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-indigo-700">Total heures/semaine</span>
                <span className="text-lg font-bold text-indigo-700">{classSubjects.reduce((sum, cs) => sum + cs.hoursPerWeek, 0)}h</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MERGE CLASSES MODAL */}
      {showMerge && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowMerge(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <GitMerge size={20} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Fusionner les classes</h3>
                  <p className="text-xs text-slate-500">Déplacer les élèves vers une autre classe</p>
                </div>
              </div>
              <button onClick={() => setShowMerge(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>

            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>{showMerge.name}</strong> ({showMerge._count?.students || 0} élèves)
              </p>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Classe cible</label>
              <select value={mergeTarget} onChange={(e) => setMergeTarget(e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm">
                <option value="">Sélectionner la classe cible</option>
                {classes.filter(c => c.id !== showMerge.id).map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c._count?.students || 0} élèves)</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowMerge(null)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">
                Annuler
              </button>
              <button onClick={handleMergeClasses} disabled={!mergeTarget} className="flex-1 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 disabled:opacity-50">
                Fusionner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN TEACHER MODAL */}
      {showAssign && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => { setShowAssign(null); setAssignForm({ subjectId: '', teacherId: '' }); }}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Assigner un enseignant</h3>
                <p className="text-sm text-slate-500">{showAssign.name}</p>
              </div>
              <button onClick={() => { setShowAssign(null); setAssignForm({ subjectId: '', teacherId: '' }); }} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Matière</label>
                <select value={assignForm.subjectId} onChange={(e) => setAssignForm({ ...assignForm, subjectId: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm">
                  <option value="">Sélectionner une matière</option>
                  {availableSubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Enseignant</label>
                <select value={assignForm.teacherId} onChange={(e) => setAssignForm({ ...assignForm, teacherId: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm">
                  <option value="">Sélectionner un enseignant</option>
                  {teachersList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => { setShowAssign(null); setAssignForm({ subjectId: '', teacherId: '' }); }} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleAssignTeacher} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700">Assigner</button>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT MODAL */}
      {showExport && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowExport(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Exporter les classes</h3>
              <button onClick={() => setShowExport(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>

            <div className="space-y-3">
              <button onClick={() => handleExportClasses('PDF')} className="w-full flex items-center gap-4 p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                  <FileText size={24} className="text-red-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Exporter en PDF</p>
                  <p className="text-xs text-slate-500">Format PDF avec mise en page</p>
                </div>
              </button>

              <button onClick={() => handleExportClasses('Excel')} className="w-full flex items-center gap-4 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <LayoutGrid size={24} className="text-emerald-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Exporter en Excel</p>
                  <p className="text-xs text-slate-500">Format XLSX pour analyse</p>
                </div>
              </button>

              <button onClick={() => handleExportClasses('CSV')} className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center">
                  <Download size={24} className="text-slate-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Exporter en CSV</p>
                  <p className="text-xs text-slate-500">Format CSV pour import</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
