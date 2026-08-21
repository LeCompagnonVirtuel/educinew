'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import {
  CreditCard, Search, Filter, Download, CheckCircle,
  Clock, AlertTriangle, DollarSign, Calendar, ChevronRight, Loader2,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { sbPayments, sbClasses } from '@/lib/api';
import { exportToFile, type ExportColumn } from '@/lib/export-utils';
import { useExportBranding } from '@/hooks/useExportBranding';

const methods = ['Toutes', 'Money Fusion', 'Mobile Money', 'Cash', 'Virement'];
const statuses = ['Tous', 'Payé', 'En attente', 'En retard'];

const statusConfig: Record<string, { labelFr: string; labelEn: string; bg: string; text: string; icon: typeof CheckCircle }> = {
  paid: { labelFr: 'Payé', labelEn: 'Paid', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: CheckCircle },
  COMPLETED: { labelFr: 'Payé', labelEn: 'Paid', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: CheckCircle },
  PAID: { labelFr: 'Payé', labelEn: 'Paid', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: CheckCircle },
  pending: { labelFr: 'En attente', labelEn: 'Pending', bg: 'bg-amber-50', text: 'text-amber-700', icon: Clock },
  PENDING: { labelFr: 'En attente', labelEn: 'Pending', bg: 'bg-amber-50', text: 'text-amber-700', icon: Clock },
  overdue: { labelFr: 'En retard', labelEn: 'Overdue', bg: 'bg-red-50', text: 'text-red-700', icon: AlertTriangle },
  FAILED: { labelFr: 'Échoué', labelEn: 'Failed', bg: 'bg-red-50', text: 'text-red-700', icon: AlertTriangle },
};

