'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentExamAttemptService } from '../services/assessment-exam-attempt.service';
import { createClient } from '@/lib/supabase/client';
import type { ExamAttempt } from '@educi/types';

export const useAssessmentExamAttemptList = (schoolId: string) => {
  const [items, setItems] = useState<ExamAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentExamAttemptService(supabase);
      const data = await service.listExamAttempts(schoolId);
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