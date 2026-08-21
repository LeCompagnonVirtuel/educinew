'use client';

import { useState, useCallback } from 'react';
import { AssessmentAdaptiveExamService } from '../services/assessment-adaptive-exam.service';
import { createClient } from '@/lib/supabase/client';
import type { AdaptiveExam, AdaptiveExamCreate } from '@educi/types';

export const useAssessmentAdaptiveExamActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AdaptiveExamCreate): Promise<AdaptiveExam | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentAdaptiveExamService(supabase);
      return await service.createAdaptiveExam(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AdaptiveExamCreate>): Promise<AdaptiveExam | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentAdaptiveExamService(supabase);
      return await service.updateAdaptiveExam(schoolId, id, data);
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
      const service = new AssessmentAdaptiveExamService(supabase);
      await service.deleteAdaptiveExam(schoolId, id);
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