'use client';

import { useState, useCallback } from 'react';
import { EntScanSecretService } from '../services/scan-secret.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanSecret, ScanSecretCreate } from '@educi/types';

export const useEntScanSecretActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanSecretCreate): Promise<ScanSecret | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanSecretService(supabase);
      return await service.createScanSecret(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanSecretCreate>): Promise<ScanSecret | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanSecretService(supabase);
      return await service.updateScanSecret(schoolId, id, data);
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
      const service = new EntScanSecretService(supabase);
      await service.deleteScanSecret(schoolId, id);
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
