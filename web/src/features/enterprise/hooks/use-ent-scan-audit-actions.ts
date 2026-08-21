'use client';

import { useState, useCallback } from 'react';
import { EntScanAuditService } from '../services/scan-audit.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanAudit, ScanAuditCreate } from '@educi/types';

export const useEntScanAuditActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanAuditCreate): Promise<ScanAudit | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanAuditService(supabase);
      return await service.createScanAudit(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanAuditCreate>): Promise<ScanAudit | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanAuditService(supabase);
      return await service.updateScanAudit(schoolId, id, data);
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
      const service = new EntScanAuditService(supabase);
      await service.deleteScanAudit(schoolId, id);
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
