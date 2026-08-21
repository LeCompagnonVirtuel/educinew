'use client';

import { useState, useCallback } from 'react';
import { EntScanPolicyService } from '../services/scan-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanPolicy, ScanPolicyCreate } from '@educi/types';

export const useEntScanPolicyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanPolicyCreate): Promise<ScanPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanPolicyService(supabase);
      return await service.createScanPolicy(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanPolicyCreate>): Promise<ScanPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanPolicyService(supabase);
      return await service.updateScanPolicy(schoolId, id, data);
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
      const service = new EntScanPolicyService(supabase);
      await service.deleteScanPolicy(schoolId, id);
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
