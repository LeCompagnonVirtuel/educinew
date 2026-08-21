'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveLessonPlanService } from '../services/adaptive-lesson-plan.service';
import { createClient } from '@/lib/supabase/client';
import type { LessonPlan } from '@educi/types';

export const useAdaptiveLessonPlanList = (schoolId: string) => {
  const [items, setItems] = useState<LessonPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLessonPlanService(supabase);
      const data = await service.listLessonPlans(schoolId);
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
