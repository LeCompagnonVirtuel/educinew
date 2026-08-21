'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbParent, sbNotifications } from '@/lib/api';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { useLanguage } from '@/hooks/useLanguage';
import { BookOpen, CalendarCheck, CreditCard, MessageSquare, ChevronRight, Loader2 } from 'lucide-react';

export default function ParentDashboardPage() {
  const { user } = useAuth();
  const { school } = useSchool();
  const { lang } = useLanguage();
  const [children, setChildren] = useState<any[]>([]);
  const [childStats, setChildStats] = useState<any[]>([]);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    async function load() {
      try {
        const kids = await sbParent.getChildren(user!.id);
        const kidsArr = Array.isArray(kids) ? kids : [];
        setChildren(kidsArr);

        const supabase = getSupabase();
        const stats = await Promise.all(
          kidsArr.map(async (child: any) => {
            const childId = child.id || child.studentId;
            try {
              const [gradesRes, attendanceRes] = await Promise.allSettled([
                supabase.from('grades')
                  .select('score, max_score')
                  .eq('student_id', childId)
                  .order('created_at', { ascending: false })
                  .limit(10),
                supabase.from('attendance')
                  .select('status')
                  .eq('student_id', childId),
              ]);

              const grades = gradesRes.status === 'fulfilled' ? (gradesRes.value?.data || []) : [];
              const avg = grades.length > 0
                ? grades.reduce((sum: number, g: any) => sum + (g.score / g.max_score) * 20, 0) / grades.length
                : null;

              const attendance = attendanceRes.status === 'fulfilled' ? (attendanceRes.value?.data || []) : [];
              const present = attendance.filter((a: any) => a.status === 'PRESENT' || a.status === 'present').length;
              const attRate = attendance.length > 0 ? Math.round((present / attendance.length) * 100) : null;

              return {
                id: childId,
                name: child.name || child.user?.name || 'Enfant',
                className: child.class?.name || child.className || '—',
                average: avg ? Math.round(avg * 10) / 10 : null,
                attendance: attRate,
              };
            } catch (err) {
              return {
                id: childId,
                name: child.name || child.user?.name || 'Enfant',
                className: child.class?.name || child.className || '—',
                average: null,
                attendance: null,
              };
            }
          })
        );
        setChildStats(stats);

        const [paymentsRes, notifsRes] = await Promise.allSettled([
          sbParent.getPaymentHistory(),
          sbNotifications.list(),
        ]);

        const payments = paymentsRes.status === 'fulfilled' ? (paymentsRes.value || []) : [];
        setPendingPayments(Array.isArray(payments) ? payments.filter((p: any) => p.status === 'PENDING').length : 0);

        const notifs = notifsRes.status === 'fulfilled' ? (notifsRes.value || []) : [];
        setUnreadMessages(Array.isArray(notifs) ? notifs.length : 0);
      } catch (err) {
      }
      setLoading(false);
    }
    load();
  }, [user?.id]);

  const firstChild = childStats[0] || null;

  return (
    <RoleLayout role="parent">
      {loading ? (
        <div className="text-center py-12"><Loader2 size={32} className="animate-spin mx-auto text-slate-400" /></div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#191c1d]">{lang === 'fr' ? 'Bonjour' : 'Hello'}, {user?.name?.split(' ')[0] || 'Parent'}</h2>
            <p className="text-[#464555] mt-1">
              {lang === 'fr' ? 'Voici le suivi scolaire de vos enfants.' : 'Here\'s your children\'s school update.'}
              {school?.name && <span className="text-[var(--color-primary,#3525cd)] font-medium"> — {school.name}</span>}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-card">
              <div className="w-10 h-10 rounded-xl bg-[#e2dfff] flex items-center justify-center mb-3"><BookOpen size={20} /></div>
              <p className="text-2xl font-black text-[#191c1d]">{firstChild?.average !== null && firstChild?.average !== undefined ? `${firstChild.average}/20` : '—'}</p>
              <p className="text-xs text-[#464555] mt-1">{lang === 'fr' ? 'Moyenne enfant' : 'Child Average'}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-card">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3"><CalendarCheck size={20} /></div>
              <p className="text-2xl font-black text-[#191c1d]">{firstChild?.attendance !== null && firstChild?.attendance !== undefined ? `${firstChild.attendance}%` : '—'}</p>
              <p className="text-xs text-[#464555] mt-1">{lang === 'fr' ? 'Présence' : 'Attendance'}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-card">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3"><CreditCard size={20} /></div>
              <p className="text-2xl font-black text-[#191c1d]">{pendingPayments}</p>
              <p className="text-xs text-[#464555] mt-1">{lang === 'fr' ? 'Paiements en attente' : 'Pending Payments'}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-card">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-3"><MessageSquare size={20} /></div>
              <p className="text-2xl font-black text-[#191c1d]">{unreadMessages}</p>
              <p className="text-xs text-[#464555] mt-1">{lang === 'fr' ? 'Notifications' : 'Notifications'}</p>
            </div>
          </div>

          {/* Children list */}
          {childStats.length > 1 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-[#191c1d] mb-3">{lang === 'fr' ? 'Mes enfants' : 'My Children'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {childStats.map((c) => (
                  <div key={c.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="font-semibold text-[#191c1d]">{c.name}</p>
                    <p className="text-xs text-[#464555]">{c.className}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs text-[#464555]">Moy: <strong>{c.average ?? '—'}</strong></span>
                      <span className="text-xs text-[#464555]">Prés: <strong>{c.attendance !== null ? `${c.attendance}%` : '—'}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: BookOpen, label: lang === 'fr' ? 'Notes & Bulletins' : 'Grades & Reports', href: '/parent/grades', color: 'bg-[#e2dfff]' },
              { icon: CreditCard, label: lang === 'fr' ? 'Paiements' : 'Payments', href: '/parent/payments', color: 'bg-emerald-50' },
              { icon: CalendarCheck, label: lang === 'fr' ? 'Présence' : 'Attendance', href: '/parent/attendance', color: 'bg-blue-50' },
            ].map((link, i) => (
              <a key={i} href={link.href} className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-card hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center`}><link.icon size={22} /></div>
                <span className="font-bold text-[#191c1d]">{link.label}</span>
                <ChevronRight size={18} className="ml-auto text-slate-300" />
              </a>
            ))}
          </div>
        </>
      )}
    </RoleLayout>
  );
}
