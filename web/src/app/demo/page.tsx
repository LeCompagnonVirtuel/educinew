'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  Users,
  BarChart3,
  Smartphone,
  Headphones,
} from 'lucide-react';

const translations = {
  en: {
    hero: {
      badge: 'Get Started',
      title: 'Request a Demo',
      subtitle: 'See how EduCI can transform your school management in a personalized walkthrough.',
    },
    benefits: [
      { icon: 'zap', title: 'Quick Setup', description: 'Get your school running on EduCI in under 24 hours.' },
      { icon: 'users', title: 'Personalized Walkthrough', description: 'A dedicated specialist guides you through every feature.' },
      { icon: 'shield', title: 'Data Security', description: 'Your school data is encrypted and stored securely.' },
      { icon: 'chart', title: 'Proven Results', description: 'Schools report 40% less admin time within the first month.' },
      { icon: 'phone', title: 'Mobile Ready', description: 'Full functionality on any device, optimized for mobile.' },
      { icon: 'support', title: 'Ongoing Support', description: '24/7 support team available in English and French.' },
    ],
    form: {
      title: 'Fill in Your Details',
      name: 'Full Name',
      namePlaceholder: 'Jean Kouassi',
      email: 'Email Address',
      emailPlaceholder: 'jean@ecole.ci',
      schoolName: 'School Name',
      schoolNamePlaceholder: 'École Primaire Les Petits Génies',
      schoolType: 'School Type',
      schoolTypePlaceholder: 'Select a type',
      schoolTypes: ['Primary School', 'Secondary School', 'High School', 'Technical/Vocational', 'University', 'Other'],
      message: 'Message (Optional)',
      messagePlaceholder: 'Tell us about your school\'s needs...',
      submit: 'Request Demo',
      submitting: 'Sending...',
    },
    success: {
      title: 'Demo Request Sent!',
      message: 'Thank you for your interest in EduCI. Our team will contact you within 24 hours to schedule your personalized demo.',
      cta: 'Back to Home',
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
      badge: 'Commencer',
      title: 'Demander une Démo',
      subtitle: 'Découvrez comment EduCI peut transformer la gestion de votre école lors d\'une présentation personnalisée.',
    },
    benefits: [
      { icon: 'zap', title: 'Installation Rapide', description: 'Votre école opérationnelle sur EduCI en moins de 24 heures.' },
      { icon: 'users', title: 'Présentation Personnalisée', description: 'Un spécialiste dédié vous guide à travers chaque fonctionnalité.' },
      { icon: 'shield', title: 'Sécurité des Données', description: 'Les données de votre école sont chiffrées et stockées en sécurité.' },
      { icon: 'chart', title: 'Résultats Prouvés', description: 'Les écoles rapportent 40% de temps administratif en moins.' },
      { icon: 'phone', title: 'Prêt Mobile', description: 'Fonctionnalité complète sur tous les appareils, optimisé pour mobile.' },
      { icon: 'support', title: 'Support Continu', description: 'Équipe disponible 24h/24 en français et en anglais.' },
    ],
    form: {
      title: 'Remplissez Vos Coordonnées',
      name: 'Nom Complet',
      namePlaceholder: 'Jean Kouassi',
      email: 'Adresse Email',
      emailPlaceholder: 'jean@ecole.ci',
      schoolName: 'Nom de l\'École',
      schoolNamePlaceholder: 'École Primaire Les Petits Génies',
      schoolType: 'Type d\'Établissement',
      schoolTypePlaceholder: 'Sélectionner un type',
      schoolTypes: ['École Primaire', 'Collège', 'Lycée', 'Technique/Professionnel', 'Université', 'Autre'],
      message: 'Message (Optionnel)',
      messagePlaceholder: 'Parlez-nous des besoins de votre école...',
      submit: 'Demander la Démo',
      submitting: 'Envoi en cours...',
    },
    success: {
      title: 'Demande Envoyée !',
      message: 'Merci pour votre intérêt pour EduCI. Notre équipe vous contactera dans les 24 heures pour planifier votre démo personnalisée.',
      cta: 'Retour à l\'Accueil',
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

const benefitIcons = {
  zap: Zap,
  users: Users,
  shield: Shield,
  chart: BarChart3,
  phone: Smartphone,
  support: Headphones,
};

export default function DemoPage() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', schoolName: '', schoolType: '', message: '' });
  const t = translations[lang] || translations.en;

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const demoSchema = z.object({
    name: z.string().min(2, lang === 'fr' ? 'Le nom doit contenir au moins 2 caractères' : 'Name must be at least 2 characters'),
    email: z.string().email(lang === 'fr' ? 'Adresse email invalide' : 'Invalid email address'),
    schoolName: z.string().min(2, lang === 'fr' ? 'Le nom de l\'école est requis' : 'School name is required'),
    schoolType: z.string().optional(),
    message: z.string().optional(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const result = demoSchema.safeParse(formData);
    if (!result.success) {
      setFormError(result.error.issues[0]?.message || 'Données invalides');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #60A5FA 100%)' }}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
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

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {submitted ? (
          /* Success State */
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[#111827] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.success.title}
            </h2>
            <p className="text-[#6B7280] mb-8 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.success.message}
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#4F46E5] text-white font-semibold rounded-xl hover:bg-[#4338CA] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t.success.cta}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        ) : (
          /* Form + Benefits */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-[#111827] mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                {lang === 'fr' ? 'Pourquoi EduCI ?' : 'Why EduCI?'}
              </h2>
              <div className="space-y-5">
                {t.benefits.map((benefit, index) => {
                  const Icon = benefitIcons[benefit.icon as keyof typeof benefitIcons];
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[#4F46E5]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#111827] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {benefit.title}
                        </h3>
                        <p className="text-[#6B7280] text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#111827] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.form.title}
              </h2>
              {formError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                  {formError}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {t.form.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.form.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8f9fa] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {t.form.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.form.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8f9fa] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {t.form.schoolName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    placeholder={t.form.schoolNamePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8f9fa] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {t.form.schoolType}
                  </label>
                  <select
                    required
                    value={formData.schoolType}
                    onChange={(e) => setFormData({ ...formData, schoolType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8f9fa] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-colors appearance-none"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <option value="">{t.form.schoolTypePlaceholder}</option>
                    {t.form.schoolTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {t.form.message}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.form.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8f9fa] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-colors resize-none"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 bg-[#4F46E5] text-white font-semibold rounded-xl hover:bg-[#4338CA] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {sending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.form.submitting}
                    </>
                  ) : (
                    <>
                      {t.form.submit}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.footer.copyright}
            </p>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.home}
              </Link>
              <Link href="/features" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.features}
              </Link>
              <Link href="/pricing" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.pricing}
              </Link>
              <Link href="/demo" className="text-sm text-[#4F46E5] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.contact}
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
