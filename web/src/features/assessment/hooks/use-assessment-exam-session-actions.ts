'use client';

import { useState, useCallback } from 'react';
import { AssessmentExamSessionService } from '../services/assessment-exam-session.service';
import { createClient } from '@/lib/supabase/client';
import type { ExamSession, ExamSessionCreate } from '@educi/types';

export const useAssessmentExamSessionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ExamSessionCreate): Promise<ExamSession | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentExamSessionService(supabase);
      return await service.createExamSession(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ExamSessionCreate>): Promise<ExamSession | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentExamSessionService(supabase);
      return await service.updateExamSession(schoolId, id, data);
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
      const service = new AssessmentExamSessionService(supabase);
      await service.deleteExamSession(schoolId, id);
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