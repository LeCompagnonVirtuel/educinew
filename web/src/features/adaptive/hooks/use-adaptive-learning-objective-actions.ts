'use client';

import { useState, useCallback } from 'react';
import { AdaptiveLearningObjectiveService } from '../services/adaptive-learning-objective.service';
import { createClient } from '@/lib/supabase/client';
import type { LearningObjective, LearningObjectiveCreate } from '@educi/types';

export const useAdaptiveLearningObjectiveActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LearningObjectiveCreate): Promise<LearningObjective | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLearningObjectiveService(supabase);
      return await service.createLearningObjective(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LearningObjectiveCreate>): Promise<LearningObjective | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLearningObjectiveService(supabase);
      return await service.updateLearningObjective(schoolId, id, data as any);
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
      const service = new AdaptiveLearningObjectiveService(supabase);
      await service.deleteLearningObjective(schoolId, id);
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
