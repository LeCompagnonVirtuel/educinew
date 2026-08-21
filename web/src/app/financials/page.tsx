'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import StatCard from '@/components/ui/StatCard';
import { sbFinance } from '@/lib/api';
import { BarChart3, TrendingUp, PieChart, Download, Calendar, Loader2 } from 'lucide-react';

export default function FinancialAnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await sbFinance.getStats();
        setStats(data);
      } catch (e: any) {
        setError(e.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalRevenue = stats?.totalRevenue || 0;
  const pending = stats?.totalPending || 0;
  const collectionRate = stats?.collectionRate || 0;

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Payments' }, { label: 'Financial Analytics' }]}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="text-xs font-bold text-[#3525cd] uppercase tracking-widest">Financial Overview</span>
          <h2 className="text-3xl font-bold text-[#191c1d] mt-1">Analytics Dashboard</h2>
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.location.href = '/comptable/reports'} className="flex items-center gap-2 px-5 py-2.5 bg-[#e7e8e9] text-[#464555] font-semibold rounded-full text-sm">
            <Calendar size={16} /> This Year
          </button>
          <button onClick={() => window.location.href = '/comptable/reports?export=true'} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-semibold rounded-full text-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-4 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-[#3525cd]" /></div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Revenue" value={`${(totalRevenue / 1000000).toFixed(2)}M FCFA`} icon={BarChart3} change="+12.5%" changeType="up" />
            <StatCard title="Outstanding" value={`${(pending / 1000).toFixed(1)}K FCFA`} icon={TrendingUp} change="+4.2%" changeType="down" iconBg="bg-amber-50" iconColor="text-amber-600" />
            <StatCard title="Collection Rate" value={`${collectionRate}%`} icon={PieChart} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
            <StatCard title="Net Income" value={`${((totalRevenue) / 1000000).toFixed(2)}M FCFA`} icon={BarChart3} iconBg="bg-[#e2dfff]" iconColor="text-[#3525cd]" />
          </div>

          <div className="bg-white p-8 rounded-xl shadow-card">
            <h3 className="text-lg font-bold text-[#191c1d] mb-6">Revenue Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Academic Staff', pct: 62, color: '#3525cd' },
                { name: 'Infrastructure', pct: 18, color: '#0060ac' },
                { name: 'Materials', pct: 12, color: '#7e3000' },
              ].map((item) => (
                <div key={item.name} className="p-4 bg-[#f3f4f5] rounded-xl">
                  <p className="text-xs font-bold text-[#464555] uppercase">{item.name}</p>
                  <p className="text-2xl font-bold text-[#191c1d] mt-1">{item.pct}%</p>
                  <div className="w-full h-1.5 bg-[#e7e8e9] rounded-full mt-2 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </RoleLayout>
  );
}
