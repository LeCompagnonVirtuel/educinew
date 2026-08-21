'use client';

import { useState, useCallback } from 'react';
import { EntScanTrendService } from '../services/scan-trend.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanTrend, ScanTrendCreate } from '@educi/types';

export const useEntScanTrendActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanTrendCreate): Promise<ScanTrend | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanTrendService(supabase);
      return await service.createScanTrend(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanTrendCreate>): Promise<ScanTrend | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanTrendService(supabase);
      return await service.updateScanTrend(schoolId, id, data);
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
      const service = new EntScanTrendService(supabase);
      await service.deleteScanTrend(schoolId, id);
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
