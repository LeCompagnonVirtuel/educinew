'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  GraduationCap, MapPin, Clock, Award, ArrowRight,
  Sparkles, Heart, Lightbulb, Users, Globe, ChevronDown,
} from 'lucide-react';


const cultureIcons = [Lightbulb, Heart, Globe];

export default function CareersPage() {
  const { lang } = useLanguage();
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const content = {
    fr: {
      badge: 'Carrières',
      title: 'Rejoignez-nous',
      desc: "Aidez-nous à transformer l'éducation en Afrique. Nous recherchons des talents passionnés.",
      cultureTitle: 'Notre culture',
      culture: [
        { title: 'Innovation permanente', desc: "Nous encourageons la créativité et l'expérimentation. Chaque membre de l'équipe peut proposer et tester de nouvelles idées." },
        { title: 'Impact réel', desc: "Chaque ligne de code, chaque fonctionnalité impacte directement des milliers d'élèves et d'enseignants à travers l'Afrique." },
        { title: 'Diversité & Inclusion', desc: "Notre équipe de 12 nationalités différentes est notre plus grande force. Nous valorisons chaque perspective unique." },
      ],
      positionsTitle: 'Postes ouverts',
      jobs: [
        { title: 'Développeur Full Stack', location: 'Abidjan, Côte d\'Ivoire', type: 'Temps plein', desc: "Rejoignez l'équipe technique pour développer de nouvelles fonctionnalités sur notre plateforme. Stack: React, Node.js, PostgreSQL." },
        { title: 'Développeur Mobile', location: 'Remote', type: 'Temps plein', desc: "Développez notre application mobile React Native pour iOS et Android. Expérience en développement cross-platform requise." },
        { title: 'Ingénieur IA', location: 'Abidjan, Côte d\'Ivoire', type: 'Temps plein', desc: "Développez et améliorez nos modèles d'IA pour l'apprentissage adaptatif. PhD ou Master en ML/AI requis." },
        { title: 'Spécialiste Éducation', location: 'Abidjan, Côte d\'Ivoire', type: 'Temps plein', desc: "Concevez des contenus pédagogiques et assurez la pertinence éducative de nos fonctionnalités. 5+ ans dans l'enseignement." },
        { title: 'Responsable Commercial', location: 'Abidjan, Côte d\'Ivoire', type: 'Temps plein', desc: "Développez notre réseau d'écoles partenaires en Côte d'Ivoire et en Afrique de l'Ouest. Expérience en B2B SaaS requise." },
      ],
      apply: 'Postuler',
      remote: 'Remote',
    },
    en: {
      badge: 'Careers',
      title: 'Join us',
      desc: 'Help us transform education in Africa. We\'re looking for passionate talents.',
      cultureTitle: 'Our culture',
      culture: [
        { title: 'Constant innovation', desc: 'We encourage creativity and experimentation. Every team member can propose and test new ideas.' },
        { title: 'Real impact', desc: 'Every line of code, every feature directly impacts thousands of students and teachers across Africa.' },
        { title: 'Diversity & Inclusion', desc: 'Our team of 12 different nationalities is our greatest strength. We value every unique perspective.' },
      ],
      positionsTitle: 'Open positions',
      jobs: [
        { title: 'Full Stack Developer', location: 'Abidjan, Côte d\'Ivoire', type: 'Full-time', desc: 'Join the engineering team to build new features on our platform. Stack: React, Node.js, PostgreSQL.' },
        { title: 'Mobile Developer', location: 'Remote', type: 'Full-time', desc: 'Build our React Native mobile app for iOS and Android. Cross-platform development experience required.' },
        { title: 'AI Engineer', location: 'Abidjan, Côte d\'Ivoire', type: 'Full-time', desc: 'Develop and improve our AI models for adaptive learning. PhD or Master in ML/AI required.' },
        { title: 'Education Specialist', location: 'Abidjan, Côte d\'Ivoire', type: 'Full-time', desc: 'Design pedagogical content and ensure educational relevance of our features. 5+ years in teaching.' },
        { title: 'Sales Manager', location: 'Abidjan, Côte d\'Ivoire', type: 'Full-time', desc: 'Grow our partner school network in Côte d\'Ivoire and West Africa. B2B SaaS experience required.' },
      ],
      apply: 'Apply now',
      remote: 'Remote',
    },
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#60A5FA] flex items-center justify-center text-white">
              <GraduationCap size={20} />
            </div>
            <span className="text-xl font-bold text-[#111827]">EduCI</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/about" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'À propos' : 'About'}</a>
            <a href="/team" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'Équipe' : 'Team'}</a>
            <a href="/careers" className="text-sm font-semibold text-[#4F46E5]">{lang === 'fr' ? 'Carrières' : 'Careers'}</a>
            <a href="/contact" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'Contact' : 'Contact'}</a>

            <a href="/login" className="px-5 py-2.5 bg-[#4F46E5] text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
              {lang === 'fr' ? 'Connexion' : 'Login'}
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#4F46E5] via-indigo-700 to-[#60A5FA] py-24 relative overflow-hidden">
        <div className="absolute top-16 right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <Sparkles size={14} />
            {t.badge}
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">{t.title}</h1>
          <p className="text-lg text-white/80">{t.desc}</p>
        </div>
      </section>

      {/* Culture */}
      <section className="max-w-7xl mx-auto px-6 -mt-14 relative z-10 pb-20">
        <h2 className="text-2xl font-extrabold text-[#111827] text-center mb-10">{t.cultureTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.culture.map((c, i) => {
            const Icon = cultureIcons[i];
            return (
              <div key={i} className="bg-white rounded-2xl shadow-premium p-8 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-[#e2dfff] flex items-center justify-center text-[#4F46E5] mb-5">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-2">{c.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Open Positions */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-extrabold text-[#111827] text-center mb-10">{t.positionsTitle}</h2>
        <div className="space-y-4">
          {t.jobs.map((job, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden hover-lift">
              <button
                onClick={() => setExpandedJob(expandedJob === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#111827]">{job.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-sm text-[#6B7280]">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-[#6B7280]">
                      <Clock size={14} />
                      {job.type}
                    </span>
                  </div>
                </div>
                <ChevronDown size={20} className={`text-[#6B7280] transition-transform ${expandedJob === i ? 'rotate-180' : ''}`} />
              </button>
              {expandedJob === i && (
                <div className="px-6 pb-6 border-t border-slate-100 pt-4">
                  <p className="text-sm text-[#6B7280] mb-4">{job.desc}</p>
                  <button onClick={() => window.location.href = 'mailto:careers@educi.ai'} className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F46E5] text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                    {t.apply}
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap size={24} />
            <span className="font-bold">EduCI</span>
          </div>
          <p className="text-sm text-slate-400">© 2025 EduCI. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
          <div className="flex gap-6">
            <a href="/help" className="text-sm text-slate-400 hover:text-white">{lang === 'fr' ? 'Aide' : 'Help'}</a>
            <a href="/status" className="text-sm text-slate-400 hover:text-white">{lang === 'fr' ? 'Statut' : 'Status'}</a>
            <a href="/contact" className="text-sm text-slate-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
