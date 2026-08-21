'use client';

import { useState, useCallback } from 'react';
import { AssessmentQuestionPoolService } from '../services/assessment-question-pool.service';
import { createClient } from '@/lib/supabase/client';
import type { QuestionPool, QuestionPoolCreate } from '@educi/types';

export const useAssessmentQuestionPoolActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: QuestionPoolCreate): Promise<QuestionPool | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentQuestionPoolService(supabase);
      return await service.createQuestionPool(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<QuestionPoolCreate>): Promise<QuestionPool | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentQuestionPoolService(supabase);
      return await service.updateQuestionPool(schoolId, id, data);
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
      const service = new AssessmentQuestionPoolService(supabase);
      await service.deleteQuestionPool(schoolId, id);
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