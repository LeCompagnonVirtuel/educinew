'use client';

import { useState, useCallback } from 'react';
import { EntCachePartitionService } from '../services/cache-partition.service';
import { createClient } from '@/lib/supabase/client';
import type { CachePartition, CachePartitionCreate } from '@educi/types';

export const useEntCachePartitionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CachePartitionCreate): Promise<CachePartition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCachePartitionService(supabase);
      return await service.createCachePartition(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CachePartitionCreate>): Promise<CachePartition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCachePartitionService(supabase);
      return await service.updateCachePartition(schoolId, id, data);
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
      const service = new EntCachePartitionService(supabase);
      await service.deleteCachePartition(schoolId, id);
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
