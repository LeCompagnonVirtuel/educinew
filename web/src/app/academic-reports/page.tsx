'use client';

import { useState } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useBranding } from '@/components/branding/BrandingProvider';
import { FileText, Download, Send, Eye, Clock } from 'lucide-react';

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [79, 70, 229];
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

export default function AcademicReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);
  const { branding } = useBranding();

  const reports = [
    { id: 'term1', name: 'Term 1 Report Cards', status: 'Generated', date: 'Nov 30', count: 248 },
    { id: 'attendance', name: 'Attendance Summary', status: 'Generated', date: 'Nov 28', count: 248 },
    { id: 'behavior', name: 'Behavior Reports', status: 'Draft', date: 'Pending', count: 12 },
    { id: 'predictions', name: 'Term 2 Predictions', status: 'Processing', date: 'In Progress', count: 248 },
  ];

  const handleDownloadPDF = async (report: typeof reports[0]) => {
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

      // Report-specific content
      if (report.id === 'term1') {
        autoTable(doc, {
          startY: yPos,
          head: [['Rang', 'Élève', 'Classe', 'Moyenne', 'Mention', 'Statut']],
          body: Array.from({ length: 20 }, (_, i) => [
            `${i + 1}`,
            `Élève ${i + 1}`,
            '6ème A',
            (18 - i * 0.3).toFixed(1),
            i < 3 ? 'Excellent' : i < 8 ? 'Très Bien' : 'Bien',
            'Admis',
          ]),
          styles: { fontSize: 9, cellPadding: 3 },
          headStyles: { fillColor: [pr, pg, pb] as [number, number, number], textColor: [255, 255, 255], fontStyle: 'bold' },
          alternateRowStyles: { fillColor: [248, 250, 252] },
          margin: { left: 15, right: 15 },
        });
      } else if (report.id === 'attendance') {
        autoTable(doc, {
          startY: yPos,
          head: [['Élève', 'Classe', 'Présences', 'Absences', 'Taux']],
          body: Array.from({ length: 15 }, (_, i) => [
            `Élève ${i + 1}`,
            '6ème A',
            `${85 + Math.floor(Math.random() * 15)}`,
            `${Math.floor(Math.random() * 10)}`,
            `${90 + Math.floor(Math.random() * 10)}%`,
          ]),
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
        {reports.map((r) => (
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
