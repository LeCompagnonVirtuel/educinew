'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';
import {
  CreditCard, Save, Loader2, Check, X, Eye, EyeOff,
  Wifi, WifiOff, Plus, Trash2, RefreshCw, AlertTriangle,
  CheckCircle, XCircle, Settings, Shield, Globe,
  TrendingUp, DollarSign, BarChart3,
  Download, Search, Clock,
  Receipt, Activity,
} from 'lucide-react';

interface Gateway {
  name: string;
  label: string;
  description: string;
  supportedMethods: string[];
  supportedCurrencies: string[];
  supportedCountries: string[];
  logo: string;
  configured: boolean;
  isActive: boolean;
  configId: string | null;
  lastTestedAt: string | null;
  lastTestStatus: string | null;
  lastTestMessage: string | null;
  configFields: { key: string; label: string; type: string; required: boolean; placeholder?: string }[];
  maskedUrl?: string | null;
}

interface FinancialData {
  dashboard: {
    today_revenue: number;
    month_revenue: number;
    total_transactions: number;
    successful_transactions: number;
    failed_transactions: number;
    success_rate: number;
    avg_amount: number;
  };
  methodBreakdown: { method: string; count: number; total: number }[];
  revenueTrend: { month: string; label: string; revenue: number; transactions: number }[];
  gatewayStats: any[];
  activeGateways: number;
  totalGateways: number;
}

interface TransactionLog {
  id: string;
  action: string;
  status: string;
  amount: number | null;
  currency: string;
  reference: string | null;
  provider_reference: string | null;
  error_message: string | null;
  gateway_response: any;
  created_at: string;
  gateway: { gateway: string; display_name: string } | null;
}

const MONEY_FUSION_URL_REGEX = /^https:\/\/pay\.moneyfusion\.net\/([^/]+)\/([^/]+)\/pay\/?$/;

const statusColors: Record<string, string> = {
  SUCCESS: 'bg-emerald-100 text-emerald-700',
  COMPLETED: 'bg-emerald-100 text-emerald-700',
  FAILED: 'bg-red-100 text-red-700',
  PENDING: 'bg-amber-100 text-amber-700',
  CANCELLED: 'bg-slate-100 text-slate-600',
  REFUNDED: 'bg-purple-100 text-purple-700',
  RECEIVED: 'bg-blue-100 text-blue-700',
  PROCESSED: 'bg-emerald-100 text-emerald-700',
};

