'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbTeachers } from '@/lib/api';
import { getInitials } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { Mail, BookOpen, Users, CalendarCheck, TrendingUp, Download, Edit, Clock, Award, AlertCircle } from 'lucide-react';

export default function TeacherProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [teacher, setTeacher] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [checkinStats, setCheckinStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [t, p, c] = await Promise.all([
          sbTeachers.get(params.id),
          sbTeachers.getPerformance(params.id),
          sbTeachers.getCheckinStats(params.id),
        ]);
        setTeacher(t);
        setPerformance(p);
        setCheckinStats(c);
      } catch (err: any) {
        setError(err.message || 'Impossible de charger les données de l\'enseignant.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  if (loading) return <RoleLayout role="admin"><div className="text-center py-12 text-slate-400">Chargement...</div></RoleLayout>;
  if (error) return (
    <RoleLayout role="admin">
      <div className="text-center py-12">
        <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
        <p className="text-red-500 font-semibold">{error}</p>
        <button onClick={() => router.push('/teachers')} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold">
          Retour aux enseignants
        </button>
      </div>
    </RoleLayout>
  );
  if (!teacher) return <RoleLayout role="admin"><div className="text-center py-12 text-slate-400">Enseignant introuvable.</div></RoleLayout>;

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Enseignants' }, { label: 'Profil enseignant' }]}>
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row items-end gap-8 mb-10 p-8 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl border border-emerald-200/30">
        <div className="relative">
          <div className="w-32 h-32 rounded-2xl bg-white shadow-xl p-1 overflow-hidden ring-4 ring-white">
            <div className="w-full h-full rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-4xl">
              {getInitials(teacher.user?.name || 'N/A')}
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-lg shadow-lg">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-slate-800">{teacher.user?.name}</h2>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${teacher.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {teacher.status === 'active' ? 'Actif' : 'En congé'}
            </span>
          </div>
          <div className="flex flex-wrap gap-6 text-slate-600 text-sm">
            <span className="flex items-center gap-1"><BookOpen size={14} /> {teacher.subjects?.map((s: any) => s.name).join(', ') || 'N/A'}</span>
            <span>ID : {teacher.employeeId}</span>
            <span>{teacher.user?.email}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {teacher.hireDate ? new Date(teacher.hireDate).toLocaleDateString('fr-FR') : 'N/A'}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="px-6 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-full text-sm"><Download size={16} className="inline mr-1" /> Rapport</button>
          <button onClick={() => router.push('/teachers')} className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-full text-sm"><Edit size={16} className="inline mr-1" /> Modifier</button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-card">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Coordonnées</h3>
            <div className="space-y-3">
              {[
                { label: 'Email', value: teacher.user?.email, icon: Mail },
                { label: 'Téléphone', value: teacher.phone || 'N/A', icon: Mail },
                { label: 'Adresse', value: teacher.address || 'N/A', icon: Mail },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <item.icon size={16} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-card">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Classes assignées</h3>
            <div className="space-y-2">
              {(teacher.classes || []).map((cls: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-semibold text-slate-800">{cls.name}</span>
                  <span className="text-xs text-slate-500">{cls.students?.length || 0} élèves</span>
                </div>
              ))}
              {(!teacher.classes || teacher.classes.length === 0) && (
                <p className="text-sm text-slate-400 text-center py-4">Aucune classe assignée</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-card">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Matières</h3>
            <div className="flex flex-wrap gap-2">
              {(teacher.subjects || []).map((subject: any, i: number) => (
                <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                  {subject.name}
                </span>
              ))}
              {(!teacher.subjects || teacher.subjects.length === 0) && (
                <p className="text-sm text-slate-400">Aucune matière assignée</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-8 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-card text-center">
              <Award className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-3xl font-black text-slate-800">{performance?.averageRating?.toFixed(1) || '—'}</p>
              <p className="text-xs text-slate-500 uppercase font-bold">Évaluation</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-card text-center">
              <Users className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-3xl font-black text-slate-800">{teacher.classes?.length || 0}</p>
              <p className="text-xs text-slate-500 uppercase font-bold">Classes</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-card text-center">
              <CalendarCheck className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-3xl font-black text-slate-800">{checkinStats?.attendanceRate?.toFixed(0) || '—'}%</p>
              <p className="text-xs text-slate-500 uppercase font-bold">Présence</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-card text-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-3xl font-black text-slate-800">{performance?.totalStudents || 0}</p>
              <p className="text-xs text-slate-500 uppercase font-bold">Élèves</p>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white p-8 rounded-xl shadow-card">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Aperçu des performances</h3>
            <div className="space-y-4">
              {[
                { label: 'Qualité pédagogique', value: performance?.teachingQuality || 0 },
                { label: 'Engagement des élèves', value: performance?.studentEngagement || 0 },
                { label: 'Ponctualité', value: performance?.punctuality || 0 },
                { label: 'Correction des devoirs', value: performance?.homeworkReview || 0 },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-700">{item.label}</span>
                    <span className="text-slate-500">{item.value > 0 ? `${item.value}%` : '—'}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-card">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Pointages récents</h3>
            <div className="space-y-3">
              {(checkinStats?.recentCheckins || []).slice(0, 5).map((checkin: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${checkin.status === 'on_time' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="text-sm font-semibold text-slate-800">{new Date(checkin.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <span className="text-sm text-slate-500">{checkin.time}</span>
                </div>
              ))}
              {(!checkinStats?.recentCheckins || checkinStats.recentCheckins.length === 0) && (
                <p className="text-sm text-slate-400 text-center py-4">Aucun pointage récent</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
