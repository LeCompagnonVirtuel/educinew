'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { CrossCampusUser } from '@educi/types';

export function useGOVCrossCampusUserActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<CrossCampusUser>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_cross_campus_users').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as CrossCampusUser;
  };
  const update = async (id: string, data: Partial<CrossCampusUser>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_cross_campus_users').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as CrossCampusUser;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_cross_campus_users').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
