'use client';

import { useState, useCallback } from 'react';
import { EntCacheInvalidateService } from '../services/cache-invalidate.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheInvalidate, CacheInvalidateCreate } from '@educi/types';

export const useEntCacheInvalidateActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheInvalidateCreate): Promise<CacheInvalidate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheInvalidateService(supabase);
      return await service.createCacheInvalidate(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheInvalidateCreate>): Promise<CacheInvalidate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheInvalidateService(supabase);
      return await service.updateCacheInvalidate(schoolId, id, data);
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
      const service = new EntCacheInvalidateService(supabase);
      await service.deleteCacheInvalidate(schoolId, id);
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
