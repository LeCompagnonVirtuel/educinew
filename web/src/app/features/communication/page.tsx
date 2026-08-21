'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import {
  MessageSquare, ArrowRight, CheckCircle, Bell, FileText, Phone,
  Send, Globe, Megaphone, ChevronRight, Home,
} from 'lucide-react';

export default function CommunicationFeaturePage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      hero: {
        badge: 'Communication Parents',
        title: 'Connectez école et familles instantanément',
        subtitle: 'Messagerie intégrée, bulletins automatiques, notifications SMS et annonces scolaires — tout au même endroit.',
      },
      benefits: [
        { title: 'Messagerie intégrée', desc: 'Chat direct entre enseignants et parents dans l\'app.' },
        { title: 'Bulletins automatiques', desc: 'Les parents reçoivent les bulletins dès publication.' },
        { title: 'Notifications SMS', desc: 'Alertes importantes envoyées par SMS si pas d\'internet.' },
        { title: 'Annonces scolaires', desc: 'Diffusez informations, événements et communiqués.' },
        { title: 'Groupes par classe', desc: 'Envoyez un message à tous les parents d\'une classe.' },
        { title: 'Historique complet', desc: 'Toutes les communications archivées et consultables.' },
      ],
      features: [
        { icon: Send, title: 'Chat temps réel', desc: 'Messages instantanés entre parents et enseignants.' },
        { icon: Bell, title: 'Push & SMS', desc: 'Notifications multi-canal garanties.' },
        { icon: Megaphone, title: 'Annonces', desc: 'Diffusion ciblée par rôle ou classe.' },
        { icon: FileText, title: 'Bulletins', desc: 'Envoi automatique des résultats.' },
      ],
      cta: { title: 'Prêt à améliorer la communication ?', btn: 'Commencer gratuitement' },
    },
    en: {
      hero: {
        badge: 'Parent Communication',
        title: 'Connect Schools and Families Instantly',
        subtitle: 'Built-in messaging, automatic report cards, SMS notifications, and school announcements — all in one place.',
      },
      benefits: [
        { title: 'Built-in Messaging', desc: 'Direct chat between teachers and parents in the app.' },
        { title: 'Auto Report Cards', desc: 'Parents receive report cards as soon as published.' },
        { title: 'SMS Notifications', desc: 'Important alerts sent via SMS when no internet.' },
        { title: 'School Announcements', desc: 'Broadcast information, events, and notices.' },
        { title: 'Class Groups', desc: 'Send a message to all parents of a class at once.' },
        { title: 'Full History', desc: 'All communications archived and searchable.' },
      ],
      features: [
        { icon: Send, title: 'Real-time Chat', desc: 'Instant messages between parents and teachers.' },
        { icon: Bell, title: 'Push & SMS', desc: 'Guaranteed multi-channel notifications.' },
        { icon: Megaphone, title: 'Announcements', desc: 'Targeted broadcast by role or class.' },
        { icon: FileText, title: 'Report Cards', desc: 'Automatic results delivery.' },
      ],
      cta: { title: 'Ready to improve communication?', btn: 'Start Free' },
    },
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f8f9fa] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-sm">
          <Link href="/" className="text-slate-500 hover:text-[#4F46E5]">Accueil</Link>
          <ChevronRight size={14} className="text-slate-300" />
          <Link href="/features" className="text-slate-500 hover:text-[#4F46E5]">{lang === 'fr' ? 'Fonctionnalités' : 'Features'}</Link>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-[#4F46E5] font-semibold">{lang === 'fr' ? 'Communication Parents' : 'Communication'}</span>
        </div>
      </div>

      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #EA580C 0%, #FB923C 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 py-14 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
              <MessageSquare size={16} /> {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{t.hero.title}</h1>
            <p className="text-lg text-white/80 leading-relaxed">{t.hero.subtitle}</p>
            <div className="flex gap-4 mt-8">
              <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                {t.cta.btn} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.benefits.map((b, i) => (
            <div key={i} className="flex gap-4 p-6 rounded-2xl bg-[#f8f9fa] hover:bg-orange-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#111827] mb-1">{b.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#111827] text-center mb-8">{lang === 'fr' ? 'Fonctionnalités clés' : 'Key Features'}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-orange-600" />
                </div>
                <h3 className="font-bold text-[#111827] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B7280]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="rounded-3xl p-12 text-center" style={{ background: 'linear-gradient(135deg, #EA580C 0%, #FB923C 100%)' }}>
          <h2 className="text-3xl font-bold text-white mb-4">{t.cta.title}</h2>
          <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
            {t.cta.btn} <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6B7280] text-sm">© 2026 EduCI</p>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-[#6B7280] hover:text-[#4F46E5]">{lang === 'fr' ? 'Accueil' : 'Home'}</Link>
            <Link href="/features" className="text-sm text-[#4F46E5] font-medium">{lang === 'fr' ? 'Fonctionnalités' : 'Features'}</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
