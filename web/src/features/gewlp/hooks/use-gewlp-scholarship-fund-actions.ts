'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ScholarshipFund, ScholarshipFundInsert, ScholarshipFundUpdate } from '@educi/types';
export function useGewlpScholarshipFundActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = async (payload: ScholarshipFundInsert): Promise<ScholarshipFund | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_scholarship_funds').insert(payload).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create scholarship fund');
      return null;
    } finally {
      setLoading(false);
    }
  };
  const update = async (id: string, payload: ScholarshipFundUpdate): Promise<ScholarshipFund | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_scholarship_funds').update(payload).eq('id', id).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update scholarship fund');
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
      const { error: e } = await supabase.from('gewlp_scholarship_funds').delete().eq('id', id);
      if (e) throw e;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete scholarship fund');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { create, update, remove, loading, error };
}
