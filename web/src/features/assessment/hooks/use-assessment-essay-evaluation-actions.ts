'use client';

import { useState, useCallback } from 'react';
import { AssessmentEssayEvaluationService } from '../services/assessment-essay-evaluation.service';
import { createClient } from '@/lib/supabase/client';
import type { EssayEvaluation, EssayEvaluationCreate } from '@educi/types';

export const useAssessmentEssayEvaluationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: EssayEvaluationCreate): Promise<EssayEvaluation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentEssayEvaluationService(supabase);
      return await service.createEssayEvaluation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<EssayEvaluationCreate>): Promise<EssayEvaluation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentEssayEvaluationService(supabase);
      return await service.updateEssayEvaluation(schoolId, id, data);
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
      const service = new AssessmentEssayEvaluationService(supabase);
      await service.deleteEssayEvaluation(schoolId, id);
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