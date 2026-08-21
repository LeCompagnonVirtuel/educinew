'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { InspectorPerformance } from '@educi/types';

export function useGOVInspectorPerformanceActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<InspectorPerformance>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_inspector_performances').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as InspectorPerformance;
  };
  const update = async (id: string, data: Partial<InspectorPerformance>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_inspector_performances').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as InspectorPerformance;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_inspector_performances').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
