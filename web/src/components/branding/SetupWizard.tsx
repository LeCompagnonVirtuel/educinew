'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import {
  Building2, Upload, Palette, Type, PenTool, Eye, Check,
  ChevronRight, ChevronLeft, Loader2, Globe, Phone, Mail,
  MapPin, Facebook, Instagram, Twitter, Linkedin, Sparkles,
  GraduationCap, FileText, CreditCard, Award
} from 'lucide-react';
import { useBranding } from './BrandingProvider';
import LogoUpload from './LogoUpload';
import ColorPicker, { ColorPalettePicker } from './ColorPicker';
import { BRANDING_COLOR_PRESETS, DEFAULT_BRANDING } from '@/types/branding';
import type { SchoolBranding } from '@/types/branding';
import { sbBranding } from '@/lib/api/domains/branding.service';
import { useAuth } from '@/hooks/useAuth';

const STEPS = [
  { id: 'identity', label: 'Identité', icon: Building2, description: 'Informations de l\'établissement' },
  { id: 'logo', label: 'Logo', icon: Upload, description: 'Logo officiel' },
  { id: 'colors', label: 'Couleurs', icon: Palette, description: 'Palette de couleurs' },
  { id: 'typography', label: 'Typographie', icon: Type, description: 'Police et styles' },
  { id: 'signature', label: 'Signature', icon: PenTool, description: 'Directeur et cachet' },
  { id: 'preview', label: 'Aperçu', icon: Eye, description: 'Vérification finale' },
];

interface SetupWizardProps {
  onComplete: () => void;
}

