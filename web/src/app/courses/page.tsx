'use client';

import { useState, useEffect } from 'react';
import {
  BookOpen, Brain, FileQuestion, GraduationCap, ChevronRight, Clock, Award, Target,
  Plus, Search, Users, Eye, Edit, Trash2, Send, X, Save, Video, FileText, Link2,
  ClipboardList, BookMarked, MoreVertical, AlertTriangle, CheckCircle, Loader2
} from 'lucide-react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { sbSubjects, sbClasses, sbTeachers } from '@/lib/api';
import { getSupabase } from '@/lib/api/shared';
import { cn } from '@/lib/utils';

const SUBJECT_ICONS: Record<string, string> = {
  Mathématiques: '📐', Mathematics: '📐', Maths: '📐',
  Français: '📝', French: '📝',
  Anglais: '🇬🇧', English: '🇬🇧',
  'Sciences Physiques': '⚡', Physics: '⚡',
  SVT: '🧬', Biology: '🧬',
  'Histoire-Géo': '🌍', History: '🌍', Geography: '🗺️',
  Informatique: '💻', 'Computer Science': '💻',
  EPS: '⚽', Sport: '⚽',
};

const SUBJECT_COLORS: Record<string, string> = {
  Mathématiques: 'from-blue-500 to-blue-600', Mathematics: 'from-blue-500 to-blue-600',
  Français: 'from-emerald-500 to-emerald-600', French: 'from-emerald-500 to-emerald-600',
  Anglais: 'from-purple-500 to-purple-600', English: 'from-purple-500 to-purple-600',
  'Sciences Physiques': 'from-amber-500 to-amber-600', Physics: 'from-amber-500 to-amber-600',
  SVT: 'from-green-500 to-green-600', Biology: 'from-green-500 to-green-600',
  'Histoire-Géo': 'from-rose-500 to-rose-600', History: 'from-rose-500 to-rose-600',
  Informatique: 'from-cyan-500 to-cyan-600', 'Computer Science': 'from-cyan-500 to-cyan-600',
  EPS: 'from-orange-500 to-orange-600', Sport: 'from-orange-500 to-orange-600',
};

const DEFAULT_SUBJECTS = [
  { name: 'Mathématiques', icon: '📐', color: 'from-blue-500 to-blue-600', lessons: 42, hours: 28 },
  { name: 'Français', icon: '📝', color: 'from-emerald-500 to-emerald-600', lessons: 38, hours: 24 },
  { name: 'Anglais', icon: '🇬🇧', color: 'from-purple-500 to-purple-600', lessons: 30, hours: 18 },
  { name: 'Sciences Physiques', icon: '⚡', color: 'from-amber-500 to-amber-600', lessons: 25, hours: 16 },
  { name: 'SVT', icon: '🧬', color: 'from-green-500 to-green-600', lessons: 22, hours: 14 },
  { name: 'Histoire-Géo', icon: '🌍', color: 'from-rose-500 to-rose-600', lessons: 20, hours: 12 },
  { name: 'Informatique', icon: '💻', color: 'from-cyan-500 to-cyan-600', lessons: 18, hours: 10 },
  { name: 'EPS', icon: '⚽', color: 'from-orange-500 to-orange-600', lessons: 15, hours: 8 },
];

interface TeacherCourse {
  id: string;
  title: string;
  description: string;
  classId: string;
  subjectId: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  class?: { name: string };
  subject?: { name: string };
  teacher?: { user: { name: string } };
  modules: { id: string; title: string; lessons: { id: string; title: string; type: string }[] }[];
}


