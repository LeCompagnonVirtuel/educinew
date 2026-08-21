'use client';

import { useState, useCallback } from 'react';
import { EntNetworkConfigService } from '../services/network-config.service';
import { createClient } from '@/lib/supabase/client';
import type { NetworkConfig, NetworkConfigCreate } from '@educi/types';

export const useEntNetworkConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: NetworkConfigCreate): Promise<NetworkConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntNetworkConfigService(supabase);
      return await service.createNetworkConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<NetworkConfigCreate>): Promise<NetworkConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntNetworkConfigService(supabase);
      return await service.updateNetworkConfig(schoolId, id, data);
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
      const service = new EntNetworkConfigService(supabase);
      await service.deleteNetworkConfig(schoolId, id);
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
