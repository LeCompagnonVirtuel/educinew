'use client';

import { useState, useEffect, useCallback } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbClasses, sbSubjects, sbTeachers } from '@/lib/api';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { exportToFile, type ExportColumn } from '@/lib/export-utils';
import { useExportBranding } from '@/hooks/useExportBranding';
import {
  Calendar, Clock, BookOpen, MapPin, Plus, ChevronLeft, ChevronRight,
  X, AlertTriangle, Users, Download, Printer, Eye, Edit, Trash2,
  Bell, Filter, Layers, Grid3X3, List, Save, Move, Check, Search,
  ChevronDown, AlertCircle, Info, RefreshCw
} from 'lucide-react';

interface TimetableSlot {
  id: string;
  classId: string;
  subjectId: string;
  teacherId?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room?: string;
  subject?: { id: string; name: string };
  teacher?: { id: string; name: string };
}

interface Conflict {
  type: 'teacher' | 'room' | 'student';
  message: string;
  slots: string[];
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const TIME_SLOTS = [
  '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
  '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00'
];

const SUBJECT_COLORS: Record<string, string> = {
  'Mathématiques': 'bg-blue-100 border-blue-300 text-blue-700',
  'Français': 'bg-emerald-100 border-emerald-300 text-emerald-700',
  'Anglais': 'bg-purple-100 border-purple-300 text-purple-700',
  'Physique-Chimie': 'bg-amber-100 border-amber-300 text-amber-700',
  'SVT': 'bg-green-100 border-green-300 text-green-700',
  'Histoire-Géographie': 'bg-rose-100 border-rose-300 text-rose-700',
  'Informatique': 'bg-cyan-100 border-cyan-300 text-cyan-700',
  'Éducation Physique': 'bg-orange-100 border-orange-300 text-orange-700',
  'Arts': 'bg-pink-100 border-pink-300 text-pink-700',
  'Musique': 'bg-violet-100 border-violet-300 text-violet-700',
};

const DEFAULT_COLOR = 'bg-slate-100 border-slate-300 text-slate-700';

export default function TimetablePage() {
  const { user } = useAuth();
  const exportBranding = useExportBranding();
  
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([
    { id: '1', name: 'Salle 101', building: 'A' },
    { id: '2', name: 'Salle 102', building: 'A' },
    { id: '3', name: 'Salle 201', building: 'B' },
    { id: '4', name: 'Salle 202', building: 'B' },
    { id: '5', name: 'Laboratoire', building: 'C' },
    { id: '6', name: 'Salle info', building: 'C' },
    { id: '7', name: 'Terrain', building: 'Ext' },
    { id: '8', name: 'Salle profs', building: 'A' },
  ]);
  
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [loading, setLoading] = useState(true);
  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState<TimetableSlot | null>(null);
  const [showConflictsModal, setShowConflictsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [filterTeacher, setFilterTeacher] = useState<string>('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  
  const [form, setForm] = useState({
    subjectId: '',
    teacherId: '',
    roomId: '',
    dayOfWeek: '1',
    startTime: '08:00',
    endTime: '09:00',
  });
  
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getWeekDates = (weekOffset: number) => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = (weekOffset * 7) - startOfYear.getDay() + 1;
    const weekStart = new Date(startOfYear.getTime() + days * 24 * 60 * 60 * 1000);
    const dates: { day: number; month: number; full: string }[] = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date(weekStart.getTime() + i * 24 * 60 * 60 * 1000);
      dates.push({
        day: d.getDate(),
        month: d.getMonth() + 1,
        full: d.toISOString().split('T')[0],
      });
    }
    return dates;
  };

  const weekDates = getWeekDates(selectedWeek);
  const weekLabel = `Semaine ${selectedWeek + 1}`;

  const loadData = async () => {
    setLoading(true);
    try {
      const [classesData, subjectsData, teachersData] = await Promise.allSettled([
        sbClasses.list(user?.schoolId),
        sbSubjects.list(user?.schoolId),
        sbTeachers.list(user?.schoolId),
      ]);
      setClasses(classesData.status === 'fulfilled' ? classesData.value : []);
      setSubjects(subjectsData.status === 'fulfilled' ? subjectsData.value : []);
      setTeachers(teachersData.status === 'fulfilled' ? teachersData.value : []);
    } catch (e: any) {
      
    } finally {
      setLoading(false);
    }
  };

  const loadTimetable = useCallback(async () => {
    if (!selectedClass) {
      setTimetable([]);
      return;
    }
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('timetable_slots')
        .select('*, subject:subjects(id, name), teacher:teachers(id, user:users(name))')
        .eq('class_id', selectedClass);
      if (error) throw error;
      const slots: TimetableSlot[] = (data || []).map((s: any) => ({
        id: s.id,
        classId: s.class_id,
        subjectId: s.subject_id,
        teacherId: s.teacher_id,
        dayOfWeek: s.day_of_week,
        startTime: s.start_time,
        endTime: s.end_time,
        room: s.room,
        subject: s.subject,
        teacher: s.teacher ? { id: s.teacher.id, name: s.teacher.user?.name } : undefined,
      }));
      setTimetable(slots);
      detectConflicts(slots);
    } catch {
      setTimetable([]);
    }
  }, [selectedClass]);

