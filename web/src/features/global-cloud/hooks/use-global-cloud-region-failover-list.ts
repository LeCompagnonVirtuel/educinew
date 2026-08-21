'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudRegionFailoverService } from '../services/global-cloud-region-failover.service';
import { createClient } from '@/lib/supabase/client';
import type { RegionFailover } from '@educi/types';

export const useGlobalCloudRegionFailoverList = (schoolId: string) => {
  const [items, setItems] = useState<RegionFailover[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudRegionFailoverService(supabase);
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