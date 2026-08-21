'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntHealthTrendService } from '../services/health-trend.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthTrend } from '@educi/types';

export const useEntHealthTrendList = (schoolId: string) => {
  const [items, setItems] = useState<HealthTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthTrendService(supabase);
      const data = await service.listHealthTrends(schoolId);
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
