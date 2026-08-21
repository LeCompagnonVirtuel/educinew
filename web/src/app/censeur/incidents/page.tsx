'use client';

import React, { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { getSupabase } from '@/lib/api/shared';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Search,
  Filter,
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
  class: string;
  type: string;
  description: string;
  status: string;
}

const tabs: IncidentType[] = ['Tous', 'Retards', 'Absences', 'Comportement', 'Exclusions'];

const statusColors: Record<string, string> = {
  'En cours': 'bg-orange-100 text-orange-800',
  Résolu: 'bg-green-100 text-green-800',
  'En attente': 'bg-red-100 text-red-800',
};

const typeColors: Record<string, string> = {
  Retard: 'bg-blue-100 text-blue-800',
  Absence: 'bg-purple-100 text-purple-800',
  Comportement: 'bg-yellow-100 text-yellow-800',
  Exclusion: 'bg-red-100 text-red-800',
};

export default function IncidentsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<IncidentType>('Tous');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabase();
        const { data, error: dbError } = await supabase
          .from('behavior_reports')
          .select('*, student:students(*, user:users!students_user_id_fkey(*), class:classes(*))')
          .order('created_at', { ascending: false })
          .limit(100);
        if (dbError) throw dbError;
        const mapped: Incident[] = (data || []).map((inc: any) => ({
          id: inc.id,
          date: inc.created_at ? new Date(inc.created_at).toLocaleDateString('fr-FR') : '-',
          student: inc.student?.user?.name || inc.student_name || 'Inconnu',
          class: inc.student?.class?.name || inc.class_name || '-',
          type: inc.type || 'Comportement',
          description: inc.description || '',
          status: inc.status || 'En attente',
        }));
        setIncidents(mapped);
      } catch (e: any) {
        setError(e.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = incidents.filter((inc) => {
    const matchesTab = activeTab === 'Tous' || inc.type === activeTab.slice(0, -1);
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
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColors[inc.type]}`}
                      >
                        {inc.type}
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
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[inc.status]}`}
                      >
                        {inc.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        className="p-1.5 rounded-md transition-colors hover:bg-gray-100"
                        style={{ color: '#4f46e5' }}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12" style={{ color: '#464555' }}>
              Aucun incident trouvé
            </div>
          )}
        </div>

        {/* Add Incident Modal Placeholder */}
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
                  <input
                    type="text"
                    placeholder="Nom de l'élève"
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{ borderColor: '#e5e7eb', color: '#191c1d' }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: '#464555' }}
                    >
                      Classe
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 3ème A"
                      className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                      style={{ borderColor: '#e5e7eb', color: '#191c1d' }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: '#464555' }}
                    >
                      Type
                    </label>
                    <select
                      className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                      style={{ borderColor: '#e5e7eb', color: '#191c1d' }}
                    >
                      <option>Retard</option>
                      <option>Absence</option>
                      <option>Comportement</option>
                      <option>Exclusion</option>
                    </select>
                  </div>
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium"
                  style={{ backgroundColor: '#3525cd' }}
                >
                  <Check className="w-4 h-4" />
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
