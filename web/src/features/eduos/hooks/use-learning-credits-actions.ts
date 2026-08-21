'use client';

import { useState, useCallback } from 'react';
import { EduOSLearningCreditsService } from '../services/eduos-learning-credits.service';
import { createClient } from '@/lib/supabase/client';
import type { LearningCredits } from '@educi/types';

export const useEduOSLearningCreditsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<LearningCredits>): Promise<LearningCredits | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLearningCreditsService(supabase);
      return await service.createLearningCredits(schoolId, data as LearningCredits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LearningCredits>): Promise<LearningCredits | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLearningCreditsService(supabase);
      return await service.updateLearningCredits(schoolId, id, data);
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
      const service = new EduOSLearningCreditsService(supabase);
      await service.deleteLearningCredits(schoolId, id);
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
