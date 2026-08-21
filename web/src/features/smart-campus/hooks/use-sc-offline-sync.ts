'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface SyncItem {
  id: string;
  table: string;
  action: 'create' | 'update' | 'delete';
  data: Record<string, unknown>;
  synced: boolean;
}

interface SyncConflict {
  id: string;
  table: string;
  localData: Record<string, unknown>;
  remoteData: Record<string, unknown>;
}

export const useScOfflineSync = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sync = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data: pending, error: queryError } = await supabase
        .from('sc_sync_queue')
        .select('*')
        .eq('school_id', schoolId)
        .eq('synced', false);

      if (queryError) throw queryError;

      const items = (pending ?? []) as SyncItem[];
      for (const item of items) {
        await supabase
          .from('sc_sync_queue')
          .update({ synced: true })
          .eq('id', item.id);
      }

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getPending = useCallback(async (): Promise<SyncItem[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_sync_queue')
        .select('*')
        .eq('school_id', schoolId)
        .eq('synced', false);

      if (queryError) throw queryError;
      return (data ?? []) as SyncItem[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getConflicts = useCallback(async (): Promise<SyncConflict[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_sync_conflicts')
        .select('*')
        .eq('school_id', schoolId);

      if (queryError) throw queryError;
      return (data ?? []) as SyncConflict[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, sync, getPending, getConflicts };
};
