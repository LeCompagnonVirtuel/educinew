'use client';

import { Phone, MessageCircle, Mail, MapPin, ExternalLink, Headphones } from 'lucide-react';
import { supportConfig, getSupportEmailLink, getSupportWhatsappLink } from '@/lib/support';

interface SupportCardProps {
  variant?: 'full' | 'compact' | 'inline' | 'footer';
  showTitle?: boolean;
  className?: string;
}

export default function SupportCard({ variant = 'full', showTitle = true, className = '' }: SupportCardProps) {
  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        <a href={supportConfig.phoneLink} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors">
          <Phone size={12} /> {supportConfig.phoneDisplay}
        </a>
        <a href={getSupportWhatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors">
          <MessageCircle size={12} /> WhatsApp
        </a>
        <a href={getSupportEmailLink()} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition-colors">
          <Mail size={12} /> {supportConfig.emails.support}
        </a>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 ${className}`}>
        {showTitle && (
          <div className="flex items-center gap-2 mb-3">
            <Headphones size={16} className="text-[#4F46E5]" />
            <h3 className="text-sm font-bold text-slate-900">Besoin d&apos;aide ?</h3>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <a href={supportConfig.phoneLink} className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:border-emerald-300 hover:text-emerald-700 transition-all">
            <Phone size={12} className="text-emerald-500" /> Appeler
          </a>
          <a href={getSupportWhatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:border-green-300 hover:text-green-700 transition-all">
            <MessageCircle size={12} className="text-green-500" /> WhatsApp
          </a>
          <a href={getSupportEmailLink()} className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-700 transition-all">
            <Mail size={12} className="text-indigo-500" /> Email
          </a>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={className}>
        <h4 className="text-sm font-bold text-white mb-3">Support</h4>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>
            <a href={supportConfig.phoneLink} className="hover:text-white transition-colors flex items-center gap-2">
              <Phone size={12} /> {supportConfig.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={getSupportWhatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <MessageCircle size={12} /> {supportConfig.whatsappDisplay}
            </a>
          </li>
          <li>
            <a href={getSupportEmailLink()} className="hover:text-white transition-colors flex items-center gap-2">
              <Mail size={12} /> {supportConfig.emails.support}
            </a>
          </li>
          <li>
            <a href={supportConfig.location.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <MapPin size={12} /> {supportConfig.location.full}
            </a>
          </li>
        </ul>
      </div>
    );
  }

  // Full variant
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      <div className="p-6 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Headphones size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Support EduCI</h3>
            <p className="text-sm text-white/80">Nous sommes là pour vous aider</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <a href={supportConfig.phoneLink} className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
            <Phone size={18} className="text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-emerald-600 uppercase">Téléphone</p>
            <p className="text-sm font-bold text-slate-900">{supportConfig.phoneDisplay}</p>
          </div>
          <ExternalLink size={14} className="text-emerald-400" />
        </a>

        <a href={getSupportWhatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
            <MessageCircle size={18} className="text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-green-600 uppercase">WhatsApp</p>
            <p className="text-sm font-bold text-slate-900">{supportConfig.whatsappDisplay}</p>
          </div>
          <ExternalLink size={14} className="text-green-400" />
        </a>

        <a href={getSupportEmailLink()} className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
            <Mail size={18} className="text-indigo-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-indigo-600 uppercase">Email</p>
            <p className="text-sm font-bold text-slate-900">{supportConfig.emails.support}</p>
            <p className="text-xs text-slate-500">{supportConfig.emails.platform}</p>
          </div>
          <ExternalLink size={14} className="text-indigo-400" />
        </a>

        <a href={supportConfig.location.mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
            <MapPin size={18} className="text-slate-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase">Localisation</p>
            <p className="text-sm font-bold text-slate-900">{supportConfig.location.full}</p>
          </div>
          <ExternalLink size={14} className="text-slate-400" />
        </a>
      </div>
    </div>
  );
}
