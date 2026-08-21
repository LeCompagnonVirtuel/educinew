'use client';

import { useState, useCallback } from 'react';
import { EntCacheSizeService } from '../services/cache-size.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheSize, CacheSizeCreate } from '@educi/types';

export const useEntCacheSizeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheSizeCreate): Promise<CacheSize | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheSizeService(supabase);
      return await service.createCacheSize(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheSizeCreate>): Promise<CacheSize | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheSizeService(supabase);
      return await service.updateCacheSize(schoolId, id, data);
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
      const service = new EntCacheSizeService(supabase);
      await service.deleteCacheSize(schoolId, id);
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
