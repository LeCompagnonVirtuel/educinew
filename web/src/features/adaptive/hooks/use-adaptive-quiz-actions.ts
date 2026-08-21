'use client';

import { useState, useCallback } from 'react';
import { AdaptiveQuizService } from '../services/adaptive-quiz.service';
import { createClient } from '@/lib/supabase/client';
import type { DynamicQuiz, DynamicQuizCreate } from '@educi/types';

export const useAdaptiveQuizActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DynamicQuizCreate): Promise<DynamicQuiz | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveQuizService(supabase);
      return await service.createDynamicQuiz(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DynamicQuizCreate>): Promise<DynamicQuiz | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveQuizService(supabase);
      return await service.updateDynamicQuiz(schoolId, id, data);
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
      const service = new AdaptiveQuizService(supabase);
      await service.deleteDynamicQuiz(schoolId, id);
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
