'use client';

import { useState, useCallback } from 'react';
import { EntCacheRegionService } from '../services/cache-region.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheRegion, CacheRegionCreate } from '@educi/types';

export const useEntCacheRegionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheRegionCreate): Promise<CacheRegion | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheRegionService(supabase);
      return await service.createCacheRegion(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheRegionCreate>): Promise<CacheRegion | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheRegionService(supabase);
      return await service.updateCacheRegion(schoolId, id, data);
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
      const service = new EntCacheRegionService(supabase);
      await service.deleteCacheRegion(schoolId, id);
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
