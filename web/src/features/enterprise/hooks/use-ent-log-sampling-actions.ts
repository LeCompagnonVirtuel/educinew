'use client';

import { useState, useCallback } from 'react';
import { EntLogSamplingService } from '../services/log-sampling.service';
import { createClient } from '@/lib/supabase/client';
import type { LogSampling, LogSamplingCreate } from '@educi/types';

export const useEntLogSamplingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogSamplingCreate): Promise<LogSampling | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogSamplingService(supabase);
      return await service.createLogSampling(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogSamplingCreate>): Promise<LogSampling | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogSamplingService(supabase);
      return await service.updateLogSampling(schoolId, id, data);
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
      const service = new EntLogSamplingService(supabase);
      await service.deleteLogSampling(schoolId, id);
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
