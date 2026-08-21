'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';
import {
  BarChart3, Users, GraduationCap, TrendingUp, CheckCircle,
  Clock, FileText, Award, Loader2, Eye, BookOpen,
  AlertTriangle, Target, Calendar,
} from 'lucide-react';

interface Stats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  averageRate: number;
  attendanceToday: number;
  pendingBulletins: number;
  validatedBulletins: number;
  incidentsThisMonth: number;
}

export default function DirecteurDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0, totalTeachers: 0, totalClasses: 0,
    averageRate: 0, attendanceToday: 0, pendingBulletins: 0,
    validatedBulletins: 0, incidentsThisMonth: 0,
  });
  const [topClasses, setTopClasses] = useState<any[]>([]);
  const [recentResults, setRecentResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'bulletins' | 'reports'>('overview');

  useEffect(() => {
    if (!user?.schoolId) return;
    loadData();
  }, [user?.schoolId]);

  async function loadData() {
    setLoading(true);
    const supabase = getSupabase();
    const schoolId = user!.schoolId;
    const today = new Date().toISOString().split('T')[0];
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

    const [studRes, teachRes, classRes, attRes, incRes, gradesRes] = await Promise.all([
      supabase.from('students').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('is_active', true),
      supabase.from('users').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('role', 'TEACHER'),
      supabase.from('classes').select('id, name, level').eq('school_id', schoolId),
      supabase.from('attendance').select('id, status').eq('school_id', schoolId).eq('date', today),
      supabase.from('behavior_reports').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).gte('created_at', monthStart),
      supabase.from('grades').select('value, class:classes(name)').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(100),
    ]);

    const totalAtt = attRes.data?.length || 0;
    const presentAtt = attRes.data?.filter((a: any) => a.status === 'PRESENT').length || 0;
    const attRate = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 0;

    const grades = gradesRes.data || [];
    const avgGrade = grades.length > 0 ? (grades.reduce((s: number, g: any) => s + (g.value || 0), 0) / grades.length).toFixed(1) : '0';

    const classMap: Record<string, number[]> = {};
    grades.forEach((g: any) => {
      const cn = g.class?.name || 'Autre';
      if (!classMap[cn]) classMap[cn] = [];
      classMap[cn].push(g.value || 0);
    });
    const classAvgs = Object.entries(classMap).map(([name, vals]) => ({
      name,
      average: (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1),
      students: vals.length,
    })).sort((a, b) => parseFloat(b.average) - parseFloat(a.average)).slice(0, 8);

    setStats({
      totalStudents: studRes.count || 0,
      totalTeachers: teachRes.count || 0,
      totalClasses: classRes.data?.length || 0,
      averageRate: parseFloat(avgGrade as string),
      attendanceToday: attRate,
      pendingBulletins: 0,
      validatedBulletins: 0,
      incidentsThisMonth: incRes.count || 0,
    });
    setTopClasses(classAvgs);
    setLoading(false);
  }

  if (loading) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: 'Direction' }, { label: 'Tableau de bord' }]}>
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#3525cd]" />
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Direction' }, { label: 'Tableau de bord' }]}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#191c1d]">Espace Direction</h2>
        <p className="text-[#464555] mt-1">Vue d&apos;ensemble des performances et de la vie scolaire.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 pb-1 overflow-x-auto">
        {[
          { key: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
          { key: 'performance', label: 'Performances', icon: TrendingUp },
          { key: 'bulletins', label: 'Bulletins', icon: FileText },
          { key: 'reports', label: 'Rapports', icon: BookOpen },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-[#3525cd] text-white'
                : 'text-[#464555] hover:bg-gray-100'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Élèves actifs', value: stats.totalStudents.toLocaleString('fr-FR'), icon: Users, color: 'bg-blue-50 text-blue-600' },
              { title: 'Enseignants', value: String(stats.totalTeachers), icon: GraduationCap, color: 'bg-purple-50 text-purple-600' },
              { title: 'Classes', value: String(stats.totalClasses), icon: BookOpen, color: 'bg-green-50 text-green-600' },
              { title: 'Présence aujourd\'hui', value: `${stats.attendanceToday}%`, icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-[#191c1d]">{stat.value}</p>
                <p className="text-sm text-[#464555] mt-1">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600"><AlertTriangle size={18} /></div>
                <span className="text-sm font-medium text-[#464555]">Incidents ce mois</span>
              </div>
              <p className="text-3xl font-bold text-[#191c1d]">{stats.incidentsThisMonth}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600"><Target size={18} /></div>
                <span className="text-sm font-medium text-[#464555]">Moyenne générale</span>
              </div>
              <p className="text-3xl font-bold text-[#191c1d]">{stats.averageRate}/20</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-green-50 text-green-600"><Award size={18} /></div>
                <span className="text-sm font-medium text-[#464555]">Bulletins validés</span>
              </div>
              <p className="text-3xl font-bold text-[#191c1d]">{stats.validatedBulletins}</p>
            </div>
          </div>

          {/* Top Classes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-[#191c1d] mb-4">Classement des classes par moyenne</h3>
            {topClasses.length === 0 ? (
              <p className="text-[#464555] text-sm py-8 text-center">Aucune donnée de notes disponible.</p>
            ) : (
              <div className="space-y-3">
                {topClasses.map((cls, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      i === 0 ? 'bg-yellow-100 text-yellow-700' :
                      i === 1 ? 'bg-gray-100 text-gray-700' :
                      i === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#191c1d]">{cls.name}</p>
                      <p className="text-xs text-[#464555]">{cls.students} notes</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#3525cd]">{cls.average}/20</p>
                    </div>
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#3525cd] to-[#4f46e5] rounded-full"
                        style={{ width: `${(parseFloat(cls.average) / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'performance' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-[#191c1d] mb-4">Analyse des performances</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-sm font-medium text-green-800 mb-1">Taux de réussite global</p>
              <p className="text-3xl font-bold text-green-700">
                {topClasses.length > 0 ? `${Math.round(topClasses.filter(c => parseFloat(c.average) >= 10).length / topClasses.length * 100)}%` : '—'}
              </p>
              <p className="text-xs text-green-600 mt-1">Classes avec moyenne ≥ 10/20</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm font-medium text-blue-800 mb-1">Meilleure classe</p>
              <p className="text-3xl font-bold text-blue-700">{topClasses[0]?.name || '—'}</p>
              <p className="text-xs text-blue-600 mt-1">Moyenne : {topClasses[0]?.average || '—'}/20</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <p className="text-sm font-medium text-purple-800 mb-1">Présence moyenne</p>
              <p className="text-3xl font-bold text-purple-700">{stats.attendanceToday}%</p>
              <p className="text-xs text-purple-600 mt-1">Taux de présence du jour</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl">
              <p className="text-sm font-medium text-amber-800 mb-1">Discipline</p>
              <p className="text-3xl font-bold text-amber-700">{stats.incidentsThisMonth}</p>
              <p className="text-xs text-amber-600 mt-1">Incidents signalés ce mois</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bulletins' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-[#191c1d] mb-4">Gestion des bulletins</h3>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-sm font-medium text-orange-800">En attente de validation</p>
              <p className="text-2xl font-bold text-orange-700 mt-1">{stats.pendingBulletins}</p>
            </div>
            <div className="flex-1 p-4 bg-green-50 rounded-xl border border-green-100">
              <p className="text-sm font-medium text-green-800">Validés</p>
              <p className="text-2xl font-bold text-green-700 mt-1">{stats.validatedBulletins}</p>
            </div>
          </div>
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-[#464555]">Les bulletins en attente de validation apparaîtront ici.</p>
            <p className="text-sm text-gray-400 mt-1">Les enseignants doivent d&apos;abord saisir et soumettre les notes.</p>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-[#191c1d] mb-4">Rapports académiques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Rapport de performance trimestriel', desc: 'Synthèse des résultats par classe et matière', icon: BarChart3 },
              { title: 'Rapport de présences', desc: 'Taux de présence détaillé par période', icon: Clock },
              { title: 'Rapport disciplinaire', desc: 'Synthèse des incidents et sanctions', icon: AlertTriangle },
              { title: 'Palmarès', desc: 'Classement général et mentions', icon: Award },
            ].map((report, i) => (
              <button key={i} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#3525cd] hover:bg-indigo-50/30 transition-all text-left">
                <div className="p-2 rounded-lg bg-indigo-50 text-[#3525cd]"><report.icon size={20} /></div>
                <div>
                  <p className="font-medium text-[#191c1d]">{report.title}</p>
                  <p className="text-sm text-[#464555] mt-0.5">{report.desc}</p>
                </div>
                <Eye size={16} className="text-gray-400 ml-auto mt-1" />
              </button>
            ))}
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
