'use client';

import { useState, useCallback } from 'react';
import { EntCacheMetricsService } from '../services/cache-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheMetrics, CacheMetricsCreate } from '@educi/types';

export const useEntCacheMetricsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheMetricsCreate): Promise<CacheMetrics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheMetricsService(supabase);
      return await service.createCacheMetrics(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheMetricsCreate>): Promise<CacheMetrics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheMetricsService(supabase);
      return await service.updateCacheMetrics(schoolId, id, data);
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
      const service = new EntCacheMetricsService(supabase);
      await service.deleteCacheMetrics(schoolId, id);
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
