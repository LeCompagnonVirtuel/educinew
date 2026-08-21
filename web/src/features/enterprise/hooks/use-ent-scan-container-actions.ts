'use client';

import { useState, useCallback } from 'react';
import { EntScanContainerService } from '../services/scan-container.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanContainer, ScanContainerCreate } from '@educi/types';

export const useEntScanContainerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanContainerCreate): Promise<ScanContainer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanContainerService(supabase);
      return await service.createScanContainer(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanContainerCreate>): Promise<ScanContainer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanContainerService(supabase);
      return await service.updateScanContainer(schoolId, id, data);
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
      const service = new EntScanContainerService(supabase);
      await service.deleteScanContainer(schoolId, id);
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
