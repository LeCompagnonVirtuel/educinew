'use client';

import { useState, useEffect, useMemo } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import {
  TrendingUp, BarChart3, Target, Award, Users,
  BookOpen, AlertTriangle, CheckCircle, Star,
  ArrowUp, ArrowDown, Zap, Activity,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';

export default function AnalyticsPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const [grades, setGrades] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.schoolId) return;
    const supabase = getSupabase();

    async function loadData() {
      setLoading(true);
      try {
        const [gradesRes, studentsRes, attendanceRes] = await Promise.all([
          supabase.from('grades').select('score, max_score, student_id, subject:subjects(name), period:periods(name)').eq('school_id', user!.schoolId),
          supabase.from('students').select('id, first_name, last_name, class:classes(id, name)').eq('school_id', user!.schoolId),
          supabase.from('attendance').select('student_id, status, date').eq('school_id', user!.schoolId),
        ]);
        setGrades(gradesRes.data || []);
        setStudents(studentsRes.data || []);
        setAttendance(attendanceRes.data || []);
      } catch (err) {
        console.error('[Analytics]', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user?.schoolId]);

  const analytics = useMemo(() => {
    if (!grades.length) return null;

    const totalGrades = grades.length;
    const avgScore = grades.reduce((sum, g) => sum + (g.score / (g.max_score || 20)) * 20, 0) / totalGrades;
    const passingGrades = grades.filter(g => (g.score / (g.max_score || 20)) * 20 >= 10).length;
    const passRate = Math.round((passingGrades / totalGrades) * 100);

    const totalAttendance = attendance.length;
    const presentCount = attendance.filter(a => a.status === 'PRESENT').length;
    const attendanceRate = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;
    const absentRate = totalAttendance > 0 ? Math.round(((totalAttendance - presentCount) / totalAttendance) * 100 * 10) / 10 : 0;

    // By class
    const classMap = new Map<string, { scores: number[]; name: string }>();
    grades.forEach(g => {
      const student = students.find(s => s.id === g.student_id);
      const className = (student?.class as any)?.name || 'Inconnue';
      const classId = (student?.class as any)?.id || 'unknown';
      if (!classMap.has(classId)) classMap.set(classId, { scores: [], name: className });
      classMap.get(classId)!.scores.push((g.score / (g.max_score || 20)) * 20);
    });

    const classPerformance = Array.from(classMap.entries()).map(([id, data]) => {
      const avg = data.scores.reduce((s, v) => s + v, 0) / data.scores.length;
      const passing = data.scores.filter(s => s >= 10).length;
      return {
        cls: data.name,
        avg: Math.round(avg * 10) / 10,
        passRate: Math.round((passing / data.scores.length) * 100),
      };
    }).sort((a, b) => b.avg - a.avg).slice(0, 8);

    // By subject
    const subjectMap = new Map<string, number[]>();
    grades.forEach(g => {
      const subjectName = (g.subject as any)?.name || 'Inconnue';
      if (!subjectMap.has(subjectName)) subjectMap.set(subjectName, []);
      subjectMap.get(subjectName)!.push((g.score / (g.max_score || 20)) * 20);
    });

    const subjectPerformance = Array.from(subjectMap.entries()).map(([subject, scores]) => ({
      subject,
      avg: Math.round((scores.reduce((s, v) => s + v, 0) / scores.length) * 10) / 10,
      highest: Math.round(Math.max(...scores) * 10) / 10,
      lowest: Math.round(Math.min(...scores) * 10) / 10,
    })).sort((a, b) => b.avg - a.avg);

    // Top students
    const studentScores = new Map<string, { scores: number[]; name: string; cls: string }>();
    grades.forEach(g => {
      const student = students.find(s => s.id === g.student_id);
      if (!student) return;
      const name = `${student.last_name} ${student.first_name}`;
      const cls = (student.class as any)?.name || '';
      if (!studentScores.has(g.student_id)) studentScores.set(g.student_id, { scores: [], name, cls });
      studentScores.get(g.student_id)!.scores.push((g.score / (g.max_score || 20)) * 20);
    });

    const topStudents = Array.from(studentScores.values())
      .map(s => ({ name: s.name, cls: s.cls, avg: Math.round((s.scores.reduce((a, b) => a + b, 0) / s.scores.length) * 10) / 10 }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 5);

    // By period (trimester evolution)
    const periodMap = new Map<string, number[]>();
    grades.forEach(g => {
      const periodName = (g.period as any)?.name || 'Global';
      if (!periodMap.has(periodName)) periodMap.set(periodName, []);
      periodMap.get(periodName)!.push((g.score / (g.max_score || 20)) * 20);
    });

    const trimesterData = Array.from(periodMap.entries()).map(([trim, scores]) => ({
      trim,
      avg: Math.round((scores.reduce((s, v) => s + v, 0) / scores.length) * 10) / 10,
    }));

    // Insights
    const insights: { icon: any; color: string; text: string }[] = [];
    if (classPerformance.length > 0) {
      insights.push({
        icon: Star,
        color: 'text-emerald-600 bg-emerald-50',
        text: lang === 'fr'
          ? `La classe ${classPerformance[0].cls} est la plus performante (${classPerformance[0].avg}/20)`
          : `${classPerformance[0].cls} is the top performing class (${classPerformance[0].avg}/20)`,
      });
    }
    const weakSubjects = subjectPerformance.filter(s => s.avg < 10);
    if (weakSubjects.length > 0) {
      insights.push({
        icon: AlertTriangle,
        color: 'text-amber-600 bg-amber-50',
        text: lang === 'fr'
          ? `${weakSubjects[0].subject} nécessite une attention (moyenne: ${weakSubjects[0].avg}/20)`
          : `${weakSubjects[0].subject} needs attention (average: ${weakSubjects[0].avg}/20)`,
      });
    }
    const strugglingStudents = Array.from(studentScores.values()).filter(s => {
      const avg = s.scores.reduce((a, b) => a + b, 0) / s.scores.length;
      return avg < 8;
    });
    if (strugglingStudents.length > 0) {
      insights.push({
        icon: Users,
        color: 'text-red-600 bg-red-50',
        text: lang === 'fr'
          ? `${strugglingStudents.length} élève(s) en difficulté identifié(s)`
          : `${strugglingStudents.length} struggling student(s) identified`,
      });
    }

    return { avgScore: Math.round(avgScore * 10) / 10, passRate, attendanceRate, absentRate, classPerformance, subjectPerformance, topStudents, trimesterData, insights };
  }, [grades, students, attendance, lang]);

  if (loading) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: 'Tableau de bord' }, { label: 'Analyses' }]}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </RoleLayout>
    );
  }

  if (!analytics) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: 'Tableau de bord' }, { label: 'Analyses' }]}>
        <div className="text-center py-16 text-[#464555]">
          <BarChart3 size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">{lang === 'fr' ? 'Aucune donnée disponible' : 'No data available'}</p>
          <p className="text-sm mt-1">{lang === 'fr' ? 'Les analyses apparaîtront une fois les notes saisies.' : 'Analytics will appear once grades are entered.'}</p>
        </div>
      </RoleLayout>
    );
  }

  const kpiCards = [
    { title: lang === 'fr' ? 'Taux de réussite' : 'Pass Rate', value: `${analytics.passRate}%`, icon: Target, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', borderColor: 'border-emerald-500' },
    { title: lang === 'fr' ? 'Moyenne générale' : 'General Average', value: `${analytics.avgScore}/20`, icon: TrendingUp, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', borderColor: 'border-blue-500' },
    { title: lang === 'fr' ? 'Taux de présence' : 'Attendance Rate', value: `${analytics.attendanceRate}%`, icon: CheckCircle, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', borderColor: 'border-amber-500' },
    { title: lang === 'fr' ? "Taux d'absentéisme" : 'Absenteeism Rate', value: `${analytics.absentRate}%`, icon: AlertTriangle, iconBg: 'bg-red-50', iconColor: 'text-red-600', borderColor: 'border-red-500' },
  ];

  return (
    <RoleLayout role="admin"
      breadcrumbs={[
        { label: lang === 'fr' ? 'Tableau de bord' : 'Dashboard' },
        { label: lang === 'fr' ? 'Analyses' : 'Analytics' },
      ]}
    >
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-[#3525cd] uppercase tracking-widest">
            {lang === 'fr' ? 'Aperçus institutionnels' : 'Institutional Insights'}
          </span>
          <h1 className="text-2xl font-bold text-[#191c1d] mt-1">
            {lang === 'fr' ? 'Tableau de bord analytique' : 'Analytics Dashboard'}
          </h1>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card, idx) => (
            <div key={idx} className={`bg-white rounded-xl border-l-4 ${card.borderColor} shadow-sm p-5`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                  <card.icon size={18} className={card.iconColor} />
                </div>
              </div>
              <p className="text-xs font-medium text-[#464555]">{card.title}</p>
              <p className="text-xl font-bold text-[#191c1d] mt-1">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance by class */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-[#191c1d] flex items-center gap-2">
                <BarChart3 size={16} className="text-[#3525cd]" />
                {lang === 'fr' ? 'Performance par classe' : 'Performance by Class'}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-[#464555] uppercase tracking-wider bg-[#f8f9fa] border-b border-gray-100">
                    <th className="px-5 py-3.5 font-semibold">{lang === 'fr' ? 'Classe' : 'Class'}</th>
                    <th className="px-3 py-3.5 font-semibold">{lang === 'fr' ? 'Moyenne' : 'Average'}</th>
                    <th className="px-3 py-3.5 font-semibold hidden sm:table-cell">{lang === 'fr' ? 'Réussite' : 'Pass Rate'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {analytics.classPerformance.map((cp, idx) => (
                    <tr key={idx} className="hover:bg-[#f8f9fa] transition-colors">
                      <td className="px-5 py-3.5 font-medium text-[#191c1d]">{cp.cls}</td>
                      <td className="px-3 py-3.5">
                        <span className={`font-bold ${cp.avg >= 14 ? 'text-emerald-600' : cp.avg >= 12 ? 'text-amber-600' : 'text-red-600'}`}>
                          {cp.avg}/20
                        </span>
                      </td>
                      <td className="px-3 py-3.5 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${cp.passRate >= 85 ? 'bg-emerald-500' : cp.passRate >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${cp.passRate}%` }} />
                          </div>
                          <span className="text-xs font-medium text-[#464555]">{cp.passRate}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-[#191c1d] mb-4 flex items-center gap-2">
              <Zap size={16} className="text-[#3525cd]" />
              {lang === 'fr' ? 'Analyses automatiques' : 'Auto Insights'}
            </h2>
            <div className="space-y-4">
              {analytics.insights.length === 0 && (
                <p className="text-xs text-[#464555]">{lang === 'fr' ? 'Pas assez de données pour générer des insights.' : 'Not enough data for insights.'}</p>
              )}
              {analytics.insights.map((ins, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#f8f9fa]">
                  <div className={`p-2 rounded-lg ${ins.color}`}>
                    <ins.icon size={14} />
                  </div>
                  <p className="text-xs font-medium text-[#191c1d] leading-relaxed">{ins.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance by subject */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-[#191c1d] flex items-center gap-2">
                <BookOpen size={16} className="text-[#3525cd]" />
                {lang === 'fr' ? 'Performance par matière' : 'Performance by Subject'}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-[#464555] uppercase tracking-wider bg-[#f8f9fa] border-b border-gray-100">
                    <th className="px-5 py-3.5 font-semibold">{lang === 'fr' ? 'Matière' : 'Subject'}</th>
                    <th className="px-3 py-3.5 font-semibold">{lang === 'fr' ? 'Moy.' : 'Avg.'}</th>
                    <th className="px-3 py-3.5 font-semibold hidden sm:table-cell">Max</th>
                    <th className="px-3 py-3.5 font-semibold hidden sm:table-cell">Min</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {analytics.subjectPerformance.map((sp, idx) => (
                    <tr key={idx} className="hover:bg-[#f8f9fa] transition-colors">
                      <td className="px-5 py-3 font-medium text-[#191c1d]">{sp.subject}</td>
                      <td className="px-3 py-3">
                        <span className={`font-bold ${sp.avg >= 14 ? 'text-emerald-600' : sp.avg >= 12 ? 'text-amber-600' : 'text-red-600'}`}>
                          {sp.avg}/20
                        </span>
                      </td>
                      <td className="px-3 py-3 text-emerald-600 font-medium hidden sm:table-cell">{sp.highest}/20</td>
                      <td className="px-3 py-3 text-red-600 font-medium hidden sm:table-cell">{sp.lowest}/20</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top 5 students */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-[#191c1d] mb-4 flex items-center gap-2">
              <Award size={16} className="text-[#3525cd]" />
              {lang === 'fr' ? 'Top 5 élèves' : 'Top 5 Students'}
            </h2>
            <div className="space-y-3">
              {analytics.topStudents.map((s, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-[#f8f9fa]">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    idx === 0 ? 'bg-amber-100 text-amber-700' : 'bg-indigo-50 text-[#3525cd]'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#191c1d] truncate">{s.name}</p>
                    <p className="text-xs text-[#464555]">{s.cls}</p>
                  </div>
                  <span className="text-sm font-bold text-[#3525cd]">{s.avg}/20</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trimester evolution */}
        {analytics.trimesterData.length > 1 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-[#191c1d] mb-6 flex items-center gap-2">
              <Activity size={16} className="text-[#3525cd]" />
              {lang === 'fr' ? 'Évolution par période' : 'Period Evolution'}
            </h2>
            <div className="flex items-end gap-6 h-32">
              {analytics.trimesterData.map((t, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-[#191c1d]">{t.avg}/20</span>
                  <div
                    className="w-full rounded-t-lg relative overflow-hidden"
                    style={{ height: `${(t.avg / 20) * 100}%`, backgroundColor: '#e2dfff' }}
                  >
                    <div className="absolute inset-0 bg-[#3525cd] rounded-t-lg" />
                  </div>
                  <span className="text-xs font-bold text-[#464555] truncate max-w-full">{t.trim}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </RoleLayout>
  );
}
