'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import {
  Users, GraduationCap, BookOpen, TrendingUp, BarChart3,
  Target, Star, AlertTriangle, ArrowUp, ArrowDown, Zap, Activity, PieChart,
  Loader2,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const barColors = ['bg-[#3525cd]', 'bg-[#4f46e5]', 'bg-blue-500', 'bg-amber-500', 'bg-emerald-500', 'bg-red-400'];

function generateRecommendations(data: {
  classComparison: { cls: string; avg: number }[];
  subjectDifficulty: { subject: string; avg: number }[];
  attendanceRate: number;
  classCount: number;
  studentCount: number;
  lang: string;
}): { icon: any; color: string; textFr: string; textEn: string }[] {
  const recs: { icon: any; color: string; textFr: string; textEn: string }[] = [];

  const weakClasses = data.classComparison.filter(c => c.avg < 10);
  if (weakClasses.length > 0) {
    const names = weakClasses.map(c => c.cls).join(', ');
    recs.push({
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50',
      textFr: `Créer un programme de soutien pour les classes ayant une moyenne inférieure à 10/20 : ${names}`,
      textEn: `Create a support program for classes with averages below 10/20: ${names}`,
    });
  }

  const hardSubjects = data.subjectDifficulty.filter(s => s.avg < 10);
  if (hardSubjects.length > 0) {
    const names = hardSubjects.map(s => s.subject).join(', ');
    recs.push({
      icon: AlertTriangle,
      color: 'text-orange-600 bg-orange-50',
      textFr: `Renforcer l'enseignement des matières difficiles : ${names}`,
      textEn: `Strengthen teaching for difficult subjects: ${names}`,
    });
  }

  if (data.attendanceRate >= 85) {
    recs.push({
      icon: TrendingUp,
      color: 'text-emerald-600 bg-emerald-50',
      textFr: `Le taux de présence est de ${data.attendanceRate}%. Maintenir les rappels automatiques.`,
      textEn: `Attendance rate is ${data.attendanceRate}%. Maintain automatic reminders.`,
    });
  } else if (data.attendanceRate > 0) {
    recs.push({
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50',
      textFr: `Le taux de présence (${data.attendanceRate}%) est insuffisant. Mettre en place des rappels et contacter les parents.`,
      textEn: `Attendance rate (${data.attendanceRate}%) is insufficient. Set up reminders and contact parents.`,
    });
  }

  const bestClasses = data.classComparison.filter(c => c.avg >= 14).sort((a, b) => b.avg - a.avg);
  if (bestClasses.length > 0) {
    recs.push({
      icon: Star,
      color: 'text-amber-600 bg-amber-50',
      textFr: `Féliciter les classes excellentes : ${bestClasses[0].cls} (${bestClasses[0].avg}/20)`,
      textEn: `Congratulate excellent classes: ${bestClasses[0].cls} (${bestClasses[0].avg}/20)`,
    });
  }

  if (recs.length < 2) {
    recs.push({
      icon: Users,
      color: 'text-blue-600 bg-blue-50',
      textFr: `${data.studentCount} élèves répartis dans ${data.classCount} classes. Continuez à surveiller les effectifs.`,
      textEn: `${data.studentCount} students across ${data.classCount} classes. Continue monitoring class sizes.`,
    });
  }

  return recs.slice(0, 4);
}

