'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveHomeworkService } from '../services/adaptive-homework.service';
import { createClient } from '@/lib/supabase/client';
import type { AdaptiveHomework } from '@educi/types';

export const useAdaptiveHomeworkList = (schoolId: string) => {
  const [items, setItems] = useState<AdaptiveHomework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveHomeworkService(supabase);
      const data = await service.listAdaptiveHomeworks(schoolId);
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
