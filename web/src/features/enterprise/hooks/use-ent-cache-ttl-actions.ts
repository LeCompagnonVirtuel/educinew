'use client';

import { useState, useCallback } from 'react';
import { EntCacheTTLService } from '../services/cache-ttl.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheTTL, CacheTTLCreate } from '@educi/types';

export const useEntCacheTTLActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheTTLCreate): Promise<CacheTTL | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheTTLService(supabase);
      return await service.createCacheTTL(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheTTLCreate>): Promise<CacheTTL | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheTTLService(supabase);
      return await service.updateCacheTTL(schoolId, id, data);
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
      const service = new EntCacheTTLService(supabase);
      await service.deleteCacheTTL(schoolId, id);
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
