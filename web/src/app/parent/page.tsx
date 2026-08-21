'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import Link from 'next/link';
import { sbParent, sbNotifications } from '@/lib/api';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { useRealtimeNotifications, useRealtimeAttendance } from '@/hooks/useRealtime';
import {
  Heart, TrendingUp, Clock, FileText, CreditCard,
  MessageSquare, Bell, ChevronRight, CheckCircle,
  AlertTriangle, Loader2, Users, BookOpen,
} from 'lucide-react';

interface ChildData {
  id: string;
  name: string;
  className: string;
  averageGrade: number | null;
  attendanceRate: number | null;
  pendingAssignments: number;
  recentGrades: { score: number; max_score: number; subject: string }[];
}

export default function ParentDashboard() {
  const { user } = useAuth();
  const { school } = useSchool();
  const { unreadCount } = useRealtimeNotifications((n) => {
    setNotifications((prev) => [n, ...prev].slice(0, 5));
  });
  useRealtimeAttendance();
  const [children, setChildren] = useState<any[]>([]);
  const [childrenDetails, setChildrenDetails] = useState<ChildData[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user?.id) return;
      try {
        const [childrenData, historyData, notifsData] = await Promise.allSettled([
          sbParent.getChildren(user.id),
          sbParent.getPaymentHistory(),
          sbNotifications.list(),
        ]);

        const kids = childrenData.status === 'fulfilled' ? (childrenData.value || []) : [];
        const kidsArr = Array.isArray(kids) ? kids : [];
        setChildren(kidsArr);

        const history = historyData.status === 'fulfilled' ? historyData.value : null;
        setPayments((Array.isArray(history) ? history : []).slice(0, 5));

        const notifs = notifsData.status === 'fulfilled' ? (notifsData.value || []) : [];
        setNotifications(Array.isArray(notifs) ? notifs.slice(0, 5) : []);

        // Fetch per-child details
        const supabase = getSupabase();
        const details: ChildData[] = await Promise.all(
          kidsArr.map(async (child: any) => {
            const childId = child.id || child.studentId;
            try {
              const [gradesRes, attendanceRes, assignmentsRes] = await Promise.allSettled([
                supabase.from('grades')
                  .select('score, max_score, subject:subjects(name)')
                  .eq('student_id', childId)
                  .order('created_at', { ascending: false })
                  .limit(10),
                supabase.from('attendance')
                  .select('status')
                  .eq('student_id', childId),
                supabase.from('assignments')
                  .select('id')
                  .eq('class_id', child.class_id || child.classId)
                  .gte('due_date', new Date().toISOString()),
              ]);

              const grades = gradesRes.status === 'fulfilled' ? (gradesRes.value || []) : [];
              const avg = grades.length > 0
                ? grades.reduce((sum: number, g: any) => sum + (g.score / g.max_score) * 20, 0) / grades.length
                : null;

              const attendance = attendanceRes.status === 'fulfilled' ? (attendanceRes.value || []) : [];
              const present = attendance.filter((a: any) => a.status === 'present').length;
              const attRate = attendance.length > 0 ? Math.round((present / attendance.length) * 100) : null;

              const assignments = assignmentsRes.status === 'fulfilled' ? (assignmentsRes.value || []) : [];

              return {
                id: childId,
                name: child.name || child.user?.name || 'Enfant',
                className: child.class?.name || child.className || '—',
                averageGrade: avg ? Math.round(avg * 10) / 10 : null,
                attendanceRate: attRate,
                pendingAssignments: assignments.length,
                recentGrades: grades.slice(0, 3).map((g: any) => ({
                  score: g.score,
                  max_score: g.max_score,
                  subject: g.subject?.name || '—',
                })),
              };
            } catch (err) {
              // Error handled by catch block
              return {
                id: childId,
                name: child.name || child.user?.name || 'Enfant',
                className: child.class?.name || child.className || '—',
                averageGrade: null,
                attendanceRate: null,
                pendingAssignments: 0,
                recentGrades: [],
              };
            }
          })
        );
        setChildrenDetails(details);
      } catch (err) {
        // Error handled by catch block
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user?.id]);

  const getInitials = (name: string) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const getNotifIcon = (type: string) => {
    if (type === 'PAYMENT' || type === 'success') return <CheckCircle size={16} className="text-emerald-600" />;
    if (type === 'ATTENDANCE' || type === 'warning') return <AlertTriangle size={16} className="text-amber-600" />;
    return <Bell size={16} className="text-[var(--color-primary,#4f46e5)]" />;
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount);
  };

  const totalOutstanding = payments
    .filter((p: any) => p.status === 'PENDING')
    .reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

  const getMention = (avg: number) => {
    if (avg >= 16) return { label: 'Très bien', color: 'text-emerald-600 bg-emerald-50' };
    if (avg >= 14) return { label: 'Bien', color: 'text-blue-600 bg-blue-50' };
    if (avg >= 12) return { label: 'Assez bien', color: 'text-amber-600 bg-amber-50' };
    if (avg >= 10) return { label: 'Passable', color: 'text-slate-600 bg-slate-50' };
    return { label: 'Insuffisant', color: 'text-red-600 bg-red-50' };
  };

  return (
    <RoleLayout role="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[#191c1d]">Tableau de bord</h1>
            <p className="text-sm text-[#464555] mt-1">
              Bienvenue, {user?.name || 'Parent'}
              {school?.name && <span className="text-[var(--color-primary,#4f46e5)] font-medium"> — {school.name}</span>}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12"><Loader2 size={32} className="animate-spin mx-auto text-slate-400" /></div>
        ) : (
          <>
            {/* Children cards with detailed data */}
            {childrenDetails.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {childrenDetails.map((child) => {
                  const mention = child.averageGrade !== null ? getMention(child.averageGrade) : null;
                  return (
                    <div key={child.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-[var(--color-primary,#3525cd)] flex items-center justify-center text-white font-semibold text-sm">
                          {getInitials(child.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#191c1d] truncate">{child.name}</p>
                          <p className="text-xs text-[#464555] flex items-center gap-1">
                            <BookOpen size={10} /> {child.className}
                          </p>
                        </div>
                        {mention && (
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${mention.color}`}>
                            {mention.label}
                          </span>
                        )}
                      </div>

                      {/* Stats grid */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-[#f8f9fa] rounded-lg p-3 text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingUp size={14} className="text-[var(--color-primary,#3525cd)]" />
                          </div>
                          <p className="text-lg font-bold text-[#191c1d]">{child.averageGrade !== null ? child.averageGrade.toFixed(1) : '—'}</p>
                          <p className="text-[10px] text-[#464555] uppercase">Moyenne</p>
                        </div>
                        <div className="bg-[#f8f9fa] rounded-lg p-3 text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Clock size={14} className="text-emerald-600" />
                          </div>
                          <p className="text-lg font-bold text-[#191c1d]">{child.attendanceRate !== null ? `${child.attendanceRate}%` : '—'}</p>
                          <p className="text-[10px] text-[#464555] uppercase">Présence</p>
                        </div>
                        <div className="bg-[#f8f9fa] rounded-lg p-3 text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <FileText size={14} className="text-amber-500" />
                          </div>
                          <p className="text-lg font-bold text-[#191c1d]">{child.pendingAssignments}</p>
                          <p className="text-[10px] text-[#464555] uppercase">Devoirs</p>
                        </div>
                      </div>

                      {/* Recent grades */}
                      {child.recentGrades.length > 0 && (
                        <div className="border-t border-gray-50 pt-3">
                          <p className="text-[10px] text-[#464555] uppercase font-semibold mb-2">Dernières notes</p>
                          <div className="space-y-1.5">
                            {child.recentGrades.map((g, i) => (
                              <div key={i} className="flex items-center justify-between text-xs">
                                <span className="text-[#464555] truncate">{g.subject}</span>
                                <span className="font-semibold text-[#191c1d]">{g.score}/{g.max_score}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Link href={`/parent/payments?childId=${child.id}`} className="mt-3 flex items-center justify-center gap-1 text-xs font-medium text-[var(--color-primary,#3525cd)] hover:underline">
                        Voir plus <ChevronRight size={12} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
                <Users size={48} className="mx-auto mb-3 text-slate-300" />
                <p className="text-slate-500 font-medium">Aucun enfant associé à votre compte</p>
                <p className="text-sm text-slate-400 mt-1">Contactez l'administration de l'école.</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent notifications */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <h2 className="text-sm font-semibold text-[#191c1d]">Notifications récentes</h2>
                  <Link href="/notifications" className="text-xs text-[var(--color-primary,#3525cd)] font-medium hover:underline flex items-center gap-1">
                    Voir tout <ChevronRight size={12} />
                  </Link>
                </div>
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {notifications.map((notif: any) => (
                      <div key={notif.id} className="flex items-start gap-3 px-5 py-3.5">
                        <div className="mt-0.5">{getNotifIcon(notif.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#191c1d]">{notif.title}</p>
                          <p className="text-xs text-[#464555] mt-0.5">{notif.body || notif.message}</p>
                        </div>
                        <span className="text-[10px] text-[#464555] whitespace-nowrap mt-0.5">
                          {notif.createdAt ? new Date(notif.createdAt).toLocaleDateString('fr-FR') : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 text-sm">Aucune notification</div>
                )}
              </div>

              {/* Upcoming payments & Quick actions */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="px-5 py-4 border-b border-gray-100">
                    <h2 className="text-sm font-semibold text-[#191c1d]">Paiements à venir</h2>
                  </div>
                  <div className="p-5 space-y-3">
                    {payments.filter((p: any) => p.status === 'PENDING').length > 0 ? (
                      payments.filter((p: any) => p.status === 'PENDING').slice(0, 3).map((payment: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-[#191c1d]">{payment.invoice?.type || 'Frais'} — {payment.student?.user?.name || ''}</p>
                            <p className="text-xs text-[#464555]">{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString('fr-FR') : ''}</p>
                          </div>
                          <p className="text-sm font-semibold text-[var(--color-primary,#3525cd)]">{formatAmount(payment.amount)} FCFA</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400 text-center py-2">Aucun paiement en attente</p>
                    )}
                    {totalOutstanding > 0 && (
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-500">Total dû</p>
                        <p className="text-sm font-bold text-red-600">{formatAmount(totalOutstanding)} FCFA</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <h2 className="text-sm font-semibold text-[#191c1d] mb-3">Actions rapides</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Messages', icon: MessageSquare, href: '/messages', color: 'bg-[var(--color-primary,#3525cd)]' },
                      { label: 'Paiements', icon: CreditCard, href: '/parent/payments', color: 'bg-emerald-600' },
                      { label: 'Notes', icon: TrendingUp, href: '/parent/grades', color: 'bg-amber-500' },
                    ].map((action) => {
                      const Icon = action.icon;
                      return (
                        <Link key={action.label} href={action.href} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#f8f9fa] hover:bg-gray-100 transition-colors">
                          <div className={`p-2 rounded-lg ${action.color}`}>
                            <Icon size={16} className="text-white" />
                          </div>
                          <span className="text-[10px] font-medium text-[#464555]">{action.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </RoleLayout>
  );
}
