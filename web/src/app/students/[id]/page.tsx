'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbStudents } from '@/lib/api';
import { getInitials } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { Mail, GraduationCap, Users, CalendarCheck, TrendingUp, Download, Edit, AlertCircle } from 'lucide-react';

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [student, setStudent] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [s, p] = await Promise.all([
          sbStudents.get(params.id),
          sbStudents.getPerformance(params.id),
        ]);
        setStudent(s);
        setPerformance(p);
      } catch (err: any) {
        setError(err.message || 'Impossible de charger les données de l\'élève.');
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
        <button onClick={() => router.push('/students')} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold">
          Retour aux élèves
        </button>
      </div>
    </RoleLayout>
  );
  if (!student) return <RoleLayout role="admin"><div className="text-center py-12 text-slate-400">Élève introuvable.</div></RoleLayout>;

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Élèves' }, { label: 'Profil élève' }]}>
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row items-end gap-8 mb-10 p-8 bg-gradient-to-br from-[#4f46e5]/5 to-transparent rounded-2xl border border-[#c7c4d8]/10">
        <div className="relative">
          <div className="w-32 h-32 rounded-2xl bg-white shadow-xl p-1 overflow-hidden ring-4 ring-white">
            <div className="w-full h-full rounded-xl bg-[#e2dfff] flex items-center justify-center text-[#3525cd] font-bold text-4xl">
              {getInitials(student.user?.name || 'Non renseigné')}
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#3525cd] text-white p-2 rounded-lg shadow-lg">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-[#191c1d]">{student.user?.name}</h2>
            <span className="px-3 py-1 bg-[#64a8fe]/20 text-[#0060ac] text-xs font-bold rounded-full">Élève actif</span>
          </div>
          <div className="flex flex-wrap gap-6 text-[#464555] text-sm">
            <span>Classe {student.class?.name || 'Non renseigné'}</span>
            <span>Matricule : {student.matricule}</span>
            <span>{student.user?.email}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="px-6 py-2.5 bg-[#e7e8e9] text-[#191c1d] font-semibold rounded-full text-sm"><Download size={16} className="inline mr-1" /> Rapport</button>
          <button onClick={() => router.push('/students')} className="px-6 py-2.5 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-semibold rounded-full text-sm"><Edit size={16} className="inline mr-1" /> Modifier</button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-card">
            <h3 className="text-sm font-bold text-[#464555] uppercase tracking-wider mb-4">Données personnelles</h3>
            <div className="space-y-3">
              {[
                { label: 'Date de naissance', value: student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('fr-FR') : 'Non renseigné' },
                { label: 'Genre', value: student.gender === 'M' ? 'Masculin' : 'Féminin' },
                { label: 'Adresse', value: student.address || 'Non renseigné' },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-[#f3f4f5] rounded-lg">
                  <p className="text-[10px] uppercase font-bold text-[#464555]">{item.label}</p>
                  <p className="text-sm font-semibold text-[#191c1d]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-card">
            <h3 className="text-sm font-bold text-[#464555] uppercase tracking-wider mb-4">Informations du parent</h3>
            <div className="flex items-center gap-3 p-3 bg-[#f3f4f5] rounded-lg">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center"><Users size={18} className="text-slate-500" /></div>
              <div>
                <p className="text-sm font-semibold text-[#191c1d]">{student.parent?.name || 'Non assigné'}</p>
                <p className="text-xs text-[#464555]">{student.parent?.email || 'Non renseigné'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-card">
            <h3 className="text-lg font-bold text-[#191c1d] mb-6">Performance académique</h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#e2dfff] p-4 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-[#464555]">Moyenne</p>
                <p className="text-3xl font-black text-[#3525cd]">{performance?.overallAverage?.toFixed(2) || '—'}</p>
              </div>
              <div className="bg-[#f3f4f5] p-4 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-[#464555]">Rang</p>
                <p className="text-3xl font-black text-[#191c1d]">{performance?.rank || '—'}</p>
              </div>
              <div className="bg-[#f3f4f5] p-4 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-[#464555]">Présence</p>
                <p className="text-3xl font-black text-[#191c1d]">{performance?.attendanceRate ? `${performance.attendanceRate}%` : '—'}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-card">
            <h3 className="text-sm font-bold text-[#191c1d] mb-4">Notes récentes</h3>
            <div className="space-y-3">
              {(performance?.grades || []).slice(0, 5).map((grade: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#f3f4f5] rounded-lg">
                  <span className="text-sm font-semibold">{grade.subject?.name || 'Matière'}</span>
                  <span className="text-lg font-bold text-[#3525cd]">{grade.score}/{grade.maxScore}</span>
                </div>
              ))}
              {(!performance?.grades || performance.grades.length === 0) && (
                <p className="text-sm text-slate-400 text-center py-4">Aucune note disponible</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
