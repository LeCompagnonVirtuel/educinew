'use client';

import { useState, useCallback } from 'react';
import { EntPlatformReportService } from '../services/platform-report.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformReport, PlatformReportCreate } from '@educi/types';

export const useEntPlatformReportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformReportCreate): Promise<PlatformReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformReportService(supabase);
      return await service.createPlatformReport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformReportCreate>): Promise<PlatformReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformReportService(supabase);
      return await service.updatePlatformReport(schoolId, id, data);
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
      const service = new EntPlatformReportService(supabase);
      await service.deletePlatformReport(schoolId, id);
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
