'use client';
import { useState, useCallback } from 'react';
import { GovAnalyticsService } from '../services/gov-predictive-analytic.service';
import { createClient } from '@/lib/supabase/client';

export const useGovPredictiveAnalytics = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  const execute = useCallback(async (params?: Record<string, unknown>) => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const service = new GovAnalyticsService(supabase);
      const result = await service.runPredictiveAnalytics(schoolId, params);
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, data, execute };
};
