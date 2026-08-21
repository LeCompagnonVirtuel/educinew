'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import { Search, Users, GraduationCap, Shield, Plus, MoreVertical, Download, X, Mail, Eye, Edit, Trash2, UserCheck, UserX, Clock, Key, Send } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { sbAuth, sbInvitations } from '@/lib/api';
import { getSupabase } from '@/lib/api/shared';
import { exportToFile } from '@/lib/export-utils';
import { getInitials, cn } from '@/lib/utils';

interface UserActivity {
  id: string;
  action: string;
  timestamp: string;
  ip: string;
}

function formatRelativeTime(dateStr: string | null): string {
  if (!dateStr) return 'Jamais';
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "A l'instant";
  if (diffMin < 60) return `Il y a ${diffMin}min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Il y a ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 30) return `Il y a ${diffD}j`;
  const diffM = Math.floor(diffD / 30);
  return `Il y a ${diffM} mois`;
}

export default function UsersPage() {
  const { t: tr, lang } = useLanguage();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'teachers' | 'students'>('all');
  const [showDetail, setShowDetail] = useState<any>(null);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('STUDENT');
  const [showEditModal, setShowEditModal] = useState<any>(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editRole, setEditRole] = useState('');
  const [toast, setToast] = useState<{msg: string; type: 'success' | 'error' | 'info'} | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    async function load() {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('school_id', user?.schoolId);
        if (error) throw error;
        setUsers(data || []);
      } finally {
        setLoading(false);
      }
    }
    if (user?.schoolId) load();
  }, [user]);

  const allUsers = users.map(u => ({
    ...u,
    userType: u.role,
    name: u.name,
    email: u.email,
    status: u.is_active ? 'ACTIVE' : 'INACTIVE',
    lastLoginAt: u.last_login_at,
  }));

  const filtered = allUsers.filter(u => {
    if (search && !u.name?.toLowerCase().includes(search.toLowerCase()) && !u.email?.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter && u.userType !== roleFilter) return false;
    if (statusFilter && u.status !== statusFilter) return false;
    if (activeTab === 'teachers' && u.userType !== 'TEACHER') return false;
    if (activeTab === 'students' && u.userType !== 'STUDENT') return false;
    return true;
  });

  const roleColors: Record<string, string> = {
    TEACHER: 'bg-indigo-100 text-indigo-700',
    STUDENT: 'bg-blue-100 text-blue-700',
    PARENT: 'bg-emerald-100 text-emerald-700',
    ADMIN: 'bg-amber-100 text-amber-700',
    SUPER_ADMIN: 'bg-red-100 text-red-700',
    COMPTABLE: 'bg-cyan-100 text-cyan-700',
    CENSEUR: 'bg-purple-100 text-purple-700',
    SECRETAIRE: 'bg-pink-100 text-pink-700',
    SURVEILLANT: 'bg-orange-100 text-orange-700',
  };

  const roleLabels: Record<string, string> = {
    TEACHER: 'Enseignant',
    STUDENT: 'Eleve',
    PARENT: 'Parent',
    ADMIN: 'Administrateur',
    SUPER_ADMIN: 'Super Admin',
    COMPTABLE: 'Comptable',
    CENSEUR: 'Censeur',
    SECRETAIRE: 'Secretaire',
    SURVEILLANT: 'Surveillant',
  };

  const stats = {
    total: allUsers.length,
    teachers: allUsers.filter(u => u.userType === 'TEACHER').length,
    students: allUsers.filter(u => u.userType === 'STUDENT').length,
    admins: allUsers.filter(u => u.userType === 'ADMIN' || u.userType === 'SUPER_ADMIN').length,
  };

  const handleInvite = async () => {
    if (!inviteEmail) {
      showToast('Email obligatoire', 'error');
      return;
    }
    try {
      await sbInvitations.create({
        email: inviteEmail,
        role: inviteRole,
      });
      showToast(`Invitation envoyee a ${inviteEmail} (${inviteRole})`);
      setShowInvite(false);
      setInviteEmail('');
    } catch (err: any) {
      showToast(err.message || 'Erreur lors de l\'envoi', 'error');
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const newIsActive = currentStatus !== 'ACTIVE';
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('users')
        .update({ is_active: newIsActive })
        .eq('id', userId);
      if (error) throw error;
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_active: newIsActive } : u));
      showToast(`Statut change: ${newIsActive ? 'ACTIVE' : 'INACTIVE'}`);
    } catch (err: any) {
      showToast(err.message || 'Erreur lors de la mise a jour', 'error');
    }
  };

  const handleExport = () => {
    const columns = [
      { header: 'Nom', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Role', key: 'userType', width: 15 },
      { header: 'Statut', key: 'status', width: 10 },
      { header: 'Telephone', key: 'phone', width: 15 },
    ];
    const data = filtered.map(u => ({
      name: u.name || '',
      email: u.email || '',
      userType: roleLabels[u.userType] || u.userType,
      status: u.status === 'ACTIVE' ? 'Actif' : 'Inactif',
      phone: u.phone || '',
    }));
    exportToFile(data, columns, 'utilisateurs', 'excel', {
      title: 'Liste des utilisateurs',
    });
  };

  const handleEditUser = (u: any) => {
    setEditName(u.name || '');
    setEditPhone(u.phone || '');
    setEditRole(u.userType || '');
    setShowEditModal(u);
    setShowDetail(null);
  };

  const handleSaveEdit = async () => {
    if (!showEditModal) return;
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('users')
        .update({ name: editName, phone: editPhone || null, role: editRole })
        .eq('id', showEditModal.id);
      if (error) throw error;
      setUsers(prev => prev.map(u => u.id === showEditModal.id ? { ...u, name: editName, phone: editPhone || null, role: editRole } : u));
      showToast('Utilisateur modifie avec succes');
      setShowEditModal(null);
    } catch (err: any) {
      showToast(err.message || 'Erreur lors de la modification', 'error');
    }
  };

  const handleResetPassword = async (userEmail: string) => {
    try {
      await sbAuth.forgotPassword(userEmail);
      showToast(`Email de reinitialisation envoye a ${userEmail}`);
      setShowDetail(null);
    } catch (err: any) {
      showToast(err.message || 'Erreur lors de la reinitialisation', 'error');
    }
  };

  return (
    <RoleLayout role="admin">
      {toast && (
        <div className={cn('fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold', toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white')}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Utilisateurs</h1>
          <p className="text-slate-500 mt-1">Gestion des comptes et acc&#232;s</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-slate-50">
            <Download size={16} />
            Exporter
          </button>
          <button onClick={() => setShowInvite(true)} className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-indigo-700">
            <Mail size={16} />
            Inviter
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total utilisateurs', value: stats.total, icon: Users, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Enseignants', value: stats.teachers, icon: GraduationCap, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Eleves', value: stats.students, icon: Users, color: 'bg-blue-50 text-blue-600' },
          { label: 'Administrateurs', value: stats.admins, icon: Shield, color: 'bg-amber-50 text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', stat.color)}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-medium text-slate-500">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-4">
        {['all', 'teachers', 'students'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn('px-4 py-2 rounded-lg text-sm font-medium', activeTab === tab ? 'bg-indigo-100 text-indigo-600' : 'text-slate-500 hover:bg-slate-50')}
          >
            {tab === 'all' ? 'Tous' : tab === 'teachers' ? 'Enseignants' : 'Eleves'}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-2">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm"
            />
          </div>
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm"
        >
          <option value="">Tous les roles</option>
          <option value="TEACHER">Enseignant</option>
          <option value="STUDENT">Eleve</option>
          <option value="ADMIN">Administrateur</option>
          <option value="COMPTABLE">Comptable</option>
          <option value="CENSEUR">Censeur</option>
          <option value="SECRETAIRE">Secretaire</option>
          <option value="SURVEILLANT">Surveillant</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm"
        >
          <option value="">Tous les statuts</option>
          <option value="ACTIVE">Actif</option>
          <option value="INACTIVE">Inactif</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">Utilisateur</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">Statut</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={4} className="text-center py-12 text-slate-400">Chargement...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-12 text-slate-400">Aucun utilisateur</td></tr>
            ) : (
              filtered.slice(0, 20).map((u, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-700">
                        {getInitials(u.name || 'N/A')}
                      </div>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-sm text-slate-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', roleColors[u.userType] || 'bg-slate-100 text-slate-700')}>
                      {roleLabels[u.userType] || u.userType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn('w-2 h-2 rounded-full', u.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-300')} />
                      <span className={cn('text-sm font-medium', u.status === 'ACTIVE' ? 'text-emerald-600' : 'text-slate-400')}>
                        {u.status === 'ACTIVE' ? 'Actif' : 'Inactif'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setShowDetail(u)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="Voir">
                        <Eye size={16} />
                      </button>
                      {isAdmin && (
                        <>
                          <button onClick={() => handleToggleStatus(u.id, u.status)} className={cn('p-2 rounded-lg', u.status === 'ACTIVE' ? 'text-amber-500 hover:bg-amber-50' : 'text-emerald-500 hover:bg-emerald-50')} title={u.status === 'ACTIVE' ? 'Desactiver' : 'Activer'}>
                            {u.status === 'ACTIVE' ? <UserX size={16} /> : <UserCheck size={16} />}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowInvite(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Inviter un utilisateur</h3>
              <button onClick={() => setShowInvite(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email</label>
                <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" placeholder="email@exemple.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Role</label>
                <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm">
                  <option value="STUDENT">Eleve</option>
                  <option value="TEACHER">Enseignant</option>
                  <option value="PARENT">Parent</option>
                  <option value="ADMIN">Administrateur</option>
                  <option value="COMPTABLE">Comptable</option>
                  <option value="CENSEUR">Censeur</option>
                  <option value="SECRETAIRE">Secretaire</option>
                  <option value="SURVEILLANT">Surveillant</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowInvite(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">
                Annuler
              </button>
              <button onClick={handleInvite} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2">
                <Send size={16} /> Envoyer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowDetail(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Details utilisateur</h3>
              <button onClick={() => setShowDetail(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-700">
                {getInitials(showDetail.name)}
              </div>
              <div>
                <h4 className="font-bold text-lg">{showDetail.name}</h4>
                <p className="text-slate-500">{showDetail.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">Role</span>
                <span className={cn('px-2 py-1 rounded-full text-xs font-medium', roleColors[showDetail.userType] || 'bg-slate-100 text-slate-700')}>
                  {roleLabels[showDetail.userType] || showDetail.userType}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">Statut</span>
                <span className="flex items-center gap-2">
                  <div className={cn('w-2 h-2 rounded-full', showDetail.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-300')} />
                  {showDetail.status === 'ACTIVE' ? 'Actif' : 'Inactif'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">Derniere connexion</span>
                <span className="text-sm font-medium">{formatRelativeTime(showDetail.lastLoginAt)}</span>
              </div>
            </div>

            {isAdmin && (
              <div className="flex gap-3 mt-6">
                <button onClick={() => handleEditUser(showDetail)} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700">
                  Modifier
                </button>
                <button onClick={() => handleResetPassword(showDetail.email)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 flex items-center justify-center gap-2">
                  <Key size={16} /> Reset mot de passe
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowEditModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Modifier l&apos;utilisateur</h3>
              <button onClick={() => setShowEditModal(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nom</label>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Telephone</label>
                <SmartPhoneInput value={editPhone} onChange={(value) => setEditPhone(value)} countryCode="CI" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Role</label>
                <select value={editRole} onChange={(e) => setEditRole(e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm">
                  <option value="STUDENT">Eleve</option>
                  <option value="TEACHER">Enseignant</option>
                  <option value="PARENT">Parent</option>
                  <option value="ADMIN">Administrateur</option>
                  <option value="COMPTABLE">Comptable</option>
                  <option value="CENSEUR">Censeur</option>
                  <option value="SECRETAIRE">Secretaire</option>
                  <option value="SURVEILLANT">Surveillant</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowEditModal(null)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">
                Annuler
              </button>
              <button onClick={handleSaveEdit} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
