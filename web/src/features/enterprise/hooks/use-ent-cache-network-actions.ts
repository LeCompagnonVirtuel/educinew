'use client';

import { useState, useCallback } from 'react';
import { EntCacheNetworkService } from '../services/cache-network.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheNetwork, CacheNetworkCreate } from '@educi/types';

export const useEntCacheNetworkActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheNetworkCreate): Promise<CacheNetwork | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheNetworkService(supabase);
      return await service.createCacheNetwork(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheNetworkCreate>): Promise<CacheNetwork | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheNetworkService(supabase);
      return await service.updateCacheNetwork(schoolId, id, data);
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
      const service = new EntCacheNetworkService(supabase);
      await service.deleteCacheNetwork(schoolId, id);
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
