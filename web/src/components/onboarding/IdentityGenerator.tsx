'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Wand2, RefreshCw, Check, Palette, Type, FileText, QrCode,
  Copy, Sparkles, ChevronDown, ChevronUp,
} from 'lucide-react';

interface IdentityGeneratorProps {
  schoolName: string;
  schoolType: string;
  logoUrl: string;
  onGenerate: (identity: GeneratedIdentity) => void;
}

export interface GeneratedIdentity {
  acronym: string;
  favicon: string;
  palettes: ColorPalette[];
  themes: Theme[];
  signature: string;
  qrCode: string;
  documentTemplates: string[];
  emailTemplates: string[];
}

interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  description: string;
}

interface Theme {
  name: string;
  mode: 'light' | 'dark';
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
}

function generateAcronym(name: string): string {
  if (!name) return '';
  const words = name
    .replace(/['']/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2);
  if (words.length === 0) return name.slice(0, 3).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words.map(w => w[0]).join('').toUpperCase().slice(0, 6);
}

function generateFavicon(acronym: string, primaryColor: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="${primaryColor}"/>
      <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="${acronym.length > 2 ? 18 : 24}"
        fill="white">${acronym}</text>
    </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function generatePalettes(schoolType: string): ColorPalette[] {
  const base = [
    { name: 'Professionnel', primary: '#1E40AF', secondary: '#059669', accent: '#D97706',
      description: 'Bleu professionnel avec accents verts — idéal pour les lycées et centres de formation' },
    { name: 'Moderne', primary: '#7C3AED', secondary: '#EC4899', accent: '#F59E0B',
      description: 'Violet moderne avec rose — parfait pour les écoles innovantes' },
    { name: 'Classique', primary: '#1B4D8E', secondary: '#C0392B', accent: '#F39C12',
      description: 'Bleu marine classique avec rouge — traditionnel et élégant' },
    { name: 'Vibrant', primary: '#E11D48', secondary: '#0891B2', accent: '#16A34A',
      description: 'Rouge vibrant avec cyan — dynamique et accrocheur' },
  ];

  if (schoolType === 'MATERNELLE' || schoolType === 'PRIMAIRE') {
    return [
      { name: 'Soleil', primary: '#F59E0B', secondary: '#10B981', accent: '#EF4444',
        description: 'Jaune soleil avec vert — joyeux et coloré pour les jeunes élèves' },
      { name: 'Arc-en-ciel', primary: '#6366F1', secondary: '#F472B6', accent: '#34D399',
        description: 'Indigo avec rose — créatif et stimulant' },
      ...base.slice(0, 2),
    ];
  }

  return base;
}

function generateThemes(palettes: ColorPalette[]): Theme[] {
  return [
    { name: 'Clair', mode: 'light', background: '#F9FAFB', surface: '#FFFFFF',
      text: '#111827', textMuted: '#6B7280', border: '#E5E7EB' },
    { name: 'Sombre', mode: 'dark', background: '#0F172A', surface: '#1E293B',
      text: '#F1F5F9', textMuted: '#94A3B8', border: '#334155' },
  ];
}

function generateSignature(acronym: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60">
      <path d="M10 45 Q30 10, 60 35 T110 30 Q130 25, 150 40" stroke="#1E40AF" stroke-width="2"
        fill="none" stroke-linecap="round"/>
      <text x="160" y="38" font-family="Inter, system-ui, sans-serif" font-size="14"
        font-weight="600" fill="#1E40AF">${acronym}</text>
    </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function generateQRCode(acronym: string): string {
  const size = 12;
  const modules: boolean[][] = [];
  for (let y = 0; y < size; y++) {
    modules[y] = [];
    for (let x = 0; x < size; x++) {
      if (x < 3 && y < 3) modules[y][x] = true;
      else if (x >= size - 3 && y < 3) modules[y][x] = true;
      else if (x < 3 && y >= size - 3) modules[y][x] = true;
      else modules[y][x] = Math.random() > 0.55;
    }
  }

  const cellSize = 8;
  const margin = 16;
  const total = size * cellSize + margin * 2;

  let rects = '';
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (modules[y][x]) {
        rects += `<rect x="${margin + x * cellSize}" y="${margin + y * cellSize}" width="${cellSize}" height="${cellSize}" rx="1" fill="#111"/>`;
      }
    }
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="${total}" viewBox="0 0 ${total} ${total}">
      <rect width="${total}" height="${total}" rx="8" fill="white"/>
      ${rects}
      <rect x="${total / 2 - 12}" y="${total / 2 - 10}" width="24" height="20" rx="4" fill="white"/>
      <text x="${total / 2}" y="${total / 2 + 2}" text-anchor="middle" font-family="Inter, system-ui, sans-serif"
        font-size="9" font-weight="700" fill="#111">${acronym}</text>
    </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function IdentityGenerator({ schoolName, schoolType, logoUrl, onGenerate }: IdentityGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedIdentity | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<number>(0);
  const [selectedTheme, setSelectedTheme] = useState<number>(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('acronym');

  const acronym = useMemo(() => generateAcronym(schoolName), [schoolName]);

  const generate = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      const palettes = generatePalettes(schoolType);
      const themes = generateThemes(palettes);

      const identity: GeneratedIdentity = {
        acronym,
        favicon: generateFavicon(acronym, palettes[selectedPalette].primary),
        palettes,
        themes,
        signature: generateSignature(acronym),
        qrCode: generateQRCode(acronym),
        documentTemplates: [
          'Bulletin scolaire',
          'Certificat de scolarité',
          'Attestation',
          'Convocation',
          'Réception',
        ],
        emailTemplates: [
          'Bienvenue',
          'Bulletin disponible',
          'Rappel de paiement',
          'Convocation parent',
          'Annonce',
        ],
      };

      setGenerated(identity);
      setIsGenerating(false);
      onGenerate(identity);
    }, 1200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolType, acronym, selectedPalette, onGenerate]);

  useEffect(() => {
    if (schoolName && schoolType) {
      generate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolName, schoolType]);

  const handleCopy = async (field: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500);
    } catch {}
  };

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const currentPalette = generated?.palettes[selectedPalette];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Wand2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Générateur d&apos;identité</h3>
            <p className="text-[11px] text-gray-500">Automatique basé sur les informations saisies</p>
          </div>
        </div>
        <button
          onClick={generate}
          disabled={isGenerating || !schoolName}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          Régénérer
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isGenerating ? (
          <motion.div key="loading" {...fadeInUp} className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
              <Sparkles className="w-5 h-5 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="text-xs text-gray-500">Génération en cours...</span>
          </motion.div>
        ) : generated ? (
          <motion.div key="result" {...fadeInUp} className="space-y-3">

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('acronym')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-medium text-gray-700">Acronyme</span>
                </div>
                {expandedSection === 'acronym' ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === 'acronym' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 flex items-center gap-3">
                      <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                        <span className="text-lg font-bold text-gray-900 tracking-wider">{acronym}</span>
                        <span className="text-[10px] text-gray-400 ml-2">· {schoolName}</span>
                      </div>
                      <button
                        onClick={() => handleCopy('acronym', acronym)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {copiedField === 'acronym' ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('favicon')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[6px] font-bold text-white">F</div>
                  <span className="text-xs font-medium text-gray-700">Favicon</span>
                </div>
                {expandedSection === 'favicon' ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === 'favicon' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center p-1">
                        <Image src={generated.favicon} alt="Favicon" width={40} height={40} unoptimized className="w-full h-full" />
                      </div>
                      <div className="flex-1 text-[10px] text-gray-400">
                        Généré à partir de l&apos;acronyme et de la couleur principale
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('palette')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-pink-500" />
                  <span className="text-xs font-medium text-gray-700">Palettes de couleurs</span>
                  <span className="text-[10px] text-gray-400">({generated.palettes.length} options)</span>
                </div>
                {expandedSection === 'palette' ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === 'palette' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 space-y-2">
                      {generated.palettes.map((palette, i) => (
                        <button
                          key={palette.name}
                          onClick={() => setSelectedPalette(i)}
                          className={`w-full text-left rounded-lg p-2.5 border-2 transition-all duration-200 ${
                            selectedPalette === i
                              ? 'border-indigo-500 bg-indigo-50/50 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="flex -space-x-1">
                              {[palette.primary, palette.secondary, palette.accent].map((c, ci) => (
                                <div key={ci} className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                                  style={{ backgroundColor: c }} />
                              ))}
                            </div>
                            <span className="text-[11px] font-medium text-gray-700">{palette.name}</span>
                            {selectedPalette === i && (
                              <Check className="w-3.5 h-3.5 text-indigo-500 ml-auto" />
                            )}
                          </div>
                          <p className="text-[10px] text-gray-400 leading-relaxed">{palette.description}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('qr')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-medium text-gray-700">QR Code</span>
                </div>
                {expandedSection === 'qr' ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === 'qr' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center p-1">
                        <Image src={generated.qrCode} alt="QR Code" width={56} height={56} unoptimized className="w-full h-full" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] text-gray-500">educi.live/{acronym.toLowerCase()}</div>
                        <div className="text-[9px] text-gray-400 mt-0.5">QR code pour l&apos;inscription rapide</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('templates')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium text-gray-700">Modèles générés</span>
                </div>
                {expandedSection === 'templates' ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === 'templates' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3">
                      <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Documents</div>
                      <div className="space-y-1 mb-3">
                        {generated.documentTemplates.map((tpl) => (
                          <div key={tpl} className="flex items-center gap-2 px-2 py-1.5 rounded bg-gray-50 text-[11px] text-gray-600">
                            <Check className="w-3 h-3 text-green-500 shrink-0" />
                            {tpl}
                          </div>
                        ))}
                      </div>
                      <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Emails</div>
                      <div className="space-y-1">
                        {generated.emailTemplates.map((tpl) => (
                          <div key={tpl} className="flex items-center gap-2 px-2 py-1.5 rounded bg-gray-50 text-[11px] text-gray-600">
                            <Check className="w-3 h-3 text-blue-500 shrink-0" />
                            {tpl}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        ) : (
          <motion.div key="empty" {...fadeInUp} className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Wand2 className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">
              Saisissez le nom de l&apos;établissement pour générer automatiquement son identité
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
