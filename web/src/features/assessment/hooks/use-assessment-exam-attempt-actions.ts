'use client';

import { useState, useCallback } from 'react';
import { AssessmentExamAttemptService } from '../services/assessment-exam-attempt.service';
import { createClient } from '@/lib/supabase/client';
import type { ExamAttempt, ExamAttemptCreate } from '@educi/types';

export const useAssessmentExamAttemptActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ExamAttemptCreate): Promise<ExamAttempt | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentExamAttemptService(supabase);
      return await service.createExamAttempt(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ExamAttemptCreate>): Promise<ExamAttempt | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentExamAttemptService(supabase);
      return await service.updateExamAttempt(schoolId, id, data);
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
      const service = new AssessmentExamAttemptService(supabase);
      await service.deleteExamAttempt(schoolId, id);
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