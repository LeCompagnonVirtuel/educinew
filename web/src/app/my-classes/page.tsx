'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbClasses } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import {
  GraduationCap, Users, TrendingUp, Plus, MoreVertical,
  BookOpen, Search, ArrowRight, Clock, Beaker, Calculator,
  ChevronRight,
} from 'lucide-react';

export default function MyClassesPage() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await sbClasses.list(user?.schoolId);
        setClasses(Array.isArray(data) ? data : []);
      } catch (e) {
        setClasses([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  const mc = t.myClasses;

  const subjectIcons: Record<string, any> = {
    'Mathématiques': Calculator,
    'Mathematics': Calculator,
    'Physique': Beaker,
    'Physics': Beaker,
    'Chimie': Beaker,
    'Sciences': BookOpen,
  };

  const subjectColors = [
    { bg: 'bg-indigo-50', text: 'text-[#3525cd]', accent: 'bg-[#3525cd]' },
    { bg: 'bg-blue-50', text: 'text-[#0060ac]', accent: 'bg-[#0060ac]' },
    { bg: 'bg-orange-50', text: 'text-[#7e3000]', accent: 'bg-[#7e3000]' },
    { bg: 'bg-green-50', text: 'text-green-700', accent: 'bg-green-600' },
    { bg: 'bg-purple-50', text: 'text-purple-700', accent: 'bg-purple-600' },
  ];

  const filteredClasses = classes.filter((cls) =>
    cls.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.level?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <RoleLayout role="teacher" breadcrumbs={[{ label: lang === 'fr' ? 'Enseignant' : 'Teacher' }, { label: mc.title }]}>
      {/* Header */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-[#191c1d] mb-2">{mc.title}</h2>
            <p className="text-[#464555] font-medium">{mc.subtitle}</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777587]" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-none ring-1 ring-[#c7c4d8]/15 focus:ring-2 focus:ring-[#3525cd]/40 rounded-xl py-4 pl-12 pr-4 shadow-sm transition-all outline-none"
              placeholder={mc.search}
            />
          </div>
        </div>
      </section>

      {/* Stats Chips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-[#e2dfff] p-4 rounded-xl flex items-center gap-3">
          <Users size={20} className="text-[#3525cd]" />
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#3525cd]/60">{mc.totalStudents}</div>
            <div className="text-xl font-bold text-[#3525cd]">
              {classes.reduce((s, c) => s + (c._count?.students || 0), 0)}
            </div>
          </div>
        </div>
        <div className="bg-[#d4e3ff] p-4 rounded-xl flex items-center gap-3">
          <BookOpen size={20} className="text-[#0060ac]" />
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#0060ac]/60">{mc.subjects}</div>
            <div className="text-xl font-bold text-[#0060ac]">{classes.length}</div>
          </div>
        </div>
        <div className="bg-[#ffdbcc] p-4 rounded-xl flex items-center gap-3">
          <Clock size={20} className="text-[#7e3000]" />
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#7e3000]/60">{mc.sessionsToday}</div>
            <div className="text-xl font-bold text-[#7e3000]">4</div>
          </div>
        </div>
        <div className="bg-[#e7e8e9] p-4 rounded-xl flex items-center gap-3">
          <TrendingUp size={20} className="text-[#464555]" />
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#464555]/60">{mc.avgAttendance}</div>
            <div className="text-xl font-bold text-[#464555]">92%</div>
          </div>
        </div>
      </div>

      {/* Class Cards Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">{lang === 'fr' ? 'Chargement...' : 'Loading...'}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClasses.map((cls, i) => {
            const colors = subjectColors[i % subjectColors.length];
            const Icon = subjectIcons[cls.name] || BookOpen;
            return (
              <div key={cls.id} className="group bg-white rounded-xl p-6 shadow-card ring-1 ring-[#c7c4d8]/10 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-bl-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform`} />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center ${colors.text}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#191c1d] leading-tight">{cls.name}</h3>
                        <p className="text-sm font-medium text-[#464555]">{cls.level}</p>
                      </div>
                    </div>
                    <span className={`bg-[#d4e3ff] text-[#003c70] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter`}>
                      {mc.active}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[#464555]">
                        <Users size={14} />
                        <span className="text-sm font-medium">{cls._count?.students || 0} {mc.students}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#3525cd] font-semibold">
                        <Clock size={14} />
                        <span className="text-sm">
                          {lang === 'fr' ? "Aujourd'hui, 10:30" : 'Today, 10:30 AM'}
                        </span>
                      </div>
                    </div>
                    <Link href={`/mark-attendance?classId=${cls.id}`} className="bg-[#3525cd] text-white p-3 rounded-xl shadow-lg shadow-indigo-200 hover:bg-[#4f46e5] active:scale-95 transition-all">
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Featured Large Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#3525cd] to-[#4f46e5] rounded-xl p-8 shadow-xl shadow-indigo-200 flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full opacity-20">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -left-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-extrabold">
                    {lang === 'fr' ? 'Terminale A' : 'Form 5A'}
                  </h3>
                  <p className="text-indigo-100 font-medium">
                    {lang === 'fr' ? 'Mécanique Quantique' : 'Quantum Mechanics'}
                  </p>
                </div>
                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {mc.examPrep}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-indigo-200" />
                  <span className="text-lg font-medium">52 {mc.students}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen size={20} className="text-indigo-200" />
                  <span className="text-lg font-medium">
                    {lang === 'fr' ? 'Finalisation du programme' : 'Finalizing Curriculum'}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-8 flex justify-between items-center">
              <div className="text-indigo-200 text-sm italic font-medium">
                {mc.nextSession}: {lang === 'fr' ? 'Vendredi, 09:00' : 'Friday, 09:00 AM'}
              </div>
              <Link href="/grade-entry" className="bg-white text-[#3525cd] px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-50 active:scale-95 transition-all">
                {mc.viewDetails}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#3525cd] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#4f46e5] active:scale-90 transition-all z-40">
        <Plus size={24} />
      </button>
    </RoleLayout>
  );
}
