'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbStudents, sbNotifications, sbClasses, sbAttendance, sbPayments, sbTeachers } from '@/lib/api';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { useLanguage } from '@/hooks/useLanguage';
import { useRealtimeNotifications, useRealtimeAttendance } from '@/hooks/useRealtime';
import { formatCurrency } from '@/lib/utils';
import {
  Users, GraduationCap, CalendarCheck, CreditCard,
  ArrowRight, AlertTriangle, BookOpen, Settings,
  ChevronRight, Clock, CheckCircle, BarChart3,
  Search, Calendar, Bell, FileText, Brain,
  Award, Plus, UserPlus, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';
import type { Student, Notification as AppNotification, Class } from '@/types';

const LazyBarChart = dynamic(() => import('recharts').then(m => ({ default: m.BarChart })), { ssr: false });
const LazyAreaChart = dynamic(() => import('recharts').then(m => ({ default: m.AreaChart })), { ssr: false });
const LazyXAxis = dynamic(() => import('recharts').then(m => ({ default: m.XAxis })), { ssr: false });
const LazyYAxis = dynamic(() => import('recharts').then(m => ({ default: m.YAxis })), { ssr: false });
const LazyBar = dynamic(() => import('recharts').then(m => ({ default: m.Bar })), { ssr: false });
const LazyArea = dynamic(() => import('recharts').then(m => ({ default: m.Area })), { ssr: false });
const LazyCartesianGrid = dynamic(() => import('recharts').then(m => ({ default: m.CartesianGrid })), { ssr: false });
const LazyTooltip = dynamic(() => import('recharts').then(m => ({ default: m.Tooltip })), { ssr: false });
const LazyResponsiveContainer = dynamic(() => import('recharts').then(m => ({ default: m.ResponsiveContainer })), { ssr: false });

interface AdminStats {
  students: number;
  teachers: number;
  classes: number;
  attendanceRate: number;
  totalRevenue: number;
  pendingPayments: number;
  overduePayments: number;
  averageGrade: number;
  trendStudents: number;
  trendTeachers: number;
  trendAttendance: number;
  trendRevenue: number;
}

interface AdminAnalytics {
  averageGrade: number;
  gradeByClass: { name: string; average: number }[];
  dailyAttendance: { date: string; present: number; absent: number }[];
  monthlyRevenue: number;
  previousMonthRevenue: number;
  revenueTrend: { name: string; revenue: number }[];
  attendanceTrend?: { weeklyChange: number };
  topStudentsCount?: number;
  paymentGrowth?: number;
}

interface DashboardAlert {
  type: 'error' | 'warning';
  icon: any;
  text: string;
  subText?: string;
  href?: string;
}

function SkeletonPulse({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg ${className}`} />;
}

function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[var(--color-surface-raised)] rounded-2xl p-5 border border-slate-100 dark:border-border shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <SkeletonPulse className="w-11 h-11" />
        <SkeletonPulse className="w-16 h-5" />
      </div>
      <SkeletonPulse className="w-20 h-8 mb-2" />
      <SkeletonPulse className="w-24 h-4" />
    </div>
  );
}

function CircularProgress({ value, size = 48, strokeWidth = 5, color = '#F77F00' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} stroke="#e2e8f0" fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        strokeWidth={strokeWidth} stroke={color} fill="none"
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

function TrendBadge({ value, suffix = '%' }: { value: number; suffix?: string }) {
  if (value === 0) return <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">--</span>;
  const isPositive = value > 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>
      {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
      {isPositive ? '+' : ''}{value}{suffix}
    </span>
  );
}

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { school } = useSchool();
  const { lang } = useLanguage();
  const { unreadCount } = useRealtimeNotifications((n) => {
    setNotifications((prev) => [n, ...prev].slice(0, 5));
  });
  useRealtimeAttendance();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [alerts, setAlerts] = useState<DashboardAlert[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [classes, setClasses] = useState<(Class & { students?: unknown[]; studentsCount?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState<'attendance' | 'grades' | 'finance'>('attendance');

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (lang === 'fr') {
      if (hour < 12) return 'Bonjour';
      if (hour < 18) return 'Bon après-midi';
      return 'Bonsoir';
    }
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, [lang]);

  const todayStr = useMemo(() => {
    return new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  }, [lang]);

  useEffect(() => {
    async function load() {
      try {
        const supabase = getSupabase();
        const schoolId = user!.schoolId!;

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

        const [studentsData, notifsData, classesData, paymentsData, attendanceData, teachersData, gradesData, allPaymentsData, weeklyAttendanceData] = await Promise.allSettled([
          sbStudents.list(schoolId),
          sbNotifications.list(),
          sbClasses.list(schoolId),
          sbPayments.getStats(schoolId),
          sbAttendance.getStats(undefined, undefined),
          sbTeachers.list(schoolId),
          supabase.from('grades').select('score, max_score, student_id, subject:subjects(name), class_id').eq('school_id', schoolId),
          supabase.from('payments').select('amount, status, method, created_at').eq('school_id', schoolId).order('created_at', { ascending: false }),
          supabase.from('attendance').select('date, status').eq('school_id', schoolId).gte('date', sevenDaysAgoStr).order('date', { ascending: true }),
        ]);

        const studentsList = studentsData.status === 'fulfilled' ? studentsData.value : [];
        const notifsList = notifsData.status === 'fulfilled' ? notifsData.value : [];
        const classesList = classesData.status === 'fulfilled' ? classesData.value : [];
        const paymentsStats = paymentsData.status === 'fulfilled' ? paymentsData.value : { total: 0, completed: 0, pending: 0 };
        const attendanceStats = attendanceData.status === 'fulfilled' ? attendanceData.value : { total: 0, present: 0, rate: 0 };
        const teachersList = teachersData.status === 'fulfilled' ? teachersData.value : [];
        const gradesList = gradesData.status === 'fulfilled' ? (gradesData.value as any)?.data || [] : [];
        const paymentsList = allPaymentsData.status === 'fulfilled' ? (allPaymentsData.value as any)?.data || [] : [];

        const avgGrade = gradesList.length > 0
          ? gradesList.reduce((sum: number, g: any) => {
              const score = Number(g.score) || 0;
              const maxScore = Number(g.max_score) || 20;
              return sum + (score / maxScore) * 20;
            }, 0) / gradesList.length
          : 0;

        const clasGrades = new Map<string, { scores: number[]; name: string }>();
        gradesList.forEach((g: any) => {
          const classId = g.class_id || 'unknown';
          if (!clasGrades.has(classId)) {
            const cls = classesList.find((c: any) => c.id === classId);
            clasGrades.set(classId, { scores: [], name: cls?.name || 'Inconnue' });
          }
          const score = Number(g.score) || 0;
          const maxScore = Number(g.max_score) || 20;
          clasGrades.get(classId)!.scores.push((score / maxScore) * 20);
        });
        const gradeByClass = Array.from(clasGrades.values())
          .filter(d => d.scores.length > 0)
          .map(d => ({
            name: d.name,
            average: Math.round((d.scores.reduce((s, v) => s + v, 0) / d.scores.length) * 10) / 10,
          })).slice(0, 6);

        const now = new Date();
        const thisMonth = paymentsList.filter((p: any) => {
          if (p.status !== 'COMPLETED') return false;
          const d = new Date(p.created_at);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
        const prevMonth = paymentsList.filter((p: any) => {
          if (p.status !== 'COMPLETED') return false;
          const d = new Date(p.created_at);
          const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          return d.getMonth() === prev.getMonth() && d.getFullYear() === prev.getFullYear();
        });
        const monthlyRevenue = thisMonth.reduce((s: number, p: any) => s + (p.amount || 0), 0);
        const previousMonthRevenue = prevMonth.reduce((s: number, p: any) => s + (p.amount || 0), 0);

        const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        const revenueTrend: { name: string; revenue: number }[] = [];
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthPayments = paymentsList.filter((p: any) => {
            if (p.status !== 'COMPLETED') return false;
            const pd = new Date(p.created_at);
            return pd.getMonth() === d.getMonth() && pd.getFullYear() === d.getFullYear();
          });
          revenueTrend.push({ name: monthNames[d.getMonth()], revenue: monthPayments.reduce((s: number, p: any) => s + (p.amount || 0), 0) });
        }

        const paymentGrowth = previousMonthRevenue > 0 ? Math.round(((monthlyRevenue - previousMonthRevenue) / previousMonthRevenue) * 100) : 0;

        const weeklyAttendance = weeklyAttendanceData.status === 'fulfilled' ? (weeklyAttendanceData.value as any)?.data || [] : [];
        const dailyMap = new Map<string, { present: number; absent: number }>();
        weeklyAttendance.forEach((a: any) => {
          const d = a.date;
          if (!dailyMap.has(d)) dailyMap.set(d, { present: 0, absent: 0 });
          const entry = dailyMap.get(d)!;
          if (a.status === 'PRESENT') entry.present++;
          else entry.absent++;
        });
        const dailyAttendance = Array.from(dailyMap.entries())
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([date, counts]) => ({
            date: new Date(date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
            present: counts.present,
            absent: counts.absent,
          }));

        const studentScores = new Map<string, number[]>();
        gradesList.forEach((g: any) => {
          if (!studentScores.has(g.student_id)) studentScores.set(g.student_id, []);
          const score = Number(g.score) || 0;
          const maxScore = Number(g.max_score) || 20;
          studentScores.get(g.student_id)!.push((score / maxScore) * 20);
        });
        const strugglingCount = Array.from(studentScores.values()).filter(scores => {
          if (scores.length === 0) return false;
          const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
          return avg < 8;
        }).length;

        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

        const currentStudents = studentsList.filter((s: any) => {
          const d = new Date(s.created_at || s.enrollment_date || now);
          return d >= thirtyDaysAgo;
        }).length;
        const previousStudents = studentsList.filter((s: any) => {
          const d = new Date(s.created_at || s.enrollment_date || now);
          return d >= sixtyDaysAgo && d < thirtyDaysAgo;
        }).length;
        const trendStudents = previousStudents > 0 ? Math.round(((currentStudents - previousStudents) / previousStudents) * 100) : (currentStudents > 0 ? 100 : 0);

        const currentTeachers = teachersList.filter((t: any) => {
          const d = new Date(t.created_at || now);
          return d >= thirtyDaysAgo;
        }).length;
        const previousTeachers = teachersList.filter((t: any) => {
          const d = new Date(t.created_at || now);
          return d >= sixtyDaysAgo && d < thirtyDaysAgo;
        }).length;
        const trendTeachers = previousTeachers > 0 ? Math.round(((currentTeachers - previousTeachers) / previousTeachers) * 100) : (currentTeachers > 0 ? 100 : 0);

        const thisWeekAttendance = weeklyAttendance.filter((a: any) => {
          const d = new Date(a.date);
          return d >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        });
        const lastWeekAttendance = weeklyAttendance.filter((a: any) => {
          const d = new Date(a.date);
          return d >= new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) && d < new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        });
        const thisWeekPresent = thisWeekAttendance.filter((a: any) => a.status === 'PRESENT').length;
        const lastWeekPresent = lastWeekAttendance.filter((a: any) => a.status === 'PRESENT').length;
        const thisWeekRate = thisWeekAttendance.length > 0 ? (thisWeekPresent / thisWeekAttendance.length) * 100 : 0;
        const lastWeekRate = lastWeekAttendance.length > 0 ? (lastWeekPresent / lastWeekAttendance.length) * 100 : 0;
        const trendAttendance = lastWeekRate > 0 ? Math.round(thisWeekRate - lastWeekRate) : 0;

        const overduePayments = paymentsList.filter((p: any) => {
          if (p.status !== 'PENDING') return false;
          const d = new Date(p.created_at);
          return d < thirtyDaysAgo;
        }).length;

        const attendanceWeeklyChange = lastWeekRate > 0 ? Math.round(thisWeekRate - lastWeekRate) : 0;

        const safeNum = (v: any, fallback: number = 0): number => {
          const n = Number(v);
          return Number.isFinite(n) ? n : fallback;
        };

        setStats({
          students: safeNum(studentsList.length),
          teachers: safeNum(teachersList.length),
          classes: safeNum(classesList.length),
          attendanceRate: Math.round(safeNum(attendanceStats.rate)),
          totalRevenue: safeNum(paymentsStats.completed) || safeNum(monthlyRevenue),
          pendingPayments: safeNum(paymentsStats.pending),
          overduePayments: safeNum(overduePayments),
          averageGrade: Math.round(safeNum(avgGrade) * 10) / 10,
          trendStudents: safeNum(trendStudents),
          trendTeachers: safeNum(trendTeachers),
          trendAttendance: safeNum(trendAttendance),
          trendRevenue: safeNum(paymentGrowth),
        });

        setAnalytics({
          averageGrade: Math.round(safeNum(avgGrade) * 10) / 10,
          gradeByClass,
          dailyAttendance,
          monthlyRevenue: safeNum(monthlyRevenue),
          previousMonthRevenue: safeNum(previousMonthRevenue),
          revenueTrend,
          attendanceTrend: { weeklyChange: safeNum(attendanceWeeklyChange) },
          topStudentsCount: safeNum(strugglingCount),
          paymentGrowth: safeNum(paymentGrowth),
        });

        const newAlerts: DashboardAlert[] = [];
        if (attendanceStats.rate < 70 && attendanceStats.rate > 0) {
          newAlerts.push({ type: 'warning', icon: AlertTriangle, text: lang === 'fr' ? `Taux de présence bas: ${Math.round(attendanceStats.rate)}%` : `Low attendance: ${Math.round(attendanceStats.rate)}%`, subText: lang === 'fr' ? 'Intervention recommandée' : 'Action recommended', href: '/attendance' });
        }
        if ((paymentsStats.pending || 0) > 10) {
          newAlerts.push({ type: 'error', icon: CreditCard, text: lang === 'fr' ? `${paymentsStats.pending} paiements en attente` : `${paymentsStats.pending} pending payments`, subText: lang === 'fr' ? 'Risque de retards accumulés' : 'Risk of accumulated delays', href: '/payments' });
        }
        if (strugglingCount > 0) {
          newAlerts.push({ type: 'warning', icon: Users, text: lang === 'fr' ? `${strugglingCount} élève(s) en difficulté (moyenne < 8/20)` : `${strugglingCount} struggling student(s) (avg < 8/20)`, subText: lang === 'fr' ? 'Soutien scolaire recommandé' : 'Academic support recommended', href: '/grades' });
        }
        if (overduePayments > 0) {
          newAlerts.push({ type: 'error', icon: Clock, text: lang === 'fr' ? `${overduePayments} paiement(s) en retard (+30 jours)` : `${overduePayments} overdue payment(s) (30+ days)`, subText: lang === 'fr' ? 'Relances nécessaires' : 'Follow-up required', href: '/payments' });
        }
        setAlerts(newAlerts);

        setStudents(studentsList.slice(0, 5));
        setNotifications(notifsList.slice(0, 5));
        setClasses(classesList.slice(0, 8) as any);
      } catch (err: any) {
        setAlerts([{ type: 'error', icon: Clock, text: lang === 'fr' ? 'Erreur de chargement des données' : 'Failed to load data', subText: lang === 'fr' ? 'Cliquez pour réessayer' : 'Click to retry', href: '/dashboard' }]);
      } finally {
        setLoading(false);
      }
    }
    if (user?.schoolId) load();
  }, [user?.schoolId]);

  const safeDisplay = (v: any, fallback: number = 0): number => {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  };

  const totalStudents = safeDisplay(stats?.students);
  const totalTeachers = safeDisplay(stats?.teachers);
  const totalClasses = safeDisplay(stats?.classes);
  const attendanceRate = safeDisplay(stats?.attendanceRate);
  const totalRevenue = safeDisplay(stats?.totalRevenue);
  const pendingPayments = safeDisplay(stats?.pendingPayments);
  const averageGrade = safeDisplay(stats?.averageGrade);
  const trendStudents = safeDisplay(stats?.trendStudents);
  const trendTeachers = safeDisplay(stats?.trendTeachers);
  const trendAttendance = safeDisplay(stats?.trendAttendance);
  const trendRevenue = safeDisplay(stats?.trendRevenue);

  const quickActions = [
    { icon: UserPlus, label: lang === 'fr' ? 'Ajouter élève' : 'Add Student', href: '/students', color: 'bg-primary-50 dark:bg-primary-500/10', iconColor: 'text-primary' },
    { icon: GraduationCap, label: lang === 'fr' ? 'Ajouter enseignant' : 'Add Teacher', href: '/teachers', color: 'bg-blue-50 dark:bg-blue-500/10', iconColor: 'text-blue-600 dark:text-blue-400' },
    { icon: BookOpen, label: lang === 'fr' ? 'Créer classe' : 'Create Class', href: '/classes', color: 'bg-secondary-50 dark:bg-secondary-500/10', iconColor: 'text-secondary dark:text-secondary-400' },
    { icon: BarChart3, label: lang === 'fr' ? 'Saisir notes' : 'Enter Grades', href: '/grades', color: 'bg-amber-50 dark:bg-amber-500/10', iconColor: 'text-amber-600 dark:text-amber-400' },
    { icon: FileText, label: lang === 'fr' ? 'Bulletins' : 'Reports', href: '/bulletin', color: 'bg-violet-50 dark:bg-violet-500/10', iconColor: 'text-violet-600 dark:text-violet-400' },
    { icon: CreditCard, label: lang === 'fr' ? 'Paiements' : 'Payments', href: '/payments', color: 'bg-rose-50 dark:bg-rose-500/10', iconColor: 'text-rose-600 dark:text-rose-400' },
  ];

  return (
    <RoleLayout role="admin">

      <div className="space-y-6">

        {/* Header Section */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                {lang === 'fr' ? 'Tableau de bord' : 'Dashboard'}
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs text-slate-500 capitalize">{todayStr}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {greeting}, {user?.name?.split(' ')[0]}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
              {lang === 'fr' ? 'Voici le résumé de votre établissement.' : 'Here is your school summary.'}
              {school?.name && <span className="text-primary font-medium"> — {school.name}</span>}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <form className="relative" onSubmit={(e) => { e.preventDefault(); const q = (e.currentTarget.querySelector('input') as HTMLInputElement)?.value; if (q) window.location.href = `/students?search=${encodeURIComponent(q)}`; }}>
              <input
                type="text"
                placeholder={lang === 'fr' ? 'Rechercher...' : 'Search...'}
                className="w-44 sm:w-52 px-4 py-2 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary-300 transition-all text-sm"
              />
              <button type="submit" className="absolute inset-y-0 right-3 flex items-center">
                <Search size={16} className="text-slate-400" />
              </button>
            </form>
            <Link href="/notifications" className="relative p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
              <Bell size={18} className="text-slate-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
            <Link href="/settings" className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
              <Settings size={18} className="text-slate-600" />
            </Link>
            <Link href="/profile" className="relative ml-1">
              <Image
                src={user?.photoUrl || '/default-avatar.png'}
                alt={user?.name || ''}
                width={40}
                height={40}
                unoptimized
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm hover:ring-2 hover:ring-primary-400 transition-all"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></div>
            </Link>
          </div>
        </header>

        {/* Alerts Banner */}
        {alerts.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {alerts.map((alert, i) => (
              <Link
                key={i}
                href={alert.href || '#'}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] ${
                  alert.type === 'error'
                    ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                    : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <alert.icon size={15} />
                <span>{alert.text}</span>
                <ChevronRight size={14} className="opacity-50" />
              </Link>
            ))}
          </div>
        )}

        {/* KPI Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Students */}
            <Link href="/students" className="group">
              <div className="bg-white dark:bg-[var(--color-surface-raised)] rounded-2xl p-5 border border-slate-100 dark:border-border shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-500/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 transition-colors">
                    <Users size={22} className="text-primary" />
                  </div>
                  <TrendBadge value={trendStudents} />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{totalStudents}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{lang === 'fr' ? 'Élèves inscrits' : 'Enrolled Students'}</p>
              </div>
            </Link>

            {/* Teachers */}
            <Link href="/teachers" className="group">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <GraduationCap size={22} className="text-blue-600" />
                  </div>
                  <TrendBadge value={trendTeachers} />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{totalTeachers}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{lang === 'fr' ? 'Enseignants' : 'Teachers'}</p>
              </div>
            </Link>

            {/* Attendance */}
            <Link href="/attendance" className="group">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center relative group-hover:bg-emerald-100 transition-colors">
                    <CircularProgress value={attendanceRate} size={36} strokeWidth={4} color="#059669" />
                    <CalendarCheck size={14} className="text-emerald-600 absolute" />
                  </div>
                  <TrendBadge value={trendAttendance} />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{attendanceRate}%</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{lang === 'fr' ? 'Présence' : 'Attendance'}</p>
              </div>
            </Link>

            {/* Revenue */}
            <Link href="/payments" className="group">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <CreditCard size={22} className="text-green-600" />
                  </div>
                  <TrendBadge value={trendRevenue} />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{formatCurrency(totalRevenue)}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{lang === 'fr' ? 'Revenus du mois' : 'Monthly Revenue'}</p>
              </div>
            </Link>

            {/* Average Grade */}
            <Link href="/grades" className="group">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                    <Award size={22} className="text-amber-600" />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${averageGrade >= 12 ? 'text-emerald-700 bg-emerald-50' : averageGrade >= 10 ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50'}`}>
                    {averageGrade >= 12 ? (lang === 'fr' ? 'Bien' : 'Good') : averageGrade >= 10 ? (lang === 'fr' ? 'Moyen' : 'Average') : (lang === 'fr' ? 'Faible' : 'Low')}
                  </span>
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{averageGrade.toFixed(1)}<span className="text-base font-bold text-slate-400">/20</span></p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{lang === 'fr' ? 'Moyenne générale' : 'General Average'}</p>
              </div>
            </Link>

            {/* Pending Payments */}
            <Link href="/payments" className="group">
              <div className={`bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all ${pendingPayments > 0 ? 'border-red-200 hover:border-red-300' : 'border-slate-100 hover:border-slate-200'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${pendingPayments > 0 ? 'bg-red-50 group-hover:bg-red-100' : 'bg-slate-50 group-hover:bg-slate-100'} transition-colors`}>
                    <Bell size={22} className={pendingPayments > 0 ? 'text-red-500' : 'text-slate-400'} />
                  </div>
                  {pendingPayments > 0 && (
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      {lang === 'fr' ? 'Urgent' : 'Urgent'}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{pendingPayments}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{lang === 'fr' ? 'Paiements en attente' : 'Pending Payments'}</p>
              </div>
            </Link>
          </div>
        )}

        {/* Charts Section with Tabs */}
        <div className="bg-white dark:bg-[var(--color-surface-raised)] rounded-2xl border border-slate-100 dark:border-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-border px-5 pt-4 pb-0">
            <div className="flex gap-1">
              {[
                { key: 'attendance' as const, label: lang === 'fr' ? 'Présences' : 'Attendance', icon: CalendarCheck },
                { key: 'grades' as const, label: lang === 'fr' ? 'Notes' : 'Grades', icon: BarChart3 },
                { key: 'finance' as const, label: lang === 'fr' ? 'Finances' : 'Finances', icon: CreditCard },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveChart(tab.key)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all ${
                    activeChart === tab.key
                      ? 'text-primary border-primary bg-primary-50/50'
                      : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <tab.icon size={15} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 pb-2">
              <Calendar size={13} />
              {lang === 'fr' ? '7 derniers jours' : 'Last 7 days'}
            </div>
          </div>

          <div className="p-5">
            {loading ? (
              <SkeletonPulse className="w-full h-[250px]" />
            ) : (
              <>
                {/* Attendance Chart */}
                {activeChart === 'attendance' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-slate-500">{lang === 'fr' ? 'Taux de présence cette semaine' : "This week's attendance"}</p>
                        <p className="text-2xl font-bold text-slate-900">{attendanceRate}%</p>
                      </div>
                      {analytics?.attendanceTrend && (
                        <TrendBadge value={analytics.attendanceTrend.weeklyChange} suffix=" pts" />
                      )}
                    </div>
                    {analytics?.dailyAttendance && analytics.dailyAttendance.length > 0 ? (
                      <div className="h-[220px]">
                        <LazyResponsiveContainer width="100%" height="100%">
                          <LazyAreaChart
                            data={analytics.dailyAttendance.map((day) => ({
                              name: day.date,
                              present: safeDisplay(day.present),
                              absent: safeDisplay(day.absent),
                            }))}
                            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                          >
                            <defs>
                              <linearGradient id="gradientPresent" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="gradientAbsent" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <LazyCartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <LazyXAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                            <LazyYAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                            <LazyTooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                            <LazyArea type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2.5} fill="url(#gradientPresent)" name={lang === 'fr' ? 'Présents' : 'Present'} />
                            <LazyArea type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} fill="url(#gradientAbsent)" name={lang === 'fr' ? 'Absents' : 'Absent'} />
                          </LazyAreaChart>
                        </LazyResponsiveContainer>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                        <CalendarCheck size={40} className="mb-2 opacity-30" />
                        <p className="text-sm">{lang === 'fr' ? 'Aucune donnée de présence cette semaine' : 'No attendance data this week'}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Grades Chart */}
                {activeChart === 'grades' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-slate-500">{lang === 'fr' ? 'Performance par classe' : 'Performance by class'}</p>
                        <p className="text-2xl font-bold text-slate-900">{averageGrade.toFixed(1)}/20</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${averageGrade >= 12 ? 'bg-emerald-50 text-emerald-700' : averageGrade >= 10 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                        {averageGrade >= 12 ? (lang === 'fr' ? 'Satisfaisant' : 'Satisfactory') : averageGrade >= 10 ? (lang === 'fr' ? 'Passable' : 'Passable') : (lang === 'fr' ? 'Insuffisant' : 'Insufficient')}
                      </span>
                    </div>
                    {analytics?.gradeByClass && analytics.gradeByClass.length > 0 ? (
                      <div className="h-[220px]">
                        <LazyResponsiveContainer width="100%" height="100%">
                          <LazyBarChart
                            data={analytics.gradeByClass.map((cls) => ({
                              name: cls.name,
                              score: safeDisplay(cls.average),
                            }))}
                            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                          >
                            <LazyCartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <LazyXAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                            <LazyYAxis domain={[0, 20]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                            <LazyTooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                            <LazyBar dataKey="score" fill="#F77F00" radius={[6, 6, 0, 0]} name={lang === 'fr' ? 'Moyenne' : 'Average'} />
                          </LazyBarChart>
                        </LazyResponsiveContainer>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                        <BarChart3 size={40} className="mb-2 opacity-30" />
                        <p className="text-sm">{lang === 'fr' ? 'Aucune note enregistrée' : 'No grades recorded'}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Finance Chart */}
                {activeChart === 'finance' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-slate-500">{lang === 'fr' ? 'Revenus sur 6 mois' : '6-month revenue'}</p>
                        <p className="text-2xl font-bold text-slate-900">{formatCurrency(safeDisplay(analytics?.monthlyRevenue))}</p>
                      </div>
                      <TrendBadge value={safeDisplay(analytics?.paymentGrowth)} />
                    </div>
                    {analytics?.revenueTrend && analytics.revenueTrend.some(r => safeDisplay(r.revenue) > 0) ? (
                      <div className="h-[220px]">
                        <LazyResponsiveContainer width="100%" height="100%">
                          <LazyAreaChart
                            data={analytics.revenueTrend.map((month) => ({
                              name: month.name,
                              revenue: safeDisplay(month.revenue),
                            }))}
                            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                          >
                            <defs>
                              <linearGradient id="gradientRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <LazyCartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <LazyXAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                            <LazyYAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                            <LazyTooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                            <LazyArea type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2.5} fill="url(#gradientRevenue)" name={lang === 'fr' ? 'Revenus' : 'Revenue'} />
                          </LazyAreaChart>
                        </LazyResponsiveContainer>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                        <CreditCard size={40} className="mb-2 opacity-30" />
                        <p className="text-sm">{lang === 'fr' ? 'Aucun paiement enregistré' : 'No payments recorded'}</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900">
              {lang === 'fr' ? 'Actions rapides' : 'Quick Actions'}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white dark:bg-[var(--color-surface-raised)] border border-slate-100 dark:border-border hover:border-primary-200 dark:hover:border-primary-500/30 hover:shadow-md transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon size={22} className={action.iconColor} />
                </div>
                <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Recent Students */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                  <Users size={16} className="text-primary" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {lang === 'fr' ? 'Élèves récents' : 'Recent Students'}
                </h3>
              </div>
              <Link href="/students" className="text-xs font-bold text-primary flex items-center gap-1 hover:text-primary-700 transition-colors">
                {lang === 'fr' ? 'Voir tout' : 'View All'} <ArrowRight size={13} />
              </Link>
            </div>
            <div className="p-5">
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <SkeletonPulse className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <SkeletonPulse className="w-32 h-4 mb-1" />
                        <SkeletonPulse className="w-24 h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : students.length === 0 ? (
                <div className="text-center py-10">
                  <Users size={36} className="mx-auto mb-2 text-slate-200" />
                  <p className="text-sm text-slate-400">{lang === 'fr' ? 'Aucun élève inscrit' : 'No students enrolled'}</p>
                  <Link href="/students" className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-2 hover:text-primary-700">
                    <Plus size={13} /> {lang === 'fr' ? 'Ajouter un élève' : 'Add a student'}
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-50">
                  {students.map((s, i) => (
                    <Link key={s.id || i} href={`/students/${s.id}`} className="flex items-center gap-3 py-3 px-1 rounded-lg hover:bg-slate-50 transition-colors -mx-1">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-sm">
                        {s.user?.name?.charAt(0) || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{s.user?.name}</p>
                        <p className="text-xs text-slate-400">{s.matricule || s.class?.name || '-'}</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Bell size={16} className="text-amber-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {lang === 'fr' ? 'Notifications' : 'Notifications'}
                </h3>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded-full">{unreadCount}</span>
                )}
              </div>
              <Link href="/notifications" className="text-xs font-bold text-primary flex items-center gap-1 hover:text-primary-700 transition-colors">
                {lang === 'fr' ? 'Tout voir' : 'View All'} <ArrowRight size={13} />
              </Link>
            </div>
            <div className="p-5">
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i}>
                      <SkeletonPulse className="w-full h-4 mb-1" />
                      <SkeletonPulse className="w-2/3 h-3" />
                    </div>
                  ))}
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-10">
                  <CheckCircle size={36} className="mx-auto mb-2 text-emerald-300" />
                  <p className="text-sm font-medium text-slate-500">{lang === 'fr' ? 'Tout est à jour' : 'All caught up'}</p>
                  <p className="text-xs text-slate-400 mt-1">{lang === 'fr' ? 'Aucune notification en attente' : 'No pending notifications'}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.map((n, i) => (
                    <div key={n.id || i} className={`p-3 rounded-xl transition-colors ${n.isRead ? 'bg-slate-50/50' : 'bg-primary-50/40 border border-primary-100'}`}>
                      <p className="text-sm font-medium text-slate-800 line-clamp-2">{n.title || n.body || 'Notification'}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{n.createdAt ? new Date(n.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Classes Overview */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                <BookOpen size={16} className="text-violet-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {lang === 'fr' ? 'Classes' : 'Classes'}
              </h3>
              {!loading && <span className="text-xs text-slate-400 font-medium">({totalClasses})</span>}
            </div>
            <Link href="/classes" className="text-xs font-bold text-primary flex items-center gap-1 hover:text-primary-700 transition-colors">
              {lang === 'fr' ? 'Gérer' : 'Manage'} <ArrowRight size={13} />
            </Link>
          </div>
          <div className="p-5">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonPulse key={i} className="h-20 rounded-xl" />
                ))}
              </div>
            ) : classes.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen size={36} className="mx-auto mb-2 text-slate-200" />
                <p className="text-sm text-slate-400">{lang === 'fr' ? 'Aucune classe créée' : 'No classes created'}</p>
                <Link href="/classes" className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-2 hover:text-primary-700">
                  <Plus size={13} /> {lang === 'fr' ? 'Créer une classe' : 'Create a class'}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {classes.map((cls, i) => (
                  <Link
                    key={cls.id || i}
                    href={`/classes/${cls.id}`}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-primary-50 border border-transparent hover:border-primary-200 transition-all group"
                  >
                    <p className="text-sm font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{cls.name}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Users size={12} className="text-slate-400" />
                      <p className="text-xs text-slate-500">{cls.students?.length || cls.studentsCount || 0} {lang === 'fr' ? 'élèves' : 'students'}</p>
                    </div>
                    {cls.level && <p className="text-[10px] text-slate-400 mt-1">{cls.level}</p>}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-primary-50/60 via-white to-secondary-50/60 rounded-2xl border border-primary-100/50 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-primary-100/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                <Brain size={16} className="text-primary" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {lang === 'fr' ? 'Insights EduCI AI' : 'EduCI AI Insights'}
              </h3>
            </div>
            <Link href="/analytics" className="text-xs font-medium text-primary hover:text-primary-700 transition-colors flex items-center gap-1">
              {lang === 'fr' ? 'Voir tout' : 'View all'} <ArrowRight size={12} />
            </Link>
          </div>
          <div className="p-5">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-2 border-primary-200 border-t-primary rounded-full animate-spin"></div>
                  <p className="text-sm font-medium text-slate-500">{lang === 'fr' ? 'Analyse en cours...' : 'Analyzing...'}</p>
                </div>
              </div>
            ) : !analytics ? (
              <div className="text-center py-10">
                <Brain size={40} className="mx-auto mb-2 text-primary-200" />
                <p className="text-sm font-medium text-slate-500">
                  {lang === 'fr' ? 'Ajoutez des données pour obtenir des recommandations IA' : 'Add data to get AI recommendations'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Attendance Insight */}
                {attendanceRate > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100/80">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${attendanceRate >= 85 ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                      <CalendarCheck size={18} className={attendanceRate >= 85 ? 'text-emerald-600' : 'text-amber-600'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">
                        {lang === 'fr'
                          ? attendanceRate >= 85 ? `Excellent taux de présence` : `Présence à surveiller`
                          : attendanceRate >= 85 ? `Excellent attendance rate` : `Attendance needs monitoring`}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {attendanceRate}% — {lang === 'fr'
                          ? attendanceRate >= 85 ? 'Objectif atteint' : 'Suivi recommandé'
                          : attendanceRate >= 85 ? 'Target achieved' : 'Monitoring recommended'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Struggling Students */}
                {(analytics.topStudentsCount || 0) > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100/80">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-red-50">
                      <AlertTriangle size={18} className="text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">
                        {lang === 'fr'
                          ? `${analytics.topStudentsCount} élève(s) en difficulté`
                          : `${analytics.topStudentsCount} struggling student(s)`}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lang === 'fr' ? 'Moyenne < 8/20 — soutien personnalisé recommandé' : 'Avg < 8/20 — personalized support recommended'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Finance Insight */}
                <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100/80">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-50">
                    <CreditCard size={18} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">
                      {lang === 'fr'
                        ? analytics.paymentGrowth && safeDisplay(analytics.paymentGrowth) > 0
                          ? `Paiements en hausse de ${safeDisplay(analytics.paymentGrowth)}%`
                          : analytics.paymentGrowth && safeDisplay(analytics.paymentGrowth) < 0
                            ? `Paiements en baisse de ${Math.abs(safeDisplay(analytics.paymentGrowth))}%`
                            : `Revenus: ${formatCurrency(safeDisplay(analytics.monthlyRevenue))}`
                        : analytics.paymentGrowth && safeDisplay(analytics.paymentGrowth) > 0
                          ? `Payments up ${safeDisplay(analytics.paymentGrowth)}%`
                          : analytics.paymentGrowth && safeDisplay(analytics.paymentGrowth) < 0
                            ? `Payments down ${Math.abs(safeDisplay(analytics.paymentGrowth))}%`
                            : `Revenue: ${formatCurrency(safeDisplay(analytics.monthlyRevenue))}`}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lang === 'fr'
                        ? `Mois précédent: ${formatCurrency(safeDisplay(analytics.previousMonthRevenue))}`
                        : `Previous month: ${formatCurrency(safeDisplay(analytics.previousMonthRevenue))}`}
                    </p>
                  </div>
                </div>

                {/* Academic Insight */}
                {safeDisplay(analytics.averageGrade) > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100/80">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-50">
                      <Award size={18} className="text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">
                        {lang === 'fr'
                          ? `Moyenne établissement: ${safeDisplay(analytics.averageGrade).toFixed(1)}/20`
                          : `School average: ${safeDisplay(analytics.averageGrade).toFixed(1)}/20`}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lang === 'fr'
                          ? safeDisplay(analytics.averageGrade) >= 12 ? 'Bon niveau global' : 'Des efforts sont nécessaires'
                          : safeDisplay(analytics.averageGrade) >= 12 ? 'Good overall level' : 'Improvement needed'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* No Alerts = Success State */}
        {!loading && alerts.length === 0 && (
          <div className="flex items-center gap-3 px-5 py-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl">
            <CheckCircle size={20} className="text-emerald-500 flex-shrink-0" />
            <p className="text-sm font-medium text-emerald-800">
              {lang === 'fr' ? 'Tout fonctionne bien — aucune alerte critique' : 'Everything is running smoothly — no critical alerts'}
            </p>
          </div>
        )}

      </div>
    </RoleLayout>
  );
}
