'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  CreditCard, TrendingUp, Download, Filter, Plus, 
  Search, Calendar, DollarSign, CheckCircle, XCircle, 
  Clock, AlertTriangle, FileText, Eye, Send, RefreshCw,
  ArrowUp, ArrowDown, PieChart, BarChart3
} from 'lucide-react';
import { sbFinance, sbInvoices } from '@/lib/api';

interface Invoice {
  id: string;
  student: { user: { name: string }; class: { name: string } };
  type: string;
  amount: number;
  discountAmount: number;
  finalAmount: number;
  paidAmount: number;
  status: string;
  dueDate: string;
  createdAt: string;
}

interface FinancialStats {
  totalRevenue: number;
  pendingAmount: number;
  invoices: { status: string; _sum: { finalAmount: number }; _count: number }[];
  paymentMethods: { paymentMethod: string; _sum: { amount: number }; _count: number }[];
}

export default function ComptableFinancePage() {
  const { t, lang } = useLanguage();
  const [stats, setStats] = useState<FinancialStats | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, [selectedPeriod]);

  async function loadData() {
    setLoading(true);
    try {
      const [statsData, invoicesData] = await Promise.all([
        sbFinance.getStats(selectedPeriod),
        sbFinance.getInvoices(statusFilter === 'all' ? undefined : statusFilter),
      ]);
      setStats(statsData as any);
      setInvoices(invoicesData as any);
    } catch (err: any) {
      console.error('Error loading finance data:', err?.message || err);
    } finally {
      setLoading(false);
    }
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' XOF';
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { icon: any; color: string; bg: string; label: string }> = {
      PAID: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', label: lang === 'fr' ? 'Payé' : 'Paid' },
      PARTIAL: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', label: lang === 'fr' ? 'Partiel' : 'Partial' },
      UNPAID: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: lang === 'fr' ? 'Impayer' : 'Unpaid' },
      OVERDUE: { icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50', label: lang === 'fr' ? 'En retard' : 'Overdue' },
    };
    return configs[status] || { icon: Clock, color: 'text-slate-600', bg: 'bg-slate-50', label: status };
  };

  const getTypeLabel = (type: string) => {
    const types: Record<string, { fr: string; en: string }> = {
      INSCRIPTION: { fr: 'Frais inscription', en: 'Registration Fees' },
      SCOLARITE: { fr: 'Frais scolarité', en: 'Tuition Fees' },
      CANTINE: { fr: 'Cantine', en: 'Cafeteria' },
      TRANSPORT: { fr: 'Transport', en: 'Transport' },
      AUTRE: { fr: 'Autre', en: 'Other' },
    };
    return types[type]?.[lang === 'fr' ? 'fr' : 'en'] || type;
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.student?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <RoleLayout role="comptable">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">
              {lang === 'fr' ? ' Finances' : 'Finance'}
            </h1>
            <p className="text-[#6B7280] mt-1">
              {lang === 'fr' ? 'Gestion des paiements et facturation' : 'Payment and billing management'}
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#111827] hover:bg-slate-50"
            >
              <FileText size={18} />
              {lang === 'fr' ? 'Générer rapport' : 'Generate Report'}
            </button>
            <button 
              onClick={() => setShowCreateInvoice(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-xl text-sm font-medium hover:bg-[#4338CA]"
            >
              <Plus size={18} />
              {lang === 'fr' ? 'Nouvelle facture' : 'New Invoice'}
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-emerald-600" />
            </div>
            <span className="text-sm text-[#6B7280]">{lang === 'fr' ? 'Revenu total' : 'Total Revenue'}</span>
          </div>
          <p className="text-2xl font-bold text-[#111827]">{formatCurrency(stats?.totalRevenue || 0)}</p>
          <p className="text-xs text-emerald-600 mt-1">+12% {lang === 'fr' ? 'ce mois' : 'this month'}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Clock size={20} className="text-amber-600" />
            </div>
            <span className="text-sm text-[#6B7280]">{lang === 'fr' ? 'En attente' : 'Pending'}</span>
          </div>
          <p className="text-2xl font-bold text-[#111827]">{formatCurrency(stats?.pendingAmount || 0)}</p>
          <p className="text-xs text-amber-600 mt-1">{lang === 'fr' ? 'En attente' : 'Pending'}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <DollarSign size={20} className="text-blue-600" />
            </div>
            <span className="text-sm text-[#6B7280]">{lang === 'fr' ? 'Factures payées' : 'Paid Invoices'}</span>
          </div>
          <p className="text-2xl font-bold text-[#111827]">
            {stats?.invoices?.find(i => i.status === 'PAID')?._count || 0}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            {formatCurrency(stats?.invoices?.find(i => i.status === 'PAID')?._sum?.finalAmount || 0)}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <span className="text-sm text-[#6B7280]">{lang === 'fr' ? 'Impayées' : 'Unpaid'}</span>
          </div>
          <p className="text-2xl font-bold text-[#111827]">
            {stats?.invoices?.find(i => i.status === 'UNPAID')?._count || 0}
          </p>
          <p className="text-xs text-red-600 mt-1">
            {formatCurrency(stats?.invoices?.find(i => i.status === 'UNPAID')?._sum?.finalAmount || 0)}
          </p>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-2xl border border-slate-100 mb-6">
        <div className="p-4 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F9FAFB] rounded-xl border border-transparent focus:border-[#4F46E5]/40 outline-none text-sm"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 bg-[#F9FAFB] rounded-xl border border-transparent text-sm"
              >
                <option value="all">{lang === 'fr' ? 'Tous les statuts' : 'All statuses'}</option>
                <option value="PAID">{lang === 'fr' ? 'Payé' : 'Paid'}</option>
                <option value="PARTIAL">{lang === 'fr' ? 'Partiel' : 'Partial'}</option>
                <option value="UNPAID">{lang === 'fr' ? 'Impayé' : 'Unpaid'}</option>
                <option value="OVERDUE">{lang === 'fr' ? 'En retard' : 'Overdue'}</option>
              </select>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2.5 bg-[#F9FAFB] rounded-xl border border-transparent text-sm"
              >
                <option value="today">{lang === 'fr' ? "Aujourd'hui" : 'Today'}</option>
                <option value="thisWeek">{lang === 'fr' ? 'Cette semaine' : 'This week'}</option>
                <option value="thisMonth">{lang === 'fr' ? 'Ce mois' : 'This month'}</option>
                <option value="thisYear">{lang === 'fr' ? 'Cette année' : 'This year'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des factures */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB]">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">{lang === 'fr' ? 'Élève' : 'Student'}</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">{lang === 'fr' ? 'Type' : 'Type'}</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">{lang === 'fr' ? 'Montant' : 'Amount'}</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">{lang === 'fr' ? 'Payé' : 'Paid'}</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">{lang === 'fr' ? 'Échéance' : 'Due Date'}</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">{lang === 'fr' ? 'Statut' : 'Status'}</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">{lang === 'fr' ? 'Actions' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[#6B7280]">
                    {t('common.loading')}
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[#6B7280]">
                    {t('common.noData')}
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => {
                  const statusConfig = getStatusConfig(invoice.status);
                  return (
                    <tr key={invoice.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-[#111827] text-sm">{invoice.student?.user?.name || '—'}</p>
                          <p className="text-xs text-[#6B7280]">{invoice.student?.class?.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#6B7280]">{getTypeLabel(invoice.type)}</td>
                      <td className="px-4 py-3 font-semibold text-sm">{formatCurrency(invoice.finalAmount)}</td>
                      <td className="px-4 py-3 text-sm text-emerald-600">{formatCurrency(invoice.paidAmount)}</td>
                      <td className="px-4 py-3 text-sm">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                          <statusConfig.icon size={12} />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded-lg" title={t('common.view')} onClick={() => window.location.href = `/comptable/finance/${invoice.id}`}>
                            <Eye size={16} className="text-[#6B7280]" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg" title={t('common.download')} onClick={async () => {
                            try {
                              const { exportToFile } = await import('@/lib/export-utils');
                              const columns = [
                                { header: 'Élève', key: 'student', width: 20 },
                                { header: 'Type', key: 'type', width: 15 },
                                { header: 'Montant', key: 'amount', width: 15 },
                                { header: 'Payé', key: 'paid', width: 15 },
                                { header: 'Statut', key: 'status', width: 10 },
                                { header: 'Échéance', key: 'dueDate', width: 12 },
                              ];
                              exportToFile([{
                                student: invoice.student?.user?.name || '—',
                                type: invoice.type,
                                amount: invoice.finalAmount,
                                paid: invoice.paidAmount,
                                status: invoice.status,
                                dueDate: invoice.dueDate,
                              }], columns, `facture_${invoice.id}`, 'pdf');
                            } catch {
                              window.print();
                            }
                          }}>
                            <Download size={16} className="text-[#6B7280]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal création facture */}
      {showCreateInvoice && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">{lang === 'fr' ? 'Nouvelle facture' : 'New Invoice'}</h3>
              <button onClick={() => setShowCreateInvoice(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <XCircle size={20} className="text-[#6B7280]" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">{lang === 'fr' ? 'Élève' : 'Student'}</label>
                <select className="w-full px-4 py-2.5 bg-[#F9FAFB] rounded-xl border border-slate-200">
                  <option>{lang === 'fr' ? 'Sélectionner un élève' : 'Select a student'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">{lang === 'fr' ? 'Type de frais' : 'Fee Type'}</label>
                <select className="w-full px-4 py-2.5 bg-[#F9FAFB] rounded-xl border border-slate-200">
                  <option value="INSCRIPTION">{lang === 'fr' ? 'Frais inscription' : 'Registration Fees'}</option>
                  <option value="SCOLARITE">{lang === 'fr' ? 'Frais scolarité' : 'Tuition Fees'}</option>
                  <option value="CANTINE">{lang === 'fr' ? 'Cantine' : 'Cafeteria'}</option>
                  <option value="TRANSPORT">{lang === 'fr' ? 'Transport' : 'Transport'}</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">{lang === 'fr' ? 'Montant' : 'Amount'}</label>
                  <input type="number" className="w-full px-4 py-2.5 bg-[#F9FAFB] rounded-xl border border-slate-200" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">{lang === 'fr' ? 'Remise' : 'Discount'}</label>
                  <input type="number" className="w-full px-4 py-2.5 bg-[#F9FAFB] rounded-xl border border-slate-200" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">{lang === 'fr' ? 'Date échéance' : 'Due Date'}</label>
                <input type="date" className="w-full px-4 py-2.5 bg-[#F9FAFB] rounded-xl border border-slate-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">{lang === 'fr' ? 'Description (optionnel)' : 'Description (optional)'}</label>
                <textarea className="w-full px-4 py-2.5 bg-[#F9FAFB] rounded-xl border border-slate-200" rows={3} />
              </div>
              <button type="submit" className="w-full py-3 bg-[#4F46E5] text-white rounded-xl font-semibold hover:bg-[#4338CA]">
                {lang === 'fr' ? 'Créer la facture' : 'Create Invoice'}
              </button>
            </form>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}