'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudGeoFailoverService } from '../services/global-cloud-geo-failover.service';
import { createClient } from '@/lib/supabase/client';
import type { GeoFailover } from '@educi/types';

export const useGlobalCloudGeoFailoverList = (schoolId: string) => {
  const [items, setItems] = useState<GeoFailover[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudGeoFailoverService(supabase);
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