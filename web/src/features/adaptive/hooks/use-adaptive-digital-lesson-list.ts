'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveDigitalLessonService } from '../services/adaptive-digital-lesson.service';
import { createClient } from '@/lib/supabase/client';
import type { DigitalLesson } from '@educi/types';

export const useAdaptiveDigitalLessonList = (schoolId: string) => {
  const [items, setItems] = useState<DigitalLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveDigitalLessonService(supabase);
      const data = await service.listDigitalLessons(schoolId);
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
