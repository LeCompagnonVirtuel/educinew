'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentQuestionPoolService } from '../services/assessment-question-pool.service';
import { createClient } from '@/lib/supabase/client';
import type { QuestionPool } from '@educi/types';

export const useAssessmentQuestionPoolList = (schoolId: string) => {
  const [items, setItems] = useState<QuestionPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentQuestionPoolService(supabase);
      const data = await service.listQuestionPools(schoolId);
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