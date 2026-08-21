'use client';

import { useState, useCallback } from 'react';
import { EntCICDStageService } from '../services/cicd-stage.service';
import { createClient } from '@/lib/supabase/client';
import type { CICDStage, CICDStageCreate } from '@educi/types';

export const useEntCICDStageActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CICDStageCreate): Promise<CICDStage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDStageService(supabase);
      return await service.createCICDStage(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CICDStageCreate>): Promise<CICDStage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDStageService(supabase);
      return await service.updateCICDStage(schoolId, id, data);
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
      const service = new EntCICDStageService(supabase);
      await service.deleteCICDStage(schoolId, id);
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
