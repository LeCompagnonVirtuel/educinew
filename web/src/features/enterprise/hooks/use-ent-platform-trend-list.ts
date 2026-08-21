'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformTrendService } from '../services/platform-trend.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformTrend } from '@educi/types';

export const useEntPlatformTrendList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformTrendService(supabase);
      const data = await service.listPlatformTrends(schoolId);
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
