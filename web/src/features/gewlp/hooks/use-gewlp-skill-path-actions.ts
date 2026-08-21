'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SkillPath, SkillPathInsert, SkillPathUpdate } from '@educi/types';
export function useGewlpSkillPathActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = async (payload: SkillPathInsert): Promise<SkillPath | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_skill_paths').insert(payload).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create skill path');
      return null;
    } finally {
      setLoading(false);
    }
  };
  const update = async (id: string, payload: SkillPathUpdate): Promise<SkillPath | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_skill_paths').update(payload).eq('id', id).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update skill path');
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
      const { error: e } = await supabase.from('gewlp_skill_paths').delete().eq('id', id);
      if (e) throw e;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete skill path');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { create, update, remove, loading, error };
}
