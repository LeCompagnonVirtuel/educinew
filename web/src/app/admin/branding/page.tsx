'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import RoleLayout from '@/components/layout/RoleLayout';
import { useBranding } from '@/components/branding/BrandingProvider';
import LogoUpload from '@/components/branding/LogoUpload';
import ColorPicker, { ColorPalettePicker } from '@/components/branding/ColorPicker';
import { BRANDING_COLOR_PRESETS, DEFAULT_BRANDING } from '@/types/branding';
import { sbBranding } from '@/lib/api/domains/branding.service';
import { useAuth } from '@/hooks/useAuth';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import {
  Building2, Upload, Palette, Type, PenTool, Eye, Save, Loader2,
  Check, Phone, Mail, MapPin, Globe, RotateCcw, Download, Upload as UploadIcon,
  GraduationCap, Sparkles
} from 'lucide-react';

type Tab = 'identity' | 'logo' | 'colors' | 'typography' | 'signature' | 'preview';

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'identity', label: 'Identité', icon: Building2 },
  { id: 'logo', label: 'Logo', icon: Upload },
  { id: 'colors', label: 'Couleurs', icon: Palette },
  { id: 'typography', label: 'Typographie', icon: Type },
  { id: 'signature', label: 'Signature', icon: PenTool },
  { id: 'preview', label: 'Aperçu', icon: Eye },
];

