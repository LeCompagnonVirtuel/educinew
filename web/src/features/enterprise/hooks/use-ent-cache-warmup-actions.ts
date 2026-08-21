'use client';

import { useState, useCallback } from 'react';
import { EntCacheWarmupService } from '../services/cache-warmup.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheWarmup, CacheWarmupCreate } from '@educi/types';

export const useEntCacheWarmupActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheWarmupCreate): Promise<CacheWarmup | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheWarmupService(supabase);
      return await service.createCacheWarmup(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheWarmupCreate>): Promise<CacheWarmup | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheWarmupService(supabase);
      return await service.updateCacheWarmup(schoolId, id, data);
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
      const service = new EntCacheWarmupService(supabase);
      await service.deleteCacheWarmup(schoolId, id);
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
