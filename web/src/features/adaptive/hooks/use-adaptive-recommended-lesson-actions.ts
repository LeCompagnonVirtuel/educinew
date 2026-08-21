'use client';

import { useState, useCallback } from 'react';
import { AdaptiveRecommendedLessonService } from '../services/adaptive-recommended-lesson.service';
import { createClient } from '@/lib/supabase/client';
import type { RecommendedLesson, RecommendedLessonCreate } from '@educi/types';

export const useAdaptiveRecommendedLessonActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: RecommendedLessonCreate): Promise<RecommendedLesson | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRecommendedLessonService(supabase);
      return await service.createLesson(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RecommendedLessonCreate>): Promise<RecommendedLesson | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRecommendedLessonService(supabase);
      return await service.updateLesson(schoolId, id, data);
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
      const service = new AdaptiveRecommendedLessonService(supabase);
      await service.deleteLesson(schoolId, id);
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
