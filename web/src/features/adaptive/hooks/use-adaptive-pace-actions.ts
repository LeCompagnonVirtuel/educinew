'use client';

import { useState, useCallback } from 'react';
import { AdaptivePaceService } from '../services/adaptive-pace.service';
import { createClient } from '@/lib/supabase/client';
import type { LearningPace, LearningPaceCreate } from '@educi/types';

export const useAdaptivePaceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LearningPaceCreate): Promise<LearningPace | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptivePaceService(supabase);
      return await service.createLearningPace(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LearningPaceCreate>): Promise<LearningPace | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptivePaceService(supabase);
      return await service.updateLearningPace(schoolId, id, data as any);
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
      const service = new AdaptivePaceService(supabase);
      await service.deleteLearningPace(schoolId, id);
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
