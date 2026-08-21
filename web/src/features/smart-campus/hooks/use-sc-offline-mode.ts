'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface SyncStatus {
  isOnline: boolean;
  lastSync: string | null;
  pendingChanges: number;
}

export const useScOfflineMode = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    lastSync: null,
    pendingChanges: 0,
  });

  const goOnline = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data: pending, error: queryError } = await supabase
        .from('sc_sync_queue')
        .select('id')
        .eq('school_id', schoolId)
        .eq('synced', false);

      if (queryError) throw queryError;

      setSyncStatus({
        isOnline: true,
        lastSync: new Date().toISOString(),
        pendingChanges: (pending ?? []).length,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const goOffline = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setSyncStatus((prev) => ({ ...prev, isOnline: false }));
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSyncStatus = useCallback(async (): Promise<SyncStatus> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data: pending, error: queryError } = await supabase
        .from('sc_sync_queue')
        .select('id')
        .eq('school_id', schoolId)
        .eq('synced', false);

      if (queryError) throw queryError;

      const status: SyncStatus = {
        isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
        lastSync: syncStatus.lastSync,
        pendingChanges: (pending ?? []).length,
      };
      setSyncStatus(status);
      return status;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return syncStatus;
    } finally {
      setLoading(false);
    }
  }, [schoolId, syncStatus.lastSync]);

  return { loading, error, syncStatus, goOnline, goOffline, getSyncStatus };
};
