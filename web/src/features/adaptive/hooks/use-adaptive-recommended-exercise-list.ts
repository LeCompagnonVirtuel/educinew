'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveRecommendedExerciseService } from '../services/adaptive-recommended-exercise.service';
import { createClient } from '@/lib/supabase/client';
import type { RecommendedExercise } from '@educi/types';

export const useAdaptiveRecommendedExerciseList = (schoolId: string) => {
  const [items, setItems] = useState<RecommendedExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRecommendedExerciseService(supabase);
      const data = await service.listExercises(schoolId);
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
