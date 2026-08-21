'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveLearningObjectiveService } from '../services/adaptive-learning-objective.service';
import { createClient } from '@/lib/supabase/client';
import type { LearningObjective } from '@educi/types';

export const useAdaptiveLearningObjectiveList = (schoolId: string) => {
  const [items, setItems] = useState<LearningObjective[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLearningObjectiveService(supabase);
      const data = await service.listLearningObjectives(schoolId);
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
