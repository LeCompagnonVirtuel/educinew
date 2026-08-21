'use client';

import { useState, useCallback } from 'react';
import { EntPlatformChartService } from '../services/platform-chart.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformChart, PlatformChartCreate } from '@educi/types';

export const useEntPlatformChartActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformChartCreate): Promise<PlatformChart | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformChartService(supabase);
      return await service.createPlatformChart(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformChartCreate>): Promise<PlatformChart | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformChartService(supabase);
      return await service.updatePlatformChart(schoolId, id, data);
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
      const service = new EntPlatformChartService(supabase);
      await service.deletePlatformChart(schoolId, id);
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
