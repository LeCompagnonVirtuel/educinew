'use client';

import { useState, useCallback } from 'react';
import { EntCacheNodeService } from '../services/cache-node.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheNode, CacheNodeCreate } from '@educi/types';

export const useEntCacheNodeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheNodeCreate): Promise<CacheNode | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheNodeService(supabase);
      return await service.createCacheNode(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheNodeCreate>): Promise<CacheNode | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheNodeService(supabase);
      return await service.updateCacheNode(schoolId, id, data);
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
      const service = new EntCacheNodeService(supabase);
      await service.deleteCacheNode(schoolId, id);
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
