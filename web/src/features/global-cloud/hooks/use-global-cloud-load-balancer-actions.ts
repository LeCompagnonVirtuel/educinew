'use client';

import { useState, useCallback } from 'react';
import { GlobalCloudLoadBalancerService } from '../services/global-cloud-load-balancer.service';
import { createClient } from '@/lib/supabase/client';
import type { LoadBalancer } from '@educi/types';

export const useGlobalCloudLoadBalancerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<LoadBalancer>): Promise<LoadBalancer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudLoadBalancerService(supabase);
      return await service.create(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LoadBalancer>): Promise<LoadBalancer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudLoadBalancerService(supabase);
      return await service.update(schoolId, id, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudLoadBalancerService(supabase);
      await service.delete(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};