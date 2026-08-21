'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { WorkforceForecast, WorkforceForecastInsert, WorkforceForecastUpdate } from '@educi/types';
export function useGewlpWorkforceForecastActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = async (payload: WorkforceForecastInsert): Promise<WorkforceForecast | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_workforce_forecasts').insert(payload).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create workforce forecast');
      return null;
    } finally {
      setLoading(false);
    }
  };
  const update = async (id: string, payload: WorkforceForecastUpdate): Promise<WorkforceForecast | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_workforce_forecasts').update(payload).eq('id', id).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update workforce forecast');
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
      const { error: e } = await supabase.from('gewlp_workforce_forecasts').delete().eq('id', id);
      if (e) throw e;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete workforce forecast');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { create, update, remove, loading, error };
}
