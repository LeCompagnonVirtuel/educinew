'use client';

import { useState, useCallback } from 'react';
import { EntPlatformTrendService } from '../services/platform-trend.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformTrend, PlatformTrendCreate } from '@educi/types';

export const useEntPlatformTrendActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformTrendCreate): Promise<PlatformTrend | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformTrendService(supabase);
      return await service.createPlatformTrend(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformTrendCreate>): Promise<PlatformTrend | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformTrendService(supabase);
      return await service.updatePlatformTrend(schoolId, id, data);
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
      const service = new EntPlatformTrendService(supabase);
      await service.deletePlatformTrend(schoolId, id);
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
