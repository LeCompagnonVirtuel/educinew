'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbClasses, sbStudents, sbGrades } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { getInitials, getGradeColor } from '@/lib/utils';
import {
  Save, X, TrendingUp, BarChart3, Lightbulb,
} from 'lucide-react';

export default function GradeEntryPage() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [assessmentType, setAssessmentType] = useState('midterm');
  const [grades, setGrades] = useState<Record<string, number | null>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentTeacherId, setCurrentTeacherId] = useState<string | null>(null);

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const ge = t.gradeEntry;

  useEffect(() => {
    if (!user?.schoolId) return;
    Promise.allSettled([
      sbClasses.list(user.schoolId),
      import('@/lib/api').then(m => m.sbSubjects.list(user.schoolId)),
    ]).then(([classesRes, subjectsRes]) => {
      setClasses(classesRes.status === 'fulfilled' ? classesRes.value : []);
      setSubjects(subjectsRes.status === 'fulfilled' ? subjectsRes.value : []);
      setLoading(false);
    });
    if (user.role === 'TEACHER') {
      import('@/lib/api/shared').then(({ getSupabase }) => {
        const supabase = getSupabase();
        supabase.from('teachers').select('id').eq('user_id', user.id).single()
          .then(({ data }: { data: any }) => { if (data) setCurrentTeacherId(data.id); });
      });
    }
  }, [user]);

  useEffect(() => {
    if (selectedClass) {
      sbStudents.list(user?.schoolId).then((all) => {
        const classStudents = all.filter((s: any) => s.classId === selectedClass);
        setStudents(classStudents);
        const initial: Record<string, number | null> = {};
        classStudents.forEach((s: any) => { initial[s.id] = null; });
        setGrades(initial);
      }).catch(() => {});
    }
  }, [selectedClass, user]);

  const gradedCount = Object.values(grades).filter((v) => v !== null).length;
  const totalStudents = students.length;
  const gradedValues = Object.values(grades).filter((v): v is number => v !== null);
  const classAverage = gradedValues.length > 0
    ? (gradedValues.reduce((a, b) => a + b, 0) / gradedValues.length).toFixed(1)
    : '—';

  // Grade distribution for chart
  const distribution = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  gradedValues.forEach((score) => {
    if (score >= 16) distribution.A++;
    else if (score >= 14) distribution.B++;
    else if (score >= 10) distribution.C++;
    else if (score >= 8) distribution.D++;
    else distribution.F++;
  });
  const maxDist = Math.max(...Object.values(distribution), 1);

  const handleGradeChange = (studentId: string, value: string) => {
    const num = value === '' ? null : Math.min(20, Math.max(0, parseFloat(value)));
    setGrades((prev) => ({ ...prev, [studentId]: num }));
  };

  const handleSave = async () => {
    if (!selectedSubject) {
      showToast(lang === 'fr' ? 'Veuillez sélectionner une matière.' : 'Please select a subject.', 'error');
      return;
    }
    const gradesToSave = Object.entries(grades)
      .filter(([, score]) => score !== null)
      .map(([studentId, score]) => ({
        studentId,
        subjectId: selectedSubject,
        score: score as number,
        gradeType: assessmentType === 'final' ? 'COMPOSITION' : 'DEVOIR',
        teacherId: currentTeacherId,
      }));

    if (gradesToSave.length === 0) {
      showToast(lang === 'fr' ? 'Aucune note à enregistrer.' : 'No grades to save.', 'error');
      return;
    }

    setSaving(true);
    try {
      await sbGrades.createBulk(gradesToSave);
      showToast(lang === 'fr' ? `${gradesToSave.length} notes enregistrées !` : `${gradesToSave.length} grades saved!`, 'success');
    } catch (err: any) {
      showToast(err.message || (lang === 'fr' ? 'Erreur lors de l\'enregistrement' : 'Error saving grades'), 'error');
    } finally {
      setSaving(false);
    }
  };

  const assessmentOptions = [
    { value: 'midterm', label: ge.midtermQuiz },
    { value: 'final', label: ge.finalExam },
    { value: 'lab', label: ge.practicalLab },
    { value: 'monthly', label: ge.monthlyTest },
  ];

  return (
    <RoleLayout role="teacher" breadcrumbs={[{ label: lang === 'fr' ? 'Enseignant' : 'Teacher' }, { label: ge.title }]}>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' :
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <section className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#191c1d] mb-2">{ge.title}</h2>
        <p className="text-[#464555]">{ge.subtitle}</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Filters & List */}
        <div className="lg:col-span-8 space-y-6">
          {/* Filters */}
          <div className="bg-[#edeeef] rounded-xl p-6 flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-0 sm:min-w-[240px]">
              <label className="block text-[#464555] font-medium text-[11px] uppercase tracking-wider mb-2">
                {ge.classSection}
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-white border-none rounded-lg p-3 text-[#191c1d] focus:ring-2 focus:ring-[#3525cd]/40 transition-all"
              >
                <option value="">{lang === 'fr' ? 'Sélectionner...' : 'Select...'}</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-0 sm:min-w-[240px]">
              <label className="block text-[#464555] font-medium text-[11px] uppercase tracking-wider mb-2">
                {lang === 'fr' ? 'Matière' : 'Subject'}
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-white border-none rounded-lg p-3 text-[#191c1d] focus:ring-2 focus:ring-[#3525cd]/40 transition-all"
              >
                <option value="">{lang === 'fr' ? 'Sélectionner...' : 'Select...'}</option>
                {subjects.map((sub: any) => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-0 sm:min-w-[240px]">
              <label className="block text-[#464555] font-medium text-[11px] uppercase tracking-wider mb-2">
                {ge.assessmentType}
              </label>
              <select
                value={assessmentType}
                onChange={(e) => setAssessmentType(e.target.value)}
                className="w-full bg-white border-none rounded-lg p-3 text-[#191c1d] focus:ring-2 focus:ring-[#3525cd]/40 transition-all"
              >
                {assessmentOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Grading List */}
          {selectedClass ? (
            <div className="bg-white rounded-xl p-4 shadow-card">
              <div className="flex justify-between items-center mb-6 px-2">
                <h3 className="font-bold text-lg text-[#191c1d]">
                  {ge.studentList} ({students.length})
                </h3>
              </div>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-lg hover:bg-[#edeeef] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#d4e3ff] flex items-center justify-center font-bold text-[#0060ac] text-sm">
                        {getInitials(student.user?.name || '?')}
                      </div>
                      <div>
                        <p className="font-semibold text-[#191c1d]">{student.user?.name}</p>
                        <p className="text-xs text-[#464555]">ID: {student.matricule}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={grades[student.id] ?? ''}
                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                        className="w-20 bg-white border-none rounded-lg p-2 text-center font-bold text-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/40"
                        placeholder="--"
                      />
                      <span className="text-[#464555] text-sm font-medium">{ge.outOf} 20</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end gap-4 p-2">
                <button onClick={() => { const initial: Record<string, number | null> = {}; students.forEach((s: any) => { initial[s.id] = null; }); setGrades(initial); }} className="px-8 py-3 rounded-lg text-[#3525cd] font-semibold hover:bg-[#3525cd]/5 transition-colors">
                  {ge.discardChanges}
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-10 py-3 rounded-lg bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-bold shadow-lg shadow-indigo-200 hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
                >
                  <Save size={18} />
                  {saving ? (lang === 'fr' ? 'Enregistrement...' : 'Saving...') : ge.saveGrades}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 shadow-card text-center">
              <BarChart3 size={48} className="mx-auto text-[#c7c4d8] mb-4" />
              <h3 className="text-lg font-semibold text-[#191c1d] mb-2">
                {lang === 'fr' ? 'Sélectionnez une classe' : 'Select a class'}
              </h3>
              <p className="text-[#464555]">
                {lang === 'fr' ? 'Choisissez une classe pour saisir les notes.' : 'Choose a class to enter grades.'}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Insights */}
        <div className="lg:col-span-4 space-y-6">
          {/* Performance Insights */}
          <div className="bg-white rounded-xl p-6 shadow-card border border-[#c7c4d8]/15">
            <h3 className="font-bold text-xl text-[#191c1d] mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-[#3525cd]" />
              {ge.performanceInsights}
            </h3>
            <div className="flex items-center justify-between p-5 bg-[#e2dfff] rounded-xl mb-6">
              <div>
                <p className="text-[11px] font-bold text-[#3525cd] uppercase tracking-widest mb-1">{ge.classAverage}</p>
                <p className="text-4xl font-extrabold text-[#3525cd]">
                  {classAverage}<span className="text-xl font-semibold opacity-60">/20</span>
                </p>
              </div>
              <div className="bg-white/50 p-2 rounded-lg">
                <TrendingUp size={28} className="text-[#3525cd]" />
              </div>
            </div>

            {/* Grade Distribution */}
            <div className="space-y-4">
              <p className="text-sm font-bold text-[#464555] uppercase tracking-widest">{ge.gradeDistribution}</p>
              <div className="flex items-end gap-2 h-40 pt-4 px-2">
                {(['F', 'D', 'C', 'B', 'A'] as const).map((grade) => {
                  const colors: Record<string, string> = { A: '#3525cd', B: '#c3c0ff', C: '#64a8fe', D: '#7e3000', F: '#ba1a1a' };
                  const height = maxDist > 0 ? (distribution[grade] / maxDist) * 100 : 0;
                  return (
                    <div key={grade} className="flex-1 bg-[#edeeef] rounded-t-lg relative group">
                      <div
                        className="absolute bottom-0 w-full rounded-t-lg transition-all"
                        style={{ backgroundColor: colors[grade], height: `${Math.max(height, 5)}%` }}
                      />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#464555]">
                        {grade}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 pt-6 border-t border-[#edeeef]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-[#464555]">{ge.studentsGraded}</span>
                  <span className="font-bold text-[#191c1d]">{gradedCount} / {totalStudents}</span>
                </div>
                <div className="w-full h-2 bg-[#edeeef] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3525cd] rounded-full transition-all"
                    style={{ width: `${totalStudents > 0 ? (gradedCount / totalStudents) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="p-6 bg-[#d4e3ff]/30 rounded-xl border border-[#a4c9ff]/20">
            <p className="text-sm text-[#003c70] leading-relaxed">
              <span className="font-bold">
                {lang === 'fr' ? 'Astuce :' : 'Pro Tip:'}
              </span>{' '}
              {ge.proTip}
            </p>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
