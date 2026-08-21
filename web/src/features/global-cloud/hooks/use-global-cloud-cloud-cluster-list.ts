'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudClusterService } from '../services/global-cloud-cloud-cluster.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudCluster } from '@educi/types';

export const useGlobalCloudCloudClusterList = (schoolId: string) => {
  const [items, setItems] = useState<CloudCluster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudClusterService(supabase);
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