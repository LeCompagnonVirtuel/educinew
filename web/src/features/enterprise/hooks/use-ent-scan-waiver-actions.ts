'use client';

import { useState, useCallback } from 'react';
import { EntScanWaiverService } from '../services/scan-waiver.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanWaiver, ScanWaiverCreate } from '@educi/types';

export const useEntScanWaiverActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanWaiverCreate): Promise<ScanWaiver | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanWaiverService(supabase);
      return await service.createScanWaiver(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanWaiverCreate>): Promise<ScanWaiver | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanWaiverService(supabase);
      return await service.updateScanWaiver(schoolId, id, data);
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
      const service = new EntScanWaiverService(supabase);
      await service.deleteScanWaiver(schoolId, id);
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
