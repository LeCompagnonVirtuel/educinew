'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/api/shared';
import {
  Building2, Search, CheckCircle, XCircle, AlertTriangle,
  MoreVertical, ChevronLeft, ChevronRight, Power, Trash2,
} from 'lucide-react';

interface School {
  id: string;
  name: string;
  is_active: boolean;
  subscription_plan: string | null;
  created_at: string;
  city: string | null;
  country: string | null;
}

export default function SuperAdminSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const pageSize = 15;

  useEffect(() => { loadSchools(); }, [page, search, statusFilter]);

  async function loadSchools() {
    setLoading(true);
    const supabase = getSupabase();
    let query = supabase
      .from('schools')
      .select('id, name, is_active, subscription_plan, created_at, city, country', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (search) query = query.ilike('name', `%${search}%`);
    if (statusFilter === 'active') query = query.eq('is_active', true);
    if (statusFilter === 'suspended') query = query.eq('is_active', false);

    const { data, count } = await query;
    setSchools(data || []);
    setTotal(count || 0);
    setLoading(false);
  }

  async function toggleSchool(id: string, activate: boolean) {
    const supabase = getSupabase();
    await supabase.from('schools').update({ is_active: activate }).eq('id', id);
    setActionMenu(null);
    loadSchools();
  }

  async function deleteSchool(id: string) {
    if (!confirm('Supprimer définitivement cet établissement ? Cette action est irréversible.')) return;
    const supabase = getSupabase();
    await supabase.from('schools').delete().eq('id', id);
    setActionMenu(null);
    loadSchools();
  }

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Établissements</h1>
        <p className="text-sm text-gray-500 mt-1">Supervision uniquement — aucun accès aux données internes des établissements</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text" placeholder="Rechercher un établissement..."
            value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
          />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
          <option value="">Tous les statuts</option>
          <option value="active">Actifs</option>
          <option value="suspended">Suspendus</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin w-8 h-8 border-2 border-[#4F46E5] border-t-transparent rounded-full" />
          </div>
        ) : schools.length === 0 ? (
          <div className="text-center py-16">
            <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Aucun établissement trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Établissement</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Localisation</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Plan</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Statut</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Inscription</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {schools.map((school) => (
                  <tr key={school.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                          <Building2 size={16} className="text-[#4F46E5]" />
                        </div>
                        <span className="font-medium text-gray-900">{school.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{school.city || '—'}{school.country ? `, ${school.country}` : ''}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                        {school.subscription_plan || 'Gratuit'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {school.is_active ? (
                        <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle size={12} /> Actif</span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-red-600"><XCircle size={12} /> Suspendu</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(school.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 text-right relative">
                      <button onClick={() => setActionMenu(actionMenu === school.id ? null : school.id)} className="p-1.5 rounded-lg hover:bg-gray-100">
                        <MoreVertical size={16} className="text-gray-400" />
                      </button>
                      {actionMenu === school.id && (
                        <div className="absolute right-4 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 w-48">
                          <button onClick={() => toggleSchool(school.id, !school.is_active)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50">
                            <Power size={14} /> {school.is_active ? 'Suspendre' : 'Réactiver'}
                          </button>
                          <button onClick={() => deleteSchool(school.id)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50">
                            <Trash2 size={14} /> Supprimer
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">{total} établissements • Page {page}/{totalPages}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
