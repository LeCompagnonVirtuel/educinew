'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudLoadBalancerService } from '../services/global-cloud-load-balancer.service';
import { createClient } from '@/lib/supabase/client';
import type { LoadBalancer } from '@educi/types';

export const useGlobalCloudLoadBalancerList = (schoolId: string) => {
  const [items, setItems] = useState<LoadBalancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudLoadBalancerService(supabase);
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