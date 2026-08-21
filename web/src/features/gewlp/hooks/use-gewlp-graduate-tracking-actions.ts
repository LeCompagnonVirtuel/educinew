'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { GraduateTracking, GraduateTrackingInsert, GraduateTrackingUpdate } from '@educi/types';
export function useGewlpGraduateTrackingActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = async (payload: GraduateTrackingInsert): Promise<GraduateTracking | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_graduate_trackings').insert(payload).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create graduate tracking');
      return null;
    } finally {
      setLoading(false);
    }
  };
  const update = async (id: string, payload: GraduateTrackingUpdate): Promise<GraduateTracking | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_graduate_trackings').update(payload).eq('id', id).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update graduate tracking');
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
      const { error: e } = await supabase.from('gewlp_graduate_trackings').delete().eq('id', id);
      if (e) throw e;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete graduate tracking');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { create, update, remove, loading, error };
}
