'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Bus, ArrowRight, CheckCircle, MapPin, Clock, Route,
  Bell, Shield, Smartphone, ChevronRight, Home,
} from 'lucide-react';

export default function TransportFeaturePage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      hero: {
        badge: 'Transport Scolaire',
        title: 'Suivez les bus en temps réel',
        subtitle: 'Géolocalisation GPS, alertes d\'approche, optimisation des itinéraires et sécurité des élèves.',
      },
      benefits: [
        { title: 'Suivi GPS', desc: 'Localisation en temps réel de chaque bus sur la carte.' },
        { title: 'Alertes parents', desc: 'Notification quand le bus approche de l\'arrêt de l\'élève.' },
        { title: 'Itinéraires optimisés', desc: 'Planification des routes pour minimiser le temps de trajet.' },
        { title: 'Historique des trajets', desc: 'Archives des trajets pour audit et sécurité.' },
        { title: 'Gestion des chauffeurs', desc: 'Profils chauffeurs avec historique et évaluations.' },
        { title: 'Capacité bus', desc: 'Suivi du nombre d\'élèves par bus en temps réel.' },
      ],
      features: [
        { icon: MapPin, title: 'Carte live', desc: 'Position de chaque bus mise à jour chaque seconde.' },
        { icon: Bell, title: 'Alertes ETA', desc: 'Temps d\'arrivée estimé envoyé aux parents.' },
        { icon: Route, title: 'Optimisation', desc: 'Routes calculées pour le meilleur itinéraire.' },
        { icon: Shield, title: 'Sécurité', desc: 'Vérification à la montée et descente.' },
      ],
      cta: { title: 'Prêt à sécuriser le transport scolaire ?', btn: 'Commencer gratuitement' },
    },
    en: {
      hero: {
        badge: 'School Transport',
        title: 'Track Buses in Real-Time',
        subtitle: 'GPS tracking, approach alerts, route optimization, and student safety.',
      },
      benefits: [
        { title: 'GPS Tracking', desc: 'Real-time location of every bus on the map.' },
        { title: 'Parent Alerts', desc: 'Notification when bus approaches the student\'s stop.' },
        { title: 'Optimized Routes', desc: 'Route planning to minimize travel time.' },
        { title: 'Trip History', desc: 'Trip archives for audit and security.' },
        { title: 'Driver Management', desc: 'Driver profiles with history and ratings.' },
        { title: 'Bus Capacity', desc: 'Track number of students per bus in real-time.' },
      ],
      features: [
        { icon: MapPin, title: 'Live Map', desc: 'Position of each bus updated every second.' },
        { icon: Bell, title: 'ETA Alerts', desc: 'Estimated arrival time sent to parents.' },
        { icon: Route, title: 'Optimization', desc: 'Routes calculated for best path.' },
        { icon: Shield, title: 'Safety', desc: 'Verification at boarding and exit.' },
      ],
      cta: { title: 'Ready to secure school transport?', btn: 'Start Free' },
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
          <span className="text-[#4F46E5] font-semibold">{lang === 'fr' ? 'Transport Scolaire' : 'Transport'}</span>
        </div>
      </div>

      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 py-14 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
              <Bus size={16} /> {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{t.hero.title}</h1>
            <p className="text-lg text-white/80 leading-relaxed">{t.hero.subtitle}</p>
            <div className="flex gap-4 mt-8">
              <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-cyan-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
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
            <div key={i} className="flex gap-4 p-6 rounded-2xl bg-[#f8f9fa] hover:bg-cyan-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-cyan-600" />
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
                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-cyan-600" />
                </div>
                <h3 className="font-bold text-[#111827] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B7280]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="rounded-3xl p-12 text-center" style={{ background: 'linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)' }}>
          <h2 className="text-3xl font-bold text-white mb-4">{t.cta.title}</h2>
          <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-cyan-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
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
