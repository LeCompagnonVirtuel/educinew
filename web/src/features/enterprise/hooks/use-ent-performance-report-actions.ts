'use client';

import { useState, useCallback } from 'react';
import { EntPerformanceReportService } from '../services/performance-report.service';
import { createClient } from '@/lib/supabase/client';
import type { PerformanceReport, PerformanceReportCreate } from '@educi/types';

export const useEntPerformanceReportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PerformanceReportCreate): Promise<PerformanceReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPerformanceReportService(supabase);
      return await service.createPerformanceReport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PerformanceReportCreate>): Promise<PerformanceReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPerformanceReportService(supabase);
      return await service.updatePerformanceReport(schoolId, id, data);
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
      const service = new EntPerformanceReportService(supabase);
      await service.deletePerformanceReport(schoolId, id);
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
