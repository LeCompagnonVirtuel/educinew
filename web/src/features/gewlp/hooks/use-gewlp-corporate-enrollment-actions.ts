'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { CorporateEnrollment, CorporateEnrollmentInsert, CorporateEnrollmentUpdate } from '@educi/types';
export function useGewlpCorporateEnrollmentActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = async (payload: CorporateEnrollmentInsert): Promise<CorporateEnrollment | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_corporate_enrollments').insert(payload).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create corporate enrollment');
      return null;
    } finally {
      setLoading(false);
    }
  };
  const update = async (id: string, payload: CorporateEnrollmentUpdate): Promise<CorporateEnrollment | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_corporate_enrollments').update(payload).eq('id', id).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update corporate enrollment');
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
      const { error: e } = await supabase.from('gewlp_corporate_enrollments').delete().eq('id', id);
      if (e) throw e;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete corporate enrollment');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { create, update, remove, loading, error };
}
