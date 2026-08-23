'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import {
  BarChart3, Download, FileText, TrendingUp, TrendingDown,
  DollarSign, CreditCard, Calendar, Printer, PieChart, Loader2,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { sbPayments, sbFinance, sbClasses } from '@/lib/api';
import { getSupabase } from '@/lib/api/shared';
import { getAuthenticatedSchoolId } from '@/lib/api/secure';
import { exportToFile, type ExportColumn } from '@/lib/export-utils';
import { useExportBranding } from '@/hooks/useExportBranding';

export default function ReportsPage() {
  const { lang } = useLanguage();
  const exportBranding = useExportBranding();
  const [stats, setStats] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [classesList, setClassesList] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState(true);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return d.toISOString().slice(0, 7);
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabase();
        const schoolId = await getAuthenticatedSchoolId();
        const [statsData, paymentsData, classesData, expensesResult] = await Promise.all([
          sbFinance.getStats(),
          sbPayments.list(),
          sbClasses.list().catch(() => []),
          supabase.from('expenses').select('amount').eq('school_id', schoolId || ''),
        ]);
        setStats(statsData);
        setPayments(paymentsData || []);
        setClassesList(Array.isArray(classesData) ? classesData : []);
        const expenses = expensesResult.data || [];
        setTotalExpenses(expenses.reduce((sum: number, e: any) => sum + (e.amount || 0), 0));
      } catch (e: any) {
        setError(e.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalRevenue = stats?.totalRevenue || 0;
  const netIncome = totalRevenue - totalExpenses;
  const collectionRate = stats?.collectionRate || 0;

  const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const monthPayments = payments.filter((p: any) => {
      const pDate = p.createdAt || p.created_at;
      return pDate && pDate.startsWith(monthStr);
    });
    const revenue = monthPayments.filter((p: any) => p.status === 'COMPLETED' || p.status === 'PAID').reduce((s: number, p: any) => s + (p.amount || 0), 0);
    return { month: monthNames[d.getMonth()], revenue, expenses: 0 };
  });
  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue), 1);

  const methodCounts: Record<string, number> = {};
  const methodColors: Record<string, string> = {
    'MONEY_FUSION': 'bg-indigo-500', 'Money Fusion': 'bg-indigo-500',
    'MOBILE_MONEY': 'bg-orange-500', 'Espèces': 'bg-emerald-500', 'CASH': 'bg-emerald-500',
    'VIREMENT': 'bg-purple-500', 'CARTE': 'bg-indigo-500',
  };
  payments.filter((p: any) => p.status === 'COMPLETED' || p.status === 'PAID').forEach((p: any) => {
    const method = p.method || p.paymentMethod || 'Autre';
    methodCounts[method] = (methodCounts[method] || 0) + 1;
  });
  const totalPaid = Object.values(methodCounts).reduce((s, c) => s + c, 0) || 1;
  const paymentBreakdown = Object.entries(methodCounts).map(([name, count]) => ({
    name,
    pct: Math.round((count / totalPaid) * 100),
    color: methodColors[name] || 'bg-slate-500',
  })).sort((a, b) => b.pct - a.pct);
  if (paymentBreakdown.length === 0) {
    paymentBreakdown.push({ name: 'Aucun paiement', pct: 100, color: 'bg-slate-300' });
  }

  const classSummary = classesList.slice(0, 6).map((cls: any) => {
    const classPayments = payments.filter(p => p.student?.classId === cls.id || p.student?.class?.id === cls.id);
    const collected = classPayments.filter(p => p.status === 'COMPLETED' || p.status === 'PAID').reduce((s, p) => s + (p.amount || 0), 0);
    const expected = classPayments.reduce((s, p) => s + (p.amount || 0), 0) || 1;
    return {
      cls: cls.name || 'Classe',
      students: cls.studentCount || cls._count?.students || 0,
      collected,
      expected,
      rate: expected > 0 ? Math.round((collected / expected) * 100) : 0,
    };
  });

  return (
    <RoleLayout role="comptable" breadcrumbs={[
      { label: lang === 'fr' ? 'Comptable' : 'Accountant', href: '/comptable' },
      { label: lang === 'fr' ? 'Rapports' : 'Reports' },
    ]}>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#191c1d]">
              {lang === 'fr' ? 'Rapports financiers' : 'Financial Reports'}
            </h1>
            <p className="text-sm text-[#464555] mt-1">
              {lang === 'fr' ? 'Analyse détaillée des finances' : 'Detailed financial analysis'}
            </p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#191c1d] bg-white focus:outline-none focus:border-[#3525cd]"
            >
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Export buttons */}
        <div className="flex gap-3">
          <button onClick={() => {
            const columns: ExportColumn[] = [
              { header: 'Mois', key: 'month', width: 12 },
              { header: 'Revenus', key: 'revenue', width: 16 },
              { header: 'Dépenses', key: 'expenses', width: 16 },
              { header: 'Résultat net', key: 'net', width: 16 },
            ];
            const data = monthlyRevenue.map(m => ({ month: m.month, revenue: m.revenue, expenses: m.expenses, net: m.revenue - m.expenses }));
            exportToFile(data, columns, `rapport_financier_${new Date().toISOString().split('T')[0]}`, 'pdf', { title: 'Rapport Financier', subtitle: 'Année scolaire 2025 — 2026', orientation: 'landscape' }, exportBranding);
          }} className="flex items-center gap-2 px-4 py-2.5 bg-[#ba1a1a] text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors">
            <Printer size={16} />
            {lang === 'fr' ? 'Exporter PDF' : 'Export PDF'}
          </button>
          <button onClick={() => {
            const columns: ExportColumn[] = [
              { header: 'Mois', key: 'month', width: 12 },
              { header: 'Revenus', key: 'revenue', width: 16 },
              { header: 'Dépenses', key: 'expenses', width: 16 },
              { header: 'Résultat net', key: 'net', width: 16 },
            ];
            const data = monthlyRevenue.map(m => ({ month: m.month, revenue: m.revenue, expenses: m.expenses, net: m.revenue - m.expenses }));
            exportToFile(data, columns, `rapport_financier_${new Date().toISOString().split('T')[0]}`, 'csv', undefined, exportBranding);
          }} className="flex items-center gap-2 px-4 py-2.5 bg-[#22C55E] text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors">
            <Download size={16} />
            {lang === 'fr' ? 'Exporter CSV' : 'Export CSV'}
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border-l-4 border-emerald-500 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-50">
                <TrendingUp size={18} className="text-emerald-600" />
              </div>
              <p className="text-xs font-medium text-[#464555]">
                {lang === 'fr' ? 'Revenus totaux' : 'Total Revenue'}
              </p>
            </div>
            <p className="text-2xl font-bold text-[#191c1d]">{totalRevenue.toLocaleString()} FCFA</p>
          </div>
          <div className="bg-white rounded-xl border-l-4 border-red-500 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-red-50">
                <TrendingDown size={18} className="text-red-600" />
              </div>
              <p className="text-xs font-medium text-[#464555]">
                {lang === 'fr' ? 'Dépenses totales' : 'Total Expenses'}
              </p>
            </div>
            <p className="text-2xl font-bold text-[#191c1d]">{totalExpenses.toLocaleString()} FCFA</p>
          </div>
          <div className="bg-white rounded-xl border-l-4 border-blue-500 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-blue-50">
                <DollarSign size={18} className="text-blue-600" />
              </div>
              <p className="text-xs font-medium text-[#464555]">
                {lang === 'fr' ? 'Revenu net' : 'Net Income'}
              </p>
            </div>
            <p className="text-2xl font-bold text-[#191c1d]">{netIncome.toLocaleString()} FCFA</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by month bar chart */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-[#191c1d] mb-6 flex items-center gap-2">
              <BarChart3 size={16} className="text-[#3525cd]" />
              {lang === 'fr' ? 'Revenus par mois' : 'Revenue by Month'}
            </h2>
            <div className="flex items-end gap-3 h-40">
              {monthlyRevenue.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-[#464555]">
                    {(m.revenue / 1000000).toFixed(1)}M
                  </span>
                  <div
                    className="w-full bg-[#e2dfff] rounded-t-lg relative overflow-hidden"
                    style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-[#3525cd] rounded-t-lg" />
                  </div>
                  <span className="text-[10px] font-bold text-[#464555]">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment breakdown */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-[#191c1d] mb-6 flex items-center gap-2">
              <PieChart size={16} className="text-[#3525cd]" />
              {lang === 'fr' ? 'Répartition des paiements' : 'Payment Breakdown'}
            </h2>
            {/* Pie chart placeholder - concentric rings */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)', background: '#f59e0b' }} />
                <div className="absolute inset-0 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%)', background: '#f97316' }} />
                <div className="absolute inset-0 rounded-full" style={{ clipPath: 'polygon(50% 50%, 0 0, 50% 0)', background: '#3b82f6' }} />
                <div className="absolute inset-6 rounded-full bg-white flex items-center justify-center">
                  <span className="text-xs font-bold text-[#464555]">100%</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {paymentBreakdown.map((pm, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${pm.color}`} />
                    <span className="text-xs font-medium text-[#191c1d]">{pm.name}</span>
                  </div>
                  <span className="text-xs font-bold text-[#464555]">{pm.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Class-by-class summary */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-[#191c1d] flex items-center gap-2">
              <CreditCard size={16} className="text-[#3525cd]" />
              {lang === 'fr' ? 'Résumé par classe' : 'Class Summary'}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#464555] uppercase tracking-wider bg-[#f8f9fa] border-b border-gray-100">
                  <th className="px-5 py-3.5 font-semibold">{lang === 'fr' ? 'Classe' : 'Class'}</th>
                  <th className="px-3 py-3.5 font-semibold hidden sm:table-cell">{lang === 'fr' ? 'Élèves' : 'Students'}</th>
                  <th className="px-3 py-3.5 font-semibold">{lang === 'fr' ? 'Perçu' : 'Collected'}</th>
                  <th className="px-3 py-3.5 font-semibold hidden md:table-cell">{lang === 'fr' ? 'Attendu' : 'Expected'}</th>
                  <th className="px-3 py-3.5 font-semibold">{lang === 'fr' ? 'Taux' : 'Rate'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {classSummary.map((cs, idx) => (
                  <tr key={idx} className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-[#191c1d]">{cs.cls}</td>
                    <td className="px-3 py-3.5 text-[#464555] hidden sm:table-cell">{cs.students}</td>
                    <td className="px-3 py-3.5 font-semibold text-[#191c1d]">{cs.collected.toLocaleString()} FCFA</td>
                    <td className="px-3 py-3.5 text-[#464555] hidden md:table-cell">{cs.expected.toLocaleString()} FCFA</td>
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${cs.rate >= 80 ? 'bg-emerald-500' : cs.rate >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${cs.rate}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold ${cs.rate >= 80 ? 'text-emerald-600' : cs.rate >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                          {cs.rate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
