'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { useBranding } from '@/components/branding/BrandingProvider';
import { sbGrades, sbDashboard } from '@/lib/api';
import { Download, Edit, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [79, 70, 229];
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

export default function ReportCardPage() {
  const { user } = useAuth();
  const { branding } = useBranding();
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState<any[]>([]);
  const [studentInfo, setStudentInfo] = useState<any>(null);

  useEffect(() => {
    if (!user?.id) return;
    async function load() {
      setLoading(true);
      try {
        const [gradesData, bulletins] = await Promise.all([
          sbGrades.getAverages(user!.id),
          sbDashboard.getStudentBulletins(user!.id).catch(() => []),
        ]);

        const bySubject: Record<string, { total: number; count: number; maxScore: number }> = {};
        (gradesData || []).forEach((g: any) => {
          const name = g.subject?.name || 'Autre';
          if (!bySubject[name]) bySubject[name] = { total: 0, count: 0, maxScore: g.max_score || 20 };
          bySubject[name].total += g.score;
          bySubject[name].count++;
        });

        const gradeList = Object.entries(bySubject).map(([name, data]) => {
          const avg = data.count > 0 ? data.total / data.count : 0;
          const pct = Math.round((avg / data.maxScore) * 100);
          const mention = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B+' : pct >= 60 ? 'B' : 'C';
          return { name, score: mention, pct, grade: Math.round(avg * 10) / 10 };
        });
        setGrades(gradeList);

        if (bulletins && bulletins.length > 0) {
          const b = bulletins[0];
          setStudentInfo({
            name: b.studentName || user?.name || 'Élève',
            className: b.className || '',
            matricule: b.matricule || '',
            year: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
            average: gradeList.length > 0 ? (gradeList.reduce((s, g) => s + g.grade, 0) / gradeList.length).toFixed(1) : '0.0',
          });
        } else {
          setStudentInfo({
            name: user?.name || 'Élève',
            className: '',
            matricule: '',
            year: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
            average: gradeList.length > 0 ? (gradeList.reduce((s, g) => s + g.grade, 0) / gradeList.length).toFixed(1) : '0.0',
          });
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user?.id, user?.schoolId]);

  const handleDownloadPDF = async () => {
    setGenerating(true);
    try {
      const jsPDF = (await import('jspdf')).default;
      const autoTable = (await import('jspdf-autotable')).default;
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });

      const pageWidth = doc.internal.pageSize.getWidth();
      let yPos = 20;

      // Use branding colors
      const primaryRgb = branding?.color_primary ? hexToRgb(branding.color_primary) : [53, 37, 205] as [number, number, number];
      const [pr, pg, pb] = primaryRgb;
      const schoolName = branding?.commercial_name || branding?.official_name || 'Établissement';

      // Header
      doc.setFillColor(pr, pg, pb);
      doc.rect(0, 0, pageWidth, 45, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Bulletin de Notes', pageWidth / 2, 18, { align: 'center' });
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`${schoolName} — Année scolaire ${new Date().getFullYear()}-${new Date().getFullYear() + 1}`, pageWidth / 2, 26, { align: 'center' });
      doc.text(`Élève: ${studentInfo?.name || 'N/A'}  |  Classe: ${studentInfo?.className || 'N/A'}  |  Matricule: ${studentInfo?.matricule || 'N/A'}`, pageWidth / 2, 34, { align: 'center' });

      yPos = 55;

      // Average box
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(pageWidth / 2 - 30, yPos, 60, 20, 3, 3, 'F');
      doc.setTextColor(pr, pg, pb);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      const computedAverage = studentInfo?.average || '0.0';
      doc.text(`${computedAverage} / 20`, pageWidth / 2, yPos + 10, { align: 'center' });
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`Moyenne Générale`, pageWidth / 2, yPos + 16, { align: 'center' });

      yPos += 30;

      // Grades table
      autoTable(doc, {
        startY: yPos,
        head: [['Matière', 'Note /20', 'Mention', 'Appréciation']],
        body: grades.map(g => [
          g.name,
          g.grade.toFixed(1),
          g.score,
          g.pct >= 90 ? 'Excellent' : g.pct >= 80 ? 'Très bien' : 'Bien',
        ]),
        styles: { fontSize: 10, cellPadding: 4 },
        headStyles: { fillColor: primaryRgb, textColor: [255, 255, 255], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { left: 15, right: 15 },
      });

      // Footer
      const totalPages = doc.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 150);
        doc.text(`EduCI — Bulletin généré le ${new Date().toLocaleDateString('fr-FR')} — Page ${p}/${totalPages}`, pageWidth / 2, 290, { align: 'center' });
      }

      doc.save('bulletin_notes.pdf');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <RoleLayout role="student">
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#4F46E5]" />
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Students' }, { label: 'Report Card' }]}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-glass p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#3525cd] text-white mb-4 shadow-lg">
              <span className="text-4xl font-bold">A</span>
            </div>
            <h2 className="text-3xl font-bold text-[#191c1d]">{studentInfo?.average || '0.0'} / 20</h2>
            <p className="text-[#464555] mt-1">Overall Average</p>
          </div>

          <div className="space-y-3">
            {grades.map((g, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e2dfff] flex items-center justify-center">
                    <span className="text-[#3525cd] text-sm font-bold">{g.name[0]}</span>
                  </div>
                  <span className="font-semibold text-[#191c1d]">{g.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-[#e7e8e9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3525cd] rounded-full" style={{ width: `${g.pct}%` }} />
                  </div>
                  <span className="font-bold text-[#3525cd]">{g.score}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={handleDownloadPDF}
              disabled={generating}
              className="flex-1 py-3 bg-[#3525cd] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#2a1eb5] disabled:opacity-50"
            >
              <Download size={18} /> {generating ? 'Génération...' : 'Télécharger PDF'}
            </button>
            <button onClick={() => router.push('/grades')} className="flex-1 py-3 border-2 border-[#3525cd] text-[#3525cd] font-bold rounded-xl flex items-center justify-center gap-2">
              <Edit size={18} /> Edit
            </button>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
