'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SchoolRegistry } from '@educi/types';

export function useGOVSchoolRegistryActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<SchoolRegistry>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_school_registries').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as SchoolRegistry;
  };
  const update = async (id: string, data: Partial<SchoolRegistry>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_school_registries').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as SchoolRegistry;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_school_registries').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
