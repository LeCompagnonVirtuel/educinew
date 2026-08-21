'use client';

import { useState, useCallback } from 'react';
import { EntCICDStepService } from '../services/cicd-step.service';
import { createClient } from '@/lib/supabase/client';
import type { CICDStep, CICDStepCreate } from '@educi/types';

export const useEntCICDStepActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CICDStepCreate): Promise<CICDStep | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDStepService(supabase);
      return await service.createCICDStep(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CICDStepCreate>): Promise<CICDStep | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDStepService(supabase);
      return await service.updateCICDStep(schoolId, id, data);
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
      const service = new EntCICDStepService(supabase);
      await service.deleteCICDStep(schoolId, id);
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
