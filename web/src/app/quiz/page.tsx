'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { getSupabase } from '@/lib/api/shared';
import { Play, Clock, Trophy, ChevronRight, Sparkles, BarChart3, Loader2 } from 'lucide-react';

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
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
          .limit(20);
        if (dbError) throw dbError;
        setQuizzes(data || []);
      } catch (e: any) {
        setError(e.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Learning' }, { label: 'Quiz Selection' }]}>
      {/* Hero */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="text-xs font-bold text-[#3525cd] uppercase tracking-widest flex items-center gap-2">
            <Sparkles size={14} /> AI-Generated Quizzes
          </span>
          <h2 className="text-3xl font-bold text-[#191c1d] mt-1">Quiz Knowledge Base</h2>
          <p className="text-[#464555] mt-1">Challenge yourself with curated assessments.</p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Featured Quiz */}
        <div className="md:col-span-2 bg-gradient-to-br from-[#3525cd] to-[#4f46e5] p-8 rounded-2xl text-white">
          <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">Recommended</span>
          <h3 className="text-3xl font-bold mt-4">Advanced Calculus Mastery</h3>
          <p className="mt-2 text-indigo-100">Deep dive into derivatives and integrals. 20 Questions.</p>
          <div className="flex items-center gap-6 mt-6">
            <span className="flex items-center gap-2"><Clock size={18} /> 45 min</span>
            <span className="flex items-center gap-2"><BarChart3 size={18} /> Hard</span>
            <button className="ml-auto bg-white text-[#3525cd] px-6 py-3 rounded-xl font-bold flex items-center gap-2">
              Start Quiz <Play size={16} />
            </button>
          </div>
        </div>
        {/* Stats */}
        <div className="bg-[#64a8fe]/10 p-6 rounded-2xl flex flex-col justify-center">
          <Trophy size={32} className="text-[#0060ac] mb-3" />
          <h3 className="text-xl font-bold text-[#191c1d]">Your Progress</h3>
          <p className="text-sm text-[#464555] mt-1">12 quizzes this week. Keep the streak!</p>
          <div className="mt-4">
            <div className="h-2 bg-[#64a8fe]/20 rounded-full overflow-hidden">
              <div className="h-full bg-[#0060ac] w-3/4 rounded-full" />
            </div>
            <p className="text-xs text-right text-[#0060ac] font-bold mt-1">75% Monthly Goal</p>
          </div>
        </div>
      </div>

      {/* Quiz List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="md:col-span-2 text-center py-12"><Loader2 size={32} className="animate-spin mx-auto text-slate-400" /></div>
        ) : quizzes.length === 0 ? (
          <div className="md:col-span-2 text-center py-12 text-slate-400">Aucun quiz disponible</div>
        ) : (
        quizzes.map((quiz: any) => (
          <button key={quiz.id} className="bg-white p-5 rounded-2xl shadow-card hover:shadow-lg transition-all text-left flex items-start gap-4 group">
            <div className="w-14 h-14 rounded-xl bg-[#e2dfff] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Play size={24} className="text-[#3525cd]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-[#3525cd] uppercase">{quiz.subject?.name || quiz.subject || 'Quiz'}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${quiz.difficulty === 'hard' ? 'bg-red-50 text-red-700' : quiz.difficulty === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                  {quiz.difficulty || 'Easy'}
                </span>
              </div>
              <h4 className="font-bold text-[#191c1d]">{quiz.title || quiz.name}</h4>
              <div className="flex items-center gap-3 mt-2 text-xs text-[#464555]">
                <span className="flex items-center gap-1"><Clock size={12} /> {quiz.duration || '20 min'}</span>
                <span>{quiz.question_count || quiz.questions || 10} questions</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#c7c4d8] group-hover:text-[#3525cd]" />
          </button>
        )))}
      </div>
    </RoleLayout>
  );
}
