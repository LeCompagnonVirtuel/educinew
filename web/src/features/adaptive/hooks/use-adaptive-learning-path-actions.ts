'use client';

import { useState, useCallback } from 'react';
import { AdaptiveLearningPathService } from '../services/adaptive-learning-path.service';
import { createClient } from '@/lib/supabase/client';
import type { LearningPath, LearningPathCreate } from '@educi/types';

export const useAdaptiveLearningPathActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LearningPathCreate): Promise<LearningPath | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLearningPathService(supabase);
      return await service.createLearningPath(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LearningPathCreate>): Promise<LearningPath | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLearningPathService(supabase);
      return await service.updateLearningPath(schoolId, id, data as any);
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
      const service = new AdaptiveLearningPathService(supabase);
      await service.deleteLearningPath(schoolId, id);
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
