'use client';

import { useState, useCallback } from 'react';
import { EntScanComplianceService } from '../services/scan-compliance.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanCompliance, ScanComplianceCreate } from '@educi/types';

export const useEntScanComplianceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanComplianceCreate): Promise<ScanCompliance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanComplianceService(supabase);
      return await service.createScanCompliance(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanComplianceCreate>): Promise<ScanCompliance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanComplianceService(supabase);
      return await service.updateScanCompliance(schoolId, id, data);
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
      const service = new EntScanComplianceService(supabase);
      await service.deleteScanCompliance(schoolId, id);
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
