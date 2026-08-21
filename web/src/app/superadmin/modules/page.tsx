'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/api/shared';
import {
  Puzzle, ToggleLeft, ToggleRight, AlertTriangle, CheckCircle,
  Wrench, Search,
} from 'lucide-react';

interface PlatformModule {
  id: string;
  name: string;
  key: string;
  description: string;
  is_active: boolean;
  is_maintenance: boolean;
  version: string | null;
  updated_at: string;
}

const DEFAULT_MODULES: Omit<PlatformModule, 'id' | 'updated_at'>[] = [
  { name: 'Gestion des élèves', key: 'students', description: 'Inscription, fiches, transferts', is_active: true, is_maintenance: false, version: '1.0' },
  { name: 'Notes & Bulletins', key: 'grades', description: 'Saisie, calculs, bulletins PDF', is_active: true, is_maintenance: false, version: '1.0' },
  { name: 'Emplois du temps', key: 'schedule', description: 'Planning, salles, créneaux', is_active: true, is_maintenance: false, version: '1.0' },
  { name: 'Paiements & Comptabilité', key: 'payments', description: 'Frais, reçus, suivi comptable', is_active: true, is_maintenance: false, version: '1.0' },
  { name: 'Messagerie', key: 'messaging', description: 'Chat, annonces, notifications', is_active: true, is_maintenance: false, version: '1.0' },
  { name: 'QR Code & Présences', key: 'attendance', description: 'Scan QR, suivi absences', is_active: true, is_maintenance: false, version: '1.0' },
  { name: 'Documents', key: 'documents', description: 'Partage fichiers, stockage', is_active: true, is_maintenance: false, version: '1.0' },
  { name: 'Intelligence Artificielle', key: 'ai', description: 'Assistant IA, suggestions', is_active: true, is_maintenance: false, version: '0.9' },
  { name: 'Transport', key: 'transport', description: 'Trajets, conducteurs, suivi GPS', is_active: false, is_maintenance: false, version: '0.5' },
  { name: 'Cantine', key: 'canteen', description: 'Menus, commandes, allergies', is_active: false, is_maintenance: false, version: null },
];

export default function SuperAdminModulesPage() {
  const [modules, setModules] = useState<PlatformModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => { loadModules(); }, []);

  async function loadModules() {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('platform_modules').select('*').order('name');

    if (error || !data || data.length === 0) {
      setModules(DEFAULT_MODULES.map((m, i) => ({ ...m, id: `default-${i}`, updated_at: new Date().toISOString() })));
    } else {
      setModules(data);
    }
    setLoading(false);
  }

  async function toggleActive(mod: PlatformModule) {
    setSaving(mod.id);
    const supabase = getSupabase();
    if (!mod.id.startsWith('default-')) {
      await supabase.from('platform_modules').update({ is_active: !mod.is_active }).eq('id', mod.id);
    }
    setModules(prev => prev.map(m => m.id === mod.id ? { ...m, is_active: !m.is_active } : m));
    setSaving(null);
  }

  async function toggleMaintenance(mod: PlatformModule) {
    setSaving(mod.id);
    const supabase = getSupabase();
    if (!mod.id.startsWith('default-')) {
      await supabase.from('platform_modules').update({ is_maintenance: !mod.is_maintenance }).eq('id', mod.id);
    }
    setModules(prev => prev.map(m => m.id === mod.id ? { ...m, is_maintenance: !m.is_maintenance } : m));
    setSaving(null);
  }

  const filtered = modules.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.key.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-2 border-[#4F46E5] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Modules de la Plateforme</h1>
        <p className="text-sm text-gray-500 mt-1">Activer, désactiver ou mettre en maintenance les modules globalement</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <p className="text-2xl font-bold text-green-600">{modules.filter(m => m.is_active && !m.is_maintenance).length}</p>
          <p className="text-xs text-gray-500">Actifs</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <p className="text-2xl font-bold text-amber-600">{modules.filter(m => m.is_maintenance).length}</p>
          <p className="text-xs text-gray-500">En maintenance</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-400">{modules.filter(m => !m.is_active).length}</p>
          <p className="text-xs text-gray-500">Désactivés</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text" placeholder="Rechercher un module..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
        />
      </div>

      {/* Modules list */}
      <div className="space-y-3">
        {filtered.map((mod) => (
          <div key={mod.id} className={`bg-white rounded-xl border ${mod.is_maintenance ? 'border-amber-200' : mod.is_active ? 'border-gray-100' : 'border-gray-200 opacity-60'} p-5 shadow-sm`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${mod.is_maintenance ? 'bg-amber-50' : mod.is_active ? 'bg-indigo-50' : 'bg-gray-50'}`}>
                {mod.is_maintenance ? <Wrench size={18} className="text-amber-600" /> : <Puzzle size={18} className={mod.is_active ? 'text-[#4F46E5]' : 'text-gray-400'} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{mod.name}</h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">{mod.key}</span>
                  {mod.version && <span className="text-[10px] text-gray-400">v{mod.version}</span>}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{mod.description}</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Maintenance toggle */}
                <button
                  onClick={() => toggleMaintenance(mod)}
                  disabled={saving === mod.id}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs hover:bg-gray-50"
                  title="Mode maintenance"
                >
                  <Wrench size={12} className={mod.is_maintenance ? 'text-amber-500' : 'text-gray-400'} />
                  {mod.is_maintenance ? 'Maintenance' : 'Normal'}
                </button>

                {/* Active toggle */}
                <button
                  onClick={() => toggleActive(mod)}
                  disabled={saving === mod.id}
                  className="flex items-center gap-1.5"
                  title={mod.is_active ? 'Désactiver' : 'Activer'}
                >
                  {mod.is_active ? (
                    <ToggleRight size={28} className="text-[#4F46E5]" />
                  ) : (
                    <ToggleLeft size={28} className="text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
