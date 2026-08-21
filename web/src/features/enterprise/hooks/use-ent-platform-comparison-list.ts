'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformComparisonService } from '../services/platform-comparison.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformComparison } from '@educi/types';

export const useEntPlatformComparisonList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformComparisonService(supabase);
      const data = await service.listPlatformComparisons(schoolId);
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
