'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Users, ArrowRight, CheckCircle, GraduationCap, FileText,
  BarChart3, Upload, Search, Shield, Star, ChevronRight,
  Home, BookOpen, MessageSquare,
} from 'lucide-react';

export default function StudentsFeaturePage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      breadcrumb: ['Accueil', 'Fonctionnalités', 'Gestion des Élèves'],
      hero: {
        badge: 'Gestion des Élèves',
        title: 'Gérez tous vos élèves en un seul endroit',
        subtitle: 'Inscriptions, dossiers, transferts et historique académique complet. Une solution puissante pour les établissements modernes.',
      },
      benefits: [
        { title: 'Fiches complètes', desc: 'Informations personnelles, médicales, contacts parents — tout est centralisé.' },
        { title: 'Import en masse', desc: 'Importez des centaines d\'élèves depuis Excel en quelques clics.' },
        { title: 'Matricule unique', desc: 'Chaque élève reçoit un identifiant unique national (format ivoirien).' },
        { title: 'Transferts simplifiés', desc: 'Transférez un élève d\'une classe ou d\'un établissement à l\'autre.' },
        { title: 'Historique académique', desc: 'Suivez le parcours complet de l\'élève année par année.' },
        { title: 'QR Code élève', desc: 'Générez des QR codes pour identification rapide et présence.' },
      ],
      features: [
        { icon: Upload, title: 'Import Excel', desc: 'Téléchargez le modèle, remplissez-le, importez. C\'est tout.' },
        { icon: Search, title: 'Recherche avancée', desc: 'Trouvez n\'importe quel élève par nom, classe ou matricule.' },
        { icon: BarChart3, title: 'Statistiques', desc: 'Effectifs par classe, par niveau, répartition filles/garçons.' },
        { icon: Shield, title: 'Sécurité RGPD', desc: 'Données chiffrées et accès contrôlé par rôle.' },
      ],
      howItWorks: [
        { step: '01', title: 'Créez votre école', desc: 'Inscrivez votre établissement en 2 minutes.' },
        { step: '02', title: 'Importez vos élèves', desc: 'Utilisez le modèle Excel ou ajoutez-les un par un.' },
        { step: '03', title: 'Gérez facilement', desc: 'Consultez, modifiez, exportez en un clic.' },
      ],
      cta: { title: 'Prêt à gérer vos élèves efficacement ?', btn: 'Commencer gratuitement' },
    },
    en: {
      breadcrumb: ['Home', 'Features', 'Student Management'],
      hero: {
        badge: 'Student Management',
        title: 'Manage All Your Students in One Place',
        subtitle: 'Enrollment, records, transfers, and complete academic history. A powerful solution for modern schools.',
      },
      benefits: [
        { title: 'Complete Profiles', desc: 'Personal info, medical records, parent contacts — all centralized.' },
        { title: 'Bulk Import', desc: 'Import hundreds of students from Excel in a few clicks.' },
        { title: 'Unique Matricule', desc: 'Each student gets a unique national identifier (Ivorian format).' },
        { title: 'Easy Transfers', desc: 'Transfer a student between classes or schools effortlessly.' },
        { title: 'Academic History', desc: 'Track each student\'s complete journey year by year.' },
        { title: 'Student QR Code', desc: 'Generate QR codes for quick identification and attendance.' },
      ],
      features: [
        { icon: Upload, title: 'Excel Import', desc: 'Download the template, fill it, import. That\'s it.' },
        { icon: Search, title: 'Advanced Search', desc: 'Find any student by name, class, or matricule.' },
        { icon: BarChart3, title: 'Statistics', desc: 'Enrollment by class, level, gender distribution.' },
        { icon: Shield, title: 'GDPR Security', desc: 'Encrypted data and role-based access control.' },
      ],
      howItWorks: [
        { step: '01', title: 'Create Your School', desc: 'Register your institution in 2 minutes.' },
        { step: '02', title: 'Import Students', desc: 'Use the Excel template or add them one by one.' },
        { step: '03', title: 'Manage Easily', desc: 'View, edit, export with one click.' },
      ],
      cta: { title: 'Ready to manage your students efficiently?', btn: 'Start Free' },
    },
  };

  const t = content[lang];
  const breadcrumbs = t.breadcrumb;
  const breadcrumbLinks = ['/', '/features', '/features/students'];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f8f9fa] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-sm">
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight size={14} className="text-slate-300" />}
              <Link href={breadcrumbLinks[i]} className={i === breadcrumbs.length - 1 ? 'text-[#4F46E5] font-semibold' : 'text-slate-500 hover:text-[#4F46E5]'}>
                {b}
              </Link>
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #60A5FA 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 py-14 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
              <Users size={16} /> {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{t.hero.title}</h1>
            <p className="text-lg text-white/80 leading-relaxed">{t.hero.subtitle}</p>
            <div className="flex gap-4 mt-8">
              <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#4F46E5] font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                {t.cta.btn} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.benefits.map((b, i) => (
            <div key={i} className="flex gap-4 p-6 rounded-2xl bg-[#f8f9fa] hover:bg-indigo-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#e2dfff] flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-[#4F46E5]" />
              </div>
              <div>
                <h3 className="font-bold text-[#111827] mb-1">{b.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Details */}
      <section className="bg-[#f8f9fa] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#111827] text-center mb-8">
            {lang === 'fr' ? 'Fonctionnalités clés' : 'Key Features'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#e2dfff] flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-[#4F46E5]" />
                </div>
                <h3 className="font-bold text-[#111827] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B7280]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-[#111827] text-center mb-8">
          {lang === 'fr' ? 'Comment ça marche' : 'How It Works'}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {t.howItWorks.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#60A5FA] flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-lg shadow-indigo-200">
                {s.step}
              </div>
              <h3 className="font-bold text-[#111827] mb-2">{s.title}</h3>
              <p className="text-sm text-[#6B7280]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="rounded-3xl p-12 text-center" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #60A5FA 100%)' }}>
          <h2 className="text-3xl font-bold text-white mb-4">{t.cta.title}</h2>
          <Link href="/create-school" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#4F46E5] font-semibold rounded-xl hover:bg-gray-100 transition-colors">
            {t.cta.btn} <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6B7280] text-sm">© 2026 EduCI</p>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-[#6B7280] hover:text-[#4F46E5]"><Home size={14} className="inline mr-1" />{lang === 'fr' ? 'Accueil' : 'Home'}</Link>
            <Link href="/features" className="text-sm text-[#4F46E5] font-medium">{lang === 'fr' ? 'Fonctionnalités' : 'Features'}</Link>
            <Link href="/pricing" className="text-sm text-[#6B7280] hover:text-[#4F46E5]">{lang === 'fr' ? 'Tarifs' : 'Pricing'}</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
