'use client';

import { useState, useCallback } from 'react';
import { EntScanResultService } from '../services/scan-result.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanResult, ScanResultCreate } from '@educi/types';

export const useEntScanResultActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanResultCreate): Promise<ScanResult | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanResultService(supabase);
      return await service.createScanResult(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanResultCreate>): Promise<ScanResult | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanResultService(supabase);
      return await service.updateScanResult(schoolId, id, data);
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
      const service = new EntScanResultService(supabase);
      await service.deleteScanResult(schoolId, id);
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
