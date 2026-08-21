'use client';

import { useState, useCallback } from 'react';
import { EntCacheTagService } from '../services/cache-tag.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheTag, CacheTagCreate } from '@educi/types';

export const useEntCacheTagActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheTagCreate): Promise<CacheTag | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheTagService(supabase);
      return await service.createCacheTag(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheTagCreate>): Promise<CacheTag | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheTagService(supabase);
      return await service.updateCacheTag(schoolId, id, data);
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
      const service = new EntCacheTagService(supabase);
      await service.deleteCacheTag(schoolId, id);
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
