'use client';

import { useState, useCallback } from 'react';
import { EntClusterConfigService } from '../services/cluster-config.service';
import { createClient } from '@/lib/supabase/client';
import type { ClusterConfig, ClusterConfigCreate } from '@educi/types';

export const useEntClusterConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ClusterConfigCreate): Promise<ClusterConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntClusterConfigService(supabase);
      return await service.createClusterConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ClusterConfigCreate>): Promise<ClusterConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntClusterConfigService(supabase);
      return await service.updateClusterConfig(schoolId, id, data);
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
      const service = new EntClusterConfigService(supabase);
      await service.deleteClusterConfig(schoolId, id);
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
