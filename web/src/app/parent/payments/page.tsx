'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { sbParent, sbFinance, sbNotifications } from '@/lib/api';
import {
  CreditCard, Check, Clock, AlertTriangle, Download, Eye,
  Smartphone, ChevronRight, Loader2, Users, X, FileText,
} from 'lucide-react';

export default function ParentPaymentsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-12"><Loader2 size={32} className="animate-spin text-slate-400" /></div>}>
      <ParentPaymentsContent />
    </Suspense>
  );
}

function ParentPaymentsContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const childIdFromUrl = searchParams.get('childId');

  const [children, setChildren] = useState<any[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(childIdFromUrl);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [showReceipt, setShowReceipt] = useState<any>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    async function loadChildren() {
      if (!user?.id) return;
      try {
        const kids = await sbParent.getChildren(user.id);
        const kidsArray = Array.isArray(kids) ? kids : [];
        setChildren(kidsArray);
        if (!selectedChildId && kidsArray.length > 0) {
          setSelectedChildId(kidsArray[0].id || kidsArray[0].studentId);
        }
      } catch {
        setChildren([]);
      }
    }
    loadChildren();
  }, [user?.id]);

  useEffect(() => {
    async function loadData() {
      if (!selectedChildId) { setLoading(false); return; }
      setLoading(true);
      try {
        const [invoiceData, historyData, walletData] = await Promise.allSettled([
          sbFinance.getInvoices(undefined, selectedChildId),
          sbParent.getPaymentHistory(),
          sbParent.getWallet(),
        ]);

        const inv = invoiceData.status === 'fulfilled' ? (invoiceData.value || []) : [];
        setInvoices(Array.isArray(inv) ? inv : []);

        const hist = historyData.status === 'fulfilled' ? historyData.value : null;
        const childPayments = (Array.isArray(hist) ? hist : []).filter((p: any) =>
          p.studentId === selectedChildId || p.student?.id === selectedChildId
        );
        setPaymentHistory(childPayments);

        const w = walletData.status === 'fulfilled' ? walletData.value : null;
        setWallet(w);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedChildId]);

  const totalAnnual = invoices.reduce((sum: number, inv: any) => sum + (inv.amount || 0), 0);
  const totalPaid = invoices.reduce((sum: number, inv: any) => sum + (inv.paidAmount || 0), 0);
  const totalOutstanding = invoices.reduce((sum: number, inv: any) => sum + ((inv.finalAmount || inv.amount || 0) - (inv.paidAmount || 0)), 0);
  const paidPercent = totalAnnual > 0 ? Math.round((totalPaid / totalAnnual) * 100) : 0;
  const unpaidInvoices = invoices.filter((inv: any) => inv.status !== 'PAID' && inv.status !== 'CANCELLED');

  const formatCFA = (amount: number) => new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';

  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': case 'paid':
        return { icon: Check, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Payé' };
      case 'pending':
        return { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', label: 'En attente' };
      case 'failed':
        return { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', label: 'Échoué' };
      case 'overdue':
        return { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', label: 'En retard' };
      case 'partial':
        return { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Partiel' };
      default:
        return { icon: Clock, color: 'text-slate-600', bg: 'bg-slate-50', label: status || '—' };
    }
  };

  const handleOpenPay = (invoice: any) => {
    setSelectedInvoice(invoice);
    setSelectedMethod(null);
    setShowPayModal(true);
  };

  const handleConfirmPay = async () => {
    if (!selectedInvoice) return;
    setPaying(true);
    try {
      const result = await sbParent.initiatePayment(selectedInvoice.id, 'MONEY_FUSION');

      if (result.redirectUrl) {
        try {
          const url = new URL(result.redirectUrl);
          if (url.hostname.endsWith('moneyfusion.net') || url.origin === window.location.origin) {
            window.location.href = result.redirectUrl;
            return;
          }
        } catch {}
      }

      if (result.reference) {
        showToast('Paiement initié ! Redirection vers Money Fusion...');
        setShowPayModal(false);
        if (selectedChildId) {
          const inv = await sbFinance.getInvoices(undefined, selectedChildId);
          setInvoices(Array.isArray(inv) ? inv : []);
          const hist = await sbParent.getPaymentHistory();
          setPaymentHistory((Array.isArray(hist) ? hist : []).filter((p: any) => p.studentId === selectedChildId));
        }
      } else {
        showToast('Paiement en cours de traitement', 'success');
        setShowPayModal(false);
      }
    } catch (e: any) {
      showToast(e.message || 'Erreur lors du paiement', 'error');
    } finally {
      setPaying(false);
    }
  };

  const handleViewReceipt = async (payment: any) => {
    try {
      const receipt = await sbParent.getReceipt(payment.id);
      setShowReceipt(receipt);
    } catch {
      showToast('Impossible de charger le reçu', 'error');
    }
  };

  const handleExport = () => {
    const headers = ['Date', 'Enfant', 'Catégorie', 'Montant', 'Méthode', 'Statut', 'Référence'];
    const rows = paymentHistory.map((p: any) => [
      p.paymentDate?.split('T')[0] || '',
      p.student?.user?.name || '',
      p.invoice?.type || '',
      p.amount || 0,
      p.paymentMethod || '',
      p.status || '',
      p.reference || '',
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paiements_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedChild = children.find(c => (c.id || c.studentId) === selectedChildId);
  const childName = selectedChild?.name || selectedChild?.user?.name || 'Mon enfant';

  return (
    <RoleLayout role="parent">
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#191c1d]">Frais scolaires</h1>
        <p className="text-[#464555] mt-1">Gérez les paiements de vos enfants</p>
      </div>

      {/* Child selector */}
      {children.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {children.map((child: any) => {
            const cid = child.id || child.studentId;
            const isSelected = cid === selectedChildId;
            return (
              <button
                key={cid}
                onClick={() => setSelectedChildId(cid)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${isSelected ? 'bg-[#3525cd] text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'}`}
              >
                <Users size={16} />
                {child.name || child.user?.name}
                {child.class?.name && <span className={`text-xs ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>{child.class.name}</span>}
              </button>
            );
          })}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12"><Loader2 size={32} className="animate-spin mx-auto text-slate-400" /></div>
      ) : !selectedChildId ? (
        <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
          <Users size={48} className="mx-auto mb-3 text-slate-300" />
          <p className="text-slate-500 font-medium">Aucun enfant associé</p>
        </div>
      ) : (
        <>
          {/* Balance card + Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard size={20} />
                  <p className="text-sm text-indigo-200 font-medium">Solde restant — {childName}</p>
                </div>
                <p className="text-4xl font-bold mb-1">{formatCFA(totalOutstanding)}</p>
                <p className="text-sm text-indigo-200 mb-6">
                  {unpaidInvoices.length} facture{unpaidInvoices.length > 1 ? 's' : ''} en attente
                </p>
                {unpaidInvoices.length > 0 && (
                  <button
                    onClick={() => handleOpenPay(unpaidInvoices[0])}
                    className="bg-white text-[#3525cd] font-bold px-6 py-3 rounded-xl text-sm hover:bg-indigo-50 transition-all active:scale-95 flex items-center gap-2"
                  >
                    Payer maintenant <ChevronRight size={16} />
                  </button>
                )}
                {wallet?.balance > 0 && (
                  <p className="text-xs text-indigo-200 mt-3">Portefeuille: {formatCFA(wallet.balance)}</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-[#191c1d] mb-4">Résumé</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#464555]">Total annuel</span>
                  <span className="font-bold text-[#191c1d]">{formatCFA(totalAnnual)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#464555]">Déjà payé</span>
                  <span className="font-bold text-emerald-600">{formatCFA(totalPaid)}</span>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#464555]">Reste à payer</span>
                  <span className="font-bold text-red-600">{formatCFA(totalOutstanding)}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${paidPercent}%` }} />
                </div>
                <p className="text-xs text-[#464555] text-center">{paidPercent}% payé</p>
              </div>
            </div>
          </div>

          {/* Invoices list */}
          {invoices.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-8">
              <div className="p-5 border-b border-slate-100">
                <h3 className="text-lg font-bold text-[#191c1d]">Factures détaillées</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {invoices.map((inv: any) => {
                  const statusConf = getStatusConfig(inv.status);
                  const StatusIcon = statusConf.icon;
                  const remaining = (inv.finalAmount || inv.amount || 0) - (inv.paidAmount || 0);
                  return (
                    <div key={inv.id} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                          <FileText size={20} className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#191c1d]">{inv.feeCategory?.name || inv.type || 'Frais'}</p>
                          <p className="text-xs text-[#464555]">
                            {inv.description || ''}
                            {inv.dueDate && ` • Échéance: ${new Date(inv.dueDate).toLocaleDateString('fr-FR')}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-bold text-[#191c1d]">{formatCFA(inv.finalAmount || inv.amount)}</p>
                          {inv.paidAmount > 0 && inv.status !== 'PAID' && (
                            <p className="text-xs text-emerald-600">Payé: {formatCFA(inv.paidAmount)}</p>
                          )}
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConf.bg} ${statusConf.color}`}>
                          <StatusIcon size={12} /> {statusConf.label}
                        </span>
                        {inv.status !== 'PAID' && inv.status !== 'CANCELLED' && remaining > 0 && (
                          <button
                            onClick={() => handleOpenPay(inv)}
                            className="px-4 py-2 bg-[#3525cd] text-white text-xs font-bold rounded-lg hover:bg-[#4f46e5] transition-colors"
                          >
                            Payer
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Payment history */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#191c1d]">Historique des paiements</h3>
              <button onClick={handleExport} className="flex items-center gap-2 text-sm text-[#3525cd] font-semibold hover:underline">
                <Download size={16} /> Exporter
              </button>
            </div>
            {paymentHistory.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">Aucun paiement enregistré</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f8f9fa] text-left">
                      <th className="px-5 py-3 text-xs font-bold text-[#464555] uppercase">Date</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#464555] uppercase">Catégorie</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#464555] uppercase">Montant</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#464555] uppercase">Méthode</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#464555] uppercase">Référence</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#464555] uppercase">Statut</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#464555] uppercase"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paymentHistory.map((p: any) => {
                      const statusConf = getStatusConfig(p.status);
                      const StatusIcon = statusConf.icon;
                      return (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-4 text-sm text-[#191c1d] font-medium">{p.paymentDate?.split('T')[0] || '—'}</td>
                          <td className="px-5 py-4 text-sm text-[#464555]">{p.invoice?.type || p.invoice?.feeCategory?.name || '—'}</td>
                          <td className="px-5 py-4 text-sm font-bold text-[#191c1d]">{formatCFA(p.amount)}</td>
                          <td className="px-5 py-4 text-sm text-[#464555]">{p.paymentMethod || '—'}</td>
                          <td className="px-5 py-4 text-xs text-[#464555] font-mono">{p.reference || '—'}</td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConf.bg} ${statusConf.color}`}>
                              <StatusIcon size={12} /> {statusConf.label}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <button onClick={() => handleViewReceipt(p)} className="p-1.5 text-[#464555] hover:bg-slate-100 rounded-lg transition-colors" title="Voir le reçu">
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* PAY MODAL */}
      {showPayModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowPayModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#191c1d]">Payer la facture</h3>
              <button onClick={() => setShowPayModal(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <p className="text-sm font-medium text-[#191c1d]">{selectedInvoice.feeCategory?.name || selectedInvoice.type}</p>
              <p className="text-xs text-[#464555] mt-1">{childName}</p>
              <p className="text-2xl font-bold text-[#3525cd] mt-2">{formatCFA((selectedInvoice.finalAmount || selectedInvoice.amount) - (selectedInvoice.paidAmount || 0))}</p>
            </div>
            <p className="text-sm text-[#464555] mb-3">Moyen de paiement:</p>
            <div className="space-y-3 mb-6">
              <div className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-indigo-200 bg-indigo-50">
                <span className="text-2xl">💰</span>
                <div>
                  <span className="font-semibold text-sm text-[#191c1d]">Money Fusion</span>
                  <p className="text-xs text-slate-500">Mobile Money, Carte bancaire</p>
                </div>
                <Check size={18} className="ml-auto text-indigo-600" />
              </div>
              <p className="text-xs text-slate-400 text-center">Vous serez redirigé vers Money Fusion pour compléter le paiement</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowPayModal(false)} className="flex-1 py-3 text-sm font-semibold text-[#464555] rounded-xl border border-slate-200 hover:bg-slate-50">Annuler</button>
              <button
                onClick={handleConfirmPay}
                disabled={paying}
                className="flex-1 py-3 text-sm font-bold text-white rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {paying ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                Payer via Money Fusion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECEIPT MODAL */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowReceipt(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#191c1d]">Reçu de paiement</h3>
              <button onClick={() => setShowReceipt(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-3 text-sm">
              {showReceipt.school?.logoUrl && (
                <Image src={showReceipt.school.logoUrl} alt="Logo" width={48} height={48} className="h-12 mx-auto mb-2" />
              )}
              <p className="text-center font-bold text-lg">{showReceipt.school?.name || 'Établissement'}</p>
              <div className="h-px bg-slate-200 my-2" />
              <div className="flex justify-between"><span className="text-[#464555]">N° Reçu:</span><span className="font-mono font-bold">{showReceipt.receiptNumber}</span></div>
              <div className="flex justify-between"><span className="text-[#464555]">Date:</span><span>{showReceipt.date ? new Date(showReceipt.date).toLocaleDateString('fr-FR') : '—'}</span></div>
              <div className="flex justify-between"><span className="text-[#464555]">Élève:</span><span className="font-semibold">{showReceipt.student?.name}</span></div>
              <div className="flex justify-between"><span className="text-[#464555]">Classe:</span><span>{showReceipt.student?.class}</span></div>
              <div className="flex justify-between"><span className="text-[#464555]">Catégorie:</span><span>{showReceipt.invoice?.category || showReceipt.invoice?.type || '—'}</span></div>
              <div className="h-px bg-slate-200 my-2" />
              <div className="flex justify-between text-lg"><span className="font-semibold">Montant:</span><span className="font-bold text-[#3525cd]">{formatCFA(showReceipt.amount)}</span></div>
              <div className="flex justify-between"><span className="text-[#464555]">Méthode:</span><span>{showReceipt.method}</span></div>
              <div className="flex justify-between"><span className="text-[#464555]">Référence:</span><span className="font-mono text-xs">{showReceipt.reference}</span></div>
            </div>
            <button onClick={() => window.print()} className="mt-6 w-full py-3 bg-[#3525cd] text-white font-bold rounded-xl hover:bg-[#4f46e5] flex items-center justify-center gap-2">
              <Download size={16} /> Imprimer / Télécharger
            </button>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
