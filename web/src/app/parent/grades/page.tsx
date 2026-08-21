'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { sbParent, sbGrades } from '@/lib/api';
import { TrendingUp, ChevronRight, User, Star, AlertTriangle } from 'lucide-react';

const terms = ['1er Trimestre', '2ème Trimestre', '3ème Trimestre'];

export default function ParentGradesPage() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState(terms[0]);
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      sbParent.getChildren(user.id).then((data: any) => {
        const kids = Array.isArray(data) ? data : [];
        setChildren(kids);
        if (kids.length > 0 && kids[0].id) setSelectedChild(kids[0].id);
      }).catch(() => {}).finally(() => setLoading(false));
    }
  }, [user?.id]);

  useEffect(() => {
    if (selectedChild) {
      sbGrades.list({ studentId: selectedChild }).then((data: any) => {
        const formatted = (data || []).map((g: any) => ({
          subject: g.subject?.name || 'N/A',
          score: g.score || 0,
          max: g.maxScore || 20,
          average: 0,
          comment: g.comment || '',
        }));
        setGrades(formatted);
      }).catch(() => setGrades([]));
    }
  }, [selectedChild]);

  const avg = grades.length > 0 ? grades.reduce((s, g) => s + g.score, 0) / grades.length : 0;

  const bestSubject = grades.length > 0 ? grades.reduce((best, g) => g.score > best.score ? g : best, grades[0])?.subject : '-';
  const bestScore = grades.length > 0 ? Math.max(...grades.map(g => g.score)) : 0;
  const worstSubject = grades.length > 0 ? grades.reduce((worst, g) => g.score < worst.score ? g : worst, grades[0])?.subject : '-';
  const worstScore = grades.length > 0 ? Math.min(...grades.map(g => g.score)) : 0;

  function getScoreColor(score: number) {
    if (score >= 16) return 'text-emerald-600';
    if (score >= 14) return 'text-blue-600';
    if (score >= 12) return 'text-amber-600';
    return 'text-red-600';
  }

  return (
    <RoleLayout role="parent">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#191c1d]">
          {lang === 'fr' ? 'Notes' : 'Grades'}
        </h1>
        <p className="text-[#464555] mt-1">
          {lang === 'fr' ? 'Consultez les résultats scolaires de vos enfants.' : 'View your children\'s academic results.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-100">
          <User size={18} className="text-[#3525cd]" />
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="text-sm font-medium text-[#191c1d] bg-transparent outline-none cursor-pointer"
          >
            {children.map((c) => (
              <option key={c.id} value={c.id}>{c.name} — {c.class}</option>
            ))}
          </select>
        </div>
        <select
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
          className="bg-white rounded-xl px-4 py-3 text-sm font-medium text-[#191c1d] shadow-sm border border-slate-100 outline-none cursor-pointer"
        >
          {terms.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-[#3525cd] to-[#4f46e5] rounded-2xl p-5 text-white">
          <p className="text-xs text-indigo-200 font-medium">{lang === 'fr' ? 'Moyenne générale' : 'Overall Average'}</p>
          <p className="text-3xl font-bold mt-1">{avg.toFixed(1)}<span className="text-lg text-indigo-200">/20</span></p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <Star size={16} className="text-amber-500" />
            <p className="text-xs text-[#464555] font-medium">{lang === 'fr' ? 'Meilleure matière' : 'Best Subject'}</p>
          </div>
          <p className="text-lg font-bold text-[#191c1d]">
            {bestSubject || '—'}
          </p>
          <p className="text-sm text-emerald-600 font-semibold">{bestScore}/20</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-amber-500" />
            <p className="text-xs text-[#464555] font-medium">{lang === 'fr' ? 'À améliorer' : 'Needs Improvement'}</p>
          </div>
          <p className="text-lg font-bold text-[#191c1d]">
            {worstSubject || '—'}
          </p>
          <p className="text-sm text-amber-600 font-semibold">{worstScore}/20</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-[#191c1d]">{lang === 'fr' ? 'Bulletin par matière' : 'Subject Report'}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8f9fa] text-left">
                <th className="px-5 py-3 text-xs font-bold text-[#464555] uppercase tracking-wider">{lang === 'fr' ? 'Matière' : 'Subject'}</th>
                <th className="px-5 py-3 text-xs font-bold text-[#464555] uppercase tracking-wider">{lang === 'fr' ? 'Note' : 'Score'}</th>
                <th className="px-5 py-3 text-xs font-bold text-[#464555] uppercase tracking-wider">Max</th>
                <th className="px-5 py-3 text-xs font-bold text-[#464555] uppercase tracking-wider">{lang === 'fr' ? 'Moy. Classe' : 'Class Avg'}</th>
                <th className="px-5 py-3 text-xs font-bold text-[#464555] uppercase tracking-wider hidden md:table-cell">{lang === 'fr' ? 'Commentaire' : 'Comment'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {grades.map((g, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#e2dfff] flex items-center justify-center">
                        <TrendingUp size={16} className="text-[#3525cd]" />
                      </div>
                      <span className="font-semibold text-sm text-[#191c1d]">{g.subject}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-lg font-bold ${getScoreColor(g.score)}`}>{g.score}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#464555] font-medium">{g.max}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#4f46e5] rounded-full" style={{ width: `${(g.average / g.max) * 100}%` }} />
                      </div>
                      <span className="text-sm text-[#464555] font-medium">{g.average}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#464555] hidden md:table-cell max-w-[200px] truncate">{g.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RoleLayout>
  );
}
