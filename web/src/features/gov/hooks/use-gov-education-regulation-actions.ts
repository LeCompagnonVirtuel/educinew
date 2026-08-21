'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { EducationRegulation } from '@educi/types';

export function useGOVEducationRegulationActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<EducationRegulation>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_education_regulations').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as EducationRegulation;
  };
  const update = async (id: string, data: Partial<EducationRegulation>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_education_regulations').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as EducationRegulation;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_education_regulations').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
