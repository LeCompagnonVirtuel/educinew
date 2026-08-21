'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentAdaptiveExamService } from '../services/assessment-adaptive-exam.service';
import { createClient } from '@/lib/supabase/client';
import type { AdaptiveExam } from '@educi/types';

export const useAssessmentAdaptiveExamList = (schoolId: string) => {
  const [items, setItems] = useState<AdaptiveExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentAdaptiveExamService(supabase);
      const data = await service.listAdaptiveExams(schoolId);
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