'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentAIQuestionGeneratorService } from '../services/assessment-ai-question-gen.service';
import { createClient } from '@/lib/supabase/client';
import type { AIQuestionGenerator } from '@educi/types';

export const useAssessmentAIQuestionGeneratorList = (schoolId: string) => {
  const [items, setItems] = useState<AIQuestionGenerator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentAIQuestionGeneratorService(supabase);
      const data = await service.listAIQuestionGenerators(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};