'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SchoolRating } from '@educi/types';

export function useGOVSchoolRatingActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<SchoolRating>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_school_ratings').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as SchoolRating;
  };
  const update = async (id: string, data: Partial<SchoolRating>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_school_ratings').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as SchoolRating;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_school_ratings').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
