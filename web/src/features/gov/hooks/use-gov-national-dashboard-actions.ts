'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { NationalDashboard } from '@educi/types';

export function useGOVNationalDashboardActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<NationalDashboard>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_national_dashboards').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as NationalDashboard;
  };
  const update = async (id: string, data: Partial<NationalDashboard>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_national_dashboards').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as NationalDashboard;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_national_dashboards').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
