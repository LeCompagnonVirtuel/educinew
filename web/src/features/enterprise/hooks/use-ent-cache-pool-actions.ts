'use client';

import { useState, useCallback } from 'react';
import { EntCachePoolService } from '../services/cache-pool.service';
import { createClient } from '@/lib/supabase/client';
import type { CachePool, CachePoolCreate } from '@educi/types';

export const useEntCachePoolActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CachePoolCreate): Promise<CachePool | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCachePoolService(supabase);
      return await service.createCachePool(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CachePoolCreate>): Promise<CachePool | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCachePoolService(supabase);
      return await service.updateCachePool(schoolId, id, data);
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
      const service = new EntCachePoolService(supabase);
      await service.deleteCachePool(schoolId, id);
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
