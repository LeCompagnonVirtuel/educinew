'use client';

import { useState, useCallback } from 'react';
import { AdaptiveDigitalLessonService } from '../services/adaptive-digital-lesson.service';
import { createClient } from '@/lib/supabase/client';
import type { DigitalLesson } from '@educi/types';

export const useAdaptiveDigitalLessonActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<DigitalLesson, 'id' | 'created_at'>): Promise<DigitalLesson | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveDigitalLessonService(supabase);
      return await service.createDigitalLesson(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Omit<DigitalLesson, 'id' | 'created_at'>>): Promise<DigitalLesson | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveDigitalLessonService(supabase);
      return await service.updateDigitalLesson(schoolId, id, data);
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
      const service = new AdaptiveDigitalLessonService(supabase);
      await service.deleteDigitalLesson(schoolId, id);
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
