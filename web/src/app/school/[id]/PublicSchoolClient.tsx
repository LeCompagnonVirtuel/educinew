'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { GraduationCap, MapPin, Users, Phone, Mail, Star, ArrowRight, Check, BookOpen, Clock, Shield, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const TransportMap = dynamic(() => import('@/components/map/TransportMap'), { ssr: false });

export default function PublicSchoolClient({ school }: { school: any }) {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#60A5FA] flex items-center justify-center text-white">
              <GraduationCap size={20} />
            </div>
            <span className="text-xl font-bold text-[#111827]">EduCI</span>
          </a>
          <a href="/register" className="px-5 py-2.5 bg-[#4F46E5] text-white text-sm font-semibold rounded-xl hover:bg-indigo-700">
            {lang === 'fr' ? 'S\'inscrire' : 'Register'}
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#4F46E5] via-indigo-700 to-[#60A5FA] py-16 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            {school.isPremium && (
              <span className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
                <Star size={12} className="inline" /> {lang === 'fr' ? 'École Partenaire' : 'Partner School'}
              </span>
            )}
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{school.type}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{school.name}</h1>
          <p className="text-indigo-200 flex items-center gap-2 mb-4">
            <MapPin size={16} /> {school.address} — {school.code}
          </p>
          <p className="text-white/80 max-w-2xl mb-6">{school.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
              <Users size={18} /> <span className="font-bold">{school.students}</span> {lang === 'fr' ? 'élèves' : 'students'}
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
              <GraduationCap size={18} /> <span className="font-bold">{school.teachers}</span> {lang === 'fr' ? 'enseignants' : 'teachers'}
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
              <Star size={18} className="text-amber-400" /> <span className="font-bold">{school.rating}</span>/5
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Programs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#191c1d] mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-[#4F46E5]" />
                {lang === 'fr' ? 'Programmes proposés' : 'Programs Offered'}
              </h2>
              <div className="flex flex-wrap gap-2">
                {school.programs.map((p: string) => (
                  <span key={p} className="px-4 py-2 bg-[#e2dfff] text-[#4F46E5] rounded-xl text-sm font-semibold">{p}</span>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-[#191c1d] flex items-center gap-2">
                  <MapPin size={20} className="text-[#4F46E5]" />
                  {lang === 'fr' ? 'Localisation' : 'Location'}
                </h2>
              </div>
              <TransportMap
                markers={[{ id: school.id, type: 'school' as const, lat: school.lat, lng: school.lng, name: school.name, info: school.address }]}
                center={[school.lat, school.lng]}
                zoom={15}
                height="300px"
              />
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#191c1d] mb-4">
                {lang === 'fr' ? 'Pourquoi choisir cette école ?' : 'Why choose this school?'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: lang === 'fr' ? 'Gestion sécurisée des données' : 'Secure data management' },
                  { icon: Clock, text: lang === 'fr' ? 'Suivi en temps réel' : 'Real-time tracking' },
                  { icon: BookOpen, text: lang === 'fr' ? 'Assistant IA EduCI' : 'EduCI AI Assistant' },
                  { icon: Users, text: lang === 'fr' ? 'Communication école-famille' : 'School-family communication' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#f8f9fa] rounded-xl">
                    <Check size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-[#191c1d]">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-[#191c1d] mb-4">{lang === 'fr' ? 'Contact' : 'Contact'}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#4F46E5]" />
                  <span className="text-sm text-[#191c1d]">{school.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#4F46E5]" />
                  <span className="text-sm text-[#191c1d]">{school.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#4F46E5]" />
                  <span className="text-sm text-[#191c1d]">{school.address}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#4F46E5] to-[#60A5FA] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2">{lang === 'fr' ? 'Intéressé par cette école ?' : 'Interested in this school?'}</h3>
              <p className="text-sm text-indigo-200 mb-4">
                {lang === 'fr' ? 'Créez un compte pour accéder à toutes les fonctionnalités.' : 'Create an account to access all features.'}
              </p>
              <a href="/register" className="block w-full text-center py-3 bg-white text-[#4F46E5] font-bold rounded-xl hover:bg-indigo-50 transition-colors">
                {lang === 'fr' ? 'Créer un compte' : 'Create Account'} <ArrowRight size={16} className="inline ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
