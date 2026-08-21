'use client';

import React, { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { getSupabase } from '@/lib/api/shared';
import {
  Users, Clock, AlertTriangle, CheckCircle,
  TrendingUp, Target, Plus, Eye, Phone, Loader2, X,
} from 'lucide-react';

const statusColors: Record<string, string> = {
  'OPEN': 'bg-orange-100 text-orange-800',
  'RESOLVED': 'bg-green-100 text-green-800',
  'PENDING': 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  'OPEN': 'En cours',
  'RESOLVED': 'Résolu',
  'PENDING': 'En attente',
};

const incidentTypes = ['RETARD', 'ABSENCE', 'COMPORTEMENT', 'EXCLUSION', 'AUTRE'];

export default function CenseurDashboard() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const { school } = useSchool();
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [showNewIncident, setShowNewIncident] = useState(false);
  const [newIncident, setNewIncident] = useState({ student_id: '', type: 'RETARD', description: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.schoolId) return;
    loadData();
  }, [user?.schoolId]);

  async function loadData() {
    setLoading(true);
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];

    const [incRes, attRes, studRes] = await Promise.all([
      supabase.from('behavior_reports').select('*, student:students(id, first_name, last_name, class:classes(name))').eq('school_id', user!.schoolId).order('created_at', { ascending: false }).limit(50),
      supabase.from('attendance').select('student_id, status, date').eq('school_id', user!.schoolId).eq('date', today),
      supabase.from('students').select('id, first_name, last_name, class:classes(name)').eq('school_id', user!.schoolId),
    ]);

    setIncidents(incRes.data || []);
    setAttendance(attRes.data || []);
    setStudents(studRes.data || []);
    setLoading(false);
  }

  async function handleCreateIncident() {
    if (!newIncident.student_id || !newIncident.type) return;
    setSaving(true);
    const supabase = getSupabase();
    await supabase.from('behavior_reports').insert({
      school_id: user!.schoolId,
      student_id: newIncident.student_id,
      type: newIncident.type,
      description: newIncident.description || null,
      status: 'OPEN',
      date: new Date().toISOString().split('T')[0],
    });
    setShowNewIncident(false);
    setNewIncident({ student_id: '', type: 'RETARD', description: '' });
    setSaving(false);
    loadData();
  }

  async function handleResolve(id: string) {
    const supabase = getSupabase();
    await supabase.from('behavior_reports').update({ status: 'RESOLVED' }).eq('id', id);
    loadData();
  }

  if (loading) {
    return (
      <RoleLayout role="censeur">
        <div className="flex items-center justify-center h-64">
          <Loader2 size={32} className="animate-spin text-[#4f46e5]" />
        </div>
      </RoleLayout>
    );
  }

  const todayIncidents = incidents.filter(i => i.date === new Date().toISOString().split('T')[0]);
  const lateToday = attendance.filter(a => a.status === 'LATE').length;
  const absentToday = attendance.filter(a => a.status === 'ABSENT').length;
  const openIncidents = incidents.filter(i => i.status === 'OPEN' || i.status === 'PENDING').length;
  const exclusionsMonth = incidents.filter(i => {
    if (i.type !== 'EXCLUSION') return false;
    const d = new Date(i.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  // Repeated incidents per student
  const incidentCounts = new Map<string, { count: number; name: string; cls: string; lastType: string }>();
  incidents.forEach(inc => {
    const key = inc.student_id;
    const existing = incidentCounts.get(key);
    const studentName = `${inc.student?.last_name || ''} ${inc.student?.first_name || ''}`.trim();
    const cls = (inc.student?.class as any)?.name || '';
    if (existing) {
      existing.count++;
    } else {
      incidentCounts.set(key, { count: 1, name: studentName, cls, lastType: inc.type });
    }
  });
  const repeatedIncidents = Array.from(incidentCounts.values())
    .filter(s => s.count >= 2)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const statCards = [
    { label: "Retards aujourd'hui", value: lateToday, icon: Clock, color: 'bg-[#4f46e5]' },
    { label: 'Absences non justifiées', value: absentToday, icon: Users, color: 'bg-orange-500' },
    { label: 'Exclusions ce mois', value: exclusionsMonth, icon: AlertTriangle, color: 'bg-red-500' },
    { label: 'Signalements en attente', value: openIncidents, icon: Target, color: 'bg-[#3525cd]' },
  ];

  return (
    <RoleLayout role="censeur">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#191c1d]">Tableau de bord - Censeur</h1>
            <p className="text-sm mt-1 text-[#464555]">Discipline et Pédagogie</p>
          </div>
          <button
            onClick={() => setShowNewIncident(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium bg-[#3525cd] hover:bg-[#4f46e5]"
          >
            <Plus className="w-4 h-4" /> Nouveau signalement
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
          {/* Today's Incidents */}
          <div className="lg:col-span-2 rounded-xl shadow-sm border p-5 bg-[#f8f9fa] border-gray-200">
            <h2 className="text-lg font-semibold text-[#191c1d] mb-4">Incidents du jour</h2>
            {todayIncidents.length === 0 ? (
              <p className="text-sm text-[#464555] text-center py-6">Aucun incident signalé aujourd&apos;hui</p>
            ) : (
              <div className="space-y-3">
                {todayIncidents.map((inc) => (
                  <div key={inc.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold bg-[#4f46e5]">
                        {(inc.student?.first_name || 'N')[0]}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#191c1d]">
                          {inc.student?.last_name} {inc.student?.first_name}
                        </p>
                        <p className="text-xs text-[#464555]">
                          {(inc.student?.class as any)?.name || ''} · {inc.type} · {new Date(inc.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[inc.status] || statusColors['PENDING']}`}>
                        {statusLabels[inc.status] || inc.status}
                      </span>
                      {inc.status !== 'RESOLVED' && (
                        <button
                          onClick={() => handleResolve(inc.id)}
                          className="p-1.5 rounded-lg hover:bg-green-50 text-green-600"
                          title="Marquer comme résolu"
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

          {/* Quick Actions + Summary */}
          <div className="rounded-xl shadow-sm border p-5 bg-[#f8f9fa] border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#191c1d]">Actions rapides</h2>
            <div className="space-y-3">
              <button
                onClick={() => setShowNewIncident(true)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-white"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#4f46e5]">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-[#191c1d]">Nouveau signalement</span>
              </button>
              <a
                href="/attendance"
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-white"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#3525cd]">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-[#191c1d]">Registre des présences</span>
              </a>
            </div>
          </div>
        </div>

        {/* Students with Repeated Incidents */}
        {repeatedIncidents.length > 0 && (
          <div className="rounded-xl shadow-sm border p-5 bg-[#f8f9fa] border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#3525cd]" />
              <h2 className="text-lg font-semibold text-[#191c1d]">Élèves avec incidents répétés</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b text-[#464555]">
                    <th className="pb-3 font-medium">Élève</th>
                    <th className="pb-3 font-medium">Classe</th>
                    <th className="pb-3 font-medium">Nb incidents</th>
                    <th className="pb-3 font-medium">Dernier type</th>
                  </tr>
                </thead>
                <tbody>
                  {repeatedIncidents.map((s, i) => (
                    <tr key={i} className="border-b border-gray-200">
                      <td className="py-3 font-medium text-[#191c1d]">{s.name}</td>
                      <td className="py-3 text-[#464555]">{s.cls}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1 font-semibold text-red-600">
                          <AlertTriangle className="w-4 h-4" /> {s.count}
                        </span>
                      </td>
                      <td className="py-3 text-[#464555]">{s.lastType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* New Incident Modal */}
      {showNewIncident && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#191c1d]">Nouveau signalement</h3>
              <button onClick={() => setShowNewIncident(false)} className="p-1.5 hover:bg-slate-100 rounded-lg">
                <X size={18} className="text-slate-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Élève</label>
                <select
                  value={newIncident.student_id}
                  onChange={e => setNewIncident(prev => ({ ...prev, student_id: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4f46e5] outline-none"
                >
                  <option value="">Sélectionner un élève</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.last_name} {s.first_name} ({(s.class as any)?.name || ''})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Type d&apos;incident</label>
                <select
                  value={newIncident.type}
                  onChange={e => setNewIncident(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4f46e5] outline-none"
                >
                  {incidentTypes.map(t => (
                    <option key={t} value={t}>{t.charAt(0) + t.slice(1).toLowerCase()}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Description</label>
                <textarea
                  value={newIncident.description}
                  onChange={e => setNewIncident(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4f46e5] outline-none resize-none"
                  placeholder="Description de l'incident..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowNewIncident(false)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50">
                Annuler
              </button>
              <button onClick={handleCreateIncident} disabled={saving || !newIncident.student_id} className="px-4 py-2.5 bg-[#3525cd] text-white rounded-xl text-sm font-medium hover:bg-[#4f46e5] disabled:opacity-50">
                {saving ? <Loader2 size={16} className="animate-spin" /> : 'Signaler'}
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
