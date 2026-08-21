'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbClasses } from '@/lib/api';
import { useLanguage } from '@/hooks/useLanguage';
import { Users, BookOpen, TrendingUp, Calendar, Award, Edit, Download, UserPlus, AlertCircle } from 'lucide-react';

export default function ClassProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [classData, setClassData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await sbClasses.get(params.id);
        setClassData(data);
      } catch (err: any) {
        setError(err.message || 'Impossible de charger les données de la classe.');
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
        <button onClick={() => router.push('/classes')} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold">
          Retour aux classes
        </button>
      </div>
    </RoleLayout>
  );
  if (!classData) return <RoleLayout role="admin"><div className="text-center py-12 text-slate-400">Classe introuvable.</div></RoleLayout>;

  const levelColors: Record<string, string> = {
    '6eme': 'from-amber-400 to-amber-600',
    '5eme': 'from-orange-400 to-orange-600',
    '4eme': 'from-red-400 to-red-600',
    '3eme': 'from-rose-400 to-rose-600',
    '2nde': 'from-blue-400 to-blue-600',
    '1ere': 'from-indigo-400 to-indigo-600',
    'Tle': 'from-purple-400 to-purple-600',
  };

  const streamColors: Record<string, string> = {
    'A': 'bg-blue-100 text-blue-700',
    'B': 'bg-green-100 text-green-700',
    'C': 'bg-purple-100 text-purple-700',
    'D': 'bg-amber-100 text-amber-700',
    'S': 'bg-red-100 text-red-700',
  };

  const mainColor = levelColors[classData.level] || 'from-slate-400 to-slate-600';
  const streamColor = streamColors[classData.stream] || 'bg-slate-100 text-slate-700';

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Classes' }, { label: classData.name }]}>
      {/* Hero Header */}
      <div className={`flex flex-col md:flex-row items-end gap-8 mb-10 p-8 bg-gradient-to-br ${mainColor} bg-opacity-10 rounded-2xl border border-white/50 shadow-lg`}>
        <div className="relative">
          <div className="w-32 h-32 rounded-2xl bg-white shadow-xl p-4 overflow-hidden ring-4 ring-white flex items-center justify-center">
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <span className="text-5xl font-black text-slate-600">{classData.level?.charAt(0) || 'C'}</span>
            </div>
          </div>
          {classData.stream && (
            <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-lg text-white text-xs font-bold shadow-lg ${streamColor.replace('100', '500').replace('700', '600')}`}>
              Filière {classData.stream}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-slate-800">{classData.name}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${streamColor}`}>
              Année scolaire {classData.academicYear || '2024'}
            </span>
          </div>
          <div className="flex flex-wrap gap-6 text-slate-600 text-sm">
            <span className="flex items-center gap-1"><BookOpen size={14} /> Niveau : {classData.level}</span>
            <span className="flex items-center gap-1"><Users size={14} /> {classData.students?.length || 0} Élèves</span>
            <span className="flex items-center gap-1"><Award size={14} /> Prof principal : {classData.mainTeacher?.user?.name || 'Non assigné'}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => router.push(`/students?classId=${params.id}`)} className="px-6 py-2.5 bg-white text-slate-700 font-semibold rounded-full text-sm shadow-sm"><UserPlus size={16} className="inline mr-1" /> Ajouter élève</button>
          <button onClick={() => window.print()} className="px-6 py-2.5 bg-white text-slate-700 font-semibold rounded-full text-sm shadow-sm"><Download size={16} className="inline mr-1" /> Rapport</button>
          <button onClick={() => router.push(`/classes`)} className="px-6 py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold rounded-full text-sm shadow-sm"><Edit size={16} className="inline mr-1" /> Modifier</button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="md:col-span-4 space-y-6">
          {/* Class Info */}
          <div className="bg-white p-6 rounded-xl shadow-card">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Informations de la classe</h3>
            <div className="space-y-3">
              {[
                { label: 'Niveau', value: classData.level },
                { label: 'Filière', value: classData.stream || 'Général' },
                { label: 'Année scolaire', value: classData.academicYear || '2024' },
                { label: 'Salle', value: classData.room || '—' },
                { label: 'Capacité', value: `${classData.students?.length || 0} / ${classData.capacity || 40}` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-xs uppercase font-bold text-slate-500">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Teacher */}
          <div className="bg-white p-6 rounded-xl shadow-card">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Professeur principal</h3>
            {classData.mainTeacher ? (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg">
                  {classData.mainTeacher.user?.name?.charAt(0) || 'T'}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{classData.mainTeacher.user?.name}</p>
                  <p className="text-xs text-slate-500">{classData.mainTeacher.user?.email}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-slate-400">
                <p className="text-sm">Aucun enseignant assigné</p>
                <button onClick={() => router.push('/teachers')} className="mt-2 text-sm text-indigo-600 font-semibold">Assigner un enseignant</button>
              </div>
            )}
          </div>

          {/* Schedule Preview */}
          <div className="bg-white p-6 rounded-xl shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Emploi du temps</h3>
              <button onClick={() => router.push('/timetable')} className="text-xs text-indigo-600 font-semibold">Voir tout</button>
            </div>
            <div className="space-y-2">
              {['Lundi', 'Mercredi', 'Vendredi'].map((day) => (
                <div key={day} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-semibold text-slate-700">{day}</span>
                  <span className="text-xs text-slate-500">8:00 - 16:00</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-8 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-card text-center">
              <Users className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
              <p className="text-3xl font-black text-slate-800">{classData.students?.length || 0}</p>
              <p className="text-xs text-slate-500 uppercase font-bold">Élèves</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-card text-center">
              <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-3xl font-black text-slate-800">{classData.averageScore?.toFixed(1) || '—'}</p>
              <p className="text-xs text-slate-500 uppercase font-bold">Moyenne</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-card text-center">
              <Award className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-3xl font-black text-slate-800">{classData.passRate || '—'}%</p>
              <p className="text-xs text-slate-500 uppercase font-bold">Réussite</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-card text-center">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-3xl font-black text-slate-800">{classData.subjects?.length || 0}</p>
              <p className="text-xs text-slate-500 uppercase font-bold">Matières</p>
            </div>
          </div>

          {/* Subjects */}
          <div className="bg-white p-8 rounded-xl shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Matières de la classe</h3>
              <button onClick={() => router.push('/classes')} className="text-sm text-indigo-600 font-semibold">Gérer les matières</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(classData.subjects || []).map((subject: any, i: number) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl text-center">
                  <p className="text-sm font-bold text-slate-800 mb-1">{subject.name}</p>
                  <p className="text-xs text-slate-500">{subject.teacher}</p>
                </div>
              ))}
              {(!classData.subjects || classData.subjects.length === 0) && (
                <p className="col-span-4 text-sm text-slate-400 text-center py-4">Aucune matière assignée</p>
              )}
            </div>
          </div>

          {/* Students List */}
          <div className="bg-white p-6 rounded-xl shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">Élèves ({classData.students?.length || 0})</h3>
              <button onClick={() => router.push(`/students?classId=${params.id}`)} className="text-xs text-indigo-600 font-semibold">Voir tout</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase font-bold border-b">
                    <th className="pb-3">Matricule</th>
                    <th className="pb-3">Nom</th>
                    <th className="pb-3">Genre</th>
                    <th className="pb-3">Moyenne</th>
                    <th className="pb-3">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {(classData.students || []).slice(0, 10).map((student: any, i: number) => (
                    <tr key={i} className="text-sm">
                      <td className="py-3 font-mono text-slate-600">{student.matricule}</td>
                      <td className="py-3 font-semibold text-slate-800">{student.user?.name}</td>
                      <td className="py-3 text-slate-600">{student.gender === 'M' ? 'M' : 'F'}</td>
                      <td className="py-3 font-semibold text-slate-800">{student.averageScore?.toFixed(1) || '—'}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${student.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {student.status === 'active' ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {(!classData.students || classData.students.length === 0) && (
              <p className="text-center py-6 text-sm text-slate-400">Aucun élève dans cette classe</p>
            )}
            {(classData.students?.length || 0) > 10 && (
              <div className="mt-4 text-center">
                <button onClick={() => router.push(`/students?classId=${params.id}`)} className="text-sm text-indigo-600 font-semibold">Voir les {classData.students?.length} élèves</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
