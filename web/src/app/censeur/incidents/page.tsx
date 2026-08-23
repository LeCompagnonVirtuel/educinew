'use client';

import React, { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';
import {
  CheckCircle,
  FileText,
  Search,
  Eye,
  Plus,
  Check,
  X,
  Loader2,
} from 'lucide-react';

type IncidentType = 'Tous' | 'Retards' | 'Absences' | 'Comportement' | 'Exclusions';

interface Incident {
  id: string;
  date: string;
  student: string;
  student_id: string;
  class: string;
  type: string;
  description: string;
  status: string;
}

const tabs: IncidentType[] = ['Tous', 'Retards', 'Absences', 'Comportement', 'Exclusions'];

const statusColors: Record<string, string> = {
  OPEN: 'bg-orange-100 text-orange-800',
  RESOLVED: 'bg-green-100 text-green-800',
  PENDING: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  OPEN: 'En cours',
  RESOLVED: 'Résolu',
  PENDING: 'En attente',
};

const typeMap: Record<string, string> = {
  RETARD: 'Retards',
  ABSENCE: 'Absences',
  COMPORTEMENT: 'Comportement',
  EXCLUSION: 'Exclusions',
  AUTRE: 'Comportement',
};

const typeDisplayColors: Record<string, string> = {
  RETARD: 'bg-blue-100 text-blue-800',
  ABSENCE: 'bg-purple-100 text-purple-800',
  COMPORTEMENT: 'bg-yellow-100 text-yellow-800',
  EXCLUSION: 'bg-red-100 text-red-800',
  AUTRE: 'bg-slate-100 text-slate-800',
};

interface StudentOption {
  id: string;
  first_name: string;
  last_name: string;
  class_name: string;
}

export default function IncidentsPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<IncidentType>('Tous');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ student_id: '', type: 'RETARD', description: '' });

  useEffect(() => {
    if (!user?.schoolId) return;
    loadData();
  }, [user?.schoolId]);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const supabase = getSupabase();
      const [incRes, studRes] = await Promise.all([
        supabase
          .from('behavior_reports')
          .select('*, student:students(id, first_name, last_name, class:classes(name))')
          .eq('school_id', user!.schoolId)
          .order('created_at', { ascending: false })
          .limit(100),
        supabase
          .from('students')
          .select('id, first_name, last_name, class:classes(name)')
          .eq('school_id', user!.schoolId),
      ]);
      if (incRes.error) throw incRes.error;
      const mapped: Incident[] = (incRes.data || []).map((inc: any) => ({
        id: inc.id,
        date: inc.created_at ? new Date(inc.created_at).toLocaleDateString('fr-FR') : '-',
        student_id: inc.student_id,
        student: `${inc.student?.last_name || ''} ${inc.student?.first_name || ''}`.trim() || 'Inconnu',
        class: (inc.student?.class as any)?.name || '',
        type: inc.type || 'COMPORTEMENT',
        description: inc.description || '',
        status: inc.status || 'PENDING',
      }));
      setIncidents(mapped);
      const mappedStudents: StudentOption[] = (studRes.data || []).map((s: any) => ({
        id: s.id,
        first_name: s.first_name || '',
        last_name: s.last_name || '',
        class_name: (s.class as any)?.name || '',
      }));
      setStudents(mappedStudents);
    } catch (e: any) {
      setError(e.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateIncident() {
    if (!form.student_id || !form.type) return;
    setSaving(true);
    try {
      const supabase = getSupabase();
      const { error: insertError } = await supabase.from('behavior_reports').insert({
        school_id: user!.schoolId,
        student_id: form.student_id,
        type: form.type,
        description: form.description || null,
        status: 'OPEN',
        date: new Date().toISOString().split('T')[0],
      });
      if (insertError) throw insertError;
      setShowModal(false);
      setForm({ student_id: '', type: 'RETARD', description: '' });
      loadData();
    } catch (e: any) {
      setError(e.message || "Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  }

  async function handleResolve(id: string) {
    const supabase = getSupabase();
    await supabase.from('behavior_reports').update({ status: 'RESOLVED' }).eq('id', id);
    loadData();
  }

  const filtered = incidents.filter((inc) => {
    const tabFilter = activeTab === 'Tous' ? null : activeTab;
    const matchesTab = !tabFilter || typeMap[inc.type] === tabFilter;
    const matchesSearch = inc.student.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <RoleLayout role="censeur">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#191c1d' }}>
              Gestion des incidents
            </h1>
            <p className="text-sm mt-1" style={{ color: '#464555' }}>
              Suivi et gestion des incidents disciplinaires
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors hover:bg-gray-50"
              style={{ borderColor: '#e5e7eb', color: '#191c1d' }}
            >
              <FileText className="w-4 h-4" />
              Exporter rapport
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors"
              style={{ backgroundColor: '#3525cd' }}
            >
              <Plus className="w-4 h-4" />
              Nouvel incident
            </button>
          </div>
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-white shadow-sm'
                    : 'hover:bg-white'
                }`}
                style={{
                  backgroundColor: activeTab === tab ? '#4f46e5' : 'transparent',
                  color: activeTab === tab ? 'white' : '#464555',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: '#464555' }}
            />
            <input
              type="text"
              placeholder="Rechercher un élève..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm outline-none focus:ring-2"
              style={{ borderColor: '#e5e7eb', color: '#191c1d' }}
            />
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-xl shadow-sm border overflow-hidden"
          style={{ backgroundColor: '#f8f9fa', borderColor: '#e5e7eb' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b" style={{ color: '#464555' }}>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Élève</th>
                  <th className="px-5 py-4 font-medium">Classe</th>
                  <th className="px-5 py-4 font-medium">Type</th>
                  <th className="px-5 py-4 font-medium">Description</th>
                  <th className="px-5 py-4 font-medium">Statut</th>
                  <th className="px-5 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="text-center py-12"><Loader2 size={24} className="animate-spin mx-auto text-slate-400" /></td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-slate-400">Aucun incident trouvé</td></tr>
                ) : (
                filtered.map((inc, i) => (
                  <tr
                    key={i}
                    className="border-b transition-colors hover:bg-white"
                    style={{ borderColor: '#e5e7eb' }}
                  >
                    <td className="px-5 py-3" style={{ color: '#191c1d' }}>
                      {inc.date}
                    </td>
                    <td className="px-5 py-3 font-medium" style={{ color: '#191c1d' }}>
                      {inc.student}
                    </td>
                    <td className="px-5 py-3" style={{ color: '#464555' }}>
                      {inc.class}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeDisplayColors[inc.type] || 'bg-slate-100 text-slate-800'}`}
                      >
                        {typeMap[inc.type] || inc.type}
                      </span>
                    </td>
                    <td
                      className="px-5 py-3 max-w-xs truncate"
                      style={{ color: '#464555' }}
                    >
                      {inc.description}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[inc.status] || 'bg-slate-100 text-slate-800'}`}
                      >
                        {statusLabels[inc.status] || inc.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          className="p-1.5 rounded-md transition-colors hover:bg-gray-100"
                          style={{ color: '#4f46e5' }}
                          title="Voir les détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {inc.status !== 'RESOLVED' && (
                          <button
                            onClick={() => handleResolve(inc.id)}
                            className="p-1.5 rounded-md transition-colors hover:bg-green-50"
                            style={{ color: '#16a34a' }}
                            title="Marquer comme résolu"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Incident Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
              className="w-full max-w-lg rounded-xl shadow-xl p-6 mx-4"
              style={{ backgroundColor: '#f8f9fa' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold" style={{ color: '#191c1d' }}>
                  Nouvel incident
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-md hover:bg-gray-100"
                  style={{ color: '#464555' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: '#464555' }}
                  >
                    Élève
                  </label>
                  <select
                    value={form.student_id}
                    onChange={(e) => setForm((prev) => ({ ...prev, student_id: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{ borderColor: '#e5e7eb', color: '#191c1d' }}
                  >
                    <option value="">Sélectionner un élève</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.last_name} {s.first_name} ({s.class_name})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: '#464555' }}
                  >
                    Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{ borderColor: '#e5e7eb', color: '#191c1d' }}
                  >
                    <option value="RETARD">Retard</option>
                    <option value="ABSENCE">Absence</option>
                    <option value="COMPORTEMENT">Comportement</option>
                    <option value="EXCLUSION">Exclusion</option>
                    <option value="AUTRE">Autre</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: '#464555' }}
                  >
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Décrire l'incident..."
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none resize-none"
                    style={{ borderColor: '#e5e7eb', color: '#191c1d' }}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border text-sm font-medium"
                  style={{ borderColor: '#e5e7eb', color: '#464555' }}
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateIncident}
                  disabled={saving || !form.student_id}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-50"
                  style={{ backgroundColor: '#3525cd' }}
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Check className="w-4 h-4" />}
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleLayout>
  );
}
