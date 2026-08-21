'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveRecommendedLessonService } from '../services/adaptive-recommended-lesson.service';
import { createClient } from '@/lib/supabase/client';
import type { RecommendedLesson } from '@educi/types';

export const useAdaptiveRecommendedLessonList = (schoolId: string) => {
  const [items, setItems] = useState<RecommendedLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRecommendedLessonService(supabase);
      const data = await service.listLessons(schoolId);
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
