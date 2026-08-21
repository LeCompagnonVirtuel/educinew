'use client';

import { useState, useCallback } from 'react';
import { EduOSDataQualityReportService } from '../services/eduos-data-quality-report.service';
import { createClient } from '@/lib/supabase/client';
import type { DataQualityReport } from '@educi/types';

export const useEduOSDataQualityReportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataQualityReport): Promise<DataQualityReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataQualityReportService(supabase);
      return await service.createDataQualityReport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataQualityReport>): Promise<DataQualityReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataQualityReportService(supabase);
      return await service.updateDataQualityReport(schoolId, id, data);
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
      const service = new EduOSDataQualityReportService(supabase);
      await service.deleteDataQualityReport(schoolId, id);
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