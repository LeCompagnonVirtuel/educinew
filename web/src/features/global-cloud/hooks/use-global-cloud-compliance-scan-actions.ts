'use client';

import { useState, useCallback } from 'react';
import { GlobalCloudComplianceScanService } from '../services/global-cloud-compliance-scan.service';
import { createClient } from '@/lib/supabase/client';
import type { ComplianceScan } from '@educi/types';

export const useGlobalCloudComplianceScanActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ComplianceScan>): Promise<ComplianceScan | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudComplianceScanService(supabase);
      return await service.create(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ComplianceScan>): Promise<ComplianceScan | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudComplianceScanService(supabase);
      return await service.update(schoolId, id, data as any);
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
      const service = new GlobalCloudComplianceScanService(supabase);
      await service.delete(schoolId, id);
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