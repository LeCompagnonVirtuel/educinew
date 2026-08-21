'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { PersonDigitalTwin, PersonDigitalTwinInsert, PersonDigitalTwinUpdate } from '@educi/types';
export function useGewlpPersonDigitalTwinActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = async (payload: PersonDigitalTwinInsert): Promise<PersonDigitalTwin | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_person_digital_twins').insert(payload).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create person digital twin');
      return null;
    } finally {
      setLoading(false);
    }
  };
  const update = async (id: string, payload: PersonDigitalTwinUpdate): Promise<PersonDigitalTwin | null> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: e } = await supabase.from('gewlp_person_digital_twins').update(payload).eq('id', id).select().single();
      if (e) throw e;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update person digital twin');
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
      const { error: e } = await supabase.from('gewlp_person_digital_twins').delete().eq('id', id);
      if (e) throw e;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete person digital twin');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { create, update, remove, loading, error };
}
