'use client';

import { useState, useCallback } from 'react';
import { EntIndexSnapshotService } from '../services/index-snapshot.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexSnapshot, IndexSnapshotCreate } from '@educi/types';

export const useEntIndexSnapshotActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IndexSnapshotCreate): Promise<IndexSnapshot | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexSnapshotService(supabase);
      return await service.createIndexSnapshot(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IndexSnapshotCreate>): Promise<IndexSnapshot | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexSnapshotService(supabase);
      return await service.updateIndexSnapshot(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexSnapshotService(supabase);
      await service.deleteIndexSnapshot(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
