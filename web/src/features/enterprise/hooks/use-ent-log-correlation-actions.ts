'use client';

import { useState, useCallback } from 'react';
import { EntLogCorrelationService } from '../services/log-correlation.service';
import { createClient } from '@/lib/supabase/client';
import type { LogCorrelation, LogCorrelationCreate } from '@educi/types';

export const useEntLogCorrelationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogCorrelationCreate): Promise<LogCorrelation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogCorrelationService(supabase);
      return await service.createLogCorrelation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogCorrelationCreate>): Promise<LogCorrelation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogCorrelationService(supabase);
      return await service.updateLogCorrelation(schoolId, id, data);
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
      const service = new EntLogCorrelationService(supabase);
      await service.deleteLogCorrelation(schoolId, id);
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
