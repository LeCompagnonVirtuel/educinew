'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { InspectionRecommendation } from '@educi/types';

export function useGOVInspectionRecommendationActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<InspectionRecommendation>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_inspection_recommendations').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as InspectionRecommendation;
  };
  const update = async (id: string, data: Partial<InspectionRecommendation>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_inspection_recommendations').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as InspectionRecommendation;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_inspection_recommendations').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
