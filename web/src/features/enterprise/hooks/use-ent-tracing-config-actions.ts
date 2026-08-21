'use client';

import { useState, useCallback } from 'react';
import { EntTracingConfigService } from '../services/tracing-config.service';
import { createClient } from '@/lib/supabase/client';
import type { TracingConfig, TracingConfigCreate } from '@educi/types';

export const useEntTracingConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TracingConfigCreate): Promise<TracingConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTracingConfigService(supabase);
      return await service.createTracingConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TracingConfigCreate>): Promise<TracingConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTracingConfigService(supabase);
      return await service.updateTracingConfig(schoolId, id, data);
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
      const service = new EntTracingConfigService(supabase);
      await service.deleteTracingConfig(schoolId, id);
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
