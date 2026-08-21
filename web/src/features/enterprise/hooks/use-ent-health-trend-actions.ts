'use client';

import { useState, useCallback } from 'react';
import { EntHealthTrendService } from '../services/health-trend.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthTrend, HealthTrendCreate } from '@educi/types';

export const useEntHealthTrendActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: HealthTrendCreate): Promise<HealthTrend | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthTrendService(supabase);
      return await service.createHealthTrend(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<HealthTrendCreate>): Promise<HealthTrend | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthTrendService(supabase);
      return await service.updateHealthTrend(schoolId, id, data);
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
      const service = new EntHealthTrendService(supabase);
      await service.deleteHealthTrend(schoolId, id);
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
