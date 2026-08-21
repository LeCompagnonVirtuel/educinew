'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Check,
  X,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Building2,
  Crown,
} from 'lucide-react';

const translations = {
  en: {
    hero: {
      badge: 'Simple Pricing',
      title: 'Plans for Every School',
      subtitle: 'Transparent pricing with no hidden fees. Start with a 30-day free trial.',
    },
    toggle: { monthly: 'Monthly', annual: 'Annual', discount: 'Save 20%' },
    plans: [
      {
        name: 'Essential',
        monthly: 15000,
        description: 'Perfect for small schools getting started with digital management.',
        icon: 'zap',
        features: [
          'Up to 200 students',
          'Student management',
          'Attendance tracking',
          'Basic grade management',
          'Email support',
          'Mobile app access',
        ],
        notIncluded: ['Mobile Money integration', 'AI Learning Assistant', 'GPS Transport tracking'],
        cta: 'Start Free Trial',
      },
      {
        name: 'Professional',
        monthly: 35000,
        description: 'Ideal for growing schools that need advanced features and integrations.',
        icon: 'crown',
        popular: true,
        features: [
          'Up to 1,000 students',
          'All Essential features',
          'Mobile Money payments',
          'AI Learning Assistant',
          'Parent communication portal',
          'Exam preparation tools',
          'Priority support',
          'Custom report cards',
        ],
        notIncluded: ['GPS Transport tracking', 'White-label options'],
        cta: 'Start Free Trial',
      },
      {
        name: 'Enterprise',
        monthly: null,
        description: 'For large institutions and school networks with custom requirements.',
        icon: 'building',
        features: [
          'Unlimited students',
          'All Professional features',
          'GPS Transport tracking',
          'White-label options',
          'API access',
          'Dedicated account manager',
          'On-site training',
          'Custom integrations',
          'SLA guarantee',
        ],
        notIncluded: [],
        cta: 'Contact Sales',
      },
    ],
    comparison: {
      title: 'Feature Comparison',
      headers: ['Feature', 'Essential', 'Professional', 'Enterprise'],
      rows: [
        ['Student Management', true, true, true],
        ['Attendance Tracking', true, true, true],
        ['Grade Management', true, true, true],
        ['Mobile App', true, true, true],
        ['Email Support', true, true, true],
        ['Mobile Money Payments', false, true, true],
        ['AI Learning Assistant', false, true, true],
        ['Parent Communication', false, true, true],
        ['Exam Preparation', false, true, true],
        ['Priority Support', false, true, true],
        ['GPS Transport', false, false, true],
        ['White-label', false, false, true],
        ['API Access', false, false, true],
        ['Dedicated Manager', false, false, true],
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'Is there a free trial?',
          a: 'Yes! All plans come with a 30-day free trial. No credit card required to start.',
        },
        {
          q: 'Can I change plans later?',
          a: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept Mobile Money (Orange Money, MTN MoMo, Wave), bank transfers, and credit cards — all processed securely via Money Fusion.',
        },
        {
          q: 'Is there a setup fee?',
          a: 'No. There are no setup fees for any plan. We also provide free onboarding assistance.',
        },
        {
          q: 'Do you offer discounts for NGOs?',
          a: 'Yes, we offer special pricing for non-profit schools and NGOs. Contact our sales team for details.',
        },
      ],
    },
    cta: {
      title: 'Start Your Free Trial Today',
      subtitle: 'No credit card required. 30 days free on all plans.',
      button: 'Get Started Free',
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
      badge: 'Tarification Simple',
      title: 'Des Plans Pour Chaque École',
      subtitle: 'Tarification transparente sans frais cachés. Commencez avec un essai gratuit de 30 jours.',
    },
    toggle: { monthly: 'Mensuel', annual: 'Annuel', discount: 'Économisez 20%' },
    plans: [
      {
        name: 'Essentiel',
        monthly: 15000,
        description: 'Parfait pour les petites écoles qui débutent la gestion numérique.',
        icon: 'zap',
        features: [
          'Jusqu\'à 200 élèves',
          'Gestion des élèves',
          'Suivi des présences',
          'Gestion des notes basique',
          'Support par email',
          'Accès application mobile',
        ],
        notIncluded: ['Intégration Mobile Money', 'Assistant IA', 'Suivi GPS Transport'],
        cta: 'Essai Gratuit',
      },
      {
        name: 'Professionnel',
        monthly: 35000,
        description: 'Idéal pour les écoles en croissance nécessitant des fonctionnalités avancées.',
        icon: 'crown',
        popular: true,
        features: [
          'Jusqu\'à 1 000 élèves',
          'Toutes les fonctionnalités Essentiel',
          'Paiements Mobile Money',
          'Assistant IA d\'apprentissage',
          'Portail communication parents',
          'Outils de préparation aux examens',
          'Support prioritaire',
          'Bulletins personnalisés',
        ],
        notIncluded: ['Suivi GPS Transport', 'Options white-label'],
        cta: 'Essai Gratuit',
      },
      {
        name: 'Entreprise',
        monthly: null,
        description: 'Pour les grandes institutions et réseaux scolaires avec des besoins spécifiques.',
        icon: 'building',
        features: [
          'Élèves illimités',
          'Toutes les fonctionnalités Professionnel',
          'Suivi GPS Transport',
          'Options white-label',
          'Accès API',
          'Gestionnaire de compte dédié',
          'Formation sur site',
          'Intégrations personnalisées',
          'Garantie SLA',
        ],
        notIncluded: [],
        cta: 'Contacter les Ventes',
      },
    ],
    comparison: {
      title: 'Comparaison des Fonctionnalités',
      headers: ['Fonctionnalité', 'Essentiel', 'Professionnel', 'Entreprise'],
      rows: [
        ['Gestion des élèves', true, true, true],
        ['Suivi des présences', true, true, true],
        ['Gestion des notes', true, true, true],
        ['Application mobile', true, true, true],
        ['Support email', true, true, true],
        ['Paiements Mobile Money', false, true, true],
        ['Assistant IA', false, true, true],
        ['Communication parents', false, true, true],
        ['Préparation examens', false, true, true],
        ['Support prioritaire', false, true, true],
        ['GPS Transport', false, false, true],
        ['White-label', false, false, true],
        ['Accès API', false, false, true],
        ['Gestionnaire dédié', false, false, true],
      ],
    },
    faq: {
      title: 'Questions Fréquentes',
      items: [
        {
          q: 'Y a-t-il un essai gratuit ?',
          a: 'Oui ! Tous les plans incluent un essai gratuit de 30 jours. Aucune carte de crédit requise.',
        },
        {
          q: 'Puis-je changer de plan plus tard ?',
          a: 'Absolument. Vous pouvez passer à un plan supérieur ou inférieur à tout moment.',
        },
        {
          q: 'Quels modes de paiement acceptez-vous ?',
          a: 'Nous acceptons Mobile Money (Orange Money, MTN MoMo, Wave), virements bancaires et cartes de crédit — le tout via Money Fusion, notre passerelle sécurisée.',
        },
        {
          q: 'Y a-t-il des frais d\'installation ?',
          a: 'Non. Il n\'y a pas de frais d\'installation pour aucun plan. Nous offrons aussi une assistance gratuite.',
        },
        {
          q: 'Offrez-vous des réductions pour les ONG ?',
          a: 'Oui, nous offrons des tarifs spéciaux pour les écoles à but non lucratif et les ONG.',
        },
      ],
    },
    cta: {
      title: 'Commencez Votre Essai Gratuit',
      subtitle: 'Aucune carte de crédit requise. 30 jours gratuits sur tous les plans.',
      button: 'Commencer Gratuitement',
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

const planIcons = { zap: Zap, crown: Crown, building: Building2 };

export default function PricingPage() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = translations[lang] || translations.en;

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const formatPrice = (price: number) => {
    const discounted = isAnnual ? Math.round(price * 0.8) : price;
    return discounted.toLocaleString();
  };

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

      {/* Toggle */}
      <div className="flex items-center justify-center mt-12 mb-8">
        <div className="bg-white rounded-xl p-1.5 shadow-sm border border-gray-200 flex items-center gap-1">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              !isAnnual ? 'bg-[#4F46E5] text-white shadow' : 'text-[#6B7280] hover:text-[#111827]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.toggle.monthly}
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              isAnnual ? 'bg-[#4F46E5] text-white shadow' : 'text-[#6B7280] hover:text-[#111827]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.toggle.annual}
            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">{t.toggle.discount}</span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.plans.map((plan, index) => {
            const Icon = planIcons[plan.icon as keyof typeof planIcons];
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-8 border transition-all hover:shadow-xl ${
                  plan.popular
                    ? 'border-[#4F46E5] shadow-lg ring-2 ring-[#4F46E5]/20'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#4F46E5] text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  plan.popular ? 'bg-[#4F46E5]' : 'bg-indigo-50'
                }`}>
                  <Icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-[#4F46E5]'}`} />
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {plan.name}
                </h3>
                <p className="text-[#6B7280] text-sm mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  {plan.monthly !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-[#111827]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {formatPrice(plan.monthly)}
                      </span>
                      <span className="text-[#6B7280] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        FCFA/{isAnnual ? 'mo' : 'mo'}
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-[#111827]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Custom
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-[#111827]" style={{ fontFamily: 'Inter, sans-serif' }}>{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 opacity-40">
                      <X className="w-5 h-5 text-[#6B7280] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#6B7280]" style={{ fontFamily: 'Inter, sans-serif' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.monthly !== null ? '/demo' : '/demo'}
                  className={`block w-full text-center py-3.5 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
                      : 'bg-indigo-50 text-[#4F46E5] hover:bg-indigo-100'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-[#111827] text-center mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
          {t.comparison.title}
        </h2>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {t.comparison.headers.map((header, i) => (
                  <th key={i} className={`px-6 py-4 text-sm font-semibold text-[#111827] ${i > 0 ? 'text-center' : 'text-left'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.comparison.rows.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-6 py-3.5 ${j > 0 ? 'text-center' : 'text-left'}`}>
                      {typeof cell === 'boolean' ? (
                        cell ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-[#111827]" style={{ fontFamily: 'Inter, sans-serif' }}>{cell}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-3xl font-bold text-[#111827] text-center mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
          {t.faq.title}
        </h2>
        <div className="space-y-3">
          {t.faq.items.map((item, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-medium text-[#111827]" style={{ fontFamily: 'Inter, sans-serif' }}>{item.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-[#6B7280] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#6B7280] shrink-0" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4">
                  <p className="text-[#6B7280] text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #60A5FA 100%)' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            {t.cta.title}
          </h2>
          <p className="text-white/80 text-lg mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            {t.cta.subtitle}
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#4F46E5] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.cta.button}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
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
              <Link href="/features" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.features}
              </Link>
              <Link href="/pricing" className="text-sm text-[#4F46E5] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
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
