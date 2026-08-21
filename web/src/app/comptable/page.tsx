'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RoleLayout from '@/components/layout/RoleLayout';
import {
  CreditCard, DollarSign, TrendingUp, AlertTriangle,
  ArrowUp, ArrowDown, Download, Bell, Plus, ChevronRight,
  CheckCircle, Clock,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { useRealtimeSubscription } from '@/hooks/useRealtime';
import { sbFinance, sbPayments } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

function useFinancialData() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [s, p] = await Promise.allSettled([
          sbFinance.getStats(),
          sbPayments.listBySchool(user?.schoolId),
        ]);
        if (s.status === 'fulfilled') setStats(s.value);
        if (p.status === 'fulfilled') setPayments(p.value || []);
      } catch (err) {
        // Error handled by catch block
      }
      setLoading(false);
    }
    if (user?.schoolId) load();
  }, [user?.schoolId]);

  return { stats, payments, loading };
}

const statCards = [
  {
    titleFr: 'Revenus du jour',
    titleEn: "Today's Revenue",
    value: '...',
    key: 'dailyRevenue',
    icon: DollarSign,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-500',
    change: '',
    changeType: 'up' as const,
  },
  {
    titleFr: 'Revenus total',
    titleEn: 'Total Revenue',
    value: '...',
    key: 'totalRevenue',
    icon: TrendingUp,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-500',
    change: '',
    changeType: 'up' as const,
  },
  {
    titleFr: 'Paiements complétés',
    titleEn: 'Completed Payments',
    value: '...',
    key: 'totalTransactions',
    icon: CreditCard,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-500',
    subtitle: '',
  },
  {
    titleFr: 'En attente',
    titleEn: 'Pending',
    value: '...',
    key: 'pendingCount',
    icon: AlertTriangle,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    borderColor: 'border-red-500',
    change: '',
    changeType: 'down' as const,
  },
];

const METHOD_COLORS: Record<string, string> = {
  'MOBILE_MONEY': 'bg-orange-500',
  'ESPECES': 'bg-emerald-500',
  'VIREMENT': 'bg-blue-500',
  'CHEQUE': 'bg-amber-400',
  'CARTE': 'bg-violet-500',
};

const METHOD_LABELS: Record<string, string> = {
  'MOBILE_MONEY': 'Mobile Money',
  'ESPECES': 'Espèces',
  'VIREMENT': 'Virement',
  'CHEQUE': 'Chèque',
  'CARTE': 'Carte',
};

