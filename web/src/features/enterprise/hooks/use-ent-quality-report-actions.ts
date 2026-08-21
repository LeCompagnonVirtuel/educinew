'use client';

import { useState, useCallback } from 'react';
import { EntQualityReportService } from '../services/quality-report.service';
import { createClient } from '@/lib/supabase/client';
import type { QualityReport, QualityReportCreate } from '@educi/types';

export const useEntQualityReportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: QualityReportCreate): Promise<QualityReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntQualityReportService(supabase);
      return await service.createQualityReport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<QualityReportCreate>): Promise<QualityReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntQualityReportService(supabase);
      return await service.updateQualityReport(schoolId, id, data);
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
      const service = new EntQualityReportService(supabase);
      await service.deleteQualityReport(schoolId, id);
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
