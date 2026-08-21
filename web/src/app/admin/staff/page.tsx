'use client';

import React, { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { sbStaff } from '@/lib/api/domains/staff.service';
import { sbStaffAttendance } from '@/lib/api/domains/staff-attendance.service';
import { sbEmailTrigger } from '@/lib/api/domains/email-trigger.service';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import {
  Users, Plus, Search, Loader2, Edit2, Trash2, Eye, EyeOff,
  Mail, Phone, Building, Calendar, FileText, Download,
} from 'lucide-react';

export default function AdminStaffPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '', email: '', position: 'SECRETAIRE', department: '',
    phone: '', contractType: 'CDI', role: 'SECRETAIRE',
  });
  const [createdPassword, setCreatedPassword] = useState('');
  const [createdIdentifier, setCreatedIdentifier] = useState('');

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadStaff = async () => {
    try {
      const data = await sbStaff.list();
      setStaff(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadStaff(); }, []);

  const handleCreate = async () => {
    if (!newStaff.name || !newStaff.email) return;
    setCreating(true);
    try {
      const result = await sbStaff.create(newStaff);
      setCreatedPassword(result.tempPassword);
      setCreatedIdentifier(result.identifier || '');
      if (newStaff.email) {
        sbEmailTrigger.onTeacherCreated(newStaff.email, newStaff.name, result.tempPassword);
      }
      setNewStaff({ name: '', email: '', position: 'SECRETAIRE', department: '', phone: '', contractType: 'CDI', role: 'SECRETAIRE' });
      loadStaff();
    } catch (err: any) {
      showToast(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDeactivate = async (id: string) => {
    if (!confirm('Désactiver ce membre du personnel ?')) return;
    try {
      await sbStaff.deactivate(id);
      loadStaff();
    } catch (err: any) {
      showToast(err.message);
    }
  };

  const filtered = staff.filter(s =>
    s.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.position?.toLowerCase().includes(search.toLowerCase()) ||
    s.department?.toLowerCase().includes(search.toLowerCase())
  );

  const roleColors: Record<string, string> = {
    SECRETAIRE: 'bg-blue-100 text-blue-700',
    CENSEUR: 'bg-orange-100 text-orange-700',
    SURVEILLANT: 'bg-purple-100 text-purple-700',
    COMPTABLE: 'bg-green-100 text-green-700',
  };

  if (loading) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: 'Personnel' }]}>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Personnel' }]}>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-on-surface">Gestion du Personnel</h1>
            <p className="text-on-surface-variant">{staff.length} membre(s) du personnel</p>
          </div>
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Plus size={18} />
            Ajouter
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par nom, fonction, service..."
            className="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        {/* Staff List */}
        <div className="bg-surface-container rounded-xl border border-outline-variant/20 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-on-surface-variant/30 mx-auto mb-3" />
              <p className="text-on-surface-variant">Aucun membre du personnel trouvé</p>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/10">
              {filtered.map(s => (
                <div key={s.id} className="flex items-center justify-between p-4 hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary text-sm font-bold">
                      {s.user?.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-medium text-on-surface">{s.user?.name}</p>
                      <p className="text-xs text-on-surface-variant">
                        {s.position} {s.department ? `— ${s.department}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[s.user?.role] || 'bg-gray-100 text-gray-700'}`}>
                      {s.user?.role}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {s.isActive ? 'Actif' : 'Inactif'}
                    </span>
                    {!s.isActive && (
                      <button onClick={() => sbStaff.activate(s.id).then(loadStaff)}
                        className="text-xs text-primary hover:underline">Réactiver</button>
                    )}
                    {s.isActive && (
                      <button onClick={() => handleDeactivate(s.id)}
                        className="text-xs text-error hover:underline">Désactiver</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Modal */}
        {showCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-surface rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-xl font-bold text-on-surface mb-4">Ajouter un membre du personnel</h2>
              {createdPassword ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="font-medium text-green-800">Compte créé avec succès !</p>
                    {createdIdentifier && (
                      <p className="text-sm text-green-700 mt-2">
                        Identifiant: <code className="bg-green-100 px-2 py-1 rounded">{createdIdentifier}</code>
                      </p>
                    )}
                    <p className="text-sm text-green-700 mt-2">
                      Mot de passe temporaire: <code className="bg-green-100 px-2 py-1 rounded">{createdPassword}</code>
                    </p>
                    <p className="text-xs text-green-600 mt-2">Transmettez ces informations au membre du personnel. Le mot de passe devra être changé à la première connexion.</p>
                  </div>
                  <button onClick={() => { setCreatedPassword(''); setCreatedIdentifier(''); setShowCreate(false); }}
                    className="w-full py-2 bg-primary text-white rounded-lg">Fermer</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Nom complet *</label>
                    <input type="text" value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
                      className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Email *</label>
                    <input type="email" value={newStaff.email} onChange={e => setNewStaff({ ...newStaff, email: e.target.value })}
                      className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1">Rôle *</label>
                      <select value={newStaff.role} onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg">
                        <option value="SECRETAIRE">Secrétaire</option>
                        <option value="CENSEUR">Censeur</option>
                        <option value="SURVEILLANT">Surveillant</option>
                        <option value="COMPTABLE">Comptable</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1">Fonction *</label>
                      <input type="text" value={newStaff.position} onChange={e => setNewStaff({ ...newStaff, position: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1">Service</label>
                      <input type="text" value={newStaff.department} onChange={e => setNewStaff({ ...newStaff, department: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1">Téléphone</label>
                      <SmartPhoneInput value={newStaff.phone} onChange={(value) => setNewStaff({ ...newStaff, phone: value })} countryCode="CI" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button onClick={() => setShowCreate(false)}
                      className="flex-1 py-2 border border-outline-variant/30 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors">
                      Annuler
                    </button>
                    <button onClick={handleCreate} disabled={creating || !newStaff.name || !newStaff.email}
                      className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50">
                      {creating ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Créer'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </RoleLayout>
  );
}
