'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudTrafficRouteService } from '../services/global-cloud-traffic-route.service';
import { createClient } from '@/lib/supabase/client';
import type { TrafficRoute } from '@educi/types';

export const useGlobalCloudTrafficRouteList = (schoolId: string) => {
  const [items, setItems] = useState<TrafficRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudTrafficRouteService(supabase);
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