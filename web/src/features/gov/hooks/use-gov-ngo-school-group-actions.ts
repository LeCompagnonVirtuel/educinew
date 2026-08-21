'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { NgoSchoolGroup } from '@educi/types';

export function useGOVNgoSchoolGroupActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<NgoSchoolGroup>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_ngo_school_groups').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as NgoSchoolGroup;
  };
  const update = async (id: string, data: Partial<NgoSchoolGroup>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_ngo_school_groups').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as NgoSchoolGroup;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_ngo_school_groups').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
