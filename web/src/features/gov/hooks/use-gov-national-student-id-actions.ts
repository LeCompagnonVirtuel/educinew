'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { NationalStudentId } from '@educi/types';

export function useGOVNationalStudentIdActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<NationalStudentId>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_national_student_ids').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as NationalStudentId;
  };
  const update = async (id: string, data: Partial<NationalStudentId>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_national_student_ids').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as NationalStudentId;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_national_student_ids').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
