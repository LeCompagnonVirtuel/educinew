'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveTimelineService } from '../services/adaptive-timeline.service';
import { createClient } from '@/lib/supabase/client';
import type { LearningTimeline } from '@educi/types';

export const useAdaptiveTimelineList = (schoolId: string) => {
  const [items, setItems] = useState<LearningTimeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveTimelineService(supabase);
      const data = await service.listTimelines(schoolId);
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
