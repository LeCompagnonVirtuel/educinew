'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudGeoAnalyticsService } from '../services/global-cloud-geo-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { GeoAnalytics } from '@educi/types';

export const useGlobalCloudGeoAnalyticsList = (schoolId: string) => {
  const [items, setItems] = useState<GeoAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudGeoAnalyticsService(supabase);
      const data = await service.list(schoolId);
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