'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformRevenueService } from '../services/platform-revenue.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformRevenue } from '@educi/types';

export const useEntPlatformRevenueList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformRevenueService(supabase);
      const data = await service.listPlatformRevenues(schoolId);
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
