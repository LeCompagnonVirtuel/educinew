'use client';

import { useState, useCallback } from 'react';
import { EntLogReportService } from '../services/log-report.service';
import { createClient } from '@/lib/supabase/client';
import type { LogReport, LogReportCreate } from '@educi/types';

export const useEntLogReportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogReportCreate): Promise<LogReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogReportService(supabase);
      return await service.createLogReport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogReportCreate>): Promise<LogReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogReportService(supabase);
      return await service.updateLogReport(schoolId, id, data);
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
      const service = new EntLogReportService(supabase);
      await service.deleteLogReport(schoolId, id);
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
