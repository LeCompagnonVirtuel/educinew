'use client';

import { useState, useEffect, useCallback } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useBranding } from '@/components/branding/BrandingProvider';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';
import { FileText, Download, Send, Eye, Clock, Loader2 } from 'lucide-react';

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [79, 70, 229];
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

interface ReportCard {
  id: string;
  name: string;
  status: 'Generated' | 'Draft' | 'Processing';
  date: string;
  count: number;
}

export default function AcademicReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [reports, setReports] = useState<ReportCard[]>([]);
  const [loading, setLoading] = useState(true);
  const { branding } = useBranding();
  const { user } = useAuth();

  const loadReports = useCallback(async () => {
    if (!user?.schoolId) return;
    setLoading(true);
    const supabase = getSupabase();
    const now = new Date();

    try {
      const [
        { data: bulletins, count: bulletinCount },
        { count: studentCount },
        { count: attendanceCount },
        { count: behaviorCount },
      ] = await Promise.all([
        supabase
          .from('bulletins')
          .select('id, status, created_at, period_id, periods(name, end_date)', { count: 'exact' })
          .eq('school_id', user.schoolId),
        supabase
          .from('students')
          .select('id', { count: 'exact', head: true })
          .eq('school_id', user.schoolId)
          .eq('is_active', true),
        supabase
          .from('attendance')
          .select('id', { count: 'exact', head: true })
          .eq('school_id', user.schoolId)
          .gte('date', new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]),
        supabase
          .from('behavior_reports')
          .select('id', { count: 'exact', head: true })
          .eq('school_id', user.schoolId),
      ]);

      const generatedBulletins = (bulletins || []).filter(b => b.status === 'validated');
      const latestBulletin = generatedBulletins.length > 0
        ? generatedBulletins.reduce((a, b) => (a.created_at > b.created_at ? a : b))
        : null;

      const cards: ReportCard[] = [
        {
          id: 'term1',
          name: `${latestBulletin?.periods?.name || 'Term'} Report Cards`,
          status: generatedBulletins.length > 0 ? 'Generated' : 'Draft',
          date: latestBulletin
            ? new Date(latestBulletin.created_at).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })
            : 'Pending',
          count: bulletinCount || studentCount || 0,
        },
        {
          id: 'attendance',
          name: 'Attendance Summary',
          status: (attendanceCount || 0) > 0 ? 'Generated' : 'Draft',
          date: (attendanceCount || 0) > 0
            ? new Date().toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })
            : 'Pending',
          count: attendanceCount || 0,
        },
        {
          id: 'behavior',
          name: 'Behavior Reports',
          status: (behaviorCount || 0) > 0 ? 'Generated' : 'Draft',
          date: (behaviorCount || 0) > 0
            ? new Date().toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })
            : 'Pending',
          count: behaviorCount || 0,
        },
        {
          id: 'predictions',
          name: 'Term Predictions',
          status: 'Processing',
          date: 'In Progress',
          count: studentCount || 0,
        },
      ];

      setReports(cards);
    } catch (err) {
      console.error('[AcademicReports]', err);
    } finally {
      setLoading(false);
    }
  }, [user?.schoolId]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const handleDownloadPDF = async (report: ReportCard) => {
    setGenerating(report.id);
    try {
      const jsPDF = (await import('jspdf')).default;
      const autoTable = (await import('jspdf-autotable')).default;
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });

      const pageWidth = doc.internal.pageSize.getWidth();

      // Use branding colors
      const primaryRgb = branding?.color_primary ? hexToRgb(branding.color_primary) : [53, 37, 205] as [number, number, number];
      const [pr, pg, pb] = primaryRgb;
      const schoolName = branding?.commercial_name || branding?.official_name || 'Établissement';

      // Header
      doc.setFillColor(pr, pg, pb);
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(report.name, pageWidth / 2, 18, { align: 'center' });
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`${schoolName} — ${new Date().getFullYear()}-${new Date().getFullYear() + 1}`, pageWidth / 2, 28, { align: 'center' });
      doc.text(`${report.count} étudiants`, pageWidth / 2, 34, { align: 'center' });

      let yPos = 50;
      const supabase = getSupabase();

      // Report-specific content
      if (report.id === 'term1') {
        const { data: bulletins } = await supabase
          .from('bulletins')
          .select('rank, class_size, general_average, mention, status, student:students(user:users(name)), class:classes(name)')
          .eq('school_id', user?.schoolId)
          .order('general_average', { ascending: false });

        const body = (bulletins || []).map((b: any, i: number) => [
          b.rank ? `${b.rank}/${b.class_size}` : `${i + 1}`,
          b.student?.user?.name || 'N/A',
          b.class?.name || '',
          b.general_average?.toFixed(1) || '-',
          b.mention || '-',
          b.status === 'validated' ? 'Validé' : 'Brouillon',
        ]);

        autoTable(doc, {
          startY: yPos,
          head: [['Rang', 'Élève', 'Classe', 'Moyenne', 'Mention', 'Statut']],
          body: body.length > 0 ? body : [['-', 'Aucune donnée', '-', '-', '-', '-']],
          styles: { fontSize: 9, cellPadding: 3 },
          headStyles: { fillColor: [pr, pg, pb] as [number, number, number], textColor: [255, 255, 255], fontStyle: 'bold' },
          alternateRowStyles: { fillColor: [248, 250, 252] },
          margin: { left: 15, right: 15 },
        });
      } else if (report.id === 'attendance') {
        const { data: attendanceData } = await supabase
          .from('attendance')
          .select('student_id, status, student:students(user:users(name), class:classes(name))')
          .eq('school_id', user?.schoolId);

        const byStudent = new Map<string, { name: string; className: string; present: number; absent: number }>();
        (attendanceData || []).forEach((a: any) => {
          const id = a.student_id;
          if (!byStudent.has(id)) {
            byStudent.set(id, {
              name: a.student?.user?.name || 'N/A',
              className: a.student?.class?.name || '',
              present: 0,
              absent: 0,
            });
          }
          const entry = byStudent.get(id)!;
          if (a.status === 'PRESENT') entry.present++;
          else entry.absent++;
        });

        const body = Array.from(byStudent.values()).map(s => {
          const total = s.present + s.absent;
          return [
            s.name,
            s.className,
            `${s.present}`,
            `${s.absent}`,
            total > 0 ? `${Math.round((s.present / total) * 100)}%` : '0%',
          ];
        });

        autoTable(doc, {
          startY: yPos,
          head: [['Élève', 'Classe', 'Présences', 'Absences', 'Taux']],
          body: body.length > 0 ? body : [['-', 'Aucune donnée', '-', '-', '-']],
          styles: { fontSize: 9, cellPadding: 3 },
          headStyles: { fillColor: [pr, pg, pb] as [number, number, number], textColor: [255, 255, 255], fontStyle: 'bold' },
          alternateRowStyles: { fillColor: [248, 250, 252] },
          margin: { left: 15, right: 15 },
        });
      } else {
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Rapport: ${report.name}`, 20, yPos);
        doc.text(`Statut: ${report.status}`, 20, yPos + 8);
        doc.text(`Date: ${report.date}`, 20, yPos + 16);
        doc.text(`${report.count} étudiants concernés`, 20, yPos + 24);
      }

      // Footer
      const totalPages = doc.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 150);
        doc.text(`${schoolName} — ${report.name} — Généré le ${new Date().toLocaleDateString('fr-FR')} — Page ${p}/${totalPages}`, pageWidth / 2, 290, { align: 'center' });
      }

      doc.save(`${report.id}_rapport.pdf`);
    } finally {
      setGenerating(null);
    }
  };

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Academic Reports' }]}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#191c1d]">Academic Reports</h2>
          <p className="text-[#464555] mt-1">Generate and distribute official academic documents.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-semibold rounded-full text-sm">
          <FileText size={16} /> New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <Loader2 size={24} className="animate-spin text-[#3525cd]" />
          </div>
        ) : reports.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FileText size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-[#464555]">No reports available yet. Add students and grades to generate reports.</p>
          </div>
        ) : reports.map((r) => (
          <div key={r.name} className="bg-white p-5 rounded-xl shadow-card hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#e2dfff] flex items-center justify-center">
                <FileText size={18} className="text-[#3525cd]" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${r.status === 'Generated' ? 'bg-emerald-50 text-emerald-700' : r.status === 'Draft' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
                {r.status}
              </span>
            </div>
            <h4 className="font-bold text-[#191c1d] mb-1">{r.name}</h4>
            <p className="text-xs text-[#464555]">{r.date} • {r.count} students</p>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 bg-[#f3f4f5] text-[#191c1d] font-semibold text-xs rounded-lg flex items-center justify-center gap-1">
                <Eye size={14} /> View
              </button>
              <button
                onClick={() => handleDownloadPDF(r)}
                disabled={generating === r.id}
                className="flex-1 py-2 bg-[#3525cd] text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1 hover:bg-[#2a1eb5] disabled:opacity-50"
              >
                <Download size={14} /> {generating === r.id ? '...' : 'PDF'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-card">
        <h3 className="text-lg font-bold text-[#191c1d] mb-4">AI Report Generator</h3>
        <p className="text-[#464555] mb-4">Let EduCI AI compile personalized reports for each student based on their performance data.</p>
        <div className="flex gap-3">
          <select className="px-4 py-2.5 bg-[#f3f4f5] rounded-xl text-sm">
            <option>All Grades</option><option>Grade 10</option><option>Grade 11</option>
          </select>
          <select className="px-4 py-2.5 bg-[#f3f4f5] rounded-xl text-sm">
            <option>Term 1</option><option>Term 2</option><option>Term 3</option>
          </select>
          <button className="px-6 py-2.5 bg-[#3525cd] text-white font-semibold text-sm rounded-xl flex items-center gap-2">
            <Send size={16} /> Generate
          </button>
        </div>
      </div>
    </RoleLayout>
  );
}
