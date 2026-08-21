'use client';

import { useState, useCallback } from 'react';
import { EntScanExceptionService } from '../services/scan-exception.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanException, ScanExceptionCreate } from '@educi/types';

export const useEntScanExceptionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanExceptionCreate): Promise<ScanException | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanExceptionService(supabase);
      return await service.createScanException(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanExceptionCreate>): Promise<ScanException | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanExceptionService(supabase);
      return await service.updateScanException(schoolId, id, data);
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
      const service = new EntScanExceptionService(supabase);
      await service.deleteScanException(schoolId, id);
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
