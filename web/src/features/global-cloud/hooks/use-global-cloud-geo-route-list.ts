'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudGeoRouteService } from '../services/global-cloud-geo-route.service';
import { createClient } from '@/lib/supabase/client';
import type { GeoRoute } from '@educi/types';

export const useGlobalCloudGeoRouteList = (schoolId: string) => {
  const [items, setItems] = useState<GeoRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudGeoRouteService(supabase);
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