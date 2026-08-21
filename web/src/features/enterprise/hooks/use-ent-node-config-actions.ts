'use client';

import { useState, useCallback } from 'react';
import { EntNodeConfigService } from '../services/node-config.service';
import { createClient } from '@/lib/supabase/client';
import type { NodeConfig, NodeConfigCreate } from '@educi/types';

export const useEntNodeConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: NodeConfigCreate): Promise<NodeConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntNodeConfigService(supabase);
      return await service.createNodeConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<NodeConfigCreate>): Promise<NodeConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntNodeConfigService(supabase);
      return await service.updateNodeConfig(schoolId, id, data);
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
      const service = new EntNodeConfigService(supabase);
      await service.deleteNodeConfig(schoolId, id);
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
