'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { WorkforceMetric, WorkforceMetricInsert, WorkforceMetricUpdate } from '@educi/types';
export function useGewlpWorkforceMetricActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = async (payload: WorkforceMetricInsert): Promise<WorkforceMetric | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_workforce_metrics').insert(payload).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create workforce metric');
      return null;
    } finally {
      setLoading(false);
    }
  };
  const update = async (id: string, payload: WorkforceMetricUpdate): Promise<WorkforceMetric | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_workforce_metrics').update(payload).eq('id', id).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update workforce metric');
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
      const { error: e } = await supabase.from('gewlp_workforce_metrics').delete().eq('id', id);
      if (e) throw e;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete workforce metric');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { create, update, remove, loading, error };
}
