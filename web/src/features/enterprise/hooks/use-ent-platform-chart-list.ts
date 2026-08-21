'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformChartService } from '../services/platform-chart.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformChart } from '@educi/types';

export const useEntPlatformChartList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformChartService(supabase);
      const data = await service.listPlatformCharts(schoolId);
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
