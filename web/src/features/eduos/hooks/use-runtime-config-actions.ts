'use client';

import { useState, useCallback } from 'react';
import { EduOSRuntimeConfigService } from '../services/eduos-runtime-config.service';
import { createClient } from '@/lib/supabase/client';
import type { RuntimeConfig } from '@educi/types';

export const useEduOSRuntimeConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<RuntimeConfig>): Promise<RuntimeConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRuntimeConfigService(supabase);
      return await service.createRuntimeConfig(schoolId, data as RuntimeConfig);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RuntimeConfig>): Promise<RuntimeConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRuntimeConfigService(supabase);
      return await service.updateRuntimeConfig(schoolId, id, data);
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
      const service = new EduOSRuntimeConfigService(supabase);
      await service.deleteRuntimeConfig(schoolId, id);
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
