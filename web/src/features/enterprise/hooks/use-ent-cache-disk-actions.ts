'use client';

import { useState, useCallback } from 'react';
import { EntCacheDiskService } from '../services/cache-disk.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheDisk, CacheDiskCreate } from '@educi/types';

export const useEntCacheDiskActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheDiskCreate): Promise<CacheDisk | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheDiskService(supabase);
      return await service.createCacheDisk(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheDiskCreate>): Promise<CacheDisk | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheDiskService(supabase);
      return await service.updateCacheDisk(schoolId, id, data);
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
      const service = new EntCacheDiskService(supabase);
      await service.deleteCacheDisk(schoolId, id);
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
