'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import {
  CreditCard, ArrowRight, CheckCircle, Smartphone, FileText, Shield,
  BarChart3, Bell, RefreshCw, ChevronRight, Home,
} from 'lucide-react';

export default function PaymentsFeaturePage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      hero: {
        badge: 'Paiements Money Fusion',
        title: 'Collectez les frais scolaires en un clic',
        subtitle: 'Money Fusion intégré : Mobile Money (Orange, MTN, Wave, Moov) et Carte bancaire. Reçus automatiques, rappels de paiement et suivi en temps réel.',
      },
      benefits: [
        { title: 'Mobile Money', desc: 'Paiement direct via Orange Money, MTN MoMo, Wave et Moov.' },
        { title: 'Carte bancaire', desc: 'Paiement par carte Visa/Mastercard via Money Fusion.' },
        { title: 'Passerelle unique', desc: 'Un seul compte Money Fusion pour tous les modes de paiement.' },
        { title: 'Reçus automatiques', desc: 'Reçus PDF générés et envoyés par SMS/email.' },
        { title: 'Rappels automatiques', desc: 'Notifications avant l\'échéance pour les paiements en attente.' },
        { title: 'Plans de scolarité', desc: 'Configurez mensuel, trimestriel ou annuel avec réductions.' },
      ],
      features: [
        { icon: Smartphone, title: 'Mobile First', desc: 'Paiement depuis n\'importe quel téléphone.' },
        { icon: FileText, title: 'Reçus PDF', desc: 'Génération et envoi automatiques.' },
        { icon: BarChart3, title: 'Rapports financiers', desc: 'Suivi des encaissements par période.' },
        { icon: Bell, title: 'Rappels', desc: 'SMS automatiques avant échéance.' },
      ],
      cta: { title: 'Prêt à moderniser vos paiements ?', btn: 'Commencer gratuitement' },
    },
    en: {
      hero: {
        badge: 'Money Fusion Payments',
        title: 'Collect School Fees in One Click',
        subtitle: 'Money Fusion integrated: Mobile Money (Orange, MTN, Wave, Moov) and Bank Cards. Automatic receipts, payment reminders, and real-time tracking.',
      },
      benefits: [
        { title: 'Mobile Money', desc: 'Direct payment via Orange Money, MTN MoMo, Wave and Moov.' },
        { title: 'Bank Cards', desc: 'Visa/Mastercard payment via Money Fusion.' },
        { title: 'Single Gateway', desc: 'One Money Fusion account for all payment methods.' },
        { title: 'Auto Receipts', desc: 'PDF receipts generated and sent via SMS/email.' },
        { title: 'Auto Reminders', desc: 'Notifications before deadline for pending payments.' },
        { title: 'Tuition Plans', desc: 'Set monthly, quarterly, or yearly with discounts.' },
      ],
      features: [
        { icon: Smartphone, title: 'Mobile First', desc: 'Pay from any phone.' },
        { icon: FileText, title: 'PDF Receipts', desc: 'Automatic generation and sending.' },
        { icon: BarChart3, title: 'Financial Reports', desc: 'Track collections by period.' },
        { icon: Bell, title: 'Reminders', desc: 'Automatic SMS before deadline.' },
      ],
      cta: { title: 'Ready to modernize your payments?', btn: 'Start Free' },
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
          <span className="text-[#4F46E5] font-semibold">{lang === 'fr' ? 'Paiements Money Fusion' : 'Payments'}</span>
        </div>
      </div>

      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #059669 0%, #34D399 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 py-14 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
              <CreditCard size={16} /> {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{t.hero.title}</h1>
            <p className="text-lg text-white/80 leading-relaxed">{t.hero.subtitle}</p>
            <div className="flex gap-4 mt-8">
              <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
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
            <div key={i} className="flex gap-4 p-6 rounded-2xl bg-[#f8f9fa] hover:bg-emerald-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-emerald-600" />
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
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-emerald-600" />
                </div>
                <h3 className="font-bold text-[#111827] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B7280]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="rounded-3xl p-12 text-center" style={{ background: 'linear-gradient(135deg, #059669 0%, #34D399 100%)' }}>
          <h2 className="text-3xl font-bold text-white mb-4">{t.cta.title}</h2>
          <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
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
