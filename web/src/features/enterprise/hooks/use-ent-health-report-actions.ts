'use client';

import { useState, useCallback } from 'react';
import { EntHealthReportService } from '../services/health-report.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthReport, HealthReportCreate } from '@educi/types';

export const useEntHealthReportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: HealthReportCreate): Promise<HealthReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthReportService(supabase);
      return await service.createHealthReport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<HealthReportCreate>): Promise<HealthReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthReportService(supabase);
      return await service.updateHealthReport(schoolId, id, data);
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
      const service = new EntHealthReportService(supabase);
      await service.deleteHealthReport(schoolId, id);
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
