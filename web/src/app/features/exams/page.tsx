'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import {
  FileText, ArrowRight, CheckCircle, BookOpen, Brain, Target,
  Download, Star, Trophy, ChevronRight, Home,
} from 'lucide-react';

export default function ExamsFeaturePage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      hero: {
        badge: 'Préparation aux Examens',
        title: 'Réussissez le CEPE, BEPC et BAC',
        subtitle: 'Sujets d\'examens passés, quiz interactifs et recommandations d\'étude par IA pour maximiser les résultats.',
      },
      benefits: [
        { title: 'Sujets CEPE', desc: 'Tous les sujets du CEPE des 10 dernières années, classés par matière.' },
        { title: 'Sujets BEPC', desc: 'Annales complètes avec corrigés détaillés.' },
        { title: 'Sujets BAC', desc: 'Préparation au BAC scientifique, littéraire et technique.' },
        { title: 'Quiz interactifs', desc: 'Entraînez-vous avec des quiz chronométrés comme le jour J.' },
        { title: 'IA d\'étude', desc: 'L\'IA identifie vos faiblesses et propose des révisions ciblées.' },
        { title: 'Classement', desc: 'Comparez vos résultats avec d\'autres élèves de votre niveau.' },
      ],
      features: [
        { icon: BookOpen, title: 'Annales', desc: 'Base de données complète des examens passés.' },
        { icon: Brain, title: 'IA tutorat', desc: 'Recommandations personnalisées par IA.' },
        { icon: Target, title: 'Quiz chrono', desc: 'Simulations d\'examen en conditions réelles.' },
        { icon: Download, title: 'Téléchargement', desc: 'Téléchargez les sujets en PDF pour réviser hors ligne.' },
      ],
      cta: { title: 'Prêt à préparer vos examens ?', btn: 'Commencer gratuitement' },
    },
    en: {
      hero: {
        badge: 'Exam Preparation',
        title: 'Ace CEPE, BEPC, and BAC',
        subtitle: 'Past exam papers, interactive quizzes, and AI-powered study recommendations to maximize results.',
      },
      benefits: [
        { title: 'CEPE Papers', desc: 'All CEPE papers from the last 10 years, sorted by subject.' },
        { title: 'BEPC Papers', desc: 'Complete archives with detailed corrections.' },
        { title: 'BAC Papers', desc: 'Prep for science, literature, and technical BAC.' },
        { title: 'Interactive Quizzes', desc: 'Practice with timed quizzes like the real thing.' },
        { title: 'AI Study', desc: 'AI identifies your weak points and suggests targeted reviews.' },
        { title: 'Leaderboard', desc: 'Compare your results with other students at your level.' },
      ],
      features: [
        { icon: BookOpen, title: 'Archives', desc: 'Complete past exam database.' },
        { icon: Brain, title: 'AI Tutoring', desc: 'Personalized AI recommendations.' },
        { icon: Target, title: 'Timed Quizzes', desc: 'Real exam conditions simulation.' },
        { icon: Download, title: 'Download', desc: 'Download papers as PDF for offline study.' },
      ],
      cta: { title: 'Ready to prepare for your exams?', btn: 'Start Free' },
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
          <span className="text-[#4F46E5] font-semibold">{lang === 'fr' ? 'Préparation aux Examens' : 'Exam Prep'}</span>
        </div>
      </div>

      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #D97706 0%, #FBBF24 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 py-14 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
              <FileText size={16} /> {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{t.hero.title}</h1>
            <p className="text-lg text-white/80 leading-relaxed">{t.hero.subtitle}</p>
            <div className="flex gap-4 mt-8">
              <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-amber-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
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
            <div key={i} className="flex gap-4 p-6 rounded-2xl bg-[#f8f9fa] hover:bg-amber-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-amber-600" />
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
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-[#111827] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B7280]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="rounded-3xl p-12 text-center" style={{ background: 'linear-gradient(135deg, #D97706 0%, #FBBF24 100%)' }}>
          <h2 className="text-3xl font-bold text-white mb-4">{t.cta.title}</h2>
          <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-amber-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
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
