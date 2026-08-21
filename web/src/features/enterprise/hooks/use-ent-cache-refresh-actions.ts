'use client';

import { useState, useCallback } from 'react';
import { EntCacheRefreshService } from '../services/cache-refresh.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheRefresh, CacheRefreshCreate } from '@educi/types';

export const useEntCacheRefreshActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheRefreshCreate): Promise<CacheRefresh | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheRefreshService(supabase);
      return await service.createCacheRefresh(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheRefreshCreate>): Promise<CacheRefresh | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheRefreshService(supabase);
      return await service.updateCacheRefresh(schoolId, id, data);
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
      const service = new EntCacheRefreshService(supabase);
      await service.deleteCacheRefresh(schoolId, id);
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
