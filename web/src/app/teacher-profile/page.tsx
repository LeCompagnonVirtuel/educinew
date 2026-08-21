'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { getInitials } from '@/lib/utils';
import { sbClasses } from '@/lib/api';
import { Mail, Phone, MapPin, TrendingUp, Loader2 } from 'lucide-react';

export default function TeacherProfilePage() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const performance = [
    { label: lang === 'fr' ? 'Engagement des élèves' : 'Student Engagement', pct: 94 },
    { label: lang === 'fr' ? 'Achèvement du programme' : 'Syllabus Completion', pct: 88 },
    { label: lang === 'fr' ? 'Score d\'évaluation' : 'Peer Review Score', pct: 96 },
  ];

  return (
    <RoleLayout role="teacher" breadcrumbs={[{ label: lang === 'fr' ? 'Enseignant' : 'Teacher' }, { label: lang === 'fr' ? 'Profil' : 'Profile' }]}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-4">
          <div className="bg-white rounded-2xl p-8 shadow-card text-center">
            <div className="w-28 h-28 rounded-full mx-auto bg-[#e2dfff] flex items-center justify-center text-[#3525cd] font-bold text-3xl mb-4">
              {getInitials(user?.name || 'Teacher')}
            </div>
            <h2 className="text-2xl font-bold text-[#191c1d]">{user?.name || 'Teacher'}</h2>
            <p className="text-[#464555] mt-1">
              {lang === 'fr' ? 'Enseignant' : 'Teacher'}
            </p>
            <div className="flex justify-center gap-2 mt-3">
              <span className="px-3 py-1 bg-[#e2dfff] text-[#3525cd] text-[10px] font-bold rounded-full">
                {lang === 'fr' ? 'ENSEIGNANT' : 'TEACHER'}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card mt-6">
            <h3 className="text-sm font-bold text-[#464555] uppercase tracking-wider mb-4">
              {lang === 'fr' ? 'Contact' : 'Contact'}
            </h3>
            {[
              { icon: Mail, label: 'Email', value: user?.email || 'teacher@educi.com' },
              { icon: Phone, label: lang === 'fr' ? 'Téléphone' : 'Phone', value: user?.phone || '+225 00 00 00 00' },
              { icon: MapPin, label: lang === 'fr' ? 'Bureau' : 'Office', value: 'EduCI School' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 bg-[#f3f4f5] rounded-lg mb-2">
                <item.icon size={18} className="text-[#3525cd]" />
                <div>
                  <p className="text-[10px] text-[#464555] uppercase">{item.label}</p>
                  <p className="text-sm font-semibold text-[#191c1d]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <h3 className="text-lg font-bold text-[#191c1d] mb-4">
              {lang === 'fr' ? 'Philosophie professionnelle' : 'Professional Philosophy'}
            </h3>
            <p className="text-[#464555] leading-relaxed italic">
              &ldquo;{lang === 'fr'
                ? 'L\'éducation n\'est pas l\'apprentissage de faits, mais l\'entraînement de l\'esprit à penser.'
                : 'Education is not the learning of facts, but the training of the mind to think.'}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#edeeef] p-6 rounded-xl">
              <h3 className="text-sm font-bold text-[#464555] uppercase tracking-wider mb-4">
                {lang === 'fr' ? 'Classes assignées' : 'Assigned Classes'}
              </h3>
              {loading ? (
                <div className="text-center py-4"><Loader2 size={20} className="animate-spin mx-auto text-slate-400" /></div>
              ) : classes.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">Aucune classe assignée</p>
              ) : (
                classes.slice(0, 5).map((cls: any) => (
                  <div key={cls.id} className="p-3 bg-white rounded-lg mb-2">
                    <p className="text-sm font-semibold text-[#191c1d]">{cls.name}</p>
                  </div>
                ))
              )}
            </div>
            <div className="bg-white p-6 rounded-xl shadow-card">
              <h3 className="text-sm font-bold text-[#464555] uppercase tracking-wider mb-4">
                {lang === 'fr' ? 'Performance' : 'Performance'}
              </h3>
              {performance.map((item) => (
                <div key={item.label} className="mb-4">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>{item.label}</span>
                    <span className="text-[#3525cd]">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[#e7e8e9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3525cd] rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