export default function PaymentsPage() {
  const { lang } = useLanguage();
  const exportBranding = useExportBranding();
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('Toutes');
  const [selectedMethod, setSelectedMethod] = useState('Toutes');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [payments, setPayments] = useState<any[]>([]);
  const [classesList, setClassesList] = useState<string[]>(['Toutes']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [data, cls] = await Promise.all([
          sbPayments.list(),
          sbClasses.list().catch(() => []),
        ]);
        setPayments(data || []);
        const classNames = (Array.isArray(cls) ? cls : []).map((c: any) => c.name).filter(Boolean);
        setClassesList(['Toutes', ...classNames]);
      } catch (e: any) {
        setError(e.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalCollected = payments.filter(p => p.status === 'COMPLETED' || p.status === 'PAID').reduce((s, p) => s + (p.amount || 0), 0);
  const totalPending = payments.filter(p => p.status === 'PENDING').reduce((s, p) => s + (p.amount || 0), 0);
  const totalOverdue = payments.filter(p => p.status === 'FAILED' || p.status === 'OVERDUE').reduce((s, p) => s + (p.amount || 0), 0);

  return (
    <RoleLayout role="comptable" breadcrumbs={[
      { label: lang === 'fr' ? 'Comptable' : 'Accountant', href: '/comptable' },
      { label: lang === 'fr' ? 'Paiements' : 'Payments' },
    ]}>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#191c1d]">
              {lang === 'fr' ? 'Gestion des paiements' : 'Payment Management'}
            </h1>
            <p className="text-sm text-[#464555] mt-1">
              {lang === 'fr' ? 'Suivi et gestion des paiements' : 'Track and manage payments'}
            </p>
          </div>
          <button onClick={() => {
            const columns: ExportColumn[] = [
              { header: 'Élève', key: 'student', width: 24 },
              { header: 'Classe', key: 'class', width: 18 },
              { header: 'Montant', key: 'amount', width: 14 },
              { header: 'Statut', key: 'status', width: 12 },
              { header: 'Date', key: 'date', width: 14 },
              { header: 'Méthode', key: 'method', width: 14 },
            ];
            const data = payments.map(p => ({
              student: p.student,
              class: p.class,
              amount: p.amount,
              status: p.status,
              date: p.date,
              method: p.method,
            }));
            exportToFile(data, columns, `paiements_comptable_${new Date().toISOString().split('T')[0]}`, 'pdf', { title: 'Paiements Comptable', subtitle: `Date: ${new Date().toLocaleDateString('fr-FR')}` }, exportBranding);
          }} className="flex items-center gap-2 px-4 py-2.5 bg-[#ba1a1a] text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors">
            <Download size={16} />
            {lang === 'fr' ? 'Exporter PDF' : 'Export PDF'}
          </button>
          <button onClick={() => {
            const columns: ExportColumn[] = [
              { header: 'Élève', key: 'student', width: 24 },
              { header: 'Classe', key: 'class', width: 18 },
              { header: 'Montant', key: 'amount', width: 14 },
              { header: 'Statut', key: 'status', width: 12 },
              { header: 'Date', key: 'date', width: 14 },
              { header: 'Méthode', key: 'method', width: 14 },
            ];
            const data = payments.map(p => ({
              student: p.student,
              class: p.class,
              amount: p.amount,
              status: p.status,
              date: p.date,
              method: p.method,
            }));
            exportToFile(data, columns, `paiements_comptable_${new Date().toISOString().split('T')[0]}`, 'csv', undefined, exportBranding);
          }} className="flex items-center gap-2 px-4 py-2.5 bg-[#22C55E] text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors">
            <Download size={16} />
            {lang === 'fr' ? 'Exporter CSV' : 'Export CSV'}
          </button>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-50">
              <CheckCircle size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#464555]">{lang === 'fr' ? 'Total perçu' : 'Total Collected'}</p>
              <p className="text-lg font-bold text-[#191c1d]">{totalCollected.toLocaleString()} FCFA</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-50">
              <Clock size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#464555]">{lang === 'fr' ? 'En attente' : 'Pending'}</p>
              <p className="text-lg font-bold text-[#191c1d]">{totalPending.toLocaleString()} FCFA</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-red-50">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#464555]">{lang === 'fr' ? 'En retard' : 'Overdue'}</p>
              <p className="text-lg font-bold text-[#191c1d]">{totalOverdue.toLocaleString()} FCFA</p>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#464555]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'fr' ? 'Rechercher un élève...' : 'Search student...'}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#191c1d] placeholder:text-slate-400 focus:outline-none focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd]"
              />
            </div>
            {/* Class selector */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#191c1d] bg-white focus:outline-none focus:border-[#3525cd]"
            >
              {classesList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {/* Method selector */}
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#191c1d] bg-white focus:outline-none focus:border-[#3525cd]"
            >
              {methods.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            {/* Status selector */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#191c1d] bg-white focus:outline-none focus:border-[#3525cd]"
            >
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Payments table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#464555] uppercase tracking-wider bg-[#f8f9fa] border-b border-gray-100">
                  <th className="px-5 py-3.5 font-semibold">{lang === 'fr' ? 'Élève' : 'Student'}</th>
                  <th className="px-3 py-3.5 font-semibold hidden sm:table-cell">{lang === 'fr' ? 'Classe' : 'Class'}</th>
                  <th className="px-3 py-3.5 font-semibold">{lang === 'fr' ? 'Montant' : 'Amount'}</th>
                  <th className="px-3 py-3.5 font-semibold hidden md:table-cell">{lang === 'fr' ? 'Méthode' : 'Method'}</th>
                  <th className="px-3 py-3.5 font-semibold hidden lg:table-cell">{lang === 'fr' ? 'Date' : 'Date'}</th>
                  <th className="px-5 py-3.5 font-semibold">{lang === 'fr' ? 'Statut' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan={6} className="text-center py-12"><Loader2 size={24} className="animate-spin mx-auto text-slate-400" /></td></tr>
                ) : payments.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-12 text-slate-400">Aucun paiement trouvé</td></tr>
                ) : (
                payments.map((p: any, idx: number) => {
                  const st = statusConfig[p.status] || statusConfig.pending;
                  const Icon = st.icon;
                  return (
                    <tr key={p.id || idx} className="hover:bg-[#f8f9fa] transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-[#191c1d]">{p.student?.user?.name || p.student || '—'}</p>
                        <p className="text-xs text-[#464555] sm:hidden">{p.student?.class?.name || p.class || '-'}</p>
                      </td>
                      <td className="px-3 py-3.5 text-[#464555] hidden sm:table-cell">{p.student?.class?.name || p.class || '-'}</td>
                      <td className="px-3 py-3.5 font-semibold text-[#191c1d]">{(p.amount || 0).toLocaleString()} FCFA</td>
                      <td className="px-3 py-3.5 text-[#464555] hidden md:table-cell">{p.paymentMethod || p.method || '-'}</td>
                      <td className="px-3 py-3.5 text-[#464555] hidden lg:table-cell">{p.paymentDate ? new Date(p.paymentDate).toLocaleDateString('fr-FR') : p.date || '-'}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded-full ${st.bg} ${st.text}`}>
                          <Icon size={12} />
                          {lang === 'fr' ? st.labelFr : st.labelEn}
                        </span>
                      </td>
                    </tr>
                  );
                }))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
