'use client';

import { useState, useCallback } from 'react';
import { IntAnalyticsReportService } from '../services/int-analytics-report.service';
import { createClient } from '@/lib/supabase/client';
import type { AnalyticsReport, AnalyticsReportCreate } from '@educi/types';

export const useIntAnalyticsReportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AnalyticsReportCreate): Promise<AnalyticsReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntAnalyticsReportService(supabase);
      return await service.createAnalyticsReport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AnalyticsReportCreate>): Promise<AnalyticsReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntAnalyticsReportService(supabase);
      return await service.updateAnalyticsReport(schoolId, id, data);
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
      const service = new IntAnalyticsReportService(supabase);
      await service.deleteAnalyticsReport(schoolId, id);
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