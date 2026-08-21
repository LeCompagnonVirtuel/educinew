'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { StudentDistribution } from '@educi/types';

export function useGOVStudentDistributionActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<StudentDistribution>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_student_distributions').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as StudentDistribution;
  };
  const update = async (id: string, data: Partial<StudentDistribution>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_student_distributions').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as StudentDistribution;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_student_distributions').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
