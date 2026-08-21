'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Users,
  Clock,
  CreditCard,
  Bot,
  MessageSquare,
  Bus,
  GraduationCap,
  FileText,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const translations = {
  en: {
    hero: {
      badge: 'Powerful Features',
      title: 'Everything Your School Needs',
      subtitle: 'A comprehensive suite of tools designed specifically for African schools',
    },
    features: [
      {
        title: 'Student Management',
        description: 'Complete student profiles with enrollment, transfers, and academic history tracking.',
        learnMore: 'Learn more',
      },
      {
        title: 'Attendance Tracking',
        description: 'Real-time attendance monitoring with automated alerts for absences and late arrivals.',
        learnMore: 'Learn more',
      },
      {
        title: 'Mobile Money Payments',
        description: 'Seamless integration with Money Fusion for fee collection via Mobile Money, cards, and bank transfers.',
        learnMore: 'Learn more',
      },
      {
        title: 'AI Learning Assistant',
        description: 'Intelligent tutoring system that adapts to each student\'s learning pace.',
        learnMore: 'Learn more',
      },
      {
        title: 'Parent Communication',
        description: 'Instant notifications, report cards, and direct messaging with parents.',
        learnMore: 'Learn more',
      },
      {
        title: 'School Transport',
        description: 'GPS tracking, route optimization, and real-time location sharing with parents.',
        learnMore: 'Learn more',
      },
      {
        title: 'Grade Management',
        description: 'Automated report cards, grade calculations, and performance analytics.',
        learnMore: 'Learn more',
      },
      {
        title: 'Exam Preparation',
        description: 'Practice tests, past papers, and AI-powered study recommendations.',
        learnMore: 'Learn more',
      },
    ],
    cta: {
      title: 'Ready to Transform Your School?',
      subtitle: 'Join hundreds of schools already using EduCI to streamline their operations.',
      primary: 'Start Free Trial',
      secondary: 'Contact Sales',
    },
    footer: {
      copyright: '© 2026 EduCI. All rights reserved.',
      home: 'Home',
      features: 'Features',
      pricing: 'Pricing',
      contact: 'Contact',
    },
  },
  fr: {
    hero: {
      badge: 'Fonctionnalités Puissantes',
      title: 'Tout Ce Dont Votre École a Besoin',
      subtitle: 'Une suite complète d\'outils conçus spécifiquement pour les écoles africaines',
    },
    features: [
      {
        title: 'Gestion des Élèves',
        description: 'Profils complets des élèves avec inscription, transferts et suivi de l\'historique académique.',
        learnMore: 'En savoir plus',
      },
      {
        title: 'Suivi des Présences',
        description: 'Surveillance en temps réel avec alertes automatiques pour absences et retards.',
        learnMore: 'En savoir plus',
      },
      {
        title: 'Paiements Mobile Money',
        description: 'Intégration avec Money Fusion pour la collecte des frais via Mobile Money, cartes et virements.',
        learnMore: 'En savoir plus',
      },
      {
        title: 'Assistant IA d\'Apprentissage',
        description: 'Système de tutorat intelligent qui s\'adapte au rythme d\'apprentissage de chaque élève.',
        learnMore: 'En savoir plus',
      },
      {
        title: 'Communication Parents',
        description: 'Notifications instantanées, bulletins et messagerie directe avec les parents.',
        learnMore: 'En savoir plus',
      },
      {
        title: 'Transport Scolaire',
        description: 'Suivi GPS, optimisation des itinéraires et partage de localisation en temps réel.',
        learnMore: 'En savoir plus',
      },
      {
        title: 'Gestion des Notes',
        description: 'Bulletins automatisés, calculs de notes et analyses de performance.',
        learnMore: 'En savoir plus',
      },
      {
        title: 'Préparation aux Examens',
        description: 'Tests pratiques, anciens sujets et recommandations d\'étude par IA.',
        learnMore: 'En savoir plus',
      },
    ],
    cta: {
      title: 'Prêt à Transformer Votre École ?',
      subtitle: 'Rejoignez des centaines d\'écoles utilisant déjà EduCI pour simplifier leurs opérations.',
      primary: 'Essai Gratuit',
      secondary: 'Contacter les Ventes',
    },
    footer: {
      copyright: '© 2026 EduCI. Tous droits réservés.',
      home: 'Accueil',
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      contact: 'Contact',
    },
  },
};

const featureLinks = [
  '/features/students',
  '/features/attendance',
  '/features/payments',
  '/features/ai',
  '/features/communication',
  '/features/transport',
  '/features/grades',
  '/features/exams',
];

const icons = [Users, Clock, CreditCard, Bot, MessageSquare, Bus, GraduationCap, FileText];

const colors = [
  { bg: 'bg-indigo-50', icon: 'text-[#4F46E5]', border: 'border-indigo-100' },
  { bg: 'bg-blue-50', icon: 'text-[#60A5FA]', border: 'border-blue-100' },
  { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
  { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100' },
  { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-100' },
  { bg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-100' },
  { bg: 'bg-pink-50', icon: 'text-pink-600', border: 'border-pink-100' },
  { bg: 'bg-yellow-50', icon: 'text-yellow-600', border: 'border-yellow-100' },
];

export default function FeaturesPage() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const t = translations[lang] || translations.en;

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #60A5FA 100%)' }}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.hero.subtitle}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#f8f9fa]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
      </header>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((feature, index) => {
            const Icon = icons[index];
            const color = colors[index];
            return (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-6 border ${color.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 ${color.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${color.icon}`} />
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {feature.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {feature.description}
                </p>
                <Link
                  href={featureLinks[index]}
                  className={`inline-flex items-center text-sm font-medium ${color.icon} hover:underline`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {feature.learnMore}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #60A5FA 100%)' }}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.cta.title}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#4F46E5] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                {t.cta.primary}
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {t.cta.secondary}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.footer.copyright}
            </p>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.home}
              </Link>
              <Link href="/features" className="text-sm text-[#4F46E5] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.features}
              </Link>
              <Link href="/pricing" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.pricing}
              </Link>
              <Link href="/demo" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.contact}
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
