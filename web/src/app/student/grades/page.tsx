'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { sbGrades } from '@/lib/api';
import { TrendingUp, Star, AlertTriangle, Target, Zap, ChevronRight, Loader2 } from 'lucide-react';

interface SubjectGrade {
  name: string;
  score: number;
  max: number;
  icon: string;
  coefficient: number;
  trend: 'up' | 'down' | 'stable';
}

const SUBJECT_ICONS: Record<string, string> = {
  'Mathématiques': '📐', 'Mathematics': '📐',
  'Physique-Chimie': '⚡', 'Physics': '⚡',
  'Français': '📝', 'French': '📝',
  'Anglais': '🌍', 'English': '🌍',
  'Histoire-Géo': '🏛️', 'History': '🏛️',
  'SVT': '🧬', 'Biology': '🧬',
};

export default function StudentGradesPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<SubjectGrade[]>([]);
  const [termComparisons, setTermComparisons] = useState<{ term: string; avg: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState('');

  useEffect(() => {
    if (!user?.id) return;
    async function load() {
      setLoading(true);
      try {
        const gradesData = await sbGrades.getAverages(user!.id);
        const periodsData = await sbGrades.getPeriods(user!.schoolId);

        const bySubject: Record<string, { scores: number[]; total: number; count: number; maxScore: number }> = {};
        (gradesData || []).forEach((g: any) => {
          const name = g.subject?.name || 'Autre';
          if (!bySubject[name]) bySubject[name] = { scores: [], total: 0, count: 0, maxScore: g.max_score || 20 };
          bySubject[name].scores.push(g.score);
          bySubject[name].total += g.score;
          bySubject[name].count++;
        });

        const subjectList: SubjectGrade[] = Object.entries(bySubject).map(([name, data]) => {
          const avg = data.count > 0 ? data.total / data.count : 0;
          const prevScores = data.scores.slice(0, Math.floor(data.count / 2));
          const recentScores = data.scores.slice(Math.floor(data.count / 2));
          const prevAvg = prevScores.length > 0 ? prevScores.reduce((a, b) => a + b, 0) / prevScores.length : avg;
          const recentAvg = recentScores.length > 0 ? recentScores.reduce((a, b) => a + b, 0) / recentScores.length : avg;
          return {
            name,
            score: Math.round(avg * 10) / 10,
            max: data.maxScore,
            icon: SUBJECT_ICONS[name] || '📚',
            coefficient: 2,
            trend: recentAvg > prevAvg + 0.5 ? 'up' : recentAvg < prevAvg - 0.5 ? 'down' : 'stable',
          };
        });
        setSubjects(subjectList);

        const byPeriod: Record<string, { scores: number[]; total: number; count: number }> = {};
        (gradesData || []).forEach((g: any) => {
          const periodName = g.period?.name || 'N/A';
          if (!byPeriod[periodName]) byPeriod[periodName] = { scores: [], total: 0, count: 0 };
          byPeriod[periodName].scores.push(g.score);
          byPeriod[periodName].total += g.score;
          byPeriod[periodName].count++;
        });
        const terms = Object.entries(byPeriod).map(([term, data]) => ({
          term,
          avg: data.count > 0 ? Math.round((data.total / data.count) * 10) / 10 : 0,
        }));
        setTermComparisons(terms);
        if (terms.length > 0) setSelectedTerm(terms[terms.length - 1].term);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user?.id, user?.schoolId]);

  if (loading) {
    return (
      <RoleLayout role="student">
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#4F46E5]" />
        </div>
      </RoleLayout>
    );
  }

  if (subjects.length === 0) {
    return (
      <RoleLayout role="student">
        <div className="text-center py-20">
          <p className="text-slate-500">{lang === 'fr' ? 'Aucune note disponible' : 'No grades available'}</p>
        </div>
      </RoleLayout>
    );
  }

  const overallAvg = subjects.reduce((sum, s) => sum + s.score * s.coefficient, 0) / subjects.reduce((sum, s) => sum + s.coefficient, 0);
  const bestSubject = subjects.reduce((best, s) => s.score > best.score ? s : best, subjects[0]);
  const worstSubject = subjects.reduce((worst, s) => s.score < worst.score ? s : worst, subjects[0]);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = (overallAvg / 20) * circumference;

  return (
    <RoleLayout role="student">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#191c1d]">
          {lang === 'fr' ? 'Mes Notes' : 'My Grades'}
        </h1>
        <p className="text-[#464555] mt-1">
          {lang === 'fr' ? 'Suivez vos résultats académiques' : 'Track your academic performance'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#3525cd] to-[#4f46e5] rounded-2xl p-8 text-white flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="relative">
            <svg width="140" height="140" className="transform -rotate-90">
              <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
              <circle
                cx="70" cy="70" r={radius} fill="none" stroke="white" strokeWidth="8"
                strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - progress}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold">{overallAvg.toFixed(1)}</p>
              <p className="text-xs text-indigo-200">/ 20</p>
            </div>
          </div>
          <p className="text-sm text-indigo-200 mt-4 font-medium">
            {lang === 'fr' ? 'Moyenne générale' : 'Overall Average'}
          </p>
          <p className="text-xs text-indigo-300 mt-1">
            {overallAvg >= 16 ? (lang === 'fr' ? 'Très bien' : 'Very Good') : overallAvg >= 14 ? (lang === 'fr' ? 'Bien' : 'Good') : (lang === 'fr' ? 'Assez bien' : 'Fair')}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Star size={18} className="text-amber-500" />
            <h3 className="font-bold text-[#191c1d]">{lang === 'fr' ? 'Meilleure matière' : 'Best Subject'}</h3>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{bestSubject.icon}</span>
            <div>
              <p className="text-lg font-bold text-[#191c1d]">{bestSubject.name}</p>
              <p className="text-2xl font-bold text-emerald-600">{bestSubject.score}/20</p>
            </div>
          </div>
          <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(bestSubject.score / 20) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Target size={18} className="text-amber-500" />
            <h3 className="font-bold text-[#191c1d]">{lang === 'fr' ? 'À améliorer' : 'Needs Improvement'}</h3>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{worstSubject.icon}</span>
            <div>
              <p className="text-lg font-bold text-[#191c1d]">{worstSubject.name}</p>
              <p className="text-2xl font-bold text-amber-600">{worstSubject.score}/20</p>
            </div>
          </div>
          <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(worstSubject.score / 20) * 100}%` }} />
          </div>
          <p className="text-xs text-[#464555] mt-2">
            {lang === 'fr' ? 'Objectif: atteindre 15/20' : 'Goal: reach 15/20'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#191c1d]">{lang === 'fr' ? 'Notes par matière' : 'Grades by Subject'}</h3>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="text-sm bg-[#f8f9fa] rounded-lg px-3 py-2 outline-none text-[#191c1d] font-medium"
            >
              {termComparisons.map((t) => <option key={t.term} value={t.term}>{t.term}</option>)}
            </select>
          </div>
          <div className="p-5 space-y-4">
            {subjects.map((s) => (
              <div key={s.name} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e2dfff] flex items-center justify-center text-lg flex-shrink-0">
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-[#191c1d] truncate">{s.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${s.score >= 16 ? 'text-emerald-600' : s.score >= 14 ? 'text-blue-600' : s.score >= 12 ? 'text-amber-600' : 'text-red-600'}`}>
                        {s.score}/20
                      </span>
                      <span className={`text-xs ${s.trend === 'up' ? 'text-emerald-500' : s.trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
                        {s.trend === 'up' ? '▲' : s.trend === 'down' ? '▼' : '—'}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${s.score >= 16 ? 'bg-emerald-500' : s.score >= 14 ? 'bg-blue-500' : s.score >= 12 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${(s.score / 20) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={18} className="text-[#3525cd]" />
            <h3 className="font-bold text-[#191c1d]">{lang === 'fr' ? 'Comparaison trimestrielle' : 'Term Comparison'}</h3>
          </div>
          <div className="space-y-4">
            {termComparisons.map((t) => (
              <div key={t.term} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${t.term === selectedTerm ? 'bg-[#3525cd] text-white' : 'bg-[#f8f9fa] text-[#464555]'}`}>
                  {t.term}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#464555] font-medium">{t.term}</span>
                    <span className="text-sm font-bold text-[#191c1d]">{t.avg}/20</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4f46e5] rounded-full transition-all duration-500"
                      style={{ width: `${(t.avg / 20) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-emerald-600" />
              <p className="text-sm font-semibold text-emerald-700">
                {termComparisons.length >= 3
                  ? `+${(termComparisons[2].avg - termComparisons[0].avg).toFixed(1)} ${lang === 'fr' ? 'points depuis T1' : 'points since T1'}`
                  : termComparisons.length >= 2
                  ? `+${(termComparisons[termComparisons.length - 1].avg - termComparisons[0].avg).toFixed(1)} ${lang === 'fr' ? 'points depuis le début' : 'points since start'}`
                  : lang === 'fr' ? 'Pas assez de données' : 'Not enough data'}
              </p>
            </div>
            <p className="text-xs text-emerald-600 mt-1">
              {lang === 'fr' ? 'Excellente progression !' : 'Great progress!'}
            </p>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
