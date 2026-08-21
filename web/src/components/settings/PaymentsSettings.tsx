'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import {
  CreditCard, Save, Loader2, Check, X, Eye, EyeOff,
  Wifi, WifiOff, Plus, Trash2, RefreshCw, AlertTriangle,
  CheckCircle, XCircle, Settings, Shield, Smartphone,
  Building2, Banknote, Globe, Lock,
} from 'lucide-react';

interface GatewayConfig {
  id: string;
  gateway: string;
  isActive: boolean;
  config: Record<string, string>;
  lastTestedAt?: string | null;
  lastTestStatus?: string | null;
  lastTestMessage?: string | null;
  label?: string;
  description?: string;
  supportedMethods?: string[];
  configFields?: { key: string; label: string; type: string; required: boolean }[];
}

interface SupportedGateway {
  name: string;
  id?: string;
  label?: string;
  description?: string;
  supportedMethods?: string[];
  configFields?: { key: string; label: string; type: string; required: boolean }[];
  logo?: string;
  countries?: string[];
}

interface FeeCategory {
  id: string;
  name: string;
  description?: string | null;
  amount?: number | null;
  isRequired?: boolean;
  isActive?: boolean;
}

const gatewayIcons: Record<string, string> = {
  MONEY_FUSION: '💰',
  MANUAL: '💵',
  BANK_TRANSFER: '🏦',
};

