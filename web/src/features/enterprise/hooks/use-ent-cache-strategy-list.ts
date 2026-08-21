'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheStrategyService } from '../services/cache-strategy.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheStrategy } from '@educi/types';

export const useEntCacheStrategyList = (schoolId: string) => {
  const [items, setItems] = useState<CacheStrategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheStrategyService(supabase);
      const data = await service.listCacheStrategys(schoolId);
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
