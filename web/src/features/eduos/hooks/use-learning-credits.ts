'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSLearningCreditsService } from '../services/eduos-learning-credits.service';
import { createClient } from '@/lib/supabase/client';
import type { LearningCredits } from '@educi/types';

export const useEduOSLearningCreditsList = (schoolId: string) => {
  const [items, setItems] = useState<LearningCredits[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLearningCreditsService(supabase);
      const data = await service.listLearningCreditss(schoolId);
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
