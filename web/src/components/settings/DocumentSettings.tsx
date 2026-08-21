'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { useBranding } from '@/components/branding/BrandingProvider';
import Image from 'next/image';
import {
  FileText, Stamp, Pen, Save, Loader2, CheckCircle, AlertTriangle,
  Upload, Eye, Settings, Type,
} from 'lucide-react';

export default function DocumentSettings() {
  const { user } = useAuth();
  const { school, updateSchool } = useSchool();
  const { branding, updateBranding } = useBranding();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const [docSettings, setDocSettings] = useState({
    director_name: '',
    director_title: 'Directeur/Directrice',
    signature_url: '',
    stamp_url: '',
    document_footer: '',
    report_card_logo: true,
    report_card_stamp: true,
    report_card_qr: true,
    paper_format: 'A4',
    margins: 'normal',
    mention_passable: 'Passable',
    mention_bien: 'Bien',
    mention_tres_bien: 'Très Bien',
    receipt_header: '',
    receipt_footer: '',
    certificate_text: '',
    attestation_text: '',
  });

  useEffect(() => {
    if (branding) {
      setDocSettings(prev => ({
        ...prev,
        director_name: branding.director_name || '',
        director_title: branding.director_title || 'Directeur/Directrice',
        signature_url: branding.signature_url || '',
        stamp_url: branding.stamp_url || '',
        document_footer: branding.document_footer || '',
      }));
    }
    if (school?.academic_settings) {
      const s = school.academic_settings as any;
      setDocSettings(prev => ({
        ...prev,
        report_card_signature: s.reportCardSignature || '',
        report_card_stamp: s.reportCardStamp || '',
      }));
    }
  }, [branding, school]);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateBranding({
        director_name: docSettings.director_name,
        director_title: docSettings.director_title,
        document_footer: docSettings.document_footer,
      });
      showToast('success', 'Paramètres de documents sauvegardés');
    } catch (e: any) {
      showToast('error', e.message || 'Erreur de sauvegarde');
    }
    setSaving(false);
  };

  const handleUpload = async (field: 'signature_url' | 'stamp_url', file: File) => {
    try {
      const supabase = getSupabase();
      const ext = file.name.split('.').pop();
      const path = `${user!.schoolId}/${field === 'signature_url' ? 'signature' : 'stamp'}.${ext}`;
      const { error } = await supabase.storage.from('school-logos').upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('school-logos').getPublicUrl(path);
      setDocSettings(prev => ({ ...prev, [field]: urlData.publicUrl }));
      showToast('success', field === 'signature_url' ? 'Signature uploadée' : 'Tampon uploadé');
    } catch (e: any) {
      showToast('error', e.message || 'Erreur d\'upload');
    }
  };

  const InputField = ({ label, value, onChange, placeholder, icon: Icon }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; icon?: any }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />}
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] focus:ring-2 focus:ring-[var(--color-primary,#4F46E5)]/20 outline-none text-sm`}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Director Info */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Pen size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Signataire
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Nom du signataire" value={docSettings.director_name} onChange={v => setDocSettings({ ...docSettings, director_name: v })} placeholder="Nom complet" icon={Type} />
          <InputField label="Titre" value={docSettings.director_title} onChange={v => setDocSettings({ ...docSettings, director_title: v })} placeholder="Directeur/Directrice" icon={FileText} />
        </div>
      </div>

      {/* Signature & Stamp */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Stamp size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Signature & Tampon
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Signature numérique</label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-[var(--color-primary,#4F46E5)]/50 transition-colors">
              {docSettings.signature_url ? (
                <Image src={docSettings.signature_url} alt="Signature" width={192} height={96} unoptimized className="max-h-24 mx-auto object-contain" />
              ) : (
                <div className="py-4">
                  <Pen size={24} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-xs text-slate-400">Aucune signature</p>
                </div>
              )}
              <label className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-primary,#4F46E5)]/10 text-[var(--color-primary,#4F46E5)] rounded-lg text-xs font-medium cursor-pointer hover:bg-[var(--color-primary,#4F46E5)]/20 transition-colors">
                <Upload size={12} /> Changer
                <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleUpload('signature_url', e.target.files[0])} />
              </label>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tampon / Cachet</label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-[var(--color-primary,#4F46E5)]/50 transition-colors">
              {docSettings.stamp_url ? (
                <Image src={docSettings.stamp_url} alt="Tampon" width={96} height={96} unoptimized className="max-h-24 mx-auto object-contain" />
              ) : (
                <div className="py-4">
                  <Stamp size={24} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-xs text-slate-400">Aucun tampon</p>
                </div>
              )}
              <label className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-primary,#4F46E5)]/10 text-[var(--color-primary,#4F46E5)] rounded-lg text-xs font-medium cursor-pointer hover:bg-[var(--color-primary,#4F46E5)]/20 transition-colors">
                <Upload size={12} /> Changer
                <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleUpload('stamp_url', e.target.files[0])} />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Document Format */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Settings size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Format des documents
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Format papier</label>
            <select
              value={docSettings.paper_format}
              onChange={e => setDocSettings({ ...docSettings, paper_format: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm"
            >
              <option value="A4">A4 (210 x 297 mm)</option>
              <option value="A5">A5 (148 x 210 mm)</option>
              <option value="LETTER">Letter (216 x 279 mm)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Marges</label>
            <select
              value={docSettings.margins}
              onChange={e => setDocSettings({ ...docSettings, margins: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] outline-none text-sm"
            >
              <option value="narrow">Étroites (10mm)</option>
              <option value="normal">Normales (20mm)</option>
              <option value="wide">Larges (30mm)</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={docSettings.report_card_qr} onChange={e => setDocSettings({ ...docSettings, report_card_qr: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary,#4F46E5)] focus:ring-[var(--color-primary,#4F46E5)]/20" />
            <span className="text-sm text-slate-700">Inclure QR Code de vérification sur les bulletins</span>
          </label>
        </div>
      </div>

      {/* Document Footer */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileText size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Pied de page des documents
        </h3>
        <textarea
          value={docSettings.document_footer}
          onChange={e => setDocSettings({ ...docSettings, document_footer: e.target.value })}
          rows={3}
          placeholder="Mentions légales, adresse, contact..."
          className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] focus:ring-2 focus:ring-[var(--color-primary,#4F46E5)]/20 outline-none text-sm resize-none"
        />
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary,#4F46E5)] text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Sauvegarder
        </button>
      </div>
    </div>
  );
}
