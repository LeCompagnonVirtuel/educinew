'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import AuthLayout from '@/components/auth/AuthLayout';

interface RoleCard {
  key: string;
  icon: string;
  gradient: string;
  shadow: string;
  href: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
}

const roleCards: RoleCard[] = [
  {
    key: 'admin',
    icon: '🏫',
    gradient: 'from-primary to-secondary',
    shadow: 'shadow-primary-200/60',
    href: '/auth/admin/login',
    titleFr: 'Établissement',
    titleEn: 'School',
    descFr: 'Administrateurs et personnel',
    descEn: 'Administrators and staff',
  },
  {
    key: 'teacher',
    icon: '📚',
    gradient: 'from-[#059669] to-[#10B981]',
    shadow: 'shadow-emerald-200/60',
    href: '/auth/teacher/login',
    titleFr: 'Professeur',
    titleEn: 'Teacher',
    descFr: 'Enseignants et intervenants',
    descEn: 'Teachers and instructors',
  },
  {
    key: 'parent',
    icon: '👨‍👩‍👧',
    gradient: 'from-[#D97706] to-[#F59E0B]',
    shadow: 'shadow-amber-200/60',
    href: '/auth/parent/login',
    titleFr: 'Parent',
    titleEn: 'Parent',
    descFr: 'Suivi scolaire de vos enfants',
    descEn: 'Track your children',
  },
  {
    key: 'student',
    icon: '🎓',
    gradient: 'from-[#DC2626] to-[#EF4444]',
    shadow: 'shadow-red-200/60',
    href: '/auth/student/login',
    titleFr: 'Élève',
    titleEn: 'Student',
    descFr: 'Espace élève avec matricule',
    descEn: 'Student space with ID',
  },
];

export default function SelectRolePage() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <AuthLayout
      visualIcon="🎓"
      visualTitle={lang === 'fr' ? 'Votre école, connectée' : 'Your school, connected'}
      visualSubtitle={lang === 'fr' ? 'Gérez vos classes, notes et paiements en un seul endroit.' : 'Manage classes, grades and payments in one place.'}
    >
      <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {lang === 'fr' ? 'Comment accéder ?' : 'How to sign in?'}
          </h1>
          <p className="mt-2 text-slate-500 text-[15px]">
            {lang === 'fr'
              ? 'Choisissez votre espace pour vous connecter'
              : 'Choose your space to connect'}
          </p>
        </div>

        {/* Role Cards */}
        <div className="space-y-3">
          {roleCards.map((card, i) => (
            <Link
              key={card.key}
              href={card.href}
              className={`group flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 bg-white
                hover:border-primary/20 hover:shadow-xl hover:${card.shadow} hover:-translate-y-0.5 transition-all duration-300
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
              style={{ transitionDelay: `${i * 80 + 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                {card.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-slate-900 group-hover:text-primary transition-colors">
                  {lang === 'fr' ? card.titleFr : card.titleEn}
                </h3>
                <p className="text-sm text-slate-500">
                  {lang === 'fr' ? card.descFr : card.descEn}
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <ArrowRight size={15} />
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center space-y-4">
          <Link
            href="/create-school"
            className="inline-flex items-center gap-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-500 px-6 py-3 rounded-xl shadow-lg shadow-primary-200/50 hover:shadow-xl hover:shadow-primary-300/50 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.97]"
          >
            <GraduationCap size={18} />
            {lang === 'fr' ? 'Créer un établissement' : 'Create a school'}
          </Link>
          <p className="text-xs text-slate-400">
            {lang === 'fr' ? 'Accès sécurisé · Inscription sur invitation' : 'Secure access · Invitation only'}
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
