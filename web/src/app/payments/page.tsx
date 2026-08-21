'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbPayments, sbClasses, sbInvoices, sbStudents } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { exportToFile, type ExportColumn } from '@/lib/export-utils';
import { useExportBranding } from '@/hooks/useExportBranding';
import Pagination from '@/components/ui/Pagination';
import {
  Smartphone, Banknote, CheckCircle, Clock, XCircle, CreditCard,
  Download, Plus, Filter, TrendingUp, TrendingDown, ArrowUpRight,
  Search, ChevronDown, Eye, Edit, Mail, RefreshCw, Loader2,
  Receipt, FileText, FileSpreadsheet, X, Check, AlertTriangle,
  Users, DollarSign, Wallet, PiggyBank, Bus, Utensils, BookOpen,
  Calendar, ArrowRight, Bell, Ban, RotateCcw, Settings,
  Wifi, WifiOff, CheckCheck, Send, Printer,
  Minus, AlertCircle, RefreshCcw, HandCoins, Trash2
} from 'lucide-react';

const PAYMENT_METHODS: Record<string, { icon: any; color: string; label: string; bg: string; text: string }> = {
  MONEY_FUSION: { icon: CreditCard, color: 'indigo', label: 'Money Fusion', bg: 'bg-indigo-100', text: 'text-indigo-600' },
  MOBILE_MONEY: { icon: Smartphone, color: 'blue', label: 'Mobile Money', bg: 'bg-blue-100', text: 'text-blue-600' },
  CASH: { icon: Banknote, color: 'green', label: 'Espèces', bg: 'bg-green-100', text: 'text-green-600' },
  BANK_TRANSFER: { icon: CreditCard, color: 'purple', label: 'Virement', bg: 'bg-purple-100', text: 'text-purple-600' },
  ONLINE: { icon: CreditCard, color: 'indigo', label: 'En ligne', bg: 'bg-indigo-100', text: 'text-indigo-600' },
};

