'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { BookOpen, TrendingUp, Award, BarChart3, ChevronDown, RefreshCw, CheckCircle, XCircle, AlertTriangle, Download, Upload, Search, Filter, Loader2, Save, Lock, Unlock, FileText, FileSpreadsheet, X, Check, Eye, TrendingDown, Minus, ArrowUp, ArrowDown, Users, Calendar, Clock, Settings, Plus, Trash2, Edit, ClipboardList, Scale } from 'lucide-react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { exportToFile, type ExportColumn } from '@/lib/export-utils';
import { useExportBranding } from '@/hooks/useExportBranding';
import Pagination from '@/components/ui/Pagination';

const BarChart = dynamic(() => import('recharts').then(m => ({ default: m.BarChart })), { ssr: false });
const Bar = dynamic(() => import('recharts').then(m => ({ default: m.Bar })), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(m => ({ default: m.XAxis })), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(m => ({ default: m.YAxis })), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(m => ({ default: m.CartesianGrid })), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(m => ({ default: m.Tooltip })), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(m => ({ default: m.ResponsiveContainer })), { ssr: false });
const Cell = dynamic(() => import('recharts').then(m => ({ default: m.Cell })), { ssr: false });
const LineChart = dynamic(() => import('recharts').then(m => ({ default: m.LineChart })), { ssr: false });
const Line = dynamic(() => import('recharts').then(m => ({ default: m.Line })), { ssr: false });
const Legend = dynamic(() => import('recharts').then(m => ({ default: m.Legend })), { ssr: false });
const PieChart = dynamic(() => import('recharts').then(m => ({ default: m.PieChart })), { ssr: false });
const Pie = dynamic(() => import('recharts').then(m => ({ default: m.Pie })), { ssr: false });
import { sbClasses, sbGrades, sbSubjects, sbStudents } from '@/lib/api';
import { cn } from '@/lib/utils';
import type { Period, StudentReport, ClassDashboard } from '@/types';

const MENTION_COLORS: Record<string, string> = {
  'Excellent': '#059669',
  'Très Bien': '#10b981',
  'Bien': '#34d399',
  'Assez Bien': '#fbbf24',
  'Passable': '#f97316',
  'Insuffisant': '#ef4444',
};

const MENTION_THRESHOLDS = [
  { min: 16, mention: 'Excellent', color: 'bg-emerald-100 text-emerald-700' },
  { min: 14, mention: 'Très Bien', color: 'bg-green-100 text-green-700' },
  { min: 12, mention: 'Bien', color: 'bg-teal-100 text-teal-700' },
  { min: 10, mention: 'Assez Bien', color: 'bg-amber-100 text-amber-700' },
  { min: 8, mention: 'Passable', color: 'bg-orange-100 text-orange-700' },
  { min: 0, mention: 'Insuffisant', color: 'bg-red-100 text-red-700' },
];

function getMention(average: number): { mention: string; color: string } {
  const m = MENTION_THRESHOLDS.find(t => average >= t.min);
  return m || { mention: 'Insuffisant', color: 'bg-red-100 text-red-700' };
}

function getGradeColor(score: number): string {
  if (score >= 16) return 'text-emerald-600';
  if (score >= 14) return 'text-green-600';
  if (score >= 12) return 'text-teal-600';
  if (score >= 10) return 'text-amber-600';
  return 'text-red-600';
}

function getGradeBg(score: number): string {
  if (score >= 16) return 'bg-emerald-50';
  if (score >= 14) return 'bg-green-50';
  if (score >= 12) return 'bg-teal-50';
  if (score >= 10) return 'bg-amber-50';
  return 'bg-red-50';
}

interface GradeEntry {
  studentId: string;
  studentName: string;
  matricule: string;
  devoir1?: number;
  devoir2?: number;
  composition?: number;
  average?: number;
  rank?: number;
}

interface SubjectGrade {
  id?: string;
  subjectId: string;
  subjectName: string;
  coefficient: number;
  entries: GradeEntry[];
  classAverage?: number;
}

