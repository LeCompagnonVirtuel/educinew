'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { getSupabase } from '@/lib/api/shared';
import {
  FileText, Download, Printer, BarChart3, Users, CreditCard,
  Clock, GraduationCap, Activity, Calendar, ChevronRight, ChevronLeft,
  Loader2,
} from 'lucide-react';

type ReportCategory = 'effectifs' | 'finance' | 'presences' | 'resultats' | 'enseignants' | 'utilisation';
type Period = 'month' | 'lastmonth' | 'trimester' | 'year';

interface ReportRow {
  [key: string]: string | number;
}

const CATEGORIES = [
  { id: 'effectifs' as const, label: 'Effectifs', icon: Users, desc: 'Élèves par classe, inscriptions', color: 'border-[#4F46E5] bg-indigo-50' },
  { id: 'finance' as const, label: 'Finance', icon: CreditCard, desc: 'Revenus, paiements, impayés', color: 'border-emerald-500 bg-emerald-50' },
  { id: 'presences' as const, label: 'Présences', icon: Clock, desc: 'Taux par classe et période', color: 'border-amber-500 bg-amber-50' },
  { id: 'resultats' as const, label: 'Résultats Scolaires', icon: GraduationCap, desc: 'Moyennes par classe/matière', color: 'border-violet-500 bg-violet-50' },
  { id: 'enseignants' as const, label: 'Enseignants', icon: Activity, desc: 'Pointage, charge de travail', color: 'border-blue-500 bg-blue-50' },
  { id: 'utilisation' as const, label: 'Utilisation', icon: BarChart3, desc: 'Connexions, fonctionnalités', color: 'border-pink-500 bg-pink-50' },
];

const PERIODS = [
  { id: 'month' as const, label: 'Ce mois' },
  { id: 'lastmonth' as const, label: 'Mois dernier' },
  { id: 'trimester' as const, label: 'Ce trimestre' },
  { id: 'year' as const, label: 'Cette année' },
];

