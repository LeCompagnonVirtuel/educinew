'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import {
  Users, Search, Plus, Trash2, Edit, Save, Loader2, CheckCircle, AlertTriangle,
  UserPlus, Shield, Mail, Phone, Filter, ChevronDown,
} from 'lucide-react';

type UserRole = 'admin' | 'teacher' | 'student' | 'parent' | 'comptable' | 'secretaire' | 'censeur' | 'driver' | 'superadmin';

interface ManagedUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  last_sign_in: string | null;
}

const roleLabels: Record<UserRole, string> = {
  admin: 'Administrateur',
  superadmin: 'Super Admin',
  teacher: 'Enseignant',
  student: 'Élève',
  parent: 'Parent',
  comptable: 'Comptable',
  secretaire: 'Secrétaire',
  censeur: 'Censeur',
  driver: 'Chauffeur',
};

const roleColors: Record<UserRole, string> = {
  admin: 'bg-purple-100 text-purple-700',
  superadmin: 'bg-red-100 text-red-700',
  teacher: 'bg-blue-100 text-blue-700',
  student: 'bg-emerald-100 text-emerald-700',
  parent: 'bg-amber-100 text-amber-700',
  comptable: 'bg-cyan-100 text-cyan-700',
  secretaire: 'bg-pink-100 text-pink-700',
  censeur: 'bg-indigo-100 text-indigo-700',
  driver: 'bg-orange-100 text-orange-700',
};

export default function UserManagementSettings() {
  const { user } = useAuth();
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showCreate, setShowCreate] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', name: '', role: 'student' as UserRole, password: '' });

  useEffect(() => {
    loadUsers();
  }, [user?.schoolId]);

  const loadUsers = async () => {
    if (!user?.schoolId) return;
    try {
      const supabase = getSupabase();
      const { data } = await supabase
        .from('users')
        .select('id, email, name, role, is_active, created_at, last_sign_in')
        .eq('school_id', user.schoolId)
        .order('created_at', { ascending: false });
      setUsers((data as ManagedUser[]) || []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleActive = async (userId: string, current: boolean) => {
    const supabase = getSupabase();
    const { error } = await supabase.from('users').update({ is_active: !current }).eq('id', userId).eq('school_id', user!.schoolId!);
    if (error) {
      showToast('error', error.message || 'Erreur de mise à jour');
    } else {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_active: !current } : u));
      showToast('success', !current ? 'Utilisateur activé' : 'Utilisateur désactivé');
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    const supabase = getSupabase();
    const { error } = await supabase.from('users').delete().eq('id', userId).eq('school_id', user!.schoolId!);
    if (error) {
      showToast('error', error.message || 'Erreur de suppression');
    } else {
      setUsers(prev => prev.filter(u => u.id !== userId));
      showToast('success', 'Utilisateur supprimé');
    }
  };

  const createUser = async () => {
    if (!newUser.email || !user?.schoolId) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newUser.email,
          name: newUser.name,
          role: newUser.role.toUpperCase() === 'DRIVER' ? 'CHAUFFEUR' : newUser.role.toUpperCase(),
          password: newUser.password || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Erreur de création');
      }
      setShowCreate(false);
      setNewUser({ email: '', name: '', role: 'student', password: '' });
      loadUsers();
      showToast('success', 'Utilisateur créé');
    } catch (e: any) {
      showToast('error', e.message || 'Erreur de création');
    }
    setSaving(false);
  };

  const filteredUsers = users.filter(u => {
    const matchSearch = !search || u.email?.toLowerCase().includes(search.toLowerCase()) || u.name?.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'all' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const roleCounts = users.reduce((acc, u) => { acc[u.role] = (acc[u.role] || 0) + 1; return acc; }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        {Object.entries(roleCounts).map(([role, count]) => (
          <div key={role} className="bg-white rounded-xl border border-slate-100 p-3 text-center">
            <p className="text-lg font-bold text-slate-900">{count as number}</p>
            <p className="text-[10px] text-slate-500">{roleLabels[role as UserRole] || role}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou email..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none" />
        </div>
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none">
          <option value="all">Tous les rôles</option>
          {Object.entries(roleLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <button onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-primary,#4F46E5)] text-white rounded-xl text-sm font-semibold hover:opacity-90">
          <UserPlus size={14} />
          Ajouter
        </button>
      </div>

      {/* Create User Form */}
      {showCreate && (
        <div className="bg-white rounded-2xl border border-[var(--color-primary,#4F46E5)] shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-slate-900">Nouvel utilisateur</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="email" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))}
              placeholder="Email" className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none" />
            <input type="text" value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))}
              placeholder="Nom complet" className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none" />
            <select value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value as UserRole }))}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none">
              {Object.entries(roleLabels).filter(([k]) => k !== 'superadmin').map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <input type="password" value={newUser.password} onChange={e => setNewUser(p => ({ ...p, password: e.target.value }))}
              placeholder="Mot de passe (optionnel)" className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none" />
          </div>
          <div className="flex gap-2">
            <button onClick={createUser} disabled={saving || !newUser.email}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary,#4F46E5)] text-white rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
              Créer
            </button>
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200">Annuler</button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center"><Loader2 size={20} className="animate-spin mx-auto text-slate-400" /></div>
        ) : filteredUsers.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">Aucun utilisateur trouvé</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Utilisateur</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Rôle</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Statut</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Inscrit</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-slate-900">{u.name || '—'}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${roleColors[u.role] || 'bg-slate-100 text-slate-500'}`}>
                        {roleLabels[u.role] || u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <button onClick={() => toggleActive(u.id, u.is_active)}
                        className={`w-10 h-5 rounded-full transition-colors ${u.is_active ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${u.is_active ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-xs text-slate-500">{u.created_at ? new Date(u.created_at).toLocaleDateString('fr-FR') : '—'}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => deleteUser(u.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