const STATUS_CONFIG = {
  PAID: { icon: CheckCircle, color: 'emerald', label: 'Payé', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  PARTIAL: { icon: Clock, color: 'amber', label: 'Partiel', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  PENDING: { icon: Clock, color: 'blue', label: 'En attente', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  OVERDUE: { icon: XCircle, color: 'red', label: 'En retard', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  FAILED: { icon: XCircle, color: 'red', label: 'Échoué', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
};

const FEE_TYPES = {
  TUITION: { icon: BookOpen, label: 'Scolarité', color: 'indigo' },
  TRANSPORT: { icon: Bus, label: 'Transport', color: 'blue' },
  MEALS: { icon: Utensils, label: 'Cantine', color: 'green' },
  OTHER: { icon: DollarSign, label: 'Autres', color: 'slate' },
};

export default function PaymentsPage() {
  const { user } = useAuth();
  const exportBranding = useExportBranding();
  const searchParams = useSearchParams();
  const filterStudentId = searchParams.get('student') || '';
  const [payments, setPayments] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'payments' | 'invoices' | 'analytics' | 'fees' | 'reminders' | 'expenses'>('payments');

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterMethod, setFilterMethod] = useState<string>('ALL');
  const [filterFeeType, setFilterFeeType] = useState<string>('ALL');
  const [filterClass, setFilterClass] = useState<string>('ALL');
  
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [showPaymentDetail, setShowPaymentDetail] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [selectedReminderPayment, setSelectedReminderPayment] = useState<any>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [sending, setSending] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  // Reminders state - loaded from overdue invoices
  const [reminders, setReminders] = useState<any[]>([]);
  const [reminderTemplates] = useState([
    { id: '1', name: 'Rappel paiement', message: 'Bonjour, nous vous rappelons que la scolarité de {student_name} ({amount} FCFA) est due depuis le {due_date}. Merci de régulariser votre paiement.' },
    { id: '2', name: 'Rappel urgent', message: 'URGENT: Le paiement de {student_name} ({amount} FCFA) est en retard. Merci de contacter l\'établissement.' },
    { id: '3', name: 'Confirmation', message: 'Merci pour le paiement de {student_name}. Reçu envoyé par SMS.' },
  ]);
  const [selectedReminderTemplate, setSelectedReminderTemplate] = useState('');
  const [paymentForm, setPaymentForm] = useState({ studentId: '', feeType: 'TUITION', amount: '', paymentMethod: 'CASH' });
  const [processingPayment, setProcessingPayment] = useState(false);

  // Expenses state
  const [expenses, setExpenses] = useState<any[]>([]);
  const [expenseCategories] = useState(['Salaires', 'Fournitures', 'Électricité', 'Eau', 'Internet', 'Maintenance', 'Transport', 'Assurance', 'Autre']);
  const [expenseForm, setExpenseForm] = useState({ category: '', description: '', amount: 0, date: '', paymentMethod: 'CASH' });
  const expenseTotal = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  // Receipt templates
  const [receiptTemplates] = useState([
    { id: '1', name: 'Reçu standard', content: 'REÇU DE PAIEMENT\n\nÉcole: [SCHOOL_NAME]\nÉlève: [STUDENT_NAME]\nClasse: [CLASS_NAME]\nPériode: [PERIOD]\n\nMontant: [AMOUNT] FCFA\nMode: [PAYMENT_METHOD]\nDate: [DATE]\nRéférence: [REFERENCE]' },
    { id: '2', name: 'Reçu détaillé', content: 'REÇU DE PAIEMENT DÉTAILLÉ\n\n═══════════════════════════\n[SCHOOL_NAME]\nAdresse: [SCHOOL_ADDRESS]\nTel: [SCHOOL_PHONE]\n═══════════════════════════\n\nN° Reçu: [REFERENCE]\nDate: [DATE]\n\nÉlève: [STUDENT_NAME]\nClasse: [CLASS_NAME]\nMatricule: [MATRICULE]\n\n═══════════════════════════\nDÉTAIL DU PAIEMENT\n═══════════════════════════\nScolarité: [TUITION] FCFA\nTransport: [TRANSPORT] FCFA\nCantine: [MEALS] FCFA\nAutre: [OTHER] FCFA\n───────────────────────────\nTOTAL: [AMOUNT] FCFA\nMode: [PAYMENT_METHOD]\n═══════════════════════════\n\nMerci pour votre paiement.' },
  ]);

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = useCallback(async () => {
    if (!user?.schoolId) return;
    setLoading(true);
    try {
      const [p, s, c, inv, st] = await Promise.all([
        sbPayments.listBySchool(user.schoolId),
        sbPayments.getStats(user.schoolId),
        sbClasses.list(user.schoolId),
        sbInvoices.list(user.schoolId),
        sbStudents.list(user.schoolId).catch(() => []),
      ]);
      setPayments(p);
      setStats(s);
      setClasses(c);
      setInvoices(inv || []);
      setStudents(st || []);

      const overdueInvoices = (inv || []).filter((i: any) => i.status === 'OVERDUE' || (i.status === 'UNPAID' && new Date(i.due_date) < new Date()));
      setReminders(overdueInvoices.map((i: any) => ({
        id: i.id,
        studentName: i.student?.user?.name || i.student?.first_name || 'Élève',
        parentPhone: '',
        amount: i.final_amount || i.amount || 0,
        dueDate: i.due_date,
        sentCount: 0,
        lastSent: null as string | null,
        status: i.status,
      })));
    } catch (err) { console.error('Error loading payments data:', err); showToast('Erreur de chargement des paiements', 'error'); }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredPayments = payments.filter(p => {
    if (filterStudentId && p.student_id !== filterStudentId && p.student?.id !== filterStudentId) return false;
    const matchesSearch = !searchQuery ||
      (p.student?.user?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.reference || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.student?.matricule || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || p.status === filterStatus;
    const matchesMethod = filterMethod === 'ALL' || p.paymentMethod === filterMethod;
    const matchesClass = filterClass === 'ALL' || p.student?.class?.name === filterClass;
    return matchesSearch && matchesStatus && matchesMethod && matchesClass;
  });

  const [paymentsPage, setPaymentsPage] = useState(1);
  const paymentsPerPage = 25;
  const paymentsTotalPages = Math.max(1, Math.ceil(filteredPayments.length / paymentsPerPage));
  const paginatedPayments = filteredPayments.slice((paymentsPage - 1) * paymentsPerPage, paymentsPage * paymentsPerPage);

  const handleSendReminder = async (payment: any) => {
    setSending(true);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      await supabase.from('payment_reminders').insert({
        invoice_id: payment.invoice_id || payment.id,
        school_id: user?.schoolId,
        student_id: payment.student_id || payment.student?.id,
        type: 'PAYMENT_DUE',
        channel: 'EMAIL',
        status: 'SENT',
        sent_at: new Date().toISOString(),
      });
      showToast(`Relance envoyée à ${payment.student?.user?.name || 'l\'élève'}`, 'success');
    } catch (_) {
      showToast('Erreur lors de l\'envoi', 'error');
    } finally {
      setSending(false);
    }
  };

  const handleMarkAsPaid = async (payment: any) => {
    setSending(true);
    try {
      await sbPayments.updateStatus(payment.id, 'PAID');
      showToast('Paiement marqué comme payé', 'success');
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Erreur', 'error');
    } finally {
      setSending(false);
    }
  };

  const handleRefund = async (payment: any) => {
    setSending(true);
    try {
      await sbPayments.updateStatus(payment.id, 'FAILED');
      showToast('Remboursement enregistré', 'success');
      loadData();
    } catch (_) {
      showToast('Erreur lors du remboursement', 'error');
    } finally {
      setSending(false);
    }
  };

  const handleExport = async (format: 'excel' | 'pdf') => {
    showToast(`Export ${format.toUpperCase()} en cours...`, 'info');
    try {
      const columns: ExportColumn[] = [
        { header: 'Élève', key: 'studentName', width: 24 },
        { header: 'Classe', key: 'className', width: 18 },
        { header: 'Montant', key: 'amount', width: 14 },
        { header: 'Statut', key: 'status', width: 12 },
        { header: 'Date', key: 'date', width: 14 },
        { header: 'Méthode', key: 'method', width: 14 },
      ];
      const data = filteredPayments.map((p: any) => ({
        studentName: p.student?.user?.name || p.studentName || '',
        className: p.student?.class?.name || p.className || '',
        amount: p.amount || 0,
        status: p.status || '',
        date: p.paymentDate || p.createdAt || '',
        method: p.paymentMethod || '',
      }));
      exportToFile(data, columns, `paiements_${new Date().toISOString().split('T')[0]}`, format, { title: 'Rapport des Paiements', subtitle: `Date: ${new Date().toLocaleDateString('fr-FR')}` }, exportBranding);
      showToast(`${format.toUpperCase()} généré avec succès`, 'success');
      setShowExport(false);
    } catch (err) {
      showToast('Erreur d\'export', 'error');
    }
  };

  // Reminder handlers
  const handleOpenReminderModal = (payment: any) => {
    setSelectedReminderPayment(payment);
    setSelectedReminderTemplate(reminderTemplates[0].message);
    setShowReminderModal(true);
  };

  const handleSendReminderFromModal = async () => {
    if (!selectedReminderPayment) return;
    setSending(true);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      await supabase.from('payment_reminders').insert({
        invoice_id: selectedReminderPayment.id,
        school_id: user?.schoolId,
        student_id: selectedReminderPayment.student_id,
        type: 'PAYMENT_DUE',
        channel: 'SMS',
        status: 'SENT',
        sent_at: new Date().toISOString(),
      });
      setReminders(reminders.map(r =>
        r.id === selectedReminderPayment.id
          ? { ...r, sentCount: r.sentCount + 1, lastSent: new Date().toISOString().split('T')[0] }
          : r
      ));
      showToast(`Rappel envoyé à ${selectedReminderPayment.studentName}`, 'success');
      setShowReminderModal(false);
    } catch (err) {
      showToast('Erreur lors de l\'envoi', 'error');
    } finally {
      setSending(false);
    }
  };

  const handleSendBulkReminders = async () => {
    setSending(true);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      for (const payment of overduePayments) {
        await supabase.from('payment_reminders').insert({
          invoice_id: payment.id,
          school_id: user?.schoolId,
          student_id: payment.student_id || payment.student?.id,
          type: 'PAYMENT_DUE',
          channel: 'SMS',
          status: 'SENT',
          sent_at: new Date().toISOString(),
        });
      }
      showToast(`Relances envoyées à ${overduePayments.length} parents`, 'success');
    } catch (err) {
      console.error('Error sending bulk reminders:', err);
      showToast('Erreur lors de l\'envoi', 'error');
    } finally {
      setSending(false);
    }
  };

  // Expense handlers
  const handleOpenExpenseModal = () => {
    setExpenseForm({ category: '', description: '', amount: 0, date: new Date().toISOString().split('T')[0], paymentMethod: 'CASH' });
    setShowExpenseModal(true);
  };

  const handleAddExpense = () => {
    if (!expenseForm.category || !expenseForm.description || !expenseForm.amount) {
      showToast('Veuillez remplir tous les champs', 'error');
      return;
    }
    const newExpense = { id: Date.now().toString(), ...expenseForm, status: 'PENDING' };
    setExpenses([...expenses, newExpense]);
    showToast('Dépense ajoutée avec succès');
    setShowExpenseModal(false);
  };

  const handleMarkExpensePaid = (expenseId: string) => {
    setExpenses(expenses.map(e => e.id === expenseId ? { ...e, status: 'PAID' } : e));
    showToast('Dépense marquée comme payée');
  };

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(expenses.filter(e => e.id !== expenseId));
    showToast('Dépense supprimée');
  };

  // Receipt handlers
  const handlePrintReceipt = (payment: any) => {
    setSelectedPayment(payment);
    setShowReceiptModal(true);
  };

  const handlePrint = () => {
    window.print();
    showToast('Impression lancée');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(amount);
  };

  const monthlyData = (() => {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    const now = new Date();
    const result = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStart = d.toISOString();
      const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString();
      const revenue = payments
        .filter(p => p.status === 'COMPLETED' && p.created_at >= monthStart && p.created_at <= monthEnd)
        .reduce((sum, p) => sum + (p.amount || 0), 0);
      result.push({ month: months[d.getMonth()], revenue });
    }
    return result;
  })();

  const overduePayments = payments.filter(p => p.status === 'OVERDUE' || p.status === 'PARTIAL');
  const pendingCount = payments.filter(p => p.status === 'PENDING' || p.status === 'PARTIAL').length;

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Paiements' }]}>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' :
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        }`}>
          {toast.type === 'success' && <Check size={16} />}
          {toast.type === 'error' && <X size={16} />}
          {toast.type === 'info' && <Loader2 size={16} className="animate-spin" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des Paiements</h1>
          <p className="text-sm text-slate-500 mt-1">Suivi des frais scolaires et paiements</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => setShowExport(true)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-50">
            <Download size={16} />
            Exporter
          </button>
          <button onClick={() => setShowAddPayment(true)} className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-indigo-600">
            <Plus size={16} />
            Nouveau paiement
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 rounded-2xl text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <DollarSign size={20} />
            </div>
            <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">Ce mois</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(stats?.monthlyRevenue || 0)}</p>
          <div className="flex items-center gap-1 mt-1 text-emerald-100 text-xs">
            <TrendingUp size={12} />
            +12.5% vs mois dernier
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <Wallet size={20} className="text-slate-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{formatCurrency(stats?.totalRevenue || 0)}</p>
          <p className="text-xs text-slate-500 mt-1">Total encaissé</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Clock size={20} className="text-amber-600" />
            </div>
            <span className="px-2 py-1 bg-amber-100 text-amber-600 rounded-full text-xs font-medium">{pendingCount}</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{formatCurrency(stats?.pendingAmount || 0)}</p>
          <p className="text-xs text-slate-500 mt-1">En attente</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <CheckCircle size={20} className="text-indigo-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats?.paymentRate || 0}%</p>
          <div className="mt-2 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats?.paymentRate || 0}%` }} />
          </div>
        </div>
      </div>

      {/* Alerts */}
      {overduePayments.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="font-semibold text-red-800">{overduePayments.length} paiement(s) en retard</p>
              <p className="text-sm text-red-600">Action requise pour {formatCurrency(overduePayments.reduce((sum, p) => sum + (p.amount - p.paidAmount), 0))}</p>
            </div>
          </div>
          <button onClick={() => setFilterStatus('OVERDUE')} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">
            Voir
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl w-fit overflow-x-auto">
        {[
          { id: 'payments', label: 'Paiements', icon: DollarSign },
          { id: 'invoices', label: 'Factures', icon: Receipt },
          { id: 'reminders', label: 'Relances', icon: Bell },
          { id: 'expenses', label: 'Dépenses', icon: HandCoins },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'fees', label: 'Config frais', icon: Settings },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==================== PAYMENTS TAB ==================== */}
      {activeTab === 'payments' && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un élève..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm">
              <option value="ALL">Tous statuts</option>
              <option value="PAID">Payé</option>
              <option value="PARTIAL">Partiel</option>
              <option value="PENDING">En attente</option>
              <option value="OVERDUE">En retard</option>
            </select>
            
            <select value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm">
              <option value="ALL">Tous moyens</option>
              <option value="MONEY_FUSION">Money Fusion</option>
              <option value="MOBILE_MONEY">Mobile Money</option>
              <option value="CASH">Espèces</option>
              <option value="BANK_TRANSFER">Virement</option>
            </select>
            
            <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm">
              <option value="ALL">Toutes classes</option>
              {classes.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Payment Methods Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {Object.entries(PAYMENT_METHODS).slice(0, 4).map(([key, method]) => {
              const Icon = method.icon;
              const count = payments.filter(p => p.paymentMethod === key).length;
              return (
                <div key={key} className={`bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3`}>
                  <div className={`w-10 h-10 rounded-lg ${method.bg} flex items-center justify-center`}>
                    <Icon size={20} className={method.text} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{method.label}</p>
                    <p className="text-xs text-slate-400">{count} transactions</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Élève</th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase">Classe</th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase">Type</th>
                    <th className="text-right px-4 py-4 text-xs font-semibold text-slate-500 uppercase">Montant</th>
                    <th className="text-right px-4 py-4 text-xs font-semibold text-slate-500 uppercase">Payé</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-slate-500 uppercase">Méthode</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-slate-500 uppercase">Statut</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="text-center py-12">
                        <Loader2 size={24} className="animate-spin mx-auto text-indigo-500" />
                      </td>
                    </tr>
                  ) : filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-12 text-slate-400">
                        Aucun paiement trouvé
                      </td>
                    </tr>
                  ) : (
                    paginatedPayments.map((payment: any) => {
                      const method = (PAYMENT_METHODS as any)[payment.paymentMethod] || PAYMENT_METHODS.CASH;
                      const status = (STATUS_CONFIG as any)[payment.status] || STATUS_CONFIG.PENDING;
                      const MethodIcon = method.icon;
                      const StatusIcon = status.icon;
                      
                      return (
                        <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                                {(payment.student?.user?.name || 'N').charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">{payment.student?.user?.name || '—'}</p>
                                <p className="text-xs text-slate-400">{payment.reference || payment.student?.matricule}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-600">
                            {payment.student?.class?.name || '-'}
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                              {(FEE_TYPES as any)[payment.feeType]?.label || 'Scolarité'}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right font-semibold text-slate-800">
                            {formatCurrency(payment.amount)}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <span className="text-emerald-600 font-semibold">{formatCurrency(payment.paidAmount || payment.amount)}</span>
                          </td>
                          <td className="px-4 py-4">
                            <div className={`w-8 h-8 rounded-lg ${method.bg} flex items-center justify-center mx-auto`}>
                              <MethodIcon size={16} className={method.text} />
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center text-sm text-slate-500">
                            {new Date(payment.paymentDate || payment.createdAt).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                              <StatusIcon size={12} />
                              {status.label}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => { setSelectedPayment(payment); setShowPaymentDetail(true); }}
                                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600"
                                title="Voir détails"
                              >
                                <Eye size={16} />
                              </button>
                              {payment.status !== 'PAID' && (
                                <button
                                  onClick={() => handleSendReminder(payment)}
                                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600"
                                  title="Envoyer rappel"
                                >
                                  <Bell size={16} />
                                </button>
                              )}
                              {payment.status === 'OVERDUE' && (
                                <button
                                  onClick={() => handleMarkAsPaid(payment)}
                                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600"
                                  title="Marquer payé"
                                >
                                  <CheckCheck size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={paymentsPage} totalPages={paymentsTotalPages} onPageChange={setPaymentsPage} />
          </div>
        </>
      )}

      {/* ==================== INVOICES TAB ==================== */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Factures et Reçus</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {invoices.length > 0 ? invoices.map(invoice => (
              <div key={invoice.id} className="p-4 border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                    #{invoice.reference}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${(STATUS_CONFIG as any)[invoice.status]?.bg} ${(STATUS_CONFIG as any)[invoice.status]?.text}`}>
                    {(STATUS_CONFIG as any)[invoice.status]?.label || 'En attente'}
                  </span>
                </div>
                <p className="font-medium text-slate-800">{invoice.student?.user?.name || '—'}</p>
                <p className="text-sm text-slate-500 mt-1">{invoice.description || 'Facture de scolarité'}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <p className="text-lg font-bold text-slate-800">{formatCurrency(invoice.amount)}</p>
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <Receipt size={16} className="text-slate-400" />
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center py-12 text-slate-400">
                <Receipt size={48} className="mx-auto mb-4 opacity-50" />
                <p>Aucune facture disponible</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== ANALYTICS TAB ==================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Revenus mensuels</h3>
            <div className="flex items-end justify-between h-64 gap-4">
              {(() => { const maxRevenue = Math.max(...monthlyData.map(d => d.revenue), 1); return monthlyData.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative" style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}>
                    <div className="absolute inset-0 bg-indigo-500 rounded-t-lg" />
                    {item.revenue >= maxRevenue * 0.5 && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-500 rounded-full" />
                    )}
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-b-lg relative">
                    <div 
                      className="absolute left-0 top-0 h-full bg-emerald-300 rounded-b-lg"
                      style={{ width: `${Math.min((item.revenue / maxRevenue) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-500">{item.month}</span>
                </div>
              )); })()}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-indigo-500" />
                <span className="text-xs text-slate-500">Revenus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-emerald-300" />
                <span className="text-xs text-slate-500">Objectif</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h4 className="text-sm font-medium text-slate-500 mb-4">Taux de paiement par méthode</h4>
              {Object.entries(PAYMENT_METHODS).map(([key, method]) => {
                const count = payments.filter(p => p.paymentMethod === key && p.status === 'PAID').length;
                const total = payments.filter(p => p.paymentMethod === key).length;
                const rate = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={key} className="flex items-center gap-3 mb-3 last:mb-0">
                    <span className="text-sm text-slate-600 w-24">{method.label}</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${method.bg.replace('100', '500')} rounded-full`} style={{ width: `${rate}%` }} />
                    </div>
                    <span className="text-sm font-medium text-slate-800 w-12 text-right">{rate.toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h4 className="text-sm font-medium text-slate-500 mb-4">Top élèves</h4>
              {(() => {
                const byStudent: Record<string, { name: string; className: string; amount: number }> = {};
                payments.filter(p => p.status === 'COMPLETED').forEach(p => {
                  const key = p.student_id || p.student?.id;
                  if (!key) return;
                  if (!byStudent[key]) byStudent[key] = { name: p.student?.user?.name || 'N/A', className: p.student?.class?.name || '', amount: 0 };
                  byStudent[key].amount += p.amount || 0;
                });
                const topStudents = Object.values(byStudent).sort((a, b) => b.amount - a.amount).slice(0, 5);
                if (topStudents.length === 0) return <p className="text-sm text-slate-400">Aucun paiement enregistré</p>;
                return topStudents.map((student, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{student.name}</p>
                        <p className="text-xs text-slate-400">{student.className}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-emerald-600">{formatCurrency(student.amount)}</p>
                  </div>
                ));
              })()}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h4 className="text-sm font-medium text-slate-500 mb-4">Alertes</h4>
              <div className="space-y-3">
                {(() => {
                  const overdue = payments.filter(p => p.status === 'OVERDUE' || (p.status === 'PARTIAL' && p.due_date && new Date(p.due_date) < new Date()));
                  const overdueTotal = overdue.reduce((sum, p) => sum + (p.amount || 0), 0);
                  const partial = payments.filter(p => p.status === 'PARTIAL');
                  const partialTotal = partial.reduce((sum, p) => sum + ((p.amount || 0) - (p.paid_amount || 0)), 0);
                  return (
                    <>
                      {overdue.length > 0 && (
                        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                          <AlertTriangle size={16} className="text-red-500" />
                          <div>
                            <p className="text-sm font-medium text-red-800">{overdue.length} paiement{overdue.length > 1 ? 's' : ''} en retard</p>
                            <p className="text-xs text-red-600">Total: {formatCurrency(overdueTotal)}</p>
                          </div>
                        </div>
                      )}
                      {partial.length > 0 && (
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                          <Clock size={16} className="text-amber-500" />
                          <div>
                            <p className="text-sm font-medium text-amber-800">{partial.length} paiement{partial.length > 1 ? 's' : ''} partiel{partial.length > 1 ? 's' : ''}</p>
                            <p className="text-xs text-amber-600">Reste: {formatCurrency(partialTotal)}</p>
                          </div>
                        </div>
                      )}
                      {overdue.length === 0 && partial.length === 0 && (
                        <p className="text-sm text-slate-400">Aucune alerte</p>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== FEES CONFIG TAB ==================== */}
      {activeTab === 'fees' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Configuration des frais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(FEE_TYPES).map(([key, fee]) => {
              const Icon = fee.icon;
              return (
                <div key={key} className="p-6 border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors">
                  <div className={`w-12 h-12 rounded-xl bg-${fee.color}-100 flex items-center justify-center mb-4`}>
                    <Icon size={24} className={`text-${fee.color}-600`} />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">{fee.label}</h4>
                  <p className="text-sm text-slate-500 mb-4">Configurer les frais de {fee.label.toLowerCase()}</p>
                  <button onClick={() => window.location.href = '/settings'} className="w-full py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200">
                    Configurer
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Payment Detail Modal */}
      {showPaymentDetail && selectedPayment && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Détails du paiement</h3>
              <button onClick={() => setShowPaymentDetail(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                  {(selectedPayment.student?.user?.name || 'N').charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{selectedPayment.student?.user?.name || '—'}</p>
                  <p className="text-sm text-slate-500">{selectedPayment.student?.class?.name || '—'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 uppercase">Montant total</p>
                  <p className="text-xl font-bold text-slate-800">{formatCurrency(selectedPayment.amount)}</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <p className="text-xs text-emerald-600 uppercase">Montant payé</p>
                  <p className="text-xl font-bold text-emerald-600">{formatCurrency(selectedPayment.paidAmount || selectedPayment.amount)}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 uppercase mb-1">Référence</p>
                <p className="font-mono text-slate-800">{selectedPayment.reference || '—'}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 uppercase mb-1">Méthode</p>
                <p className="font-medium text-slate-800">{(PAYMENT_METHODS as any)[selectedPayment.paymentMethod]?.label || '—'}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 uppercase mb-1">Date</p>
                <p className="font-medium text-slate-800">{new Date(selectedPayment.paymentDate || selectedPayment.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
              </div>

              {selectedPayment.amount > (selectedPayment.paidAmount || selectedPayment.amount) && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-xs text-amber-600 uppercase mb-1">Reste à payer</p>
                  <p className="text-xl font-bold text-amber-600">{formatCurrency(selectedPayment.amount - (selectedPayment.paidAmount || selectedPayment.amount))}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowPaymentDetail(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-medium">
                Fermer
              </button>
              <button onClick={() => handlePrintReceipt(selectedPayment)} className="flex-1 py-2.5 bg-indigo-500 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                <Receipt size={16} />
                Reçu PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Modal */}
      {showAddPayment && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Nouveau paiement</h3>
              <button onClick={() => setShowAddPayment(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Élève <span className="text-red-500">*</span></label>
                <select 
                  required
                  value={paymentForm.studentId} 
                  onChange={e => setPaymentForm(p => ({ ...p, studentId: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm"
                >
                  <option value="">Sélectionner un élève</option>
                  {students.map((s: any) => (
                    <option key={s.id} value={s.id}>{s.firstName || s.first_name} {s.lastName || s.last_name} - {s.className || s.class?.name || ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Type de frais</label>
                <select 
                  value={paymentForm.feeType} 
                  onChange={e => setPaymentForm(p => ({ ...p, feeType: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm"
                >
                  <option value="TUITION">Scolarité</option>
                  <option value="TRANSPORT">Transport</option>
                  <option value="MEALS">Cantine</option>
                  <option value="OTHER">Autres</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Montant (XOF) <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  min="1"
                  required
                  placeholder="0" 
                  value={paymentForm.amount}
                  onChange={e => setPaymentForm(p => ({ ...p, amount: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Méthode de paiement</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(PAYMENT_METHODS).slice(0, 4).map(([key, method]) => {
                    const Icon = method.icon;
                    return (
                      <button 
                        key={key} 
                        type="button"
                        onClick={() => setPaymentForm(p => ({ ...p, paymentMethod: key }))}
                        className={`p-3 border rounded-xl flex items-center gap-2 ${
                          paymentForm.paymentMethod === key 
                            ? 'border-indigo-500 bg-indigo-50' 
                            : 'border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <Icon size={18} className={method.text} />
                        <span className="text-sm font-medium">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddPayment(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-medium">
                Annuler
              </button>
              <button 
                onClick={async () => {
                  const amount = parseFloat(paymentForm.amount);
                  if (!amount || amount <= 0) {
                    showToast('Le montant doit être supérieur à 0', 'error');
                    return;
                  }
                  if (!paymentForm.studentId) {
                    showToast('Veuillez sélectionner un élève', 'error');
                    return;
                  }
                  setProcessingPayment(true);
                  try {
                    await sbPayments.create({
                      studentId: paymentForm.studentId,
                      amount: paymentForm.amount,
                      paymentMethod: paymentForm.paymentMethod,
                      status: 'PAID',
                    });
                    showToast('Paiement enregistré', 'success');
                    setShowAddPayment(false);
                    setPaymentForm({ studentId: '', feeType: 'TUITION', amount: '', paymentMethod: 'CASH' });
                    loadData();
                  } catch (err: any) {
                    showToast(err?.message || 'Erreur lors de l\'enregistrement', 'error');
                  } finally {
                    setProcessingPayment(false);
                  }
                }} 
                disabled={processingPayment}
                className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processingPayment ? <Loader2 size={16} className="animate-spin" /> : null}
                {processingPayment ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExport && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Exporter les données</h3>
              <button onClick={() => setShowExport(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="space-y-3">
              <button onClick={() => handleExport('pdf')} className="w-full p-4 bg-red-50 hover:bg-red-100 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-red-500 text-white rounded-lg"><FileText size={24} /></div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Export PDF</p>
                  <p className="text-xs text-slate-500">Rapport imprimable</p>
                </div>
              </button>
              <button onClick={() => handleExport('excel')} className="w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-emerald-500 text-white rounded-lg"><FileSpreadsheet size={24} /></div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Export Excel</p>
                  <p className="text-xs text-slate-500">Données tabulaires complètes</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== REMINDERS TAB ==================== */}
      {activeTab === 'reminders' && (
        <div className="space-y-4">
          {/* Reminder Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <p className="text-xs text-red-600 font-medium">En retard</p>
              <p className="text-2xl font-bold text-red-700">{reminders.filter(r => r.status === 'OVERDUE').length}</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <p className="text-xs text-amber-600 font-medium">En attente</p>
              <p className="text-2xl font-bold text-amber-700">{reminders.filter(r => r.status === 'PENDING').length}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-xs text-blue-600 font-medium">Total relances</p>
              <p className="text-2xl font-bold text-blue-700">{reminders.reduce((sum, r) => sum + r.sentCount, 0)}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
              <p className="text-xs text-indigo-600 font-medium">Montant dû</p>
              <p className="text-2xl font-bold text-indigo-700">{formatCurrency(reminders.reduce((sum, r) => sum + r.amount, 0))}</p>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Relances de paiement</h3>
              <p className="text-sm text-slate-500">Envoyez des rappels aux parents pour les paiements en retard</p>
            </div>
            <button onClick={handleSendBulkReminders} disabled={sending || reminders.length === 0} className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-red-600 disabled:opacity-50">
              <Send size={16} /> Envoyer à tous
            </button>
          </div>

          {/* Reminders List */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Élève</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Montant dû</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Échéance</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Relances</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Dernière relance</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reminders.map(reminder => (
                    <tr key={reminder.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                            {reminder.studentName.split(' ').map((n: any) => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{reminder.studentName}</p>
                            <p className="text-xs text-slate-500">{reminder.parentPhone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-800">{formatCurrency(reminder.amount)}</td>
                      <td className="px-4 py-3 text-center text-sm text-slate-600">{new Date(reminder.dueDate).toLocaleDateString('fr-FR')}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${reminder.sentCount > 2 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                          {reminder.sentCount} envois
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-slate-600">
                        {reminder.lastSent ? new Date(reminder.lastSent).toLocaleDateString('fr-FR') : 'Jamais'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => handleOpenReminderModal(reminder)} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 flex items-center gap-1 mx-auto">
                          <Send size={12} /> Relancer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================== EXPENSES TAB ==================== */}
      {activeTab === 'expenses' && (
        <div className="space-y-4">
          {/* Expense Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <p className="text-xs text-red-600 font-medium">Total dépenses</p>
              <p className="text-2xl font-bold text-red-700">{formatCurrency(expenseTotal)}</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <p className="text-xs text-amber-600 font-medium">Payées</p>
              <p className="text-2xl font-bold text-amber-700">{formatCurrency(expenses.filter(e => e.status === 'PAID').reduce((sum, e) => sum + e.amount, 0))}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-xs text-blue-600 font-medium">En attente</p>
              <p className="text-2xl font-bold text-blue-700">{formatCurrency(expenses.filter(e => e.status === 'PENDING').reduce((sum, e) => sum + e.amount, 0))}</p>
            </div>
          </div>

          {/* Add Expense Button */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Suivi des dépenses</h3>
              <p className="text-sm text-slate-500">Gérez les dépenses de l'établissement</p>
            </div>
            <button onClick={handleOpenExpenseModal} className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-indigo-600">
              <Plus size={16} /> Ajouter une dépense
            </button>
          </div>

          {/* Expenses List */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Catégorie</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Description</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Montant</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Mode</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Statut</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map(expense => (
                    <tr key={expense.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-3">
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-800">{expense.description}</td>
                      <td className="px-4 py-3 text-center text-sm text-slate-600">{new Date(expense.date).toLocaleDateString('fr-FR')}</td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-800">{formatCurrency(expense.amount)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                          {expense.paymentMethod === 'CASH' ? 'Espèces' : 'Virement'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          expense.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {expense.status === 'PAID' ? 'Payé' : 'En attente'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {expense.status === 'PENDING' && (
                            <button onClick={() => handleMarkExpensePaid(expense.id)} className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-600" title="Marquer comme payé">
                              <Check size={14} />
                            </button>
                          )}
                          <button onClick={() => handleDeleteExpense(expense.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500" title="Supprimer">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REMINDER MODAL */}
      {showReminderModal && selectedReminderPayment && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <Bell size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Envoyer une relance</h3>
                  <p className="text-xs text-slate-500">{selectedReminderPayment.studentName}</p>
                </div>
              </div>
              <button onClick={() => setShowReminderModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="mb-4 p-4 bg-slate-50 rounded-xl">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-500">Montant dû</span>
                <span className="font-semibold text-slate-800">{formatCurrency(selectedReminderPayment.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Échéance</span>
                <span className="font-semibold text-red-600">{new Date(selectedReminderPayment.dueDate).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-500 uppercase mb-2 block">Modèle de message</label>
              <select
                value={selectedReminderTemplate}
                onChange={(e) => setSelectedReminderTemplate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm"
              >
                {reminderTemplates.map(t => (
                  <option key={t.id} value={t.message}>{t.name}</option>
                ))}
              </select>
            </div>

            {selectedReminderTemplate && (
              <div className="mb-4 p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-sm text-red-800 whitespace-pre-wrap">{selectedReminderTemplate
                  .replace('{student_name}', selectedReminderPayment.studentName)
                  .replace('{amount}', selectedReminderPayment.amount.toString())
                  .replace('{due_date}', new Date(selectedReminderPayment.dueDate).toLocaleDateString('fr-FR'))}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setShowReminderModal(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">
                Annuler
              </button>
              <button onClick={handleSendReminderFromModal} disabled={sending} className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2">
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} Envoyer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPENSE MODAL */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Ajouter une dépense</h3>
              <button onClick={() => setShowExpenseModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Catégorie *</label>
                <select
                  value={expenseForm.category}
                  onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                >
                  <option value="">Sélectionner</option>
                  {expenseCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Description *</label>
                <input
                  type="text"
                  value={expenseForm.description}
                  onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                  placeholder="Description de la dépense"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Montant (XOF) *</label>
                  <input
                    type="number"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Date</label>
                  <input
                    type="date"
                    value={expenseForm.date}
                    onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Mode de paiement</label>
                <select
                  value={expenseForm.paymentMethod}
                  onChange={(e) => setExpenseForm({ ...expenseForm, paymentMethod: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-400 outline-none text-sm"
                >
                  <option value="CASH">Espèces</option>
                  <option value="BANK_TRANSFER">Virement bancaire</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowExpenseModal(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">
                Annuler
              </button>
              <button onClick={handleAddExpense} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECEIPT MODAL */}
      {showReceiptModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-800">Reçu de paiement</h3>
              <button onClick={() => setShowReceiptModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="p-6 print-content">
              <div className="text-center border-b border-dashed border-slate-300 pb-4 mb-4">
                <h2 className="text-xl font-bold text-slate-800">{user?.school?.name || 'École'}</h2>
                <p className="text-sm text-slate-500">{user?.school?.address || ''}</p>
                {user?.school?.phone && <p className="text-xs text-slate-400">Tél: {user.school.phone}</p>}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">N° Reçu:</span>
                  <span className="text-sm font-semibold">{selectedPayment.reference || 'RCP-2025-001'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Date:</span>
                  <span className="text-sm font-semibold">{new Date().toLocaleDateString('fr-FR')}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <p className="text-xs text-slate-500 uppercase mb-2">Élève</p>
                <p className="font-semibold text-slate-800">{selectedPayment.student?.user?.name || 'Nom de l\'élève'}</p>
                <p className="text-sm text-slate-600">{selectedPayment.student?.class?.name || 'Classe'}</p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">Scolarité</span>
                  <span className="font-semibold text-slate-800">{formatCurrency(selectedPayment.amount || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Mode de paiement</span>
                  <span className="font-semibold text-slate-800">{PAYMENT_METHODS[selectedPayment.paymentMethod as keyof typeof PAYMENT_METHODS]?.label || selectedPayment.paymentMethod || 'Non spécifié'}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 mt-4 pt-4">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-800">TOTAL PAYÉ</span>
                  <span className="text-xl font-bold text-emerald-600">{formatCurrency(selectedPayment.amount || 0)}</span>
                </div>
              </div>

              <p className="text-center text-xs text-slate-400 mt-6">Merci pour votre paiement</p>
            </div>

            <div className="flex gap-3 p-6 border-t border-slate-200">
              <button onClick={handlePrint} className="flex-1 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 flex items-center justify-center gap-2">
                <Printer size={16} /> Imprimer
              </button>
              <button onClick={() => { showToast('Reçu envoyé par email', 'success'); setShowReceiptModal(false); }} className="flex-1 py-3 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 flex items-center justify-center gap-2">
                <Mail size={16} /> Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
