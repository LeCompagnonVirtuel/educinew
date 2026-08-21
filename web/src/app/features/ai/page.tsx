'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Bot, ArrowRight, CheckCircle, Sparkles, BookOpen, Brain,
  Target, Zap, MessageSquare, ChevronRight, Home,
} from 'lucide-react';

export default function AiFeaturePage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      hero: {
        badge: 'Intelligence Artificielle',
        title: 'Le tuteur intelligent pour chaque élève',
        subtitle: 'Un assistant IA qui explique les exercices, génère des quiz personnalisés et identifie les points faibles.',
      },
      benefits: [
        { title: 'Explications étape par étape', desc: 'L\'IA décompose chaque exercice en étapes compréhensibles.' },
        { title: 'Quiz personnalisés', desc: 'Génération automatique de quiz adaptés au niveau de l\'élève.' },
        { title: 'Résumés de cours', desc: 'Condense vos cours en fiches de révision claires.' },
        { title: 'Points faibles', desc: 'Identifie les matières où l\'élève a besoin de plus de travail.' },
        { title: 'Programme CEPE/BEPAC/BAC', desc: 'Contenu aligné sur le programme officiel ivoirien.' },
        { title: 'Disponible 24/7', desc: 'L\'assistant est disponible à tout moment, même le week-end.' },
      ],
      features: [
        { icon: Brain, title: 'Chat IA', desc: 'Posez vos questions en langage naturel.' },
        { icon: BookOpen, title: 'Résumés', desc: 'Fiches de révision générées automatiquement.' },
        { icon: Target, title: 'Quiz adaptatifs', desc: 'Questions qui s\'adaptent au niveau.' },
        { icon: Sparkles, title: 'Recommandations', desc: 'Suggestions d\'amélioration personnalisées.' },
      ],
      cta: { title: 'Prêt à révolutionner l\'apprentissage ?', btn: 'Essayer l\'IA gratuitement' },
    },
    en: {
      hero: {
        badge: 'Artificial Intelligence',
        title: 'The Intelligent Tutor for Every Student',
        subtitle: 'An AI assistant that explains exercises, generates personalized quizzes, and identifies weak points.',
      },
      benefits: [
        { title: 'Step-by-Step Explanations', desc: 'AI breaks down every exercise into understandable steps.' },
        { title: 'Personalized Quizzes', desc: 'Auto-generated quizzes adapted to each student\'s level.' },
        { title: 'Lesson Summaries', desc: 'Condenses your lessons into clear revision sheets.' },
        { title: 'Weak Points', desc: 'Identifies subjects where students need more practice.' },
        { title: 'CEPE/BEPAC/BAC Curriculum', desc: 'Content aligned with the official Ivorian curriculum.' },
        { title: 'Available 24/7', desc: 'The assistant is available anytime, even on weekends.' },
      ],
      features: [
        { icon: Brain, title: 'AI Chat', desc: 'Ask questions in natural language.' },
        { icon: BookOpen, title: 'Summaries', desc: 'Auto-generated revision sheets.' },
        { icon: Target, title: 'Adaptive Quizzes', desc: 'Questions that adapt to level.' },
        { icon: Sparkles, title: 'Recommendations', desc: 'Personalized improvement suggestions.' },
      ],
      cta: { title: 'Ready to revolutionize learning?', btn: 'Try AI Free' },
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
          <span className="text-[#4F46E5] font-semibold">{lang === 'fr' ? 'Assistant IA' : 'AI Assistant'}</span>
        </div>
      </div>

      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 py-14 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
              <Bot size={16} /> {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{t.hero.title}</h1>
            <p className="text-lg text-white/80 leading-relaxed">{t.hero.subtitle}</p>
            <div className="flex gap-4 mt-8">
              <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
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
            <div key={i} className="flex gap-4 p-6 rounded-2xl bg-[#f8f9fa] hover:bg-purple-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-purple-600" />
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
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-purple-600" />
                </div>
                <h3 className="font-bold text-[#111827] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B7280]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="rounded-3xl p-12 text-center" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
          <h2 className="text-3xl font-bold text-white mb-4">{t.cta.title}</h2>
          <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
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
