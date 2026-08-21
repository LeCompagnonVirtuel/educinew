'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Monitor, Smartphone, FileText, CreditCard, Award,
  Receipt, Mail, AppWindow, Palette, ChevronLeft, ChevronRight,
} from 'lucide-react';

interface LivePreviewProps {
  branding: {
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
    slogan: string;
    motto: string;
    displayName: string;
    typography: string;
  };
  schoolName: string;
}

type PreviewTab =
  | 'dashboard' | 'mobile' | 'bulletin' | 'certificate'
  | 'receipt' | 'email' | 'splash' | 'badge';

const PREVIEW_TABS: { id: PreviewTab; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Monitor },
  { id: 'mobile', label: 'App Mobile', icon: Smartphone },
  { id: 'bulletin', label: 'Bulletin', icon: FileText },
  { id: 'certificate', label: 'Certificat', icon: Award },
  { id: 'receipt', label: 'Reçu', icon: Receipt },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'splash', label: 'Splash', icon: AppWindow },
  { id: 'badge', label: 'Badge', icon: CreditCard },
];

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function lighten(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex);
  const nr = Math.min(255, r + amount);
  const ng = Math.min(255, g + amount);
  const nb = Math.min(255, b + amount);
  return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
}

function darken(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex);
  const nr = Math.max(0, r - amount);
  const ng = Math.max(0, g - amount);
  const nb = Math.max(0, b - amount);
  return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
}

function withOpacity(hex: string, opacity: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
  }),
};

