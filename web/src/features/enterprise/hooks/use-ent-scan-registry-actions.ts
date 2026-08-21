'use client';

import { useState, useCallback } from 'react';
import { EntScanRegistryService } from '../services/scan-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanRegistry, ScanRegistryCreate } from '@educi/types';

export const useEntScanRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanRegistryCreate): Promise<ScanRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanRegistryService(supabase);
      return await service.createScanRegistry(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanRegistryCreate>): Promise<ScanRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanRegistryService(supabase);
      return await service.updateScanRegistry(schoolId, id, data);
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
      const service = new EntScanRegistryService(supabase);
      await service.deleteScanRegistry(schoolId, id);
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