export default function PaymentsSettings({ lang }: { lang: string }) {
  const [subTab, setSubTab] = useState<'gateways' | 'fees' | 'config'>('gateways');
  const [gatewayConfigs, setGatewayConfigs] = useState<GatewayConfig[]>([]);
  const [supportedGateways, setSupportedGateways] = useState<SupportedGateway[]>([]);
  const [feeCategories, setFeeCategories] = useState<FeeCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [configModal, setConfigModal] = useState<SupportedGateway | null>(null);
  const [configForm, setConfigForm] = useState<Record<string, string>>({});
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [testing, setTesting] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [feeModal, setFeeModal] = useState(false);
  const [feeForm, setFeeForm] = useState({ name: '', description: '', amount: '', isRequired: true });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [configs, supported, fees] = await Promise.all([
        api.getGatewayConfigs().catch(() => []),
        api.getSupportedGateways().catch(() => []),
        api.getFeeCategories().catch(() => []),
      ]);
      setGatewayConfigs(configs);
      setSupportedGateways(supported);
      setFeeCategories(fees);
    } catch {
      showToast('Erreur de chargement', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleOpenConfig = (gw: SupportedGateway) => {
    const existing = gatewayConfigs.find(c => c.gateway === gw.name);
    setConfigForm(existing?.config || {});
    setConfigModal(gw);
    setShowKeys({});
  };

  const handleSaveConfig = async () => {
    if (!configModal) return;
    setSaving(true);
    try {
      await api.saveGatewayConfig({
        gateway: configModal.name,
        isActive: true,
        config: configForm,
      });
      showToast('Configuration enregistrée');
      setConfigModal(null);
      loadData();
    } catch (e: any) {
      showToast(e.message || 'Erreur', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async (configId: string) => {
    setTesting(configId);
    try {
      const result = await api.testGatewayConnection(configId);
      if (result.success) {
        showToast(result.message || 'Connexion réussie');
      } else {
        showToast(result.message || 'Connexion échouée', 'error');
      }
      loadData();
    } catch (e: any) {
      showToast(e.message || 'Erreur de test', 'error');
    } finally {
      setTesting(null);
    }
  };

  const handleToggleGateway = async (configId: string, isActive: boolean) => {
    try {
      await api.toggleGateway(configId, isActive);
      showToast(isActive ? 'Passerelle activée' : 'Passerelle désactivée');
      loadData();
    } catch (e: any) {
      showToast(e.message || 'Erreur', 'error');
    }
  };

  const handleDeleteGateway = async (configId: string) => {
    if (!confirm('Supprimer cette configuration ?')) return;
    try {
      await api.deleteGatewayConfig(configId);
      showToast('Configuration supprimée');
      loadData();
    } catch (e: any) {
      showToast(e.message || 'Erreur', 'error');
    }
  };

  const handleAddFee = async () => {
    if (!feeForm.name) { showToast('Nom requis', 'error'); return; }
    try {
      await api.createFeeCategory({
        name: feeForm.name,
        description: feeForm.description || undefined,
        amount: feeForm.amount ? Number(feeForm.amount) : undefined,
        isRequired: feeForm.isRequired,
      });
      showToast('Catégorie ajoutée');
      setFeeModal(false);
      setFeeForm({ name: '', description: '', amount: '', isRequired: true });
      loadData();
    } catch (e: any) {
      showToast(e.message || 'Erreur', 'error');
    }
  };

  const handleDeleteFee = async (id: string) => {
    if (!confirm('Supprimer cette catégorie ?')) return;
    try {
      await api.deleteFeeCategory(id);
      showToast('Catégorie supprimée');
      loadData();
    } catch (e: any) {
      showToast(e.message || 'Erreur', 'error');
    }
  };

  return (
    <div className="p-6">
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
        <CreditCard size={20} className="text-[#4F46E5]" />
        {lang === 'fr' ? 'Paramètres de paiement' : 'Payment Settings'}
      </h2>

      {/* Sub-tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 pb-2">
        {[
          { id: 'gateways' as const, label: 'Passerelles', icon: Globe },
          { id: 'fees' as const, label: 'Catégories de frais', icon: Banknote },
          { id: 'config' as const, label: 'Configuration', icon: Settings },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${subTab === tab.id ? 'bg-[#4F46E5] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12"><Loader2 size={32} className="animate-spin mx-auto text-slate-400" /></div>
      ) : (
        <>
          {/* GATEWAYS TAB */}
          {subTab === 'gateways' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500 mb-4">
                {lang === 'fr' ? 'Configurez les passerelles de paiement pour votre établissement. Chaque établissement utilise ses propres clés API.' : 'Configure payment gateways for your school. Each school uses its own API keys.'}
              </p>

              {supportedGateways.map(gw => {
                const existing = gatewayConfigs.find(c => c.gateway === gw.name);
                const isConfigured = !!existing;
                const isActive = existing?.isActive;

                return (
                  <div key={gw.name} className={`bg-white rounded-xl border-2 p-5 transition-all ${isConfigured && isActive ? 'border-emerald-200 bg-emerald-50/30' : isConfigured ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{gatewayIcons[gw.name] || '💳'}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[#111827]">{gw.label || gw.name}</h3>
                            {isConfigured && isActive && (
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-1">
                                <CheckCircle size={12} /> Configuré
                              </span>
                            )}
                            {isConfigured && !isActive && (
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                                Désactivé
                              </span>
                            )}
                            {!isConfigured && (
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">
                                Non configuré
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 mt-1">{gw.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(gw.supportedMethods || []).map(m => (
                              <span key={m} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded">
                                {m.replace('_', ' ')}
                              </span>
                            ))}
                          </div>
                          {existing?.lastTestedAt && (
                            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                              {existing.lastTestStatus === 'SUCCESS' ? <CheckCircle size={12} className="text-emerald-500" /> : <XCircle size={12} className="text-red-500" />}
                              Dernier test: {new Date(existing.lastTestedAt).toLocaleString('fr-FR')} — {existing.lastTestMessage}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isConfigured && (
                          <>
                            <button
                              onClick={() => handleTestConnection(existing!.id)}
                              disabled={testing === existing!.id}
                              className="px-3 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 flex items-center gap-1 disabled:opacity-50"
                            >
                              {testing === existing!.id ? <Loader2 size={14} className="animate-spin" /> : <Wifi size={14} />}
                              Tester
                            </button>
                            <button
                              onClick={() => handleToggleGateway(existing!.id, !isActive)}
                              className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1 ${isActive ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                            >
                              {isActive ? 'Désactiver' : 'Activer'}
                            </button>
                            <button
                              onClick={() => handleDeleteGateway(existing!.id)}
                              className="px-3 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleOpenConfig(gw)}
                          className="px-4 py-2 bg-[#4F46E5] text-white text-xs font-bold rounded-lg hover:bg-[#4338ca] flex items-center gap-1"
                        >
                          <Settings size={14} />
                          {isConfigured ? 'Modifier' : 'Configurer'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* FEE CATEGORIES TAB */}
          {subTab === 'fees' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-500">
                  {lang === 'fr' ? 'Créez les catégories de frais de votre établissement.' : 'Create fee categories for your school.'}
                </p>
                <button onClick={() => setFeeModal(true)} className="px-4 py-2 bg-[#4F46E5] text-white text-sm font-bold rounded-lg hover:bg-[#4338ca] flex items-center gap-2">
                  <Plus size={16} /> Ajouter
                </button>
              </div>

              {feeCategories.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl">
                  <Banknote size={48} className="mx-auto mb-3 text-slate-300" />
                  <p className="text-slate-500 font-medium">Aucune catégorie de frais</p>
                  <p className="text-sm text-slate-400 mt-1">Créez vos catégories (inscription, scolarité, transport...)</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {feeCategories.map(fee => (
                    <div key={fee.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100">
                      <div>
                        <p className="font-bold text-[#111827]">{fee.name}</p>
                        {fee.description && <p className="text-sm text-slate-500">{fee.description}</p>}
                        <div className="flex items-center gap-3 mt-1">
                          {fee.amount && <span className="text-sm font-semibold text-emerald-600">{fee.amount.toLocaleString()} FCFA</span>}
                          <span className={`text-xs px-2 py-0.5 rounded-full ${fee.isRequired ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                            {fee.isRequired ? 'Obligatoire' : 'Optionnel'}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${fee.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                            {fee.isActive ? 'Actif' : 'Inactif'}
                          </span>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteFee(fee.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CONFIG TAB */}
          {subTab === 'config' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <Shield size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-800">Sécurité des clés API</p>
                  <p className="text-xs text-blue-600 mt-1">Toutes les clés API sont chiffrées avec AES-256 avant stockage. Les clés complètes ne sont jamais visibles après enregistrement.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-100 p-6">
                <h3 className="font-bold text-[#111827] mb-4">Informations de configuration</h3>
                <div className="space-y-3 text-sm text-slate-600">
                  <p><strong>Webhook à configurer dans Money Fusion :</strong></p>
                  <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs space-y-1">
                    <p>Money Fusion: <span className="text-[#4F46E5]">{typeof window !== 'undefined' ? window.location.origin : ''}/api/billing/webhook/moneyfusion</span></p>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Configurez cette URL dans votre tableau de bord Money Fusion pour recevoir les notifications de paiement automatiques.</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* GATEWAY CONFIG MODAL */}
      {configModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setConfigModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{gatewayIcons[configModal.name] || '💳'}</span>
                <div>
                  <h3 className="text-xl font-bold">Configurer {configModal.label || configModal.name}</h3>
                  <p className="text-sm text-slate-500">{configModal.description || ''}</p>
                </div>
              </div>
              <button onClick={() => setConfigModal(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>

            {(configModal.configFields || []).length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="mx-auto mb-3 text-emerald-500" />
                <p className="font-medium">Aucune configuration requise</p>
                <p className="text-sm text-slate-500 mt-1">Ce mode de paiement ne nécessite pas de clés API.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {(configModal.configFields || []).map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type={field.type === 'password' && !showKeys[field.key] ? 'password' : 'text'}
                        value={configForm[field.key] || ''}
                        onChange={e => setConfigForm({ ...configForm, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-[#4F46E5] outline-none text-sm pr-10"
                        placeholder={field.label}
                      />
                      {field.type === 'password' && (
                        <button
                          type="button"
                          onClick={() => setShowKeys({ ...showKeys, [field.key]: !showKeys[field.key] })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showKeys[field.key] ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={() => setConfigModal(null)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">
                Annuler
              </button>
              <button
                onClick={handleSaveConfig}
                disabled={saving}
                className="flex-1 py-3 bg-[#4F46E5] text-white font-semibold rounded-xl hover:bg-[#4338ca] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FEE CATEGORY MODAL */}
      {feeModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setFeeModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Nouvelle catégorie de frais</h3>
              <button onClick={() => setFeeModal(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nom *</label>
                <input value={feeForm.name} onChange={e => setFeeForm({ ...feeForm, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-[#4F46E5] outline-none text-sm" placeholder="Ex: Frais de cantine" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
                <input value={feeForm.description} onChange={e => setFeeForm({ ...feeForm, description: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-[#4F46E5] outline-none text-sm" placeholder="Description optionnelle" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Montant par défaut (FCFA)</label>
                <input type="number" value={feeForm.amount} onChange={e => setFeeForm({ ...feeForm, amount: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-[#4F46E5] outline-none text-sm" placeholder="Optionnel" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={feeForm.isRequired} onChange={e => setFeeForm({ ...feeForm, isRequired: e.target.checked })} className="rounded" />
                <span className="text-sm text-slate-600">Frais obligatoire</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setFeeModal(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleAddFee} className="flex-1 py-3 bg-[#4F46E5] text-white font-semibold rounded-xl hover:bg-[#4338ca] flex items-center justify-center gap-2">
                <Plus size={16} /> Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
