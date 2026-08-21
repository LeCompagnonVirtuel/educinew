'use client';

import React, { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { sbVisitors } from '@/lib/api/domains/visitors.service';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import {
  Users, Plus, Search, Loader2, LogOut, Clock, MapPin,
  User, FileText, Phone, CreditCard,
} from 'lucide-react';

export default function VisiteursPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [activeOnly, setActiveOnly] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [newVisitor, setNewVisitor] = useState({
    visitorName: '', visitorPhone: '', purpose: '', personToVisit: '', personRole: '',
    visitorIdType: 'CNI', visitorIdNumber: '',
  });

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadVisitors = async () => {
    try {
      const data = activeOnly ? await sbVisitors.getActive() : await sbVisitors.list();
      setVisitors(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadVisitors(); }, [activeOnly]);

  const handleRegister = async () => {
    if (!newVisitor.visitorName || !newVisitor.purpose || !newVisitor.personToVisit) return;
    setRegistering(true);
    try {
      await sbVisitors.register(newVisitor);
      setNewVisitor({ visitorName: '', visitorPhone: '', purpose: '', personToVisit: '', personRole: '', visitorIdType: 'CNI', visitorIdNumber: '' });
      setShowRegister(false);
      loadVisitors();
    } catch (err: any) {
      showToast(err.message);
    } finally {
      setRegistering(false);
    }
  };

  const handleCheckout = async (id: string) => {
    try {
      await sbVisitors.checkout(id);
      loadVisitors();
    } catch (err: any) {
      showToast(err.message);
    }
  };

  if (loading) {
    return (
      <RoleLayout role="surveillant" breadcrumbs={[{ label: 'Visiteurs' }]}>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="surveillant" breadcrumbs={[{ label: 'Visiteurs' }]}>
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
            <h1 className="text-2xl font-bold text-on-surface">Registre des Visiteurs</h1>
            <p className="text-on-surface-variant">{visitors.filter(v => v.status === 'INSIDE').length} visiteur(s) actuellement</p>
          </div>
          <button onClick={() => setShowRegister(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Plus size={18} />
            Enregistrer
          </button>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <button onClick={() => setActiveOnly(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!activeOnly ? 'bg-primary text-white' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'}`}>
            Tous ({visitors.length})
          </button>
          <button onClick={() => setActiveOnly(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeOnly ? 'bg-primary text-white' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'}`}>
            Dans l'établissement ({visitors.filter(v => v.status === 'INSIDE').length})
          </button>
        </div>

        {/* Visitors List */}
        <div className="space-y-3">
          {visitors.length === 0 ? (
            <div className="bg-surface-container rounded-xl p-12 text-center border border-outline-variant/20">
              <Users className="w-12 h-12 text-on-surface-variant/30 mx-auto mb-3" />
              <p className="text-on-surface-variant">Aucun visiteur enregistré</p>
            </div>
          ) : (
            visitors.map(v => (
              <div key={v.id} className="bg-surface-container rounded-xl p-4 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      v.status === 'INSIDE' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-on-surface">{v.visitorName}</p>
                      <p className="text-xs text-on-surface-variant">
                        {v.purpose} — Visite: {v.personToVisit}
                        {v.personRole ? ` (${v.personRole})` : ''}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-on-surface-variant">
                        <span className="flex items-center gap-1"><Clock size={12} />
                          {new Date(v.entryTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {v.visitorPhone && (
                          <span className="flex items-center gap-1"><Phone size={12} />{v.visitorPhone}</span>
                        )}
                        {v.badgeNumber && (
                          <span className="flex items-center gap-1"><CreditCard size={12} />{v.badgeNumber}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      v.status === 'INSIDE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {v.status === 'INSIDE' ? 'Présent' : 'Sorti'}
                    </span>
                    {v.status === 'INSIDE' && (
                      <button onClick={() => handleCheckout(v.id)}
                        className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors" title="Enregistrer la sortie">
                        <LogOut size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Register Modal */}
        {showRegister && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-surface rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-xl font-bold text-on-surface mb-4">Enregistrer un visiteur</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Nom du visiteur *</label>
                  <input type="text" value={newVisitor.visitorName} onChange={e => setNewVisitor({ ...newVisitor, visitorName: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Téléphone</label>
                    <SmartPhoneInput value={newVisitor.visitorPhone} onChange={(value) => setNewVisitor({ ...newVisitor, visitorPhone: value })} countryCode="CI" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Type de pièce</label>
                    <select value={newVisitor.visitorIdType} onChange={e => setNewVisitor({ ...newVisitor, visitorIdType: e.target.value })}
                      className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg">
                      <option value="CNI">CNI</option>
                      <option value="PASSPORT">Passeport</option>
                      <option value="PERMIS">Permis</option>
                      <option value="AUTRE">Autre</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Motif de la visite *</label>
                  <input type="text" value={newVisitor.purpose} onChange={e => setNewVisitor({ ...newVisitor, purpose: e.target.value })}
                    placeholder="Ex: Réunion parent-professeur"
                    className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Personne visitée *</label>
                    <input type="text" value={newVisitor.personToVisit} onChange={e => setNewVisitor({ ...newVisitor, personToVisit: e.target.value })}
                      className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Fonction</label>
                    <input type="text" value={newVisitor.personRole} onChange={e => setNewVisitor({ ...newVisitor, personRole: e.target.value })}
                      placeholder="Ex: Directeur"
                      className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowRegister(false)}
                    className="flex-1 py-2 border border-outline-variant/30 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors">
                    Annuler
                  </button>
                  <button onClick={handleRegister} disabled={registering || !newVisitor.visitorName || !newVisitor.purpose || !newVisitor.personToVisit}
                    className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50">
                    {registering ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Enregistrer'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleLayout>
  );
}
