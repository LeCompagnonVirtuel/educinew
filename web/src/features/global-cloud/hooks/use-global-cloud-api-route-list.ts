'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudAPIRouteService } from '../services/global-cloud-api-route.service';
import { createClient } from '@/lib/supabase/client';
import type { APIRoute } from '@educi/types';

export const useGlobalCloudAPIRouteList = (schoolId: string) => {
  const [items, setItems] = useState<APIRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudAPIRouteService(supabase);
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