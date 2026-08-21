'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { WorkforcePlan, WorkforcePlanInsert, WorkforcePlanUpdate } from '@educi/types';
export function useGewlpWorkforcePlanActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = async (payload: WorkforcePlanInsert): Promise<WorkforcePlan | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_workforce_plans').insert(payload).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create workforce plan');
      return null;
    } finally {
      setLoading(false);
    }
  };
  const update = async (id: string, payload: WorkforcePlanUpdate): Promise<WorkforcePlan | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_workforce_plans').update(payload).eq('id', id).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update workforce plan');
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
      const { error: e } = await supabase.from('gewlp_workforce_plans').delete().eq('id', id);
      if (e) throw e;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete workforce plan');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { create, update, remove, loading, error };
}
