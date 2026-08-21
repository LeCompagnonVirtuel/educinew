'use client';

import { useState, useCallback } from 'react';
import { EntScanBaselineService } from '../services/scan-baseline.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanBaseline, ScanBaselineCreate } from '@educi/types';

export const useEntScanBaselineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanBaselineCreate): Promise<ScanBaseline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanBaselineService(supabase);
      return await service.createScanBaseline(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanBaselineCreate>): Promise<ScanBaseline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanBaselineService(supabase);
      return await service.updateScanBaseline(schoolId, id, data);
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
      const service = new EntScanBaselineService(supabase);
      await service.deleteScanBaseline(schoolId, id);
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
