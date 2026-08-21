'use client';

import { useState, useRef } from 'react';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import StepCard from '@/components/onboarding/StepCard';
import Image from 'next/image';
import { Upload, Palette, Eye, Stamp, PenTool, Monitor, Smartphone } from 'lucide-react';
import { BRANDING_COLOR_PRESETS } from '@/types/branding';

const inputClass = (field: string, focused: string) =>
  `w-full px-4 py-3.5 bg-white rounded-xl border-2 transition-all duration-300 outline-none text-slate-900 text-[15px]
   ${focused === field ? 'border-[#4F46E5] bg-white shadow-sm shadow-[#4F46E5]/5' : 'border-slate-200 hover:border-slate-300'}`;

const labelClass = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2';

function FileUpload({ label, currentUrl, onUpload, accept = 'image/*', compact = false }: { label: string; currentUrl: string; onUpload: (url: string) => void; accept?: string; compact?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpload(url);
    }
  };

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed border-slate-200 rounded-xl text-center cursor-pointer hover:border-[#4F46E5]/50 hover:bg-[#4F46E5]/5 transition-all duration-300 ${compact ? 'p-3' : 'p-5'}`}
      >
        {currentUrl ? (
          <Image src={currentUrl} alt={label} width={compact ? 80 : 112} height={compact ? 40 : 56} unoptimized className={`${compact ? 'h-10' : 'h-14'} mx-auto object-contain`} />
        ) : (
          <>
            <Upload size={compact ? 18 : 22} className="text-slate-400 mx-auto mb-1.5" />
            <p className="text-[10px] text-slate-500">Importer</p>
          </>
        )}
      </div>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleFile} />
    </div>
  );
}

