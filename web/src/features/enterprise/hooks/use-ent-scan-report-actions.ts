'use client';

import { useState, useCallback } from 'react';
import { EntScanReportService } from '../services/scan-report.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanReport, ScanReportCreate } from '@educi/types';

export const useEntScanReportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanReportCreate): Promise<ScanReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanReportService(supabase);
      return await service.createScanReport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanReportCreate>): Promise<ScanReport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanReportService(supabase);
      return await service.updateScanReport(schoolId, id, data);
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
      const service = new EntScanReportService(supabase);
      await service.deleteScanReport(schoolId, id);
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
