'use client';

import { useState, useCallback } from 'react';
import { EntScanDependencyService } from '../services/scan-dependency.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanDependency, ScanDependencyCreate } from '@educi/types';

export const useEntScanDependencyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanDependencyCreate): Promise<ScanDependency | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanDependencyService(supabase);
      return await service.createScanDependency(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanDependencyCreate>): Promise<ScanDependency | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanDependencyService(supabase);
      return await service.updateScanDependency(schoolId, id, data);
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
      const service = new EntScanDependencyService(supabase);
      await service.deleteScanDependency(schoolId, id);
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