export default function StepBranding() {
  const { data, updateBranding, nextStep } = useOnboarding();
  const [focused, setFocused] = useState('');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <StepCard
      title="Identité visuelle"
      subtitle="Personnalisez l'apparence de votre plateforme. Le branding sera propagé partout : web, mobile, emails, bulletins, badges."
      icon="🎨"
      onNext={nextStep}
    >
      <div className="space-y-6">
        {/* Logos */}
        <div>
          <p className={labelClass}>Logos & Images</p>
          <div className="grid grid-cols-3 gap-3">
            <FileUpload label="Logo principal" currentUrl={data.branding.logoUrl} onUpload={(url) => updateBranding({ logoUrl: url })} />
            <FileUpload label="Logo monochrome" currentUrl={data.branding.logoMonoUrl} onUpload={(url) => updateBranding({ logoMonoUrl: url })} />
            <FileUpload label="Favicon / Icône" currentUrl={data.branding.faviconUrl} onUpload={(url) => updateBranding({ faviconUrl: url })} />
          </div>
        </div>

        {/* Official documents */}
        <div>
          <p className={labelClass}>Documents officiels</p>
          <div className="grid grid-cols-3 gap-3">
            <FileUpload label="Tampon officiel" currentUrl={data.branding.stampUrl} onUpload={(url) => updateBranding({ stampUrl: url })} compact />
            <FileUpload label="Signature Directeur" currentUrl={data.branding.signatureUrl} onUpload={(url) => updateBranding({ signatureUrl: url })} compact />
            <FileUpload label="Signature numérique" currentUrl={data.branding.digitalSignatureUrl} onUpload={(url) => updateBranding({ digitalSignatureUrl: url })} compact />
          </div>
        </div>

        {/* Identity Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Nom affiché</label>
            <input
              value={data.branding.displayName}
              onChange={(e) => updateBranding({ displayName: e.target.value })}
              onFocus={() => setFocused('display')} onBlur={() => setFocused('')}
              className={inputClass('display', focused)}
              placeholder="Lycée Moderne de Cocody"
            />
          </div>
          <div>
            <label className={labelClass}>Slogan</label>
            <input
              value={data.branding.slogan}
              onChange={(e) => updateBranding({ slogan: e.target.value })}
              onFocus={() => setFocused('slogan')} onBlur={() => setFocused('')}
              className={inputClass('slogan', focused)}
              placeholder="L'excellence au service de l'éducation"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Devise</label>
            <input
              value={data.branding.motto}
              onChange={(e) => updateBranding({ motto: e.target.value })}
              onFocus={() => setFocused('motto')} onBlur={() => setFocused('')}
              className={inputClass('motto', focused)}
              placeholder="Savoir · Discipline · Progrès"
            />
          </div>
          <div>
            <label className={labelClass}>Typographie</label>
            <select
              value={data.branding.typography}
              onChange={(e) => updateBranding({ typography: e.target.value })}
              className={inputClass('typo', focused)}
              onFocus={() => setFocused('typo')} onBlur={() => setFocused('')}
            >
              <option value="Inter">Inter</option>
              <option value="Poppins">Poppins</option>
              <option value="Nunito">Nunito</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={data.branding.description}
            onChange={(e) => updateBranding({ description: e.target.value })}
            onFocus={() => setFocused('desc')} onBlur={() => setFocused('')}
            className={inputClass('desc', focused) + ' min-h-[70px] resize-none'}
            placeholder="Description courte de votre établissement..."
          />
        </div>

        {/* Color Presets */}
        <div>
          <label className={labelClass}>Palettes prédéfinies</label>
          <div className="grid grid-cols-4 gap-2">
            {BRANDING_COLOR_PRESETS.slice(0, 8).map((preset) => (
              <button
                key={preset.name}
                onClick={() => updateBranding({
                  primaryColor: preset.colors.primary,
                  secondaryColor: preset.colors.secondary,
                  accentColor: preset.colors.accent,
                  buttonColor: preset.colors.primary,
                })}
                className={`p-2.5 rounded-xl border-2 text-left transition-all ${
                  data.branding.primaryColor === preset.colors.primary
                    ? 'border-[#4F46E5] bg-[#4F46E5]/5 shadow-sm'
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex gap-1 mb-1.5">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.colors.primary }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.colors.secondary }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.colors.accent }} />
                </div>
                <p className="text-[9px] font-semibold text-slate-600 truncate">{preset.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div>
          <label className={labelClass}>Couleurs personnalisées</label>
          <div className="grid grid-cols-5 gap-2">
            {[
              { key: 'primaryColor', label: 'Primaire' },
              { key: 'secondaryColor', label: 'Secondaire' },
              { key: 'accentColor', label: 'Accent' },
              { key: 'buttonColor', label: 'Boutons' },
              { key: 'dashboardColor', label: 'Fond' },
            ].map(({ key, label }) => (
              <div key={key} className="text-center">
                <input
                  type="color"
                  value={(data.branding as any)[key]}
                  onChange={(e) => updateBranding({ [key]: e.target.value })}
                  className="w-full h-9 rounded-lg cursor-pointer border border-slate-200"
                />
                <p className="text-[9px] text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div>
          <label className={labelClass}>Thème</label>
          <div className="flex gap-2">
            {['light', 'dark'].map((t) => (
              <button
                key={t}
                onClick={() => updateBranding({ theme: t })}
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  data.branding.theme === t
                    ? 'border-[#4F46E5] bg-[#4F46E5]/5 text-[#4F46E5]'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                {t === 'light' ? '☀️ Clair' : '🌙 Sombre'}
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={labelClass + ' mb-0'}>
              <Eye size={12} className="inline mr-1" /> Aperçu en direct
            </label>
            <div className="flex gap-1">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-1.5 rounded-lg ${previewMode === 'desktop' ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'text-slate-400'}`}
              >
                <Monitor size={14} />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-1.5 rounded-lg ${previewMode === 'mobile' ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'text-slate-400'}`}
              >
                <Smartphone size={14} />
              </button>
            </div>
          </div>

          <div className={`rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 ${previewMode === 'mobile' ? 'max-w-[280px] mx-auto' : ''}`} style={{ fontFamily: data.branding.typography }}>
            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3 border-b" style={{ backgroundColor: data.branding.theme === 'dark' ? '#1a1a2e' : '#ffffff' }}>
              {data.branding.logoUrl ? (
                <Image src={data.branding.logoUrl} alt="" width={28} height={28} unoptimized className="object-contain" />
              ) : (
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: data.branding.primaryColor }}>
                  <span className="text-[10px] font-bold text-white">{(data.branding.displayName || 'E')[0]}</span>
                </div>
              )}
              <div>
                <p className="font-bold text-[11px]" style={{ color: data.branding.theme === 'dark' ? '#fff' : data.branding.primaryColor }}>
                  {data.branding.displayName || data.school.officialName || 'Mon établissement'}
                </p>
                {data.branding.slogan && (
                  <p className="text-[8px]" style={{ color: data.branding.theme === 'dark' ? '#888' : '#999' }}>{data.branding.slogan}</p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4" style={{ backgroundColor: data.branding.dashboardColor }}>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {['Élèves', 'Enseignants', 'Classes'].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg p-2 border border-slate-100 text-center">
                    <p className="text-lg font-bold" style={{ color: data.branding.primaryColor }}>{[128, 24, 8][i]}</p>
                    <p className="text-[8px] text-slate-500">{item}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg text-[10px] font-semibold text-white" style={{ backgroundColor: data.branding.buttonColor }}>
                  Action
                </button>
                <button className="px-3 py-1.5 rounded-lg text-[10px] font-semibold border" style={{ borderColor: data.branding.primaryColor, color: data.branding.primaryColor }}>
                  Secondaire
                </button>
                <div className="ml-auto w-5 h-5 rounded-full" style={{ backgroundColor: data.branding.accentColor }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StepCard>
  );
}
