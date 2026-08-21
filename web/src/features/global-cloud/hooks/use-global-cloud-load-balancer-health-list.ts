'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudLoadBalancerHealthService } from '../services/global-cloud-load-balancer-health.service';
import { createClient } from '@/lib/supabase/client';
import type { LoadBalancerHealth } from '@educi/types';

export const useGlobalCloudLoadBalancerHealthList = (schoolId: string) => {
  const [items, setItems] = useState<LoadBalancerHealth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudLoadBalancerHealthService(supabase);
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