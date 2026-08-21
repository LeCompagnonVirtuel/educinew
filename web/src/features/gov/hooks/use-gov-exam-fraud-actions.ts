'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ExamFraud } from '@educi/types';

export function useGOVExamFraudActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<ExamFraud>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_exam_frauds').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ExamFraud;
  };
  const update = async (id: string, data: Partial<ExamFraud>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_exam_frauds').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ExamFraud;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_exam_frauds').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
