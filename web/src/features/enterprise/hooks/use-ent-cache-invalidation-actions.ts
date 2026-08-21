'use client';

import { useState, useCallback } from 'react';
import { EntCacheInvalidationService } from '../services/cache-invalidation.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheInvalidation, CacheInvalidationCreate } from '@educi/types';

export const useEntCacheInvalidationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheInvalidationCreate): Promise<CacheInvalidation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheInvalidationService(supabase);
      return await service.createCacheInvalidation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheInvalidationCreate>): Promise<CacheInvalidation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheInvalidationService(supabase);
      return await service.updateCacheInvalidation(schoolId, id, data);
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
      const service = new EntCacheInvalidationService(supabase);
      await service.deleteCacheInvalidation(schoolId, id);
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
