'use client';

import { useState, useCallback } from 'react';
import { EntIndexManagerService } from '../services/index-manager.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexManager, IndexManagerCreate } from '@educi/types';

export const useEntIndexManagerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IndexManagerCreate): Promise<IndexManager | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexManagerService(supabase);
      return await service.createIndexManager(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IndexManagerCreate>): Promise<IndexManager | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexManagerService(supabase);
      return await service.updateIndexManager(schoolId, id, data);
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
      const service = new EntIndexManagerService(supabase);
      await service.deleteIndexManager(schoolId, id);
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
