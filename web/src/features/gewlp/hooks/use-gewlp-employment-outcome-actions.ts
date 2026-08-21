'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { EmploymentOutcome, EmploymentOutcomeInsert, EmploymentOutcomeUpdate } from '@educi/types';
export function useGewlpEmploymentOutcomeActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = async (payload: EmploymentOutcomeInsert): Promise<EmploymentOutcome | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_employment_outcomes').insert(payload).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create employment outcome');
      return null;
    } finally {
      setLoading(false);
    }
  };
  const update = async (id: string, payload: EmploymentOutcomeUpdate): Promise<EmploymentOutcome | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_employment_outcomes').update(payload).eq('id', id).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update employment outcome');
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
      const { error: e } = await supabase.from('gewlp_employment_outcomes').delete().eq('id', id);
      if (e) throw e;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete employment outcome');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { create, update, remove, loading, error };
}
