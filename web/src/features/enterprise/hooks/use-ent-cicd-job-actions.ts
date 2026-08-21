'use client';

import { useState, useCallback } from 'react';
import { EntCICDJobService } from '../services/cicd-job.service';
import { createClient } from '@/lib/supabase/client';
import type { CICDJob, CICDJobCreate } from '@educi/types';

export const useEntCICDJobActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CICDJobCreate): Promise<CICDJob | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDJobService(supabase);
      return await service.createCICDJob(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CICDJobCreate>): Promise<CICDJob | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDJobService(supabase);
      return await service.updateCICDJob(schoolId, id, data);
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
      const service = new EntCICDJobService(supabase);
      await service.deleteCICDJob(schoolId, id);
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
