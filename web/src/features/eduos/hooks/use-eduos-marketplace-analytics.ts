'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMarketplaceAnalyticsService } from '../services/eduos-marketplace-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceAnalytics } from '@educi/types';

export const useEduOSMarketplaceAnalyticsList = (schoolId: string) => {
  const [items, setItems] = useState<MarketplaceAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceAnalyticsService(supabase);
      const data = await service.listMarketplaceAnalytics(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
