'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { MarkingCenter } from '@educi/types';

export function useGOVMarkingCenterActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<MarkingCenter>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_marking_centers').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as MarkingCenter;
  };
  const update = async (id: string, data: Partial<MarkingCenter>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_marking_centers').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as MarkingCenter;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_marking_centers').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
