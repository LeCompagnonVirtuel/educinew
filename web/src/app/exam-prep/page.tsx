'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import { GraduationCap, Award, Sparkles, BookOpen, Play, ArrowRight, Clock, Loader2 } from 'lucide-react';

export default function ExamPrepPage() {
  const { user } = useAuth();
  const [exams, setExams] = useState([
    { name: 'CEPE', desc: 'Primary School Completion', progress: 0, color: '#0060ac' },
    { name: 'BEPC', desc: 'Junior Secondary Certificate', progress: 0, color: '#3525cd' },
    { name: 'BAC', desc: 'Baccalauréat', progress: 0, color: '#7e3000' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const supabase = getSupabase();
        const { data: progress } = await supabase
          .from('exam_progress')
          .select('*')
          .eq('user_id', user?.id);
        
        if (progress && progress.length > 0) {
          setExams(prev => prev.map(exam => {
            const p = progress.find((ep: any) => ep.exam_type === exam.name);
            return p ? { ...exam, progress: p.progress || 0 } : exam;
          }));
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user?.id]);

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Learning' }, { label: 'Exam Preparation' }]}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="text-xs font-bold text-[#3525cd] uppercase tracking-widest flex items-center gap-2">
            <Sparkles size={14} /> AI-Powered Learning
          </span>
          <h2 className="text-3xl font-bold text-[#191c1d] mt-1">Exam Preparation</h2>
          <p className="text-[#464555] mt-2">Past papers, quizzes, and AI tutoring for CEPE, BEPC, and BAC.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {exams.map((exam) => (
          <div key={exam.name} className="bg-white p-6 rounded-2xl shadow-card hover:shadow-lg transition-shadow group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#e2dfff] flex items-center justify-center">
                <Award size={24} style={{ color: exam.color }} />
              </div>
              <span className="text-2xl font-bold text-[#191c1d]">{exam.progress}%</span>
            </div>
            <h3 className="text-xl font-bold text-[#191c1d]">{exam.name}</h3>
            <p className="text-sm text-[#464555] mb-4">{exam.desc}</p>
            <div className="w-full h-1.5 bg-[#e7e8e9] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${exam.progress}%`, backgroundColor: exam.color }} />
            </div>
            <button className="w-full mt-4 py-2 bg-[#3525cd] text-white font-bold rounded-xl flex items-center justify-center gap-2">
              Continue <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#3525cd] to-[#4f46e5] p-8 rounded-2xl text-white flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">EduCI AI Assistant</h3>
          <p className="text-indigo-100 mt-1">Ask questions, generate quizzes, and get study recommendations.</p>
        </div>
        <a href="/ai" className="bg-white text-[#3525cd] px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          Try Now <Sparkles size={18} />
        </a>
      </div>
    </RoleLayout>
  );
}
