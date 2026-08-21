'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentCompetencyTestService } from '../services/assessment-competency-test.service';
import { createClient } from '@/lib/supabase/client';
import type { CompetencyTest } from '@educi/types';

export const useAssessmentCompetencyTestList = (schoolId: string) => {
  const [items, setItems] = useState<CompetencyTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentCompetencyTestService(supabase);
      const data = await service.listCompetencyTests(schoolId);
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