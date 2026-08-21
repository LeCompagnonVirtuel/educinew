'use client';

import { useState, useCallback } from 'react';
import { EntLoadBalancerService } from '../services/load-balancer.service';
import { createClient } from '@/lib/supabase/client';
import type { LoadBalancer, LoadBalancerCreate } from '@educi/types';

export const useEntLoadBalancerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LoadBalancerCreate): Promise<LoadBalancer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLoadBalancerService(supabase);
      return await service.createLoadBalancer(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LoadBalancerCreate>): Promise<LoadBalancer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLoadBalancerService(supabase);
      return await service.updateLoadBalancer(schoolId, id, data);
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
      const service = new EntLoadBalancerService(supabase);
      await service.deleteLoadBalancer(schoolId, id);
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
