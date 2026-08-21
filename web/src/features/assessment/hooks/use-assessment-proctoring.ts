'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentProctoringService } from '../services/assessment-proctoring.service';
import { createClient } from '@/lib/supabase/client';
import type { Proctoring } from '@educi/types';

export const useAssessmentProctoringList = (schoolId: string) => {
  const [items, setItems] = useState<Proctoring[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentProctoringService(supabase);
      const data = await service.listProctorings(schoolId);
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