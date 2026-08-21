'use client';

import { useState, useCallback } from 'react';
import { EntPlatformMetricsService } from '../services/platform-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformMetrics, PlatformMetricsCreate } from '@educi/types';

export const useEntPlatformMetricsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformMetricsCreate): Promise<PlatformMetrics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformMetricsService(supabase);
      return await service.createPlatformMetrics(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformMetricsCreate>): Promise<PlatformMetrics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformMetricsService(supabase);
      return await service.updatePlatformMetrics(schoolId, id, data);
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
      const service = new EntPlatformMetricsService(supabase);
      await service.deletePlatformMetrics(schoolId, id);
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
