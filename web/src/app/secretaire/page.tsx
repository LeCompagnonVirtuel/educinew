'use client';

import React, { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { getSupabase } from '@/lib/api/shared';
import {
  FileText, Bell, Calendar, Clock, ChevronRight,
  Plus, MessageSquare, Loader2, CheckCircle,
} from 'lucide-react';

const statusColors: Record<string, string> = {
  'PENDING': 'bg-orange-100 text-orange-800',
  'IN_PROGRESS': 'bg-blue-100 text-blue-800',
  'COMPLETED': 'bg-green-100 text-green-800',
};

const statusLabels: Record<string, string> = {
  'PENDING': 'En attente',
  'IN_PROGRESS': 'En cours',
  'COMPLETED': 'Terminé',
};

export default function SecretaireDashboard() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const { school } = useSchool();
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [stats, setStats] = useState({ pending: 0, certificates: 0, convocations: 0, meetings: 0 });
  const [showNewDoc, setShowNewDoc] = useState(false);
  const [newDoc, setNewDoc] = useState({ student_id: '', type: 'CERTIFICAT_SCOLARITE', notes: '' });
  const [students, setStudents] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.schoolId) return;
    loadData();
  }, [user?.schoolId]);

  async function loadData() {
    setLoading(true);
    const supabase = getSupabase();
    const [docsRes, studRes] = await Promise.all([
      supabase.from('documents').select('*, student:students(id, first_name, last_name)').eq('school_id', user!.schoolId).order('created_at', { ascending: false }).limit(20),
      supabase.from('students').select('id, first_name, last_name').eq('school_id', user!.schoolId),
    ]);

    const docs = docsRes.data || [];
    setDocuments(docs);
    setAppointments([]);
    setStudents(studRes.data || []);
    setStats({
      pending: docs.filter((d: any) => d.status === 'PENDING').length,
      certificates: docs.filter((d: any) => d.document_type?.includes('CERTIFICAT')).length,
      convocations: docs.filter((d: any) => d.document_type === 'CONVOCATION').length,
      meetings: 0,
    });
    setLoading(false);
  }

  async function handleCreateDoc() {
    if (!newDoc.student_id || !newDoc.type) return;
    setSaving(true);
    const supabase = getSupabase();
    await supabase.from('documents').insert({
      school_id: user!.schoolId,
      student_id: newDoc.student_id,
      document_type: newDoc.type,
      title: newDoc.notes || newDoc.type,
      status: 'PENDING',
    });
    setShowNewDoc(false);
    setNewDoc({ student_id: '', type: 'CERTIFICAT_SCOLARITE', notes: '' });
    setSaving(false);
    loadData();
  }

  async function handleMarkDone(id: string) {
    const supabase = getSupabase();
    await supabase.from('documents').update({ status: 'COMPLETED' }).eq('id', id);
    loadData();
  }

  if (loading) {
    return (
      <RoleLayout role="secretaire">
        <div className="flex items-center justify-center h-64">
          <Loader2 size={32} className="animate-spin text-[#4f46e5]" />
        </div>
      </RoleLayout>
    );
  }

  const statCards = [
    { label: 'Documents à traiter', value: stats.pending, icon: FileText, color: 'bg-[#4f46e5]' },
    { label: 'Certificats demandés', value: stats.certificates, icon: Bell, color: 'bg-orange-500' },
    { label: 'Convocations', value: stats.convocations, icon: MessageSquare, color: 'bg-green-500' },
    { label: 'RDV à venir', value: stats.meetings, icon: Calendar, color: 'bg-[#3525cd]' },
  ];

  return (
    <RoleLayout role="secretaire">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#191c1d]">Tableau de bord - Secrétaire</h1>
            <p className="text-sm mt-1 text-[#464555]">Gestion administrative et documents</p>
          </div>
          <button
            onClick={() => setShowNewDoc(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#4f46e5] text-white rounded-xl text-sm font-medium hover:bg-[#4338ca]"
          >
            <Plus size={16} /> Nouvelle demande
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <div key={s.label} className="rounded-xl p-5 shadow-sm border bg-[#f8f9fa] border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#464555]">{s.label}</p>
                  <p className="text-3xl font-bold mt-1 text-[#191c1d]">{s.value}</p>
                </div>
                <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <s.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Documents */}
          <div className="lg:col-span-2 rounded-xl shadow-sm border p-5 bg-[#f8f9fa] border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#191c1d]">Demandes de documents</h2>
            </div>
            {documents.length === 0 ? (
              <p className="text-sm text-[#464555] text-center py-6">Aucune demande de document</p>
            ) : (
              <div className="space-y-3">
                {documents.slice(0, 8).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold bg-[#4f46e5]">
                        {(doc.student?.first_name || 'N')[0]}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#191c1d]">
                          {doc.student?.last_name} {doc.student?.first_name}
                        </p>
                        <p className="text-xs text-[#464555]">
                          {(doc.type || '').replace(/_/g, ' ')} · {new Date(doc.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[doc.status] || statusColors['PENDING']}`}>
                        {statusLabels[doc.status] || doc.status}
                      </span>
                      {doc.status !== 'COMPLETED' && (
                        <button
                          onClick={() => handleMarkDone(doc.id)}
                          className="p-1.5 rounded-lg hover:bg-green-50 text-green-600"
                          title="Marquer comme terminé"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Today's Appointments */}
          <div className="rounded-xl shadow-sm border p-5 bg-[#f8f9fa] border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[#3525cd]" />
              <h2 className="text-lg font-semibold text-[#191c1d]">Rendez-vous</h2>
            </div>
            {appointments.length === 0 ? (
              <p className="text-sm text-[#464555] text-center py-6">Aucun rendez-vous à venir</p>
            ) : (
              <div className="space-y-3">
                {appointments.map((appt) => (
                  <div key={appt.id} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold px-2 py-1 rounded bg-[#4f46e5] text-white">
                        {appt.time || new Date(appt.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="font-medium text-sm text-[#191c1d]">{appt.parent?.name || 'Parent'}</p>
                    <p className="text-xs mt-1 text-[#464555]">
                      Élève: {appt.student?.last_name} {appt.student?.first_name}
                    </p>
                    {appt.reason && <p className="text-xs text-[#464555]">Motif: {appt.reason}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Document Request Modal */}
      {showNewDoc && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-[#191c1d] mb-4">Nouvelle demande de document</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Élève</label>
                <select
                  value={newDoc.student_id}
                  onChange={e => setNewDoc(prev => ({ ...prev, student_id: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4f46e5] outline-none"
                >
                  <option value="">Sélectionner un élève</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.last_name} {s.first_name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Type de document</label>
                <select
                  value={newDoc.type}
                  onChange={e => setNewDoc(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4f46e5] outline-none"
                >
                  <option value="CERTIFICAT_SCOLARITE">Certificat de scolarité</option>
                  <option value="ATTESTATION">Attestation</option>
                  <option value="RELEVE_NOTES">Relevé de notes</option>
                  <option value="BULLETIN">Bulletin</option>
                  <option value="CONVOCATION">Convocation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Notes (optionnel)</label>
                <textarea
                  value={newDoc.notes}
                  onChange={e => setNewDoc(prev => ({ ...prev, notes: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4f46e5] outline-none resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowNewDoc(false)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50">
                Annuler
              </button>
              <button onClick={handleCreateDoc} disabled={saving || !newDoc.student_id} className="px-4 py-2.5 bg-[#4f46e5] text-white rounded-xl text-sm font-medium hover:bg-[#4338ca] disabled:opacity-50">
                {saving ? <Loader2 size={16} className="animate-spin" /> : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
