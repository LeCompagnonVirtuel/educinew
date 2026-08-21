'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';
import { FlaskConical, Clock, Check, ChevronRight, Star, Brain, BookOpen, Zap, Target, Loader2 } from 'lucide-react';

type QuizStatus = 'available' | 'completed';

interface Quiz {
  id: string;
  subject: string;
  title: string;
  questions: number;
  duration: string;
  status: QuizStatus;
  score?: number;
  maxScore?: number;
  date?: string;
}

const subjectColors: Record<string, string> = {
  'Mathématiques': 'bg-blue-50 text-blue-700 border-blue-200',
  'Physique-Chimie': 'bg-purple-50 text-purple-700 border-purple-200',
  'Français': 'bg-rose-50 text-rose-700 border-rose-200',
  'Anglais': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'SVT': 'bg-amber-50 text-amber-700 border-amber-200',
};

const subjectBg: Record<string, string> = {
  'Mathématiques': 'bg-blue-50',
  'Physique-Chimie': 'bg-purple-50',
  'Français': 'bg-rose-50',
  'Anglais': 'bg-emerald-50',
  'SVT': 'bg-amber-50',
};

export default function StudentQuizPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabase();
        const { data, error: dbError } = await supabase
          .from('quizzes')
          .select('*, subject:subjects(*)')
          .order('created_at', { ascending: false })
          .limit(50);
        if (dbError) throw dbError;
        const mapped: Quiz[] = (data || []).map((q: any) => ({
          id: q.id,
          subject: q.subject?.name || q.subject_name || 'Matière',
          title: q.title || 'Quiz',
          questions: q.question_count || q.questions || 10,
          duration: q.duration ? `${q.duration} min` : '20 min',
          status: q.status === 'COMPLETED' || q.status === 'GRADED' ? 'completed' : 'available',
          score: q.score,
          maxScore: q.max_score || q.maxScore || 10,
          date: q.completed_at || q.updated_at,
        }));
        setQuizzes(mapped);
      } catch (e: any) {
        setError(e.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const subjects = ['all', ...Array.from(new Set(quizzes.map(q => q.subject)))];
  const filtered = subjectFilter === 'all' ? quizzes : quizzes.filter(q => q.subject === subjectFilter);
  const available = filtered.filter(q => q.status === 'available');
  const completed = filtered.filter(q => q.status === 'completed');

  const totalScore = completed.reduce((s, q) => s + (q.score || 0), 0);
  const totalMax = completed.reduce((s, q) => s + (q.maxScore || 0), 0);
  const avgPercent = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

  return (
    <RoleLayout role="student">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#191c1d]">
          {lang === 'fr' ? 'Quiz' : 'Quizzes'}
        </h1>
        <p className="text-[#464555] mt-1">
          {lang === 'fr' ? 'Testez vos connaissances' : 'Test your knowledge'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-[#3525cd] to-[#4f46e5] rounded-2xl p-5 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={16} />
            <p className="text-xs text-indigo-200 font-medium">{lang === 'fr' ? 'Quiz complétés' : 'Completed'}</p>
          </div>
          <p className="text-3xl font-bold">{completed.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <Target size={16} className="text-emerald-500" />
            <p className="text-xs text-[#464555] font-medium">{lang === 'fr' ? 'Score moyen' : 'Avg Score'}</p>
          </div>
          <p className="text-3xl font-bold text-emerald-600">{avgPercent}%</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical size={16} className="text-amber-500" />
            <p className="text-xs text-[#464555] font-medium">{lang === 'fr' ? 'Disponibles' : 'Available'}</p>
          </div>
          <p className="text-3xl font-bold text-amber-600">{available.length}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => setSubjectFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              subjectFilter === s
                ? 'bg-[#3525cd] text-white shadow-lg shadow-indigo-200'
                : 'bg-white text-[#464555] border border-slate-200 hover:border-[#3525cd] hover:text-[#3525cd]'
            }`}
          >
            {s === 'all' ? (lang === 'fr' ? 'Toutes' : 'All') : s}
          </button>
        ))}
      </div>

      {available.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#191c1d] mb-4 flex items-center gap-2">
            <FlaskConical size={20} className="text-[#3525cd]" />
            {lang === 'fr' ? 'Quiz disponibles' : 'Available Quizzes'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {available.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group">
                <div className={`h-2 ${subjectBg[quiz.subject] ? subjectBg[quiz.subject].replace('50', '400') : 'bg-[#4f46e5]'}`} />
                <div className="p-5">
                  <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-lg mb-3 border ${subjectColors[quiz.subject] || 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                    {quiz.subject}
                  </span>
                  <h4 className="text-base font-bold text-[#191c1d] mb-3">{quiz.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-[#464555] mb-5">
                    <span className="flex items-center gap-1">
                      <Brain size={14} />
                      {quiz.questions} {lang === 'fr' ? 'questions' : 'questions'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {quiz.duration}
                    </span>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#3525cd] text-white font-bold rounded-xl text-sm hover:bg-[#4f46e5] transition-all active:scale-95">
                    {lang === 'fr' ? 'Commencer' : 'Start Quiz'}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-[#191c1d] mb-4 flex items-center gap-2">
            <Check size={20} className="text-emerald-500" />
            {lang === 'fr' ? 'Quiz complétés' : 'Completed Quizzes'}
          </h3>
          <div className="space-y-3">
            {completed.map((quiz) => {
              const percent = quiz.maxScore ? Math.round((quiz.score! / quiz.maxScore) * 100) : 0;
              const isGood = percent >= 80;
              return (
                <div key={quiz.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center justify-between hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isGood ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                      {isGood ? <Star size={22} className="text-emerald-600" /> : <Check size={22} className="text-amber-600" />}
                    </div>
                    <div>
                      <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-md mb-1 ${subjectColors[quiz.subject] || 'bg-slate-50 text-slate-700'}`}>
                        {quiz.subject}
                      </span>
                      <h4 className="text-sm font-bold text-[#191c1d]">{quiz.title}</h4>
                      <p className="text-xs text-[#464555] mt-0.5">{quiz.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${isGood ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {quiz.score}/{quiz.maxScore}
                    </p>
                    <p className="text-xs text-[#464555]">{percent}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-100">
          <FlaskConical size={48} className="text-slate-300 mb-4" />
          <p className="text-lg font-semibold text-[#191c1d]">
            {lang === 'fr' ? 'Aucun quiz trouvé' : 'No quizzes found'}
          </p>
        </div>
      )}
    </RoleLayout>
  );
}
