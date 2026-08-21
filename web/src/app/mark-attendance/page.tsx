'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbClasses, sbStudents, sbAttendance } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { getInitials } from '@/lib/utils';
import {
  CheckCircle, XCircle, Clock, Upload, User, ChevronDown,
} from 'lucide-react';

export default function MarkAttendancePage() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [classes, setClasses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [attendance, setAttendance] = useState<Record<string, 'PRESENT' | 'ABSENT' | 'LATE' | null>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const ma = t.markAttendance;

  useEffect(() => {
    if (!user?.schoolId) return;
    sbClasses.list(user.schoolId).then(setClasses).catch(() => {});
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (selectedClass) {
      sbStudents.list(user?.schoolId).then((all) => {
        const classStudents = all.filter((s: any) => s.classId === selectedClass);
        setStudents(classStudents);
        const initial: Record<string, 'PRESENT' | 'ABSENT' | 'LATE' | null> = {};
        classStudents.forEach((s: any) => { initial[s.id] = null; });
        setAttendance(initial);
      }).catch(() => {});
    }
  }, [selectedClass, user]);

  const markedCount = Object.values(attendance).filter((v) => v !== null).length;
  const totalCount = students.length;
  const progress = totalCount > 0 ? Math.round((markedCount / totalCount) * 100) : 0;

  const handleMark = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const records = Object.entries(attendance)
        .filter(([, status]) => status !== null)
        .map(([studentId, status]) => ({
          studentId,
          status,
          date: today,
        }));

      if (records.length === 0) {
        showToast(lang === 'fr' ? 'Veuillez marquer au moins un élève.' : 'Please mark at least one student.', 'error');
        return;
      }

      await sbAttendance.createBulk(records);

      showToast(lang === 'fr' ? 'Présences enregistrées avec succès !' : 'Attendance saved successfully!', 'success');
      const initial: Record<string, 'PRESENT' | 'ABSENT' | 'LATE' | null> = {};
      students.forEach((s: any) => { initial[s.id] = null; });
      setAttendance(initial);
    } catch (err: any) {
      showToast(err?.message || (lang === 'fr' ? 'Erreur lors de l\'enregistrement.' : 'Error saving attendance.'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const statusButtons = [
    { status: 'PRESENT' as const, label: ma.present, color: 'bg-emerald-50 text-emerald-700 border-emerald-500', hoverColor: 'hover:bg-emerald-50 hover:text-emerald-700' },
    { status: 'ABSENT' as const, label: ma.absent, color: 'bg-red-50 text-red-700 border-red-500', hoverColor: 'hover:bg-red-50 hover:text-red-700' },
    { status: 'LATE' as const, label: ma.late, color: 'bg-orange-50 text-orange-700 border-orange-500', hoverColor: 'hover:bg-orange-50 hover:text-orange-700' },
  ];

  return (
    <RoleLayout role="teacher" breadcrumbs={[{ label: lang === 'fr' ? 'Enseignant' : 'Teacher' }, { label: ma.title }]}>
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
        <span className="text-[#464555] font-medium text-sm uppercase tracking-wide">
          {ma.currentSession}
        </span>
        <h1 className="text-3xl font-extrabold text-[#191c1d] tracking-tight mt-1">
          {selectedClass ? classes.find((c) => c.id === selectedClass)?.name : ma.title}
        </h1>
        <p className="text-[#464555] text-lg">
          {new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </section>

      {/* Class Selector */}
      {!selectedClass && (
        <div className="mb-8">
          <label className="block text-[#464555] font-medium text-sm mb-2">
            {lang === 'fr' ? 'Sélectionnez une classe' : 'Select a class'}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls.id)}
                className="bg-white p-6 rounded-xl shadow-card hover:shadow-md transition-all text-left group ring-1 ring-[#c7c4d8]/10 hover:ring-[#3525cd]/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e2dfff] flex items-center justify-center text-[#3525cd]">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#191c1d]">{cls.name}</h3>
                    <p className="text-xs text-[#464555]">{cls._count?.students || 0} {ma.studentId}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#464555]">{cls.level}</span>
                  <ChevronDown size={16} className="text-[#3525cd] -rotate-90 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress & List */}
      {selectedClass && (
        <>
          {/* Bento-style Progress Card */}
          <div className="bg-white rounded-xl p-6 shadow-card flex flex-col gap-4 mb-8">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-4xl font-bold text-[#3525cd]">{markedCount}</span>
                <span className="text-[#464555] text-lg"> / {totalCount} {ma.marked}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                progress === 100 ? 'bg-emerald-50 text-emerald-700' : 'bg-[#d4e3ff] text-[#003c70]'
              }`}>
                {progress}% {ma.complete}
              </span>
            </div>
            <div className="w-full bg-[#edeeef] rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#3525cd] to-[#4f46e5] h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Student List */}
          <div className="space-y-4">
            {students.map((student) => {
              const status = attendance[student.id];
              return (
                <div key={student.id} className="bg-white rounded-xl p-4 shadow-card">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#d4e3ff] flex items-center justify-center text-[#0060ac] font-bold text-sm">
                      {getInitials(student.user?.name || '?')}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#191c1d]">{student.user?.name}</h3>
                      <p className="text-xs text-[#464555]">{ma.studentId}: #{student.matricule}</p>
                    </div>
                    {status && (
                      <div className="ml-auto">
                        {status === 'PRESENT' && <CheckCircle size={24} className="text-emerald-600" />}
                        {status === 'ABSENT' && <XCircle size={24} className="text-red-600" />}
                        {status === 'LATE' && <Clock size={24} className="text-orange-600" />}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {statusButtons.map((btn) => (
                      <button
                        key={btn.status}
                        onClick={() => handleMark(student.id, btn.status)}
                        className={`rounded-xl py-3 font-bold text-sm transition-all active:scale-95 border-2 ${
                          status === btn.status
                            ? btn.color
                            : `bg-[#edeeef] text-[#464555] border-transparent ${btn.hoverColor}`
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-40" style={{ marginLeft: 'calc(50% + 8rem)' }}>
            <button
              onClick={handleSubmit}
              disabled={submitting || markedCount === 0}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-bold shadow-lg hover:shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50"
            >
              <Upload size={20} />
              {submitting ? (lang === 'fr' ? 'Enregistrement...' : 'Saving...') : ma.submitAttendance}
            </button>
          </div>
        </>
      )}
    </RoleLayout>
  );
}
