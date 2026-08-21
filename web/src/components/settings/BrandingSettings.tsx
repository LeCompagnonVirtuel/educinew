'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { sbBranding } from '@/lib/api/domains/branding.service';
import type { SchoolBranding } from '@/types/branding';
import { BRANDING_COLOR_PRESETS } from '@/types/branding';
import Image from 'next/image';
import {
  Palette, Save, Loader2, CheckCircle, AlertTriangle, Upload, Eye, RotateCcw,
  Sun, Moon, Type, FileText, CreditCard, Monitor,
} from 'lucide-react';

export default function BrandingSettings() {
  const { user } = useAuth();
  const { school } = useSchool();
  const [branding, setBranding] = useState<Partial<SchoolBranding>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    loadBranding();
  }, [user?.schoolId]);

  const loadBranding = async () => {
    if (!user?.schoolId) return;
    try {
      const data = await sbBranding.get(user.schoolId);
      if (data) setBranding(data);
    } catch {
      // branding table may not exist yet
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user?.schoolId) return;
    setSaving(true);
    try {
      await sbBranding.update(user.schoolId, branding);
      setToast({ type: 'success', msg: 'Branding enregistré avec succès' });
    } catch (e: any) {
      setToast({ type: 'error', msg: e.message || 'Erreur d\'enregistrement' });
    }
    setSaving(false);
    setTimeout(() => setToast(null), 3000);
  };

  const applyPreset = (preset: typeof BRANDING_COLOR_PRESETS[0]) => {
    setBranding(prev => ({
      ...prev,
      color_primary: preset.colors.primary,
      color_secondary: preset.colors.secondary,
      color_accent: preset.colors.accent,
      color_success: preset.colors.success,
      color_error: preset.colors.error,
      color_warning: preset.colors.warning,
      color_info: preset.colors.info,
      color_button: preset.colors.primary,
      color_button_text: '#FFFFFF',
      color_link: preset.colors.primary,
    }));
  };

  const ColorInput = ({ label, field }: { label: string; field: string }) => (
    <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-slate-200">
      <input type="color" value={branding[field as keyof SchoolBranding] as string || '#4F46E5'}
        onChange={e => setBranding(prev => ({ ...prev, [field]: e.target.value }))}
        className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer" />
      <div className="flex-1">
        <p className="text-xs font-semibold text-slate-900">{label}</p>
        <p className="text-[10px] font-mono text-slate-400">{branding[field as keyof SchoolBranding] as string || '#4F46E5'}</p>
      </div>
    </div>
  );

  if (loading) return <div className="p-8 text-center"><Loader2 size={24} className="animate-spin mx-auto text-slate-400" /></div>;

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

      {/* Color Presets */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Palette size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Palettes prédéfinies
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BRANDING_COLOR_PRESETS.map(preset => (
            <button key={preset.name} onClick={() => applyPreset(preset)}
              className="p-3 rounded-xl border-2 border-slate-200 hover:border-[var(--color-primary,#4F46E5)] transition-all text-left">
              <div className="flex gap-1 mb-2">
                {[preset.colors.primary, preset.colors.secondary, preset.colors.accent].map((c, i) => (
                  <div key={i} className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: c }} />
                ))}
              </div>
              <p className="text-[10px] font-semibold text-slate-700">{preset.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Colors */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Couleurs principales</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ColorInput label="Primaire" field="color_primary" />
          <ColorInput label="Secondaire" field="color_secondary" />
          <ColorInput label="Accentuation" field="color_accent" />
          <ColorInput label="Succès" field="color_success" />
          <ColorInput label="Erreur" field="color_error" />
          <ColorInput label="Avertissement" field="color_warning" />
          <ColorInput label="Information" field="color_info" />
          <ColorInput label="Bouton" field="color_button" />
          <ColorInput label="Texte bouton" field="color_button_text" />
          <ColorInput label="Lien" field="color_link" />
        </div>
      </div>

      {/* UI Colors */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Couleurs de l&apos;interface</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ColorInput label="Carte fond" field="color_card_bg" />
          <ColorInput label="Carte bordure" field="color_card_border" />
          <ColorInput label="Menu fond" field="color_menu_bg" />
          <ColorInput label="Menu texte" field="color_menu_text" />
          <ColorInput label="Menu actif" field="color_menu_active" />
          <ColorInput label="Titre" field="color_title" />
          <ColorInput label="Texte" field="color_text" />
          <ColorInput label="Texte secondaire" field="color_text_muted" />
          <ColorInput label="Icône" field="color_icon" />
          <ColorInput label="Tableau en-tête" field="color_table_header" />
          <ColorInput label="Tableau survol" field="color_table_row_hover" />
          <ColorInput label="Tableau bordure" field="color_table_border" />
          <ColorInput label="Fond tableau de bord" field="color_dashboard_bg" />
          <ColorInput label="Carte tableau de bord" field="color_dashboard_card" />
        </div>
      </div>

      {/* Dark Mode */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Moon size={18} className="text-[var(--color-primary,#4F46E5)]" />
            Mode sombre
          </h3>
          <button onClick={() => setBranding(prev => ({ ...prev, dark_mode_enabled: !prev.dark_mode_enabled }))}
            className={`w-12 h-6 rounded-full transition-colors ${branding.dark_mode_enabled ? 'bg-[var(--color-primary,#4F46E5)]' : 'bg-slate-300'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${branding.dark_mode_enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
        {branding.dark_mode_enabled && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <ColorInput label="Fond" field="dark_bg" />
            <ColorInput label="Surface" field="dark_surface" />
            <ColorInput label="Carte" field="dark_card" />
            <ColorInput label="Texte" field="dark_text" />
            <ColorInput label="Texte secondaire" field="dark_text_muted" />
            <ColorInput label="Bordure" field="dark_border" />
            <ColorInput label="Menu fond" field="dark_menu_bg" />
            <ColorInput label="Menu texte" field="dark_menu_text" />
          </div>
        )}
      </div>

      {/* Typography */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Type size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Typographie
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Police principale</label>
            <select value={branding.font_primary || 'Inter'} onChange={e => setBranding(prev => ({ ...prev, font_primary: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none">
              {['Inter', 'Poppins', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Nunito', 'Source Sans Pro', 'Raleway', 'Ubuntu'].map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Police secondaire (titres)</label>
            <select value={branding.font_secondary || 'Inter'} onChange={e => setBranding(prev => ({ ...prev, font_secondary: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none">
              {['Inter', 'Poppins', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Merriweather', 'Playfair Display'].map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Poids du texte</label>
            <select value={branding.font_weight || '400'} onChange={e => setBranding(prev => ({ ...prev, font_weight: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none">
              {['300', '400', '500', '600'].map(w => <option key={w} value={w}>{w === '300' ? 'Léger' : w === '400' ? 'Normal' : w === '500' ? 'Medium' : 'Semi-gras'} ({w})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Taille de base</label>
            <select value={branding.font_size_base || '16px'} onChange={e => setBranding(prev => ({ ...prev, font_size_base: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none">
              {['12px', '14px', '16px', '18px'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Taille petite</label>
            <select value={branding.font_size_small || '14px'} onChange={e => setBranding(prev => ({ ...prev, font_size_small: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none">
              {['10px', '12px', '14px', '16px'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Taille grande</label>
            <select value={branding.font_size_large || '18px'} onChange={e => setBranding(prev => ({ ...prev, font_size_large: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none">
              {['16px', '18px', '20px', '22px'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Taille titre</label>
            <select value={branding.font_size_title || '24px'} onChange={e => setBranding(prev => ({ ...prev, font_size_title: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none">
              {['20px', '24px', '28px', '32px'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Taille sous-titre</label>
            <select value={branding.font_size_heading || '20px'} onChange={e => setBranding(prev => ({ ...prev, font_size_heading: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none">
              {['16px', '18px', '20px', '22px'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Interligne</label>
            <select value={branding.font_line_height || '1.5'} onChange={e => setBranding(prev => ({ ...prev, font_line_height: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none">
              {['1.2', '1.4', '1.5', '1.6', '1.8', '2.0'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Poids des titres</label>
            <select value={branding.font_heading_weight || '700'} onChange={e => setBranding(prev => ({ ...prev, font_heading_weight: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none">
              {['400', '500', '600', '700', '800', '900'].map(w => <option key={w} value={w}>{w === '400' ? 'Normal' : w === '500' ? 'Medium' : w === '600' ? 'Semi-gras' : w === '700' ? 'Gras' : w === '800' ? 'Extra-gras' : 'Noir'} ({w})</option>)}
            </select>
          </div>
        </div>
        {/* Live typography preview */}
        <div className="mt-4 rounded-xl border border-slate-200 p-5 bg-slate-50">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Aperçu typographie</p>
          <div style={{ fontFamily: `'${branding.font_primary || 'Inter'}', sans-serif`, fontSize: branding.font_size_base || '16px', fontWeight: branding.font_weight || '400', lineHeight: branding.font_line_height || '1.5' }}>
            <h3 className="text-2xl mb-2" style={{ fontFamily: `'${branding.font_secondary || 'Inter'}', sans-serif`, fontWeight: branding.font_heading_weight || '700', fontSize: branding.font_size_title || '24px' }}>
              Titre de document
            </h3>
            <p className="mb-2" style={{ fontSize: branding.font_size_base || '16px' }}>
              Ceci est un exemple de texte avec la police <strong>{branding.font_primary || 'Inter'}</strong>. Le bulletin sera affiché avec cette typographie.
            </p>
            <p style={{ fontSize: branding.font_size_small || '14px', color: '#6B7280' }}>
              Texte secondaire avec la petite taille ({branding.font_size_small || '14px'}).
            </p>
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileText size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Signature officielle
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nom du directeur</label>
            <input type="text" value={branding.director_name || ''} onChange={e => setBranding(prev => ({ ...prev, director_name: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Titre</label>
            <input type="text" value={branding.director_title || ''} onChange={e => setBranding(prev => ({ ...prev, director_title: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none" placeholder="Directeur Général" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Pied de page documents</label>
            <input type="text" value={branding.document_footer || ''} onChange={e => setBranding(prev => ({ ...prev, document_footer: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[var(--color-primary,#4F46E5)] outline-none" placeholder="Mention légale sur les documents officiels" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Signature</label>
            <div className="flex items-center gap-3">
              <div className="w-20 h-12 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden">
                {branding.signature_url ? <Image src={branding.signature_url} alt="Signature" width={80} height={48} unoptimized className="w-full h-full object-contain" /> : <Upload size={14} className="text-slate-400" />}
              </div>
              <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200">Téléverser</button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Cachet</label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden">
                {branding.stamp_url ? <Image src={branding.stamp_url} alt="Cachet" width={48} height={48} unoptimized className="w-full h-full object-contain" /> : <Upload size={14} className="text-slate-400" />}
              </div>
              <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200">Téléverser</button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Eye size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Aperçu en direct
        </h3>
        <div className="rounded-xl p-5 border-2" style={{ backgroundColor: branding.color_dashboard_bg || '#F9FAFB', borderColor: branding.color_card_border || '#E5E7EB' }}>
          <div className="rounded-lg p-4 shadow-sm" style={{ backgroundColor: branding.color_card_bg || '#FFFFFF', border: `1px solid ${branding.color_card_border || '#E5E7EB'}` }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: branding.color_primary || '#4F46E5' }}>
                {school?.sigle || school?.name?.charAt(0) || 'E'}
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: branding.color_title || '#111827' }}>{school?.name || 'Nom école'}</p>
                <p className="text-xs" style={{ color: branding.color_text_muted || '#6B7280' }}>{school?.slogan || 'Votre slogan ici'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{ backgroundColor: branding.color_button || branding.color_primary || '#4F46E5' }}>
                Bouton principal
              </button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium border" style={{ borderColor: branding.color_primary || '#4F46E5', color: branding.color_primary || '#4F46E5' }}>
                Secondaire
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary,#4F46E5)] text-white rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Enregistrer le branding
        </button>
      </div>
    </div>
  );
}
