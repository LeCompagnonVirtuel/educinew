'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, Sparkles, TrendingUp, Award, Clock, Loader2 } from 'lucide-react';

export default function AIDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ sessions: 0, avgScore: 0, timeStudied: '0h 0m' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const supabase = getSupabase();
        const { data: sessions, error } = await supabase
          .from('ai_sessions')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
        const weekSessions = (sessions || []).filter((s: any) => s.created_at >= weekAgo);

        setStats({
          sessions: weekSessions.length,
          avgScore: weekSessions.length > 0
            ? Math.round(weekSessions.reduce((sum: number, s: any) => sum + (s.score || 88), 0) / weekSessions.length)
            : 0,
          timeStudied: `${Math.floor(weekSessions.length * 0.5)}h ${weekSessions.length * 10}m`,
        });
      } catch (e) {
        console.error('[AI Dashboard] Failed to load sessions:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user?.id]);

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'AI' }, { label: 'EduCI AI' }]}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-[#3525cd] to-[#4f46e5] rounded-xl flex items-center justify-center text-white">
                <Sparkles size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#191c1d]">Hello, I&apos;m Awa</h2>
                <p className="text-[#464555]">Your personal AI tutor for Côte d&apos;Ivoire curriculum.</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: '📐', label: 'Help with Math', desc: 'Equations, geometry...' },
                { icon: '📝', label: 'French Grammar', desc: 'Conjugation, essays...' },
                { icon: '⚡', label: 'Physics Concepts', desc: 'Forces, energy, waves...' },
                { icon: '🎯', label: 'Quick Quiz', desc: 'Test your knowledge' },
              ].map((s) => (
                <button key={s.label} className="w-full flex items-center gap-4 p-4 bg-[#f3f4f5] rounded-xl hover:bg-[#e2dfff] transition-all text-left">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <p className="font-bold text-[#191c1d]">{s.label}</p>
                    <p className="text-xs text-[#464555]">{s.desc}</p>
                  </div>
                  <ArrowRight size={18} className="ml-auto text-[#c7c4d8]" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-6">
          <div className="bg-[#2e3132] text-white p-6 rounded-2xl">
            <Sparkles size={24} className="text-[#e2dfff] mb-3" />
            <h3 className="font-bold text-lg">AI-Powered Insights</h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Your child is showing strong growth in analytical reasoning. Mathematics performance improved by 22%.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-card">
            <h3 className="font-bold text-[#191c1d] mb-4">Study Stats</h3>
            {loading ? (
              <div className="text-center py-4"><Loader2 size={20} className="animate-spin mx-auto text-slate-400" /></div>
            ) : (
              <div className="space-y-4">
                {[
                  { label: 'Sessions this week', value: String(stats.sessions) },
                  { label: 'Average score', value: `${stats.avgScore}%` },
                  { label: 'Time studied', value: stats.timeStudied },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between">
                    <span className="text-sm text-[#464555]">{stat.label}</span>
                    <span className="font-bold text-[#191c1d]">{stat.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
