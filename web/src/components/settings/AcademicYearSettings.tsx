'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import {
  Calendar, Plus, Trash2, CheckCircle, AlertTriangle, Loader2,
  Archive, RotateCcw, ChevronRight, Clock, X,
} from 'lucide-react';

interface AcademicYear {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  status: string;
}

export default function AcademicYearSettings() {
  const { user } = useAuth();
  const { school, updateSchool } = useSchool();
  const [years, setYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', start_date: '', end_date: '' });
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => { loadYears(); }, [user?.schoolId]);

  const loadYears = async () => {
    if (!user?.schoolId) return;
    try {
      const supabase = getSupabase();
      const { data } = await supabase
        .from('academic_years')
        .select('*')
        .eq('school_id', user.schoolId)
        .order('start_date', { ascending: false });
      setYears(data || []);
    } catch {
      setYears([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = async () => {
    if (!form.name || !form.start_date || !form.end_date) {
      showToast('error', 'Veuillez remplir tous les champs');
      return;
    }
    if (!user?.schoolId) return;
    setSaving(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('academic_years').insert({
        school_id: user.schoolId,
        name: form.name,
        start_date: form.start_date,
        end_date: form.end_date,
        is_active: years.length === 0,
        status: years.length === 0 ? 'ACTIVE' : 'PREPARATION',
      });
      if (error) throw error;
      showToast('success', 'Année scolaire créée');
      setForm({ name: '', start_date: '', end_date: '' });
      setShowForm(false);
      loadYears();
    } catch (e: any) {
      showToast('error', e.message || 'Erreur de création');
    }
    setSaving(false);
  };

  const handleSetActive = async (id: string) => {
    if (!user?.schoolId) return;
    setSaving(true);
    try {
      const supabase = getSupabase();
      await supabase.from('academic_years').update({ is_active: false, status: 'CLOSED' })
        .eq('school_id', user.schoolId).eq('is_active', true);
      const { error } = await supabase.from('academic_years').update({ is_active: true, status: 'ACTIVE' })
        .eq('id', id);
      if (error) throw error;
      const year = years.find(y => y.id === id);
      if (year) await updateSchool({ academic_year: year.name });
      showToast('success', 'Année active définie');
      loadYears();
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const handleArchive = async (id: string) => {
    setSaving(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('academic_years').update({ status: 'ARCHIVED' })
        .eq('id', id);
      if (error) throw error;
      showToast('success', 'Année archivée');
      loadYears();
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette année scolaire ?')) return;
    setSaving(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('academic_years').delete().eq('id', id);
      if (error) throw error;
      showToast('success', 'Année supprimée');
      loadYears();
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const statusStyles: Record<string, string> = {
    ACTIVE: 'bg-emerald-100 text-emerald-700',
    PREPARATION: 'bg-amber-100 text-amber-700',
    ARCHIVED: 'bg-slate-100 text-slate-500',
    CLOSED: 'bg-red-100 text-red-600',
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Années scolaires</h3>
          <p className="text-sm text-slate-500 mt-1">Gérez les années scolaires et définissez l'année active</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-primary,#4F46E5)] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
        >
          <Plus size={16} /> Nouvelle année
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h4 className="font-semibold text-slate-900">Créer une année scolaire</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Nom</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] focus:ring-2 focus:ring-[var(--color-primary,#4F46E5)]/20 outline-none text-sm"
                placeholder="2026-2027"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Date de début</label>
              <input
                type="date"
                value={form.start_date}
                onChange={e => setForm({ ...form, start_date: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] focus:ring-2 focus:ring-[var(--color-primary,#4F46E5)]/20 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Date de fin</label>
              <input
                type="date"
                value={form.end_date}
                onChange={e => setForm({ ...form, end_date: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] focus:ring-2 focus:ring-[var(--color-primary,#4F46E5)]/20 outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary,#4F46E5)] text-white rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
              Créer
            </button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2.5 text-slate-600 text-sm font-medium hover:bg-slate-50 rounded-xl">
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Years List */}
      {loading ? (
        <div className="text-center py-8"><Loader2 size={24} className="animate-spin mx-auto text-slate-400" /></div>
      ) : years.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center">
          <Calendar size={48} className="mx-auto mb-3 text-slate-300" />
          <p className="text-slate-500 font-medium">Aucune année scolaire configurée</p>
          <p className="text-sm text-slate-400 mt-1">Créez votre première année scolaire pour commencer</p>
        </div>
      ) : (
        <div className="space-y-3">
          {years.map(year => (
            <div key={year.id} className={`bg-white rounded-xl border shadow-sm p-5 flex items-center justify-between ${year.is_active ? 'border-[var(--color-primary,#4F46E5)]/30 ring-1 ring-[var(--color-primary,#4F46E5)]/10' : 'border-slate-100'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${year.is_active ? 'bg-[var(--color-primary,#4F46E5)]/10' : 'bg-slate-100'}`}>
                  <Calendar size={18} className={year.is_active ? 'text-[var(--color-primary,#4F46E5)]' : 'text-slate-400'} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{year.name}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(year.start_date).toLocaleDateString('fr-FR')} — {new Date(year.end_date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full ${statusStyles[year.status] || 'bg-slate-100 text-slate-500'}`}>
                  {year.status === 'ACTIVE' ? 'Active' : year.status === 'PREPARATION' ? 'Préparation' : year.status === 'ARCHIVED' ? 'Archivée' : 'Clôturée'}
                </span>
                {!year.is_active && (
                  <button
                    onClick={() => handleSetActive(year.id)}
                    disabled={saving}
                    className="text-xs font-medium text-[var(--color-primary,#4F46E5)] hover:underline"
                  >
                    Activer
                  </button>
                )}
                {year.status !== 'ARCHIVED' && !year.is_active && (
                  <button onClick={() => handleArchive(year.id)} disabled={saving} className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors" title="Archiver">
                    <Archive size={14} />
                  </button>
                )}
                {!year.is_active && (
                  <button onClick={() => handleDelete(year.id)} disabled={saving} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Supprimer">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
