'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbDashboard } from '@/lib/api';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { useLanguage } from '@/hooks/useLanguage';
import { TrendingUp, BookOpen, Clock, Award, Sparkles, Calendar, ChevronRight, Loader2 } from 'lucide-react';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const { school } = useSchool();
  const { lang } = useLanguage();
  const [stats, setStats] = useState<any>(null);
  const [bulletins, setBulletins] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    async function load() {
      try {
        const [statsRes, bulletinsRes, assignmentsRes] = await Promise.allSettled([
          sbDashboard.getStudentStats(user!.id),
          sbDashboard.getStudentBulletins(user!.id),
          getSupabase().from('assignments')
            .select('id, title, due_date, subject:subjects(name)')
            .gte('due_date', new Date().toISOString())
            .order('due_date', { ascending: true })
            .limit(5),
        ]);

        if (statsRes.status === 'fulfilled') setStats(statsRes.value);
        if (bulletinsRes.status === 'fulfilled' && (bulletinsRes.value as any)?.bulletins)
          setBulletins((bulletinsRes.value as any).bulletins);
        if (assignmentsRes.status === 'fulfilled')
          setAssignments(assignmentsRes.value?.data || []);
      } catch (err) {
        // Error handled by catch block
      }
      setLoading(false);
    }
    load();
  }, [user?.id]);

  const average = stats?.average ?? null;
  const rank = stats?.rank ?? null;
  const attendance = stats?.attendance ?? null;

  return (
    <RoleLayout role="student">
      {loading ? (
        <div className="text-center py-12"><Loader2 size={32} className="animate-spin mx-auto text-slate-400" /></div>
      ) : (
        <>
          <div className="bg-gradient-to-r from-[var(--color-primary,#3525cd)] to-[var(--color-secondary,#4f46e5)] rounded-2xl p-8 text-white mb-8">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-indigo-200">{lang === 'fr' ? 'Mon parcours' : 'My Journey'}</span>
                <h2 className="text-3xl font-bold mt-1">{lang === 'fr' ? 'Bienvenue' : 'Welcome'}, {user?.name?.split(' ')[0] || 'Élève'}</h2>
                <p className="text-indigo-100 mt-2">
                  {average !== null ? `Moyenne: ${average}/20` : 'Aucune note'}
                  {rank !== null && ` — Rang: ${rank}`}
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black">{attendance !== null ? `${attendance}%` : '—'}</div>
                <div className="text-xs text-indigo-200">{lang === 'fr' ? 'Présence' : 'Attendance'}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Upcoming assignments */}
            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-card">
              <h3 className="text-lg font-bold text-[#191c1d] mb-4">{lang === 'fr' ? 'Devoirs à venir' : 'Upcoming Assignments'}</h3>
              {assignments.length > 0 ? (
                <div className="space-y-3">
                  {assignments.map((a: any) => (
                    <div key={a.id} className="flex items-center gap-4 p-4 bg-[#f8f9fa] rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-primary,#3525cd)]" />
                      <div className="flex-1">
                        <p className="font-semibold text-[#191c1d]">{a.title}</p>
                        <p className="text-xs text-[#464555]">{a.subject?.name || '—'} — Échéance: {a.due_date ? new Date(a.due_date).toLocaleDateString('fr-FR') : '—'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 text-center py-4">Aucun devoir à venir</p>
              )}
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              {[
                { icon: BookOpen, label: lang === 'fr' ? 'Notes' : 'Grades', href: '/student/grades', color: 'bg-[#e2dfff]' },
                { icon: Award, label: lang === 'fr' ? 'Bulletins' : 'Report Cards', href: '/bulletin', color: 'bg-emerald-50' },
                { icon: Sparkles, label: 'EduCI AI', href: '/ai', color: 'bg-amber-50' },
              ].map((link, i) => (
                <a key={i} href={link.href} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-card hover:shadow-md transition-all">
                  <div className={`w-10 h-10 rounded-xl ${link.color} flex items-center justify-center`}>
                    <link.icon size={20} />
                  </div>
                  <span className="font-semibold text-[#191c1d]">{link.label}</span>
                  <ChevronRight size={16} className="ml-auto text-slate-300" />
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </RoleLayout>
  );
}
