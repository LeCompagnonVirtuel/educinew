'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Mail, Phone, MapPin, Send, Sparkles, MessageCircle,
  Facebook, Twitter, Linkedin, Instagram, Globe, ChevronDown,
} from 'lucide-react';
import EduCILogo from '@/components/brand/EduCILogo';
import { supportConfig, getSupportWhatsappLink } from '@/lib/support';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Adresse email invalide'),
  subject: z.string().min(2, 'Le sujet doit contenir au moins 2 caractères').max(200),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(2000),
});

export default function ContactPage() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      setFormError(result.error.issues[0]?.message || 'Données invalides');
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const content = {
    fr: {
      badge: 'Contact',
      title: 'Contactez-nous',
      desc: "Nous sommes là pour vous aider. N'hésitez pas à nous contacter.",
      emailTitle: 'Email',
      emailDesc: 'Notre équipe répond sous 24h',
      email: supportConfig.emails.support,
      phoneTitle: 'Téléphone',
      phoneDesc: 'Lun-Ven, 8h-18h GMT',
      phone: supportConfig.phoneDisplay,
      addressTitle: 'Adresse',
      addressDesc: 'Siège social',
      address: supportConfig.location.full,
      formTitle: 'Envoyez-nous un message',
      nameLabel: 'Nom complet',
      namePlaceholder: 'Votre nom',
      emailLabel: 'Email',
      emailPlaceholder: 'votre@email.com',
      subjectLabel: 'Sujet',
      subjectPlaceholder: 'Sélectionnez un sujet',
      subjects: ['Question générale', 'Support technique', 'Partenariat', 'Facturation', 'Autre'],
      messageLabel: 'Message',
      messagePlaceholder: 'Décrivez votre demande...',
      submit: 'Envoyer le message',
      sending: 'Envoi en cours...',
      success: 'Message envoyé avec succès !',
      socialTitle: 'Suivez-nous',
      mapTitle: 'Notre emplacement',
    },
    en: {
      badge: 'Contact',
      title: 'Get in touch',
      desc: 'We\'re here to help. Don\'t hesitate to reach out.',
      emailTitle: 'Email',
      emailDesc: 'Our team responds within 24h',
      email: supportConfig.emails.support,
      phoneTitle: 'Phone',
      phoneDesc: 'Mon-Fri, 8am-6pm GMT',
      phone: supportConfig.phoneDisplay,
      addressTitle: 'Address',
      addressDesc: 'Headquarters',
      address: supportConfig.location.full,
      formTitle: 'Send us a message',
      nameLabel: 'Full name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Select a subject',
      subjects: ['General inquiry', 'Technical support', 'Partnership', 'Billing', 'Other'],
      messageLabel: 'Message',
      messagePlaceholder: 'Describe your request...',
      submit: 'Send message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      socialTitle: 'Follow us',
      mapTitle: 'Our location',
    },
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/"><EduCILogo size="sm" /></a>
          <div className="flex items-center gap-4">
            <a href="/about" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'À propos' : 'About'}</a>
            <a href="/help" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'Aide' : 'Help'}</a>
            <a href="/contact" className="text-sm font-semibold text-[#4F46E5]">{lang === 'fr' ? 'Contact' : 'Contact'}</a>

            <a href="/login" className="px-5 py-2.5 bg-[#4F46E5] text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
              {lang === 'fr' ? 'Connexion' : 'Login'}
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#4F46E5] via-indigo-700 to-[#60A5FA] py-12 relative overflow-hidden">
        <div className="absolute top-16 right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <Mail size={14} />
            {t.badge}
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">{t.title}</h1>
          <p className="text-lg text-white/80">{t.desc}</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow-premium p-6 border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#e2dfff] flex items-center justify-center text-[#4F46E5] flex-shrink-0">
              <Mail size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#111827]">{t.emailTitle}</p>
              <p className="text-xs text-[#6B7280]">{t.emailDesc}</p>
              <a href={`mailto:${t.email}`} className="text-sm font-semibold text-[#4F46E5] mt-1 block">{t.email}</a>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-premium p-6 border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#60A5FA] flex-shrink-0">
              <Phone size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#111827]">{t.phoneTitle}</p>
              <p className="text-xs text-[#6B7280]">{t.phoneDesc}</p>
              <a href={`tel:${t.phone.replace(/\s/g, '')}`} className="text-sm font-semibold text-[#4F46E5] mt-1 block">{t.phone}</a>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-premium p-6 border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 flex-shrink-0">
              <MapPin size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#111827]">{t.addressTitle}</p>
              <p className="text-xs text-[#6B7280]">{t.addressDesc}</p>
              <p className="text-sm font-semibold text-[#111827] mt-1 whitespace-pre-line">{t.address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-premium p-8 border border-slate-100">
            <h2 className="text-xl font-extrabold text-[#111827] mb-6">{t.formTitle}</h2>
            {submitted && (
              <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold flex items-center gap-2">
                <Sparkles size={16} />
                {t.success}
              </div>
            )}
            {formError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-semibold">
                {formError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">{t.nameLabel}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 bg-[#F9FAFB] rounded-xl border border-transparent focus:border-[#4F46E5]/40 focus:ring-2 focus:ring-[#4F46E5]/20 transition-all outline-none text-[#111827]"
                  placeholder={t.namePlaceholder}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">{t.emailLabel}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 bg-[#F9FAFB] rounded-xl border border-transparent focus:border-[#4F46E5]/40 focus:ring-2 focus:ring-[#4F46E5]/20 transition-all outline-none text-[#111827]"
                  placeholder={t.emailPlaceholder}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">{t.subjectLabel}</label>
                <div className="relative">
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#F9FAFB] rounded-xl border border-transparent focus:border-[#4F46E5]/40 focus:ring-2 focus:ring-[#4F46E5]/20 transition-all outline-none text-[#111827] appearance-none"
                    required
                  >
                    <option value="">{t.subjectPlaceholder}</option>
                    {t.subjects.map((s, i) => (
                      <option key={i} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">{t.messageLabel}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 bg-[#F9FAFB] rounded-xl border border-transparent focus:border-[#4F46E5]/40 focus:ring-2 focus:ring-[#4F46E5]/20 transition-all outline-none text-[#111827] resize-none"
                  placeholder={t.messagePlaceholder}
                  rows={5}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#4F46E5] text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                {submitted ? t.sending : t.submit}
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* Map + Social */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden h-64">
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 grid-rows-6 h-full">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-slate-400/20" />
                    ))}
                  </div>
                </div>
                <div className="text-center z-10">
                  <div className="w-12 h-12 rounded-full bg-[#4F46E5] flex items-center justify-center text-white mx-auto mb-3 shadow-lg">
                    <MapPin size={22} />
                  </div>
                  <p className="text-sm font-bold text-[#111827]">Cocody, Riviera 3</p>
                  <p className="text-xs text-[#6B7280]">Abidjan, Côte d&apos;Ivoire</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-premium p-6 border border-slate-100">
              <h3 className="text-lg font-bold text-[#111827] mb-4">{t.socialTitle}</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Facebook, label: 'Facebook', color: 'text-blue-600', bg: 'bg-blue-50', href: 'https://facebook.com/educi' },
                  { icon: Twitter, label: 'Twitter', color: 'text-sky-500', bg: 'bg-sky-50', href: 'https://twitter.com/educi' },
                  { icon: Linkedin, label: 'LinkedIn', color: 'text-blue-700', bg: 'bg-blue-50', href: 'https://linkedin.com/company/educi' },
                  { icon: Instagram, label: 'Instagram', color: 'text-rose-500', bg: 'bg-rose-50', href: 'https://instagram.com/educi' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 rounded-xl ${social.bg} hover:opacity-80 transition-opacity`}
                  >
                    <social.icon size={20} className={social.color} />
                    <span className="text-sm font-semibold text-[#111827]">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0F1C] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <EduCILogo size="sm" theme="dark" />
          <p className="text-sm text-slate-400">© 2026 EduCI. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
          <p className="text-sm text-slate-400">
            {lang === 'fr' ? 'Conçu et développé en Côte d\'Ivoire par' : 'Designed & built in Côte d\'Ivoire by'}{' '}
            <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#22D3EE] animate-pulse">Harouna Dev</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