export default function CoursesPage() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  const isTeacher = user?.role === 'TEACHER' || user?.role === 'CENSEUR';
  const canManage = isAdmin || isTeacher;
  
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [subjectsList, setSubjectsList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<TeacherCourse | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '', description: '', classId: '', subjectId: '', teacherId: '', status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  });
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (user?.schoolId) loadData();
  }, [user?.schoolId]);

  const loadData = async () => {
    if (!user?.schoolId) return;
    setLoading(true);
    try {
      const supabase = getSupabase();
      const [subjectsData, classesData, teachersData, classSubjectsRes] = await Promise.all([
        sbSubjects.list(user.schoolId),
        sbClasses.list(user.schoolId),
        sbTeachers.list(user.schoolId),
        supabase.from('class_subjects').select('*, subject:subjects(*), class:classes!inner(*), teacher:teachers(*, user:users(*))').eq('class.school_id', user.schoolId),
      ]);
      if (Array.isArray(subjectsData)) {
        setSubjectsList(subjectsData);
        setSubjects(subjectsData.map((s: any) => ({
          name: s.name,
          icon: SUBJECT_ICONS[s.name] || '📖',
          color: SUBJECT_COLORS[s.name] || 'from-slate-500 to-slate-600',
          lessons: s.coefficient * 10 || 20,
          hours: s.coefficient * 6 || 12,
        })));
      }
      setClasses(classesData || []);
      setTeachers(teachersData || []);

      const csData = classSubjectsRes.data || [];
      const mappedCourses: TeacherCourse[] = csData.map((cs: any) => ({
        id: cs.id,
        title: `${cs.subject?.name || 'Matière'} — ${cs.class?.name || 'Classe'}`,
        description: cs.teacher?.user?.name ? `Enseignant: ${cs.teacher.user.name}` : '',
        classId: cs.class_id,
        subjectId: cs.subject_id,
        status: 'PUBLISHED',
        createdAt: cs.class?.created_at?.split('T')[0] || '',
        class: cs.class ? { name: cs.class.name } : undefined,
        subject: cs.subject ? { name: cs.subject.name } : undefined,
        teacher: cs.teacher ? { user: { name: cs.teacher.user?.name || '' } } : undefined,
        modules: [] as { id: string; title: string; lessons: { id: string; title: string; type: string }[] }[],
      }));
      setCourses(mappedCourses);
    } catch (err) { console.error('Error loading courses:', err); }
    setLoading(false);
  };

  const handleCreateCourse = async () => {
    if (!form.classId || !form.subjectId) {
      showToast('Veuillez sélectionner une classe et une matière', 'error');
      return;
    }
    setSaving(true);
    try {
      const supabase = getSupabase();
      const payload: any = {
        class_id: form.classId,
        subject_id: form.subjectId,
      };
      if (form.teacherId) payload.teacher_id = form.teacherId;

      if (editingCourseId) {
        const { error } = await supabase
          .from('class_subjects')
          .update(payload)
          .eq('id', editingCourseId);
        if (error) throw error;
        showToast('Attribution modifiée avec succès');
      } else {
        const { error } = await supabase.from('class_subjects').insert(payload);
        if (error) throw error;
        showToast('Attribution créée avec succès');
      }

      setShowCreate(false);
      setEditingCourseId(null);
      setForm({ title: '', description: '', classId: '', subjectId: '', teacherId: '', status: 'DRAFT' });
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Erreur', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEditCourse = (course: TeacherCourse) => {
    setEditingCourseId(course.id);
    setForm({
      title: course.title,
      description: course.description || '',
      classId: course.classId,
      subjectId: course.subjectId,
      teacherId: (course.teacher as any)?.id || '',
      status: course.status,
    });
    setShowCreate(true);
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette attribution?')) return;
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('class_subjects').delete().eq('id', id);
      if (error) throw error;
      setCourses(courses.filter(c => c.id !== id));
      showToast('Attribution supprimée');
    } catch (err: any) {
      showToast(err.message || 'Erreur', 'error');
    }
  };

  const handlePublish = (_id: string) => {
    showToast('Toutes les attributions sont actives', 'info');
  };

  const filteredCourses = courses.filter(c => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const examCategories = [
    { name: 'CEPE', description: lang === 'fr' ? 'Certificat d\'études primaires' : 'Primary school certificate', icon: GraduationCap, color: 'bg-blue-500', questions: 500 },
    { name: 'BEPC', description: lang === 'fr' ? 'Brevet d\'études du premier cycle' : 'Junior secondary certificate', icon: Award, color: 'bg-purple-500', questions: 800 },
    { name: 'BAC', description: lang === 'fr' ? 'Baccalauréat' : 'Baccalaureate', icon: Target, color: 'bg-emerald-500', questions: 1200 },
  ];

  return (
    <RoleLayout role="admin">
      {toast && (
        <div className={cn('fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold', toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white')}>
          {toast.msg}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{lang === 'fr' ? 'Cours & Révisions' : 'Courses & Reviews'}</h1>
            <p className="text-slate-500 mt-1">{lang === 'fr' ? 'Accédez à vos cours et préparez vos examens' : 'Access your courses and prepare for exams'}</p>
          </div>
          {canManage && (
            <button onClick={() => setShowCreate(true)} className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-indigo-700">
              <Plus size={16} /> Attribuer une matière
            </button>
          )}
        </div>

        {/* Admin Course Management */}
        {canManage && (
          <>
            <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-sm" />
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={32} className="animate-spin text-indigo-500" />
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <BookOpen size={48} className="mx-auto mb-3 text-slate-300" />
                <p>Aucune attribution de matière</p>
              </div>
            ) : (
            <div className="space-y-3">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-white rounded-xl p-4 border border-slate-100 hover:border-indigo-200 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', course.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                          {course.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                        </span>
                        <span className="text-xs text-slate-400">{course.subject?.name}</span>
                      </div>
                      <h3 className="font-bold text-slate-900">{course.title}</h3>
                      <p className="text-sm text-slate-500">{course.class?.name} • {course.modules.length} modules</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setSelectedCourse(course); setShowDetail(true); }} className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleEditCourse(course)} className="p-2 hover:bg-amber-50 rounded-lg text-amber-600">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDeleteCourse(course.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </>
        )}

        {/* Exam Categories */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">{lang === 'fr' ? 'Préparation aux examens' : 'Exam Preparation'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {examCategories.map((exam) => (
              <button key={exam.name} onClick={() => setSelectedCategory(exam.name)}
                className={cn('bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all text-left group', selectedCategory === exam.name && 'ring-2 ring-emerald-500')}>
                <div className="flex items-center justify-between mb-3">
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-white', exam.color)}>
                    <exam.icon size={24} />
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{exam.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{exam.description}</p>
                <div className="mt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><FileQuestion size={12} />{exam.questions} questions</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Grid */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">{lang === 'fr' ? 'Matières' : 'Subjects'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <button key={subject.name} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all text-left group">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br mb-3', subject.color)}>
                  {subject.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{subject.name}</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><BookOpen size={10} />{subject.lessons} leçons</span>
                  <span className="flex items-center gap-1"><Clock size={10} />{subject.hours}h</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* AI Section */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Brain size={24} /></div>
            <div>
              <h3 className="text-lg font-bold">EduCI AI — {lang === 'fr' ? 'Assistant de révision' : 'Study Assistant'}</h3>
              <p className="text-emerald-100 text-sm">{lang === 'fr' ? 'Pose tes questions, génère des quiz' : 'Ask questions, generate quizzes'}</p>
            </div>
          </div>
          <a href="/ai" className="inline-flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-emerald-50">
            {lang === 'fr' ? 'Ouvrir' : 'Open'} <ChevronRight size={16} />
          </a>
        </div>
      </div>

      {/* Create Course Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => { setShowCreate(false); setEditingCourseId(null); }}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">{editingCourseId ? 'Modifier l\'attribution' : 'Attribuer une matière'}</h3>
              <button onClick={() => { setShowCreate(false); setEditingCourseId(null); }} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Classe *</label>
                <select value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm">
                  <option value="">Sélectionner une classe</option>
                  {classes.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Matière *</label>
                <select value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm">
                  <option value="">Sélectionner une matière</option>
                  {subjectsList.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Enseignant (optionnel)</label>
                <select value={form.teacherId} onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm">
                  <option value="">Sélectionner un enseignant</option>
                  {teachers.map((t: any) => <option key={t.id} value={t.id}>{t.user?.name || 'Enseignant'}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowCreate(false); setEditingCourseId(null); }} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl">Annuler</button>
              <button onClick={handleCreateCourse} disabled={saving} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {editingCourseId ? 'Enregistrer' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Detail Modal */}
      {showDetail && selectedCourse && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowDetail(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{selectedCourse.title}</h3>
              <button onClick={() => setShowDetail(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <p className="text-slate-600 mb-4">{selectedCourse.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold">{selectedCourse.modules.length}</p>
                <p className="text-xs text-slate-500">Modules</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold">{selectedCourse.modules.reduce((a, m) => a + m.lessons.length, 0)}</p>
                <p className="text-xs text-slate-500">Leçons</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold">0</p>
                <p className="text-xs text-slate-500">Devoirs</p>
              </div>
            </div>
            <button onClick={() => setShowDetail(false)} className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl">
              Fermer
            </button>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