export default function AdminReportsPage() {
  const { user } = useAuth();
  const { school } = useSchool();
  const [category, setCategory] = useState<ReportCategory | null>(null);
  const [period, setPeriod] = useState<Period>('month');
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<ReportRow[]>([]);

  useEffect(() => {
    if (category) loadReport();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, period]);

  async function loadReport() {
    if (!user?.schoolId) return;
    setLoading(true);
    setHeaders([]);
    setRows([]);

    const supabase = getSupabase();
    const now = new Date();
    let startDate = '';

    switch (period) {
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
        break;
      case 'lastmonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
        break;
      case 'trimester':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1).toISOString().split('T')[0];
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];
        break;
    }

    try {
      switch (category) {
        case 'effectifs': {
          const { data } = await supabase
            .from('students')
            .select('id, gender, class:classes(name)')
            .eq('school_id', user.schoolId);

          const byClass = new Map<string, { total: number; M: number; F: number }>();
          (data || []).forEach((s: any) => {
            const cls = s.class?.name || 'Non assigné';
            if (!byClass.has(cls)) byClass.set(cls, { total: 0, M: 0, F: 0 });
            const entry = byClass.get(cls)!;
            entry.total++;
            if (s.gender === 'M') entry.M++;
            else entry.F++;
          });

          setHeaders(['Classe', 'Total', 'Garçons', 'Filles']);
          setRows(Array.from(byClass.entries()).map(([cls, d]) => ({
            Classe: cls, Total: d.total, Garçons: d.M, Filles: d.F,
          })));
          break;
        }

        case 'finance': {
          const { data } = await supabase
            .from('payments')
            .select('amount, status, method, created_at')
            .eq('school_id', user.schoolId)
            .gte('created_at', startDate);

          const byMethod = new Map<string, { total: number; amount: number }>();
          let totalRevenue = 0;
          let pending = 0;

          (data || []).forEach((p: any) => {
            const method = p.method || 'Autre';
            if (!byMethod.has(method)) byMethod.set(method, { total: 0, amount: 0 });
            byMethod.get(method)!.total++;
            byMethod.get(method)!.amount += p.amount || 0;
            if (p.status === 'COMPLETED') totalRevenue += p.amount || 0;
            if (p.status === 'PENDING') pending += p.amount || 0;
          });

          setHeaders(['Méthode', 'Transactions', 'Montant (FCFA)']);
          const r: ReportRow[] = Array.from(byMethod.entries()).map(([method, d]) => ({
            Méthode: method, Transactions: d.total, 'Montant (FCFA)': d.amount.toLocaleString('fr-FR'),
          }));
          r.push({ Méthode: '— TOTAL ENCAISSÉ', Transactions: '', 'Montant (FCFA)': totalRevenue.toLocaleString('fr-FR') });
          r.push({ Méthode: '— EN ATTENTE', Transactions: '', 'Montant (FCFA)': pending.toLocaleString('fr-FR') });
          setRows(r);
          break;
        }

        case 'presences': {
          const { data } = await supabase
            .from('attendance')
            .select('status, student:students(class:classes(name))')
            .eq('school_id', user.schoolId)
            .gte('date', startDate);

          const byClass = new Map<string, { total: number; present: number }>();
          (data || []).forEach((a: any) => {
            const cls = a.student?.class?.name || 'Inconnue';
            if (!byClass.has(cls)) byClass.set(cls, { total: 0, present: 0 });
            byClass.get(cls)!.total++;
            if (a.status === 'PRESENT') byClass.get(cls)!.present++;
          });

          setHeaders(['Classe', 'Total relevés', 'Présents', 'Taux (%)']);
          setRows(Array.from(byClass.entries()).map(([cls, d]) => ({
            Classe: cls, 'Total relevés': d.total, Présents: d.present, 'Taux (%)': d.total > 0 ? Math.round((d.present / d.total) * 100) : 0,
          })));
          break;
        }

        case 'resultats': {
          const { data } = await supabase
            .from('grades')
            .select('score, max_score, subject:subjects(name), class:classes(name)')
            .eq('school_id', user.schoolId);

          const bySubject = new Map<string, { scores: number[]; className: string }>();
          (data || []).forEach((g: any) => {
            const key = `${g.subject?.name || 'Inconnu'}|${g.class?.name || ''}`;
            if (!bySubject.has(key)) bySubject.set(key, { scores: [], className: g.class?.name || '' });
            bySubject.get(key)!.scores.push((g.score / (g.max_score || 20)) * 20);
          });

          setHeaders(['Matière', 'Classe', 'Moyenne', 'Notes']);
          setRows(Array.from(bySubject.entries()).map(([key, d]) => {
            const [subject] = key.split('|');
            const avg = d.scores.reduce((a, b) => a + b, 0) / d.scores.length;
            return { Matière: subject, Classe: d.className, Moyenne: Math.round(avg * 10) / 10, Notes: d.scores.length };
          }));
          break;
        }

        case 'enseignants': {
          const { data } = await supabase
            .from('teacher_attendance')
            .select('teacher_id, status, date, teacher:teachers(first_name, last_name)')
            .eq('school_id', user.schoolId)
            .gte('date', startDate);

          const byTeacher = new Map<string, { name: string; present: number; late: number; absent: number }>();
          (data || []).forEach((ta: any) => {
            const id = ta.teacher_id;
            const name = ta.teacher ? `${ta.teacher.last_name} ${ta.teacher.first_name}` : id?.slice(0, 8);
            if (!byTeacher.has(id)) byTeacher.set(id, { name, present: 0, late: 0, absent: 0 });
            const entry = byTeacher.get(id)!;
            if (ta.status === 'PRESENT') entry.present++;
            else if (ta.status === 'LATE') entry.late++;
            else entry.absent++;
          });

          setHeaders(['Enseignant', 'Présent', 'Retard', 'Absent', 'Taux (%)']);
          setRows(Array.from(byTeacher.values()).map(d => {
            const total = d.present + d.late + d.absent;
            return { Enseignant: d.name, Présent: d.present, Retard: d.late, Absent: d.absent, 'Taux (%)': total > 0 ? Math.round(((d.present + d.late) / total) * 100) : 0 };
          }));
          break;
        }

        case 'utilisation': {
          setHeaders(['Métrique', 'Valeur']);
          const { count: totalUsers } = await supabase.from('users').select('id', { count: 'exact', head: true }).eq('school_id', user.schoolId);
          const { count: activeToday } = await supabase.from('audit_logs').select('user_id', { count: 'exact', head: true }).eq('school_id', user.schoolId).gte('created_at', new Date().toISOString().split('T')[0]);
          setRows([
            { Métrique: 'Utilisateurs totaux', Valeur: totalUsers || 0 },
            { Métrique: "Actions aujourd'hui", Valeur: activeToday || 0 },
          ]);
          break;
        }
      }
    } catch (err) {
      // Error handled by catch block
    } finally {
      setLoading(false);
    }
  }

  const exportCSV = () => {
    if (!headers.length || !rows.length) return;
    const csv = [headers.join(';'), ...rows.map(r => headers.map(h => String(r[h] ?? '')).join(';'))].join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport_${category}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = async () => {
    if (!headers.length || !rows.length) return;
    const { default: jsPDF } = await import('jspdf');
    await import('jspdf-autotable');
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(school?.name || 'Établissement', 14, 20);
    doc.setFontSize(10);
    doc.text(`Rapport: ${CATEGORIES.find(c => c.id === category)?.label || ''}`, 14, 28);
    doc.text(`Période: ${PERIODS.find(p => p.id === period)?.label || ''}`, 14, 34);
    doc.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 14, 40);

    (doc as any).autoTable({
      startY: 48,
      head: [headers],
      body: rows.map(r => headers.map(h => String(r[h] ?? ''))),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [79, 70, 229] },
    });

    doc.save(`rapport_${category}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Rapports' }]}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Centre de Rapports</h1>
          <p className="text-sm text-gray-500 mt-1">Générez et exportez des rapports détaillés</p>
        </div>

        {/* Categories */}
        {!category ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`text-left bg-white rounded-xl border-l-4 ${cat.color} p-5 shadow-sm hover:shadow-md transition-all group`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <cat.icon size={20} className="text-gray-700" />
                  <h3 className="font-semibold text-gray-900">{cat.label}</h3>
                </div>
                <p className="text-sm text-gray-500">{cat.desc}</p>
                <div className="flex items-center gap-1 text-[#4F46E5] text-xs font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Générer le rapport <ChevronRight size={12} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <>
            {/* Back + Period */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <button onClick={() => { setCategory(null); setRows([]); }} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4F46E5]">
                <ChevronLeft size={16} /> Retour aux catégories
              </button>
              <div className="flex items-center gap-2">
                {PERIODS.map((p) => (
                  <button key={p.id} onClick={() => setPeriod(p.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${period === p.id ? 'bg-[#4F46E5] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Report title */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {CATEGORIES.find(c => c.id === category)?.label}
                </h2>
                <div className="flex gap-2">
                  <button onClick={exportCSV} disabled={!rows.length} className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium hover:bg-emerald-100 disabled:opacity-40">
                    <Download size={14} /> CSV
                  </button>
                  <button onClick={exportPDF} disabled={!rows.length} className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 disabled:opacity-40">
                    <FileText size={14} /> PDF
                  </button>
                  <button onClick={() => window.print()} disabled={!rows.length} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 disabled:opacity-40">
                    <Printer size={14} /> Imprimer
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 size={24} className="animate-spin text-[#4F46E5]" />
                </div>
              ) : rows.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-sm text-gray-500">Aucune donnée pour cette période</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {headers.map((h) => (
                          <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {rows.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50/50">
                          {headers.map((h) => (
                            <td key={h} className="px-4 py-3 text-gray-700">{String(row[h] ?? '-')}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </RoleLayout>
  );
}
