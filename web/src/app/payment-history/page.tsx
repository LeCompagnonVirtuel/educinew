'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbPayments } from '@/lib/api';
import { CreditCard, Download, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function PaymentHistoryPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await sbPayments.list();
        setTransactions(data || []);
      } catch (e: any) {
        setError(e.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Payments' }, { label: 'History' }]}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#191c1d]">Payment History</h2>
          <p className="text-[#464555] mt-1">All your transactions in one place.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#e7e8e9] text-[#464555] font-semibold rounded-full text-sm">
          <Download size={16} /> Export
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-4 text-sm">{error}</div>
      )}

      <div className="bg-white rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#f3f4f5]">
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Description</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Amount</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Method</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c7c4d8]/10">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-12"><Loader2 size={24} className="animate-spin mx-auto text-slate-400" /></td></tr>
            ) : transactions.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-slate-400">Aucune transaction trouvée</td></tr>
            ) : (
              transactions.map((t: any, i: number) => (
                <tr key={t.id || i} className="hover:bg-[#f8f9fa]">
                  <td className="px-6 py-4 font-semibold text-[#191c1d]">{t.description || t.invoice?.description || 'Paiement'}</td>
                  <td className="px-6 py-4 font-bold text-[#191c1d]">{formatCurrency(t.amount || 0)}</td>
                  <td className="px-6 py-4 text-sm text-[#464555]">{t.paymentMethod || '-'}</td>
                  <td className="px-6 py-4 text-sm text-[#464555]">{t.paymentDate ? new Date(t.paymentDate).toLocaleDateString('fr-FR') : t.createdAt ? new Date(t.createdAt).toLocaleDateString('fr-FR') : '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${t.status === 'COMPLETED' || t.status === 'PAID' ? 'bg-emerald-50 text-emerald-700' : t.status === 'PENDING' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                      {t.status === 'COMPLETED' || t.status === 'PAID' ? 'Payé' : t.status === 'PENDING' ? 'En attente' : t.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </RoleLayout>
  );
}
