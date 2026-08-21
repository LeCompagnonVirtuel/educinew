'use client';

import { useState, useCallback } from 'react';
import { EntPipelineReportService } from '../services/pipeline-report.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineReport, PipelineReportCreate } from '@educi/types';

export const useEntPipelineReportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineReportCreate): Promise<PipelineReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineReportService(supabase);
      return await service.createPipelineReport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineReportCreate>): Promise<PipelineReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineReportService(supabase);
      return await service.updatePipelineReport(schoolId, id, data);
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
      const service = new EntPipelineReportService(supabase);
      await service.deletePipelineReport(schoolId, id);
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
