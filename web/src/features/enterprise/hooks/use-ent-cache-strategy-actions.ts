'use client';

import { useState, useCallback } from 'react';
import { EntCacheStrategyService } from '../services/cache-strategy.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheStrategy, CacheStrategyCreate } from '@educi/types';

export const useEntCacheStrategyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheStrategyCreate): Promise<CacheStrategy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheStrategyService(supabase);
      return await service.createCacheStrategy(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheStrategyCreate>): Promise<CacheStrategy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheStrategyService(supabase);
      return await service.updateCacheStrategy(schoolId, id, data);
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
      const service = new EntCacheStrategyService(supabase);
      await service.deleteCacheStrategy(schoolId, id);
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
