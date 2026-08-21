'use client';

import { useState, useCallback } from 'react';
import { EntCachePrewarmService } from '../services/cache-prewarm.service';
import { createClient } from '@/lib/supabase/client';
import type { CachePrewarm, CachePrewarmCreate } from '@educi/types';

export const useEntCachePrewarmActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CachePrewarmCreate): Promise<CachePrewarm | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCachePrewarmService(supabase);
      return await service.createCachePrewarm(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CachePrewarmCreate>): Promise<CachePrewarm | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCachePrewarmService(supabase);
      return await service.updateCachePrewarm(schoolId, id, data);
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
      const service = new EntCachePrewarmService(supabase);
      await service.deleteCachePrewarm(schoolId, id);
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
