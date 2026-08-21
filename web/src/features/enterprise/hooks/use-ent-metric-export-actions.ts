'use client';

import { useState, useCallback } from 'react';
import { EntMetricExportService } from '../services/metric-export.service';
import { createClient } from '@/lib/supabase/client';
import type { MetricExport, MetricExportCreate } from '@educi/types';

export const useEntMetricExportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MetricExportCreate): Promise<MetricExport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricExportService(supabase);
      return await service.createMetricExport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MetricExportCreate>): Promise<MetricExport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricExportService(supabase);
      return await service.updateMetricExport(schoolId, id, data);
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
      const service = new EntMetricExportService(supabase);
      await service.deleteMetricExport(schoolId, id);
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
