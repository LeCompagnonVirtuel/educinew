'use client';

import { useState, useEffect, useCallback } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { getSupabase } from '@/lib/api/shared';
import { useRealtimeGrades } from '@/hooks/useRealtime';
import {
  Users, BookOpen, Clock, TrendingUp, ChevronRight,
  MessageSquare, Bell, Calendar, FileText, Loader2,
  CheckCircle, AlertTriangle, Award, Brain,
} from 'lucide-react';
import Link from 'next/link';

interface TeacherStats {
  totalStudents: number;
  totalClasses: number;
  averageGrade: number;
  attendanceRate: number;
}

interface TeacherClass {
  id: string;
  name: string;
  level: string;
  studentsCount: number;
}

interface GradeEntry {
  id: string;
  score: number;
  max_score: number;
  type: string;
  created_at: string;
  student: { user: { name: string } } | null;
  subject: { name: string } | null;
}

export default function TeacherDashboardPage() {
  const { user } = useAuth();
  const { school } = useSchool();
  const [stats, setStats] = useState<TeacherStats | null>(null);
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [recentGrades, setRecentGrades] = useState<GradeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user?.id || !user?.schoolId) return;
      try {
        const supabase = getSupabase();

        const { data: teacherData } = await supabase
          .from('teachers')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (!teacherData) return;

        const { data: classSubjects } = await supabase
          .from('class_subjects')
          .select('class_id, class:classes(id, name, level)')
          .eq('teacher_id', teacherData.id);

        const classIds = [...new Set((classSubjects || []).map((cs: any) => cs.class_id).filter(Boolean))] as string[];
        const uniqueClasses = (classSubjects || [])
          .map((cs: any) => cs.class)
          .filter(Boolean)
          .filter((c: any, i: number, arr: any[]) => arr.findIndex((x: any) => x.id === c.id) === i);

        const classStudentCounts = await Promise.allSettled(
          classIds.map(async (classId: string) => {
            const { count } = await supabase
              .from('students')
              .select('id', { count: 'exact', head: true })
              .eq('class_id', classId);
            return { classId, count: count || 0 };
          })
        );

        const countsMap = new Map<string, number>();
        classStudentCounts.forEach(r => {
          if (r.status === 'fulfilled') countsMap.set(r.value.classId, r.value.count);
        });

        const enrichedClasses = uniqueClasses.map((c: any) => ({
          ...c,
          studentsCount: countsMap.get(c.id) || 0,
        }));

        setClasses(enrichedClasses);

        const totalStudents = enrichedClasses.reduce((sum: number, c: any) => sum + c.studentsCount, 0);

        const { data: gradesData } = await supabase
          .from('grades')
          .select('id, score, max_score, type, created_at, student:students(user:users(name)), subject:subjects(name)')
          .eq('school_id', user.schoolId)
          .order('created_at', { ascending: false })
          .limit(10);

        setRecentGrades((gradesData || []) as GradeEntry[]);

        const allGrades = gradesData || [];
        const avg = allGrades.length > 0
          ? allGrades.reduce((sum: number, g: any) => sum + (g.score / g.max_score) * 20, 0) / allGrades.length
          : 0;

        const { data: attendanceData } = await supabase
          .from('attendance')
          .select('status')
          .eq('school_id', user.schoolId)
          .gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

        const attendanceArr = attendanceData || [];
        const presentCount = attendanceArr.filter((a: any) => a.status === 'PRESENT').length;
        const attendanceRate = attendanceArr.length > 0 ? (presentCount / attendanceArr.length) * 100 : 0;

        setStats({
          totalStudents,
          totalClasses: enrichedClasses.length,
          averageGrade: Math.round(avg * 10) / 10,
          attendanceRate: Math.round(attendanceRate),
        });
      } catch (err) {
        // Error handled by catch block
      }
      setLoading(false);
    }
    load();
  }, [user?.id, user?.schoolId]);

  useRealtimeGrades(user?.schoolId, 'school_id', useCallback((grade: any) => {
    setRecentGrades(prev => [grade as GradeEntry, ...prev].slice(0, 10));
  }, []));

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <RoleLayout role="teacher" breadcrumbs={[{ label: 'Tableau de bord' }]}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary,#4F46E5)] to-[var(--color-secondary,#10B981)] rounded-2xl p-6 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Bonjour, {user?.name?.split(' ')[0] || 'Enseignant'} ! 👋
          </h1>
          <p className="text-white/80 mt-1">{today}</p>
          {school?.name && (
            <p className="text-white/60 text-sm mt-1">{school.name}</p>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-[var(--color-primary,#4F46E5)]" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-3">
                  <BookOpen size={20} className="text-[var(--color-primary,#4F46E5)]" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats?.totalClasses || 0}</p>
                <p className="text-sm text-slate-500">Mes classes</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-3">
                  <Users size={20} className="text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats?.totalStudents || 0}</p>
                <p className="text-sm text-slate-500">Mes élèves</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
                  <TrendingUp size={20} className="text-amber-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats?.averageGrade || 0}/20</p>
                <p className="text-sm text-slate-500">Moyenne</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center mb-3">
                  <Clock size={20} className="text-violet-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats?.attendanceRate || 0}%</p>
                <p className="text-sm text-slate-500">Présence</p>
              </div>
            </div>

            {/* My Classes */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Mes classes</h2>
              {classes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {classes.map((cls) => (
                    <Link
                      key={cls.id}
                      href={`/my-classes`}
                      className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-[var(--color-primary,#4F46E5)] transition-colors">{cls.name}</p>
                          <p className="text-sm text-slate-500">{cls.level}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[var(--color-primary,#4F46E5)]">{cls.studentsCount}</p>
                          <p className="text-xs text-slate-500">élèves</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center py-8">Aucune classe assignée</p>
              )}
            </div>

            {/* Recent Grades */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Notes récentes</h2>
                <Link href="/grade-entry" className="text-sm font-medium text-[var(--color-primary,#4F46E5)] hover:underline flex items-center gap-1">
                  Saisir des notes <ChevronRight size={14} />
                </Link>
              </div>
              {recentGrades.length > 0 ? (
                <div className="space-y-3">
                  {recentGrades.slice(0, 5).map((grade) => {
                    const pct = Math.round((grade.score / grade.max_score) * 20);
                    const studentName = (grade.student as any)?.user?.name || 'Élève';
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
                            <p className="font-medium text-slate-900 text-sm">{studentName}</p>
                            <p className="text-xs text-slate-500">
                              {(grade.subject as any)?.name || 'Matière'} — {grade.type}
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

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/mark-attendance" className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all text-center">
                <CheckCircle size={24} className="mx-auto mb-2 text-[var(--color-primary,#4F46E5)]" />
                <p className="text-sm font-medium text-slate-700">Appel</p>
              </Link>
              <Link href="/grade-entry" className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all text-center">
                <TrendingUp size={24} className="mx-auto mb-2 text-emerald-600" />
                <p className="text-sm font-medium text-slate-700">Notes</p>
              </Link>
              <Link href="/messages" className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all text-center">
                <MessageSquare size={24} className="mx-auto mb-2 text-amber-600" />
                <p className="text-sm font-medium text-slate-700">Messages</p>
              </Link>
              <Link href="/schedule" className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all text-center">
                <Calendar size={24} className="mx-auto mb-2 text-violet-600" />
                <p className="text-sm font-medium text-slate-700">Emploi du temps</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </RoleLayout>
  );
}
