'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Clock, ArrowRight, CheckCircle, MapPin, Bell, BarChart3,
  QrCode, Smartphone, Shield, ChevronRight, Home, LogIn,
} from 'lucide-react';

export default function AttendanceFeaturePage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      hero: {
        badge: 'Suivi des Présences',
        title: 'Présences en temps réel, parents informés',
        subtitle: 'Pointage numérique avec QR code, géolocalisation et alertes automatiques aux parents en cas d\'absence.',
      },
      benefits: [
        { title: 'Pointage QR Code', desc: 'Les élèves scannent un QR code à l\'entrée. Rapide et sans erreur.' },
        { title: 'Alertes parents', desc: 'Notification automatique SMS/push si l\'élève est absent ou en retard.' },
        { title: 'Rapports détaillés', desc: 'Taux de présence par classe, par mois, par élève — exportable.' },
        { title: 'Anti-fraude', desc: 'Géolocalisation et horodatage pour éviter les pointages frauduleux.' },
        { title: 'Multi-méthodes', desc: 'QR code, GPS, liste manuelle — choisissez la méthode adaptée.' },
        { title: 'Statistiques live', desc: 'Dashboard temps réel : présents, absents, retards du jour.' },
      ],
      features: [
        { icon: QrCode, title: 'QR Code', desc: 'Génération automatique quotidienne des QR de présence.' },
        { icon: Bell, title: 'Notifications', desc: 'SMS et push automatiques vers les parents.' },
        { icon: BarChart3, title: 'Analytics', desc: 'Graphiques et tendances de présence.' },
        { icon: Smartphone, title: 'Mobile', desc: 'Pointage depuis le téléphone de l\'enseignant.' },
      ],
      cta: { title: 'Prêt à simplifier le suivi des présences ?', btn: 'Commencer gratuitement' },
    },
    en: {
      hero: {
        badge: 'Attendance Tracking',
        title: 'Real-Time Attendance, Informed Parents',
        subtitle: 'Digital check-in with QR code, geolocation, and automatic parent alerts for absences.',
      },
      benefits: [
        { title: 'QR Code Check-in', desc: 'Students scan a QR code at entry. Fast and error-free.' },
        { title: 'Parent Alerts', desc: 'Automatic SMS/push notification if student is absent or late.' },
        { title: 'Detailed Reports', desc: 'Attendance rates by class, month, student — exportable.' },
        { title: 'Anti-Fraud', desc: 'Geolocation and timestamps to prevent fraudulent check-ins.' },
        { title: 'Multi-Method', desc: 'QR code, GPS, manual list — choose what works for you.' },
        { title: 'Live Stats', desc: 'Real-time dashboard: present, absent, late today.' },
      ],
      features: [
        { icon: QrCode, title: 'QR Code', desc: 'Automatic daily QR generation for attendance.' },
        { icon: Bell, title: 'Notifications', desc: 'Automatic SMS and push to parents.' },
        { icon: BarChart3, title: 'Analytics', desc: 'Attendance graphs and trends.' },
        { icon: Smartphone, title: 'Mobile', desc: 'Check-in from teacher\'s phone.' },
      ],
      cta: { title: 'Ready to simplify attendance tracking?', btn: 'Start Free' },
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
          <span className="text-[#4F46E5] font-semibold">{lang === 'fr' ? 'Suivi des Présences' : 'Attendance'}</span>
        </div>
      </div>

      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 py-14 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
              <Clock size={16} /> {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{t.hero.title}</h1>
            <p className="text-lg text-white/80 leading-relaxed">{t.hero.subtitle}</p>
            <div className="flex gap-4 mt-8">
              <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
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
            <div key={i} className="flex gap-4 p-6 rounded-2xl bg-[#f8f9fa] hover:bg-blue-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-blue-600" />
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
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-[#111827] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B7280]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="rounded-3xl p-12 text-center" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)' }}>
          <h2 className="text-3xl font-bold text-white mb-4">{t.cta.title}</h2>
          <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
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
