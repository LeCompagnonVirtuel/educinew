'use client';

import { useState, useCallback } from 'react';
import { EntMetricWidgetService } from '../services/metric-widget.service';
import { createClient } from '@/lib/supabase/client';
import type { MetricWidget, MetricWidgetCreate } from '@educi/types';

export const useEntMetricWidgetActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MetricWidgetCreate): Promise<MetricWidget | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricWidgetService(supabase);
      return await service.createMetricWidget(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MetricWidgetCreate>): Promise<MetricWidget | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricWidgetService(supabase);
      return await service.updateMetricWidget(schoolId, id, data);
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
      const service = new EntMetricWidgetService(supabase);
      await service.deleteMetricWidget(schoolId, id);
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
