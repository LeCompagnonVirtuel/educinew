'use client';

import { useState, useCallback } from 'react';
import { EntCacheClusterService } from '../services/cache-cluster.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheCluster, CacheClusterCreate } from '@educi/types';

export const useEntCacheClusterActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheClusterCreate): Promise<CacheCluster | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheClusterService(supabase);
      return await service.createCacheCluster(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheClusterCreate>): Promise<CacheCluster | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheClusterService(supabase);
      return await service.updateCacheCluster(schoolId, id, data);
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
      const service = new EntCacheClusterService(supabase);
      await service.deleteCacheCluster(schoolId, id);
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
