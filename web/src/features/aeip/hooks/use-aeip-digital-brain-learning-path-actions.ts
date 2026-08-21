'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LearningPath } from '@educi/types';

export function useDigitalBrainLearningPathActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const create = async (path: Omit<LearningPath, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('aeip_digital_brain_learning_paths')
        .insert(path)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, updates: Partial<LearningPath>) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('aeip_digital_brain_learning_paths')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase
        .from('aeip_digital_brain_learning_paths')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, loading, error };
}
