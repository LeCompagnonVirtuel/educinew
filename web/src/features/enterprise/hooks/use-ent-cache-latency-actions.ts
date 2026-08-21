'use client';

import { useState, useCallback } from 'react';
import { EntCacheLatencyService } from '../services/cache-latency.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheLatency, CacheLatencyCreate } from '@educi/types';

export const useEntCacheLatencyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheLatencyCreate): Promise<CacheLatency | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheLatencyService(supabase);
      return await service.createCacheLatency(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheLatencyCreate>): Promise<CacheLatency | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheLatencyService(supabase);
      return await service.updateCacheLatency(schoolId, id, data);
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
      const service = new EntCacheLatencyService(supabase);
      await service.deleteCacheLatency(schoolId, id);
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
