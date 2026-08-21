'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformAnalyticsService } from '../services/platform-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformAnalytics } from '@educi/types';

export const useEntPlatformAnalyticsList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformAnalyticsService(supabase);
      const data = await service.listPlatformAnalyticss(schoolId);
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
