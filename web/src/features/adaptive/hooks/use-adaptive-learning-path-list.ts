'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveLearningPathService } from '../services/adaptive-learning-path.service';
import { createClient } from '@/lib/supabase/client';
import type { LearningPath } from '@educi/types';

export const useAdaptiveLearningPathList = (schoolId: string) => {
  const [items, setItems] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLearningPathService(supabase);
      const data = await service.listLearningPaths(schoolId);
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
