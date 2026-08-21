'use client';

import { useState, useCallback } from 'react';
import { EntScanLicenseService } from '../services/scan-license.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanLicense, ScanLicenseCreate } from '@educi/types';

export const useEntScanLicenseActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanLicenseCreate): Promise<ScanLicense | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanLicenseService(supabase);
      return await service.createScanLicense(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanLicenseCreate>): Promise<ScanLicense | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanLicenseService(supabase);
      return await service.updateScanLicense(schoolId, id, data);
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
      const service = new EntScanLicenseService(supabase);
      await service.deleteScanLicense(schoolId, id);
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
