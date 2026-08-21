'use client';

import { useState, useCallback } from 'react';
import { EntCacheConnectionService } from '../services/cache-connection.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheConnection, CacheConnectionCreate } from '@educi/types';

export const useEntCacheConnectionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheConnectionCreate): Promise<CacheConnection | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheConnectionService(supabase);
      return await service.createCacheConnection(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheConnectionCreate>): Promise<CacheConnection | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheConnectionService(supabase);
      return await service.updateCacheConnection(schoolId, id, data);
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
      const service = new EntCacheConnectionService(supabase);
      await service.deleteCacheConnection(schoolId, id);
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
