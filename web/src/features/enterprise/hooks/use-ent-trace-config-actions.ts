'use client';

import { useState, useCallback } from 'react';
import { EntTraceConfigService } from '../services/trace-config.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceConfig, TraceConfigCreate } from '@educi/types';

export const useEntTraceConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TraceConfigCreate): Promise<TraceConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceConfigService(supabase);
      return await service.createTraceConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TraceConfigCreate>): Promise<TraceConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceConfigService(supabase);
      return await service.updateTraceConfig(schoolId, id, data);
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
      const service = new EntTraceConfigService(supabase);
      await service.deleteTraceConfig(schoolId, id);
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
