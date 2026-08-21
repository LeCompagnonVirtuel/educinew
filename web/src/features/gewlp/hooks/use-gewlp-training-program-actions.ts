'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { TrainingProgram, TrainingProgramInsert, TrainingProgramUpdate } from '@educi/types';
export function useGewlpTrainingProgramActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = async (payload: TrainingProgramInsert): Promise<TrainingProgram | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_training_programs').insert(payload).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create training program');
      return null;
    } finally {
      setLoading(false);
    }
  };
  const update = async (id: string, payload: TrainingProgramUpdate): Promise<TrainingProgram | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_training_programs').update(payload).eq('id', id).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update training program');
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
      const { error: e } = await supabase.from('gewlp_training_programs').delete().eq('id', id);
      if (e) throw e;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete training program');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { create, update, remove, loading, error };
}
