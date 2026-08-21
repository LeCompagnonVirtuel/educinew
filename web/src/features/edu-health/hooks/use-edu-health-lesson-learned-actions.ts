'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useLessonLearnedActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (payload: Omit<LessonLearned, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: err } = await supabase
        .from('edu_health_lessons_learned')
        .insert({ ...payload, school_id: schoolId })
        .select()
        .single();
      if (err) throw err;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, payload: Partial<LessonLearned>) => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: err } = await supabase
        .from('edu_health_lessons_learned')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('school_id', schoolId)
        .select()
        .single();
      if (err) throw err;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { error: err } = await supabase
        .from('edu_health_lessons_learned')
        .delete()
        .eq('id', id)
        .eq('school_id', schoolId);
      if (err) throw err;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
}