  const detectConflicts = (slots: TimetableSlot[]) => {
    const newConflicts: Conflict[] = [];
    
    for (let i = 0; i < slots.length; i++) {
      for (let j = i + 1; j < slots.length; j++) {
        const a = slots[i];
        const b = slots[j];
        
        if (a.dayOfWeek === b.dayOfWeek && a.startTime === b.startTime) {
          if (a.teacherId === b.teacherId) {
            newConflicts.push({
              type: 'teacher',
              message: `${a.subject?.name} et ${b.subject?.name} ont le même enseignant`,
              slots: [a.id, b.id],
            });
          }
          if (a.room === b.room && a.room) {
            newConflicts.push({
              type: 'room',
              message: `${a.subject?.name} et ${b.subject?.name} utilisent la même salle`,
              slots: [a.id, b.id],
            });
          }
        }
      }
    }
    
    setConflicts(newConflicts);
  };

  useEffect(() => {
    if (!user?.schoolId) return;
    loadData();
  }, [user?.schoolId]);

  useEffect(() => {
    loadTimetable();
  }, [selectedClass, loadTimetable]);

  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);

  const handleAddSlot = async () => {
    if (!form.subjectId || !form.teacherId || !selectedClass) {
      showToast('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }
    setActionLoading(true);
    try {
      const supabase = getSupabase();
      const slotData = {
        class_id: selectedClass,
        subject_id: form.subjectId,
        teacher_id: form.teacherId,
        day_of_week: parseInt(form.dayOfWeek),
        start_time: form.startTime,
        end_time: form.endTime,
        room: rooms.find((r: any) => r.id === form.roomId)?.name || form.roomId || null,
        school_id: user?.schoolId,
      };

      if (editingSlotId) {
        const { error } = await supabase
          .from('timetable_slots')
          .update(slotData)
          .eq('id', editingSlotId);
        if (error) throw error;
        showToast('Créneau modifié avec succès');
      } else {
        const { error } = await supabase
          .from('timetable_slots')
          .insert(slotData);
        if (error) throw error;
        showToast('Créneau ajouté avec succès');
      }

      setShowAddModal(false);
      setEditingSlotId(null);
      setForm({
        subjectId: '',
        teacherId: '',
        roomId: '',
        dayOfWeek: '1',
        startTime: '08:00',
        endTime: '09:00',
      });
      loadTimetable();
    } catch (e: any) {
      showToast(e.message || 'Erreur', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce créneau ?')) return;
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('timetable_slots').delete().eq('id', slotId);
      if (error) throw error;
      setTimetable(timetable.filter(s => s.id !== slotId));
      showToast('Créneau supprimé');
    } catch (e: any) {
      showToast(e.message || 'Erreur lors de la suppression', 'error');
    }
  };

  const handleEditSlot = (slot: TimetableSlot) => {
    setEditingSlotId(slot.id);
    setForm({
      subjectId: slot.subjectId,
      teacherId: slot.teacher?.id || '',
      roomId: rooms.find((r: any) => r.name === slot.room)?.id || '',
      dayOfWeek: String(slot.dayOfWeek),
      startTime: slot.startTime,
      endTime: slot.endTime,
    });
    setShowDetailModal(null);
    setShowAddModal(true);
  };

  const handleExportPDF = () => {
    const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const columns: ExportColumn[] = [
      { header: 'Jour', key: 'day', width: 14 },
      { header: 'Heure début', key: 'startTime', width: 12 },
      { header: 'Heure fin', key: 'endTime', width: 12 },
      { header: 'Matière', key: 'subject', width: 20 },
      { header: 'Professeur', key: 'teacher', width: 24 },
      { header: 'Classe', key: 'className', width: 18 },
      { header: 'Salle', key: 'room', width: 12 },
    ];
    const data = filteredTimetable.map((s: any) => ({
      day: dayNames[s.dayOfWeek - 1] || '',
      startTime: s.startTime || '',
      endTime: s.endTime || '',
      subject: s.subject?.name || '',
      teacher: s.teacher?.user?.name || '',
      className: s.class?.name || '',
      room: s.room || '',
    }));
    exportToFile(data, columns, `emploi_du_temps_${new Date().toISOString().split('T')[0]}`, 'pdf', { title: 'Emploi du Temps', subtitle: `Classe: ${classes.find(c => c.id === selectedClass)?.name || ''} — ${weekLabel}`, orientation: 'landscape' }, exportBranding);
    showToast('Emploi du temps exporté');
    setShowExportModal(false);
  };

  const getSlotForCell = (day: number, time: string) => {
    return timetable.find(s => s.dayOfWeek === day && s.startTime === time);
  };

  const filteredTimetable = timetable.filter(slot => {
    if (filterTeacher && slot.teacher?.id !== filterTeacher) return false;
    if (filterSubject && slot.subjectId !== filterSubject) return false;
    return true;
  });

  const getSubjectColor = (subjectName?: string) => {
    if (!subjectName) return DEFAULT_COLOR;
    for (const [key, value] of Object.entries(SUBJECT_COLORS)) {
      if (subjectName.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
    return DEFAULT_COLOR;
  };

  return (
    <RoleLayout role="admin">
      {toast && (
        <div className={cn(
          'fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold',
          toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
        )}>
          {toast.msg}
        </div>
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Emploi du temps</h1>
            <p className="text-slate-500 mt-1">Planification et gestion des cours</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Class Selector */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white min-w-0 sm:min-w-[180px]"
            >
              <option value="">Sélectionner une classe</option>
              {classes.map((cls: any) => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>

            {/* Week Navigation */}
            <div className="flex items-center bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
                className="px-3 py-2.5 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="px-4 py-2.5 text-sm font-medium border-l border-r border-slate-200 min-w-[100px] text-center">
                {weekLabel}
              </span>
              <button
                onClick={() => setSelectedWeek(selectedWeek + 1)}
                className="px-3 py-2.5 hover:bg-slate-50 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('week')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  viewMode === 'week' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600'
                )}
              >
                <Grid3X3 size={16} className="inline mr-1" />
                Semaine
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  viewMode === 'day' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600'
                )}
              >
                <List size={16} className="inline mr-1" />
                Jour
              </button>
            </div>

            {/* Actions */}
            {selectedClass && (
              <>
                {conflicts.length > 0 && (
                  <button
                    onClick={() => setShowConflictsModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-2 text-sm font-medium hover:bg-amber-200 transition-colors"
                  >
                    <AlertTriangle size={16} />
                    {conflicts.length} conflit{conflicts.length > 1 ? 's' : ''}
                  </button>
                )}
                <button
                  onClick={() => setShowExportModal(true)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 flex items-center gap-2 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white flex items-center gap-2 text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  <Plus size={16} />
                  Ajouter cours
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filters */}
        {selectedClass && (
          <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
            <Search size={16} className="text-slate-400" />
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-2 bg-slate-50 rounded-lg border-none text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Toutes les matières</option>
              {subjects.map((s: any) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <select
              value={filterTeacher}
              onChange={(e) => setFilterTeacher(e.target.value)}
              className="px-3 py-2 bg-slate-50 rounded-lg border-none text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Tous les enseignants</option>
              {teachers.map((t: any) => (
                <option key={t.id} value={t.id}>{t.user?.name}</option>
              ))}
            </select>
            {(filterSubject || filterTeacher) && (
              <button
                onClick={() => { setFilterSubject(''); setFilterTeacher(''); }}
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                Réinitialiser
              </button>
            )}
          </div>
        )}

        {/* Empty State */}
        {!selectedClass ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-100 text-center">
            <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Sélectionnez une classe</h3>
            <p className="text-slate-500">Choisissez une classe pour voir et gérer son emploi du temps.</p>
          </div>
        ) : loading ? (
          <div className="text-center py-12 text-slate-400">Chargement...</div>
        ) : (
          <>
            {/* Class Info */}
            {selectedClass && (
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-4 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{classes.find((c: any) => c.id === selectedClass)?.name}</h3>
                  <p className="text-indigo-200 text-sm">{classes.find((c: any) => c.id === selectedClass)?.level} • {timetable.length} créneaux</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <span>{conflicts.length === 0 ? 'Aucun conflit' : `${conflicts.length} conflit${conflicts.length > 1 ? 's' : ''}`}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Timetable Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-3 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-[100px]">
                        Horaire
                      </th>
                      {DAYS.map((day, i) => (
                        <th key={day} className="px-3 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <div className="flex flex-col">
                            <span>{day}</span>
                            <span className="text-[10px] font-normal text-slate-400">
                              {weekDates[i]?.day}/{weekDates[i]?.month}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TIME_SLOTS.map((time, timeIndex) => (
                      <tr key={time} className={timeIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        <td className="px-3 py-3 text-sm font-medium text-slate-600 border-r border-slate-100">
                          {time}
                        </td>
                        {DAYS.map((_, dayIndex) => {
                          const slot = getSlotForCell(dayIndex + 1, time);
                          const hasConflict = slot && conflicts.some(c => c.slots.includes(slot.id));
                          
                          return (
                            <td key={dayIndex} className="px-1 py-1 border-r border-slate-100 relative">
                              {slot ? (
                                <div
                                  onClick={() => setShowDetailModal(slot)}
                                  className={cn(
                                    'rounded-lg p-2 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md group relative',
                                    'border-l-4',
                                    getSubjectColor(slot.subject?.name),
                                    hasConflict && 'ring-2 ring-amber-400 ring-offset-1'
                                  )}
                                >
                                  <p className="text-xs font-semibold truncate">{slot.subject?.name}</p>
                                  <p className="text-[10px] opacity-70 flex items-center gap-1 truncate">
                                    <Clock size={8} />
                                    {slot.startTime} - {slot.endTime}
                                  </p>
                                  {slot.room && (
                                    <p className="text-[10px] opacity-70 flex items-center gap-1 truncate">
                                      <MapPin size={8} />
                                      {slot.room}
                                    </p>
                                  )}
                                  <p className="text-[10px] opacity-70 truncate mt-1">
                                    {slot.teacher?.name}
                                  </p>
                                  
                                  {/* Conflict indicator */}
                                  {hasConflict && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                                      <AlertTriangle size={8} className="text-white" />
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div
                                  onClick={() => {
                                    if (selectedClass) {
                                      setForm({
                                        ...form,
                                        dayOfWeek: String(dayIndex + 1),
                                        startTime: time,
                                        endTime: TIME_SLOTS[timeIndex + 1] || '17:00',
                                      });
                                      setShowAddModal(true);
                                    }
                                  }}
                                  className="h-full min-h-[60px] flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                                >
                                  <Plus size={16} className="text-slate-300" />
                                </div>
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

            {/* Legend */}
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Légende des matières</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(SUBJECT_COLORS).slice(0, 8).map(([subject, colorClass]) => (
                  <div key={subject} className={cn('px-2 py-1 rounded-full text-xs font-medium border', colorClass)}>
                    {subject}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Ajouter un cours</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Jour *</label>
                <select
                  value={form.dayOfWeek}
                  onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                >
                  {DAYS.map((day, i) => (
                    <option key={i} value={i + 1}>{day}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Début *</label>
                  <select
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                  >
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Fin *</label>
                  <select
                    value={form.endTime}
                    onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                  >
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Matière *</label>
                <select
                  value={form.subjectId}
                  onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                >
                  <option value="">Sélectionner une matière</option>
                  {subjects.map((s: any) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Enseignant *</label>
                <select
                  value={form.teacherId}
                  onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                >
                  <option value="">Sélectionner un enseignant</option>
                  {teachers.map((t: any) => (
                    <option key={t.id} value={t.id}>{t.user?.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Salle</label>
                <select
                  value={form.roomId}
                  onChange={(e) => setForm({ ...form, roomId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                >
                  <option value="">Sélectionner une salle</option>
                  {rooms.map((r: any) => (
                    <option key={r.id} value={r.id}>{r.name} ({r.building})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                onClick={handleAddSlot}
                disabled={actionLoading || !form.subjectId || !form.teacherId}
                className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <>
                    <Check size={16} /> Ajouter
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowDetailModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Détails du cours</h3>
              <button onClick={() => setShowDetailModal(null)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className={cn('rounded-xl p-4 border-l-4 mb-6', getSubjectColor(showDetailModal.subject?.name))}>
              <h4 className="text-lg font-bold">{showDetailModal.subject?.name}</h4>
              <p className="text-sm opacity-70">{DAYS[showDetailModal.dayOfWeek - 1]}</p>
              <div className="flex items-center gap-2 mt-2">
                <Clock size={14} />
                <span>{showDetailModal.startTime} - {showDetailModal.endTime}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Users size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Enseignant</p>
                  <p className="text-sm font-semibold">{showDetailModal.teacher?.name || 'Non assigné'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <MapPin size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Salle</p>
                  <p className="text-sm font-semibold">{showDetailModal.room || 'Non assignée'}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleDeleteSlot(showDetailModal.id)}
                className="flex-1 py-3 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 flex items-center justify-center gap-2"
              >
                <Trash2 size={16} /> Supprimer
              </button>
              <button
                onClick={() => setShowDetailModal(null)}
                className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conflicts Modal */}
      {showConflictsModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowConflictsModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <AlertTriangle className="text-amber-500" />
                Conflits détectés
              </h3>
              <button onClick={() => setShowConflictsModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {conflicts.map((conflict, i) => (
                <div
                  key={i}
                  className={cn(
                    'p-4 rounded-xl border',
                    conflict.type === 'teacher' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                      conflict.type === 'teacher' ? 'bg-red-100' : 'bg-amber-100'
                    )}>
                      {conflict.type === 'teacher' ? (
                        <Users size={16} className="text-red-600" />
                      ) : (
                        <MapPin size={16} className="text-amber-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {conflict.type === 'teacher' ? 'Conflit d\'enseignant' : 'Conflit de salle'}
                      </p>
                      <p className="text-sm text-slate-600">{conflict.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowConflictsModal(false)}
              className="w-full py-3 mt-6 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800"
            >
              Compris
            </button>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowExportModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Exporter l'emploi du temps</h3>
              <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleExportPDF}
                className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center gap-4 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <Download size={24} className="text-red-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Exporter en PDF</p>
                  <p className="text-sm text-slate-500">Format imprimable A4</p>
                </div>
              </button>

              <button
                onClick={() => { showToast('Export image'); setShowExportModal(false); }}
                className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center gap-4 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Printer size={24} className="text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Exporter en image</p>
                  <p className="text-sm text-slate-500">Format PNG haute résolution</p>
                </div>
              </button>

              <button
                onClick={() => { showToast('Impression'); setShowExportModal(false); }}
                className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center gap-4 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <List size={24} className="text-emerald-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Imprimer</p>
                  <p className="text-sm text-slate-500">Directement vers l'imprimante</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}