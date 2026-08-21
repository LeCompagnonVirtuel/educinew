'use client';

import { useState, useCallback } from 'react';
import { AdaptiveRecommendedExerciseService } from '../services/adaptive-recommended-exercise.service';
import { createClient } from '@/lib/supabase/client';
import type { RecommendedExercise, RecommendedExerciseCreate } from '@educi/types';

export const useAdaptiveRecommendedExerciseActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: RecommendedExerciseCreate): Promise<RecommendedExercise | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRecommendedExerciseService(supabase);
      return await service.createExercise(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RecommendedExerciseCreate>): Promise<RecommendedExercise | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRecommendedExerciseService(supabase);
      return await service.updateExercise(schoolId, id, data);
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
      const service = new AdaptiveRecommendedExerciseService(supabase);
      await service.deleteExercise(schoolId, id);
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
