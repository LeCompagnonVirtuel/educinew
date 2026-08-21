'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ScholarshipApplication } from '@educi/types';

export function useGOVScholarshipApplicationActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<ScholarshipApplication>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_scholarship_applications').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ScholarshipApplication;
  };
  const update = async (id: string, data: Partial<ScholarshipApplication>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_scholarship_applications').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ScholarshipApplication;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_scholarship_applications').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