export default function SetupWizard({ onComplete }: SetupWizardProps) {
  const { user } = useAuth();
  const { branding, updateBranding } = useBranding();
  const [currentStep, setCurrentStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<SchoolBranding>>({
    official_name: branding?.official_name || '',
    commercial_name: branding?.commercial_name || '',
    slogan: branding?.slogan || '',
    motto: branding?.motto || '',
    description: branding?.description || '',
    phone: branding?.phone || '',
    email: branding?.email || '',
    website: branding?.website || '',
    social_media: branding?.social_media || {},
    color_primary: branding?.color_primary || DEFAULT_BRANDING.color_primary,
    color_secondary: branding?.color_secondary || DEFAULT_BRANDING.color_secondary,
    color_accent: branding?.color_accent || DEFAULT_BRANDING.color_accent,
    font_primary: branding?.font_primary || 'Inter',
    director_name: branding?.director_name || '',
    director_title: branding?.director_title || 'Directeur/Directrice',
  });

  const update = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

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

  const handleSaveAndNext = async () => {
    setSaving(true);
    try {
      await updateBranding(formData);
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Final step - mark setup as completed
        if (user?.schoolId) {
          await sbBranding.updateSetupStep(user.schoolId, currentStep, true);
        }
        onComplete();
      }
    } catch (err) {
      console.error('[SetupWizard]', err);
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSkip = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleApplyPalette = (palette: typeof BRANDING_COLOR_PRESETS[0]) => {
    setFormData(prev => ({
      ...prev,
      color_primary: palette.colors.primary,
      color_secondary: palette.colors.secondary,
      color_accent: palette.colors.accent,
      color_success: palette.colors.success,
      color_error: palette.colors.error,
      color_warning: palette.colors.warning,
      color_info: palette.colors.info,
      color_button: palette.colors.primary,
      color_link: palette.colors.primary,
    }));
  };

  const step = STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6 text-white flex-shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Configuration de votre établissement</h1>
              <p className="text-indigo-200 text-sm">Personnalisez l'identité visuelle de votre école</p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                  i < currentStep ? 'bg-emerald-400 text-emerald-900' :
                  i === currentStep ? 'bg-white text-indigo-600' :
                  'bg-white/20 text-white/60'
                }`}>
                  {i < currentStep ? <Check size={14} /> : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 rounded-full ${i < currentStep ? 'bg-emerald-400' : 'bg-white/20'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <step.icon size={20} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">{step.label}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{step.description}</p>
              </div>
            </div>

            {/* Step 1: Identity */}
            {step.id === 'identity' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Nom officiel *</label>
                  <input
                    type="text"
                    value={formData.official_name || ''}
                    onChange={(e) => update('official_name', e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-slate-100"
                    placeholder="Lycée Moderne d'Abidjan"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Nom commercial</label>
                    <input type="text" value={formData.commercial_name || ''} onChange={(e) => update('commercial_name', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" placeholder="LMA" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Slogan</label>
                    <input type="text" value={formData.slogan || ''} onChange={(e) => update('slogan', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" placeholder="L'excellence au service de l'éducation" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                  <textarea value={formData.description || ''} onChange={(e) => update('description', e.target.value)} rows={3} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none resize-none text-slate-900 dark:text-slate-100" placeholder="Description courte de l'établissement..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1"><Phone size={12} className="inline mr-1" />Téléphone</label>
                    <SmartPhoneInput value={formData.phone || ''} onChange={(value) => update('phone', value)} countryCode="CI" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1"><Mail size={12} className="inline mr-1" />Email</label>
                    <input type="email" value={formData.email || ''} onChange={(e) => update('email', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" placeholder="contact@ecole.ci" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1"><MapPin size={12} className="inline mr-1" />Adresse</label>
                    <input type="text" value={formData.school_address || ''} onChange={(e) => update('school_address', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" placeholder="Boulevard de la République" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1"><Globe size={12} className="inline mr-1" />Site web</label>
                    <input type="url" value={formData.website || ''} onChange={(e) => update('website', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" placeholder="https://www.ecole.ci" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Logo */}
            {step.id === 'logo' && (
              <div className="space-y-6">
                <LogoUpload
                  currentUrl={formData.logo_url || null}
                  onUpload={handleLogoUpload}
                  label="Logo officiel de l'établissement"
                />
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-400">
                  <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Le logo sera utilisé sur :</p>
                  <div className="grid grid-cols-2 gap-1">
                    {['Bulletins', 'Cartes scolaires', 'Factures', 'Reçus', 'Attestations', 'Diplômes', 'Emploi du temps', 'PDF', 'Emails', 'Dashboard', 'Application mobile', 'Portail Parents'].map(item => (
                      <div key={item} className="flex items-center gap-1.5 text-xs">
                        <Check size={10} className="text-emerald-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Colors */}
            {step.id === 'colors' && (
              <div className="space-y-6">
                <ColorPalettePicker
                  selectedPalette={BRANDING_COLOR_PRESETS.find(p =>
                    p.colors.primary === formData.color_primary
                  )?.name || ''}
                  onSelect={handleApplyPalette}
                />
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Couleurs personnalisées</label>
                  <div className="grid grid-cols-3 gap-3">
                    <ColorPicker label="Primaire" value={formData.color_primary || '#4F46E5'} onChange={(v) => update('color_primary', v)} />
                    <ColorPicker label="Secondaire" value={formData.color_secondary || '#10B981'} onChange={(v) => update('color_secondary', v)} />
                    <ColorPicker label="Accent" value={formData.color_accent || '#F59E0B'} onChange={(v) => update('color_accent', v)} />
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <ColorPicker label="Succès" value={formData.color_success || '#10B981'} onChange={(v) => update('color_success', v)} />
                    <ColorPicker label="Erreur" value={formData.color_error || '#EF4444'} onChange={(v) => update('color_error', v)} />
                    <ColorPicker label="Avertissement" value={formData.color_warning || '#F59E0B'} onChange={(v) => update('color_warning', v)} />
                    <ColorPicker label="Info" value={formData.color_info || '#3B82F6'} onChange={(v) => update('color_info', v)} />
                  </div>
                </div>
                {/* Live color preview */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-600 p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Aperçu en direct</p>
                  <div className="flex gap-2 flex-wrap">
                    <div className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: formData.color_primary }}>Bouton Primaire</div>
                    <div className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: formData.color_secondary }}>Bouton Secondaire</div>
                    <div className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: formData.color_accent }}>Accent</div>
                    <div className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: formData.color_success + '20', color: formData.color_success }}>Succès</div>
                    <div className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: formData.color_error + '20', color: formData.color_error }}>Erreur</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Typography */}
            {step.id === 'typography' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Police principale</label>
                    <select value={formData.font_primary || 'Inter'} onChange={(e) => update('font_primary', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100">
                      {['Inter', 'Poppins', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Nunito', 'Source Sans Pro', 'Raleway', 'Ubuntu'].map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Police secondaire</label>
                    <select value={formData.font_secondary || 'Inter'} onChange={(e) => update('font_secondary', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100">
                      {['Inter', 'Poppins', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Merriweather', 'Playfair Display'].map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Live typography preview */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-600 p-6">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-4">Aperçu typographie</p>
                  <div style={{ fontFamily: `'${formData.font_primary}', sans-serif` }}>
                    <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: `'${formData.font_secondary}', sans-serif` }}>
                      Titre de document
                    </h3>
                    <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                      Ceci est un exemple de texte avec la police <strong>{formData.font_primary}</strong>. Le bulletin sera affiché avec cette typographie.
                    </p>
                    <p className="text-sm text-slate-500">
                      Police secondaire: <em>{formData.font_secondary}</em> — Utilisée pour les sous-titres et descriptions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Signature */}
            {step.id === 'signature' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Nom du Directeur</label>
                    <input type="text" value={formData.director_name || ''} onChange={(e) => update('director_name', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" placeholder="Dr. Koné Amadou" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Fonction</label>
                    <input type="text" value={formData.director_title || ''} onChange={(e) => update('director_title', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" placeholder="Directeur/Directrice" />
                  </div>
                </div>
                <LogoUpload currentUrl={formData.signature_url || null} onUpload={handleSignatureUpload} label="Signature numérique" />
                <LogoUpload currentUrl={formData.stamp_url || null} onUpload={handleStampUpload} label="Cachet officiel" />
              </div>
            )}

            {/* Step 6: Preview */}
            {step.id === 'preview' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: formData.color_primary }}>
                      <GraduationCap size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-200">{formData.official_name || 'Nom de l\'établissement'}</h3>
                      <p className="text-sm text-slate-500">{formData.slogan || 'Slogan de l\'établissement'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-slate-400 mb-1">Primaire</p>
                      <div className="w-full h-6 rounded" style={{ backgroundColor: formData.color_primary }} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-slate-400 mb-1">Secondaire</p>
                      <div className="w-full h-6 rounded" style={{ backgroundColor: formData.color_secondary }} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-slate-400 mb-1">Accent</p>
                      <div className="w-full h-6 rounded" style={{ backgroundColor: formData.color_accent }} />
                    </div>
                  </div>
                </div>

                {/* Mini bulletin preview */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden">
                  <div className="p-4 text-white" style={{ backgroundColor: formData.color_primary }}>
                    <div className="flex items-center gap-2">
                      {formData.logo_url && <Image src={formData.logo_url} alt="" width={32} height={32} unoptimized className="w-8 h-8 object-contain" />}
                      <div>
                        <p className="font-bold text-sm">{formData.official_name || 'École'}</p>
                        <p className="text-xs opacity-80">{formData.slogan || ''}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-slate-400 mb-2">Aperçu du bulletin</p>
                    <div className="space-y-2">
                      {['Mathématiques', 'Français', 'Anglais'].map((subject, i) => (
                        <div key={subject} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700 dark:text-slate-300">{subject}</span>
                          <span className="font-bold" style={{ color: formData.color_primary }}>{(16 - i * 1.5).toFixed(1)}/20</span>
                        </div>
                      ))}
                    </div>
                    {formData.director_name && (
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500">
                        <p>Le Directeur: <strong>{formData.director_name}</strong></p>
                        {formData.director_title && <p className="text-slate-400">{formData.director_title}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 flex items-center justify-between flex-shrink-0">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Retour
          </button>

          <div className="flex items-center gap-3">
            <button onClick={handleSkip} className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400">
              Passer
            </button>
            <button
              onClick={handleSaveAndNext}
              disabled={saving}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : currentStep === STEPS.length - 1 ? <Check size={16} /> : <ChevronRight size={16} />}
              {currentStep === STEPS.length - 1 ? 'Terminer' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
