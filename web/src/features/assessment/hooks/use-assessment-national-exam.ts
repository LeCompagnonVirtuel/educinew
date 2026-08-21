'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentNationalExamService } from '../services/assessment-national-exam.service';
import { createClient } from '@/lib/supabase/client';
import type { NationalExam } from '@educi/types';

export const useAssessmentNationalExamList = (schoolId: string) => {
  const [items, setItems] = useState<NationalExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentNationalExamService(supabase);
      const data = await service.listNationalExams(schoolId);
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