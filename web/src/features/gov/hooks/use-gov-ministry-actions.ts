'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Ministry } from '@educi/types';

export function useGOVMinistryActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<Ministry>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_ministries').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as Ministry;
  };
  const update = async (id: string, data: Partial<Ministry>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_ministries').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as Ministry;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_ministries').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
