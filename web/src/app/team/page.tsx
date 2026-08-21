'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Linkedin, Twitter, Mail, Sparkles } from 'lucide-react';
import EduCILogo from '@/components/brand/EduCILogo';


const teamMembers = [
  { initials: 'AK', color: 'from-[#4F46E5] to-[#60A5FA]' },
  { initials: 'MK', color: 'from-blue-500 to-cyan-500' },
  { initials: 'FD', color: 'from-emerald-500 to-teal-500' },
  { initials: 'YC', color: 'from-amber-500 to-orange-500' },
  { initials: 'LB', color: 'from-rose-500 to-pink-500' },
  { initials: 'SN', color: 'from-violet-500 to-purple-500' },
];

export default function TeamPage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      badge: 'Notre équipe',
      title: 'Les visages derrière EduCI',
      desc: "Une équipe passionnée dédiée à transformer l'éducation en Afrique à travers la technologie.",
      roles: [
        { role: 'PDG & Fondateur', bio: "Visionnaire passionné par l'éducation, Kouassi a fondé EduCI avec la conviction que la technologie peut transformer l'avenir de millions d'élèves africains. Diplômé de Polytechnique, il a 15 ans d'expérience dans la tech." },
        { role: 'Directeur Technique', bio: "Expert en architecture logicielle avec une expérience chez Microsoft et Orange, Mamadou dirige l'équipe technique d'EduCI. Spécialiste en systèmes distribués et cloud computing." },
        { role: 'Directrice Produit', bio: "Ancienne consultante McKinsey, Fatou apporte une vision stratégique centrée utilisateur. Elle dirige la conception des produits EduCI avec une approche data-driven." },
        { role: 'Directeur de l\'Éducation', bio: "Professeur agrégé avec 20 ans d'expérience dans l'enseignement, Yves garantit que chaque fonctionnalité d'EduCI répond aux besoins réels des enseignants et des élèves." },
        { role: 'Directrice IA', bio: "Docteure en Intelligence Artificielle (ENS Paris), Léa développe les algorithmes d'apprentissage adaptatif qui font la force de l'assistant IA EduCI." },
        { role: 'Directrice des Opérations', bio: "Experte en scaling de startups africaines, Séraphine gère les opérations dans 12 pays. Son expertise assure une croissance rapide tout en maintenant l'excellence du service." },
      ],
      joinTitle: 'Rejoignez l\'aventure',
      joinDesc: 'Nous recherchons des talents passionnés pour nous aider à transformer l\'éducation.',
      joinCta: 'Voir nos offres',
    },
    en: {
      badge: 'Our Team',
      title: 'The faces behind EduCI',
      desc: 'A passionate team dedicated to transforming education in Africa through technology.',
      roles: [
        { role: 'CEO & Founder', bio: 'A visionary passionate about education, Kouassi founded EduCI with the belief that technology can transform the future of millions of African students. A Polytechnique graduate with 15 years in tech.' },
        { role: 'CTO', bio: 'A software architecture expert with experience at Microsoft and Orange, Mamadou leads EduCI\'s technical team. Specialist in distributed systems and cloud computing.' },
        { role: 'Head of Product', bio: 'Former McKinsey consultant, Fatou brings a user-centric strategic vision. She leads EduCI product design with a data-driven approach.' },
        { role: 'Head of Education', bio: 'A certified professor with 20 years of teaching experience, Yves ensures every EduCI feature meets the real needs of teachers and students.' },
        { role: 'Head of AI', bio: 'PhD in Artificial Intelligence (ENS Paris), Léa develops the adaptive learning algorithms that power the EduCI AI assistant.' },
        { role: 'Head of Operations', bio: 'Expert in scaling African startups, Séraphine manages operations across 12 countries. Her expertise ensures rapid growth while maintaining service excellence.' },
      ],
      joinTitle: 'Join the adventure',
      joinDesc: 'We\'re looking for passionate talents to help us transform education.',
      joinCta: 'View open positions',
    },
  };

  const t = content[lang];
  const names = ['Kouassi Amenan', 'Mamadou Diallo', 'Fatou Dramé', 'Yves Kouamé', 'Léa Bamba', 'Séraphine N\'Guessan'];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/"><EduCILogo size="sm" /></a>
          <div className="flex items-center gap-4">
            <a href="/about" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'À propos' : 'About'}</a>
            <a href="/team" className="text-sm font-semibold text-[#4F46E5]">{lang === 'fr' ? 'Équipe' : 'Team'}</a>
            <a href="/careers" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'Carrières' : 'Careers'}</a>
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
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#60A5FA]/20 rounded-full blur-2xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <Sparkles size={14} />
            {t.badge}
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">{t.title}</h1>
          <p className="text-lg text-white/80">{t.desc}</p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-14 relative z-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.roles.map((member, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-premium p-8 border border-slate-100 hover-lift text-center">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${teamMembers[i].color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5`}>
                {teamMembers[i].initials}
              </div>
              <h3 className="text-lg font-bold text-[#111827]">{names[i]}</h3>
              <p className="text-sm font-semibold text-[#4F46E5] mt-1 mb-4">{member.role}</p>
              <p className="text-sm text-[#6B7280] leading-relaxed">{member.bio}</p>
              <div className="flex items-center justify-center gap-3 mt-5">
                <a href="#" className="w-9 h-9 rounded-lg bg-[#f8f9fa] flex items-center justify-center text-[#6B7280] hover:text-[#4F46E5] hover:bg-[#e2dfff] transition-colors">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="w-9 h-9 rounded-lg bg-[#f8f9fa] flex items-center justify-center text-[#6B7280] hover:text-[#4F46E5] hover:bg-[#e2dfff] transition-colors">
                  <Twitter size={16} />
                </a>
                <a href="mailto:support@educi.live" className="w-9 h-9 rounded-lg bg-[#f8f9fa] flex items-center justify-center text-[#6B7280] hover:text-[#4F46E5] hover:bg-[#e2dfff] transition-colors">
                  <Mail size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-[#111827] mb-4">{t.joinTitle}</h2>
          <p className="text-[#6B7280] mb-8">{t.joinDesc}</p>
          <a href="/careers" className="inline-flex items-center gap-2 px-8 py-4 bg-[#4F46E5] text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
            {t.joinCta}
          </a>
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
