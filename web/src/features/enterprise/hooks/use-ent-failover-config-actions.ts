'use client';

import { useState, useCallback } from 'react';
import { EntFailoverConfigService } from '../services/failover-config.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverConfig, FailoverConfigCreate } from '@educi/types';

export const useEntFailoverConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: FailoverConfigCreate): Promise<FailoverConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverConfigService(supabase);
      return await service.createFailoverConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<FailoverConfigCreate>): Promise<FailoverConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverConfigService(supabase);
      return await service.updateFailoverConfig(schoolId, id, data);
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
      const service = new EntFailoverConfigService(supabase);
      await service.deleteFailoverConfig(schoolId, id);
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
