'use client';

import { useState, useCallback } from 'react';
import { IntPredictiveModelService } from '../services/int-predictive-model.service';
import { createClient } from '@/lib/supabase/client';
import type { PredictiveModel, PredictiveModelCreate } from '@educi/types';

export const useIntPredictiveModelActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PredictiveModelCreate): Promise<PredictiveModel | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntPredictiveModelService(supabase);
      return await service.createPredictiveModel(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PredictiveModelCreate>): Promise<PredictiveModel | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntPredictiveModelService(supabase);
      return await service.updatePredictiveModel(schoolId, id, data);
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
      const service = new IntPredictiveModelService(supabase);
      await service.deletePredictiveModel(schoolId, id);
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
