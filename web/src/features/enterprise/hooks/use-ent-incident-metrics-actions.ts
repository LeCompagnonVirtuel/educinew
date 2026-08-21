'use client';

import { useState, useCallback } from 'react';
import { EntIncidentMetricsService } from '../services/incident-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentMetrics, IncidentMetricsCreate } from '@educi/types';

export const useEntIncidentMetricsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentMetricsCreate): Promise<IncidentMetrics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentMetricsService(supabase);
      return await service.createIncidentMetrics(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentMetricsCreate>): Promise<IncidentMetrics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentMetricsService(supabase);
      return await service.updateIncidentMetrics(schoolId, id, data);
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
      const service = new EntIncidentMetricsService(supabase);
      await service.deleteIncidentMetrics(schoolId, id);
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