export default function GradesPage() {
  const { user } = useAuth();
  const exportBranding = useExportBranding();
  const searchParams = useSearchParams();
  const [classes, setClasses] = useState<{ id: string; name: string; level: string }[]>([]);
  const [subjects, setSubjects] = useState<{ id: string; name: string; coefficient: number }[]>([]);
  const [periods, setPeriods] = useState<Period[]>([]);
  const [selectedClass, setSelectedClass] = useState(searchParams.get('classId') || '');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [dashboard, setDashboard] = useState<ClassDashboard | null>(null);
  const [bulletins, setBulletins] = useState<StudentReport[]>([]);
  const [evolution, setEvolution] = useState<{ period: string; average: number }[]>([]);
  const [selectedStudent, setSelectedStudent] = useState(searchParams.get('student') || '');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);
  const [pendingChanges, setPendingChanges] = useState(false);

  const [gradeData, setGradeData] = useState<SubjectGrade | null>(null);
  const [students, setStudents] = useState<{ id: string; userId: string; user: { name: string }; matricule: string }[]>([]);
  const [currentTeacherId, setCurrentTeacherId] = useState<string | null>(null);

  // Exams management
  const [activeTab, setActiveTab] = useState<'saisie' | 'dashboard' | 'bulletins' | 'validation' | 'exams' | 'grading'>('saisie');
  const [showExamModal, setShowExamModal] = useState(false);
  const [editingExam, setEditingExam] = useState<{ id: string; name: string; type: string; subjectId: string; date: string; maxScore: number } | null>(null);
  const [examForm, setExamForm] = useState({
    name: '',
    type: 'DEVOIR',
    subjectId: '',
    date: '',
    maxScore: 20,
    coefficient: 1,
    description: ''
  });
  interface Exam {
    id: string;
    name: string;
    type: string;
    subjectId: string;
    subjectName?: string;
    date: string;
    maxScore: number;
    coefficient: number;
    description?: string;
  }

  interface GradingLevel {
    id: string;
    name: string;
    minScore: number;
    maxScore: number;
    mention: string;
    color: string;
  }

  const [exams, setExams] = useState<Exam[]>([
    { id: '1', name: 'Composition du 1er trimestre', type: 'COMPOSITION', subjectId: '1', subjectName: 'Mathématiques', date: '2025-01-15', maxScore: 20, coefficient: 3 },
    { id: '2', name: 'Devoir de Maths', type: 'DEVOIR', subjectId: '1', subjectName: 'Mathématiques', date: '2025-01-10', maxScore: 20, coefficient: 2 },
    { id: '3', name: 'Composition Français', type: 'COMPOSITION', subjectId: '2', subjectName: 'Français', date: '2025-01-18', maxScore: 20, coefficient: 3 },
  ]);

  // Custom grading scales
  const [showGradingModal, setShowGradingModal] = useState(false);
  const [gradingScale, setGradingScale] = useState<GradingLevel[]>([
    { id: '1', name: 'Standard', minScore: 16, maxScore: 20, mention: 'Excellent', color: '#059669' },
    { id: '2', name: 'Standard', minScore: 14, maxScore: 15.99, mention: 'Très Bien', color: '#10b981' },
    { id: '3', name: 'Standard', minScore: 12, maxScore: 13.99, mention: 'Bien', color: '#34d399' },
    { id: '4', name: 'Standard', minScore: 10, maxScore: 11.99, mention: 'Assez Bien', color: '#fbbf24' },
    { id: '5', name: 'Standard', minScore: 8, maxScore: 9.99, mention: 'Passable', color: '#f97316' },
    { id: '6', name: 'Standard', minScore: 0, maxScore: 7.99, mention: 'Insuffisant', color: '#ef4444' },
  ]);
  const [editingScale, setEditingScale] = useState<GradingLevel | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!user?.schoolId) return;
    async function load() {
      try {
        const [c, p, s] = await Promise.allSettled([
          sbClasses.list(user?.schoolId),
          sbGrades.getPeriods(user?.schoolId),
          sbSubjects.list(user?.schoolId),
        ]);
        setClasses(c.status === 'fulfilled' ? c.value : []);
        setPeriods(p.status === 'fulfilled' ? p.value : []);
        setSubjects(s.status === 'fulfilled' ? s.value : []);
        const periods = p.status === 'fulfilled' ? p.value : [];
        if (periods.length > 0) {
          const active = periods.find((per: Period) => per.isActive) || periods[0];
          setSelectedPeriod(active.id);
        }
        if (user?.role === 'TEACHER') {
          const { getSupabase } = await import('@/lib/api/shared');
          const supabase = getSupabase();
          const { data: teacherRecord } = await supabase
            .from('teachers')
            .select('id')
            .eq('user_id', user.id)
            .single();
          if (teacherRecord) setCurrentTeacherId(teacherRecord.id);
        }
      } catch {
        // Load errors handled by individual setStates
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user?.schoolId]);

  useEffect(() => {
    const studentId = searchParams.get('student');
    if (studentId && !selectedClass) {
      (async () => {
        try {
          const { getSupabase } = await import('@/lib/api/shared');
          const supabase = getSupabase();
          const { data } = await supabase
            .from('students')
            .select('class_id')
            .eq('id', studentId)
            .single();
          if (data?.class_id) setSelectedClass(data.class_id);
        } catch {}
      })();
    }
  }, [searchParams, selectedClass]);

  useEffect(() => {
    if (selectedClass) {
      loadStudentsForClass();
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass && selectedSubject && selectedPeriod) {
      loadGradeData();
    }
  }, [selectedClass, selectedSubject, selectedPeriod]);

  useEffect(() => {
    if (selectedClass && selectedPeriod) {
      loadDashboard();
      loadBulletins();
    }
  }, [selectedClass, selectedPeriod]);

  const loadStudentsForClass = async () => {
    try {
      const data = await sbStudents.list();
      const filtered = data.filter((s: any) => s.classId === selectedClass);
      setStudents(filtered);
    } catch (err) {
      
    }
  };

  const loadGradeData = async () => {
    if (!selectedSubject) return;
    setLoading(true);
    try {
      const grades = await sbGrades.list({
        classId: selectedClass,
        subjectId: selectedSubject,
        periodId: selectedPeriod,
      });

      const subject = subjects.find(s => s.id === selectedSubject);
      
      const entriesMap = new Map<string, GradeEntry>();
      students.forEach(s => {
        entriesMap.set(s.id, {
          studentId: s.id,
          studentName: s.user?.name || '—',
          matricule: s.matricule || s.userId,
        });
      });

      grades.forEach((g: { studentId: string; gradeType: string; score: number; isValidated: boolean }) => {
        const entry = entriesMap.get(g.studentId);
        if (entry) {
          if (g.gradeType === 'DEVOIR') {
            if (!entry.devoir1) entry.devoir1 = g.score;
            else entry.devoir2 = g.score;
          } else if (g.gradeType === 'COMPOSITION') {
            entry.composition = g.score;
          }
          if (g.isValidated) setIsLocked(true);
        }
      });

      entriesMap.forEach(entry => {
        if (entry.devoir1 !== undefined && entry.composition !== undefined) {
          const devoirAvg = entry.devoir2 !== undefined 
            ? (entry.devoir1 + entry.devoir2) / 2 
            : entry.devoir1;
          entry.average = (devoirAvg + entry.composition) / 2;
        }
      });

      const entries = Array.from(entriesMap.values()).sort((a, b) => {
        if (a.average === undefined && b.average === undefined) return 0;
        if (a.average === undefined) return 1;
        if (b.average === undefined) return -1;
        return b.average - a.average;
      });

      entries.forEach((entry, idx) => {
        entry.rank = idx + 1;
      });

      const validAverages = entries.filter(e => e.average !== undefined);
      const classAvg = validAverages.length > 0
        ? validAverages.reduce((sum, e) => sum + (e.average || 0), 0) / validAverages.length
        : 0;

      setGradeData({
        subjectId: selectedSubject,
        subjectName: subject?.name || 'Matière',
        coefficient: subject?.coefficient || 3,
        entries,
        classAverage: classAvg,
      });
    } catch (err) {
      
      showToast('Erreur de chargement des notes', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadDashboard = async () => {
    try {
      const data = await sbGrades.getClassDashboard(selectedClass, selectedPeriod);
      setDashboard(data as any);
    } catch (err) {
      
    }
  };

  const loadBulletins = async () => {
    try {
      const data = await sbGrades.getClassAverages(selectedClass, selectedPeriod);
      setBulletins(data as any);
    } catch (err) {
      
    }
  };

  const handleGradeChange = (studentId: string, field: 'devoir1' | 'devoir2' | 'composition', value: number | undefined) => {
    if (isLocked) return;
    
    // Clamp value to 0-20 range
    const clampedValue = value !== undefined ? Math.max(0, Math.min(20, value)) : undefined;
    
    setGradeData(prev => {
      if (!prev) return prev;
      const entries = prev.entries.map(e => {
        if (e.studentId !== studentId) return e;
        const updated = { ...e, [field]: clampedValue };
        
        if (updated.devoir1 !== undefined && updated.composition !== undefined) {
          const devoirAvg = updated.devoir2 !== undefined
            ? (updated.devoir1 + updated.devoir2) / 2
            : updated.devoir1;
          updated.average = (devoirAvg + updated.composition) / 2;
        } else {
          updated.average = undefined;
        }
        
        return updated;
      });

      entries.sort((a, b) => {
        if (a.average === undefined && b.average === undefined) return 0;
        if (a.average === undefined) return 1;
        if (b.average === undefined) return -1;
        return b.average - a.average;
      });

      entries.forEach((entry, idx) => {
        entry.rank = idx + 1;
      });

      const validAverages = entries.filter(e => e.average !== undefined);
      const classAvg = validAverages.length > 0
        ? validAverages.reduce((sum, e) => sum + (e.average || 0), 0) / validAverages.length
        : 0;

      return { ...prev, entries, classAverage: classAvg };
    });

    setPendingChanges(true);
    
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      handleSaveGrades();
    }, 3000);
  };

  const handleSaveGrades = async () => {
    if (!gradeData || isLocked) return;
    setSaving(true);
    try {
      const gradesToSave = gradeData.entries
        .filter(e => e.devoir1 !== undefined || e.devoir2 !== undefined || e.composition !== undefined)
        .flatMap(e => {
          const grades: { studentId: string; subjectId: string; score: number; maxScore: number; gradeType: string; periodId: string; teacherId?: string | null }[] = [];
          if (e.devoir1 !== undefined) {
            grades.push({ studentId: e.studentId, subjectId: selectedSubject, score: e.devoir1, maxScore: 20, gradeType: 'DEVOIR', periodId: selectedPeriod, teacherId: currentTeacherId });
          }
          if (e.devoir2 !== undefined) {
            grades.push({ studentId: e.studentId, subjectId: selectedSubject, score: e.devoir2, maxScore: 20, gradeType: 'DEVOIR', periodId: selectedPeriod, teacherId: currentTeacherId });
          }
          if (e.composition !== undefined) {
            grades.push({ studentId: e.studentId, subjectId: selectedSubject, score: e.composition, maxScore: 20, gradeType: 'COMPOSITION', periodId: selectedPeriod, teacherId: currentTeacherId });
          }
          return grades;
        });

      await sbGrades.createBulk(gradesToSave);
      showToast('Notes enregistrées avec succès', 'success');
      setPendingChanges(false);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Erreur d\'enregistrement', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleValidateAll = async () => {
    if (!selectedClass || !selectedSubject || !selectedPeriod) return;
    setSaving(true);
    try {
      const unvalidated = await sbGrades.getUnvalidated(selectedClass, selectedSubject);
      for (const grade of unvalidated) {
        await sbGrades.validate(grade.id);
      }
      setIsLocked(true);
      showToast('Notes validées avec succès', 'success');
      loadGradeData();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Erreur de validation', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleUnlock = () => {
    setIsLocked(false);
    showToast('Notes déverrouillées pour modification', 'info');
  };

  const handleGenerateBulletins = async () => {
    if (!selectedClass || !selectedPeriod) return;
    setGenerating(true);
    try {
      await sbGrades.generateBulletins(selectedClass, selectedPeriod);
      await loadDashboard();
      await loadBulletins();
      showToast('Bulletins générés avec succès', 'success');
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Erreur de génération', 'error');
    } finally {
      setGenerating(false);
    }
  };

  const loadEvolution = async (studentId: string) => {
    try {
      const data = await sbGrades.getStudentEvolution(studentId);
      setEvolution(data);
      setSelectedStudent(studentId);
    } catch (err) {
      
    }
  };

  // Exam handlers
  const handleOpenExamModal = (exam?: { id: string; name: string; type: string; subjectId: string; date: string; maxScore: number; coefficient?: number; description?: string }) => {
    if (exam) {
      setEditingExam(exam);
      setExamForm({
        name: exam.name,
        type: exam.type,
        subjectId: exam.subjectId,
        date: exam.date,
        maxScore: exam.maxScore,
        coefficient: exam.coefficient ?? 1,
        description: exam.description || ''
      });
    } else {
      setEditingExam(null);
      setExamForm({
        name: '',
        type: 'DEVOIR',
        subjectId: selectedSubject,
        date: new Date().toISOString().split('T')[0],
        maxScore: 20,
        coefficient: 1,
        description: ''
      });
    }
    setShowExamModal(true);
  };

  const handleSaveExam = () => {
    if (!examForm.name || !examForm.subjectId) {
      showToast('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }
    const subject = subjects.find(s => s.id === examForm.subjectId);
    if (editingExam) {
      setExams(exams.map(e => e.id === editingExam.id ? { ...e, ...examForm, subjectName: subject?.name } : e));
      showToast('Examen modifié avec succès');
    } else {
      setExams([...exams, { id: Date.now().toString(), ...examForm, subjectName: subject?.name }]);
      showToast('Examen créé avec succès');
    }
    setShowExamModal(false);
  };

  const handleDeleteExam = (examId: string) => {
    setExams(exams.filter(e => e.id !== examId));
    showToast('Examen supprimé');
  };

  // Grading scale handlers
  const handleOpenGradingModal = () => {
    setShowGradingModal(true);
  };

  const handleAddGradingLevel = () => {
    setGradingScale([...gradingScale, {
      id: Date.now().toString(),
      name: 'Custom',
      minScore: 0,
      maxScore: 10,
      mention: 'Nouvelle mention',
      color: '#94a3b8'
    }]);
  };

  const handleUpdateGradingLevel = (id: string, field: string, value: string | number) => {
    setGradingScale(gradingScale.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleDeleteGradingLevel = (id: string) => {
    setGradingScale(gradingScale.filter(s => s.id !== id));
    showToast('Niveau supprimé');
  };

  const handleSaveGradingScale = () => {
    showToast('Échelle de notation sauvegardée', 'success');
    setShowGradingModal(false);
  };

  const filteredEntries = gradeData?.entries.filter(e =>
    e.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.matricule.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const [gradesPage, setGradesPage] = useState(1);
  const gradesPerPage = 25;
  const gradesTotalPages = Math.max(1, Math.ceil(filteredEntries.length / gradesPerPage));
  const paginatedEntries = filteredEntries.slice((gradesPage - 1) * gradesPerPage, gradesPage * gradesPerPage);

  const strugglingStudents = bulletins.filter(b => b.generalAverage < 10);
  const topStudents = bulletins.slice(0, 3);

  const pieData = dashboard ? Object.entries(dashboard.mentionDistribution).map(([name, value]) => ({
    name, value, fill: MENTION_COLORS[name] || '#94a3b8',
  })) : [];

  const evolutionChartData = evolution.map((e) => ({
    period: e.period,
    Moyenne: e.average,
  }));

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Notes' }]}>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' :
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        }`}>
          {toast.type === 'success' && <Check size={16} />}
          {toast.type === 'error' && <X size={16} />}
          {toast.type === 'info' && <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des Notes</h1>
          <p className="text-sm text-slate-500 mt-1">
            Système conforme aux standards africains francophones
            {pendingChanges && <span className="ml-2 text-amber-500">(Non enregistré)</span>}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {activeTab === 'saisie' && gradeData && (
            <>
              {isLocked ? (
                <button onClick={handleUnlock} className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl text-sm font-medium flex items-center gap-2">
                  <Lock size={16} />
                  Déverrouiller
                </button>
              ) : (
                <button
                  onClick={handleSaveGrades}
                  disabled={saving || !pendingChanges}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-emerald-600 disabled:opacity-50"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Enregistrer
                </button>
              )}
              {!isLocked && (
                <button
                  onClick={handleValidateAll}
                  disabled={saving}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-indigo-600 disabled:opacity-50"
                >
                  <CheckCircle size={16} />
                  Valider tout
                </button>
              )}
            </>
          )}
          {activeTab === 'bulletins' && (
            <button
              onClick={handleGenerateBulletins}
              disabled={generating}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-emerald-700 disabled:opacity-50"
            >
              <RefreshCw size={16} className={generating ? 'animate-spin' : ''} />
              {generating ? 'Calcul...' : 'Générer bulletins'}
            </button>
          )}
          <button onClick={() => setShowExport(true)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-50">
            <Download size={16} />
            Export
          </button>
          <button onClick={() => setShowImport(true)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-50">
            <Upload size={16} />
            Import
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap mb-6">
        <div className="relative">
          <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={selectedClass}
            onChange={(e) => { setSelectedClass(e.target.value); setSelectedSubject(''); }}
            className="pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-indigo-500 min-w-0 sm:min-w-[180px]"
          >
            <option value="">Sélectionner classe</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <BookOpen size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-indigo-500 min-w-0 sm:min-w-[180px]"
          >
            <option value="">Sélectionner matière</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.name} (coef. {s.coefficient})</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <BarChart3 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-indigo-500 min-w-0 sm:min-w-[160px]"
          >
            <option value="">Période</option>
            {periods.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl w-fit overflow-x-auto">
        {[
          { id: 'saisie', label: 'Saisie Notes', icon: BookOpen },
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'exams', label: 'Examens', icon: ClipboardList },
          { id: 'bulletins', label: 'Bulletins', icon: Award },
          { id: 'validation', label: 'Validation', icon: CheckCircle },
          { id: 'grading', label: 'Échelle', icon: Scale },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==================== SAISIE TAB ==================== */}
      {activeTab === 'saisie' && (
        <>
          {(!selectedClass || !selectedSubject) ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Sélectionnez une classe et une matière</h3>
              <p className="text-slate-500">Choisissez une classe et une matière pour saisir les notes.</p>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-indigo-500" />
            </div>
          ) : gradeData && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 font-medium">Élèves</p>
                  <p className="text-2xl font-bold text-slate-800">{gradeData.entries.length}</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                  <p className="text-xs text-indigo-600 font-medium">Moyenne classe</p>
                  <p className={`text-2xl font-bold ${getGradeColor(gradeData.classAverage || 0)}`}>
                    {(gradeData.classAverage || 0).toFixed(2)}/20
                  </p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                  <p className="text-xs text-emerald-600 font-medium">Meilleure note</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {Math.max(...gradeData.entries.filter(e => e.average !== undefined).map(e => e.average || 0), 0).toFixed(2)}/20
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <p className="text-xs text-amber-600 font-medium">Plus basse</p>
                  <p className="text-2xl font-bold text-amber-700">
                    {Math.min(...gradeData.entries.filter(e => e.average !== undefined).map(e => e.average || 20), 20).toFixed(2)}/20
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un élève..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>Coefficient: <strong>{gradeData.coefficient}</strong></span>
                  <span>|</span>
                  <span>Matière: <strong>{gradeData.subjectName}</strong></span>
                  {isLocked && (
                    <>
                      <span>|</span>
                      <span className="flex items-center gap-1 text-amber-600"><Lock size={14} /> Verrouillé</span>
                    </>
                  )}
                </div>
              </div>

              {/* Grade Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-12">#</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase min-w-[200px]">Élève</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-24">Matricule</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-24">Devoir 1</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-24">Devoir 2</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-28">Composition</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-24 bg-indigo-50">Moyenne</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-16">Rang</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedEntries.map((entry) => (
                        <tr key={entry.studentId} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="px-4 py-3 text-sm text-slate-400">{entry.rank}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                {entry.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <span className="font-medium text-slate-800">{entry.studentName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500 font-mono">{entry.matricule}</td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="number"
                              value={entry.devoir1 ?? ''}
                              onChange={(e) => handleGradeChange(entry.studentId, 'devoir1', e.target.value ? parseFloat(e.target.value) : undefined)}
                              disabled={isLocked}
                              className={`w-16 px-2 py-1.5 text-center rounded-lg border text-sm font-medium ${
                                isLocked ? 'bg-slate-100 cursor-not-allowed' : 'bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500'
                              } ${entry.devoir1 !== undefined ? getGradeColor(entry.devoir1) : 'text-slate-400'}`}
                              min={0}
                              max={20}
                              step={0.5}
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="number"
                              value={entry.devoir2 ?? ''}
                              onChange={(e) => handleGradeChange(entry.studentId, 'devoir2', e.target.value ? parseFloat(e.target.value) : undefined)}
                              disabled={isLocked}
                              className={`w-16 px-2 py-1.5 text-center rounded-lg border text-sm font-medium ${
                                isLocked ? 'bg-slate-100 cursor-not-allowed' : 'bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500'
                              } ${entry.devoir2 !== undefined ? getGradeColor(entry.devoir2) : 'text-slate-400'}`}
                              min={0}
                              max={20}
                              step={0.5}
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="number"
                              value={entry.composition ?? ''}
                              onChange={(e) => handleGradeChange(entry.studentId, 'composition', e.target.value ? parseFloat(e.target.value) : undefined)}
                              disabled={isLocked}
                              className={`w-20 px-2 py-1.5 text-center rounded-lg border text-sm font-semibold ${
                                isLocked ? 'bg-slate-100 cursor-not-allowed' : 'bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500'
                              } ${entry.composition !== undefined ? getGradeColor(entry.composition) : 'text-slate-400'}`}
                              min={0}
                              max={20}
                              step={0.5}
                            />
                          </td>
                          <td className={`px-4 py-3 text-center font-bold text-base bg-indigo-50 ${entry.average !== undefined ? getGradeColor(entry.average) : 'text-slate-400'}`}>
                            {entry.average !== undefined ? entry.average.toFixed(2) : '-'}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {entry.rank === 1 && <span className="text-amber-500">🥇</span>}
                            {entry.rank === 2 && <span className="text-slate-400">🥈</span>}
                            {entry.rank === 3 && <span className="text-orange-400">🥉</span>}
                            {entry.rank && entry.rank > 3 && <span className="text-slate-400">{entry.rank}</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Formula Info */}
              <div className="mt-4 p-4 bg-slate-50 rounded-xl text-sm text-slate-600">
                <strong>Formule de calcul:</strong> Moyenne = ((Devoir 1 + Devoir 2) / 2 + Composition) / 2
                {gradeData.classAverage !== undefined && (
                  <span className="ml-4">
                    | <strong>Moyenne classe actuelle:</strong> {gradeData.classAverage.toFixed(2)}/20
                  </span>
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* ==================== DASHBOARD TAB ==================== */}
      {activeTab === 'dashboard' && (
        <>
          {!selectedClass || !selectedPeriod ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <BarChart3 size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Sélectionnez une classe et une période</h3>
              <p className="text-slate-500">Choisissez une classe et une période pour afficher le dashboard.</p>
            </div>
          ) : dashboard && (
            <div className="space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'Effectif', value: dashboard.classSize, suffix: 'élèves', color: 'blue' },
                  { label: 'Moyenne classe', value: dashboard.generalAverage.toFixed(2), suffix: '/20', color: 'emerald' },
                  { label: 'Taux de réussite', value: dashboard.successRate.toFixed(1), suffix: '%', color: 'amber' },
                  { label: 'Plus haute moy.', value: dashboard.highestAverage.toFixed(2), suffix: '/20', color: 'green' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className={`text-2xl font-bold mt-1 text-${stat.color}-600`}>
                      {stat.value} <span className="text-sm font-normal text-slate-400">{stat.suffix}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Alerts */}
              {strugglingStudents.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="text-red-500" size={20} />
                    <h4 className="font-semibold text-red-800">Élèves en difficulté ({strugglingStudents.length})</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {strugglingStudents.slice(0, 5).map(s => (
                      <span key={s.studentId} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        {s.studentName} ({s.generalAverage.toFixed(1)}/20)
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Moyennes par matière</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboard.subjectAverages}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="subjectName" stroke="#94a3b8" fontSize={11} tickFormatter={v => v.length > 8 ? v.slice(0, 8) + '.' : v} />
                      <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 20]} />
                      <Tooltip formatter={(value) => [Number(value).toFixed(2) + '/20', 'Moyenne']} />
                      <Bar dataKey="classAverage" name="Moyenne classe" radius={[8, 8, 0, 0]}>
                        {dashboard.subjectAverages.map((entry, index) => (
                          <Cell key={index} fill={entry.classAverage >= 14 ? '#10b981' : entry.classAverage >= 10 ? '#f59e0b' : '#ef4444'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Répartition des mentions</h3>
                  {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, value }) => `${name} (${value})`} />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-slate-400">Aucune donnée</div>
                  )}
                </div>
              </div>

              {/* Subject Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-900">Détail par matière</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Matière</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Coeff.</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Moy. classe</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Plus haute</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Plus basse</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard.subjectAverages.map((s) => (
                        <tr key={s.subjectId} className="border-b border-slate-50 hover:bg-slate-50">
                          <td className="px-6 py-3 font-medium text-slate-900">{s.subjectName}</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-600">{s.coefficient}</td>
                          <td className={cn('px-4 py-3 text-center font-semibold', getGradeColor(s.classAverage))}>{s.classAverage.toFixed(2)}</td>
                          <td className="px-4 py-3 text-center text-sm text-emerald-600">{s.highest.toFixed(2)}</td>
                          <td className="px-4 py-3 text-center text-sm text-red-500">{s.lowest.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ==================== BULLETINS TAB ==================== */}
      {activeTab === 'bulletins' && (
        <>
          {!selectedClass || !selectedPeriod ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Award size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Sélectionnez une classe et une période</h3>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Top Students */}
              {topStudents.length > 0 && (
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
                  <h3 className="font-semibold text-amber-800 mb-4">🏆 Top 3 Élèves</h3>
                  <div className="flex gap-4">
                    {topStudents.map((s, i) => (
                      <div key={s.studentId} className={`flex-1 p-4 rounded-xl bg-white ${i === 0 ? 'border-2 border-amber-400' : ''}`}>
                        <p className="text-2xl mb-2">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</p>
                        <p className="font-bold text-slate-800">{s.studentName}</p>
                        <p className={`text-xl font-bold ${getGradeColor(s.generalAverage)}`}>{s.generalAverage.toFixed(2)}/20</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getMention(s.generalAverage).color}`}>
                          {getMention(s.generalAverage).mention}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ranking Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-emerald-50">
                  <h3 className="font-semibold text-emerald-800">
                    Classement — {periods.find(p => p.id === selectedPeriod)?.name} ({bulletins.length} élèves)
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Rang</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Élève</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Mat.</th>
                        <th className="text-center px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Moy. /20</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Mention</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Évol.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulletins.map((student) => (
                        <tr key={student.studentId} className={cn('border-b border-slate-50 hover:bg-slate-50', selectedStudent === student.studentId && 'bg-emerald-50')}>
                          <td className="px-4 py-3 text-center">
                            <span className={cn(
                              'inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
                              student.rank === 1 ? 'bg-amber-100 text-amber-700' :
                              student.rank === 2 ? 'bg-slate-100 text-slate-600' :
                              student.rank === 3 ? 'bg-orange-100 text-orange-700' :
                              'text-slate-500'
                            )}>
                              {student.rank ?? '-'}
                            </span>
                          </td>
                          <td className="px-6 py-3 font-medium text-slate-900">{student.studentName}</td>
                          <td className="px-4 py-3 text-xs text-slate-500 text-center">{student.matricule}</td>
                          <td className={cn('px-6 py-3 text-center font-bold text-lg', getGradeColor(student.generalAverage))}>
                            {student.generalAverage.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getMention(student.generalAverage).color)}>
                              {getMention(student.generalAverage).mention}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button onClick={() => loadEvolution(student.studentId)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-600" title="Voir l'évolution">
                              <TrendingUp size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {bulletins.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                            Aucun bulletin. Cliquez sur "Générer bulletins" pour calculer les moyennes.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Evolution Chart */}
              {selectedStudent && evolutionChartData.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Évolution — {bulletins.find(b => b.studentId === selectedStudent)?.studentName}
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={evolutionChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} />
                      <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} domain={[0, 20]} />
                      <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} reversed />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="Moyenne" stroke="#10b981" strokeWidth={2} dot={{ r: 5 }} />
                      <Line yAxisId="right" type="monotone" dataKey="Rang" stroke="#f59e0b" strokeWidth={2} dot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ==================== VALIDATION TAB ==================== */}
      {activeTab === 'validation' && (
        <ValidationTab classId={selectedClass} periodId={selectedPeriod} />
      )}

      {/* ==================== EXAMS TAB ==================== */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          {/* Exam Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-500 font-medium">Total examens</p>
              <p className="text-2xl font-bold text-slate-800">{exams.length}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
              <p className="text-xs text-indigo-600 font-medium">Compositions</p>
              <p className="text-2xl font-bold text-indigo-700">{exams.filter(e => e.type === 'COMPOSITION').length}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <p className="text-xs text-emerald-600 font-medium">Devoirs</p>
              <p className="text-2xl font-bold text-emerald-700">{exams.filter(e => e.type === 'DEVOIR').length}</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <p className="text-xs text-amber-600 font-medium">À venir</p>
              <p className="text-2xl font-bold text-amber-700">{exams.filter(e => new Date(e.date) > new Date()).length}</p>
            </div>
          </div>

          {/* Create Exam Button */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-800">Gestion des examens</h3>
            <button onClick={() => handleOpenExamModal()} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-indigo-700">
              <Plus size={16} /> Créer un examen
            </button>
          </div>

          {/* Exams List */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Nom</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Matière</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Note/20</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Coeff.</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.map(exam => (
                    <tr key={exam.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-3 font-medium text-slate-800">{exam.name}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          exam.type === 'COMPOSITION' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {exam.type === 'COMPOSITION' ? 'Composition' : 'Devoir'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{exam.subjectName}</td>
                      <td className="px-4 py-3 text-center text-sm text-slate-600">{new Date(exam.date).toLocaleDateString('fr-FR')}</td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-800">{exam.maxScore}/20</td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-800">{exam.coefficient}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => handleOpenExamModal(exam)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600">
                            <Edit size={14} />
                          </button>
                          <button onClick={() => handleDeleteExam(exam.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {exams.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                        Aucun examen créé. Cliquez sur "Créer un examen" pour commencer.
                      </td>
                    </tr>
                  )}
                </tbody>
                  </table>
                </div>
                <Pagination currentPage={gradesPage} totalPages={gradesTotalPages} onPageChange={setGradesPage} />
              </div>
        </div>
      )}

      {/* ==================== GRADING SCALE TAB ==================== */}
      {activeTab === 'grading' && (
        <div className="space-y-4">
          {/* Grading Scale Header */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Échelle de notation personnalisée</h3>
              <p className="text-sm text-slate-500">Configurez les mentions et leurs seuils pour votre établissement</p>
            </div>
            <button onClick={handleOpenGradingModal} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-indigo-700">
              <Settings size={16} /> Configurer
            </button>
          </div>

          {/* Current Scale Preview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h4 className="font-semibold text-slate-700 mb-4">Mention actuelle</h4>
            <div className="space-y-2">
              {gradingScale.map((level, idx) => (
                <div key={level.id} className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <div className="w-12 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: level.color }}>
                      {level.minScore}-{level.maxScore}
                    </div>
                    <span className="font-semibold text-slate-800">{level.mention}</span>
                  </div>
                  <div className="w-2 h-6 bg-slate-200 rounded-full overflow-hidden relative">
                    <div className="absolute inset-y-0 right-0 bg-slate-400" style={{ width: `${100 - ((level.minScore / 20) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <p className="text-xs text-emerald-600 font-medium">Seuil de réussite</p>
              <p className="text-2xl font-bold text-emerald-700">10/20</p>
              <p className="text-xs text-emerald-600">Minimum pour passer</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
              <p className="text-xs text-indigo-600 font-medium">Mention max</p>
              <p className="text-2xl font-bold text-indigo-700">Excellent</p>
              <p className="text-xs text-indigo-600">16/20 et plus</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <p className="text-xs text-red-600 font-medium">Mention min</p>
              <p className="text-2xl font-bold text-red-700">Insuffisant</p>
              <p className="text-xs text-red-600">Moins de 8/20</p>
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
              <button onClick={() => {
                const entries = gradeData?.entries || [];
                const columns: ExportColumn[] = [
                  { header: 'Élève', key: 'studentName', width: 24 },
                  { header: 'Matière', key: 'subjectName', width: 20 },
                  { header: 'Note', key: 'score', width: 10 },
                  { header: 'Sur', key: 'maxScore', width: 8 },
                  { header: 'Type', key: 'gradeType', width: 14 },
                  { header: 'Coeff.', key: 'coefficient', width: 10 },
                ];
                const data = entries.map((e: any) => ({
                  studentName: e.studentName || '',
                  subjectName: e.subjectName || '',
                  score: e.score ?? '',
                  maxScore: e.maxScore ?? 20,
                  gradeType: e.gradeType || '',
                  coefficient: e.coefficient ?? 1,
                }));
                exportToFile(data, columns, `notes_${new Date().toISOString().split('T')[0]}`, 'excel', undefined, exportBranding);
                showToast('Export Excel prêt', 'success');
                setShowExport(false);
              }} className="w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-emerald-500 text-white rounded-lg"><FileSpreadsheet size={24} /></div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Export Excel</p>
                  <p className="text-xs text-slate-500">Format .xlsx avec classements</p>
                </div>
              </button>
              <button onClick={() => {
                const entries = gradeData?.entries || [];
                const columns: ExportColumn[] = [
                  { header: 'Élève', key: 'studentName', width: 24 },
                  { header: 'Matière', key: 'subjectName', width: 20 },
                  { header: 'Note', key: 'score', width: 10 },
                  { header: 'Sur', key: 'maxScore', width: 8 },
                  { header: 'Type', key: 'gradeType', width: 14 },
                ];
                const data = entries.map((e: any) => ({
                  studentName: e.studentName || '',
                  subjectName: e.subjectName || '',
                  score: e.score ?? '',
                  maxScore: e.maxScore ?? 20,
                  gradeType: e.gradeType || '',
                }));
                exportToFile(data, columns, `notes_${new Date().toISOString().split('T')[0]}`, 'pdf', { title: 'Bulletins de Notes', subtitle: `${gradeData?.subjectName || ''} — ${classes.find(c => c.id === selectedClass)?.name || ''}` }, exportBranding);
                showToast('Export PDF prêt', 'success');
                setShowExport(false);
              }} className="w-full p-4 bg-red-50 hover:bg-red-100 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-red-500 text-white rounded-lg"><FileText size={24} /></div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Export PDF</p>
                  <p className="text-xs text-slate-500">Rapport imprimable</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImport && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Importer des notes</h3>
              <button onClick={() => setShowImport(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById('grades-file-input')?.click()}>
                <Upload size={32} className="mx-auto text-slate-400 mb-2" />
                <p className="font-medium text-slate-600">Glissez votre fichier ici</p>
                <p className="text-sm text-slate-400 mt-1">ou cliquez pour parcourir</p>
                <p className="text-xs text-slate-400 mt-2">Format: .xlsx, .csv</p>
                <input
                  id="grades-file-input"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const { parseImportFile } = await import('@/lib/export-utils');
                      const rows = await parseImportFile(file);
                      if (rows.length === 0) {
                        showToast('Fichier vide ou invalide', 'error');
                        return;
                      }
                      showToast(`${rows.length} lignes importées. Fonctionnalité complète bientôt disponible.`, 'success');
                      setShowImport(false);
                    } catch (err: any) {
                      showToast('Erreur d\'import: ' + err.message, 'error');
                    }
                  }}
                />
              </div>
              <button onClick={() => {
                document.getElementById('grades-file-input')?.click();
              }} className="w-full py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600">
                Importer
              </button>
              <p className="text-xs text-slate-400 text-center">
                Colonnes attendues: nom, prenom, matiere, note, note_max, type
              </p>
            </div>
          </div>
        </div>
      )}

      {/* EXAM MODAL */}
      {showExamModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">{editingExam ? 'Modifier l\'examen' : 'Créer un examen'}</h3>
              <button onClick={() => setShowExamModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Nom de l'examen *</label>
                <input
                  type="text"
                  value={examForm.name}
                  onChange={(e) => setExamForm({ ...examForm, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                  placeholder="Ex: Composition du 1er trimestre"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Type *</label>
                  <select
                    value={examForm.type}
                    onChange={(e) => setExamForm({ ...examForm, type: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                  >
                    <option value="DEVOIR">Devoir</option>
                    <option value="COMPOSITION">Composition</option>
                    <option value="EXAM">Examen</option>
                    <option value="PROJECT">Projet</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Matière *</label>
                  <select
                    value={examForm.subjectId}
                    onChange={(e) => setExamForm({ ...examForm, subjectId: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                  >
                    <option value="">Sélectionner</option>
                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Date *</label>
                  <input
                    type="date"
                    value={examForm.date}
                    onChange={(e) => setExamForm({ ...examForm, date: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Note sur</label>
                  <input
                    type="number"
                    value={examForm.maxScore}
                    onChange={(e) => setExamForm({ ...examForm, maxScore: parseFloat(e.target.value) || 20 })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                    min={1}
                    max={100}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Coefficient</label>
                  <input
                    type="number"
                    value={examForm.coefficient}
                    onChange={(e) => setExamForm({ ...examForm, coefficient: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                    min={1}
                    max={10}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Description</label>
                <textarea
                  value={examForm.description}
                  onChange={(e) => setExamForm({ ...examForm, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm resize-none"
                  rows={3}
                  placeholder="Description optionnelle..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowExamModal(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">
                Annuler
              </button>
              <button onClick={handleSaveExam} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700">
                {editingExam ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GRADING SCALE MODAL */}
      {showGradingModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Configurer l'échelle de notation</h3>
                <p className="text-sm text-slate-500">Personnalisez les mentions et leurs seuils</p>
              </div>
              <button onClick={() => setShowGradingModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              {gradingScale.map((level, idx) => (
                <div key={level.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: level.color }}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 uppercase mb-1 block">Mention</label>
                      <input
                        type="text"
                        value={level.mention}
                        onChange={(e) => handleUpdateGradingLevel(level.id, 'mention', e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 uppercase mb-1 block">Min</label>
                      <input
                        type="number"
                        value={level.minScore}
                        onChange={(e) => handleUpdateGradingLevel(level.id, 'minScore', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm"
                        min={0}
                        max={20}
                        step={0.5}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 uppercase mb-1 block">Max</label>
                      <input
                        type="number"
                        value={level.maxScore}
                        onChange={(e) => handleUpdateGradingLevel(level.id, 'maxScore', parseFloat(e.target.value) || 20)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm"
                        min={0}
                        max={20}
                        step={0.5}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 uppercase mb-1 block">Couleur</label>
                      <input
                        type="color"
                        value={level.color}
                        onChange={(e) => handleUpdateGradingLevel(level.id, 'color', e.target.value)}
                        className="w-full h-9 bg-white rounded-lg border border-slate-200 cursor-pointer"
                      />
                    </div>
                  </div>
                  <button onClick={() => handleDeleteGradingLevel(level.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <button onClick={handleAddGradingLevel} className="mt-4 w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-indigo-400 hover:text-indigo-600 flex items-center justify-center gap-2">
              <Plus size={18} /> Ajouter un niveau
            </button>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowGradingModal(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">
                Annuler
              </button>
              <button onClick={handleSaveGradingScale} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700">
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}

function ValidationTab({ classId, periodId }: { classId: string; periodId: string }) {
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editScore, setEditScore] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (classId) loadGrades();
  }, [classId]);

  async function loadGrades() {
    setLoading(true);
    try {
      const data = await sbGrades.getUnvalidated(classId);
      setGrades(data);
    } catch (err) {
      
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(gradeId: string) {
    setSaving(true);
    try {
      await sbGrades.update(gradeId, { score: parseFloat(editScore) });
      setEditingId(null);
      await loadGrades();
    } catch (err) {
      
    } finally {
      setSaving(false);
    }
  }

  async function handleValidate(gradeId: string) {
    try {
      await sbGrades.validate(gradeId);
      await loadGrades();
    } catch (err) {
      
    }
  }

  if (loading) return <div className="text-center py-8 text-slate-400"><Loader2 size={24} className="animate-spin mx-auto" /></div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-amber-50">
        <h3 className="font-semibold text-amber-800">Notes en attente de validation ({grades.length})</h3>
      </div>
      {grades.length === 0 ? (
        <div className="px-6 py-12 text-center text-slate-400">
          <CheckCircle size={48} className="mx-auto text-emerald-300 mb-4" />
          Toutes les notes sont validées !
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {grades.map((grade) => (
            <div key={grade.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm', getGradeBg(grade.score), getGradeColor(grade.score))}>
                  {grade.score.toFixed(1)}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{grade.student?.user?.name || '—'}</p>
                  <p className="text-xs text-slate-500">
                    {grade.subject?.name} — {grade.gradeType} — Coeff. {grade.coefficient}
                    {grade.bonus > 0 && ` — Bonus +${grade.bonus}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {editingId === grade.id ? (
                  <>
                    <input type="number" value={editScore} onChange={(e) => setEditScore(e.target.value)} className="w-20 px-2 py-1.5 rounded-lg border border-slate-200 text-sm text-center" min={0} max={grade.maxScore} step={0.5} />
                    <span className="text-xs text-slate-400">/ {grade.maxScore}</span>
                    <button onClick={() => handleUpdate(grade.id)} disabled={saving} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium">OK</button>
                    <button onClick={() => setEditingId(null)} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">Annuler</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setEditingId(grade.id); setEditScore(String(grade.score)); }} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200">Modifier</button>
                    <button onClick={() => handleValidate(grade.id)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 flex items-center gap-1">
                      <CheckCircle size={14} /> Valider
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
