'use client';

import { useState, useCallback } from 'react';
import { EntScanTargetService } from '../services/scan-target.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanTarget, ScanTargetCreate } from '@educi/types';

export const useEntScanTargetActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanTargetCreate): Promise<ScanTarget | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanTargetService(supabase);
      return await service.createScanTarget(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanTargetCreate>): Promise<ScanTarget | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanTargetService(supabase);
      return await service.updateScanTarget(schoolId, id, data);
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
      const service = new EntScanTargetService(supabase);
      await service.deleteScanTarget(schoolId, id);
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
