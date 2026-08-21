'use client';

import { useState, useCallback } from 'react';
import { AdaptiveLearningProfileService } from '../services/adaptive-learning-profile.service';
import { createClient } from '@/lib/supabase/client';
import type { LearningProfile, LearningProfileCreate } from '@educi/types';

export const useAdaptiveLearningProfileActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LearningProfileCreate): Promise<LearningProfile | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLearningProfileService(supabase);
      return await service.createLearningProfile(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LearningProfileCreate>): Promise<LearningProfile | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLearningProfileService(supabase);
      return await service.updateLearningProfile(schoolId, id, data as any);
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
      const service = new AdaptiveLearningProfileService(supabase);
      await service.deleteLearningProfile(schoolId, id);
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