export default function BrandingPage() {
  const { user } = useAuth();
  const { branding, updateBranding, loading } = useBranding();
  const [activeTab, setActiveTab] = useState<Tab>('identity');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState<Partial<any>>({});

  const data = { ...branding, ...formData };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const update = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateBranding(formData);
      setFormData({});
      showToast('Branding mis à jour avec succès');
    } catch (err: any) {
      showToast(err.message || 'Erreur', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Réinitialiser le thème aux couleurs par défaut ?')) return;
    await updateBranding(DEFAULT_BRANDING as any);
    setFormData({});
    showToast('Thème réinitialisé');
  };

  const handleLogoUpload = useCallback(async (file: File) => {
    if (!user?.schoolId) return null;
    return sbBranding.uploadLogo(user.schoolId, file, 'logo');
  }, [user?.schoolId]);

  const handleSignatureUpload = useCallback(async (file: File) => {
    if (!user?.schoolId) return null;
    return sbBranding.uploadLogo(user.schoolId, file, 'signature');
  }, [user?.schoolId]);

  const handleStampUpload = useCallback(async (file: File) => {
    if (!user?.schoolId) return null;
    return sbBranding.uploadLogo(user.schoolId, file, 'stamp');
  }, [user?.schoolId]);

  const handleApplyPalette = (palette: typeof BRANDING_COLOR_PRESETS[0]) => {
    setFormData({
      ...formData,
      color_primary: palette.colors.primary,
      color_secondary: palette.colors.secondary,
      color_accent: palette.colors.accent,
      color_success: palette.colors.success,
      color_error: palette.colors.error,
      color_warning: palette.colors.warning,
      color_info: palette.colors.info,
      color_button: palette.colors.primary,
      color_link: palette.colors.primary,
    });
  };

  if (loading) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Branding' }]}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 size={32} className="animate-spin text-indigo-500" />
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Branding' }]}>
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <Check size={16} /> {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles size={24} className="text-indigo-500" />
            Branding de l'établissement
          </h1>
          <p className="text-sm text-slate-500 mt-1">Personnalisez l'identité visuelle de votre école</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleReset} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-2">
            <RotateCcw size={16} /> Réinitialiser
          </button>
          <button
            onClick={handleSave}
            disabled={saving || Object.keys(formData).length === 0}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Enregistrer
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-2 space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          {activeTab === 'identity' && (
            <div className="space-y-4 max-w-2xl">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Informations de l'établissement</h3>
              <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Nom officiel</label><input type="text" value={data.official_name || ''} onChange={(e) => update('official_name', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Nom commercial</label><input type="text" value={data.commercial_name || ''} onChange={(e) => update('commercial_name', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
                <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Slogan</label><input type="text" value={data.slogan || ''} onChange={(e) => update('slogan', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
              </div>
              <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label><textarea value={data.description || ''} onChange={(e) => update('description', e.target.value)} rows={3} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none resize-none text-slate-900 dark:text-slate-100" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1"><Phone size={12} className="inline mr-1" />Téléphone</label><SmartPhoneInput value={data.phone || ''} onChange={(value) => update('phone', value)} countryCode="CI" /></div>
                <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1"><Mail size={12} className="inline mr-1" />Email</label><input type="email" value={data.email || ''} onChange={(e) => update('email', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1"><MapPin size={12} className="inline mr-1" />Adresse</label><input type="text" value={data.school_address || ''} onChange={(e) => update('school_address', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
                <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1"><Globe size={12} className="inline mr-1" />Site web</label><input type="url" value={data.website || ''} onChange={(e) => update('website', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
              </div>
            </div>
          )}

          {activeTab === 'logo' && (
            <div className="space-y-6 max-w-xl">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Logo officiel</h3>
              <LogoUpload currentUrl={data.logo_url || null} onUpload={handleLogoUpload} label="Logo principal" />
              <LogoUpload currentUrl={data.logo_icon_url || null} onUpload={async (file) => {
                if (!user?.schoolId) return null;
                return sbBranding.uploadLogo(user.schoolId, file, 'logo_icon');
              }} label="Icône (favicon / app icon)" />
              <LogoUpload currentUrl={data.logo_dark_url || null} onUpload={async (file) => {
                if (!user?.schoolId) return null;
                return sbBranding.uploadLogo(user.schoolId, file, 'logo_dark');
              }} label="Logo version sombre (fond sombre)" />
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Couleurs officielles</h3>
              <ColorPalettePicker selectedPalette={BRANDING_COLOR_PRESETS.find(p => p.colors.primary === data.color_primary)?.name || ''} onSelect={handleApplyPalette} />
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Couleurs principales</label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <ColorPicker label="Primaire" value={data.color_primary || '#4F46E5'} onChange={(v) => update('color_primary', v)} />
                  <ColorPicker label="Secondaire" value={data.color_secondary || '#10B981'} onChange={(v) => update('color_secondary', v)} />
                  <ColorPicker label="Accent" value={data.color_accent || '#F59E0B'} onChange={(v) => update('color_accent', v)} />
                  <ColorPicker label="Info" value={data.color_info || '#3B82F6'} onChange={(v) => update('color_info', v)} />
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">États</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <ColorPicker label="Succès" value={data.color_success || '#10B981'} onChange={(v) => update('color_success', v)} />
                  <ColorPicker label="Erreur" value={data.color_error || '#EF4444'} onChange={(v) => update('color_error', v)} />
                  <ColorPicker label="Avertissement" value={data.color_warning || '#F59E0B'} onChange={(v) => update('color_warning', v)} />
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Interface</label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <ColorPicker label="Boutons" value={data.color_button || '#4F46E5'} onChange={(v) => update('color_button', v)} />
                  <ColorPicker label="Liens" value={data.color_link || '#4F46E5'} onChange={(v) => update('color_link', v)} />
                  <ColorPicker label="Titres" value={data.color_title || '#111827'} onChange={(v) => update('color_title', v)} />
                  <ColorPicker label="Texte" value={data.color_text || '#374151'} onChange={(v) => update('color_text', v)} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Typographie</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Police principale</label>
                  <select value={data.font_primary || 'Inter'} onChange={(e) => update('font_primary', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100">
                    {['Inter', 'Poppins', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Nunito', 'Source Sans Pro', 'Raleway', 'Ubuntu'].map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Police secondaire</label>
                  <select value={data.font_secondary || 'Inter'} onChange={(e) => update('font_secondary', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100">
                    {['Inter', 'Poppins', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Merriweather', 'Playfair Display'].map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-600 p-6">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-4">Aperçu</p>
                <div style={{ fontFamily: `'${data.font_primary}', sans-serif` }}>
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: `'${data.font_secondary}', sans-serif` }}>Titre de document</h3>
                  <p className="text-base text-slate-600 dark:text-slate-400">Texte avec la police <strong>{data.font_primary}</strong>. Le bulletin sera affiché avec cette typographie.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'signature' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Signature des documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Nom du Directeur</label><input type="text" value={data.director_name || ''} onChange={(e) => update('director_name', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
                <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Fonction</label><input type="text" value={data.director_title || ''} onChange={(e) => update('director_title', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
              </div>
              <LogoUpload currentUrl={data.signature_url || null} onUpload={handleSignatureUpload} label="Signature numérique" />
              <LogoUpload currentUrl={data.stamp_url || null} onUpload={handleStampUpload} label="Cachet officiel" />
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Aperçu en temps réel</h3>
              {/* Bulletin preview */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden">
                <div className="p-6 text-white" style={{ backgroundColor: data.color_primary }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {data.logo_url && <Image src={data.logo_url} alt="" width={48} height={48} unoptimized className="w-12 h-12 object-contain rounded-lg bg-white/10 p-1" />}
                      <div>
                        <p className="font-bold text-lg">{data.official_name || 'Nom de l\'établissement'}</p>
                        <p className="text-sm opacity-80">{data.slogan || ''}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm opacity-80">
                      <p>{data.school_address || ''}</p>
                      <p>{data.school_city || ''} {data.school_country || ''}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">Bulletin Scolaire — 1er Trimestre 2025-2026</p>
                  <div className="space-y-2">
                    {['Mathématiques', 'Français', 'Anglais', 'Physique-Chimie', 'SVT'].map((subject, i) => (
                      <div key={subject} className="flex items-center justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-700">
                        <span className="text-slate-700 dark:text-slate-300">{subject}</span>
                        <span className="font-bold" style={{ color: data.color_primary }}>{(18 - i * 1.2).toFixed(1)}/20</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-600 flex justify-between">
                    <div className="text-xs text-slate-500">
                      {data.director_name && <p>Le Directeur: <strong>{data.director_name}</strong></p>}
                      {data.director_title && <p className="text-slate-400">{data.director_title}</p>}
                    </div>
                    <div className="text-right">
                      {data.signature_url && <Image src={data.signature_url} alt="Signature" width={160} height={40} unoptimized className="h-10 object-contain" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleLayout>
  );
}
