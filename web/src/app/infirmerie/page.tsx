'use client';

import { useState, useEffect, useCallback } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';
import { Activity, AlertTriangle, Users, Pill, Plus, Search, X, Phone, Heart, ClipboardList, BarChart3, Shield, Calendar, Clock, Edit2, Trash2, AlertCircle, TrendingUp, PackageCheck } from 'lucide-react';

type TabKey = 'consultations' | 'dossiers' | 'medications' | 'urgences' | 'statistiques';
type Severity = 'faible' | 'moyen' | 'urgent' | 'critique';

interface Consultation {
  id: string; school_id: string; student_id: string; date: string;
  symptoms: string; diagnosis: string; treatment: string; medication: string;
  severity: Severity; notes: string; notify_parent: boolean;
  status: 'en_cours' | 'termine' | 'en_attente'; created_by: string; created_at: string;
  student_name?: string;
}
interface DossierMedical {
  id: string; school_id: string; student_id: string; blood_type: string;
  allergies: string; chronic_conditions: string; vaccinations: string;
  emergency_contact_name: string; emergency_contact_phone: string;
  notes: string; updated_at: string; student_name?: string;
}
interface Medication {
  id: string; school_id: string; name: string; category: string;
  stock_quantity: number; unit: string; expiry_date: string;
  min_stock_alert: number; created_at: string;
}

const SEV: Record<Severity, { label: string; color: string; bg: string }> = {
  faible: { label: 'Faible', color: 'text-green-700', bg: 'bg-green-50' },
  moyen: { label: 'Moyen', color: 'text-yellow-700', bg: 'bg-yellow-50' },
  urgent: { label: 'Urgent', color: 'text-orange-700', bg: 'bg-orange-50' },
  critique: { label: 'Critique', color: 'text-red-700', bg: 'bg-red-50' },
};
const STAT: Record<string, { label: string; color: string; bg: string }> = {
  en_cours: { label: 'En cours', color: 'text-blue-700', bg: 'bg-blue-50' },
  termine: { label: 'Terminé', color: 'text-green-700', bg: 'bg-green-50' },
  en_attente: { label: 'En attente', color: 'text-slate-700', bg: 'bg-slate-100' },
};

