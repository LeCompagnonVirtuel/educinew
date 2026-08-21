'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/api/shared';
import {
  CreditCard, Plus, Edit, Trash2, CheckCircle, X, Save,
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  max_students: number;
  max_teachers: number;
  max_storage_gb: number;
  features: string[];
  is_active: boolean;
  created_at: string;
}

const EMPTY_PLAN: Omit<Plan, 'id' | 'created_at'> = {
  name: '', price: 0, currency: 'XOF', max_students: 100, max_teachers: 10,
  max_storage_gb: 5, features: [], is_active: true,
};

export default function SuperAdminSubscriptionsPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<typeof EMPTY_PLAN>(EMPTY_PLAN);
  const [featuresInput, setFeaturesInput] = useState('');

  useEffect(() => { loadPlans(); }, []);

  async function loadPlans() {
    const supabase = getSupabase();
    const { data } = await supabase.from('subscription_plans').select('*').order('price', { ascending: true });
    setPlans(data || []);
    setLoading(false);
  }

  function startEdit(plan: Plan) {
    setEditing(plan.id);
    setForm({ name: plan.name, price: plan.price, currency: plan.currency, max_students: plan.max_students, max_teachers: plan.max_teachers, max_storage_gb: plan.max_storage_gb, features: plan.features || [], is_active: plan.is_active });
    setFeaturesInput((plan.features || []).join(', '));
    setCreating(false);
  }

  function startCreate() {
    setCreating(true);
    setEditing(null);
    setForm(EMPTY_PLAN);
    setFeaturesInput('');
  }

  async function savePlan() {
    const supabase = getSupabase();
    const payload = { ...form, features: featuresInput.split(',').map(f => f.trim()).filter(Boolean) };

    if (creating) {
      await supabase.from('subscription_plans').insert(payload);
    } else if (editing) {
      await supabase.from('subscription_plans').update(payload).eq('id', editing);
    }
    setEditing(null);
    setCreating(false);
    loadPlans();
  }

  async function deletePlan(id: string) {
    if (!confirm('Supprimer ce plan ?')) return;
    const supabase = getSupabase();
    await supabase.from('subscription_plans').delete().eq('id', id);
    loadPlans();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-2 border-[#4F46E5] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plans d&apos;Abonnement</h1>
          <p className="text-sm text-gray-500 mt-1">Gérer les offres et quotas de la plateforme</p>
        </div>
        <button onClick={startCreate} className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-medium hover:bg-[#4338CA]">
          <Plus size={14} /> Nouveau plan
        </button>
      </div>

      {/* Editor */}
      {(creating || editing) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{creating ? 'Créer un plan' : 'Modifier le plan'}</h3>
            <button onClick={() => { setCreating(false); setEditing(null); }}><X size={18} className="text-gray-400" /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Nom</label>
              <input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Prix</label>
              <input type="number" value={form.price} onChange={(e) => setForm(f => ({ ...f, price: +e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Devise</label>
              <select value={form.currency} onChange={(e) => setForm(f => ({ ...f, currency: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                <option value="XOF">XOF</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Max élèves</label>
              <input type="number" value={form.max_students} onChange={(e) => setForm(f => ({ ...f, max_students: +e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Max enseignants</label>
              <input type="number" value={form.max_teachers} onChange={(e) => setForm(f => ({ ...f, max_teachers: +e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Stockage (Go)</label>
              <input type="number" value={form.max_storage_gb} onChange={(e) => setForm(f => ({ ...f, max_storage_gb: +e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Fonctionnalités (séparées par des virgules)</label>
            <input value={featuresInput} onChange={(e) => setFeaturesInput(e.target.value)} placeholder="SMS, Email, QR Code, Bulletins, IA..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm(f => ({ ...f, is_active: e.target.checked }))} className="rounded border-gray-300" />
              Plan actif
            </label>
          </div>
          <button onClick={savePlan} className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-medium hover:bg-[#4338CA]">
            <Save size={14} /> Enregistrer
          </button>
        </div>
      )}

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div key={plan.id} className={`bg-white rounded-xl border ${plan.is_active ? 'border-gray-100' : 'border-red-100 opacity-60'} p-5 shadow-sm`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900">{plan.name}</h3>
                <p className="text-2xl font-bold text-[#4F46E5] mt-1">
                  {plan.price.toLocaleString()} <span className="text-sm font-normal text-gray-400">{plan.currency}/mois</span>
                </p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => startEdit(plan)} className="p-1.5 rounded-lg hover:bg-gray-100"><Edit size={14} className="text-gray-400" /></button>
                <button onClick={() => deletePlan(plan.id)} className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 size={14} className="text-red-400" /></button>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Élèves: <strong>{plan.max_students}</strong></p>
              <p>Enseignants: <strong>{plan.max_teachers}</strong></p>
              <p>Stockage: <strong>{plan.max_storage_gb} Go</strong></p>
            </div>
            {plan.features && plan.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
                {plan.features.map((f, i) => (
                  <span key={i} className="px-2 py-0.5 bg-indigo-50 text-[#4F46E5] rounded text-xs">{f}</span>
                ))}
              </div>
            )}
            {!plan.is_active && (
              <p className="text-xs text-red-500 mt-3 flex items-center gap-1"><CheckCircle size={12} /> Désactivé</p>
            )}
          </div>
        ))}
      </div>

      {plans.length === 0 && !creating && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <CreditCard size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Aucun plan configuré</p>
          <button onClick={startCreate} className="mt-4 px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-medium">Créer le premier plan</button>
        </div>
      )}
    </div>
  );
}
