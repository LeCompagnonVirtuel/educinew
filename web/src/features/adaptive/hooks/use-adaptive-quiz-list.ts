'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveQuizService } from '../services/adaptive-quiz.service';
import { createClient } from '@/lib/supabase/client';
import type { DynamicQuiz } from '@educi/types';

export const useAdaptiveQuizList = (schoolId: string) => {
  const [items, setItems] = useState<DynamicQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveQuizService(supabase);
      const data = await service.listDynamicQuizzes(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
