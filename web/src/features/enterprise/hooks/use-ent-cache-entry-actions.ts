'use client';

import { useState, useCallback } from 'react';
import { EntCacheEntryService } from '../services/cache-entry.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheEntry, CacheEntryCreate } from '@educi/types';

export const useEntCacheEntryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheEntryCreate): Promise<CacheEntry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheEntryService(supabase);
      return await service.createCacheEntry(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheEntryCreate>): Promise<CacheEntry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheEntryService(supabase);
      return await service.updateCacheEntry(schoolId, id, data);
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
      const service = new EntCacheEntryService(supabase);
      await service.deleteCacheEntry(schoolId, id);
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
