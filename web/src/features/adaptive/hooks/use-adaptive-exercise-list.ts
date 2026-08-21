'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveExerciseService } from '../services/adaptive-exercise.service';
import { createClient } from '@/lib/supabase/client';
import type { PersonalizedExercise } from '@educi/types';

export const useAdaptiveExerciseList = (schoolId: string) => {
  const [items, setItems] = useState<PersonalizedExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveExerciseService(supabase);
      const data = await service.listPersonalizedExercises(schoolId);
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
