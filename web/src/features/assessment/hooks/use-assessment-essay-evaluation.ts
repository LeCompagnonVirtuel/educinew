'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentEssayEvaluationService } from '../services/assessment-essay-evaluation.service';
import { createClient } from '@/lib/supabase/client';
import type { EssayEvaluation } from '@educi/types';

export const useAssessmentEssayEvaluationList = (schoolId: string) => {
  const [items, setItems] = useState<EssayEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentEssayEvaluationService(supabase);
      const data = await service.listEssayEvaluations(schoolId);
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