export default function GatewaySettings() {
  const { user } = useAuth();
  const [gateway, setGateway] = useState<Gateway | null>(null);
  const [financial, setFinancial] = useState<FinancialData | null>(null);
  const [transactions, setTransactions] = useState<TransactionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'config' | 'financial' | 'journal'>('config');
  const [paymentUrl, setPaymentUrl] = useState('');
  const [showUrl, setShowUrl] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [txPage, setTxPage] = useState(1);
  const [txTotal, setTxTotal] = useState(0);
  const [txFilter, setTxFilter] = useState({ status: '', search: '' });

  const supabase = getSupabase();

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadAll = async () => {
    setLoading(true);
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token || '';
      const [gwRes, finRes, txRes] = await Promise.allSettled([
        fetch('/api/payments/gateways', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/payments/financial', { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`/api/payments/transactions?page=${txPage}&limit=20${txFilter.status ? `&status=${txFilter.status}` : ''}${txFilter.search ? `&search=${txFilter.search}` : ''}`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (gwRes.status === 'fulfilled' && gwRes.value.ok) {
        const data = await gwRes.value.json();
        setGateway(data.gateways?.[0] || null);
      }
      if (finRes.status === 'fulfilled' && finRes.value.ok) {
        const data = await finRes.value.json();
        setFinancial(data);
      }
      if (txRes.status === 'fulfilled' && txRes.value.ok) {
        const data = await txRes.value.json();
        setTransactions(data.transactions || []);
        setTxTotal(data.total || 0);
      }
    } catch {
      showToast('Erreur de chargement', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, [txPage, txFilter.status, txFilter.search]);

  const validateUrl = (url: string) => {
    if (!url) { setUrlError(''); return true; }
    if (!MONEY_FUSION_URL_REGEX.test(url.trim())) {
      setUrlError('Format attendu: https://pay.moneyfusion.net/{businessname}/{token}/pay/');
      return false;
    }
    setUrlError('');
    return true;
  };

  const handleSaveConfig = async () => {
    if (!paymentUrl || !validateUrl(paymentUrl)) {
      if (!paymentUrl) setUrlError('URL de paiement requise');
      return;
    }
    setSaving(true);
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token || '';
      const res = await fetch('/api/payments/gateways', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          gateway: 'MONEY_FUSION',
          config: { payment_url: paymentUrl },
          isActive: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast('Configuration Money Fusion enregistrée');
      setPaymentUrl('');
      loadAll();
    } catch (e: any) {
      showToast(e.message || 'Erreur', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    if (!gateway?.configId) return;
    setTesting(true);
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token || '';
      const res = await fetch('/api/payments/gateways/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ gatewayId: gateway.configId }),
      });
      const result = await res.json();
      showToast(result.message || (result.success ? 'Test réussi' : 'Test échoué'), result.success ? 'success' : 'error');
      loadAll();
    } catch (e: any) {
      showToast(e.message || 'Erreur de test', 'error');
    } finally {
      setTesting(false);
    }
  };

  const handleToggle = async () => {
    if (!gateway?.configId) return;
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token || '';
      const res = await fetch('/api/payments/gateways', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ gateway: 'MONEY_FUSION', isActive: !gateway.isActive, config: {} }),
      });
      if (!res.ok) throw new Error('Erreur');
      showToast(gateway.isActive ? 'Money Fusion désactivé' : 'Money Fusion activé');
      loadAll();
    } catch (e: any) {
      showToast(e.message || 'Erreur', 'error');
    }
  };

  const handleDelete = async () => {
    if (!gateway?.configId || !confirm('Supprimer la configuration Money Fusion ?')) return;
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token || '';
      const res = await fetch(`/api/payments/gateways?id=${gateway.configId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erreur');
      showToast('Configuration supprimée');
      loadAll();
    } catch (e: any) {
      showToast(e.message || 'Erreur', 'error');
    }
  };

  const handleExportTx = async () => {
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token || '';
      const res = await fetch(`/api/payments/transactions?export=csv${txFilter.status ? `&status=${txFilter.status}` : ''}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      showToast('Erreur d\'export', 'error');
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const tabs = [
    { id: 'config' as const, label: 'Money Fusion', icon: CreditCard },
    { id: 'financial' as const, label: 'Tableau de bord', icon: BarChart3 },
    { id: 'journal' as const, label: 'Journal', icon: Receipt },
  ];

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="flex overflow-x-auto gap-1 border-b border-slate-200 pb-2">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id ? 'bg-[var(--color-primary,#4F46E5)] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
            }`}>
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16"><Loader2 size={32} className="animate-spin mx-auto text-slate-400" /></div>
      ) : (
        <>
          {/* MONEY FUSION CONFIG TAB */}
          {activeTab === 'config' && (
            <div className="space-y-6">
              {/* Info Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-3">
                <Shield size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-800">Money Fusion — Passerelle unique</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Chaque établissement configure son propre compte Money Fusion. L'URL est chiffrée AES-256-GCM et jamais exposée au frontend.
                    EduCI ne manipule jamais les fonds — les paiements vont directement sur votre compte Money Fusion.
                  </p>
                </div>
              </div>

              {/* Current Status */}
              {gateway?.configured ? (
                <div className={`bg-white rounded-2xl border-2 p-6 ${gateway.isActive ? 'border-emerald-200' : 'border-amber-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">💰</span>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">Money Fusion</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {gateway.isActive ? (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-1"><CheckCircle size={12} /> Actif</span>
                          ) : (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Désactivé</span>
                          )}
                          {gateway.maskedUrl && (
                            <span className="text-xs text-slate-400 font-mono">{gateway.maskedUrl}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={handleTest} disabled={testing}
                        className="px-4 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 flex items-center gap-1 disabled:opacity-50">
                        {testing ? <Loader2 size={14} className="animate-spin" /> : <Wifi size={14} />}
                        Tester
                      </button>
                      <button onClick={handleToggle}
                        className={`px-4 py-2 text-xs font-bold rounded-lg ${gateway.isActive ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                        {gateway.isActive ? 'Désactiver' : 'Activer'}
                      </button>
                      <button onClick={handleDelete} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {gateway.lastTestedAt && (
                    <div className={`mt-3 p-3 rounded-xl ${gateway.lastTestStatus === 'SUCCESS' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                      <p className="text-xs flex items-center gap-2">
                        {gateway.lastTestStatus === 'SUCCESS' ? <CheckCircle size={14} className="text-emerald-500" /> : <XCircle size={14} className="text-red-500" />}
                        <span className="font-medium">{gateway.lastTestMessage}</span>
                        <span className="text-slate-400 ml-auto">{new Date(gateway.lastTestedAt).toLocaleString('fr-FR')}</span>
                      </p>
                    </div>
                  )}

                  {/* Update URL */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Modifier l'URL de paiement</p>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <input
                          type={showUrl ? 'text' : 'password'}
                          value={paymentUrl}
                          onChange={e => { setPaymentUrl(e.target.value); validateUrl(e.target.value); }}
                          placeholder="https://pay.moneyfusion.net/{businessname}/{token}/pay/"
                          className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm pr-10 font-mono"
                        />
                        <button type="button" onClick={() => setShowUrl(!showUrl)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                          {showUrl ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      <button onClick={handleSaveConfig} disabled={saving || !paymentUrl}
                        className="px-6 py-3 bg-[var(--color-primary,#4F46E5)] text-white text-sm font-bold rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center gap-2">
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Enregistrer
                      </button>
                    </div>
                    {urlError && <p className="text-xs text-red-500 mt-1">{urlError}</p>}
                  </div>
                </div>
              ) : (
                /* First-time Setup */
                <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8">
                  <div className="text-center mb-6">
                    <span className="text-5xl mb-3 block">💰</span>
                    <h3 className="text-xl font-bold text-slate-900">Configurer Money Fusion</h3>
                    <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                      Entrez l'URL de paiement de votre compte Money Fusion. Cette URL contient votre nom d'entreprise et votre token d'API.
                    </p>
                  </div>

                  <div className="max-w-lg mx-auto space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                        URL de paiement Money Fusion <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showUrl ? 'text' : 'password'}
                          value={paymentUrl}
                          onChange={e => { setPaymentUrl(e.target.value); validateUrl(e.target.value); }}
                          placeholder="https://pay.moneyfusion.net/{businessname}/{token}/pay/"
                          className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm pr-10 font-mono"
                        />
                        <button type="button" onClick={() => setShowUrl(!showUrl)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                          {showUrl ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {urlError && <p className="text-xs text-red-500 mt-1">{urlError}</p>}
                      <p className="text-xs text-slate-400 mt-2">
                        Format: <code className="bg-slate-100 px-1 rounded">https://pay.moneyfusion.net/votre-entreprise/votre-token/pay/</code>
                      </p>
                    </div>

                    <button onClick={handleSaveConfig} disabled={saving || !paymentUrl}
                      className="w-full py-3 bg-[var(--color-primary,#4F46E5)] text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                      {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      Activer Money Fusion
                    </button>
                  </div>
                </div>
              )}

              {/* How It Works */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Comment ça fonctionne</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { step: '1', title: 'Configuration', desc: 'L\'admin entre l\'URL Money Fusion de l\'école. Chiffrée et sécurisée.' },
                    { step: '2', title: 'Paiement', desc: 'Le parent paie via Money Fusion. L\'argent va directement sur le compte de l\'école.' },
                    { step: '3', title: 'Confirmation', desc: 'Money Fusion notifie EduCI. Facture mise à jour, reçu généré automatiquement.' },
                  ].map(item => (
                    <div key={item.step} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary,#4F46E5)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FINANCIAL DASHBOARD TAB */}
          {activeTab === 'financial' && financial && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Aujourd\'hui', value: formatAmount(financial.dashboard?.today_revenue || 0), icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Ce mois', value: formatAmount(financial.dashboard?.month_revenue || 0), icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Transactions (30j)', value: String(financial.dashboard?.total_transactions || 0), icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { label: 'Taux de réussite', value: `${financial.dashboard?.success_rate || 0}%`, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <stat.icon size={18} className={stat.color} />
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Évolution des revenus</h3>
                  <div className="space-y-2">
                    {(financial.revenueTrend || []).slice(-6).map((month, i) => {
                      const maxRev = Math.max(...(financial.revenueTrend || []).map(m => m.revenue), 1);
                      const pct = (month.revenue / maxRev) * 100;
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-xs text-slate-500 w-16">{month.label}</span>
                          <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--color-primary,#4F46E5)] rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 w-28 text-right">{formatAmount(month.revenue)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Statistiques Money Fusion</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                      <span className="text-sm font-medium text-slate-700">Paiements réussis</span>
                      <span className="text-lg font-bold text-emerald-600">{financial.dashboard?.successful_transactions || 0}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                      <span className="text-sm font-medium text-slate-700">Paiements échoués</span>
                      <span className="text-lg font-bold text-red-600">{financial.dashboard?.failed_transactions || 0}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                      <span className="text-sm font-medium text-slate-700">Montant moyen</span>
                      <span className="text-lg font-bold text-blue-600">{formatAmount(financial.dashboard?.avg_amount || 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TRANSACTION JOURNAL TAB */}
          {activeTab === 'journal' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" value={txFilter.search} onChange={e => setTxFilter(p => ({ ...p, search: e.target.value }))}
                    placeholder="Rechercher une référence..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none" />
                </div>
                <select value={txFilter.status} onChange={e => setTxFilter(p => ({ ...p, status: e.target.value }))}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none">
                  <option value="">Tous les statuts</option>
                  <option value="SUCCESS">Succès</option>
                  <option value="FAILED">Échoué</option>
                  <option value="PENDING">En attente</option>
                </select>
                <button onClick={handleExportTx}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200">
                  <Download size={14} />
                  Export CSV
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                {transactions.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-12">Aucune transaction</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Action</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Statut</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Montant</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Référence</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">Erreur</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map(tx => (
                          <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50">
                            <td className="px-4 py-3 text-xs text-slate-600">{new Date(tx.created_at).toLocaleString('fr-FR')}</td>
                            <td className="px-4 py-3"><span className="text-xs font-semibold text-slate-700">{tx.action}</span></td>
                            <td className="px-4 py-3">
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${statusColors[tx.status] || 'bg-slate-100 text-slate-500'}`}>
                                {tx.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-semibold text-slate-900">{tx.amount ? formatAmount(tx.amount) : '—'}</td>
                            <td className="px-4 py-3 text-xs text-slate-500 font-mono hidden sm:table-cell">{tx.reference || '—'}</td>
                            <td className="px-4 py-3 text-xs text-red-500 max-w-[200px] truncate hidden lg:table-cell">{tx.error_message || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {txTotal > 20 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
                    <span className="text-xs text-slate-500">{txTotal} transactions au total</span>
                    <div className="flex gap-2">
                      <button onClick={() => setTxPage(p => Math.max(1, p - 1))} disabled={txPage === 1}
                        className="px-3 py-1 text-xs bg-slate-100 rounded-lg disabled:opacity-50">Précédent</button>
                      <span className="px-3 py-1 text-xs text-slate-600">Page {txPage}</span>
                      <button onClick={() => setTxPage(p => p + 1)} disabled={txPage * 20 >= txTotal}
                        className="px-3 py-1 text-xs bg-slate-100 rounded-lg disabled:opacity-50">Suivant</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
