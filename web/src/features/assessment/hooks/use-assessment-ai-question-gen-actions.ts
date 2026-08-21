'use client';

import { useState, useCallback } from 'react';
import { AssessmentAIQuestionGeneratorService } from '../services/assessment-ai-question-gen.service';
import { createClient } from '@/lib/supabase/client';
import type { AIQuestionGenerator, AIQuestionGeneratorCreate } from '@educi/types';

export const useAssessmentAIQuestionGeneratorActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AIQuestionGeneratorCreate): Promise<AIQuestionGenerator | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentAIQuestionGeneratorService(supabase);
      return await service.createAIQuestionGenerator(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AIQuestionGeneratorCreate>): Promise<AIQuestionGenerator | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentAIQuestionGeneratorService(supabase);
      return await service.updateAIQuestionGenerator(schoolId, id, data);
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
      const service = new AssessmentAIQuestionGeneratorService(supabase);
      await service.deleteAIQuestionGenerator(schoolId, id);
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