'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentExamSessionService } from '../services/assessment-exam-session.service';
import { createClient } from '@/lib/supabase/client';
import type { ExamSession } from '@educi/types';

export const useAssessmentExamSessionList = (schoolId: string) => {
  const [items, setItems] = useState<ExamSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentExamSessionService(supabase);
      const data = await service.listExamSessions(schoolId);
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