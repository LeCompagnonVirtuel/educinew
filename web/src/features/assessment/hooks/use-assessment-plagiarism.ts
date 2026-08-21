'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentPlagiarismService } from '../services/assessment-plagiarism.service';
import { createClient } from '@/lib/supabase/client';
import type { Plagiarism } from '@educi/types';

export const useAssessmentPlagiarismList = (schoolId: string) => {
  const [items, setItems] = useState<Plagiarism[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentPlagiarismService(supabase);
      const data = await service.listPlagiarisms(schoolId);
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