export default function SchoolAnalyticsPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [overviewStats, setOverviewStats] = useState<any[]>([]);
  const [classComparison, setClassComparison] = useState<any[]>([]);
  const [subjectDifficulty, setSubjectDifficulty] = useState<any[]>([]);
  const [teacherPerformance, setTeacherPerformance] = useState<any[]>([]);
  const [gradeDistribution, setGradeDistribution] = useState<any[]>([]);
  const [attendanceTrends, setAttendanceTrends] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      if (!user?.schoolId) return;
      setLoading(true);
      try {
        const { getSupabase } = await import('@/lib/api/shared');
        const supabase = getSupabase();

        const [studentsRes, teachersRes, classesRes, gradesRes, attendanceRes] = await Promise.all([
          supabase.from('students').select('id').eq('school_id', user.schoolId).eq('is_active', true),
          supabase.from('teachers').select('id').eq('school_id', user.schoolId).eq('is_active', true),
          supabase.from('classes').select('id, name').eq('school_id', user.schoolId),
          supabase.from('grades').select('score, max_score, subject:subjects(name), student:students!inner(class_id, class:classes(name))').eq('students.school_id', user.schoolId),
          supabase.from('attendance').select('status, date, student:students!inner(school_id)').eq('students.school_id', user.schoolId).gte('date', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
        ]);

        const studentCount = studentsRes.data?.length || 0;
        const teacherCount = teachersRes.data?.length || 0;
        const classCount = classesRes.data?.length || 0;
        const grades = gradesRes.data || [];
        const attendance = attendanceRes.data || [];

        const presentCount = attendance.filter((a: any) => a.status === 'PRESENT' || a.status === 'LATE').length;
        const attendanceRate = attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : 0;

        setOverviewStats([
          { titleFr: 'Total élèves', titleEn: 'Total Students', value: String(studentCount), icon: Users, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', borderColor: 'border-blue-500' },
          { titleFr: 'Enseignants', titleEn: 'Teachers', value: String(teacherCount), icon: GraduationCap, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', borderColor: 'border-emerald-500' },
          { titleFr: 'Classes', titleEn: 'Classes', value: String(classCount), icon: BookOpen, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', borderColor: 'border-amber-500' },
          { titleFr: 'Taux de présence', titleEn: 'Attendance Rate', value: `${attendanceRate}%`, icon: Target, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', borderColor: 'border-purple-500' },
        ]);

        // Class comparison from grades
        const byClass: Record<string, { total: number; count: number }> = {};
        grades.forEach((g: any) => {
          const cls = g.student?.class?.name;
          if (!cls) return;
          if (!byClass[cls]) byClass[cls] = { total: 0, count: 0 };
          byClass[cls].total += (g.score / (g.max_score || 20)) * 20;
          byClass[cls].count++;
        });
        const classComp = Object.entries(byClass).slice(0, 6).map(([cls, data], i) => ({
          cls, avg: data.count > 0 ? Math.round((data.total / data.count) * 10) / 10 : 0, color: barColors[i % barColors.length],
        }));
        setClassComparison(classComp);

        // Subject difficulty
        const bySubject: Record<string, { total: number; count: number }> = {};
        grades.forEach((g: any) => {
          const name = g.subject?.name;
          if (!name) return;
          if (!bySubject[name]) bySubject[name] = { total: 0, count: 0 };
          bySubject[name].total += (g.score / (g.max_score || 20)) * 20;
          bySubject[name].count++;
        });
        const subjectColors = ['bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-400', 'bg-emerald-500', 'bg-emerald-600'];
        const subjectDiff = Object.entries(bySubject).slice(0, 6).map(([subject, data], i) => ({
          subject, avg: data.count > 0 ? Math.round((data.total / data.count) * 10) / 10 : 0, color: subjectColors[i % subjectColors.length],
        }));
        setSubjectDifficulty(subjectDiff);

        // Teacher performance
        const { data: teacherData } = await supabase.from('teachers').select('id, user:users(name), subject:subjects(name)').eq('school_id', user.schoolId).limit(5);
        const teacherPerf = (teacherData || []).map((t: any) => ({
          name: t.user?.name || 'Enseignant', subject: t.subject?.name || '—', avg: 0, rating: 0,
        }));
        setTeacherPerformance(teacherPerf);

        // Grade distribution
        const ranges = [
          { grade: 'A (16-20)', min: 16, max: 20, color: 'bg-emerald-500' },
          { grade: 'B (14-16)', min: 14, max: 16, color: 'bg-emerald-400' },
          { grade: 'C (12-14)', min: 12, max: 14, color: 'bg-amber-400' },
          { grade: 'D (10-12)', min: 10, max: 12, color: 'bg-amber-500' },
          { grade: 'F (<10)', min: 0, max: 10, color: 'bg-red-500' },
        ];
        const totalGrades = grades.length || 1;
        const gradeDist = ranges.map(r => {
          const count = grades.filter((g: any) => {
            const avg = (g.score / (g.max_score || 20)) * 20;
            return avg >= r.min && avg < r.max;
          }).length;
          return { grade: r.grade, pct: Math.round((count / totalGrades) * 100), color: r.color };
        });
        setGradeDistribution(gradeDist);

        // Attendance trends
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        const now = new Date();
        const trends = [];
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
          const monthRecords = attendance.filter((a: any) => a.date?.startsWith(monthStr));
          const present = monthRecords.filter((a: any) => a.status === 'PRESENT' || a.status === 'LATE').length;
          const rate = monthRecords.length > 0 ? Math.round((present / monthRecords.length) * 100) : 0;
          trends.push({ month: months[d.getMonth()], rate });
        }
        setAttendanceTrends(trends);
      } catch (err) {
        setOverviewStats([]);
        setClassComparison([]);
        setSubjectDifficulty([]);
        setTeacherPerformance([]);
        setGradeDistribution([]);
        setAttendanceTrends([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user?.schoolId]);

  const maxAvg = classComparison.length > 0 ? Math.max(...classComparison.map(c => c.avg)) : 1;
  const maxAttendance = attendanceTrends.length > 0 ? Math.max(...attendanceTrends.map(a => a.rate)) : 100;

  if (loading) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: lang === 'fr' ? 'Tableau de bord' : 'Dashboard' }, { label: lang === 'fr' ? 'Performance école' : 'School Analytics' }]}>
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#3525cd]" />
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="admin"
      breadcrumbs={[
        { label: lang === 'fr' ? 'Tableau de bord' : 'Dashboard' },
        { label: lang === 'fr' ? 'Performance école' : 'School Analytics' },
      ]}
    >
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <span className="text-xs font-bold text-[#3525cd] uppercase tracking-widest">
            {lang === 'fr' ? 'Performance académique' : 'Academic Performance'}
          </span>
          <h1 className="text-2xl font-bold text-[#191c1d] mt-1">
            {lang === 'fr' ? 'Analyse de l\'établissement' : 'School Performance Analytics'}
          </h1>
        </div>

        {/* Overview stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewStats.map((card, idx) => (
            <div key={idx} className={`bg-white rounded-xl border-l-4 ${card.borderColor} shadow-sm p-5`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                  <card.icon size={18} className={card.iconColor} />
                </div>
                {card.change && (
                  <span className={`flex items-center gap-1 text-xs font-bold ${
                    card.changeType === 'up' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {card.changeType === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    {card.change}
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-[#464555]">
                {lang === 'fr' ? card.titleFr : card.titleEn}
              </p>
              <p className="text-xl font-bold text-[#191c1d] mt-1">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Class performance comparison */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-[#191c1d] mb-6 flex items-center gap-2">
              <BarChart3 size={16} className="text-[#3525cd]" />
              {lang === 'fr' ? 'Comparaison par classe' : 'Class Comparison'}
            </h2>
            <div className="flex items-end gap-3 h-40">
              {classComparison.map((c, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-[#191c1d]">{c.avg}</span>
                  <div
                    className={`w-full ${c.color} rounded-t-lg`}
                    style={{ height: `${(c.avg / maxAvg) * 100}%` }}
                  />
                  <span className="text-[9px] font-bold text-[#464555] text-center leading-tight truncate w-full">
                    {c.cls}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject difficulty analysis */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-[#191c1d] mb-6 flex items-center gap-2">
              <Activity size={16} className="text-[#3525cd]" />
              {lang === 'fr' ? 'Difficulté par matière' : 'Subject Difficulty'}
            </h2>
            <div className="space-y-4">
              {subjectDifficulty.map((s, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-[#191c1d]">{s.subject}</span>
                    <span className={`font-bold ${s.avg >= 13 ? 'text-emerald-600' : s.avg >= 11 ? 'text-amber-600' : 'text-red-600'}`}>
                      {s.avg}/20
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${s.color}`} style={{ width: `${(s.avg / 20) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Teacher performance */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-[#191c1d] flex items-center gap-2">
                <GraduationCap size={16} className="text-[#3525cd]" />
                {lang === 'fr' ? 'Performance des enseignants' : 'Teacher Performance'}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-[#464555] uppercase tracking-wider bg-[#f8f9fa] border-b border-gray-100">
                    <th className="px-5 py-3.5 font-semibold">{lang === 'fr' ? 'Enseignant' : 'Teacher'}</th>
                    <th className="px-3 py-3.5 font-semibold hidden sm:table-cell">{lang === 'fr' ? 'Matière' : 'Subject'}</th>
                    <th className="px-3 py-3.5 font-semibold">{lang === 'fr' ? 'Moy.' : 'Avg.'}</th>
                    <th className="px-3 py-3.5 font-semibold hidden md:table-cell">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {teacherPerformance.map((tp, idx) => (
                    <tr key={idx} className="hover:bg-[#f8f9fa] transition-colors">
                      <td className="px-5 py-3.5 font-medium text-[#191c1d]">{tp.name}</td>
                      <td className="px-3 py-3.5 text-[#464555] hidden sm:table-cell">{tp.subject}</td>
                      <td className="px-3 py-3.5">
                        <span className={`font-bold ${tp.avg >= 13 ? 'text-emerald-600' : tp.avg >= 11 ? 'text-amber-600' : 'text-red-600'}`}>
                          {tp.avg}/20
                        </span>
                      </td>
                      <td className="px-3 py-3.5 hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-amber-500 fill-amber-500" />
                          <span className="text-xs font-medium text-[#464555]">{tp.rating}/5</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student grade distribution */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-[#191c1d] mb-6 flex items-center gap-2">
              <PieChart size={16} className="text-[#3525cd]" />
              {lang === 'fr' ? 'Répartition des notes' : 'Grade Distribution'}
            </h2>
            <div className="space-y-4">
              {gradeDistribution.map((g, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-[#191c1d]">{g.grade}</span>
                    <span className="font-bold text-[#464555]">{g.pct}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${g.color}`} style={{ width: `${g.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance trends */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-[#191c1d] mb-6 flex items-center gap-2">
            <Activity size={16} className="text-[#3525cd]" />
            {lang === 'fr' ? 'Tendances de présence' : 'Attendance Trends'}
          </h2>
          <div className="flex items-end gap-4 h-32">
            {attendanceTrends.map((a, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-[#191c1d]">{a.rate}%</span>
                <div
                  className="w-full bg-[#e2dfff] rounded-t-lg relative overflow-hidden"
                  style={{ height: `${((a.rate - 80) / (maxAttendance - 80)) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-[#3525cd] rounded-t-lg" />
                </div>
                <span className="text-[10px] font-bold text-[#464555]">{a.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI recommendations */}
        {(() => {
          const recommendations = generateRecommendations({
            classComparison: classComparison,
            subjectDifficulty: subjectDifficulty,
            attendanceRate: overviewStats.find(s => (s.titleFr || '').includes('présence'))?.value ? parseInt(String(overviewStats.find(s => (s.titleFr || '').includes('présence'))?.value)) : 0,
            classCount: overviewStats.find(s => (s.titleFr || '').includes('Classes'))?.value ? parseInt(String(overviewStats.find(s => (s.titleFr || '').includes('Classes'))?.value)) : 0,
            studentCount: overviewStats.find(s => (s.titleFr || '').includes('élèves'))?.value ? parseInt(String(overviewStats.find(s => (s.titleFr || '').includes('élèves'))?.value)) : 0,
            lang,
          });
          return (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-sm font-semibold text-[#191c1d] mb-4 flex items-center gap-2">
                <Zap size={16} className="text-[#3525cd]" />
                {lang === 'fr' ? 'Recommandations IA' : 'AI Recommendations'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[#f8f9fa] border border-gray-100">
                    <div className={`p-2 rounded-lg ${rec.color} flex-shrink-0`}>
                      <rec.icon size={16} />
                    </div>
                    <p className="text-xs font-medium text-[#191c1d] leading-relaxed">
                      {lang === 'fr' ? rec.textFr : rec.textEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </RoleLayout>
  );
}
