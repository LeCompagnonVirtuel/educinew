'use client';

import { useState, useCallback } from 'react';
import { EntCacheLayerService } from '../services/cache-layer.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheLayer, CacheLayerCreate } from '@educi/types';

export const useEntCacheLayerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheLayerCreate): Promise<CacheLayer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheLayerService(supabase);
      return await service.createCacheLayer(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheLayerCreate>): Promise<CacheLayer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheLayerService(supabase);
      return await service.updateCacheLayer(schoolId, id, data);
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
      const service = new EntCacheLayerService(supabase);
      await service.deleteCacheLayer(schoolId, id);
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