export default function InfirmeriePage() {
  const { user } = useAuth();
  const supabase = getSupabase();
  const [activeTab, setActiveTab] = useState<TabKey>('consultations');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [dossiers, setDossiers] = useState<DossierMedical[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [showDossierModal, setShowDossierModal] = useState(false);
  const [showMedModal, setShowMedModal] = useState(false);
  const [editingDossier, setEditingDossier] = useState<DossierMedical | null>(null);
  const [cForm, setCForm] = useState({ student_id: '', symptoms: '', diagnosis: '', treatment: '', medication: '', severity: 'faible' as Severity, notes: '', notify_parent: false });
  const [dForm, setDForm] = useState({ student_id: '', blood_type: '', allergies: '', chronic_conditions: '', vaccinations: '', emergency_contact_name: '', emergency_contact_phone: '', notes: '' });
  const [mForm, setMForm] = useState({ name: '', category: '', stock_quantity: 0, unit: '', expiry_date: '', min_stock_alert: 5 });

  const notify = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchConsultations = useCallback(async () => {
    if (!user?.schoolId) return;
    const { data } = await supabase.from('infirmerie_consultations').select('*').eq('school_id', user.schoolId).order('date', { ascending: false });
    setConsultations(data || []);
  }, [user?.schoolId, supabase]);

  const fetchDossiers = useCallback(async () => {
    if (!user?.schoolId) return;
    const { data } = await supabase.from('infirmerie_dossiers').select('*').eq('school_id', user.schoolId).order('updated_at', { ascending: false });
    setDossiers(data || []);
  }, [user?.schoolId, supabase]);

  const fetchMedications = useCallback(async () => {
    if (!user?.schoolId) return;
    const { data } = await supabase.from('infirmerie_medications').select('*').eq('school_id', user.schoolId).order('name', { ascending: true });
    setMedications(data || []);
  }, [user?.schoolId, supabase]);

  useEffect(() => {
    if (!user?.schoolId) return;
    setLoading(true);
    Promise.all([fetchConsultations(), fetchDossiers(), fetchMedications()]).finally(() => setLoading(false));
  }, [user?.schoolId, fetchConsultations, fetchDossiers, fetchMedications]);

  const today = new Date().toISOString().split('T')[0];
  const consultToday = consultations.filter(c => c.date?.startsWith(today));
  const urgences = consultations.filter(c => (c.severity === 'urgent' || c.severity === 'critique') && c.status === 'en_cours');
  const medsDispensed = consultations.filter(c => c.medication && c.date?.startsWith(today)).length;

  const handleCreateConsult = async () => {
    if (!user?.schoolId || !cForm.student_id) return;
    const { error } = await supabase.from('infirmerie_consultations').insert({
      school_id: user.schoolId, student_id: cForm.student_id, date: new Date().toISOString(),
      symptoms: cForm.symptoms, diagnosis: cForm.diagnosis, treatment: cForm.treatment,
      medication: cForm.medication, severity: cForm.severity, notes: cForm.notes,
      notify_parent: cForm.notify_parent, status: 'en_cours', created_by: user.id,
    });
    if (error) { notify('Erreur lors de l\'enregistrement', 'error'); return; }
    notify('Consultation enregistrée', 'success');
    setShowConsultModal(false);
    setCForm({ student_id: '', symptoms: '', diagnosis: '', treatment: '', medication: '', severity: 'faible', notes: '', notify_parent: false });
    fetchConsultations();
  };

  const handleSaveDossier = async () => {
    if (!user?.schoolId || !dForm.student_id) return;
    const payload = { blood_type: dForm.blood_type, allergies: dForm.allergies, chronic_conditions: dForm.chronic_conditions, vaccinations: dForm.vaccinations, emergency_contact_name: dForm.emergency_contact_name, emergency_contact_phone: dForm.emergency_contact_phone, notes: dForm.notes, updated_at: new Date().toISOString() };
    const { error } = editingDossier
      ? await supabase.from('infirmerie_dossiers').update(payload).eq('id', editingDossier.id)
      : await supabase.from('infirmerie_dossiers').insert({ ...payload, school_id: user.schoolId, student_id: dForm.student_id });
    if (error) { notify('Erreur lors de la sauvegarde', 'error'); return; }
    notify(editingDossier ? 'Dossier mis à jour' : 'Dossier créé', 'success');
    setShowDossierModal(false); setEditingDossier(null);
    setDForm({ student_id: '', blood_type: '', allergies: '', chronic_conditions: '', vaccinations: '', emergency_contact_name: '', emergency_contact_phone: '', notes: '' });
    fetchDossiers();
  };

  const handleCreateMed = async () => {
    if (!user?.schoolId || !mForm.name) return;
    const { error } = await supabase.from('infirmerie_medications').insert({ school_id: user.schoolId, ...mForm });
    if (error) { notify('Erreur lors de l\'ajout', 'error'); return; }
    notify('Médicament ajouté', 'success');
    setShowMedModal(false);
    setMForm({ name: '', category: '', stock_quantity: 0, unit: '', expiry_date: '', min_stock_alert: 5 });
    fetchMedications();
  };

  const handleDeleteMed = async (id: string) => {
    if (!confirm('Supprimer ce médicament ?')) return;
    await supabase.from('infirmerie_medications').delete().eq('id', id);
    notify('Médicament supprimé', 'success');
    fetchMedications();
  };

  const getMonthlyStats = () => {
    const m: Record<string, number> = {};
    consultations.forEach(c => { const k = c.date?.substring(0, 7); if (k) m[k] = (m[k] || 0) + 1; });
    return Object.entries(m).sort((a, b) => a[0].localeCompare(b[0])).slice(-6);
  };
  const getTopSymptoms = () => {
    const s: Record<string, number> = {};
    consultations.forEach(c => c.symptoms?.split(',').forEach(x => { const t = x.trim().toLowerCase(); if (t) s[t] = (s[t] || 0) + 1; }));
    return Object.entries(s).sort((a, b) => b[1] - a[1]).slice(0, 8);
  };
  const getPeakHours = () => {
    const h: Record<number, number> = {};
    consultations.forEach(c => { if (c.date) { const hr = new Date(c.date).getHours(); h[hr] = (h[hr] || 0) + 1; } });
    return Object.entries(h).sort((a, b) => Number(b[1]) - Number(a[1])).slice(0, 5);
  };

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'consultations', label: 'Consultations', icon: <ClipboardList size={16} /> },
    { key: 'dossiers', label: 'Dossiers médicaux', icon: <Heart size={16} /> },
    { key: 'medications', label: 'Médicaments', icon: <Pill size={16} /> },
    { key: 'urgences', label: 'Urgences', icon: <AlertTriangle size={16} /> },
    { key: 'statistiques', label: 'Statistiques', icon: <BarChart3 size={16} /> },
  ];

  if (loading) return (
    <RoleLayout role="admin">
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3525cd]" />
      </div>
    </RoleLayout>
  );

  return (
    <RoleLayout role="admin">
      {toast && <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>{toast.msg}</div>}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#191c1d]">Infirmerie</h1>
          <p className="text-[#464555] mt-1">Gestion de la santé et des soins des élèves</p>
        </div>
        <button onClick={() => setShowConsultModal(true)} className="px-4 py-2.5 bg-[#3525cd] text-white rounded-xl text-sm font-medium hover:bg-[#2a1da6] flex items-center gap-2">
          <Plus size={16} /> Nouvelle consultation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <Activity size={20} className="text-blue-600" />, bg: 'bg-blue-50', label: "Consultations aujourd'hui", val: consultToday.length },
          { icon: <AlertTriangle size={20} className="text-red-600" />, bg: 'bg-red-50', label: 'Urgences en cours', val: urgences.length },
          { icon: <Users size={20} className="text-emerald-600" />, bg: 'bg-emerald-50', label: 'Dossiers médicaux actifs', val: dossiers.length },
          { icon: <Pill size={20} className="text-purple-600" />, bg: 'bg-purple-50', label: 'Médicaments dispensés', val: medsDispensed },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>{s.icon}</div>
              <span className="text-sm text-[#464555]">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-[#191c1d]">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 whitespace-nowrap ${activeTab === t.key ? 'bg-[#3525cd]/10 text-[#3525cd]' : 'text-[#464555] hover:bg-slate-50'}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Rechercher un élève, un diagnostic..." className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#3525cd]/40" />
      </div>

      {/* Consultations Tab */}
      {activeTab === 'consultations' && (
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Élève', 'Motif', 'Date/Heure', 'Diagnostic', 'Traitement', 'Sévérité', 'Statut'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {consultations.filter(c => !searchTerm || (c.student_name || c.student_id).toLowerCase().includes(searchTerm.toLowerCase()) || c.symptoms?.toLowerCase().includes(searchTerm.toLowerCase())).map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-[#191c1d]">{c.student_name || c.student_id}</td>
                  <td className="px-6 py-4 text-sm text-[#464555]">{c.symptoms || '-'}</td>
                  <td className="px-6 py-4 text-sm text-[#464555]">{c.date ? new Date(c.date).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                  <td className="px-6 py-4 text-sm text-[#464555]">{c.diagnosis || '-'}</td>
                  <td className="px-6 py-4 text-sm text-[#464555]">{c.treatment || '-'}</td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${SEV[c.severity]?.bg} ${SEV[c.severity]?.color}`}>{SEV[c.severity]?.label}</span></td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STAT[c.status]?.bg} ${STAT[c.status]?.color}`}>{STAT[c.status]?.label}</span></td>
                </tr>
              ))}
              {consultations.length === 0 && <tr><td colSpan={7} className="px-6 py-12 text-center text-sm text-slate-400">Aucune consultation enregistrée</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Dossiers Tab */}
      {activeTab === 'dossiers' && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => { setEditingDossier(null); setDForm({ student_id: '', blood_type: '', allergies: '', chronic_conditions: '', vaccinations: '', emergency_contact_name: '', emergency_contact_phone: '', notes: '' }); setShowDossierModal(true); }} className="px-4 py-2.5 bg-[#3525cd] text-white rounded-xl text-sm font-medium hover:bg-[#2a1da6] flex items-center gap-2">
              <Plus size={16} /> Nouveau dossier
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dossiers.filter(d => !searchTerm || (d.student_name || d.student_id).toLowerCase().includes(searchTerm.toLowerCase())).map(d => (
              <div key={d.id} className="bg-white rounded-xl border border-slate-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-[#191c1d]">{d.student_name || d.student_id}</h4>
                  <button onClick={() => { setEditingDossier(d); setDForm({ student_id: d.student_id, blood_type: d.blood_type || '', allergies: d.allergies || '', chronic_conditions: d.chronic_conditions || '', vaccinations: d.vaccinations || '', emergency_contact_name: d.emergency_contact_name || '', emergency_contact_phone: d.emergency_contact_phone || '', notes: d.notes || '' }); setShowDossierModal(true); }} className="p-1.5 hover:bg-slate-100 rounded-lg">
                    <Edit2 size={14} className="text-slate-500" />
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  {d.blood_type && <div className="flex items-center gap-2"><Heart size={14} className="text-red-500" /><span className="text-[#464555]">Groupe: <strong>{d.blood_type}</strong></span></div>}
                  {d.allergies && <div className="flex items-center gap-2"><AlertCircle size={14} className="text-orange-500" /><span className="text-[#464555]">Allergies: {d.allergies}</span></div>}
                  {d.chronic_conditions && <div className="flex items-center gap-2"><Shield size={14} className="text-purple-500" /><span className="text-[#464555]">Conditions: {d.chronic_conditions}</span></div>}
                  {d.emergency_contact_name && <div className="flex items-center gap-2"><Phone size={14} className="text-green-500" /><span className="text-[#464555]">{d.emergency_contact_name} - {d.emergency_contact_phone}</span></div>}
                </div>
                <p className="text-xs text-slate-400 mt-3">Mis à jour: {d.updated_at ? new Date(d.updated_at).toLocaleDateString('fr-FR') : '-'}</p>
              </div>
            ))}
            {dossiers.length === 0 && <div className="col-span-full text-center py-12 text-sm text-slate-400">Aucun dossier médical</div>}
          </div>
        </div>
      )}

      {/* Medications Tab */}
      {activeTab === 'medications' && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowMedModal(true)} className="px-4 py-2.5 bg-[#3525cd] text-white rounded-xl text-sm font-medium hover:bg-[#2a1da6] flex items-center gap-2">
              <Plus size={16} /> Ajouter un médicament
            </button>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Nom', 'Catégorie', 'Stock', 'Unité', 'Expiration', 'Statut', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {medications.filter(m => !searchTerm || m.name.toLowerCase().includes(searchTerm.toLowerCase())).map(m => {
                  const low = m.stock_quantity <= m.min_stock_alert;
                  const expired = m.expiry_date && new Date(m.expiry_date) < new Date();
                  return (
                    <tr key={m.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-[#191c1d]">{m.name}</td>
                      <td className="px-6 py-4 text-sm text-[#464555]">{m.category || '-'}</td>
                      <td className="px-6 py-4 text-sm"><span className={low ? 'text-red-600 font-semibold' : 'text-[#464555]'}>{m.stock_quantity}</span></td>
                      <td className="px-6 py-4 text-sm text-[#464555]">{m.unit || '-'}</td>
                      <td className="px-6 py-4 text-sm"><span className={expired ? 'text-red-600 font-semibold' : 'text-[#464555]'}>{m.expiry_date ? new Date(m.expiry_date).toLocaleDateString('fr-FR') : '-'}</span></td>
                      <td className="px-6 py-4">{expired ? <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">Expiré</span> : low ? <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700">Stock bas</span> : <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">OK</span>}</td>
                      <td className="px-6 py-4"><button onClick={() => handleDeleteMed(m.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={14} className="text-red-500" /></button></td>
                    </tr>
                  );
                })}
                {medications.length === 0 && <tr><td colSpan={7} className="px-6 py-12 text-center text-sm text-slate-400">Aucun médicament enregistré</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Urgences Tab */}
      {activeTab === 'urgences' && (
        <div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-red-800 flex items-center gap-2 mb-4"><AlertTriangle size={20} /> Protocole d&apos;urgence</h3>
            <p className="text-sm text-red-700 mb-4">En cas d&apos;urgence médicale, suivez les étapes ci-dessous. Chaque action notifie automatiquement les contacts concernés.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button className="px-4 py-3 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 flex items-center justify-center gap-2"><Phone size={16} /> Appeler SAMU (15)</button>
              <button className="px-4 py-3 bg-orange-600 text-white rounded-xl text-sm font-semibold hover:bg-orange-700 flex items-center justify-center gap-2"><AlertCircle size={16} /> Alerter la direction</button>
              <button className="px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"><Users size={16} /> Notifier les parents</button>
              <button onClick={() => setShowConsultModal(true)} className="px-4 py-3 bg-[#3525cd] text-white rounded-xl text-sm font-semibold hover:bg-[#2a1da6] flex items-center justify-center gap-2"><ClipboardList size={16} /> Enregistrer l&apos;incident</button>
            </div>
          </div>
          <h3 className="text-lg font-bold text-[#191c1d] mb-4">Urgences en cours ({urgences.length})</h3>
          {urgences.length > 0 ? (
            <div className="space-y-3">
              {urgences.map(c => (
                <div key={c.id} className="bg-white rounded-xl border border-red-200 p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#191c1d]">{c.student_name || c.student_id}</p>
                    <p className="text-sm text-[#464555]">{c.symptoms} - {c.diagnosis || 'En attente de diagnostic'}</p>
                    <p className="text-xs text-slate-400 mt-1">{c.date ? new Date(c.date).toLocaleString('fr-FR') : ''}</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${SEV[c.severity]?.bg} ${SEV[c.severity]?.color}`}>{SEV[c.severity]?.label}</span>
                </div>
              ))}
            </div>
          ) : <div className="bg-white rounded-xl border border-slate-100 p-12 text-center text-sm text-slate-400">Aucune urgence en cours</div>}
        </div>
      )}

      {/* Statistiques Tab */}
      {activeTab === 'statistiques' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-[#191c1d] mb-4 flex items-center gap-2"><TrendingUp size={18} /> Tendances mensuelles</h3>
            <div className="space-y-3">
              {getMonthlyStats().map(([month, count]) => (
                <div key={month} className="flex items-center gap-4">
                  <span className="text-sm text-[#464555] w-24">{month}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-6 overflow-hidden">
                    <div className="bg-[#3525cd] h-full rounded-full flex items-center justify-end pr-2" style={{ width: `${Math.min(100, (count / Math.max(...getMonthlyStats().map(([, v]) => v))) * 100)}%` }}>
                      <span className="text-xs text-white font-medium">{count}</span>
                    </div>
                  </div>
                </div>
              ))}
              {getMonthlyStats().length === 0 && <p className="text-sm text-slate-400 text-center py-4">Pas de données disponibles</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-[#191c1d] mb-4 flex items-center gap-2"><Activity size={18} /> Symptômes fréquents</h3>
              <div className="space-y-2">
                {getTopSymptoms().map(([symptom, count]) => (
                  <div key={symptom} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-[#464555] capitalize">{symptom}</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#3525cd]/10 text-[#3525cd]">{count}</span>
                  </div>
                ))}
                {getTopSymptoms().length === 0 && <p className="text-sm text-slate-400 text-center py-4">Pas de données</p>}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-[#191c1d] mb-4 flex items-center gap-2"><Clock size={18} /> Heures de pointe</h3>
              <div className="space-y-2">
                {getPeakHours().map(([hour, count]) => (
                  <div key={hour} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-[#464555]">{hour}h00 - {Number(hour) + 1}h00</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{count} visites</span>
                  </div>
                ))}
                {getPeakHours().length === 0 && <p className="text-sm text-slate-400 text-center py-4">Pas de données</p>}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-100 p-5 text-center">
              <PackageCheck size={24} className="text-[#3525cd] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#191c1d]">{consultations.length}</p>
              <p className="text-sm text-[#464555]">Total consultations</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-5 text-center">
              <Calendar size={24} className="text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#191c1d]">{consultations.length > 0 ? (consultations.length / Math.max(1, getMonthlyStats().length)).toFixed(1) : '0'}</p>
              <p className="text-sm text-[#464555]">Moyenne par mois</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-5 text-center">
              <AlertTriangle size={24} className="text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#191c1d]">{consultations.filter(c => c.severity === 'urgent' || c.severity === 'critique').length}</p>
              <p className="text-sm text-[#464555]">Cas urgents (total)</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Consultation */}
      {showConsultModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowConsultModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#191c1d]">Nouvelle consultation</h3>
              <button onClick={() => setShowConsultModal(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">ID Élève *</label>
                <input value={cForm.student_id} onChange={e => setCForm({ ...cForm, student_id: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30" placeholder="Identifiant de l'élève" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Symptômes</label>
                <textarea value={cForm.symptoms} onChange={e => setCForm({ ...cForm, symptoms: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 resize-none" rows={2} placeholder="Maux de tête, fièvre..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Diagnostic</label>
                <input value={cForm.diagnosis} onChange={e => setCForm({ ...cForm, diagnosis: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30" placeholder="Diagnostic initial" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Traitement</label>
                <input value={cForm.treatment} onChange={e => setCForm({ ...cForm, treatment: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30" placeholder="Traitement prescrit" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Médicament dispensé</label>
                <input value={cForm.medication} onChange={e => setCForm({ ...cForm, medication: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30" placeholder="Paracétamol 500mg..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Sévérité</label>
                <select value={cForm.severity} onChange={e => setCForm({ ...cForm, severity: e.target.value as Severity })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30">
                  <option value="faible">Faible</option><option value="moyen">Moyen</option><option value="urgent">Urgent</option><option value="critique">Critique</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Notes</label>
                <textarea value={cForm.notes} onChange={e => setCForm({ ...cForm, notes: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 resize-none" rows={2} placeholder="Notes supplémentaires..." />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={cForm.notify_parent} onChange={e => setCForm({ ...cForm, notify_parent: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-[#3525cd] focus:ring-[#3525cd]" />
                <span className="text-sm text-[#464555]">Notifier les parents</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowConsultModal(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleCreateConsult} className="flex-1 py-3 bg-[#3525cd] text-white font-semibold rounded-xl hover:bg-[#2a1da6]">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Dossier */}
      {showDossierModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowDossierModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#191c1d]">{editingDossier ? 'Modifier le dossier' : 'Nouveau dossier médical'}</h3>
              <button onClick={() => setShowDossierModal(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">ID Élève *</label>
                <input value={dForm.student_id} onChange={e => setDForm({ ...dForm, student_id: e.target.value })} disabled={!!editingDossier} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 disabled:opacity-60" placeholder="Identifiant de l'élève" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Groupe sanguin</label>
                <select value={dForm.blood_type} onChange={e => setDForm({ ...dForm, blood_type: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30">
                  <option value="">Non renseigné</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Allergies</label>
                <textarea value={dForm.allergies} onChange={e => setDForm({ ...dForm, allergies: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 resize-none" rows={2} placeholder="Pénicilline, arachides..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Conditions chroniques</label>
                <textarea value={dForm.chronic_conditions} onChange={e => setDForm({ ...dForm, chronic_conditions: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 resize-none" rows={2} placeholder="Asthme, diabète..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Vaccinations</label>
                <textarea value={dForm.vaccinations} onChange={e => setDForm({ ...dForm, vaccinations: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 resize-none" rows={2} placeholder="BCG, DTP, ROR..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Contact d&apos;urgence - Nom</label>
                <input value={dForm.emergency_contact_name} onChange={e => setDForm({ ...dForm, emergency_contact_name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30" placeholder="Nom du contact" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Contact d&apos;urgence - Téléphone</label>
                <input value={dForm.emergency_contact_phone} onChange={e => setDForm({ ...dForm, emergency_contact_phone: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30" placeholder="+225 XX XX XX XX" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Notes</label>
                <textarea value={dForm.notes} onChange={e => setDForm({ ...dForm, notes: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 resize-none" rows={2} placeholder="Informations complémentaires..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowDossierModal(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleSaveDossier} className="flex-1 py-3 bg-[#3525cd] text-white font-semibold rounded-xl hover:bg-[#2a1da6]">{editingDossier ? 'Mettre à jour' : 'Créer le dossier'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Medication */}
      {showMedModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowMedModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#191c1d]">Ajouter un médicament</h3>
              <button onClick={() => setShowMedModal(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nom *</label>
                <input value={mForm.name} onChange={e => setMForm({ ...mForm, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30" placeholder="Paracétamol 500mg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Catégorie</label>
                <select value={mForm.category} onChange={e => setMForm({ ...mForm, category: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30">
                  <option value="">Sélectionner</option><option value="Antalgique">Antalgique</option><option value="Anti-inflammatoire">Anti-inflammatoire</option><option value="Antibiotique">Antibiotique</option><option value="Antiseptique">Antiseptique</option><option value="Antihistaminique">Antihistaminique</option><option value="Pansement">Pansement</option><option value="Autre">Autre</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Quantité</label>
                  <input type="number" value={mForm.stock_quantity} onChange={e => setMForm({ ...mForm, stock_quantity: Number(e.target.value) })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30" min={0} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Unité</label>
                  <input value={mForm.unit} onChange={e => setMForm({ ...mForm, unit: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30" placeholder="comprimés, ml..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Date d&apos;expiration</label>
                  <input type="date" value={mForm.expiry_date} onChange={e => setMForm({ ...mForm, expiry_date: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Seuil alerte</label>
                  <input type="number" value={mForm.min_stock_alert} onChange={e => setMForm({ ...mForm, min_stock_alert: Number(e.target.value) })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30" min={0} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowMedModal(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleCreateMed} className="flex-1 py-3 bg-[#3525cd] text-white font-semibold rounded-xl hover:bg-[#2a1da6]">Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
