'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudProxyPolicyService } from '../services/global-cloud-proxy-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { ProxyPolicy } from '@educi/types';

export const useGlobalCloudProxyPolicyList = (schoolId: string) => {
  const [items, setItems] = useState<ProxyPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudProxyPolicyService(supabase);
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