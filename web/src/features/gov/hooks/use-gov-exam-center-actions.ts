'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ExamCenter } from '@educi/types';

export function useGOVExamCenterActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<ExamCenter>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_exam_centers').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ExamCenter;
  };
  const update = async (id: string, data: Partial<ExamCenter>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_exam_centers').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ExamCenter;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_exam_centers').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
