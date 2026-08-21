'use client';

import { useState, useCallback } from 'react';
import { EntScanFindingService } from '../services/scan-finding.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanFinding, ScanFindingCreate } from '@educi/types';

export const useEntScanFindingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanFindingCreate): Promise<ScanFinding | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanFindingService(supabase);
      return await service.createScanFinding(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanFindingCreate>): Promise<ScanFinding | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanFindingService(supabase);
      return await service.updateScanFinding(schoolId, id, data);
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
      const service = new EntScanFindingService(supabase);
      await service.deleteScanFinding(schoolId, id);
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
