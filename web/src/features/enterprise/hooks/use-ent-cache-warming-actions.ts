'use client';

import { useState, useCallback } from 'react';
import { EntCacheWarmingService } from '../services/cache-warming.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheWarming, CacheWarmingCreate } from '@educi/types';

export const useEntCacheWarmingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheWarmingCreate): Promise<CacheWarming | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheWarmingService(supabase);
      return await service.createCacheWarming(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheWarmingCreate>): Promise<CacheWarming | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheWarmingService(supabase);
      return await service.updateCacheWarming(schoolId, id, data);
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
      const service = new EntCacheWarmingService(supabase);
      await service.deleteCacheWarming(schoolId, id);
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
