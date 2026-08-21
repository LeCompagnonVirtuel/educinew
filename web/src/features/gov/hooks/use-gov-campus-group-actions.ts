'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { CampusGroup } from '@educi/types';

export function useGOVCampusGroupActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<CampusGroup>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_campus_groups').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as CampusGroup;
  };
  const update = async (id: string, data: Partial<CampusGroup>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_campus_groups').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as CampusGroup;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_campus_groups').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
