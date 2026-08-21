'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Target, Eye, Heart, ChevronRight,
  Home, Users, Globe, Calendar, ArrowRight, Sparkles, CheckCircle, GraduationCap,
} from 'lucide-react';
import EduCILogo from '@/components/brand/EduCILogo';


const milestones = [
  { year: '2020', icon: Home },
  { year: '2021', icon: GraduationCap },
  { year: '2023', icon: Sparkles },
  { year: '2025', icon: Globe },
];

const stats = [
  { value: '500+', icon: Home },
  { value: '50,000+', icon: Users },
  { value: '12', icon: Globe },
];

export default function AboutPage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      heroBadge: 'À propos de nous',
      heroTitle: "L'école connectée",
      heroDesc: "EduCI révolutionne la gestion scolaire en Afrique en connectant écoles, enseignants, parents et élèves sur une plateforme unique propulsée par l'intelligence artificielle.",
      missionTitle: 'Notre Mission',
      missionDesc: "Démocratiser l'accès à une éducation de qualité en fournissant aux établissements scolaires africains des outils technologiques puissants, accessibles et adaptés à leurs réalités.",
      visionTitle: 'Notre Vision',
      visionDesc: "Devenir la plateforme éducative de référence en Afrique d'ici 2030, connectant des millions d'élèves, enseignants et parents à travers le continent.",
      valuesTitle: 'Nos Valeurs',
      values: [
        { title: 'Innovation', desc: "Nous repoussons les limites de la technologie éducative pour créer des solutions qui transforment l'apprentissage." },
        { title: 'Accessibilité', desc: "Nous croyons que chaque enfant mérite un accès égal à une éducation de qualité, peu importe sa localisation." },
        { title: 'Excellence', desc: "Nous nous engageons à fournir des outils de la plus haute qualité pour accompagner la réussite scolaire." },
      ],
      timelineTitle: 'Notre Parcours',
      milestones: [
        { title: 'Fondation', desc: "Lancement d'EduCI à Abidjan avec la mission de transformer l'éducation en Côte d'Ivoire." },
        { title: '100 Écoles', desc: "Atteinte de 100 écoles partenaires en Côte d'Ivoire et expansion en Guinée." },
        { title: 'Lancement IA', desc: "Introduction de l'assistant IA éducatif, première du genre en Afrique de l'Ouest." },
        { title: '500+ Écoles', desc: "Expansion dans 12 pays africains avec plus de 500 écoles et 50 000 élèves." },
      ],
      statsTitle: 'EduCI en chiffres',
      stats: [
        { label: 'Écoles partenaires', value: '500+' },
        { label: 'Élèves connectés', value: '50,000+' },
        { label: 'Pays', value: '12' },
      ],
    },
    en: {
      heroBadge: 'About Us',
      heroTitle: 'The Connected School',
      heroDesc: 'EduCI is revolutionizing school management in Africa by connecting schools, teachers, parents and students on a single platform powered by artificial intelligence.',
      missionTitle: 'Our Mission',
      missionDesc: 'To democratize access to quality education by providing African schools with powerful, accessible, and context-appropriate technological tools.',
      visionTitle: 'Our Vision',
      visionDesc: 'To become the leading educational platform in Africa by 2030, connecting millions of students, teachers and parents across the continent.',
      valuesTitle: 'Our Values',
      values: [
        { title: 'Innovation', desc: 'We push the boundaries of educational technology to create solutions that transform learning.' },
        { title: 'Accessibility', desc: 'We believe every child deserves equal access to quality education, regardless of location.' },
        { title: 'Excellence', desc: 'We are committed to providing the highest quality tools to support academic success.' },
      ],
      timelineTitle: 'Our Journey',
      milestones: [
        { title: 'Founded', desc: 'EduCI launched in Abidjan with the mission to transform education in Côte d\'Ivoire.' },
        { title: '100 Schools', desc: 'Reached 100 partner schools in Côte d\'Ivoire and expanded to Guinea.' },
        { title: 'AI Launch', desc: 'Introduced the AI educational assistant, the first of its kind in West Africa.' },
        { title: '500+ Schools', desc: 'Expanded to 12 African countries with over 500 schools and 50,000 students.' },
      ],
      statsTitle: 'EduCI by the numbers',
      stats: [
        { label: 'Partner Schools', value: '500+' },
        { label: 'Connected Students', value: '50,000+' },
        { label: 'Countries', value: '12' },
      ],
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
            <a href="/about" className="text-sm font-semibold text-[#4F46E5]">{lang === 'fr' ? 'À propos' : 'About'}</a>
            <a href="/team" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'Équipe' : 'Team'}</a>
            <a href="/careers" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'Carrières' : 'Careers'}</a>
            <a href="/contact" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'Contact' : 'Contact'}</a>

            <a href="/login" className="px-5 py-2.5 bg-[#4F46E5] text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
              {lang === 'fr' ? 'Connexion' : 'Login'}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5] via-indigo-700 to-[#60A5FA]" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-[#60A5FA]/20 rounded-full blur-2xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-28 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <Sparkles size={14} />
            {t.heroBadge}
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">{t.heroTitle}</h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">{t.heroDesc}</p>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-premium p-8 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-[#e2dfff] flex items-center justify-center text-[#4F46E5] mb-5">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#111827] mb-3">{t.missionTitle}</h3>
            <p className="text-[#6B7280] leading-relaxed">{t.missionDesc}</p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl shadow-premium p-8 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#60A5FA] mb-5">
              <Eye size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#111827] mb-3">{t.visionTitle}</h3>
            <p className="text-[#6B7280] leading-relaxed">{t.visionDesc}</p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-2xl shadow-premium p-8 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 mb-5">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#111827] mb-3">{t.valuesTitle}</h3>
            <div className="space-y-4">
              {t.values.map((v, i) => (
                <div key={i}>
                  <p className="text-sm font-bold text-[#111827]">{v.title}</p>
                  <p className="text-sm text-[#6B7280]">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-[#111827] text-center mb-16">{t.timelineTitle}</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-[#e2dfff]" />
            <div className="space-y-16">
              {t.milestones.map((m, i) => {
                const Icon = milestones[i].icon;
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                      <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-slate-100">
                        <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest">{milestones[i].year}</span>
                        <h4 className="text-lg font-bold text-[#111827] mt-1">{m.title}</h4>
                        <p className="text-sm text-[#6B7280] mt-1">{m.desc}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center text-white shadow-lg z-10">
                      <Icon size={18} />
                    </div>
                    <div className="w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-[#111827] text-center mb-16">{t.statsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.stats.map((s, i) => {
              const Icon = stats[i].icon;
              return (
                <div key={i} className="bg-white rounded-2xl shadow-premium p-10 text-center border border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-[#e2dfff] flex items-center justify-center text-[#4F46E5] mx-auto mb-5">
                    <Icon size={28} />
                  </div>
                  <p className="text-4xl font-extrabold text-[#4F46E5]">{s.value}</p>
                  <p className="text-[#6B7280] mt-2 font-medium">{s.label}</p>
                </div>
              );
            })}
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
