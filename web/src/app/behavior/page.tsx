'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { Award, Star, AlertTriangle, TrendingUp, Plus, Loader2 } from 'lucide-react';

export default function BehaviorTrackingPage() {
  const { user } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [stats, setStats] = useState({ meritPoints: 0, awards: 0, positiveRate: 0, incidents: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user?.schoolId) return;
      setLoading(true);
      try {
        const { getSupabase } = await import('@/lib/api/shared');
        const supabase = getSupabase();
        const { data } = await supabase
          .from('students')
          .select('id, first_name, last_name, class:classes(name), behavior_points')
          .eq('school_id', user.schoolId)
          .eq('is_active', true)
          .order('behavior_points', { ascending: false })
          .limit(10);
        if (data) {
          setStudents(data.map((s: any) => ({
            name: `${s.first_name || ''} ${s.last_name || ''}`.trim() || 'Élève',
            grade: s.class?.name || '—',
            points: s.behavior_points || 0,
            trend: 'up',
          })));
          const totalPoints = data.reduce((sum: number, s: any) => sum + (s.behavior_points || 0), 0);
          setStats({
            meritPoints: totalPoints,
            awards: data.filter((s: any) => (s.behavior_points || 0) >= 30).length,
            positiveRate: data.length > 0 ? Math.round((data.filter((s: any) => (s.behavior_points || 0) >= 10).length / data.length) * 100) : 0,
            incidents: 0,
          });
        }
      } catch (err) {
        console.error('Error loading behavior data:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user?.schoolId]);

  if (loading) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: 'Management' }, { label: 'Behavior & Awards' }]}>
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#3525cd]" />
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Management' }, { label: 'Behavior & Awards' }]}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#191c1d]">Conduct & Achievement</h2>
          <p className="text-[#464555] mt-1">Monitor student growth and recognize positive contributions.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.location.href = '/censeur'} className="px-5 py-2.5 bg-[#e7e8e9] text-[#3525cd] font-semibold rounded-full text-sm">View Reports</button>
          <button onClick={() => window.location.href = '/censeur?action=new'} className="px-5 py-2.5 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-semibold rounded-full text-sm flex items-center gap-2">
            <Plus size={16} /> New Incident
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Merit Points', value: stats.meritPoints.toLocaleString('fr-FR'), icon: Award, color: 'text-[#0060ac]' },
          { title: 'Awards This Month', value: String(stats.awards), icon: Star, color: 'text-[#3525cd]' },
          { title: 'Positive Rate', value: `${stats.positiveRate}%`, icon: TrendingUp, color: 'text-emerald-600' },
          { title: 'Open Incidents', value: String(stats.incidents), icon: AlertTriangle, color: 'text-[#ba1a1a]' },
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl shadow-card">
            <stat.icon size={24} className={stat.color} />
            <p className="text-2xl font-bold text-[#191c1d] mt-2">{stat.value}</p>
            <p className="text-sm text-[#464555]">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-card">
        <div className="p-6 border-b border-[#c7c4d8]/10">
          <h3 className="text-lg font-bold text-[#191c1d]">Student Rankings</h3>
        </div>
        <div className="divide-y divide-[#c7c4d8]/10">
          {students.length === 0 ? (
            <div className="p-8 text-center text-[#464555]">Aucun élève trouvé</div>
          ) : students.map((s, i) => (
            <div key={i} className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-[#464555]">#{i + 1}</span>
                <div>
                  <p className="font-semibold text-[#191c1d]">{s.name}</p>
                  <p className="text-xs text-[#464555]">{s.grade}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-[#3525cd]">+{s.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </RoleLayout>
  );
}
