'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { CampusAnalytics } from '@educi/types';

export function useGOVCampusAnalyticsActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<CampusAnalytics>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_campus_analytics').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as CampusAnalytics;
  };
  const update = async (id: string, data: Partial<CampusAnalytics>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_campus_analytics').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as CampusAnalytics;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_campus_analytics').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
