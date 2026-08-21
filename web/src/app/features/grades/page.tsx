'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import {
  GraduationCap, ArrowRight, CheckCircle, Calculator, FileText, BarChart3,
  Printer, Award, TrendingUp, ChevronRight, Home,
} from 'lucide-react';

export default function GradesFeaturePage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      hero: {
        badge: 'Gestion des Notes',
        title: 'Bulletins et notes en toute simplicité',
        subtitle: 'Saisie rapide, calculs automatiques, bulletins imprimables et analyses de performance par matière.',
      },
      benefits: [
        { title: 'Saisie rapide', desc: 'Entrez les notes par matière, par classe — toutes les coefficients sont calculés.' },
        { title: 'Bulletins PDF', desc: 'Générez et imprimez les bulletins en un clic, au format officiel.' },
        { title: 'Coefficients auto', desc: 'Moyennes et classements calculés automatiquement.' },
        { title: 'Par trimestre', desc: 'Gestion par trimestre avec historique complet.' },
        { title: 'Analyse performance', desc: 'Graphiques par élève, par matière, par classe.' },
        { title: 'Commentaires', desc: 'Ajoutez des appréciations personnalisées sur chaque bulletin.' },
      ],
      features: [
        { icon: Calculator, title: 'Calculs auto', desc: 'Moyennes, coefficients, rangs — tout est calculé.' },
        { icon: FileText, title: 'Bulletins PDF', desc: 'Format officiel imprimable en un clic.' },
        { icon: BarChart3, title: 'Analytics', desc: 'Performances par matière et par période.' },
        { icon: TrendingUp, title: 'Progression', desc: 'Suivi de l\'évolution des notes dans le temps.' },
      ],
      cta: { title: 'Prêt à simplifier la gestion des notes ?', btn: 'Commencer gratuitement' },
    },
    en: {
      hero: {
        badge: 'Grade Management',
        title: 'Report Cards Made Simple',
        subtitle: 'Fast entry, automatic calculations, printable report cards, and performance analytics by subject.',
      },
      benefits: [
        { title: 'Fast Entry', desc: 'Enter grades by subject, by class — all coefficients calculated.' },
        { title: 'PDF Report Cards', desc: 'Generate and print report cards in one click, official format.' },
        { title: 'Auto Coefficients', desc: 'Averages and rankings calculated automatically.' },
        { title: 'By Term', desc: 'Management by term with complete history.' },
        { title: 'Performance Analysis', desc: 'Charts by student, subject, and class.' },
        { title: 'Comments', desc: 'Add personalized comments on each report card.' },
      ],
      features: [
        { icon: Calculator, title: 'Auto Calculations', desc: 'Averages, coefficients, ranks — all calculated.' },
        { icon: FileText, title: 'PDF Reports', desc: 'Official printable format in one click.' },
        { icon: BarChart3, title: 'Analytics', desc: 'Performance by subject and period.' },
        { icon: TrendingUp, title: 'Progress', desc: 'Track grade evolution over time.' },
      ],
      cta: { title: 'Ready to simplify grade management?', btn: 'Start Free' },
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
          <span className="text-[#4F46E5] font-semibold">{lang === 'fr' ? 'Gestion des Notes' : 'Grades'}</span>
        </div>
      </div>

      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #DB2777 0%, #F472B6 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 py-14 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
              <GraduationCap size={16} /> {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{t.hero.title}</h1>
            <p className="text-lg text-white/80 leading-relaxed">{t.hero.subtitle}</p>
            <div className="flex gap-4 mt-8">
              <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-pink-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
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
            <div key={i} className="flex gap-4 p-6 rounded-2xl bg-[#f8f9fa] hover:bg-pink-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-pink-600" />
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
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-pink-600" />
                </div>
                <h3 className="font-bold text-[#111827] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B7280]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="rounded-3xl p-12 text-center" style={{ background: 'linear-gradient(135deg, #DB2777 0%, #F472B6 100%)' }}>
          <h2 className="text-3xl font-bold text-white mb-4">{t.cta.title}</h2>
          <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-pink-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
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
