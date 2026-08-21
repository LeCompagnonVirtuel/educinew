'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { TranslationFeedback } from '@educi/types';

export function useGEGINTranslationFeedbackActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const create = useCallback(
    async (payload: Omit<TranslationFeedback, 'id' | 'createdAt' | 'updatedAt'>) => {
      setLoading(true);
      setError(null);
      try {
        const { data, err } = await supabase
          .from('gegin_entities')
          .insert({ ...payload, school_id: schoolId })
          .select()
          .single();
        if (err) throw err;
        return data as TranslationFeedback;
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'An error occurred');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [schoolId, supabase]
  );

  const update = useCallback(
    async (id: string, payload: Partial<Omit<TranslationFeedback, 'id' | 'createdAt' | 'updatedAt'>>) => {
      setLoading(true);
      setError(null);
      try {
        const { data, err } = await supabase
          .from('gegin_entities')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', id)
          .eq('school_id', schoolId)
          .select()
          .single();
        if (err) throw err;
        return data as TranslationFeedback;
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'An error occurred');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [schoolId, supabase]
  );

  const remove = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const { err } = await supabase
          .from('gegin_entities')
          .delete()
          .eq('id', id)
          .eq('school_id', schoolId);
        if (err) throw err;
        return true;
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'An error occurred');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [schoolId, supabase]
  );

  return { create, update, remove, loading, error };
}
