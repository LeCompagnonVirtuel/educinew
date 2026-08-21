'use client';

import { useState, useCallback } from 'react';
import { EntCacheReplicationService } from '../services/cache-replication.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheReplication, CacheReplicationCreate } from '@educi/types';

export const useEntCacheReplicationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheReplicationCreate): Promise<CacheReplication | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheReplicationService(supabase);
      return await service.createCacheReplication(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheReplicationCreate>): Promise<CacheReplication | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheReplicationService(supabase);
      return await service.updateCacheReplication(schoolId, id, data);
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
      const service = new EntCacheReplicationService(supabase);
      await service.deleteCacheReplication(schoolId, id);
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
