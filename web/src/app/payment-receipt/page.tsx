'use client';

import { useState } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useBranding } from '@/components/branding/BrandingProvider';
import { Download, ArrowRight, Shield } from 'lucide-react';

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [79, 70, 229];
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

export default function PaymentReceiptPage() {
  const [generating, setGenerating] = useState(false);
  const { branding } = useBranding();

  const receipt = {
    id: '#EDU-98234-CI',
    date: '24 Oct 2023, 14:32',
    method: 'Money Fusion',
    student: 'Jean-Pierre Kouassi',
    amount: 15000,
    digitalId: '2984-E-24',
  };

  const handleDownloadPDF = async () => {
    setGenerating(true);
    try {
      const jsPDF = (await import('jspdf')).default;
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });

      const pageWidth = doc.internal.pageSize.getWidth();

      // Use branding colors
      const primaryRgb = branding?.color_primary ? hexToRgb(branding.color_primary) : [53, 37, 205] as [number, number, number];
      const [pr, pg, pb] = primaryRgb;
      const schoolName = branding?.commercial_name || branding?.official_name || 'Établissement';

      // Header band
      doc.setFillColor(pr, pg, pb);
      doc.rect(0, 0, pageWidth, 50, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('REÇU DE PAIEMENT', pageWidth / 2, 20, { align: 'center' });
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(schoolName, pageWidth / 2, 30, { align: 'center' });
      doc.text(`N° ${receipt.id}`, pageWidth / 2, 38, { align: 'center' });

      // Amount box
      let yPos = 60;
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(pageWidth / 2 - 40, yPos, 80, 22, 3, 3, 'F');
      doc.setTextColor(pr, pg, pb);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text(`${receipt.amount.toLocaleString()} FCFA`, pageWidth / 2, yPos + 10, { align: 'center' });
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text('Montant Payé', pageWidth / 2, yPos + 17, { align: 'center' });

      yPos += 35;

      // Details
      const details = [
        ['Transaction ID', receipt.id],
        ['Date & Heure', receipt.date],
        ['Mode de paiement', receipt.method],
        ['Élève', receipt.student],
        ['Digital Copy ID', receipt.digitalId],
      ];

      doc.setFontSize(10);
      details.forEach(([key, value], i) => {
        const rowY = yPos + i * 12;
        doc.setDrawColor(220, 220, 220);
        if (i < details.length - 1) {
          doc.line(25, rowY + 8, pageWidth - 25, rowY + 8);
        }
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        doc.text(key, 25, rowY + 5);
        doc.setTextColor(30, 30, 30);
        doc.setFont('helvetica', 'bold');
        doc.text(value, pageWidth - 25, rowY + 5, { align: 'right' });
      });

      // Footer
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text(`EduCI — Reçu généré le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth / 2, 290, { align: 'center' });

      doc.save(`recu_paiement_${receipt.id}.pdf`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Payments' }, { label: 'Receipt' }]}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-glass p-10 relative overflow-hidden">
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-indigo-900/5 pointer-events-none" />

          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[10px] font-bold text-[#464555] uppercase tracking-widest">Receipt</span>
              <h2 className="text-2xl font-bold text-[#191c1d] mt-1">Premium Horizon Plan</h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-[#464555] uppercase">Amount Paid</p>
              <p className="text-3xl font-black text-[#3525cd]">15,000 FCFA</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 border-t border-[#c7c4d8]/30 pt-6">
            {[
              { key: 'Transaction ID', value: receipt.id },
              { key: 'Date & Time', value: receipt.date },
              { key: 'Payment Method', value: receipt.method },
              { key: 'Student', value: receipt.student },
            ].map((item) => (
              <div key={item.key} className="flex justify-between py-2">
                <span className="text-sm text-[#464555]">{item.key}</span>
                <span className="text-sm font-semibold text-[#191c1d]">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-dashed border-[#c7c4d8]/30 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#464555]">Digital Copy ID</p>
              <p className="text-sm font-bold text-[#191c1d]">{receipt.digitalId}</p>
            </div>
            <Shield size={24} className="text-[#3525cd]" />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleDownloadPDF}
            disabled={generating}
            className="flex-1 py-3 bg-[#3525cd] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#2a1eb5] disabled:opacity-50"
          >
            <Download size={18} /> {generating ? 'Génération...' : 'Télécharger PDF'}
          </button>
          <button className="flex-1 py-3 border-2 border-[#3525cd] text-[#3525cd] font-bold rounded-xl flex items-center justify-center gap-2">
            Go to Courses <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </RoleLayout>
  );
}
