'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentAutomaticGradingService } from '../services/assessment-automatic-grading.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomaticGrading } from '@educi/types';

export const useAssessmentAutomaticGradingList = (schoolId: string) => {
  const [items, setItems] = useState<AutomaticGrading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentAutomaticGradingService(supabase);
      const data = await service.listAutomaticGradings(schoolId);
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