function DashboardPreview({ branding, schoolName }: LivePreviewProps) {
  const { primaryColor, secondaryColor } = branding;
  return (
    <div className="w-full h-full flex rounded-lg overflow-hidden border border-gray-200 bg-white">
      <div className="w-[38%] h-full flex flex-col" style={{ backgroundColor: darken(primaryColor, 20) }}>
        <div className="p-3 flex items-center gap-2 border-b" style={{ borderColor: withOpacity('#fff', 0.1) }}>
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
            style={{ backgroundColor: secondaryColor }}>
            {branding.displayName?.[0] || schoolName[0]}
          </div>
          <span className="text-[11px] font-semibold text-white truncate">
            {branding.displayName || schoolName}
          </span>
        </div>
        <div className="flex-1 p-2 space-y-0.5">
          {['Dashboard', 'Élèves', 'Enseignants', 'Notes', 'Bulletins', 'Paiements'].map((item, i) => (
            <div key={item}
              className="flex items-center gap-2 px-2 py-1.5 rounded text-[10px] transition-colors"
              style={{
                backgroundColor: i === 0 ? withOpacity('#fff', 0.15) : 'transparent',
                color: i === 0 ? '#fff' : withOpacity('#fff', 0.6),
              }}>
              <div className="w-1 h-1 rounded-full" style={{
                backgroundColor: i === 0 ? secondaryColor : 'transparent',
              }} />
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col h-full bg-gray-50">
        <div className="h-8 px-3 flex items-center justify-between bg-white border-b border-gray-200">
          <span className="text-[10px] font-medium text-gray-500">Tableau de bord</span>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-gray-200" />
          </div>
        </div>
        <div className="flex-1 p-3 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Élèves', value: '248', icon: '👨‍🎓' },
              { label: 'Enseignants', value: '18', icon: '👩‍🏫' },
              { label: 'Classes', value: '12', icon: '🏫' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                <div className="text-[9px] text-gray-400">{stat.icon} {stat.label}</div>
                <div className="text-[14px] font-bold mt-0.5" style={{ color: primaryColor }}>{stat.value}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
            <div className="text-[9px] font-medium text-gray-500 mb-1">Présences ce mois</div>
            <div className="h-12 flex items-end gap-1">
              {[40, 65, 55, 80, 70, 90, 60, 75, 85, 50, 68, 82].map((h, i) => (
                <div key={i} className="flex-1 rounded-t transition-all duration-500" style={{
                  height: `${h}%`,
                  backgroundColor: i === 10 ? primaryColor : withOpacity(primaryColor, 0.2),
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobilePreview({ branding, schoolName }: LivePreviewProps) {
  const { primaryColor, secondaryColor } = branding;
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-[160px] h-[300px] rounded-[24px] border-4 border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-5 bg-gray-800 rounded-b-xl z-10 flex items-center justify-center">
          <div className="w-8 h-2.5 bg-gray-900 rounded-full" />
        </div>
        <div className="pt-6 h-full flex flex-col" style={{ fontFamily: branding.typography }}>
          <div className="px-3 py-2 flex items-center justify-between" style={{ backgroundColor: primaryColor }}>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded flex items-center justify-center text-[7px] font-bold text-white"
                style={{ backgroundColor: secondaryColor }}>
                {branding.displayName?.[0] || schoolName[0]}
              </div>
              <span className="text-[9px] font-semibold text-white truncate">
                {branding.displayName || schoolName}
              </span>
            </div>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
            </div>
          </div>
          <div className="flex-1 p-2 space-y-2 overflow-hidden">
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { icon: '📊', label: 'Notes' },
                { icon: '📅', label: 'Emploi' },
                { icon: '💰', label: 'Paiement' },
                { icon: '🔔', label: 'Notifs' },
              ].map((item) => (
                <div key={item.label} className="rounded-lg p-2 text-center border border-gray-100 bg-white shadow-sm">
                  <div className="text-[14px]">{item.icon}</div>
                  <div className="text-[7px] text-gray-600 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="rounded-lg p-2 border border-gray-100 bg-white shadow-sm">
              <div className="text-[8px] font-medium text-gray-500">Prochain bulletin</div>
              <div className="text-[10px] font-bold mt-0.5" style={{ color: primaryColor }}>
                Dans 5 jours
              </div>
            </div>
            <div className="rounded-lg p-2" style={{ backgroundColor: withOpacity(primaryColor, 0.05) }}>
              <div className="text-[7px] font-medium" style={{ color: primaryColor }}>
                {branding.slogan || 'Excellence académique'}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around py-2 border-t border-gray-100 bg-white">
            {['🏠', '📚', '💬', '👤'].map((icon, i) => (
              <div key={i} className="text-[12px]" style={{ opacity: i === 0 ? 1 : 0.4 }}>{icon}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BulletinPreview({ branding, schoolName }: LivePreviewProps) {
  const { primaryColor, secondaryColor } = branding;
  return (
    <div className="h-full flex items-center justify-center p-3">
      <div className="w-full max-w-[320px] bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
        <div className="h-2" style={{ backgroundColor: primaryColor }} />
        <div className="p-3 text-center border-b">
          <div className="flex items-center justify-center gap-2 mb-1">
            {branding.logoUrl ? (
              <Image src={branding.logoUrl} alt="Logo" width={24} height={24} unoptimized className="object-contain" />
            ) : (
              <div className="w-6 h-6 rounded flex items-center justify-center text-[8px] font-bold text-white"
                style={{ backgroundColor: primaryColor }}>
                {branding.displayName?.[0] || schoolName[0]}
              </div>
            )}
            <span className="text-[9px] font-bold" style={{ color: primaryColor }}>
              {branding.displayName || schoolName}
            </span>
          </div>
          <div className="text-[11px] font-bold text-gray-800 uppercase">Bulletin Scolaire</div>
          <div className="text-[7px] text-gray-400 mt-0.5">Année 2025-2026 · 1er Trimestre</div>
        </div>
        <div className="p-2 space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[8px]">JD</div>
            <div>
              <div className="text-[9px] font-semibold text-gray-800">Jean Dupont</div>
              <div className="text-[7px] text-gray-400">6ème A · Matricule: STU-001</div>
            </div>
          </div>
          <table className="w-full text-[7px]">
            <thead>
              <tr style={{ backgroundColor: withOpacity(primaryColor, 0.08) }}>
                <th className="text-left p-1 font-medium" style={{ color: primaryColor }}>Matière</th>
                <th className="text-center p-1 font-medium" style={{ color: primaryColor }}>Note</th>
                <th className="text-center p-1 font-medium" style={{ color: primaryColor }}>Moy.</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Mathématiques', note: 17, avg: 14 },
                { name: 'Français', note: 15, avg: 13 },
                { name: 'Anglais', note: 18, avg: 15 },
                { name: 'Histoire', note: 14, avg: 12 },
              ].map((s) => (
                <tr key={s.name} className="border-t border-gray-100">
                  <td className="p-1 text-gray-700">{s.name}</td>
                  <td className="p-1 text-center font-bold" style={{ color: s.note >= 15 ? secondaryColor : primaryColor }}>
                    {s.note}/20
                  </td>
                  <td className="p-1 text-center text-gray-400">{s.avg}/20</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
            <div>
              <div className="text-[7px] text-gray-400">Moyenne générale</div>
              <div className="text-[13px] font-bold" style={{ color: secondaryColor }}>16.00/20</div>
            </div>
            <div className="text-right">
              <div className="text-[7px] text-gray-400">Mention</div>
              <div className="text-[9px] font-bold" style={{ color: secondaryColor }}>Très Bien</div>
            </div>
          </div>
        </div>
        <div className="h-1.5" style={{ backgroundColor: secondaryColor }} />
      </div>
    </div>
  );
}

function CertificatePreview({ branding, schoolName }: LivePreviewProps) {
  const { primaryColor, secondaryColor } = branding;
  return (
    <div className="h-full flex items-center justify-center p-3">
      <div className="w-full max-w-[340px] aspect-[1.41] bg-white rounded-lg border-2 shadow-xl overflow-hidden flex flex-col"
        style={{ borderColor: primaryColor }}>
        <div className="h-3 flex">
          <div className="flex-1" style={{ backgroundColor: primaryColor }} />
          <div className="flex-1" style={{ backgroundColor: secondaryColor }} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2"
            style={{ borderColor: primaryColor, color: primaryColor }}>
            <Award className="w-5 h-5" />
          </div>
          <div className="text-[8px] uppercase tracking-widest text-gray-400 mb-1">Certificat de Réussite</div>
          <div className="text-[13px] font-bold mb-1" style={{ color: primaryColor }}>
            {branding.displayName || schoolName}
          </div>
          <div className="text-[7px] text-gray-400 mb-2 italic">
            {branding.motto || "L'excellence au service de l'éducation"}
          </div>
          <div className="text-[8px] text-gray-600 mb-1">Ce certificat est délivré à</div>
          <div className="text-[14px] font-bold border-b-2 pb-0.5 mb-2" style={{ borderColor: primaryColor, color: '#111' }}>
            Jean Dupont
          </div>
          <div className="text-[7px] text-gray-500 leading-relaxed max-w-[200px]">
            Pour avoir terminé avec succès le cycle d&apos;enseignement général
            avec la mention Très Bien
          </div>
          <div className="flex items-center justify-between w-full mt-4 px-4">
            <div className="text-center">
              <div className="text-[7px] text-gray-400">Le Directeur</div>
              <div className="text-[8px] font-semibold text-gray-600 mt-1">M. Koné</div>
            </div>
            <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: primaryColor }}>
              <div className="text-[6px] font-bold" style={{ color: primaryColor }}>SCEAU</div>
            </div>
            <div className="text-center">
              <div className="text-[7px] text-gray-400">Date</div>
              <div className="text-[8px] font-semibold text-gray-600 mt-1">30/06/2026</div>
            </div>
          </div>
        </div>
        <div className="h-2 flex">
          <div className="flex-1" style={{ backgroundColor: secondaryColor }} />
          <div className="flex-1" style={{ backgroundColor: primaryColor }} />
        </div>
      </div>
    </div>
  );
}

function ReceiptPreview({ branding, schoolName }: LivePreviewProps) {
  const { primaryColor, secondaryColor } = branding;
  return (
    <div className="h-full flex items-center justify-center p-3">
      <div className="w-full max-w-[240px] bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-3 text-center border-b-2 border-dashed" style={{ borderColor: withOpacity(primaryColor, 0.3) }}>
          {branding.logoUrl ? (
            <Image src={branding.logoUrl} alt="Logo" width={32} height={32} unoptimized className="object-contain mx-auto mb-1" />
          ) : (
            <div className="w-8 h-8 rounded mx-auto mb-1 flex items-center justify-center text-[10px] font-bold text-white"
              style={{ backgroundColor: primaryColor }}>
              {branding.displayName?.[0] || schoolName[0]}
            </div>
          )}
          <div className="text-[9px] font-bold" style={{ color: primaryColor }}>
            {branding.displayName || schoolName}
          </div>
          <div className="text-[11px] font-bold mt-1">REÇU DE PAIEMENT</div>
          <div className="text-[7px] text-gray-400">Réf: PAY-2026-0042</div>
        </div>
        <div className="p-3 space-y-1.5 text-[8px]">
          <div className="flex justify-between">
            <span className="text-gray-400">Élève</span>
            <span className="font-medium text-gray-700">Jean Dupont</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Classe</span>
            <span className="font-medium text-gray-700">6ème A</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Motif</span>
            <span className="font-medium text-gray-700">Frais de scolarité</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Période</span>
            <span className="font-medium text-gray-700">1er Trimestre</span>
          </div>
          <div className="border-t border-dashed pt-1.5 mt-1.5 border-gray-200">
            <div className="flex justify-between">
              <span className="text-gray-400">Montant</span>
              <span className="font-medium text-gray-700">150 000 FCFA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Payé</span>
              <span className="font-bold" style={{ color: secondaryColor }}>150 000 FCFA</span>
            </div>
          </div>
          <div className="text-center text-[7px] text-gray-400 mt-2 pt-2 border-t border-dashed border-gray-200">
            {branding.slogan || 'Merci pour votre confiance'}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailPreview({ branding, schoolName }: LivePreviewProps) {
  const { primaryColor, secondaryColor } = branding;
  return (
    <div className="h-full flex items-center justify-center p-3">
      <div className="w-full max-w-[300px] bg-gray-100 rounded-lg p-2 shadow-inner">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <div className="p-2 border-b border-gray-100 text-center" style={{ backgroundColor: withOpacity(primaryColor, 0.05) }}>
            {branding.logoUrl ? (
              <Image src={branding.logoUrl} alt="Logo" width={32} height={32} unoptimized className="object-contain mx-auto mb-1" />
            ) : (
              <div className="w-8 h-8 rounded mx-auto mb-1 flex items-center justify-center text-[10px] font-bold text-white"
                style={{ backgroundColor: primaryColor }}>
                {branding.displayName?.[0] || schoolName[0]}
              </div>
            )}
            <div className="text-[9px] font-bold" style={{ color: primaryColor }}>
              {branding.displayName || schoolName}
            </div>
          </div>
          <div className="p-3">
            <div className="text-[8px] text-gray-400 mb-1">Objet: Bulletin trimestriel disponible</div>
            <div className="text-[9px] text-gray-600 mb-2">Bonjour M. Dupont,</div>
            <div className="text-[8px] text-gray-500 leading-relaxed mb-2">
              Le bulletin de votre fils Jean Dupont est désormais disponible
              sur la plateforme EduCI. Vous pouvez le consulter et le télécharger
              depuis votre espace parent.
            </div>
            <div className="text-center mb-2">
              <div className="inline-block px-3 py-1 rounded text-[8px] font-medium text-white"
                style={{ backgroundColor: primaryColor }}>
                Consulter le bulletin
              </div>
            </div>
            <div className="text-[7px] text-gray-400 text-center border-t border-gray-100 pt-2">
              {branding.slogan || 'Excellence académique'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SplashPreview({ branding, schoolName }: LivePreviewProps) {
  const { primaryColor, secondaryColor } = branding;
  return (
    <div className="h-full flex items-center justify-center p-3">
      <div className="relative w-[160px] h-[280px] rounded-[24px] border-4 border-gray-800 shadow-2xl overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${darken(primaryColor, 40)})` }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-3 shadow-lg">
            {branding.logoUrl ? (
              <Image src={branding.logoUrl} alt="Logo" width={40} height={40} unoptimized className="object-contain" />
            ) : (
              <span className="text-[20px] font-black text-white">
                {branding.displayName?.[0] || schoolName[0]}
              </span>
            )}
          </div>
          <div className="text-[14px] font-bold text-white mb-1 drop-shadow-sm">
            {branding.displayName || schoolName}
          </div>
          {branding.slogan && (
            <div className="text-[8px] text-white/70 italic mt-1">
              {branding.slogan}
            </div>
          )}
          {branding.motto && (
            <div className="text-[7px] text-white/50 mt-0.5">
              {branding.motto}
            </div>
          )}
          <div className="mt-6 flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-white/30 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-1 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
        <div className="absolute bottom-3 inset-x-0 text-center">
          <div className="text-[6px] text-white/30">Powered by EduCI</div>
        </div>
      </div>
    </div>
  );
}

function BadgePreview({ branding, schoolName }: LivePreviewProps) {
  const { primaryColor, secondaryColor } = branding;
  return (
    <div className="h-full flex items-center justify-center p-3 gap-4">
      {[
        { role: 'Élève', name: 'Jean Dupont', cls: '6ème A', bg: 'white' },
        { role: 'Enseignant', name: 'Mme Traoré', cls: 'Mathématiques', bg: 'white' },
      ].map((badge) => (
        <div key={badge.role} className="w-[130px] rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div className="h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
            <div className="text-[7px] font-bold text-white uppercase tracking-wider">
              {badge.role}
            </div>
          </div>
          <div className="bg-white p-2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 mb-1 border-2 overflow-hidden"
              style={{ borderColor: secondaryColor }}>
              <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-500">
                {badge.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div className="text-[8px] font-bold text-gray-800 text-center">{badge.name}</div>
            <div className="text-[6px] text-gray-400 text-center">{badge.cls}</div>
            <div className="mt-1 w-full flex items-center justify-center gap-0.5 p-1 rounded bg-gray-50">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="w-[2px] h-3 bg-gray-800" />
              ))}
            </div>
            <div className="text-[5px] text-gray-400 mt-0.5">16137807D</div>
          </div>
          <div className="h-1.5" style={{ backgroundColor: secondaryColor }} />
        </div>
      ))}
    </div>
  );
}

export default function LivePreview({ branding, schoolName }: LivePreviewProps) {
  const [activeTab, setActiveTab] = useState<PreviewTab>('dashboard');
  const [direction, setDirection] = useState(0);

  const currentIndex = PREVIEW_TABS.findIndex(t => t.id === activeTab);

  const goTo = (tab: PreviewTab) => {
    const nextIndex = PREVIEW_TABS.findIndex(t => t.id === tab);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveTab(tab);
  };

  const goNext = () => {
    const next = (currentIndex + 1) % PREVIEW_TABS.length;
    goTo(PREVIEW_TABS[next].id);
  };

  const goPrev = () => {
    const prev = (currentIndex - 1 + PREVIEW_TABS.length) % PREVIEW_TABS.length;
    goTo(PREVIEW_TABS[prev].id);
  };

  const previewContent = useMemo(() => {
    const props = { branding, schoolName };
    switch (activeTab) {
      case 'dashboard': return <DashboardPreview {...props} />;
      case 'mobile': return <MobilePreview {...props} />;
      case 'bulletin': return <BulletinPreview {...props} />;
      case 'certificate': return <CertificatePreview {...props} />;
      case 'receipt': return <ReceiptPreview {...props} />;
      case 'email': return <EmailPreview {...props} />;
      case 'splash': return <SplashPreview {...props} />;
      case 'badge': return <BadgePreview {...props} />;
    }
  }, [activeTab, branding, schoolName]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-1 px-1 py-2 overflow-x-auto border-b border-gray-200 bg-white rounded-t-xl">
        <div className="flex items-center gap-1 min-w-0">
          {PREVIEW_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => goTo(tab.id)}
                className={`
                  flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap
                  transition-all duration-200
                  ${isActive
                    ? 'text-white shadow-md scale-[1.02]'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }
                `}
                style={isActive ? { backgroundColor: branding.primaryColor } : undefined}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border-b border-gray-200">
        <button onClick={goPrev} className="p-1 rounded hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-600">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {PREVIEW_TABS.map((tab, i) => (
            <div
              key={tab.id}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: tab.id === activeTab ? branding.primaryColor : '#d1d5db',
                transform: tab.id === activeTab ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
        <button onClick={goNext} className="p-1 rounded hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-600">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 bg-gray-100 rounded-b-xl overflow-hidden relative">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeTab}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full h-full"
          >
            {previewContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