const statusConfig: Record<string, { labelFr: string; labelEn: string; bg: string; text: string }> = {
  paid: { labelFr: 'Payé', labelEn: 'Paid', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  pending: { labelFr: 'En attente', labelEn: 'Pending', bg: 'bg-amber-50', text: 'text-amber-700' },
  overdue: { labelFr: 'En retard', labelEn: 'Overdue', bg: 'bg-red-50', text: 'text-red-700' },
};

export default function ComptableDashboard() {
  const { lang } = useLanguage();
  const { school } = useSchool();
  const { stats, payments, loading: finLoading } = useFinancialData();

  // Realtime: auto-refresh when payments change
  useRealtimeSubscription([
    { table: 'payments', event: '*', onData: () => {} },
  ]);

  const dynamicCards = statCards.map(card => ({
    ...card,
    value: stats ? (
      card.key === 'totalRevenue' ? formatCurrency(stats.totalRevenue || 0) :
      card.key === 'totalTransactions' ? String(stats.totalTransactions || 0) :
      card.key === 'pendingCount' ? String(stats.pendingCount || 0) :
      card.key === 'dailyRevenue' ? formatCurrency(stats.dailyRevenue || 0) :
      card.value
    ) : (finLoading ? '...' : '0'),
  }));

  const recentTransactions = payments.map((p: any) => ({
    student: p.student?.user?.name || p.student_name || '—',
    class: p.student?.class?.name || '',
    amount: formatCurrency(p.amount || 0),
    method: METHOD_LABELS[p.method] || p.method || '—',
    date: p.created_at ? new Date(p.created_at).toLocaleDateString('fr-FR') : '',
    status: (p.status || 'PENDING').toLowerCase() === 'completed' ? 'paid' : (p.status || '').toLowerCase() === 'pending' ? 'pending' : 'overdue',
  }));

  const methodCounts: Record<string, number> = {};
  payments.forEach((p: any) => { methodCounts[p.method || 'ESPECES'] = (methodCounts[p.method || 'ESPECES'] || 0) + 1; });
  const totalPayments = payments.length || 1;
  const paymentMethods = Object.entries(methodCounts).map(([name, count]) => ({
    name: METHOD_LABELS[name] || name,
    pct: Math.round((count / totalPayments) * 100),
    color: METHOD_COLORS[name] || 'bg-gray-400',
  })).sort((a, b) => b.pct - a.pct);

  const monthlyBars = (() => {
    const months: Record<string, number> = {};
    payments.forEach((p: any) => {
      if (!p.created_at) return;
      const d = new Date(p.created_at);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      months[key] = (months[key] || 0) + (p.amount || 0);
    });
    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([key, value]) => {
        const [y, m] = key.split('-');
        const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        return { month: monthNames[parseInt(m) - 1], value };
      });
  })();
  const maxBarValue = Math.max(...monthlyBars.map(b => b.value), 1);

  return (
    <RoleLayout role="comptable" breadcrumbs={[{ label: lang === 'fr' ? 'Tableau de bord' : 'Dashboard' }]}>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-[#191c1d]">
            {lang === 'fr' ? 'Tableau de bord comptable' : 'Accountant Dashboard'}
          </h1>
          <p className="text-sm text-[#464555] mt-1">
            {lang === 'fr' ? 'Vue d\'ensemble des finances' : 'Financial overview'}
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dynamicCards.map((card, idx) => (
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
              {card.subtitle && <p className="text-xs text-[#464555] mt-0.5">{card.subtitle}</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent transactions */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-[#191c1d] flex items-center gap-2">
                <CreditCard size={16} className="text-[#3525cd]" />
                {lang === 'fr' ? 'Transactions récentes' : 'Recent Transactions'}
              </h2>
              <Link href="/comptable/payments" className="text-xs text-[#3525cd] font-medium hover:underline flex items-center gap-1">
                {lang === 'fr' ? 'Voir tout' : 'View all'} <ChevronRight size={12} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-[#464555] uppercase tracking-wider border-b border-gray-100">
                    <th className="px-5 py-3 font-semibold">{lang === 'fr' ? 'Élève' : 'Student'}</th>
                    <th className="px-3 py-3 font-semibold">{lang === 'fr' ? 'Montant' : 'Amount'}</th>
                    <th className="px-3 py-3 font-semibold hidden sm:table-cell">{lang === 'fr' ? 'Méthode' : 'Method'}</th>
                    <th className="px-3 py-3 font-semibold hidden md:table-cell">{lang === 'fr' ? 'Date' : 'Date'}</th>
                    <th className="px-5 py-3 font-semibold">{lang === 'fr' ? 'Statut' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentTransactions.slice(0, 5).map((tx, idx) => {
                    const st = statusConfig[tx.status];
                    return (
                      <tr key={idx} className="hover:bg-[#f8f9fa] transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-[#191c1d]">{tx.student}</p>
                          <p className="text-xs text-[#464555]">{tx.class}</p>
                        </td>
                        <td className="px-3 py-3.5 font-semibold text-[#191c1d]">{tx.amount}</td>
                        <td className="px-3 py-3.5 text-[#464555] hidden sm:table-cell">{tx.method}</td>
                        <td className="px-3 py-3.5 text-[#464555] hidden md:table-cell">{tx.date}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${st.bg} ${st.text}`}>
                            {lang === 'fr' ? st.labelFr : st.labelEn}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment method distribution */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-[#191c1d] mb-4">
              {lang === 'fr' ? 'Répartition par méthode' : 'Payment Methods'}
            </h2>
            <div className="space-y-4">
              {paymentMethods.map((pm, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-[#191c1d]">{pm.name}</span>
                    <span className="font-bold text-[#464555]">{pm.pct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${pm.color}`} style={{ width: `${pm.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly revenue bar chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-[#191c1d] mb-6 flex items-center gap-2">
            <TrendingUp size={16} className="text-[#3525cd]" />
            {lang === 'fr' ? 'Revenus mensuels' : 'Monthly Revenue'}
          </h2>
          <div className="flex items-end gap-3 h-40">
            {monthlyBars.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-[#464555]">
                  {(bar.value / 1000000).toFixed(1)}M
                </span>
                <div
                  className="w-full bg-[#e2dfff] rounded-t-lg relative overflow-hidden"
                  style={{ height: `${(bar.value / maxBarValue) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-[#3525cd] rounded-t-lg" />
                </div>
                <span className="text-[10px] font-bold text-[#464555]">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-[#191c1d] mb-4">
            {lang === 'fr' ? 'Actions rapides' : 'Quick Actions'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/payments" className="flex items-center gap-3 p-4 rounded-xl bg-[#3525cd] text-white hover:bg-[#4f46e5] transition-colors">
              <div className="p-2 rounded-lg bg-white/20">
                <Plus size={18} />
              </div>
              <span className="text-sm font-semibold">{lang === 'fr' ? 'Nouveau paiement' : 'New Payment'}</span>
            </Link>
            <Link href="/comptable/reports" className="flex items-center gap-3 p-4 rounded-xl bg-[#f8f9fa] text-[#191c1d] hover:bg-gray-100 transition-colors border border-gray-100">
              <div className="p-2 rounded-lg bg-blue-50">
                <Download size={18} className="text-blue-600" />
              </div>
              <span className="text-sm font-semibold">{lang === 'fr' ? 'Exporter rapport' : 'Export Report'}</span>
            </Link>
            <button className="flex items-center gap-3 p-4 rounded-xl bg-[#f8f9fa] text-[#191c1d] hover:bg-gray-100 transition-colors border border-gray-100">
              <div className="p-2 rounded-lg bg-amber-50">
                <Bell size={18} className="text-amber-600" />
              </div>
              <span className="text-sm font-semibold">{lang === 'fr' ? 'Envoyer rappel' : 'Send Reminder'}</span>
            </button>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
