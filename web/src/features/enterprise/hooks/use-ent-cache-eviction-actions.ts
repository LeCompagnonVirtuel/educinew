'use client';

import { useState, useCallback } from 'react';
import { EntCacheEvictionService } from '../services/cache-eviction.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheEviction, CacheEvictionCreate } from '@educi/types';

export const useEntCacheEvictionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheEvictionCreate): Promise<CacheEviction | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheEvictionService(supabase);
      return await service.createCacheEviction(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheEvictionCreate>): Promise<CacheEviction | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheEvictionService(supabase);
      return await service.updateCacheEviction(schoolId, id, data);
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
      const service = new EntCacheEvictionService(supabase);
      await service.deleteCacheEviction(schoolId, id);
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
