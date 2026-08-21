'use client';

import { useRegistration } from '@/components/registration/RegistrationContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Palette, Eye, Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

const colorPresets = [
  { name: 'Indigo', primary: '#4F46E5', secondary: '#10B981' },
  { name: 'Bleu', primary: '#2563EB', secondary: '#06B6D4' },
  { name: 'Violet', primary: '#7C3AED', secondary: '#EC4899' },
  { name: 'Vert', primary: '#059669', secondary: '#F59E0B' },
  { name: 'Rouge', primary: '#DC2626', secondary: '#F97316' },
  { name: 'Orange', primary: '#EA580C', secondary: '#8B5CF6' },
];

const fonts = ['Inter', 'Poppins', 'Roboto', 'Open Sans', 'Montserrat', 'Lato'];

function LogoUploadField({ currentUrl, onUploaded, sessionToken }: { currentUrl: string; onUploaded: (url: string) => void; sessionToken: string }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setError('');
    if (file.size > 2 * 1024 * 1024) { setError('Fichier trop volumineux (max 2MB)'); return; }
    if (!file.type.startsWith('image/')) { setError('Format non supporté'); return; }

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'logo');
      formData.append('sessionToken', sessionToken);
      const res = await fetch('/api/registration/upload-logo', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) { onUploaded(data.url); }
      else { setError(data.error || "Erreur d'upload"); }
    } catch { setError("Erreur d'upload"); }
    setUploading(false);
  }, [onUploaded]);

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Logo de l&apos;établissement</label>
      <div onClick={() => inputRef.current?.click()}
        className="relative cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#4F46E5] transition-all overflow-hidden">
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} className="hidden" />
        {preview ? (
          <div className="relative p-6 flex items-center justify-center bg-white min-h-[120px]">
            <Image src={preview} alt="Logo" width={96} height={96} unoptimized className="max-h-24 max-w-full object-contain" />
            {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Loader2 size={24} className="animate-spin text-[#4F46E5]" /></div>}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="px-3 py-1.5 bg-white/90 rounded-lg text-xs font-medium text-slate-700 shadow-lg">Changer le logo</div>
            </div>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
              <ImageIcon size={24} className="text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-700">Glissez-déposez ou cliquez</p>
            <p className="text-xs text-slate-400 mt-1">PNG, SVG, JPG, WebP — Max 2MB</p>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-red-500 flex items-center gap-1"><X size={12} /> {error}</p>}
      <p className="mt-1 text-[10px] text-slate-400">Utilisé pour les bulletins, factures, reçus et documents officiels</p>
    </div>
  );
}

export default function StepBranding() {
  const { data, updateBranding, nextStep, prevStep, sessionToken } = useRegistration();
  const b = data.branding;

  const inputClass = 'w-full px-4 py-3.5 bg-white rounded-xl border-2 border-slate-200 focus:border-[#4F46E5] hover:border-slate-300 transition-all duration-200 outline-none text-slate-900 text-sm';

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Identité visuelle</h2>
        <p className="text-sm text-slate-500">Personnalisez l'apparence de votre espace.</p>
      </div>

      {/* Logo upload */}
      <LogoUploadField currentUrl={b.logoUrl} onUploaded={(url) => updateBranding({ logoUrl: url })} sessionToken={sessionToken} />

      {/* Color presets */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Palette de couleurs</label>
        <div className="grid grid-cols-3 gap-3">
          {colorPresets.map(preset => (
            <button key={preset.name} onClick={() => updateBranding({ primaryColor: preset.primary, secondaryColor: preset.secondary })}
              className={`p-3 rounded-xl border-2 transition-all ${b.primaryColor === preset.primary ? 'border-[#4F46E5] bg-[#4F46E5]/5' : 'border-slate-100 hover:border-slate-200'}`}>
              <div className="flex gap-1.5 mb-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.primary }} />
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.secondary }} />
              </div>
              <p className="text-xs font-medium text-slate-700">{preset.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom colors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Principale</label>
          <div className="flex gap-2">
            <input type="color" value={b.primaryColor} onChange={e => updateBranding({ primaryColor: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer border-0" />
            <input value={b.primaryColor} onChange={e => updateBranding({ primaryColor: e.target.value })} className={inputClass + ' flex-1 text-xs font-mono'} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Secondaire</label>
          <div className="flex gap-2">
            <input type="color" value={b.secondaryColor} onChange={e => updateBranding({ secondaryColor: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer border-0" />
            <input value={b.secondaryColor} onChange={e => updateBranding({ secondaryColor: e.target.value })} className={inputClass + ' flex-1 text-xs font-mono'} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Accent</label>
          <div className="flex gap-2">
            <input type="color" value={b.accentColor} onChange={e => updateBranding({ accentColor: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer border-0" />
            <input value={b.accentColor} onChange={e => updateBranding({ accentColor: e.target.value })} className={inputClass + ' flex-1 text-xs font-mono'} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Thème</label>
          <select value={b.theme} onChange={e => updateBranding({ theme: e.target.value })} className={inputClass}>
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>

      {/* Typography */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Typographie</label>
        <div className="grid grid-cols-3 gap-3">
          {fonts.map(font => (
            <button key={font} onClick={() => updateBranding({ typography: font })}
              className={`p-3 rounded-xl border-2 transition-all ${b.typography === font ? 'border-[#4F46E5] bg-[#4F46E5]/5' : 'border-slate-100 hover:border-slate-200'}`}>
              <p className="text-sm font-medium text-slate-700" style={{ fontFamily: font }}>{font}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Text fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Slogan</label>
          <input value={b.slogan} onChange={e => updateBranding({ slogan: e.target.value })} className={inputClass} placeholder="Excellence et discipline" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Devise</label>
          <input value={b.motto} onChange={e => updateBranding({ motto: e.target.value })} className={inputClass} placeholder="Savoir, Vertu, Service" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
        <textarea value={b.description} onChange={e => updateBranding({ description: e.target.value })} className={inputClass + ' min-h-[80px] resize-none'} placeholder="Description de votre établissement..." />
      </div>

      {/* Live preview */}
      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Eye size={12} /> Aperçu</p>
        <div className="rounded-xl overflow-hidden border border-slate-200">
          <div className="p-4" style={{ background: `linear-gradient(135deg, ${b.primaryColor}, ${b.secondaryColor})` }}>
            <p className="text-white font-bold text-lg" style={{ fontFamily: b.typography }}>{data.school.officialName || 'Votre école'}</p>
            {b.slogan && <p className="text-white/80 text-xs mt-1">{b.slogan}</p>}
          </div>
          <div className="p-3 bg-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: b.primaryColor }}>
              {(data.school.acronym || 'E')[0]}
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-700">Tableau de bord</p>
              <p className="text-[10px] text-slate-400">Aperçu du thème</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold" style={{ backgroundColor: b.primaryColor }}>Action</button>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button onClick={prevStep} className="flex-1 py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Retour
        </button>
        <button onClick={nextStep} className="flex-[2] py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all group">
          Continuer <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
