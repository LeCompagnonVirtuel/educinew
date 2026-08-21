'use client';

import { useState, useCallback } from 'react';
import { EntPlatformLTVService } from '../services/platform-ltv.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformLTV, PlatformLTVCreate } from '@educi/types';

export const useEntPlatformLTVActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformLTVCreate): Promise<PlatformLTV | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformLTVService(supabase);
      return await service.createPlatformLTV(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformLTVCreate>): Promise<PlatformLTV | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformLTVService(supabase);
      return await service.updatePlatformLTV(schoolId, id, data);
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
      const service = new EntPlatformLTVService(supabase);
      await service.deletePlatformLTV(schoolId, id);
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
