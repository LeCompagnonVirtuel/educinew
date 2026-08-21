'use client';

import { useState, useCallback } from 'react';
import { EntLogLevelService } from '../services/log-level.service';
import { createClient } from '@/lib/supabase/client';
import type { LogLevel, LogLevelCreate } from '@educi/types';

export const useEntLogLevelActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogLevelCreate): Promise<LogLevel | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogLevelService(supabase);
      return await service.createLogLevel(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogLevelCreate>): Promise<LogLevel | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogLevelService(supabase);
      return await service.updateLogLevel(schoolId, id, data);
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
      const service = new EntLogLevelService(supabase);
      await service.deleteLogLevel(schoolId, id);
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
