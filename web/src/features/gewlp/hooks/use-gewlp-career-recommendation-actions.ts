'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { CareerRecommendation, CareerRecommendationInsert, CareerRecommendationUpdate } from '@educi/types';
export function useGewlpCareerRecommendationActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = async (payload: CareerRecommendationInsert): Promise<CareerRecommendation | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_career_recommendations').insert(payload).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create career recommendation');
      return null;
    } finally {
      setLoading(false);
    }
  };
  const update = async (id: string, payload: CareerRecommendationUpdate): Promise<CareerRecommendation | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_career_recommendations').update(payload).eq('id', id).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update career recommendation');
      return null;
    } finally {
      setLoading(false);
    }
  };
  const remove = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: e } = await supabase.from('gewlp_career_recommendations').delete().eq('id', id);
      if (e) throw e;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete career recommendation');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { create, update, remove, loading, error };
}
