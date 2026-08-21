'use client';

import { useState, useCallback } from 'react';
import { EntProxyConfigService } from '../services/proxy-config.service';
import { createClient } from '@/lib/supabase/client';
import type { ProxyConfig, ProxyConfigCreate } from '@educi/types';

export const useEntProxyConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProxyConfigCreate): Promise<ProxyConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProxyConfigService(supabase);
      return await service.createProxyConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProxyConfigCreate>): Promise<ProxyConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProxyConfigService(supabase);
      return await service.updateProxyConfig(schoolId, id, data);
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
      const service = new EntProxyConfigService(supabase);
      await service.deleteProxyConfig(schoolId, id);
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
