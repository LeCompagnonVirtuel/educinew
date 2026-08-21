'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbPayments } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { AlertTriangle, Download, Filter, Send, Search, Loader2 } from 'lucide-react';

export default function OutstandingPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await sbPayments.list({ status: 'PENDING' });
        setPayments(data || []);
      } catch (e: any) {
        setError(e.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalOutstanding = payments.reduce((s, p) => s + (p.amount || 0), 0);

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Payments' }, { label: 'Outstanding' }]}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#191c1d]">Outstanding Payments</h2>
          <p className="text-[#464555] mt-1">Track and manage overdue tuition fees.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#e7e8e9] text-[#464555] font-semibold rounded-full text-sm">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-semibold rounded-full text-sm">
            <Send size={16} /> Send Reminders
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-4 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-[#3525cd] to-[#4f46e5] p-6 rounded-2xl text-white">
          <p className="text-sm text-indigo-200">Total Outstanding</p>
          <p className="text-3xl font-bold mt-1">{formatCurrency(totalOutstanding)}</p>
          <p className="text-xs text-indigo-200 mt-2">Across {payments.length} student accounts</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-card">
          <p className="text-sm text-[#464555]">Critical (30+ days)</p>
          <p className="text-3xl font-bold text-[#ba1a1a] mt-1">{payments.filter(p => { const d = p.createdAt ? Math.ceil((Date.now() - new Date(p.createdAt).getTime()) / 86400000) : 0; return d > 30; }).length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-card">
          <p className="text-sm text-[#464555]">Pending Count</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">{payments.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#f3f4f5]">
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Student</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Amount Due</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Days Overdue</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c7c4d8]/10">
            {loading ? (
              <tr><td colSpan={4} className="text-center py-12"><Loader2 size={24} className="animate-spin mx-auto text-slate-400" /></td></tr>
            ) : payments.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-12 text-slate-400">Aucun paiement en attente</td></tr>
            ) : (
              payments.map((p: any) => {
                const daysOverdue = p.createdAt ? Math.ceil((Date.now() - new Date(p.createdAt).getTime()) / 86400000) : 0;
                return (
                  <tr key={p.id} className="hover:bg-[#f8f9fa]">
                    <td className="px-6 py-4 font-semibold text-[#191c1d]">{p.student?.user?.name || '—'}</td>
                    <td className="px-6 py-4 font-bold text-[#191c1d]">{formatCurrency(p.amount)}</td>
                    <td className="px-6 py-4"><span className="text-[#ba1a1a] font-bold flex items-center gap-1"><AlertTriangle size={14} /> {daysOverdue} days</span></td>
                    <td className="px-6 py-4"><span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">PENDING</span></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        </div>
      </div>
    </RoleLayout>
  );
}
