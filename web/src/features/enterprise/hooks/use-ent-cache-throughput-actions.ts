'use client';

import { useState, useCallback } from 'react';
import { EntCacheThroughputService } from '../services/cache-throughput.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheThroughput, CacheThroughputCreate } from '@educi/types';

export const useEntCacheThroughputActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheThroughputCreate): Promise<CacheThroughput | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheThroughputService(supabase);
      return await service.createCacheThroughput(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheThroughputCreate>): Promise<CacheThroughput | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheThroughputService(supabase);
      return await service.updateCacheThroughput(schoolId, id, data);
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
      const service = new EntCacheThroughputService(supabase);
      await service.deleteCacheThroughput(schoolId, id);
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
