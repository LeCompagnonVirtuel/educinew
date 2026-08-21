'use client';

import { useState, useCallback } from 'react';
import { AdaptiveExerciseService } from '../services/adaptive-exercise.service';
import { createClient } from '@/lib/supabase/client';
import type { PersonalizedExercise, PersonalizedExerciseCreate } from '@educi/types';

export const useAdaptiveExerciseActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PersonalizedExerciseCreate): Promise<PersonalizedExercise | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveExerciseService(supabase);
      return await service.createPersonalizedExercise(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PersonalizedExerciseCreate>): Promise<PersonalizedExercise | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveExerciseService(supabase);
      return await service.updatePersonalizedExercise(schoolId, id, data);
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
      const service = new AdaptiveExerciseService(supabase);
      await service.deletePersonalizedExercise(schoolId, id);
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
