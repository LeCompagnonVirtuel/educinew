'use client';

import { useState, useRef, useCallback } from 'react';
import { Palette, Check, RotateCcw } from 'lucide-react';
import { BRANDING_COLOR_PRESETS } from '@/types/branding';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  presets?: string[];
  className?: string;
}

const DEFAULT_PRESETS = [
  '#4F46E5', '#6366F1', '#8B5CF6', '#A855F7',
  '#EC4899', '#EF4444', '#F97316', '#F59E0B',
  '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9',
  '#3B82F6', '#1D4ED8', '#7C3AED', '#DC2626',
  '#059669', '#0891B2', '#2563EB', '#7C2D12',
];

export default function ColorPicker({
  label,
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  className = '',
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [hexInput, setHexInput] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleHexChange = useCallback((hex: string) => {
    setHexInput(hex);
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(hex);
    }
  }, [onChange]);

  const handleNativeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setHexInput(hex);
    onChange(hex);
  }, [onChange]);

  return (
    <div className={`relative ${className}`}>
      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">{label}</label>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="relative w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all overflow-hidden shadow-sm"
          style={{ backgroundColor: value }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/10 transition-opacity">
            <Palette size={14} className="text-white drop-shadow" />
          </div>
        </button>

        <input
          ref={inputRef}
          type="text"
          value={hexInput}
          onChange={(e) => handleHexChange(e.target.value)}
          onBlur={() => setHexInput(value)}
          className="flex-1 px-3 py-2 text-sm font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-200"
          placeholder="#000000"
        />

        <input
          type="color"
          value={value}
          onChange={handleNativeChange}
          className="w-10 h-10 rounded-lg border-0 cursor-pointer bg-transparent"
          title="Sélecteur de couleur"
        />
      </div>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-2 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-2xl p-3 animate-dropdown-open origin-top">
          <div className="grid grid-cols-10 gap-1.5">
            {presets.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => { onChange(hex); setHexInput(hex); setOpen(false); }}
                className={`w-6 h-6 rounded-lg border-2 transition-all hover:scale-110 ${
                  value === hex ? 'border-slate-800 dark:border-white ring-2 ring-offset-1 ring-slate-400' : 'border-transparent hover:border-slate-300'
                }`}
                style={{ backgroundColor: hex }}
                title={hex}
              >
                {value === hex && <Check size={10} className="text-white drop-shadow" />}
              </button>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value}
                onChange={handleNativeChange}
                className="w-8 h-8 rounded-lg border-0 cursor-pointer"
              />
              <input
                type="text"
                value={hexInput}
                onChange={(e) => handleHexChange(e.target.value)}
                className="flex-1 px-2 py-1.5 text-xs font-mono bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg outline-none text-slate-800 dark:text-slate-200"
                placeholder="#000000"
              />
              <button
                type="button"
                onClick={() => { onChange('#4F46E5'); setHexInput('#4F46E5'); }}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="Réinitialiser"
              >
                <RotateCcw size={12} className="text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ColorPalettePicker({
  selectedPalette,
  onSelect,
}: {
  selectedPalette: string;
  onSelect: (palette: typeof BRANDING_COLOR_PRESETS[0]) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Palettes prédéfinies</label>
      <div className="grid grid-cols-2 gap-3">
        {BRANDING_COLOR_PRESETS.map((palette) => (
          <button
            key={palette.name}
            type="button"
            onClick={() => onSelect(palette)}
            className={`p-3 rounded-xl border-2 text-left transition-all ${
              selectedPalette === palette.name
                ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
            }`}
          >
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{palette.name}</p>
            <div className="flex gap-1">
              {Object.values(palette.colors).slice(0, 5).map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border border-white/50"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
