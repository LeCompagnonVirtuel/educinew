'use client';

import { useState, useEffect, useCallback } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { useBranding } from '@/components/branding/BrandingProvider';
import { getSupabase } from '@/lib/api/shared';
import { useRealtimeGrades } from '@/hooks/useRealtime';
import {
  TrendingUp, FileText, Brain, Award, Calendar, Clock,
  ChevronRight, BookOpen, QrCode, Bell, MessageSquare,
  CheckCircle, AlertTriangle, Loader2, User,
} from 'lucide-react';
import Link from 'next/link';

interface StudentStats {
  averageGrade: number;
  totalGrades: number;
  attendanceRate: number;
  classRank: number;
  totalStudents: number;
}

interface GradeEntry {
  id: string;
  score: number;
  max_score: number;
  type: string;
  created_at: string;
  subject: { name: string } | null;
  period: { name: string } | null;
}

interface AttendanceRecord {
  id: string;
  status: string;
  date: string;
  check_in_time: string | null;
}

interface ClassInfo {
  id: string;
  name: string;
  level: string;
}

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const { school } = useSchool();
  const { branding } = useBranding();
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [grades, setGrades] = useState<GradeEntry[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [studentClass, setStudentClass] = useState<ClassInfo | null>(null);
  const [matricule, setMatricule] = useState('');
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user?.id || !user?.schoolId) return;
      try {
        const supabase = getSupabase();

        const { data: studentData } = await supabase
          .from('students')
          .select('id, matricule, class_id, class:classes(id, name, level)')
          .eq('user_id', user.id)
          .single();

        if (!studentData) return;

        setStudentId(studentData.id);
        setMatricule(studentData.matricule || '');
        if (studentData.class) {
          setStudentClass(studentData.class as unknown as ClassInfo);
        }

        const [gradesResult, attendanceResult, classStudentsResult] = await Promise.allSettled([
          supabase
            .from('grades')
            .select('id, score, max_score, type, created_at, subject:subjects(name), period:periods(name)')
            .eq('student_id', studentData.id)
            .order('created_at', { ascending: false })
            .limit(10),
          supabase
            .from('attendance')
            .select('id, status, date, check_in_time')
            .eq('student_id', studentData.id)
            .order('date', { ascending: false })
            .limit(30),
          studentData.class_id
            ? supabase
                .from('students')
                .select('id')
                .eq('class_id', studentData.class_id)
            : null,
        ]);

        const gradesData = gradesResult.status === 'fulfilled' ? (gradesResult.value.data || []) : [];
        setGrades(gradesData as GradeEntry[]);

        const attendanceData = attendanceResult.status === 'fulfilled' ? (attendanceResult.value.data || []) : [];
        setAttendance(attendanceData as AttendanceRecord[]);

        const totalStudents = classStudentsResult.status === 'fulfilled' && classStudentsResult.value?.data
          ? classStudentsResult.value.data.length
          : 0;

        const gradesArray = gradesData as GradeEntry[];
        const attendanceArray = attendanceData as AttendanceRecord[];

        const avgGrade = gradesArray.length > 0
          ? gradesArray.reduce((sum, g) => sum + (g.score / g.max_score) * 20, 0) / gradesArray.length
          : 0;

        const presentCount = attendanceArray.filter(a => a.status === 'PRESENT').length;
        const attendanceRate = attendanceArray.length > 0 ? (presentCount / attendanceArray.length) * 100 : 0;

        setStats({
          averageGrade: Math.round(avgGrade * 10) / 10,
          totalGrades: gradesArray.length,
          attendanceRate: Math.round(attendanceRate),
          classRank: 0,
          totalStudents,
        });
    } catch (err) {
      // Error handled by catch block
    }
      setLoading(false);
    }
    load();
  }, [user?.id, user?.schoolId]);

  useRealtimeGrades(studentId, 'student_id', useCallback((grade: any) => {
    setGrades(prev => [grade as GradeEntry, ...prev].slice(0, 10));
  }, []));

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const getMention = (avg: number): string => {
    if (avg >= 16) return 'Très Bien';
    if (avg >= 14) return 'Bien';
    if (avg >= 12) return 'Assez Bien';
    if (avg >= 10) return 'Passable';
    return 'Insuffisant';
  };

  return (
    <RoleLayout role="student" breadcrumbs={[{ label: 'Tableau de bord' }]}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary,#4F46E5)] to-[var(--color-secondary,#10B981)] rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Bonjour, {user?.name?.split(' ')[0] || 'Élève'} ! 👋
              </h1>
              <p className="text-white/80 mt-1">{today}</p>
              {school?.name && (
                <p className="text-white/60 text-sm mt-1">{school.name}</p>
              )}
            </div>
            {studentClass && (
              <div className="hidden sm:block text-right">
                <p className="text-white/60 text-sm">Classe</p>
                <p className="text-xl font-bold">{studentClass.name}</p>
                {matricule && (
                  <p className="text-white/60 text-xs font-mono">Mat. {matricule}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-[var(--color-primary,#4F46E5)]" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/student/grades" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <TrendingUp size={20} className="text-[var(--color-primary,#4F46E5)]" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats?.averageGrade || 0}/20</p>
                <p className="text-sm text-slate-500">Moyenne générale</p>
                <p className="text-xs text-[var(--color-primary,#4F46E5)] mt-1 font-medium">{getMention(stats?.averageGrade || 0)}</p>
              </Link>

              <Link href="/student/grades" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Award size={20} className="text-emerald-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats?.totalGrades || 0}</p>
                <p className="text-sm text-slate-500">Notes obtenues</p>
              </Link>

              <Link href="/student" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Clock size={20} className="text-amber-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats?.attendanceRate || 0}%</p>
                <p className="text-sm text-slate-500">Présence</p>
              </Link>

              <Link href="/student-checkin" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                    <QrCode size={20} className="text-violet-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">QR</p>
                <p className="text-sm text-slate-500">Mon Code</p>
              </Link>
            </div>

            {/* Recent Grades */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Mes dernières notes</h2>
                <Link href="/student/grades" className="text-sm font-medium text-[var(--color-primary,#4F46E5)] hover:underline flex items-center gap-1">
                  Voir tout <ChevronRight size={14} />
                </Link>
              </div>
              {grades.length > 0 ? (
                <div className="space-y-3">
                  {grades.slice(0, 5).map((grade) => {
                    const pct = Math.round((grade.score / grade.max_score) * 20);
                    return (
                      <div key={grade.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                            pct >= 14 ? 'bg-emerald-100 text-emerald-700'
                              : pct >= 10 ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {pct}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 text-sm">
                              {(grade.subject as any)?.name || 'Matière'}
                            </p>
                            <p className="text-xs text-slate-500">
                              {grade.score}/{grade.max_score} — {grade.type}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400">
                          {new Date(grade.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center py-8">Aucune note enregistrée</p>
              )}
            </div>

            {/* Attendance Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Présences récentes</h2>
              {attendance.length > 0 ? (
                <div className="space-y-2">
                  {attendance.slice(0, 7).map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          record.status === 'PRESENT' ? 'bg-emerald-500'
                            : record.status === 'LATE' ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`} />
                        <span className="text-sm text-slate-700">
                          {new Date(record.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        record.status === 'PRESENT' ? 'bg-emerald-100 text-emerald-700'
                          : record.status === 'LATE' ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {record.status === 'PRESENT' ? 'Présent' : record.status === 'LATE' ? 'En retard' : 'Absent'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center py-8">Aucun enregistrement de présence</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/timetable" className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all text-center">
                <Calendar size={24} className="mx-auto mb-2 text-[var(--color-primary,#4F46E5)]" />
                <p className="text-sm font-medium text-slate-700">Emploi du temps</p>
              </Link>
              <Link href="/student/assignments" className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all text-center">
                <FileText size={24} className="mx-auto mb-2 text-emerald-600" />
                <p className="text-sm font-medium text-slate-700">Devoirs</p>
              </Link>
              <Link href="/messages" className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all text-center">
                <MessageSquare size={24} className="mx-auto mb-2 text-amber-600" />
                <p className="text-sm font-medium text-slate-700">Messages</p>
              </Link>
              <Link href="/notifications" className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all text-center">
                <Bell size={24} className="mx-auto mb-2 text-violet-600" />
                <p className="text-sm font-medium text-slate-700">Notifications</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </RoleLayout>
  );
}
