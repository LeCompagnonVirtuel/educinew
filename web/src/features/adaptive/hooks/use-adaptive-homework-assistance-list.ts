'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveHomeworkAssistanceService } from '../services/adaptive-homework-assistance.service';
import { createClient } from '@/lib/supabase/client';
import type { HomeworkAssistance } from '@educi/types';

export const useAdaptiveHomeworkAssistanceList = (schoolId: string) => {
  const [items, setItems] = useState<HomeworkAssistance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveHomeworkAssistanceService(supabase);
      const data = await service.listAssistances(schoolId);
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
