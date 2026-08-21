'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveEngagementService } from '../services/adaptive-engagement.service';
import { createClient } from '@/lib/supabase/client';
import type { EngagementIndex } from '@educi/types';

export const useAdaptiveEngagementList = (schoolId: string) => {
  const [items, setItems] = useState<EngagementIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveEngagementService(supabase);
      const data = await service.listEngagementIndices(schoolId);
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
