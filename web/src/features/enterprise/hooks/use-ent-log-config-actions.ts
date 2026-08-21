'use client';

import { useState, useCallback } from 'react';
import { EntLogConfigService } from '../services/log-config.service';
import { createClient } from '@/lib/supabase/client';
import type { LogConfig, LogConfigCreate } from '@educi/types';

export const useEntLogConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogConfigCreate): Promise<LogConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogConfigService(supabase);
      return await service.createLogConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogConfigCreate>): Promise<LogConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogConfigService(supabase);
      return await service.updateLogConfig(schoolId, id, data);
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
      const service = new EntLogConfigService(supabase);
      await service.deleteLogConfig(schoolId, id);
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
