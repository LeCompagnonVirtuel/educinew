'use client';

import { useState, useCallback } from 'react';
import { EntCacheMissService } from '../services/cache-miss.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheMiss, CacheMissCreate } from '@educi/types';

export const useEntCacheMissActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheMissCreate): Promise<CacheMiss | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheMissService(supabase);
      return await service.createCacheMiss(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheMissCreate>): Promise<CacheMiss | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheMissService(supabase);
      return await service.updateCacheMiss(schoolId, id, data);
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
      const service = new EntCacheMissService(supabase);
      await service.deleteCacheMiss(schoolId, id);
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
