'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudProxyConnectionService } from '../services/global-cloud-proxy-connection.service';
import { createClient } from '@/lib/supabase/client';
import type { ProxyConnection } from '@educi/types';

export const useGlobalCloudProxyConnectionList = (schoolId: string) => {
  const [items, setItems] = useState<ProxyConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudProxyConnectionService(supabase);
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