'use client';

import { useState, useCallback } from 'react';
import { EntCacheKeyService } from '../services/cache-key.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheKey, CacheKeyCreate } from '@educi/types';

export const useEntCacheKeyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheKeyCreate): Promise<CacheKey | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheKeyService(supabase);
      return await service.createCacheKey(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheKeyCreate>): Promise<CacheKey | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheKeyService(supabase);
      return await service.updateCacheKey(schoolId, id, data);
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
      const service = new EntCacheKeyService(supabase);
      await service.deleteCacheKey(schoolId, id);
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
