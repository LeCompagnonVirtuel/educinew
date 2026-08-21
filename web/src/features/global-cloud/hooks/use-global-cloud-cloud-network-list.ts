'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudNetworkService } from '../services/global-cloud-cloud-network.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudNetwork } from '@educi/types';

export const useGlobalCloudCloudNetworkList = (schoolId: string) => {
  const [items, setItems] = useState<CloudNetwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudNetworkService(supabase);
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