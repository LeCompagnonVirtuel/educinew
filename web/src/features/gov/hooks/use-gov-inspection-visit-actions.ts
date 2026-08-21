'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { InspectionVisit } from '@educi/types';

export function useGOVInspectionVisitActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<InspectionVisit>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_inspection_visits').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as InspectionVisit;
  };
  const update = async (id: string, data: Partial<InspectionVisit>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_inspection_visits').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as InspectionVisit;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_inspection_visits').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
