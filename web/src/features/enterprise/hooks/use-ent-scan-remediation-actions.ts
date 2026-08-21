'use client';

import { useState, useCallback } from 'react';
import { EntScanRemediationService } from '../services/scan-remediation.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanRemediation, ScanRemediationCreate } from '@educi/types';

export const useEntScanRemediationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanRemediationCreate): Promise<ScanRemediation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanRemediationService(supabase);
      return await service.createScanRemediation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanRemediationCreate>): Promise<ScanRemediation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanRemediationService(supabase);
      return await service.updateScanRemediation(schoolId, id, data);
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
      const service = new EntScanRemediationService(supabase);
      await service.deleteScanRemediation(schoolId, id);
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
