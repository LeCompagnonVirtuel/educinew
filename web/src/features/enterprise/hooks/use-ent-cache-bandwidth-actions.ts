'use client';

import { useState, useCallback } from 'react';
import { EntCacheBandwidthService } from '../services/cache-bandwidth.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheBandwidth, CacheBandwidthCreate } from '@educi/types';

export const useEntCacheBandwidthActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CacheBandwidthCreate): Promise<CacheBandwidth | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheBandwidthService(supabase);
      return await service.createCacheBandwidth(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CacheBandwidthCreate>): Promise<CacheBandwidth | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheBandwidthService(supabase);
      return await service.updateCacheBandwidth(schoolId, id, data);
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
      const service = new EntCacheBandwidthService(supabase);
      await service.deleteCacheBandwidth(schoolId, id);
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
