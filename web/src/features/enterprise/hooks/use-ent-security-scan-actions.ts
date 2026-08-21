'use client';

import { useState, useCallback } from 'react';
import { EntSecurityScanService } from '../services/security-scan.service';
import { createClient } from '@/lib/supabase/client';
import type { SecurityScan, SecurityScanCreate } from '@educi/types';

export const useEntSecurityScanActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SecurityScanCreate): Promise<SecurityScan | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSecurityScanService(supabase);
      return await service.createSecurityScan(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SecurityScanCreate>): Promise<SecurityScan | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSecurityScanService(supabase);
      return await service.updateSecurityScan(schoolId, id, data);
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
      const service = new EntSecurityScanService(supabase);
      await service.deleteSecurityScan(schoolId, id);
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
