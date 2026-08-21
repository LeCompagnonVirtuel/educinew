'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';
import { FileText, Clock, Check, ChevronRight, Filter, Star, AlertTriangle, BookOpen, Loader2 } from 'lucide-react';

type FilterType = 'all' | 'pending' | 'submitted' | 'graded';
type AssignmentStatus = 'pending' | 'submitted' | 'graded';

interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: AssignmentStatus;
  score?: number;
  maxScore?: number;
  description: string;
}

const subjectColors: Record<string, string> = {
  'Mathématiques': 'bg-blue-50 text-blue-700',
  'Physique-Chimie': 'bg-purple-50 text-purple-700',
  'Français': 'bg-rose-50 text-rose-700',
  'Anglais': 'bg-emerald-50 text-emerald-700',
  'SVT': 'bg-amber-50 text-amber-700',
  'Histoire-Géo': 'bg-orange-50 text-orange-700',
};

export default function StudentAssignmentsPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterType>('all');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabase();
        const { data, error: dbError } = await supabase
          .from('assignments')
          .select('*, subject:subjects(*)')
          .order('due_date', { ascending: true })
          .limit(50);
        if (dbError) throw dbError;
        const mapped: Assignment[] = (data || []).map((a: any) => ({
          id: a.id,
          subject: a.subject?.name || a.subject_name || 'Matière',
          title: a.title || 'Devoir',
          dueDate: a.due_date || a.dueDate || '',
          status: a.status === 'GRADED' ? 'graded' : a.status === 'SUBMITTED' ? 'submitted' : 'pending',
          score: a.score,
          maxScore: a.max_score || a.maxScore || 20,
          description: a.description || '',
        }));
        setAssignments(mapped);
      } catch (e: any) {
        setError(e.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filters: { key: FilterType; labelFr: string; labelEn: string; count: number }[] = [
    { key: 'all', labelFr: 'Tous', labelEn: 'All', count: assignments.length },
    { key: 'pending', labelFr: 'À faire', labelEn: 'Pending', count: assignments.filter(a => a.status === 'pending').length },
    { key: 'submitted', labelFr: 'Soumis', labelEn: 'Submitted', count: assignments.filter(a => a.status === 'submitted').length },
    { key: 'graded', labelFr: 'Notés', labelEn: 'Graded', count: assignments.filter(a => a.status === 'graded').length },
  ];

  const filtered = filter === 'all' ? assignments : assignments.filter(a => a.status === filter);

  const getStatusConfig = (status: AssignmentStatus) => {
    switch (status) {
      case 'pending':
        return { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', label: lang === 'fr' ? 'À faire' : 'Pending' };
      case 'submitted':
        return { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', label: lang === 'fr' ? 'Soumis' : 'Submitted' };
      case 'graded':
        return { icon: Check, color: 'text-emerald-600', bg: 'bg-emerald-50', label: lang === 'fr' ? 'Noté' : 'Graded' };
    }
  };

  return (
    <RoleLayout role="student">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#191c1d]">
          {lang === 'fr' ? 'Mes Devoirs' : 'My Assignments'}
        </h1>
        <p className="text-[#464555] mt-1">
          {lang === 'fr' ? 'Gérez vos devoirs et soumissions' : 'Manage your homework and submissions'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              filter === f.key
                ? 'bg-[#3525cd] text-white shadow-lg shadow-indigo-200'
                : 'bg-white text-[#464555] border border-slate-200 hover:border-[#3525cd] hover:text-[#3525cd]'
            }`}
          >
            {lang === 'fr' ? f.labelFr : f.labelEn}
            <span className={`text-xs px-2 py-0.5 rounded-full ${filter === f.key ? 'bg-white/20' : 'bg-slate-100'}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-16 bg-white rounded-2xl border border-slate-100">
            <Loader2 size={32} className="animate-spin text-[#3525cd]" />
          </div>
        ) : filtered.map((assignment) => {
          const statusConfig = getStatusConfig(assignment.status);
          const StatusIcon = statusConfig.icon;
          const daysLeft = Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          const isUrgent = assignment.status === 'pending' && daysLeft <= 3 && daysLeft > 0;

          return (
            <div
              key={assignment.id}
              className={`bg-white rounded-2xl shadow-sm border transition-all hover:shadow-md cursor-pointer ${
                isUrgent ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e2dfff] flex items-center justify-center flex-shrink-0">
                      <FileText size={22} className="text-[#3525cd]" />
                    </div>
                    <div>
                      <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-lg mb-2 ${subjectColors[assignment.subject] || 'bg-slate-50 text-slate-700'}`}>
                        {assignment.subject}
                      </span>
                      <h3 className="text-lg font-bold text-[#191c1d]">{assignment.title}</h3>
                      <p className="text-sm text-[#464555] mt-1">{assignment.description}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.color}`}>
                    <StatusIcon size={14} />
                    {statusConfig.label}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-[#464555]">
                      <Clock size={16} />
                      <span>
                        {lang === 'fr' ? 'Échéance: ' : 'Due: '}
                        <span className={`font-semibold ${isUrgent ? 'text-amber-600' : 'text-[#191c1d]'}`}>
                          {assignment.dueDate}
                        </span>
                      </span>
                      {isUrgent && (
                        <span className="text-xs text-amber-600 font-bold ml-1">
                          ({daysLeft} {lang === 'fr' ? 'jours' : 'days'})
                        </span>
                      )}
                    </div>
                    {assignment.status === 'graded' && assignment.score !== undefined && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <Star size={16} className="text-amber-500" />
                        <span className="font-bold text-[#191c1d]">{assignment.score}/{assignment.maxScore}</span>
                      </div>
                    )}
                  </div>
                  <button className="flex items-center gap-1 text-sm font-semibold text-[#3525cd] hover:underline">
                    {lang === 'fr' ? 'Voir détails' : 'View Details'}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-100">
          <BookOpen size={48} className="text-slate-300 mb-4" />
          <p className="text-lg font-semibold text-[#191c1d]">
            {lang === 'fr' ? 'Aucun devoir trouvé' : 'No assignments found'}
          </p>
          <p className="text-sm text-[#464555]">
            {lang === 'fr' ? 'Essayez un autre filtre' : 'Try a different filter'}
          </p>
        </div>
      )}
    </RoleLayout>
  );
}
