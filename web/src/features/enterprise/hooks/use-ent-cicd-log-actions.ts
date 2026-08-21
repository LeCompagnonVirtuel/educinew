'use client';

import { useState, useCallback } from 'react';
import { EntCICDLogService } from '../services/cicd-log.service';
import { createClient } from '@/lib/supabase/client';
import type { CICDLog, CICDLogCreate } from '@educi/types';

export const useEntCICDLogActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CICDLogCreate): Promise<CICDLog | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDLogService(supabase);
      return await service.createCICDLog(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CICDLogCreate>): Promise<CICDLog | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDLogService(supabase);
      return await service.updateCICDLog(schoolId, id, data);
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
      const service = new EntCICDLogService(supabase);
      await service.deleteCICDLog(schoolId, id);
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
