'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAPIAnalyticsService } from '../services/api-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { APIAnalytics } from '@educi/types';

export const useEntAPIAnalyticsList = (schoolId: string) => {
  const [items, setItems] = useState<APIAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIAnalyticsService(supabase);
      const data = await service.listAPIAnalyticss(schoolId);
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
