'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudProxyService } from '../services/global-cloud-cloud-proxy.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudProxy } from '@educi/types';

export const useGlobalCloudCloudProxyList = (schoolId: string) => {
  const [items, setItems] = useState<CloudProxy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudProxyService(supabase);
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