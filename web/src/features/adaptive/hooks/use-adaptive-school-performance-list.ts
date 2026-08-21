'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveSchoolInsightsService } from '../services/adaptive-school-insights.service';
import { createClient } from '@/lib/supabase/client';
import type { SchoolInsights } from '@educi/types';

export const useAdaptiveSchoolPerformanceList = (schoolId: string) => {
  const [items, setItems] = useState<SchoolInsights[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveSchoolInsightsService(supabase);
      const data = await service.listInsights(schoolId);
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
