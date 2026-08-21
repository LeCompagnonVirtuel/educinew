'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ExamCandidate } from '@educi/types';

export function useGOVExamCandidateActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<ExamCandidate>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_exam_candidates').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ExamCandidate;
  };
  const update = async (id: string, data: Partial<ExamCandidate>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_exam_candidates').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ExamCandidate;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_exam_candidates').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
