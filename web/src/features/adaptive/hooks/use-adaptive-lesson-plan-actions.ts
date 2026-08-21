'use client';

import { useState, useCallback } from 'react';
import { AdaptiveLessonPlanService } from '../services/adaptive-lesson-plan.service';
import { createClient } from '@/lib/supabase/client';
import type { LessonPlan } from '@educi/types';

export const useAdaptiveLessonPlanActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<LessonPlan, 'id' | 'created_at'>): Promise<LessonPlan | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLessonPlanService(supabase);
      return await service.createLessonPlan(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Omit<LessonPlan, 'id' | 'created_at'>>): Promise<LessonPlan | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLessonPlanService(supabase);
      return await service.updateLessonPlan(schoolId, id, data);
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
      const service = new AdaptiveLessonPlanService(supabase);
      await service.deleteLessonPlan(schoolId, id);
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
