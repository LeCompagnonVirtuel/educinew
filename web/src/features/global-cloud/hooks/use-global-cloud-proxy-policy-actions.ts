'use client';

import { useState, useCallback } from 'react';
import { GlobalCloudProxyPolicyService } from '../services/global-cloud-proxy-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { ProxyPolicy } from '@educi/types';

export const useGlobalCloudProxyPolicyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ProxyPolicy>): Promise<ProxyPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudProxyPolicyService(supabase);
      return await service.create(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProxyPolicy>): Promise<ProxyPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudProxyPolicyService(supabase);
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
      const service = new GlobalCloudProxyPolicyService(supabase);
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