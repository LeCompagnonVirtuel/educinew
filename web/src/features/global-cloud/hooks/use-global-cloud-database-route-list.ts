'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudDatabaseRouteService } from '../services/global-cloud-database-route.service';
import { createClient } from '@/lib/supabase/client';
import type { DatabaseRoute } from '@educi/types';

export const useGlobalCloudDatabaseRouteList = (schoolId: string) => {
  const [items, setItems] = useState<DatabaseRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudDatabaseRouteService(supabase);
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